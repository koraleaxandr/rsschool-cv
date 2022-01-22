import { RaceItemData } from "./racing";
// const itemRaceContainer = document.querySelector('.item-race-container') as HTMLElement;
// const currentCar = document.querySelector('.car-item') as HTMLElement;

/******************CAR DRIVE ANIMATION******************** */
export const carDriveAnimation = (raceItemData: RaceItemData) => {
    const itemRaceContainers: NodeListOf < HTMLElement > = document.querySelectorAll('.item-race-container');
    const carItems : NodeListOf < HTMLElement > = document.querySelectorAll('.car-item');
    const currentCar = carItems[raceItemData.index] as HTMLElement;
    const itemRaceContainer = itemRaceContainers[raceItemData.index] as HTMLElement;
    console.log(itemRaceContainer);
    const raceTime = raceItemData.data.distance / raceItemData.data.velocity;
    const animation = currentCar.animate([
  { // from
    left: '0',
    //color: "#fff"
  },
  { // to
   left: '85%',
   // color: "#000"
  }
], {
    id:raceItemData.carId,
    duration:raceTime,
   fill:"forwards",});
return animation;
};

/****************GET CARS ANIMATIONS*************** */
const carAnimations: Array <Animation> = [];
export const getCarsAnimations = () => {
  carAnimations.length = 0;     
  const carItems : NodeListOf < HTMLElement > = document.querySelectorAll('.car-item');
  
  carItems.forEach(element => {
     const currentCarAnimations = element.getAnimations();
     if (currentCarAnimations.length) {
         currentCarAnimations.forEach(el=>{
        carAnimations.push(el);
         });
        }     
  });
  return carAnimations;
};