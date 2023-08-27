document.addEventListener("DOMContentLoaded", function () {
  const convertButton = document.getElementById("convert");
  const enterAmount = document.getElementById("enter_amount");
  const resultDisplay = document.getElementById("converted");

  convertButton.addEventListener("click", function () {
    const amountSymbol = parseFloat(enterAmount.value);

    const fromCurrency = document.getElementById("option1").value;
    const toCurrency = document.getElementById("option2").value;

    const apiKey = 'ef97474c6087e284795cd4f0';
    const apiUrl = `https://v6.exchangerate-api.com/v6/${apiKey}/pair/${fromCurrency}/${toCurrency}/${amountSymbol}`;


    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        if (data.result === "success") {
          const convertedAmount = data.conversion_result.toFixed(2);
          resultDisplay.value = convertedAmount;
        } else {
          console.error("Error converting amount");
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  });









  // Now, add code to fetch historical exchange rate data and create a chart
  const chartButton = document.getElementById("chart");
  const rateChart = document.getElementById("rateChart");

  chartButton.addEventListener("click", function () {
    //create the neccessary data points
    const today = new Date();
    const aWeekAgo = new Date();
    const day = today.getDate();
    const year = today.getFullYear();
    const month = today.getMonth() + 1;
    aWeekAgo.setDate(today.getDate() - 7);


    // y-axis
    const dataPoints = [];
    // x-axis
    const daysToFetch = [];

    function fetchExchangeRate(yr, mon, d) {
      // Fetch historical exchange rate data
      const apiKey = 'ef97474c6087e284795cd4f0';
      const fromCurrency = document.getElementById("option1").value;
      const toCurrency = document.getElementById("option2").value;
      const amountSymbol = parseFloat(document.getElementById("enter_amount").value);
      const historicalApiUrl = `https://v6.exchangerate-api.com/v6/${apiKey}/history/${fromCurrency}/${yr}/${mon}/${d}/${amountSymbol}`;
      return fetch(historicalApiUrl)
        .then(response => response.json())
        .then(data => {
          if (data.result === "success") {
            const obj = JSON.parse(data.conversion_rates);
            obj.
            dataPoints.push(rate2);
          } else {
            throw new Error("Error fetching the data points");
          }
        });
    }





    // Iterate from a week ago up to today (inclusive)
    for (let currentDate = new Date(aWeekAgo); currentDate <= today; currentDate.setDate(currentDate.getDate() + 1)) {
      // Format the current date as "YYYY-MM-DD"
      const formattedDate = currentDate.toISOString().slice(0, 10);
      daysToFetch.push(formattedDate);
      // parse the exchange rate from each of those days
      const year = currentDate.getFullYear();
      const month = currentDate.getMonth() + 1;
      const day = currentDate.getDate();
      fetchExchangeRate(year, month, day);
    }

    // Wait for all fetch operations to complete
    Promise.all(dataPoints)
      .then(dataPoints => {
        // Create the chart using Chart.js with dataPoints and daysToFetch



        const ctx = document.getElementById('rateChart').getContext('2d');
        new Chart(ctx, {

          type: 'line',
          data: {
            labels: daysToFetch, // x-axis labels
            datasets: [
              {
                label: 'Exchange Rate',
                data: dataPoints, // y-axis data points
                borderColor: 'blue',
                backgroundColor: 'rgba(0, 0, 255, 0.2)',
                fill: true,
              },
            ],
          },

          options: {
            responsive: true,
            scales: {
              x: {
                display: true,
                title: {
                  display: true,
                  text: 'Date',
                },
              },
              y: {
                display: true,
                title: {
                  display: true,
                  text: 'Exchange Rate',
                },
              },
            },
          },


        });
      })
      .catch(error => {
        console.error(error);
      });

  })

});



