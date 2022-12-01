let cookie = document.querySelector("#kaka");
let spinSpeed = 6000;
let cookies = 0;

cookie.addEventListener("click", () => {
    changeSpeed(spinSpeed-100);
    cookies++;
    document.querySelector("#cookie_amount").innerHTML = cookies;
});
let animation = document.querySelector("kaka.animation");

function powerup_clicked(item) {
    item.classList.toggle("activate_powerup")
}

// cookie.addEventListener("animationiteration", () => {
//     cookie.setAttribute("style", `--speed: ${(Math.floor(spinSpeed)) + "ms"}`);
// })

function changeSpeed(milliSeconds) {
    if (milliSeconds < 300) {
        milliSeconds = 300;
    }
    spinSpeed = milliSeconds;
    cookie.setAttribute("style", `--speed: ${(Math.floor(spinSpeed)) + "ms"}`);
}

// changeSpeed(500);

// cookie.classList.toggle("spin");