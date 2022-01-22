import {baseUrl, path} from "./apiquery";
import { carDriveAnimation, getCarsAnimations } from "./animation";

const startGlobalRaceButton = document.querySelector('.start-race-button') as HTMLElement;
const stopGlobalRaceButton = document.querySelector('.reset-garage') as HTMLElement;

export type RaceItemData = {
    carId: string,
    data: {
        velocity: number,
        distance: number
    },
    index: number,
}

/**************************GET ENGINE******************************** */
const getEngine = async (carId: string, status: string, index: number) => {
    const response = await fetch(`${baseUrl}${path.engine}?id=${carId}&status=${status}`, {
        method: 'PATCH'
    });
    if (response.status === 200 && status === 'started') {
        const data = await response.json();
        const raceItemData: RaceItemData = {
            carId,
            data,
            index
        };
        console.log(raceItemData);
        getDriveMode(raceItemData);
        return raceItemData;
    } else {
        console.log(response.statusText);
        return;
    }
};

/************************START RACE LISTENING********************* */

export const startRaceListening = () => {
    const startButtons: NodeListOf < HTMLElement > = document.querySelectorAll('.start-car');
    const stopButtons: NodeListOf < HTMLElement > = document.querySelectorAll('.stop-car');
    startButtons.forEach((element) => {
        element.addEventListener('click', async () => {
            const carId = element.getAttribute('data-id') as string;
            element.style.opacity = '0.3';
            const index = Array.prototype.indexOf.call(startButtons, element);
            const currentStopButton = stopButtons[index] as HTMLElement;
            currentStopButton.style.opacity = '1';
            // console.log(index);
            await getEngine(carId, 'started', index);
        })
    });
    stopButtons.forEach((element) => {
        element.addEventListener('click', async () => {
            const carId = element.getAttribute('data-id') as string;
            const index = Array.prototype.indexOf.call(stopButtons, element);
            // console.log(carId);
            await getEngine(carId, 'stopped', index);
            element.style.opacity = '0.3';
            const currentStartButton = startButtons[index] as HTMLElement;
            currentStartButton.style.opacity = '1';
        })
    });
};

/*********************************START RACE************** */
const startGlobalRace = () => {
    const startButtons: NodeListOf < HTMLElement > = document.querySelectorAll('.start-car');
    startButtons.forEach(async (element) => {
        element.click();
    });
};

startGlobalRaceButton.addEventListener('click', startGlobalRace);

/***********************STOP RACE***************** */

const stopGlobalRace = () => {
    const stopButtons: NodeListOf < HTMLElement > = document.querySelectorAll('.stop-car');
    stopButtons.forEach(async (element) => {
        element.click();
        const carsAnimations = getCarsAnimations();
        if (carsAnimations.length){
            carsAnimations.forEach(element => {
               element.cancel();                
            });
            
        }
    });
};

stopGlobalRaceButton.addEventListener('click', stopGlobalRace);

/*******************************DRIVE**************** */

const getDriveMode = async (raceItemData: RaceItemData) => {
    const currentCarAnimation = carDriveAnimation(raceItemData);
    currentCarAnimation.play();
    const response = await fetch(`${baseUrl}${path.engine}?id=${raceItemData.carId}&status=drive`, {
        method: 'PATCH'
    });
    const stopButtons: NodeListOf < HTMLElement > = document.querySelectorAll('.stop-car');
    const startButtons: NodeListOf < HTMLElement > = document.querySelectorAll('.start-car');
    const currentStopButton = stopButtons[raceItemData.index] as HTMLElement;
    const currentStartButton = startButtons[raceItemData.index] as HTMLElement;
    if (response.status === 200) {
        console.log(`Car ID =${raceItemData.carId} DRIVE OK`);
        currentStartButton.style.opacity = '1';
        currentStopButton.style.opacity = '0.3';
        return;
    }
    if (response.status === 400) {
        console.log('Wrong parameters for DRIVE: "id" should be any positive number, "status" should be "started", "stopped" or "drive"');
        return;
    }
    if (response.status === 404) {
        console.log(`'Engine parameters for car with such ID =${raceItemData.carId} was not found in the garage. Have you tried to set engine status to "started" before?'`);
        return;
    }
    if (response.status === 404) {
        console.log(`car with such ID =${raceItemData.carId} Drive already in progress. You can't run drive for the same car twice while it's not stopped.`);
        return;
    }
    if (response.status === 500) {
        currentCarAnimation.pause()
        console.log(`Car ID =${raceItemData.carId} has been stopped suddenly. It's engine was broken down.`);
        currentStopButton.click();
    }
};