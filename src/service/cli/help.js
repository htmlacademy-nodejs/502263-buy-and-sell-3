'use strict';

module.exports = {
  name: `--help`,
  run() {
    console.info(`
Программа запускает http-сервер и формирует файл с данными для API.

Гайд:
service.js <command>

Команды:

--version:            выводит номер версии
--generate <count>    формирует массив с тестовыми объявлениями в 
                      количестве count и сохраняет их в mocks.json
--help:               печатает список возможных команд
    `);
  }
};
