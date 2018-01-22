// @flow
import chalk from 'chalk';
import detectPort from 'detect-port';

(function CheckPortInUse() {
  console.log('찍혀라[CheckPortInUse]');
  const port: string = process.env.PORT || '1212';

  console.log('찍혀라[CheckPortInUse]', port, process.env.PORT);
  console.log('찍혀라[CheckPortInUse]', 'cross-env PORT=1212 를 사용할 수도 있을듯')
  detectPort(port, (err: ?Error, availablePort: number) => {
    if (port !== String(availablePort)) {
      throw new Error(chalk.whiteBright.bgRed.bold(`Port "${port}" on "localhost" is already in use. Please use another port. ex: PORT=4343 npm run dev`));
    } else {
      process.exit(0);
    }
  });
}());
