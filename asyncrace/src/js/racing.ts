import {baseUrl, getWarning, path} from "./apiquery";
import { carDriveAnimation, getCarsAnimations, brockenEngineAnimation, winnerAnimation , cancelCarAnimations} from "./animation";
import { renderGarage } from "./garage";
import { getWinner } from "./winners";

/*************************************************************** */
let totalCarsEndRace = 0;
export let globalRaceStarted = false;
const raceEndItems: RaceItemData[] = [];
export let localRaceStarted = false;


export type RaceItemData = {
    carName: string,
    carId: string,
    data: {
        velocity: number,
        distance: number
    },
    index: number,
    startRaceTime: number;
    elapsedRaceTime: number;
};
/**************************GET ENGINE******************************** */
const getEngine = async (carName: string, carId: string, status: string, index: number): Promise<void | RaceItemData> => {    
    const response = await fetch(`${baseUrl}${path.engine}?id=${carId}&status=${status}`, {
        method: 'PATCH'
    });
    if (response.status === 200 && status === 'started') {
        const data = await response.json();
        const startRaceTime = performance.now();
        const raceItemData: RaceItemData = {
            carName,
            carId,
            data,
            index,
            startRaceTime,
           elapsedRaceTime:0,
        };
       // console.log(raceItemData);
        getDriveMode(raceItemData);
        return raceItemData;
    } else if (response.status === 429) {
        getWarning(`car with such ID =${carId} Drive already in progress. You can't run drive for the same car twice while it's not stopped.`);        
        return;
    } else if (response.status === 200 && status === 'stopped') {
        const status = localRaceStarted ? 'cancel': 'pause';
        getCarsAnimations(index, status);      
        return;
    } else return;
};

/************************START RACE LISTENING********************* */
export const startRaceListening = (): void => {
    const startGlobalRaceButton = document.querySelector('.start-race-button') as HTMLElement;
    const stopGlobalRaceButton = document.querySelector('.reset-garage') as HTMLElement;
    stopGlobalRaceButton.addEventListener('click', stopGlobalRace);
    startGlobalRaceButton.addEventListener('click', () =>{
    if (globalRaceStarted) {
       // getWarning('Please WAIT until END RACE!');
        return;
    }
    startGlobalRace();
});

    const startButtons: NodeListOf < HTMLElement > = document.querySelectorAll('.start-car');
    const stopButtons: NodeListOf < HTMLElement > = document.querySelectorAll('.stop-car');
    startButtons.forEach((element) => {
       element.addEventListener('click', async() => {
            if (!globalRaceStarted && !localRaceStarted) {
                cancelCarAnimations(); 
                 localRaceStarted = true;              
            }else if (localRaceStarted) {
     getWarning(`Drive already in progress.
      You can't run drive for the same car twice while it's not stopped.`); 
     return;   
    }
    if (element.style.opacity !== '0.3' ){
            const carId = element.getAttribute('data-id') as string;
            const carName = element.getAttribute('data-name') as string;
            element.style.opacity = '0.3';
            const index = Array.prototype.indexOf.call(startButtons, element);
            const currentStopButton = stopButtons[index] as HTMLElement;
            currentStopButton.style.opacity = '1';
            // console.log(index);
            await getEngine(carName, carId, 'started', index); 
    } else {getWarning(`Drive already in progress.
      You can't run drive for the same car twice while it's not stopped.`); 
     return;}
        })
    });
    stopButtons.forEach((element) => {
        element.addEventListener('click', async () => {           
            const carId = element.getAttribute('data-id') as string;
            const carName = element.getAttribute('data-name') as string;
            const index = Array.prototype.indexOf.call(stopButtons, element);
            // console.log(carId);
            await getEngine(carName, carId, 'stopped', index);
            element.style.opacity = '0.3';
            const currentStartButton = startButtons[index] as HTMLElement;
            currentStartButton.style.opacity = '1';
        })
    });
};

/*********************************START RACE************** */
const startGlobalRace = async(): Promise<void> => {
    const startGlobalRaceButton = document.querySelector('.start-race-button') as HTMLElement;
    startGlobalRaceButton.style.opacity ='0.3';
    if(!globalRaceStarted) {
    globalRaceStarted = true;
    localRaceStarted = false;
    raceEndItems.length = 0;
    totalCarsEndRace = 0;
    cancelCarAnimations();
    await renderGarage();        
    const startButtons: NodeListOf < HTMLElement > = document.querySelectorAll('.start-car');
    startButtons.forEach(async (element) => {
        element.click();
    });
} else return;
};
//--------------------------------------------------------


