import { exec } from 'child_process';
import { platform } from 'os';

exec('jest --config ./test/jest-e2e.json', (error, stdout, stderr) => {
  console.log(stdout);
  if (error) {
    console.error(`❌ Erro nos testes:\n${stderr}`);
  }

  const reportPath = './test-report/index.html';

  const openCommand =
    platform() === 'darwin'
      ? `open ${reportPath}`
      : platform() === 'win32'
        ? `start ${reportPath}`
        : `xdg-open ${reportPath}`;

  exec(openCommand);
});
