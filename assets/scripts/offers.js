import offers from './resources/offers.json' assert {type: 'json'};
function calculateNbOfOffers() {
    const bodyWidth = document.body.clientWidth;
    const offerWidth = 500;
    const gap = 90;
    const margin = 70;

    const nbOfOffers = document.getElementsByClassName("offer").length;

    return Math.floor((bodyWidth - margin - gap * (nbOfOffers - 1)) / offerWidth);
}

function addOffers() {
    document.getElementsByClassName("offers")[0].innerHTML = "";
    let nb = calculateNbOfOffers();
    do {
        document.getElementsByClassName("offers")[0].innerHTML += `
        <div class="offer">
            <h2>${offers.offers[nb-1].title}</h2>
            <img src="${offers.offers[nb-1].image}">
            <p class="price">od ${offers.offers[nb-1].price}</p>
            <p>${offers.offers[nb-1].desc}</p>
            <a>
                <div class="offer-button">See more...</div>
            </a>
        </div>
        `
        nb--;
    } while (nb > 0);
}

addEventListener('resize', addOffers)
addOffers();

