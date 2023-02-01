import { renderGarage } from "./garage";
import { deleteWinner } from "./winners";

export const baseUrl = "https://async-race-api-tu1v.onrender.com";
export const path = {
  garage: "/garage",
  engine: "/engine",
  winners: "/winners",
};
export let garageResponseData: CarItem[] = [];
export let totalCars: number;

/************************************************************************** */

/*************************************************************************** */

export interface CarItem {
  id?: string;
  name: string;
  color: string;
  status?: string;
  wins?: string;
  time?: string;
}
//-----------------------------------------------------
export class Car implements CarItem {
  name: string;
  id?: string;
  color: string;
  status?: string;
  wins?: string;
  time?: string;
  constructor(
    name: string,
    color: string,
    id?: string,
    status?: string,
    wins?: string,
    time?: string
  ) {
    this.id = id;
    this.name = name;
    this.color = color;
    this.status = status;
    this.wins = wins;
    this.time = time;
  }
}

/*************************************GET INDEX NodeList ELEMENTS************** */

export const getIndexNodeElements = (
  nodeList: NodeListOf<HTMLElement>,
  element: HTMLElement
): number => {
  const index = Array.prototype.indexOf.call(nodeList, element);
  if (index) {
    return index;
  } else return -1;
};

/**************************************GET CARS**************************************** */
export const getCarsInGarage = async (
  page: number,
  limit = "7"
): Promise<CarItem[]> => {
  const response = await fetch(
    `${baseUrl}${path.garage}?_page=${page}&_limit=${limit}`
  );
  garageResponseData = await response.json();
  totalCars = Number(response.headers.get("X-Total-Count"));
  const totalCountString = document.querySelector(
    ".total-count"
  ) as HTMLElement;
  totalCountString.textContent = ` (${totalCars})`;
  // console.log(garageResponseData);
  return garageResponseData;
};

//----------------------------------------------------------------------
export const getCarInGarageForId = async (
  carId: string
): Promise<CarItem | void> => {
  const response = await fetch(`${baseUrl}${path.garage}?id=${carId}`);
  const data = (await response.json()) as CarItem[];
  if (response.status == 200) {
    const currentCar = data[0] as CarItem;
    return currentCar;
  } else getWarning("No car with such ID in garage");
};

//****************************WARNING*************************** */
export const getWarning = (message: string): void => {
  const warningDiv = document.getElementById("warning-message") as HTMLElement;
  warningDiv.textContent = message;
  warningDiv.classList.remove("off");
  warningDiv.classList.remove("hidden");

  setTimeout(() => {
    warningDiv.classList.add("hidden");
  }, 1500);
  setTimeout(() => {
    warningDiv.classList.add("off");
  }, 2000);
};

/*******************************************CREATE CAR**************** */

//-------------------------------------------------
export const createCar = async (): Promise<void | CarItem> => {
  const carColorCreate = document.querySelector(
    ".car-color-create"
  ) as HTMLInputElement;
  const carModelCreate = document.querySelector(
    ".car-model-create"
  ) as HTMLInputElement;
  const newCarName: string = carModelCreate.value;
  if (!newCarName) {
    getWarning("Input Car Model!");
    return;
  }
  const newCarColor: string = carColorCreate.value;
  const car = new Car(newCarName, newCarColor);
  console.log(JSON.stringify(car));
  //carModelCreate.value = '';
  const response = await fetch(`${baseUrl}${path.garage}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(car),
  });
  console.log(response);
  if (response.status == 201) {
    const newCar = await response.json();
    renderGarage();
    return newCar;
  } else getWarning("Problems with server");
};
//-------------------------------------------------------------

/*************************************************************************** */

export const removeCar = (): void => {
  const removeCarButtons: NodeListOf<Element> =
    document.querySelectorAll(".remove-car");
  removeCarButtons.forEach((element): void => {
    element.addEventListener("click", async () => {
      const carID = element.getAttribute("data-id");
      const response = await fetch(`${baseUrl}${path.garage}/${carID}`, {
        method: "DELETE",
        body: carID,
      });
      if (response.status == 200) {
        deleteWinner(Number(carID));
        renderGarage();
        return;
      } else getWarning("No car with such ID in garage");
    });
  });
};

//-------------------------------------------------------------

//---------------------------SELECT CAR----------------------------

export const selectCar = (): void => {
  const editCarButton = document.querySelector(".update-car") as HTMLElement;
  const editCarModelButton = document.querySelector(
    ".car-model-edit"
  ) as HTMLInputElement;
  const editCarColorButton = document.querySelector(
    ".car-color-edit"
  ) as HTMLInputElement;
  const updateCarContainer = document.querySelector(
    ".update-car-container"
  ) as HTMLElement;
  const selectCarButtons: NodeListOf<Element> =
    document.querySelectorAll(".select-car");
  selectCarButtons.forEach((element) => {
    element.addEventListener("click", async () => {
      const carId = element.getAttribute("data-id") as string;
      const currentCar = (await getCarInGarageForId(carId)) as CarItem;
      editCarModelButton.value = currentCar.name;
      editCarColorButton.value = currentCar.color;
      editCarButton.setAttribute("data-id", carId);
      updateCarContainer.style.opacity = "1";
    });
  });
};

/******************************UPDATE CAR************************** */

const updateCar = async (): Promise<void> => {
  const updateCarContainer = document.querySelector(
    ".update-car-container"
  ) as HTMLElement;
  const editCarButton = document.querySelector(".update-car") as HTMLElement;
  const editCarModelButton = document.querySelector(
    ".car-model-edit"
  ) as HTMLInputElement;
  const editCarColorButton = document.querySelector(
    ".car-color-edit"
  ) as HTMLInputElement;
  const carId = editCarButton.getAttribute("data-id") as string;
  const currentCar = (await getCarInGarageForId(carId)) as CarItem;
  currentCar.name = editCarModelButton.value;
  currentCar.color = editCarColorButton.value;
  const response = await fetch(`${baseUrl}${path.garage}/${carId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(currentCar),
  });
  if (response.status == 200) {
    editCarModelButton.value = "";
    updateCarContainer.style.opacity = "0.3";
    renderGarage();
    return;
  } else getWarning("Problems with server");
};

/*********************************************************************** */
export const listenApiQuery = () => {
  const createCarButton = document.querySelector(".create-car") as HTMLElement;
  const editCarButton = document.querySelector(".update-car") as HTMLElement;
  const editCarModelButton = document.querySelector(
    ".car-model-edit"
  ) as HTMLInputElement;

  createCarButton.addEventListener("click", () => {
    createCar();
  });

  editCarButton.addEventListener("click", () => {
    if (editCarModelButton.value) {
      updateCar();
    } else {
      getWarning("Please select CAR!");
    }
  });
};
