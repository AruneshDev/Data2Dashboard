import pandas as pd
import matplotlib.pyplot as plt

# Function to create a bar chart
def create_bar_chart(df, x_axis, y_axis):
    ax = df.plot(kind="bar", x=x_axis, y=y_axis, figsize=(12, 6), legend=True)
    return ax

# Function to create a line chart
def create_line_chart(df, x_axis, y_axis):
    ax = df.plot(kind="line", x=x_axis, y=y_axis, figsize=(12, 6), legend=True)
    return ax

# Function to create a scatter chart
def create_scatter_chart(df, x_axis, y_axis):
    ax = df.plot(kind="scatter", x=x_axis, y=y_axis, figsize=(12, 6), legend=True)
    return ax

# Function to create a pie chart
def create_pie_chart(df, x_axis, y_axis):
    pie_data = df.groupby(x_axis)[y_axis].sum()
    plt.pie(pie_data, labels=pie_data.index, autopct='%1.1f%%')
    plt.title(f"Pie Chart of {y_axis} by {x_axis}")
