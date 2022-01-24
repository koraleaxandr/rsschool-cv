import { RaceItemData } from "./racing";
import {baseUrl, path, garageResponcedata} from "./apiquery";


type winsData = {
     id: number,
      wins: number,
      time: number
}

/*****************GET WINNER****************************** */
export const getWinner = async(raceItemData: RaceItemData) =>{  
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
const createRaceWinner = async(raceItemData: RaceItemData) =>{
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
const updateRaceWinner = async(raceItemData: RaceItemData, data: winsData) =>{
    const wins = data.wins + 1;   
  const bestTime = raceItemData.elapsedRaceTime <= data.time? raceItemData.elapsedRaceTime : data.time;
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
export const deleteWinner = async(id: number) =>{   
   const response = await fetch(`${baseUrl}${path.winners}/${id}`, {
      method: 'DELETE',       
});
const data = await response.json();
return data;
};

/*******************************GET WINNERS****** */
let totalCars = 0;

export const getWinners = async(page: number, limit = 10) =>{
   const queryParams =`_sort=['id'|'wins'|'time']  _order=['ASC'|'DESC']`;
   const response = await fetch(`${baseUrl}${path.winners}?_page=${page}&_limit=${limit}&_sort=time&_order=ASC`, {
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


export const renderWinners = async() => {
winnersContainer?.classList.remove('off');
bigGarageContainer?.classList.add('off');
const data = await getWinners(1, 10) as [winsData];
let winnersContainerHtml = '';
data.forEach((element) => {
   const winnerLineHtml = `
   <div class="table-number">№</div>
      <div class="winner_image">${element.id}</div>
      <div class="winner_name">ывава</div>
      <div class="winner_wins_number">${element.wins}</div>
      <div class="winner_best_time">${element.time}</div>
      <div class="winner_delete">DEL</div>`;
   winnersContainerHtml += winnerLineHtml;
});
winnersTablecontainer.innerHTML = winnersContainerHtml;
};