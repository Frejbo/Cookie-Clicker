let cookie = document.querySelector("#kaka");
// let spinSpeed = 6000;
let cookies = 0;
let cookiesPerSecond = 0;

cookie.addEventListener("click", () => {
    // changeSpeed(spinSpeed-100);
    cookies++;
    update_status_labels();

    // cookie.classList.toggle("clicked_cookie"); //funkade inte, tror det är för att den redan har en animation på sig. Fixar senare.
});
let animation = document.querySelector("kaka.animation");

function powerup_clicked(item, cost, CPS) {
    if (cost > cookies) { return; }
    cookies -= cost;
    cookiesPerSecond += CPS;
    update_status_labels();


    item.classList.add("activate_powerup")

    item.addEventListener("animationend", () => {
        item.style.display = "none";
    })


    // check to start the progress CPS loop:
    if (cookiesPerSecond > 0) {
        document.querySelector("#CPS-progress-frame").style.display = "block";
        let progressbar = document.querySelector("#CPS-progress");
        progressbar.classList.add("progress-CPS");
        progressbar.addEventListener("animationiteration", () => tick_cps());
    }
}

function tick_cps() {
    cookies += cookiesPerSecond;
    update_status_labels();

}
function update_status_labels() {
    document.querySelector("#cookie_amount").innerHTML = cookies;
}


// cookie.addEventListener("animationiteration", () => {
//     cookie.setAttribute("style", `--speed: ${(Math.floor(spinSpeed)) + "ms"}`);
// })

// function changeSpeed(milliSeconds) {
//     if (milliSeconds < 300) {
//         milliSeconds = 300;
//     }
//     spinSpeed = milliSeconds;
//     // cookie.setAttribute("style", `--speed: ${(Math.floor(spinSpeed)) + "ms"}`);
// }