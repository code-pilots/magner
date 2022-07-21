import { program } from 'commander';
import createEntity from './create-entity';
import create from './create';
// import analyze from './analyzers';

const cli = () => {
  program
    .command('create <name>')
    .description('Create a Magner app from boilerplate in <name> directory')
    .action(async (name: string) => {
      await create(name);
    });

  program
    .command('create-entity <name> <target>')
    .description('Create a directory with name <name> in directory <target>')
    .action(async (name: string, target: string) => {
      await createEntity(name, target);
    });

  // program
  //   .command('analyze')
  //   .description('Analyze your project configuration')
  //   .action(async () => {
  //     await analyze();
  //   });

  program.parse(process.argv);
  return true;
};

cli();
