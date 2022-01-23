import { RaceItemData } from "./racing";
import {baseUrl, path} from "./apiquery";
import { off } from "process";

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
const data = await response.json() as winsData;
updateRaceWinner(raceItemData, data);
} else createRaceWinner(raceItemData);
};

/******************CREATE WINNER*********************** */
const createRaceWinner = async(raceItemData: RaceItemData) =>{
    const wins = 1;
    const bestTime = raceItemData.elapsedRaceTime;
    const dataParams = `?id=${raceItemData.carId}&wins=${wins}&time=${bestTime}`
 const response = await fetch(`${baseUrl}${path.winners}${dataParams}`, {
      method: 'POST',
      headers: {
         'Content-Type': 'application/json',
      },     
   });
   console.log(response);
};

/***************************UPDATE WINNER*****************/
const updateRaceWinner = async(raceItemData: RaceItemData, data: winsData) =>{
    const wins = data.wins + 1;   
  const bestTime = raceItemData.elapsedRaceTime <= data.time? raceItemData.elapsedRaceTime : data.time;
    const dataParams = `/${raceItemData.carId}?wins=${wins}&time=${bestTime}`;
 const response = await fetch(`${baseUrl}${path.winners}${dataParams}`, {
      method: 'PUT',
      headers: {
         'Content-Type': 'application/json',
      },     
   });
   console.log(response);
};

/******************************RENDER WINNER CONTAINER***** */
export const winnersContainer = document.querySelector('.winners');
export const bigGarageContainer = document.querySelector('.garage');


export const renderWinners = async() => {
winnersContainer?.classList.remove('off');
bigGarageContainer?.classList.add('off');
};