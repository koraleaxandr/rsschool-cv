import "../css/style.css";
import "../css/footerstyle.css";
import "../css/garage.css";
import "../css/winners.css";

import { renderGarage } from './/garage';
import { listenApiQuery } from "./apiquery";
import { renderWinners,  sortWinners  } from "./winners";
import { stopGlobalRace } from "./racing";
import { generateCars } from "./generatecars";
import { bodyHtml } from "./data";



const startFunction = async():Promise<void> => {
    await renderBody();
    renderGarage();
    generateCars();

const toGarageButton = document.getElementById('to-garage') as HTMLElement;
const toWinnersButton = document.getElementById('to-winners') as HTMLElement;

toGarageButton.addEventListener('click', async() =>{
    stopGlobalRace();     
});

toWinnersButton.addEventListener('click', (): void =>{ 
    renderWinners();
     sortWinners(); 
})
};

const renderBody = async(): Promise<void> =>{
document.body.innerHTML = bodyHtml;
listenApiQuery();
};

startFunction();