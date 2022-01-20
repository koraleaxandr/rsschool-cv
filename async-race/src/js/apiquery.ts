import {
   renderGarage
} from "./garage";

export const baseUrl = 'http://127.0.0.1:3000';
export const path = {
   garage: '/garage',
   engine: '/engine',
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
   const data = await response.json() as CarItem[];  
   console.log(data)
   return data;
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
const createCarButton = document.querySelector('.create-car') as HTMLElement;

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
   console.log(JSON.stringify(car));
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

//-------------------------------------------------------------
const editCarButton = document.querySelector('.update-car') as HTMLElement;
const editcarModelButton = document.querySelector('.car-model-edit') as HTMLInputElement;
const editcarColorButton = document.querySelector('.car-color-edit') as HTMLInputElement;
const updateCarContainer = document.querySelector('.update-car-container') as HTMLElement;

//---------------------------SELECT CAR----------------------------

export const selectCar = () => {
  const selectCarButtons: NodeListOf < Element > = document.querySelectorAll('.select-car');
  selectCarButtons.forEach((element) => {
    element.addEventListener('click', async() => {
      const carId = element.getAttribute('data-id') as string; 
      const data = await getCarInGarageForId(carId);
      console.log(data[0]);
      const currentCar = data[0] as CarItem;
      editcarModelButton.value = currentCar.name;
      editcarColorButton.value = currentCar.color;
      editCarButton.setAttribute('data-id',carId);
     updateCarContainer.style.opacity = '1';
    })
  });
};

/******************************UPDATE CAR************************** */

const updateCar = async() =>{
   const carId = editCarButton.getAttribute('data-id') as string;
   const data = await getCarInGarageForId(carId);
     const currentCar = data[0] as CarItem;   
     currentCar.name = editcarModelButton.value;
      currentCar.color = editcarColorButton.value;      
   const response = await fetch(`${baseUrl}${path.garage}/${carId}`, {
            method: 'PUT',
            headers: {
         'Content-Type': 'application/json',
      },
            body: JSON.stringify(currentCar),
         });
         editcarModelButton.value = '';
         updateCarContainer.style.opacity = '0.3';
         renderGarage();
         return response;
};

editCarButton.addEventListener('click', () =>{
   if (editcarModelButton.value) {
   updateCar();
   } else {
    getWarning('Please select CAR!'); 
   }
});

/*********************************************************************** */