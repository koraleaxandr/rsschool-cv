import { baseUrl, path } from "./apiquery";

const startGlobalRaceButton = document.querySelector('.start-race-button') as HTMLElement;

const getEngine = async(carId: string, status:string) =>{     
    const response = await fetch(`${baseUrl}${path.engine}?id=${carId}&status=${status}`,{method: 'PATCH'});
//     const data = await JSON.stringify(response);
     //console.log(response);
//    return data;  
if (response.status === 200) {
     const data = await response.json();  
   console.log(data)
   return data;
    } else {
         console.log(response);          
    }
};

export const startRaceListening = () => {
const startButtons: NodeListOf < HTMLElement > = document.querySelectorAll('.start-car');
const stopButtons: NodeListOf < HTMLElement > = document.querySelectorAll('.stop-car');
//console.log(startButtons);
startButtons.forEach((element) => {
    element.addEventListener('click', async() => {
        const carId = element.getAttribute('data-id') as string;
        element.style.opacity = '0.3';
       const index= Array.prototype.indexOf.call(startButtons, element);
      // console.log(index);
       const currentStopButton = stopButtons[index] as HTMLElement;
       currentStopButton.style.opacity = '1';
      // console.log(index);
       await getEngine(carId, 'started');
    })    
});
stopButtons.forEach((element) => {
    element.addEventListener('click', async() => {
        const carId = element.getAttribute('data-id') as string;
       // console.log(carId);
       await getEngine(carId, 'stopped');
       element.style.opacity = '0.3';
       const index= Array.prototype.indexOf.call(stopButtons, element);
       const currentStartButton =startButtons[index] as HTMLElement;
       currentStartButton.style.opacity = '1';
    })    
});
};

const startGlobalRace = () => {
   const startButtons: NodeListOf < HTMLElement > = document.querySelectorAll('.start-car');
   startButtons.forEach(async(element) => {      
   element.click();   
   });
}; 

startGlobalRaceButton.addEventListener('click', startGlobalRace);