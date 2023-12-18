const inputAmount = document.getElementById("InputAmount");
const inputMonth = document.getElementById("InputMonth");
const btnSimulate = document.getElementById("btnSimulate");
const modal = document.getElementById("myModal");
const modalData = document.getElementById("modal-data");
const spanClose = document.getElementById("closeModalBtn");

btnSimulate.addEventListener("click", async (e) => {
  console.log("clic");
  const amount = inputAmount.value;
  const month = inputMonth.value;
  if (amount > 0 && month > 0) {
    e.preventDefault();
    console.log(amount, month);
    try {
      const response = await axios.post("/simulateLoan", {
        amount: amount,
        month: month,
        token: sessionStorage.getItem("token")
      });
      console.log(response.data);
      if (response.data.amount) {
        modal.style.display = "block";
        const node = document.createElement("div");
        node.className = "container";
        node.innerHTML = `
            <h4>Tu Prestamo en Pesos</h4>
            <p class="mt-3">Monto: AR$${response.data.amount}</p>
            <p>Meses: ${response.data.months}</p>
            <p>Tasa de Interes: 5% mensual</p>
            <p>Total a pagar por mes: AR$${response.data.paymentPerMonth}</p>
            <p>Total de interes: AR$${response.data.totalInterest}</p>
            <p>Total a pagar : AR$${response.data.totalPayment}</p>
        `;
        modalData.appendChild(node);
      }
    } catch (error) {
      console.log(error);
    }
  }
});

spanClose.onclick = function () {
  modal.style.display = "none";

  inputAmount.value = null;
  inputMonth.value = null;

  modalData.innerHTML = "";
};

window.onclick = function (event) {
  if (event.target === modal) {

    modal.style.display = "none";
    inputAmount.value = null;
    inputMonth.value = null;

    modalData.innerHTML = "";
  }
};
