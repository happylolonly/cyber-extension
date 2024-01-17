const hRate = 3.3;

let balanceEl;

function findBalanceEl() {
  const el = document.querySelectorAll("main header div div div > span")[0];

  balanceEl = el;
}

let price;

async function getData() {
  const request = await fetch("https://api.coingecko.com/api/v3/coins/bostrom");
  const data = await request.json();
  const p = data["market_data"]["current_price"].usd;

  price = p;
}

function updateUi() {
  const hValue = Number(balanceEl.innerText.replaceAll(" ", ""));
  const usdValue = ((hValue / hRate) * price).toFixed(2);

  console.log(usdValue);

  const span = document.createElement("span");
  span.id = "extension";

  const { style } = span;
  style.position = "absolute";
  style.bottom = 0;

  span.innerText = `(${usdValue}$)`;
  balanceEl.parentElement.append(span);
}

async function init() {
  getData();
  setInterval(() => {
    getData();
  }, 1000 * 60 * 3);

  const location = window.location.href;
  if (!location.includes("@") && !location.includes("neuron")) {
    return;
  }

  setInterval(() => {
    if (!balanceEl || !price) {
      return;
    }

    updateUi();
  }, 3000);

  const interval = setInterval(() => {
    findBalanceEl();

    if (!balanceEl || !price) {
      return;
    }

    clearInterval(interval);
  }, 1000);
}

init();
