let cookie = document.querySelector("#kaka");
// let spinSpeed = 6000;
let cookies = 0;
let cookiesPerSecond = 0;
update_status_labels(); // för att färgerna på priserna ska vara aktiva från början

cookie.addEventListener("click", () => {
    // changeSpeed(spinSpeed-100);
    cookies++;
    update_status_labels();

    // cookie.classList.toggle("clicked_cookie"); //funkade inte, tror det är för att den redan har en animation på sig. Fixar senare.
});
let animation = document.querySelector("kaka.animation");

function powerup_clicked(item, cost, CPS) {
    if (cost > cookies) {
        // denied, spelaren har inte råd.
        item.classList.add("purchase_denied");
        item.addEventListener("animationend", () => {
            item.classList.remove("purchase_denied");
        })
        return;
    }
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
    let price_labels = document.querySelectorAll(".price");
    for (let i = 0; i < price_labels.length; i++) {
        let element = price_labels[i]
        let cost = parseInt(element.querySelector("h2").innerHTML)//.replace("c", "")
        if (cookies >= cost) {
            // du har råd med denna powerup
            element.style.backgroundColor = "rgba(0, 255, 0, .3)";
        } else {
            // du har INTE råd med denna powerup
            element.style.backgroundColor = "rgba(255, 0, 0, .3)";
        }
    }
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