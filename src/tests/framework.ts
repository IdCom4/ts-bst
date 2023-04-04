export enum EXIT_STATE { SUCCESS = 0, ERROR = 1 }
export interface ITestResult { status: EXIT_STATE, message?: string }

export const success = () => ({ status: EXIT_STATE.SUCCESS })
export const error = (message: string) => ({ status: EXIT_STATE.ERROR, message })

export const test = (testName: string, testCallback: () => ITestResult) => {
  process.stdout.write(`[\x1b[33mTEST\x1b[0m] Launching test: "${testName}" ... `)
  let result: ITestResult
  try {
    result = testCallback()
  } catch (err) {
    const message = err && typeof err === 'object' && 'message' in err ? err.message : err
    result = { status: EXIT_STATE.ERROR, message: `${message}` }
  }

  if (result.status === EXIT_STATE.ERROR)
    process.stdout.write(`\x1b[31mError: ${result.message}\x1b[0m\n`)
  else
    process.stdout.write(`\x1b[32mSuccess\x1b[0m\n`)
}