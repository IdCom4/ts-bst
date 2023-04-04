"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.test = exports.error = exports.success = exports.EXIT_STATE = void 0;
var EXIT_STATE;
(function (EXIT_STATE) {
    EXIT_STATE[EXIT_STATE["SUCCESS"] = 0] = "SUCCESS";
    EXIT_STATE[EXIT_STATE["ERROR"] = 1] = "ERROR";
})(EXIT_STATE = exports.EXIT_STATE || (exports.EXIT_STATE = {}));
const success = () => ({ status: EXIT_STATE.SUCCESS });
exports.success = success;
const error = (message) => ({ status: EXIT_STATE.ERROR, message });
exports.error = error;
const test = (testName, testCallback) => {
    process.stdout.write(`[\x1b[33mTEST\x1b[0m] Launching test: "${testName}" ... `);
    let result;
    try {
        result = testCallback();
    }
    catch (err) {
        const message = err && typeof err === 'object' && 'message' in err ? err.message : err;
        result = { status: EXIT_STATE.ERROR, message: `${message}` };
    }
    if (result.status === EXIT_STATE.ERROR)
        process.stdout.write(`\x1b[31mError: ${result.message}\x1b[0m\n`);
    else
        process.stdout.write(`\x1b[32mSuccess\x1b[0m\n`);
};
exports.test = test;
