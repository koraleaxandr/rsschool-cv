import {
      getCarsInGarage,
      garageResponcedata,
      removeCar,
      selectCar,
      totalCars
} from "./apiquery";
import {
      startRaceListening
} from "./racing";
import {
      carItemImage,
      carItemHtml
} from "./data";
export const garageContainer = document.querySelector('.garage-container') as HTMLElement;
let page = 1;
const currentPageNumber = document.querySelector('.page-count') as HTMLElement;
const nextPageButton = document.querySelector('.next-page-button') as HTMLElement;
const prevPageButton = document.querySelector('.prev-page-button') as HTMLElement;


/**************************************************************** */
export const renderGarage = async () => {
      await getCarsInGarage(page);
      // console.log(garageResponcedata);
      garageContainer.innerHTML = '';
      if (garageResponcedata.length) {
            garageResponcedata.forEach(element => {
                  const carItemColor = element.color;
                  const carItemContainer: HTMLElement = document.createElement('div');
                  const carItemContainerHTML = ` <div class="car-item-pagination">
      <p class="car-trademark" data-id="${element.id}" >${element.name}</p>           
      <button type="checkbox" class="start-car" data-id="${element.id}">START</button>
      <button type="checkbox" class="stop-car" data-id="${element.id}">STOP</button>
      <button type="checkbox" class="select-car" data-id="${element.id}">Select</button>
      <button class="remove-car" data-id="${element.id}">remove</button>
      </div>
      ${carItemHtml}
      ${carItemColor}" stroke="white" stroke-width="100">
      ${carItemImage}`;
                  carItemContainer.innerHTML = carItemContainerHTML;
                  garageContainer.append(carItemContainer);
            });
            removeCar();
            selectCar();
            startRaceListening();
            changePage();
            return;
      }
};

/**************************CHANGE PAGE*************** */


const changePage = () => {
      prevPageButton.style.opacity = "0.3";
      nextPageButton.style.opacity = '0.3';
      const totalPages = (totalCars / 7);
      nextPageButton.addEventListener('click', nextPage, false);
      prevPageButton.addEventListener('click', prevPage, false);
      currentPageNumber.innerHTML = `#${page}`;
      if (totalPages > 1 && page < totalPages) {
            nextPageButton.style.opacity = '1';
            prevPageButton.style.opacity = '1';
      }
      if (page > 1) {
            prevPageButton.style.opacity = "1"
      } else prevPageButton.style.opacity = "0.3";
      return;
};

const nextPage = () => {
      const totalPages = (totalCars / 7);
      if (page < totalPages) {
            page += 1;
            console.log(page);
            renderGarage();
            return;
      } else return;
};

const prevPage = () => {
            if (page > 1) {
                  page = page - 1;
                  console.log(page);
                  renderGarage();
                  return;
            } else return;
      };