import { renderWinners, totalCars } from "./winners";

const nextWinnerPageButton = document.querySelector('.winners_next_page') as HTMLElement;
const prevWinnerPageButton = document.querySelector('.winners_prev_page') as HTMLElement;
const currentWinsPageNumber = document.querySelector('.page_winners_count') as HTMLElement;



export let currentWinsPage = 1;


/**************************CHANGE WINS PAGE*************** */


export const changeWinsPage = () => {
      prevWinnerPageButton.style.opacity = "0.3";
      nextWinnerPageButton.style.opacity = '0.3';
      const totalPages = (totalCars / 10);
      nextWinnerPageButton.addEventListener('click', nextWinsPage, false);
      prevWinnerPageButton.addEventListener('click', prevWinsPage, false);
      currentWinsPageNumber.innerHTML = `#${currentWinsPage}`;
      if (totalPages > 1 && currentWinsPage < totalPages) {
            nextWinnerPageButton.style.opacity = '1';
            prevWinnerPageButton.style.opacity = '1';
      }
      if (currentWinsPage > 1) {
            prevWinnerPageButton.style.opacity = "1"
      } else prevWinnerPageButton.style.opacity = "0.3";
      return;
};

/***************************************************************** */

const nextWinsPage = () => {
      const totalPages = (totalCars / 10);
      if (currentWinsPage < totalPages) {
            currentWinsPage += 1;
            //console.log(page);
            renderWinners();
            return;
      } else return;
};

/****************************************************************** */

const prevWinsPage = () => {
            if (currentWinsPage > 1) {
                  currentWinsPage = currentWinsPage - 1;
                  //console.log(currentWinsPage);
                  renderWinners();
                  return;
            } else return;
};

/************************************************************ */ 