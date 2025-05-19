/* eslint-disable no-console */
export function runWithoutConsoleLog(fn: Function) {
  const originalConsoleLog = console.log;

  console.log = () => { };

  try {
    return fn();
  } finally {
    console.log = originalConsoleLog;
  }
}
