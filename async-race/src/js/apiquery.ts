const baseUrl = 'http://127.0.0.1:3000';
const path = {
    garage: '/garage'
}

type CarItem = {
   id: string;
   name: string;
   color: string;
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
}

//getCarsInGarage();

export const getCarInGarageForId =async (carId: string) => {
   const response = await fetch(`${baseUrl}${path.garage}?id=${carId}`);
   const data = await response.json();
   console.log(data);
}

//getCarInGarageForId(3);