import commander from 'commander';
import createEntity from './create-entity';
// import analyze from './analyzers';

const cli = () => {
  const program = commander.createCommand();

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
