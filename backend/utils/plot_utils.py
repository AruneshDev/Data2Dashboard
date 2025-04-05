import matplotlib.pyplot as plt
import io
from fastapi.responses import StreamingResponse

def format_plot(ax, chart_type, x_axis, y_axis, data_length):
    plt.title(f"{chart_type.capitalize()} Chart of {y_axis} vs {x_axis}", fontsize=16)
    plt.xlabel(x_axis, fontsize=14)
    plt.ylabel(y_axis, fontsize=14)
    ax.legend(title=y_axis, loc='best', fontsize=10)  # Ensure the legend is readable
    # Adjust x-ticks if there are too many
    if data_length > 20:
        tick_spacing = max(1, data_length // 20)
        ax.set_xticks(range(0, data_length, tick_spacing))
    plt.xticks(rotation=45, ha='right')
    plt.tight_layout()


# Function to generate image response
def generate_image_response():
    buf = io.BytesIO()
    plt.savefig(buf, format='png')
    plt.close()
    buf.seek(0)
    return StreamingResponse(buf, media_type="image/png")