/***********************STOP RACE***************** */
export const stopGlobalRace = async():Promise<void> => {
    globalRaceStarted = false;
    const stopButtons: NodeListOf < HTMLElement > = document.querySelectorAll('.stop-car');
    stopButtons.forEach(async (element) => {
        element.click();        
        });
       await cancelCarAnimations();
        await renderGarage();
    
};
//-------------------------------------------------------------

/*******************************DRIVE*******************/
const getDriveMode = async (raceItemData: RaceItemData): Promise<void> => {
    const currentCarAnimation = carDriveAnimation(raceItemData);
    currentCarAnimation.play();    
    const response = await fetch(`${baseUrl}${path.engine}?id=${raceItemData.carId}&status=drive`, {
        method: 'PATCH'
    });
    const stopButtons: NodeListOf < HTMLElement > = document.querySelectorAll('.stop-car');
    const startButtons: NodeListOf < HTMLElement > = document.querySelectorAll('.start-car');
    const currentStopButton = stopButtons[raceItemData.index] as HTMLElement;    
    const totalCarsRacing: number = startButtons.length;    
    if (response.status === 200) {
        const elapsedTime = performance.now() - raceItemData.startRaceTime;
        raceItemData.elapsedRaceTime = Math.round(elapsedTime / 1000);
       console.log(`Car ID =${raceItemData.carId} end Race`);
       if (currentStopButton.style.opacity === '1') {
        // currentStopButton.click();
        raceEndItems.push(raceItemData);
       }
        totalCarsEndRace += 1;
        endRace(totalCarsEndRace, totalCarsRacing);
        return;
    }
    if (response.status === 400) {
        console.log('Wrong parameters for DRIVE: "id" should be any positive number, "status" should be "started", "stopped" or "drive"');
        totalCarsEndRace += 1;
        endRace(totalCarsEndRace, totalCarsRacing);
        return;
    }
    if (response.status === 404) {
        console.log(`'Engine parameters for car with such ID =${raceItemData.carId} was not found in the garage. Have you tried to set engine status to "started" before?'`);
        totalCarsEndRace += 1;
        endRace(totalCarsEndRace, totalCarsRacing);
        return;
    }
    if (response.status === 429) {
        getWarning(`car with such ID =${raceItemData.carId} Drive already in progress. You can't run drive for the same car twice while it's not stopped.`);
        totalCarsEndRace += 1;
        endRace(totalCarsEndRace, totalCarsRacing);
        return;
    }
    if (response.status === 500) {
        totalCarsEndRace += 1;
        currentCarAnimation.pause()
        if (currentCarAnimation.currentTime) {
        const brokenEngine = brockenEngineAnimation(raceItemData.index);
        brokenEngine.play();
        console.log(`Car ID =${raceItemData.carId} has been stopped suddenly. It's engine was broken down.`);
        }
        currentStopButton.click();
        endRace(totalCarsEndRace, totalCarsRacing);
    }
};

/*********************************************************************** */
const endRace = (totalCarsEndRace: number, totalCarsRacing: number): void => {
   const startGlobalRaceButton = document.querySelector('.start-race-button') as HTMLElement;
    localRaceStarted = false;  
    if (globalRaceStarted && raceEndItems.length == 1) {
        if (raceEndItems[0]) {
        getWarning(`WINNER-${raceEndItems[0]?.carName}`);
        const index =raceEndItems[0]?.index
        if (index !== undefined){
        const winAnimation = winnerAnimation(index);
        winAnimation.play();
        getWinner(raceEndItems[0]);
       // console.log(raceEndItems[0]);
        }
    }}
    if (totalCarsEndRace === totalCarsRacing){
        startGlobalRaceButton.style.opacity = '1';
        const stopButtons: NodeListOf < HTMLElement > = document.querySelectorAll('.stop-car');
    stopButtons.forEach(async (element) => {
        element.click();        
        });
        globalRaceStarted = false;
    }
};

