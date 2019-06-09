import {v4 as uuid} from "uuid";

const weekDayMap = {
    Sun: 0,
    Mon: 1,
    Tue: 2,
    Wed: 3,
    Thu: 4,
    Fri: 5,
    Sat: 6,
};

const URL = "https://api.sheety.co/311576ae-321a-43e3-9a5b-61b3ac373d85";

// This will also come handy when suppose the keys from the backend changes the only thing that you need to change will be this function.
function transformCarsJson(carsArray) {
    /* Since I'm using ES6 destructuring almost everywhere an I do not like to have underscores in my variable name
    I'll be transforming the response a little bit also There is no id proviede by the backend so I'm generating my own to perform actions like selection etc. */
    return carsArray.map((car) => ({
        ...car,
        id: uuid(),
        availability: car.availability.split(", ").map(day => weekDayMap[day]),
        carType: car.car_Type,
        fuelType: car.fuel_Type,
        isSelected: false
    }));
}

export function getCars() {
    return fetch(URL)
            .then(res => res.json())
            .then(transformCarsJson);
}

export function getCarTypes() {
    return getCars()
            .then(arr => new Set(arr.map(elem => elem.carType)))
            .then(set => Array.from(set));
}