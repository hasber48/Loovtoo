const btn = document.getElementById("moibaton");
const tries = document.getElementById("tries");
const golova = document.getElementById("orli");
const tailand = document.getElementById("reshki");
const delay = (ms) => new Promise(res => setTimeout(res, ms));
console.log("We are here")



btn.addEventListener("click", async () => {
    let heads = 0;
    let tails = 0;
    
    for (let i = 0; i < Number(tries.value); i++) {
        const randomNumber = Math.random();
        if (randomNumber < 0.5) {
            heads++;
            golova.textContent = `Орлы: ${heads}`
        } else {
            tails++;
            tailand.textContent = `Решки: ${tails}`
        }
        await delay(100);        
    }    
});