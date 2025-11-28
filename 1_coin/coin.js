const btn = document.getElementById("moibaton");
const text = document.getElementById("message");

const golova = document.getElementById("xeadc")
const tailand = document.getElementById("teilc")

let heads = 0;
let tails = 0;

btn.addEventListener("click", function() {
  const randomNumber = Math.random();
  
  let side;
  if (randomNumber < 0.5) {
    side = " орел";
    heads++;
  } else {
    side = "а решка";
    tails++;
  }
  text.textContent = `Выпал${side}`
  golova.textContent = `орлы: ${heads}`
  tailand.textContent = `решка: ${tails}`
});