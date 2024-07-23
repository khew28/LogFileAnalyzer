import React, {useState} from 'react'
import {getTestCases} from '../services/fetchData'
import {TestCase} from '../model/TestCase'
import { AlertDialog } from './AlertDialog';
import {mapTestTypeToString, mapOutcomeToString, mapDefectToString, mapJSONDateTimeToString} from '../common/TestCaseDisplayMapping';



export const RenderQueryTCPage = () => {
    const onCloseDialog = (() => {
        setAlertMsg("");
    })

    const handleSubmit = (evt: React.SyntheticEvent) => {
        const target = evt.target as typeof evt.target & {
            testType: { value: string };
            testOutcome: { value: string };
            softwareDefect: { value: string };
            testDate: { value: string };
            startDate: { value: string };
            endDate: { value: string };
        };
        evt.preventDefault();
        if (isLoading) {
            setAlertMsg("Already loading");
            return;
        }

        let param = {} as any;
        if (target.testType.value != "999") {
           param.testType = target.testType.value; 
        }
        if (target.testOutcome.value != "999") {
            param.testResult = target.testOutcome.value; 
        }
        if (target.softwareDefect.value != "999") {
            param.isDefect = target.softwareDefect.value; 
        }
        if (target.testDate.value != "999") {
            param.startDate = target.startDate.value; 
            param.endDate = target.endDate.value; 
            //validate endDate >= startDate
            var startDate = new Date(param.startDate);
            var endDate = new Date(param.endDate);
            if (startDate > endDate) {
                setAlertMsg("Start date cannot be after end date");
                return;
            }
        }
        console.log("getTestCases param", param); //DEBUG

        let res = getTestCases(param);
            res
            .then((resp) => {
                //console.log("Response data:", resp.data);  //DEBUG
                setTestCases(resp.data);
                console.log("Fetch testcases successful");
                }
            )
            .catch((error) => {
                    if (error.response) {
                        console.log("Failed to fetch testcases", error.response.data);
                        setAlertMsg("Failed to fetch testcases Status code:" + error.response.status);
                    }
                    else if (error.request) {
                        console.log("No response was received for request:", error.request);   
                        setAlertMsg("No response was received for request");
                    }
                    else {
                        console.log('Unknown error:', error.message);
                        setAlertMsg("Unknown error" + error.message);
                    }
                }
            )
            setIsLoading(false);
         
    }
    const onChangeDate = (evt: React.ChangeEvent<HTMLSelectElement>) => {
        evt.preventDefault();
        const target = evt.target;
        if (target.value === "0") {
            setDateVisible(true);
        }
        else {
            setDateVisible(false);
        }
    }
    
    const [dateVisible, setDateVisible] = useState<boolean>(false);
    const [testCases, setTestCases] = useState<TestCase[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [alertMsg, setAlertMsg] = useState<string>("");
    return (
        <div className="content">
            <div>
                <form className="content-form"  onSubmit={handleSubmit}>
                    <p className="content-form-p">
                    <label htmlFor="testType" className="content-form-input">Test Type:</label>
                    <select id="testType" name="testType"  className="content-form-input">
                        <option value="999">Any</option>
                        <option value="0">Http UE Download</option>
                        <option value="1">Http WebKit</option>
                        <option value="2">Http UE Upload</option>
                        <option value="3">Youtube</option>
                        <option value="4">FTP UE Upload</option>
                        <option value="5">FTP UE Download</option>
                    </select>

                    <label htmlFor="testOutcome" className="content-form-input">Test Outcome:</label>
                    <select id="testOutcome" name="testOutcome" className="content-form-input">
                        <option value="999">Any</option>
                        <option value="0">Pass</option>
                        <option value="1">Failed</option>
                    </select>
                    </p>

                    <p className="content-form-p">
                    <label htmlFor="softwareDefect" className="content-form-input">Is a SoftwareDefect:</label> 
                    <select id="softwareDefect" name="softwareDefect" className="content-form-input">
                        <option value="999">Any</option>
                        <option value="0">False</option>
                        <option value="1">True</option>
                    </select>
                    </p>
                    <label htmlFor="testDate" className="content-form-input">Date when test is performed:</label> 
                    <select id="testDate" name="testDate" className="content-form-input" onChange={onChangeDate}>
                        <option value="999">Any</option>
                        <option value="0">Choose a specific dates... </option>
                    </select>
                    <br></br>
                    {dateVisible &&
                        <>
                        <label htmlFor="startDate" id="startDateLabel" className="content-form-input">Start Date:</label>
                        <input type="date" id="startDate" name="startDate" className="content-form-input"></input>
                        <br></br>
                        <label htmlFor="endDate" id="endDateLabel" className="content-form-input">End Date:</label>
                        <input type="date" id="endDate" name="endDate" className="content-form-input"></input>
                        <br></br>
                        </>
                    }
                    <button type="submit">Search</button>
                </form>
            </div>
            <div>
                <AlertDialog content={alertMsg} onCloseCB={onCloseDialog}/>
            </div>
            <div>
                {(testCases.length > 0) &&
                    <table className="testcases">
                        <tbody>
                        <tr className="testcases">
                               <th className="testcases">
                                   Date of Test
                               </th>
                               <th className="testcases">
                                   Test Type
                               </th>
                               <th className="testcases">
                                   Result
                               </th>
                               <th className="testcases">
                                   Test Settings
                               </th>
                               <th className="testcases">
                                   Is Software Defect
                               </th>
                        </tr>
                        {testCases.map((testCase) => (
                            <>
                           <tr>
                               <td className="testcases">{mapJSONDateTimeToString(testCase.testTime)}</td>   
                               <td className="testcases">{mapTestTypeToString(testCase.testType)}</td>       
                               <td className="testcases">{mapOutcomeToString(testCase.outcome)}</td>
                               <td className="testcases">{testCase.testSettings}</td>
                               <td className="testcases">{mapDefectToString(testCase.defect)}</td>
                            </tr>
                            </>
                        ))} 
                        </tbody>
                    </table>
                }
            </div>
        </div>
    )
}