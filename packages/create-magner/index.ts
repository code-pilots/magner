import path from 'path';
import commander from 'commander';
import ejs from 'ejs';

const cli = () => {
  const program = commander.createCommand();

  program
    .option('-e, --new-entity', 'create new entity directory');

  program.parse(process.argv);

  const options = program.opts();
  console.log(options);

  if (options.entityAdd) {
    const dirname = path.join(__dirname, '..', 'feature');
  }

  return true;
};

cli();
