import axios from 'axios';

export interface testCaseParameterInterface {
        testLogId?: string;
        testType?: number;
        outcome?:number;
        defect?: boolean;
        testSettings?: string;
        startDate?: string;
        endDate?: string;
}
export interface uploadLogFileInterface {
        formData: FormData;
        uploadProgress?: (event: any) => void
}

async function simulateGetTestLog(): Promise<any> {
        console.log("Getting test cases per test log id");
        return new Promise((res,rej) => {
                setTimeout(() => {
                        let resp = {
                             data: 
                              [
                                    { testType:1, outcome:1, testSettings: "testbenchmark.com UseLastConnection FALSE, TestDuration 10s, 3 threads",
                                      defect:  false, defectReason: "", testTime: "04-01-2021" },
                                    { testType:1, outcome:1, testSettings: "speedtest.com/3MB UseLastConnection FALSE, TestDuration 10s, 1 thread",
                                      defect:  false, defectReason: "", testTime: "04-02-2021" },
                                    { testType:2, outcome:1, testSettings: "kepler.com silenceTimer=3s",
                                      defect:  false, defectReason: "", testTime: "04-01-2021" },
                                    { testType:1, outcome:1, testSettings: "speedtest.com/100MB UseLastConnection FALSE, TestDuration 10s, 4 thread",
                                      defect:  false, defectReason: "", testTime: "05-01-2021" },       
                              ],
                            };
                        res(resp);  // simulate successful login
                        /*
                        let servErrResp = {response: {
                                  data: "",
                                  status: 404,
                                }};
                        rej(servErrResp);   // simulate 4xx error code
                        */
                },1500)
        })
}

async function simulateGetTestLogsPerUser(): Promise<any> {
        console.log("Getting user test logs");
        return new Promise((res,rej) => {
                setTimeout(() => {
                        //Normal successful case:
                        let resp = {
                            data: 
                                [
                                 { testId: "12313", fileName: "tracelog_12313.txt", success: 120, failed: 2, defect: 0, by: "Dinesh", dateTime: "Jul 30, 2021 9 pm"},
                                 { testId: "22222", fileName: "tracelog_22222.txt", success: 0, failed: 12, defect: 1, by: "Dinesh", dateTime: "Jan 10, 2021 8 am"},
                                 { testId: "33333", fileName: "tracelog_33333.txt", success: 120, failed: 0, defect: 0, by: "Dinesh", dateTime: "Mar 05, 2020 7:45 am"},
                                ]
                        };
                        
                        /*
                        let resp = {   // no data
                                data: 
                                    [
                                    ]
                            };    */
                        res(resp);  // simulate successful login

                        /*
                        let servErrResp = {response: {
                                  data: "",
                                  status: 404,
                                }};
                        rej(servErrResp);   // simulate 4xx error code
                        */
                },1500)
        })
}

async function simulateUserLoginReq(): Promise<any> {
        return new Promise((resolve, rej) => {
                        setTimeout(() => {
                                
                                let resp = {data: {
                                        userName: "khew",
                                        userId:   "02123012",
                                        firstName: "Kelvin",
                                        lastName: "Hew",
                                        org: "RnD",
                                       }};
                                resolve(resp);  // simulate successful login
                                
                                /*
                                let servErrResp = {response: {
                                  data: "",
                                  status: 404,
                                }};
                                rej(servErrResp);   // simulate 4xx error code
                                */
                                
                        }, 2000);
              });
}

/*
authUserLogin(username,passwd)
- User authentication to the URL:"<server>:/userLogin?userName=xxx,passwd=xxx"
- Returns a Promise 
        - if successful, returns a User object
        - if failed, will throw an error         
*/
export async function authUserLogin(username: string, passwd: string) {
        const url = "/userLogin";
        const params = { username: username, pass: passwd};
        //simulation for now
        //return simulateUserLoginReq();
        return axios({method: 'get', url: url, timeout: 5}); 
        
}

/*
getUserTestLogs(userId)
- Get the recent test logs of the given userId:"<server>:/getTestLogs?userId=xxx"
- Returns a Promise 
        - if successful, returns an array of TestLog.
        - if failed, will throw an error         
*/
export async function getUserTestLogs(userId: string) {
        const url = "/api/TestLogs";
        const params = { userId: userId};
        console.log("Axios getUserTestLogs");
        //simulation for now
        //return simulateGetTestLogsPerUser();
        return axios({method: 'get', url: url, params: params,timeout: 10000}); 
}

/*
getTestCases(paramObj)
- Get the test cases that mathces the given search parameters, paramObj which contains one or more
  props as follow:
        - testLogId: matches the given testLogId
        - testType: matches the given testType
        - outcome: matches the given outcome
        - defect: matches the given defect
        - testSettings: test cases that contains the testSettings
        - startDate and endDate:  test cases whose date falls within this range
"<server>:/api/TestCases/testLogId=xxx&testType=xxxx...."
- Returns a Promise 
        - if successful, returns an array of TestCase.
        - if failed, will throw an error         
*/
export async function getTestCases(paramObj: testCaseParameterInterface) {
        const url = "/api/TestCases";
        const params = paramObj;
        console.log("Axios getTestCases");
        //simulation for now
        //return simulateGetTestLog();
        return axios({method: 'get', url: url, params: params, timeout: 10000}); 
        
}

export async function uploadLogFile(param: uploadLogFileInterface) {
        const url = "/api/uploadLogFile";
        console.log("Axios Uploading log file");
        return axios( {method: 'post',  url: url,
                       data: param.formData, 
                       headers: { "Content-Type": "multipart/form-data" },
                       onUploadProgress: param.uploadProgress,
                       timeout: 600000
                      });
        //return axios.post(url,param.formData,{headers: { "Content-Type": "multipart/form-data" }});
}