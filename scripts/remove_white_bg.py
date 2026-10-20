from PIL import Image
import os
from collections import deque

def make_outer_transparent(image_path, threshold=210):
    if not os.path.exists(image_path):
        print(f"File not found: {image_path}")
        return

    img = Image.open(image_path).convert("RGBA")
    width, height = img.size
    pixels = img.load()

    # Visited grid for floodfill
    visited = [[False] * height for _ in range(width)]
    queue = deque()

    # Add all four edges to queue
    for x in range(width):
        queue.append((x, 0))
        queue.append((x, height - 1))
        visited[x][0] = True
        visited[x][height - 1] = True

    for y in range(height):
        queue.append((0, y))
        queue.append((width - 1, y))
        visited[0][y] = True
        visited[width - 1][y] = True

    def is_bg_pixel(r, g, b):
        # Background is white/light grey specks
        # Check if high brightness and low saturation
        diff = max(r, g, b) - min(r, g, b)
        avg = (r + g + b) / 3.0
        return (avg >= threshold and diff <= 25) or avg >= 240

    while queue:
        x, y = queue.popleft()
        r, g, b, a = pixels[x, y]

        if is_bg_pixel(r, g, b):
            pixels[x, y] = (r, g, b, 0)

            for dx, dy in [(-1, 0), (1, 0), (0, -1), (0, 1)]:
                nx, ny = x + dx, y + dy
                if 0 <= nx < width and 0 <= ny < height and not visited[nx][ny]:
                    visited[nx][ny] = True
                    queue.append((nx, ny))

    img.save(image_path, "PNG")
    print(f"Cleaned background for: {image_path}")

target_images = [
    r"C:\Users\User\Desktop\usman pure\public\images\hero\herbal-tea.png",
    r"C:\Users\User\Desktop\usman pure\public\images\hero\tea-pouch.png",
    r"C:\Users\User\Desktop\usman pure\public\images\hero\multigrain-flour.png",
    r"C:\Users\User\Desktop\usman pure\public\images\hero\flour-pouch.png",
    r"C:\Users\User\Desktop\usman pure\public\images\hero\spices-jar.png",
]

for p in target_images:
    make_outer_transparent(p, threshold=215)
