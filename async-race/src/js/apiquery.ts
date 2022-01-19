import {
   renderGarage
} from "./garage";

const baseUrl = 'http://127.0.0.1:3000';
const path = {
   garage: '/garage'
};
export let garageResponcedata: CarItem[] = [];

/************************************************************************** */
const warningDiv = document.getElementById('warning-message') as HTMLElement;
const totalCountString = document.querySelector('.total-count') as HTMLElement;
const carColorCreate = document.querySelector('.car-color-create') as HTMLInputElement;
const carModelCreate = document.querySelector('.car-model-create') as HTMLInputElement;
/*************************************************************************** */

interface CarItem {
   id: string,
      name: string,
      color: string,
      status?: string,
      wins?: string,
      time?: string,
}

class Car implements CarItem {
   name: string;
   id: string;
   color: string;
   status?: string;
   wins?: string;
   time?: string;
   constructor(id: string, name: string, color: string, status: string, wins: string, time: string, ) {
      this.id = id;
      this.name = name;
      this.color = color;
      this.status = status;
      this.wins = wins;
      this.time = time;

   }
}

//let queryParams: [{key:string, value:string}];

// const getQueryParamsString = (queryParams = []) =>{
//    queryParams.length ? `?${queryParams.map(x => `${x.key}=${x.value}`).join('&')}` : '';
// }

export const getCarsInGarage = async () => {
   const response = await fetch(`${baseUrl}${path.garage}`);
   garageResponcedata = await response.json();
   totalCountString.textContent = ` (${garageResponcedata.length})`
   //console.log(garageResponcedata); 
   //return garageResponcedata; 
};

//getCarsInGarage();

export const getCarInGarageForId = async (carId: string) => {
   const response = await fetch(`${baseUrl}${path.garage}?id=${carId}`);
   const data = await response.json();
  // const currentCar = new Car(data[0]);
   //console.log(currentCar)
   //return currentCar;
};

//****************************WARNING*************************** */
const getWarning = (message: string) => {
   warningDiv.textContent = message;
   warningDiv.classList.remove('off');
   warningDiv.classList.remove('hidden');

   setTimeout(() => {
      warningDiv.classList.add('hidden');
   }, 3000);
   setTimeout(() => {
      warningDiv.classList.add('off');
   }, 4000);
};

/*******************************************CREATE CAR**************** */
export const createCar = async () => {
   const newCarName: string = carModelCreate.value;
   if (!newCarName) {
      getWarning('Input Car Model!');
      return;
   }
   const newCarColor: string = carColorCreate.value;   
   const car = new Car('',
      newCarName,
      newCarColor,
      'stopped',
      '',
      '');
   //console.log(car);
   carModelCreate.value = '';
   const response = await fetch(`${baseUrl}${path.garage}`, {
      method: 'POST',
      headers: {
         'Content-Type': 'application/json',
      },
      body: JSON.stringify(car),
   });
   console.log(response.status);
   const newcar = await response.json();
   renderGarage();
   return newcar;
};

//-------------------------------------------------------------
const createCarButton = document.querySelector('.create-car') as HTMLElement;
//const editCarButton = document.querySelector('.edit-car') as HTMLElement;

//-------------------------------------------------------------
createCarButton.addEventListener('click', () => {
   createCar();
});

/*************************************************************************** */

export const removeCar = () => {
   const removeCarButtons: NodeListOf < Element > = document.querySelectorAll('.remove-car');
   removeCarButtons.forEach((element) => {
      element.addEventListener('click', async () => {
         const carID = element.getAttribute('data-id');
         const response = await fetch(`${baseUrl}${path.garage}/${carID}`, {
            method: 'DELETE',
            body: carID,
         });
         console.log(response.status);
         renderGarage();
      })
   });
};

export const selectCar = () => {
  const selectCarButtons: NodeListOf < Element > = document.querySelectorAll('.select-car');
  selectCarButtons.forEach((element) => {
    element.addEventListener('click', async() => {
      const carId = element.getAttribute('data-id') as string; 
      getCarInGarageForId(carId);
    })
  });
};