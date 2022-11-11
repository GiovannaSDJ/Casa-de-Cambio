import "./style.css";

const input = document.getElementsByTagName("input");
const button = document.getElementById("button");
let coins;

function pegaObj(inputValor) {
  const urlApi = `https://api.exchangerate.host/latest?base=${inputValor}`;
  return fetch(urlApi)
    .then((response) => response.json())
    .then((data) => {
      coins = data.rates;
      return data.rates;
    });
}

function pesquisa() {
  const moeda = input.value;
  return pegaObj(moeda);
}

function valores(coin) {
  const divs = document.getElementById("divs");
  const value = Object.keys(coin);
  for (let i = 0; i < value.length; i += 1) {
    const div = document.createElement("div");
    div.className = "style-divs";
    div.innerText = `${value[i]}: ${coins[value[i]]}`;
    divs.appendChild(div);
  }
}

button.addEventListener("click", (event) => {
  const coin = pesquisa().then((data) => data);
  setTimeout(() => {
    valores(coin);
    console.log(coin);
  }, 1000); 
  
  event.preventDefault();
});
