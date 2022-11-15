import './style.css';
import Swal from 'sweetalert2';


const input = document.getElementsByTagName('input');
const button = document.getElementById('button');
const h2 = document.getElementById('h2');
const divs = document.getElementById('divs');

function valores(moedas) { 
    const url = `https://api.exchangerate.host/latest?base=${moedas}`;
    return fetch(url)
        .then((response) => response.json())
        .then(data => Object.entries(data.rates))
        .then(rates => {
            rates.forEach(coins => {
                const [name, value] = coins;
                const div = document.createElement('div');
                div.innerHTML = `<p class="nome"><img src="./assets/coin.svg">${name}</p><p class="valor">${value.toFixed(3)}</p`;
                div.className = 'div';
                divs.appendChild(div);
            });
        });
}


function pesquisa() {
    const moeda = input[0].value;
    if (!moeda) {
        valores(moeda);
        h2.innerHTML = 'Valores referentes a 1 EUR';
        return Swal.fire({
            icon: 'error',
            title: 'Opsss...',
            text: 'Por favor, digite uma moeda!',
            background: 'rgba(26, 25, 26)',
            color: 'rgb(224,224,224)'
        });
    }

    fetch(`https://api.exchangerate.host/latest?base=${moeda}`)
        .then((response) => response.json())
        .then((rates) => {
            if (rates.base !== moeda.toUpperCase()) {
                valores(moeda);
                h2.innerHTML = 'Valores referentes a 1 EUR';
                return Swal.fire({
                    icon: 'error',
                    title: 'Opsss...',
                    text: 'Moeda não existente!',
                    background: 'rgb(26, 25, 26)',
                    color: 'rgb(224,224,224)'
                });
            } else { 
                divs.innerHTML = '';
                h2.innerHTML = `Valores referentes a 1 ${moeda.toUpperCase()}`; 
                valores(moeda);
            }
        });
       
}

button.addEventListener('click', (event) => {
    event.preventDefault();
    pesquisa();
});

