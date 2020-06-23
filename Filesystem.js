const fs = require('fs').promises;
const path = require('path');
const constants = require('./constants');

const PATH = path.join('database', constants.APPLES_FILE);

class Filesystem {
  async getData() {
    try {
      const dataString = await fs.readFile(PATH, 'utf-8');

      return JSON.parse(dataString);
    } catch (e) {
      console.error('error file non exist', e);

      await fs.writeFile(PATH, '[]', 'utf-8');

      return [];
    }
  }

  async writeFile(array) {
    await fs.writeFile(PATH, JSON.stringify(array), 'utf-8');

  }

  async add(name) {
    const array = await this.getData();

    if (array.some(savedName => savedName === name)) {
      return;
    }

    array.push(name);

    await this.writeFile(array);
  }

  async remove(name) {
    const array = await this.getData();

    if (!array.some(savedName => savedName === name)) {
      return;
    }

    await this.writeFile(array.filter(sName => sName !== name));
  }
}

exports.Filesystem = Filesystem;
