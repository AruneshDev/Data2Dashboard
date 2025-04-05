import pandas as pd
import matplotlib.pyplot as plt

# Function to create a bar chart with legend
def create_bar_chart(df, x_axis, y_axis):
    ax = df.plot(kind="bar", x=x_axis, y=y_axis, figsize=(12, 6), legend=True)
    ax.legend([y_axis], loc='best')  # Adding legend
    return ax

# Function to create a line chart with legend
def create_line_chart(df, x_axis, y_axis):
    ax = df.plot(kind="line", x=x_axis, y=y_axis, figsize=(12, 6), legend=True)
    ax.legend([y_axis], loc='best')  # Adding legend
    return ax

# Function to create a scatter chart with legend
def create_scatter_chart(df, x_axis, y_axis):
    ax = df.plot(kind="scatter", x=x_axis, y=y_axis, figsize=(12, 6), legend=True)
    ax.legend([y_axis], loc='best')  # Adding legend
    return ax
# Function to create a pie chart with better legend formatting
def create_pie_chart(df, x_axis, y_axis):
    pie_data = df.groupby(x_axis)[y_axis].sum()

    # Adjust figure size for responsiveness
    fig, ax = plt.subplots(figsize=(6, 6))  # Base size
    wedges, texts, autotexts = ax.pie(
        pie_data, labels=pie_data.index, autopct='%1.1f%%',
        startangle=90, textprops={'fontsize': 12}
    )
    plt.title(f"Pie Chart of {y_axis} by {x_axis}", fontsize=16)

    # Adding legend outside the pie chart
    ax.legend(pie_data.index, title=x_axis, loc='center left', bbox_to_anchor=(1, 0.5), fontsize=10)

    plt.tight_layout()  # Adjust layout for responsiveness
    