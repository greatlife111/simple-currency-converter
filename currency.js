document.addEventListener("DOMContentLoaded", function () {
  const convertButton = document.getElementById("convert");
  const enterAmount = document.getElementById("enter_amount");
  const resultDisplay = document.getElementById("converted");

  convertButton.addEventListener("click", function() {
    const amountSymbol = parseFloat(enterAmount.value);

    const fromCurrency = document.getElementById("option1").value;
    const toCurrency = document.getElementById("option2").value;

    const apiKey = '1138a964ad30d631b12eb75e';
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

  chartButton.addEventListener("click", function() {
    // Fetch historical exchange rate data
    const apiKey2 = "LIWDVGA4KHF8MN8Z";
    const historicalApiUrl = `https://wwwalphavantage.co/query?function=FX_DAILY&from_symbol=${fromCurrency}&to_symbol=${toCurrency}&apikey=${apiKey2}&outputsize=compact&datatype=json&from=${aWeekAgo.toISOString().split("T")[0]}&to=${today.toISOString().split("T")[0]}`;

    const today = new Date();
    const aWeekAgo = new Date();
    aWeekAgo.setDate(today.getDate() - 7);


    fetch(historicalApiUrl)
      .then(response => response.json())
      .then(data => {
        // Extract dates and exchange rates from the fetched data
        if (data["Time Series FX"]) {
          const dates = Object.keys(data["Time Series FX"]);
          const rates = dates.map(date => data["Time Series FX"][date]["1. open"]);
  
          
          new Chart(rateChart, {
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
        } else {
          console.error("Error fetching historical data:", error);
        }
      })
      .catch(error => {
        console.error("Error fetching historical data:", error);
      });
  });


});
