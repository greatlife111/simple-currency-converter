
document.addEventListener("DOMContentLoaded", function () {
  // Your existing conversion code here...

  // Now, add code to fetch historical exchange rate data and create a chart
  const chartButton = document.getElementById("showChart");

  chartButton.addEventListener("click", function() {
    // Fetch historical exchange rate data
    const historicalApiUrl = `https://your-historical-api-url`;

    fetch(historicalApiUrl)
      .then(response => response.json())
      .then(data => {
        // Extract dates and exchange rates from the fetched data
        const dates = Object.keys(data);
        const rates = Object.values(data);

        // Create a chart using Chart.js
        const ctx = document.getElementById("exchangeRateChart").getContext("2d");
        
        new Chart(ctx, {
          type: "line",
          data: {
            labels: dates,
            datasets: [
              {
                label: "Exchange Rate Trend",
                data: rates,
                borderColor: "blue",
                fill: false,
              },
            ],
          },
        });
      })
      .catch(error => {
        console.error("Error fetching historical data:", error);
      });
  });
});
