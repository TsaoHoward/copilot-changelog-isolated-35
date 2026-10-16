// Isolated acceptance only: reuse the existing acquisition guard and report it.
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
const log = join(process.env.RUNNER_TEMP, 'render-source-attempts.log');
process.env.COPILOT_NETWORK_LOG = log;
await import('../../tests/v2/block-network.mjs');
process.on('exit', () => {
  if (existsSync(log) && readFileSync(log, 'utf8').length) {
    console.error('Isolated acceptance: attempted source acquisition');
    process.exitCode = 1;
  } else {
    console.error('Isolated acceptance: zero attempted source acquisition');
  }
});
