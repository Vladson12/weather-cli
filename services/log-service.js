import chalk from 'chalk';
import dedent from 'dedent-js';
import { getIcon } from './api-service.js';

const printError = (error) => {
  console.log(chalk.bgRed(' ERROR ') + ' ' + error);
};

const printSuccess = (message) => {
  console.log(chalk.bgGreen(' SUCCESS ') + ' ' + message);
};

const printHelp = () => {
  console.log(
    dedent`${chalk.bgCyan(' HELP ')}
    Without params - weather output
    -c [CITY] for city setup
    -h for help
    -t [API_KEY] for token saving`
  );
};

const printWeather = (data) => {
  console.log(
    dedent`${chalk.bgYellow(' WEATHER ')} ${data.name.toUpperCase()}
    ${getIcon(data.weather[0].icon)}  ${data.weather[0].description}
    Temperature: ${Math.round(data.main.temp)}°C (feels like: ${Math.round(
      data.main.feels_like
    )}°C)
    Max/min: ${Math.round(data.main.temp_max)}/${Math.round(data.main.temp_min)}
    Pressure: ${data.main.pressure} hPa
    Humidity: ${data.main.humidity}%
    Wind: ${Math.round(data.wind.speed)} m/s
    `
  );
};

export { printError, printSuccess, printHelp, printWeather };
