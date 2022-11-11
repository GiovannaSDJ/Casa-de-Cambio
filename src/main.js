import './style.css';

const input = document.getElementsByTagName('input');
const button = document.getElementsByTagName('button');
console.log(button);

function pegaObj(inputValor) {
    const urlApi = `https://api.exchangerate.host/latest?base=${inputValor}`;
    return fetch(urlApi)
        .then((response) => response.json())
        .then((data) => data.rates);
}

function pesquisa() {
    const moeda = input.value;
    return pegaObj(moeda).then(console.log);
}

button.addEventListener('click', pesquisa);
  
// setTimeout(() => {
//   
  
//   function valores() {
//     const divs = document.getElementById("divs");
//     for (let i = 0; i < value.length; i += 1) {
//       const div = document.createElement("div");
//       div.className = "style-divs";
//       div.innerText = `${value[i]}: ${moeda[value[i]]}`;
//       divs.appendChild(div);
//     }
//   }
//   valores();
// }, 1000);


