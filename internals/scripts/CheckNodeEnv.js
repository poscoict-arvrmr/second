// @flow
import chalk from 'chalk';


export default function CheckNodeEnv(expectedEnv: string) {
  console.log('찍혀라[CheckNodeEnv]', expectedEnv);
  if (!expectedEnv) {
    throw new Error('"expectedEnv" not set');
  }

  console.log('찍혀라[CheckNodeEnv]', process.env.NODE_ENV);
  if (process.env.NODE_ENV !== expectedEnv) {
    console.log(chalk.whiteBright.bgRed.bold(`"process.env.NODE_ENV" must be "${expectedEnv}" to use this webpack config`));
    process.exit(2);
  }
}
