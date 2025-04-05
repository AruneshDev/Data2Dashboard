from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
import pandas as pd
import uvicorn
from io import BytesIO
from typing import List
import json
from pydantic import BaseModel
import matplotlib.pyplot as plt
import seaborn as sns
import os

app = FastAPI()

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Directory for storing visualizations
if not os.path.exists("visualizations"):
    os.makedirs("visualizations")

class VisualizationRequest(BaseModel):
    chart_type: str
    x_axis: str
    y_axis: str

@app.post("/upload")
async def upload_file(file: UploadFile = File(...)):
    try:
        contents = await file.read()
        if file.filename.endswith('.csv'):
            data = pd.read_csv(BytesIO(contents))
        elif file.filename.endswith(('.xls', '.xlsx')):
            data = pd.read_excel(BytesIO(contents))
        else:
            return {"error": "Unsupported file format"}

        info = {
            "columns": data.columns.tolist(),
            "shape": data.shape
        }
        data.to_csv("uploaded_data.csv", index=False)
        return {"message": "File uploaded successfully", "info": info}

    except Exception as e:
        return {"error": str(e)}

@app.post("/visualize")
async def create_visualization(request: VisualizationRequest):
    try:
        data = pd.read_csv("uploaded_data.csv")
        plt.figure(figsize=(8, 5))

        if request.chart_type == "bar":
            sns.barplot(x=data[request.x_axis], y=data[request.y_axis])
        elif request.chart_type == "line":
            sns.lineplot(x=data[request.x_axis], y=data[request.y_axis])
        elif request.chart_type == "scatter":
            sns.scatterplot(x=data[request.x_axis], y=data[request.y_axis])
        else:
            return {"error": "Unsupported chart type"}

        filepath = f"visualizations/{request.chart_type}.png"
        plt.savefig(filepath)
        plt.close()

        return {"message": "Visualization created successfully", "filepath": filepath}

    except Exception as e:
        return {"error": str(e)}

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
