import { getWarning, Car, path, CarItem,  baseUrl } from "./apiquery";
import { modelsCars, brandsCars } from "./carsmodels";
import { renderGarage} from "./garage";



export const generateCars = (): void => {
  const generateCarsButton = document.querySelector('.generate-cars') as HTMLElement;
    generateCarsButton.addEventListener('click', async()=> {
        getWarning('Please wait a sec');
        const promiseSet = generateCarsSetPromise(100);
        const response = await Promise.allSettled(promiseSet);
        if (response) {
        renderGarage();        
        } else getWarning('Problems with server');
    })
};

const getRandomIntInclusive = (min: number, max: number): number => {
   min = Math.ceil(min);
   max = Math.floor(max);
   return Math.floor(Math.random() * (max - min + 1)) + min; //Максимум и минимум включаются
}

// const getRandomNum = () => {
//    bgNum = getRandomIntInclusive(1, 20);
//    //console.log(bgNum + "random");
//    setTimeout(getRandomNum, 160000);
// }

const getRandomCarName = (): string => {
    const carModel= modelsCars[getRandomIntInclusive(0, modelsCars.length - 1)] as string;
    const carBrand = brandsCars[getRandomIntInclusive(0, brandsCars.length - 1)] as string;
    const carName = `${carBrand} ${carModel}`;
    return carName;
};

const getRandomColor = (): string => {    
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};
/************************************************************ */
const createRandomCar = (): CarItem => {
    const newCarName = getRandomCarName();
   const newCarColor = getRandomColor();   
   const car = new Car(
      newCarName,
      newCarColor,
      );
   //console.log(JSON.stringify(car));
   return car;
};
/******************************************************* */
const generateCarsSetPromise = (quantity = 100): Array<Promise<Response>> => {
    const carsSetPromise = [];
    for (let i = 0; i < quantity; i++) {
        const car = createRandomCar();
        const response =  fetch(`${baseUrl}${path.garage}`, {
      method: 'POST',
      headers: {
         'Content-Type': 'application/json',
      },
      body: JSON.stringify(car),
   });
   carsSetPromise.push(response);
    }
    return carsSetPromise;
};