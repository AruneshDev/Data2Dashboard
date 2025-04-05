from fastapi import FastAPI, UploadFile, File, Form, HTTPException
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
import pandas as pd

# Importing utility functions from modules
from utils.chart_utils import create_bar_chart, create_line_chart, create_scatter_chart, create_pie_chart
from utils.plot_utils import format_plot, generate_image_response

app = FastAPI()

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_methods=["*"],  
    allow_headers=["*"],  
)

@app.get("/")
async def root():
    return JSONResponse(content={"message": "Welcome to Data to Dashboard API"})

@app.post("/upload")
async def upload_file(file: UploadFile = File(...)):
    try:
        df = pd.read_csv(file.file)
        columns = df.columns.tolist()
        return {"message": "File uploaded successfully", "columns": columns, "shape": df.shape}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@app.post("/visualize")
async def visualize(
    chart_type: str = Form(...),
    x_axis: str = Form(...),
    y_axis: str = Form(...),
    file: UploadFile = File(...)
):
    try:
        df = pd.read_csv(file.file)

        # Select the appropriate chart creation function
        if chart_type == "bar":
            ax = create_bar_chart(df, x_axis, y_axis)
            format_plot(ax, "bar", x_axis, y_axis, len(df))
        elif chart_type == "line":
            ax = create_line_chart(df, x_axis, y_axis)
            format_plot(ax, "line", x_axis, y_axis, len(df))
        elif chart_type == "scatter":
            ax = create_scatter_chart(df, x_axis, y_axis)
            format_plot(ax, "scatter", x_axis, y_axis, len(df))
        elif chart_type == "pie":
            create_pie_chart(df, x_axis, y_axis)
        else:
            raise HTTPException(status_code=400, detail="Unsupported chart type")

        return generate_image_response()
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
