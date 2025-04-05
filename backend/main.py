from fastapi import FastAPI, UploadFile, File, Form, HTTPException
from fastapi.responses import StreamingResponse, JSONResponse
from fastapi.middleware.cors import CORSMiddleware
import pandas as pd
import matplotlib.pyplot as plt
import io

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

        plt.figure(figsize=(12, 6))
        
        # Plotting based on chart type
        if chart_type == "bar":
            ax = df.plot(kind="bar", x=x_axis, y=y_axis, figsize=(12, 6), legend=True)
        elif chart_type == "line":
            ax = df.plot(kind="line", x=x_axis, y=y_axis, figsize=(12, 6), legend=True)
        elif chart_type == "scatter":
            ax = df.plot(kind="scatter", x=x_axis, y=y_axis, figsize=(12, 6), legend=True)
        else:
            raise HTTPException(status_code=400, detail="Unsupported chart type")

        # Improve x-axis tick frequency
        max_ticks = 20  # Maximum number of x-ticks to display
        tick_spacing = max(1, len(df) // max_ticks)
        ax.set_xticks(range(0, len(df), tick_spacing))

        # Set title and labels
        plt.title(f"{chart_type.capitalize()} Chart of {y_axis} vs {x_axis}")
        plt.xlabel(x_axis)
        plt.ylabel(y_axis)

        # Rotate x-axis labels for better readability
        plt.xticks(rotation=45, ha='right')
        plt.tight_layout()

        # Save plot to a bytes buffer
        buf = io.BytesIO()
        plt.savefig(buf, format='png')
        plt.close()
        buf.seek(0)

        return StreamingResponse(buf, media_type="image/png")
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

# @app.post("/visualize")
# async def visualize(
#     chart_type: str = Form(...),
#     x_axis: str = Form(...),
#     y_axis: str = Form(...),
#     file: UploadFile = File(...)
# ):
#     try:
#         df = pd.read_csv(file.file)

#         plt.figure(figsize=(12, 6))
#         if chart_type == "bar":
#             df.plot(kind="bar", x=x_axis, y=y_axis, figsize=(12, 6), legend=True)
#         elif chart_type == "line":
#             df.plot(kind="line", x=x_axis, y=y_axis, figsize=(12, 6), legend=True)
#         elif chart_type == "scatter":
#             df.plot(kind="scatter", x=x_axis, y=y_axis, figsize=(12, 6), legend=True)
#         else:
#             raise HTTPException(status_code=400, detail="Unsupported chart type")

#         plt.title(f"{chart_type.capitalize()} Chart of {y_axis} vs {x_axis}")
#         plt.xlabel(x_axis)
#         plt.ylabel(y_axis)
#         plt.xticks(rotation=45, ha='right')
#         plt.tight_layout()

#         buf = io.BytesIO()
#         plt.savefig(buf, format='png')
#         plt.close()
#         buf.seek(0)

#         return StreamingResponse(buf, media_type="image/png")
#     except Exception as e:
#         raise HTTPException(status_code=400, detail=str(e))
