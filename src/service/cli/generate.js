'use strict';

const {
  getRandomInt,
  shuffle,
  getDeclension,
  createFileFs
} = require(`../../utils`);

const SENTENCE_MAX_LENGTH = 5;
const FILE_NAME = `mocks.json`;
const Amount = {
  DEFAULT: 1,
  MAX: 1000
};

const TITLES = [
  `Продам книги Стивена Кинга.`,
  `Продам новую приставку Sony Playstation 5.`,
  `Продам отличную подборку фильмов на VHS.`,
  `Куплю антиквариат.`,
  `Куплю породистого кота.`,
  `Продам коллекцию журналов «Огонёк».`,
  `Отдам в хорошие руки подшивку «Мурзилка».`,
  `Продам советскую посуду. Почти не разбита.`,
  `Куплю детские санки.`
];

const SENTENCES = [
  `Товар в отличном состоянии.`,
  `Пользовались бережно и только по большим праздникам.`,
  `Продаю с болью в сердце...`,
  `Бонусом отдам все аксессуары.`,
  `Даю недельную гарантию.`,
  `Если товар не понравится — верну всё до последней копейки.`,
  `Это настоящая находка для коллекционера!`,
  `Если найдёте дешевле — сброшу цену.`,
  `Таких предложений больше нет!`,
  `Две страницы заляпаны свежим кофе.`,
  `При покупке с меня бесплатная доставка в черте города.`,
  `Кажется, что это хрупкая вещь.`,
  `Мой дед не мог её сломать.`,
  `Кому нужен этот новый телефон, если тут такое...`,
  `Не пытайтесь торговаться. Цену вещам я знаю.`
];

const CATEGORIES = [
  `Книги`,
  `Разное`,
  `Посуда`,
  `Игры`,
  `Животные`,
  `Журналы`,
];

const OfferType = {
  OFFER: `offer`,
  SALE: `sale`,
};

const SumRestrict = {
  MIN: 1000,
  MAX: 100000,
};

const PictureRestrict = {
  MIN: 1,
  MAX: 16
};

const getPictureFileName = () => {
  let int = getRandomInt(PictureRestrict.MIN, PictureRestrict.MAX);
  if (int < 10) {
    int = `0${int}`;
  }
  return `item${int}.jpg`;
};

const getTitle = () => TITLES[getRandomInt(0, TITLES.length - 1)];

const getDescription = () => shuffle(SENTENCES).slice(0, SENTENCE_MAX_LENGTH).join(` `);

const getType = () => OfferType[Object.keys(OfferType)[Math.floor(Math.random() * Object.keys(OfferType).length)]];

const getCategories = () => shuffle(CATEGORIES).slice(0, getRandomInt(1, CATEGORIES.length - 1));

const generateOffers = (count) => (
  Array(count).fill({}).map(() => ({
    title: getTitle(),
    picture: getPictureFileName(),
    description: getDescription(),
    type: getType(),
    sum: getRandomInt(SumRestrict.MIN, SumRestrict.MAX),
    category: getCategories()
  }))
);


module.exports = {
  name: `--generate`,
  run(args) {
    const [count] = args;
    const offersCount = Number.parseInt(count, 10) || Amount.DEFAULT;

    if (offersCount > Amount.MAX) {
      console.log(`Можно сгенерировать не больше ${Amount.MAX} ${getDeclension(Amount.MAX, [`объявления`, `объявлений`, `объявлений`])}.`);
      process.exit();
    }

    createFileFs(FILE_NAME, generateOffers(offersCount), offersCount);
  }
};
