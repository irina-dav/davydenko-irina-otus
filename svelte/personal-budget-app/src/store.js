import {writable, derived} from 'svelte/store';

let startDate = new Date(new Date(2020, 0, 1));
let endDate = new Date();
let costsAmount = 35;
let lastIndex = 0;
let valueMax = 1000;
let valueMin = 100;
let categoriesArr = [
    {id: 1, name: 'Transport'},
    {id: 2, name: 'Food'},
    {id: 3, name: 'Housing'},
    {id: 4, name: 'Healthcare'},
    {id: 5, name: 'Clothing'},
];
let costsArr = generateData();

const costsWr = writable(costsArr);

export const costs = {
    subscribe: costsWr.subscribe,
    addCost: cost => {
        cost.id = ++lastIndex;
        costsWr.update(arr => [...arr, cost])},
};

export const categories = writable(categoriesArr);
export const costsOrdered = derived(costsWr, (costsWr) => costsWr.sort((a,b) => new Date(b.date) - new Date(a.date)));

function getRandomDate(start, end) {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

function getRandomInteger(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function generateData() {
    let dataArr = [];
    for (let i = 1; i <= costsAmount; i++) {
        dataArr.push({
            id: i,
            date: getRandomDate(startDate, endDate),
            category: getRandomInteger(1, Object.keys(categoriesArr).length+1),
            value: getRandomInteger(valueMin, valueMax)
        });
    }
    lastIndex = costsAmount;
    return dataArr;
}

