import { baseUrl, path } from "./apiquery";

//const startGlobalRaceButton = document.querySelector('.start-race-button') as HTMLElement;

const startEngine = async(carId: string) =>{  
    console.log(`${baseUrl}${path.engine}?id=${carId}&_status=started, {method: 'PATCH'}`);  
    const response = await fetch(`${baseUrl}${path.engine}?id=${carId}&_status=started, {method: 'PATCH'}`);
//     const data = await JSON.stringify(response);
//     console.log(response);
//    return data;  
if (response.status === 200) {
      return response.json();
    } else {
         console.log(response);          
    }
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