import { getWarning } from "./apiquery";

const generateCarsButton = document.querySelector('.generate-cars') as HTMLElement;

export const generateCars = () => {
    generateCarsButton.addEventListener('click', ()=> {
        getWarning(`on
         construction
         ....`);
    })
};