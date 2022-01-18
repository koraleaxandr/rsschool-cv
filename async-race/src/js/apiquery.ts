const baseUrl = 'http://127.0.0.1:3000';
const path = {
    garage: '/garage'
};

interface CarItem  {
   id: string,
   name: string,
   color: string,
   status: string,
   wins: string,
   time: string,
}

class Car implements CarItem {
   constructor(id: string, name: string, color: string, status: string, wins: string, time: string,) {
      this.id = id;
      this.name = name;
      this.color = color;
      this.status = status;
      this.wins = wins;
      this.time = time;

   }
}
export let garageResponcedata:CarItem[] = [];
//let queryParams: [{key:string, value:string}];

// const getQueryParamsString = (queryParams = []) =>{
//    queryParams.length ? `?${queryParams.map(x => `${x.key}=${x.value}`).join('&')}` : '';
// }

export const getCarsInGarage = async () => {
   const response = await fetch(`${baseUrl}${path.garage}`);
   garageResponcedata = await response.json();
 //console.log(garageResponcedata); 
 //return garageResponcedata; 
};

//getCarsInGarage();

export const getCarInGarageForId =async (carId: string) => {
   const response = await fetch(`${baseUrl}${path.garage}?id=${carId}`);
   const data = await response.json();
   console.log(data);
};

// export const createCar = () => {
// const carModelCreate = document.querySelector('.car-model-create')as HTMLInputElement;
// const newCarName: string = carModelCreate.value;
// if (!newCarModel) return;
// const carColorCreate = document.querySelector('.car-color-create')as HTMLInputElement;
// const newCarColor: string = carColorCreate.value;
// const newCarID: string = (garageResponcedata.length + 1).toString();

// const car = new Car({id: newCarID,
//    name: newCarName,
//    color: newCarColor,
//    status: 'stopped',
//    wins: '',
//    time: ''});
// console.log(car);
// };