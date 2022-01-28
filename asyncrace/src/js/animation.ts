import { RaceItemData } from "./racing";
// const itemRaceContainer = document.querySelector('.item-race-container') as HTMLElement;
// const currentCar = document.querySelector('.car-item') as HTMLElement;

/******************CAR DRIVE ANIMATION******************** */
export const carDriveAnimation = (raceItemData: RaceItemData): Animation => {    
    const carItems : NodeListOf < HTMLElement > = document.querySelectorAll('.car-item');
    const currentCar = carItems[raceItemData.index] as HTMLElement;   
    const raceTime = raceItemData.data.distance / raceItemData.data.velocity;
    const animation = currentCar.animate([
  { // from
    left: '0',
    //color: "#fff"
  },
  { // to
   left: '87%',
   // color: "#000"
  }
], {
    id:raceItemData.carId,
    duration:raceTime,
   fill:"forwards",});
   carAnimations.push(animation);
return animation;
};

/****************GET CARS ANIMATIONS*************** */
export const carAnimations: Array <Animation> = [];

export const getCarsAnimations = (index: number, method: string): void => {
     
  const carItems = document.querySelectorAll('.car-item')as NodeListOf < HTMLElement >; 
  const currentCar = carItems[index] as HTMLElement
  const currentCarAnimations = currentCar.getAnimations();  
     if (currentCarAnimations.length) {
         currentCarAnimations.forEach((el)=> {
           if (method === 'pause' ) {
        el.pause(); 
      } else if (method === 'cancel') {
        el.cancel();
      }
      });
    }
  
  return;
};
/****************************ENGINE BROKEN ANIMATION***** */
export const brockenEngineAnimation = (index: number): Animation => {
    const carItems : NodeListOf < HTMLElement > = document.querySelectorAll('.item-warning-container');
    const currentCar = carItems[index] as HTMLElement;
    currentCar.textContent = 'Check Engine!';
    const animation = currentCar.animate([
  { // from 
      
    backgroundColor: "transparent"
  },
  { // to
  backgroundColor: "orange"
  }
], {
    id: `brokenEngine${index}`,
    duration:800,
   iterations: Infinity,});
   carAnimations.push(animation);
return animation;
};

/******************Winner ANIMATION******** */

export const winnerAnimation = (index: number): Animation => {
    const carItems : NodeListOf < HTMLElement > = document.querySelectorAll('.item-warning-container');
    const currentCar = carItems[index] as HTMLElement;
    currentCar.textContent = 'WINNER!';
    const animation = currentCar.animate([
  { // from 
      
    backgroundColor: "transparent"
  },
  { // to
  backgroundColor: "green"
  }
], {
    id: `winner${index}`,
    duration:800,
   iterations: Infinity,});
   carAnimations.push(animation);
return animation;
};

/**************************CANCEL ANIMATIONS **************/
export const cancelCarAnimations = (): void => {
  carAnimations.forEach(element => {
    element.cancel();
  });
  carAnimations.length = 0;
  const carItems : NodeListOf < HTMLElement > = document.querySelectorAll('.item-warning-container');
    carItems.forEach(element => {
      element.textContent = '';
    });
    
};