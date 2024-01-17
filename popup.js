async function getData() {
  const request = await fetch("https://api.coingecko.com/api/v3/coins/bostrom");
  const data = await request.json();
  const p = data["market_data"]["current_price"].usd;

  document.getElementById("price").children[0].innerText =
    p.toFixed(10) + "USD";

  const n = (p * 10 ** 9).toFixed(1);

  chrome.action.setBadgeText({ text: n });
}

getData();
setInterval(() => {
  getData();
}, 1000 * 60 * 5);

const hRate = 3.3;

document.getElementById("h").children[0].innerText = hRate;
