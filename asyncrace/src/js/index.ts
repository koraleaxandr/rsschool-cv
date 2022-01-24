import "../css/style.css";
import "../css/footerstyle.css";
import "../css/garage.css";
import "../css/winners.css";

import { renderGarage } from './/garage';
//import { getWarning } from "./apiquery";
import { renderWinners,  } from "./winners";
import { stopGlobalRace } from "./racing";
import { generateCars } from "./generatecars";

const toGarageButton = document.getElementById('to-garage') as HTMLElement;
const toWinnersButton = document.getElementById('to-winners') as HTMLElement;

const startFunction = () => {
    renderGarage();
    generateCars();
toGarageButton.addEventListener('click', async() =>{
    stopGlobalRace();
   await renderGarage();
    
});
toWinnersButton.addEventListener('click', () =>{
   // getWarning('Constructing...');
    renderWinners();
})
}


startFunction();