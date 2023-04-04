export declare enum EXIT_STATE {
    SUCCESS = 0,
    ERROR = 1
}
export interface ITestResult {
    status: EXIT_STATE;
    message?: string;
}
export declare const success: () => {
    status: EXIT_STATE;
};
export declare const error: (message: string) => {
    status: EXIT_STATE;
    message: string;
};
export declare const test: (testName: string, testCallback: () => ITestResult) => void;
