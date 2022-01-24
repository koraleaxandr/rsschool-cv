import {
   RaceItemData
} from "./racing";
import {
   baseUrl,
   path,
   getCarInGarageForId,
  CarItem 
} from "./apiquery";
import { carItemHtml, carItemImage } from "./data";


type winsData = {
   id: number,
   wins: number,
   time: number
}

/*****************GET WINNER****************************** */
export const getWinner = async (raceItemData: RaceItemData) => {
   const response = await fetch(`${baseUrl}${path.winners}/${raceItemData.carId}`, {
      method: 'GET',
   });
   if (response.ok) {
      const data = await response.json();
      updateRaceWinner(raceItemData, data);
      console.log(data);
   } else createRaceWinner(raceItemData);
};

/******************CREATE WINNER*********************** */
const createRaceWinner = async (raceItemData: RaceItemData) => {
   const wins = 1;
   const bestTime = raceItemData.elapsedRaceTime;
   const response = await fetch(`${baseUrl}${path.winners}`, {
      method: 'POST',
      headers: {
         'Content-Type': 'application/json',
      },
      body: JSON.stringify({
         id: raceItemData.carId,
         wins: wins,
         time: bestTime,
      }),
   });
   console.log(response);
   const data = await response.json();
   console.log(data);
};

/***************************UPDATE WINNER*****************/
const updateRaceWinner = async (raceItemData: RaceItemData, data: winsData) => {
   const wins = data.wins + 1;
   const bestTime = raceItemData.elapsedRaceTime <= data.time ? raceItemData.elapsedRaceTime : data.time;
   const dataParams = `/${raceItemData.carId}`;
   const response = await fetch(`${baseUrl}${path.winners}${dataParams}`, {
      method: 'PUT',
      headers: {
         'Content-Type': 'application/json',
      },
      body: JSON.stringify({
         wins: wins,
         time: bestTime,
      }),
   });
   console.log(response);
};

/*************************DELETE WINNER/************** */
export const deleteWinner = async (id: number) => {
   const response = await fetch(`${baseUrl}${path.winners}/${id}`, {
      method: 'DELETE',
   });
   const data = await response.json();
   return data;
};

const listenDeleteWinner = () => {
   const deleteWinnerButtons = document.querySelectorAll('.winner_delete');
   deleteWinnerButtons.forEach((el) => {
      el.addEventListener('click' , async() => {
         console.log('del');
      const carId = Number(el.getAttribute('data-id'));
      await deleteWinner(carId);
      await  renderWinners();
   });
});
}; 

/*******************************GET WINNERS****** */
let totalCars = 0;
let sort = 'id';
let order = 'ASC';
const page = 1;

export const getWinners = async (page: number, sort: string, order: string, limit = 10) => {
   // const queryParams = `_sort=['id'|'wins'|'time']  _order=['ASC'|'DESC']`;
   const response = await fetch(`${baseUrl}${path.winners}?_page=${page}&_limit=${limit}&_sort=${sort}&_order=${order}`, {
      method: 'GET',
   });
   if (response.ok) {
      const data: [winsData] = await response.json();
      totalCars = Number(response.headers.get('X-Total-Count'));
      console.log(totalCars);
      return data;
   } else return;
};

/******************************RENDER WINNER CONTAINER***** */
export const winnersContainer = document.querySelector('.winners') as HTMLElement;
const winnersTablecontainer = document.querySelector('.winners_table_container') as HTMLElement;
export const bigGarageContainer = document.querySelector('.garage');


export const renderWinners = async () => {
   winnersContainer?.classList.remove('off');
   bigGarageContainer?.classList.add('off');
   const data = await getWinners(page, sort, order, 10) as[winsData];
   console.log(`WINNERS`)
   console.log(data)
   let winnersContainerHtml = '';   
   let i = 0;
   for (i; i < data.length; i++) {
      const element = data[i] as winsData;      
      const currentCar = await getCarInGarageForId(`${element.id}`)as CarItem;
      const winnerLineHtml = `
      <div class="winner_line_container">
   <div class="table-number">${1+i}</div>
      <div class="winner_image">${carItemHtml}
      ${currentCar.color}" stroke="white" stroke-width="200">
      ${carItemImage}</div>
      <div class="winner_name">${currentCar?.name}</div>
      <div class="winner_wins_number">${element.wins}</div>
      <div class="winner_best_time">${element.time}</div>
      <div class="winner_delete"data-id="${element.id}">DEL</div>
      </div>`;
      winnersContainerHtml = winnersContainerHtml + winnerLineHtml;      
   }
   winnersTablecontainer.innerHTML = winnersContainerHtml;
   listenDeleteWinner(); 
   activeButtons();  
};

/*******************************SORT BY************** */

const sortById = document.querySelector('.winners_sort_id') as HTMLElement;
const sortByWins = document.querySelector('.winners_sort_wins') as HTMLElement;
const sortByTime = document.querySelector('.winners_sort_time') as HTMLElement;
const sortByAsc = document.querySelector('.winners_sort_ASC') as HTMLElement;

const sortWinners = () =>{
   sortById.addEventListener('click', ()=>{
      sort = 'id';
      renderWinners();
   });
   sortByWins.addEventListener('click', ()=>{
      sort = 'wins';
      renderWinners();
   });
   sortByTime.addEventListener('click', ()=>{
      sort = 'time';
      renderWinners();
   });
   sortByAsc.addEventListener('click', ()=>{
      order = order ==='ASC'? 'DESC': 'ASC';
      sortByAsc.textContent = order;
      renderWinners();
   }); 
};

sortWinners();
/******************************************************************* */
const activeButtons =() =>{
   switch (sort) {
    case 'id':
       sortById.style.opacity = '1';
       sortByWins.style.opacity = '0.3';
       sortByTime.style.opacity = '0.3';
       break;
       case 'wins':
       sortById.style.opacity = '0.3';
       sortByWins.style.opacity = '1';
       sortByTime.style.opacity = '0.3';
       break;
       case 'time':
       sortById.style.opacity = '0.3';
       sortByWins.style.opacity = '0.3';
       sortByTime.style.opacity = '1';
       break;
 
    default:
       sortById.style.opacity = '0.3';
       sortByWins.style.opacity = '0.3';
       sortByTime.style.opacity = '0.3';
       break;
 } 
};