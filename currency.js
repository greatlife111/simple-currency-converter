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
});