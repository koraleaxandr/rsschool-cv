import { baseUrl, path } from "./apiquery";

//const startGlobalRaceButton = document.querySelector('.start-race-button') as HTMLElement;

const startEngine = async(carId: string) =>{
    console.log(carId);
    const responce = await fetch(`${baseUrl}${path.engine}`, {
      method: 'PATCH',
     body: JSON.stringify({
         'id': '10',
         "status": 'started',
     }),
   });
   console.log(responce);
  
};

export const startRaceListening = () => {
const startButtons: NodeListOf < Element > = document.querySelectorAll('.start-car');
console.log(startButtons);
startButtons.forEach((element) => {
    element.addEventListener('click', async() => {
        const carId = element.getAttribute('data-id') as string;
        console.log(carId);
       await startEngine(carId);
    })    
});
};