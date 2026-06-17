export const predictRefill = (capacity, plants) => {
    days = 0;
    nextWaters = Array.from({length: plants.length}, (_, i) => Math.ceil((plants[i].nextWaterDate-Date.now()/1000)/24/3600));
    // if any value is negative then oops...
    while (capacity > 0) {
        minIndex = nextWaters.indexOf(Math.min(...nextWaters));
        minDays = nextWaters[minIndex];
        days = minDays;
        nextWaters[minIndex] += plants[minIndex].frequency
        capacity -= plants[minIndex].volumeMl/1000
    }
    return days;
};