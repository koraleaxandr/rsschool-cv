import "../css/style.css";
import "../css/footerstyle.css";
import "../css/garage.css";
import "../css/winners.css";

import { renderGarage } from './/garage';
import { getWarning } from "./apiquery";
import { renderWinners,  } from "./winners";

const toGarageButton = document.getElementById('to-garage') as HTMLElement;
const toWinnersButton = document.getElementById('to-winners') as HTMLElement;

const startFunction = () => {
    renderGarage();
toGarageButton.addEventListener('click', renderGarage);
toWinnersButton.addEventListener('click', () =>{
    getWarning('Constructing...');
    renderWinners()
})
}


startFunction();