// constants/dummyData.js

export const TANKS = [
  { id: 1, name: 'Tank A', remaining: 40, capacity: 40},
  { id: 2, name: 'Tank B', remaining: 1.5, capacity: 20},
  { id: 3, name: 'Tank C', remaining: 0, capacity: 10},
];

export const PLANTS = [
  { 
    id: 1, 
    name: 'Fiskus', 
    moisture: 35, 
    frequency: 2, 
    wateringDuration: 10, 
    lastWateredDate: 1748376178,
    lastWateredVolume: 500,
    nextWaterDate: 1748980978, // 4 czerwca
    pumpSpeed: 10,
    tank: 1,
  },

  // { 
  //   id: 2, 
  //   name: 'Monstera',
  //   moisture: 70, 
  //   frequency: 5,
  //   volumeMl: 500, 
  //   lastWateredDate: 1748203378, 
  //   lastWateredVolume: 500,
  //   nextWaterDate: 1748808178, //2 czerwca
  //   pumpSpeed: 12,
  //   tank: 1,
  // },

  // { 
  //   id: 3, 
  //   name: 'Maluszek', 
  //   moisture: 50, 
  //   frequency: 3,
  //   volumeMl: 400, 
  //   lastWateredDate: 1748548978, 
  //   lastWateredVolume: 400,
  //   nextWaterDate: 1748894578, // 3 czerwca
  //   pumpSpeed: 18,
  //   tank: 2,
  // }
];

export const LOGS = [
  {
    id: 0,
    datetime: "28.05.2025 17:34",
    volume: 6000
  },
  {
    id: 1,
    datetime: "28.05.2025 18:00",
    volume: 4500
  },
  {
    id: 2,
    datetime: "28.05.2025 18:30",
    volume: 5200
  },
  {
    id: 1,
    datetime: "28.05.2025 19:00",
    volume: 4800
  },
  {
    id: 1,
    datetime: "28.05.2025 19:00",
    volume: 4800
  },
  {
    id: 1,
    datetime: "28.05.2025 19:00",
    volume: 4800
  },
  {
    id: 1,
    datetime: "28.05.2025 19:00",
    volume: 4800
  },
  {
    id: 1,
    datetime: "28.05.2025 19:00",
    volume: 4800
  },
  {
    id: 1,
    datetime: "28.05.2025 19:00",
    volume: 4800
  },
  {
    id: 1,
    datetime: "28.05.2025 19:00",
    volume: 4800
  },
  {
    id: 1,
    datetime: "28.05.2025 19:00",
    volume: 4800
  },
  {
    id: 0,
    datetime: "28.05.2025 19:30",
    volume: 6100
  }
];

