import "../css/style.css";
import "../css/footerstyle.css";

const baseUrl = 'http://127.0.0.1:3000';
const path = {
    garage: '/garage'
}
//let queryParams: [{key:string, value:string}];

const getQueryParamsString = (queryParams: [{key:string, value:string}] = []) =>{
   queryParams.length ? `?${queryParams.map(x => `${x.key}=${x.value}`).join('&')}` : '';
}

const getCarsInGarage =async (queryParams) => {
   const response = await fetch(`${baseUrl}${path.garage}${getQueryParamsString(queryParams)}`);
   const data = await response.json();
   console.log(data);
}

getCarsInGarage();

const getCarInGarageForId =async (carId: number) => {
   const response = await fetch(`${baseUrl}${path.garage}?id=${carId}`);
   const data = await response.json();
   console.log(data);
}

getCarInGarageForId(3);