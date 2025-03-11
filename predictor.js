function startPrediction() {
    let clientSeed = document.getElementById("clientSeed").value.trim();
    let serverSeed = document.getElementById("serverSeed").value.trim();
    let startButton = document.querySelector(".btn");
    let resultDiv = document.getElementById("result");

    if (clientSeed === "" || serverSeed === "") {
        alert("Both fields must be filled out!");
        return;
    }

    // Show loading state
    startButton.textContent = "Loading...";
    startButton.disabled = true;
    resultDiv.innerHTML = ""; // Clear previous results

    // Simulate a 2-second loading effect
    setTimeout(() => {
        fetch('https://predictor-py.onrender.com', {  // NEW: Hosted API
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ clientSeed, serverSeed })
        })
            .then(response => response.json())
            .then(data => {
                if (data.error) {
                    alert(data.error);
                    return;
                }
                displayGrid(data.grid);
            })
            .catch(error => console.error('Error:', error))
            .finally(() => {
                // Reset button text and enable it again
                startButton.textContent = "Start";
                startButton.disabled = false;
            });
    }, 2000); // 2-second delay
}

function displayGrid(grid) {
    let resultDiv = document.getElementById("result");
    resultDiv.innerHTML = "";

    grid.forEach(row => {
        let rowDiv = document.createElement("div");
        rowDiv.textContent = row.join(" | ");
        resultDiv.appendChild(rowDiv);
    });
}
