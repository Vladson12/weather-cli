import chalk from 'chalk';
import dedent from 'dedent-js';

const printError = (error) => {
  console.log(chalk.bgRed('ERROR' + ' ' + error));
};

const printSuccess = (message) => {
  console.log(chalk.bgRed('ERROR' + ' ' + message));
};

const printHelp = () => {
  console.log(
    dedent`${chalk.bgCyan('HELP')}
    Without params - weather output
    -s [CITY] for city setup
    -h for help
    -t [API_KEY] for token saving`
  );
};

export { printError, printSuccess, printHelp };
