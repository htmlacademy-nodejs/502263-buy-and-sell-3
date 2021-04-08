'use strict';

const fs = require(`fs`);

const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const shuffle = (arr) => {
  for (let i = arr.length - 1; i > 0; i--) {
    const randomPosition = Math.floor(Math.random() * i);
    [arr[i], arr[randomPosition]] = [arr[randomPosition], arr[i]];
  }

  return arr;
};

const getDeclension = (number, titlesArr) => {
  const cases = [2, 0, 1, 1, 1, 2];
  return titlesArr[(number % 100 > 4 && number % 100 < 20) ? 2 : cases[(number % 10 < 5) ? number % 10 : 5]];
};

const createFileFs = (fileName, content, count) => {
  fs.writeFile(fileName, JSON.stringify(content), (err) => {
    if (err) {
      return console.error(err);
    }
    return console.info(`Файл ${fileName} создан. Количество объявлений: ${count}.`);
  });
};

module.exports = {
  getRandomInt,
  shuffle,
  getDeclension,
  createFileFs
};
