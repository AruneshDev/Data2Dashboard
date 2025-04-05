
# Data to Dashboard

## 📊 Create Insightful Visualizations from Your Data in Seconds

Data to Dashboard is a web application that allows you to quickly upload CSV data and generate visualizations such as bar charts, line charts, scatter plots, and pie charts. The app is designed to be user-friendly and responsive, making it easy to analyze data from any device.

---

## 🚀 Features

- Upload CSV files and automatically detect columns.
- Choose from different chart types: Bar, Line, Scatter, Pie.
- Interactive selection of X-axis and Y-axis from uploaded data.
- Generate visualizations in real-time.
- Download the generated charts.
- Responsive and modern UI.
- Supports flexible chart sizing based on the screen size.

---

## 🛠️ Technologies Used

### Frontend
- ReactJS
- Axios for API requests
- Responsive design with CSS
- React Router for page navigation

### Backend
- FastAPI for server-side processing
- Pandas and Matplotlib for data handling and visualization
- CORS Middleware for cross-origin requests

---

## 📝 Prerequisites

- **Node.js** (v18 or higher)
- **Python** (v3.9 or higher)
- **Virtual Environment** for Python

---

## 💻 Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/AruneshDev/Data2Dashboard.git
   cd Data2Dashboard
   ```

2. Set up the Python virtual environment:
   ```bash
   python3 -m venv env
   source env/bin/activate  # On Windows: env\Scripts\activate
   ```

3. Install backend dependencies:
   ```bash
   pip install -r backend/requirements.txt
   ```

4. Install frontend dependencies:
   ```bash
   cd frontend
   npm install
   cd ..
   ```

---

## 🚀 Running the Application

1. Start the backend server:
   ```bash
   uvicorn backend.main:app --reload --host 0.0.0.0 --port 8000
   ```

2. Start the frontend server:
   ```bash
   cd frontend
   npm start
   ```

3. Access the application at:
   ```
   http://localhost:3000/
   ```

---

## 📝 Usage

1. Upload a CSV file using the "Upload CSV File" button.
2. Select the chart type from the dropdown (Bar, Line, Scatter, Pie).
3. Choose the X-axis and Y-axis columns from the available options.
4. Click on **"Generate Visualization"** to create the chart.
5. Download the chart using the **"Download Chart"** button.

---

## 🪲 Troubleshooting

- If you encounter issues with chart display, ensure the uploaded file is in CSV format.
- Restart both frontend and backend servers if changes are made.

---

## 📧 Support

For any issues or feature requests, please contact:
- Arunesh Kumar Lal at [GitHub](https://github.com/AruneshDev)

Happy Visualizing! 🎉🚀
