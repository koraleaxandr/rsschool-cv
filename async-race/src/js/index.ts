import "../css/style.css";
import "../css/footerstyle.css";
import "../css/garage.css";

import { renderGarage } from './/garage';
const toGarageButton = document.getElementById('to-garage') as HTMLElement;

const startFunction = () => {
    renderGarage();
toGarageButton.addEventListener('click', renderGarage);
}


startFunction();