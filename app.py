from flask import Flask, request, jsonify
from flask_cors import CORS  # Fix CORS issue
import random

app = Flask(__name__)
CORS(app)

def generate_grid():
    grid_size = 5  # 5x5 grid
    total_mines = 4  # Only 4 mines (💎)
    
    # Create a grid filled with bombs (💣)
    grid = [["💣" for _ in range(grid_size)] for _ in range(grid_size)]

    # Randomly place exactly 4 mines (💎)
    mine_positions = random.sample([(i, j) for i in range(grid_size) for j in range(grid_size)], total_mines)
    for x, y in mine_positions:
        grid[x][y] = "💎"

    return grid

@app.route('/predict', methods=['POST'])
def predict():
    data = request.json
    client_seed = data.get("clientSeed")
    server_seed = data.get("serverSeed")

    if not client_seed or not server_seed:
        return jsonify({"error": "Both fields must be filled!"}), 400

    grid = generate_grid()
    return jsonify({"grid": grid})

if __name__ == '__main__':
    app.run(host="0.0.0.0", port=10000, debug=True)