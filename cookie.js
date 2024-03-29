const cookie = document.querySelector("#kaka");
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
const animation = document.querySelector("kaka.animation");


function character_clicked(item) {
    let cost = parseInt(item.querySelector(".price h2").innerHTML)
    let CPS = parseInt(item.querySelector(".price h3").innerHTML)
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


    item.classList.add("activate_character")

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
    document.querySelector("#CPS_rate").innerHTML = cookiesPerSecond;
    let price_labels = document.querySelectorAll(".price");
    for (let i = 0; i < price_labels.length; i++) {
        let element = price_labels[i]
        let cost = parseInt(element.querySelector("h2").innerHTML)//.replace("c", "")
        if (cookies >= cost) {
            // du har råd med denna character
            element.style.backgroundColor = "rgba(0, 255, 0, .3)";
        } else {
            // du har INTE råd med denna character
            element.style.backgroundColor = "rgba(255, 0, 0, .3)";
        }
    }
}




// powerups
const powerups = document.querySelector(".powerup")
const informationsruta = document.querySelector("#powerup_information_hoverview");

function hover_powerup(element, powerupName, powerupDescription, cost) {
    
    informationsruta.querySelector("img").src = element.src;
    informationsruta.querySelector("img").alt = element.alt;
    
    informationsruta.querySelector("h4").innerHTML = powerupName;
    informationsruta.querySelector("p").innerHTML = powerupDescription;

    informationsruta.querySelector("#cost").innerHTML = ">> Costs "+cost+" cookies <<";
    
    informationsruta.style.display = "block";
    informationsruta.style.display = "flex";
    
    // sätter inforutan vid muspekarens position.
    informationsruta.style.left = event.clientX + 'px';
    informationsruta.style.top = event.clientY + 'px';

    // Kollar om inforutan är för nära högre/undre kanten av skärmen, isf flyttas den upp mot kanten.
    const elementRect = informationsruta.getBoundingClientRect();
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    if (elementRect.left + elementRect.width > viewportWidth) {
    informationsruta.style.left = (viewportWidth - elementRect.width) + 'px';
    }
    if (elementRect.top + elementRect.height > viewportHeight) {
    informationsruta.style.top = (viewportHeight - elementRect.height) + 'px';
    }
}
function hide_info() {
    informationsruta.style.display = "none";
}


// let unlockedPowerups = {};
function activate_powerup(element, name, cost) {
    if (cookies < cost) {return;}
    cookies -= cost;

    let characters = document.querySelectorAll(".nameOfCharacter");
    let unlockedCharacters = [];
    for (let i = 0; i < characters.length; i++) {
        if (characters[i].parentElement.parentElement.style.display != "none") {continue;} // om karaktären ej låsts upp
        unlockedCharacters.push(characters[i].innerHTML);
    }

    // går igenom alla då alla har specifika syften:
    if (name == "Elliot") {
        if (!unlockedCharacters.includes("Erika")) {return;}
        cookiesPerSecond += 10;
        // unlockedPowerups["Elliot"] = element;
    }
    else if (name == "Axel") {
        if (!unlockedCharacters.includes("Saga")) {return;}
        cookiesPerSecond -= 35;
        // unlockedPowerups["Axel"] = element;
        document.querySelector("#Loke").style.display = "block";
    }
    else if (name == "Barn") {
        if (!unlockedCharacters.includes("Sebastian")) {return;}
        cookiesPerSecond += 30;
        // unlockedPowerups["Barn"] = element;
    }
    else if (name == "Loke") {
        // if (!unlockedPowerups["Axel"]) {return;}
        cookiesPerSecond += 35;
        // unlockedPowerups["Loke"] = element;
        document.querySelector("#Axel").style.display = "block";
    }

    element.style.display = "none";
    update_status_labels();
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