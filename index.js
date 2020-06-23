const yargs = require('yargs').argv;
const { Filesystem } = require('./Filesystem');

async function main() {
  const filesystem = new Filesystem();

  const { action, name } = yargs;

  switch (action) {
    case 'add':
      return filesystem.add(name);
    case 'remove':
      return filesystem.remove(name);
    default:
      throw new Error('Bad action');
  }

}

main()
  .catch(console.error);
