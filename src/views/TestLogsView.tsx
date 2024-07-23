import {TestLogRecord} from '../model/TestLog';
import React, { useState} from 'react';
import { NavLink } from 'react-router-dom';
import NewWindow from 'react-new-window';
import {RenderTestLog} from './TestLogDetail';
import {mapJSONDateTimeToString} from '../common/TestCaseDisplayMapping';
import {mapStatusToString} from '../common/TestLogDisplayMapping';

interface TestLogsViewProp {
    logs: TestLogRecord[]
}

export const RenderTestLogs= ({logs}:TestLogsViewProp) => {
    const [selectedTestLog, setSelectedTestLog] = useState<TestLogRecord|null>(null);
    const [openWin, setOpenWin] = useState<boolean>(false);
    const onClickTestLogDetail = (testLog:TestLogRecord) => {
        setSelectedTestLog(testLog);
        setOpenWin(true);
        console.log("Selected filename", testLog.fileName);
    };
    const onCloseWin = () => {
        setSelectedTestLog(null);
        setOpenWin(false);
    }
    return (
                (logs.length > 0) ? 
                    <>
                    <table className="testlogs">
                    <tbody>
                    <tr className="testlogs">
                        <th className="testlogs">Started By</th>
                        <th className="testlogs">Date</th>
                        <th className="testlogs">FileName</th>
                        <th className="testlogs">Analysis Completed</th>
                        <th className="testlogs">Test Succeeded</th>
                        <th className="testlogs">Test Failed</th>
                        <th className="testlogs">Number of Software Defects Detected</th>
                    </tr>
                    { logs.map( (testLog) => (
                        <tr className="testlogs">
                            <td className="testlogs">{testLog.by}</td>
                            <td className="testlogs">{testLog.testBeginTime? mapJSONDateTimeToString(testLog.testBeginTime): ""}</td>
                            <td className="testlogs">{testLog.fileName}</td>
                            <td className="testlogs">{mapStatusToString(testLog.status)}</td>
                            {/*<td><NavLink to={"/testLogDetails/"+testLog.testId}>{testLog.success}</NavLink></td>*/}
                            <td className="testlogs"><a href="#" onClick={() => onClickTestLogDetail(testLog)}>{testLog.success}</a></td>
                            <td className="testlogs">{testLog.failed}</td>
                            <td className="testlogs">{testLog.defect}</td>
                        </tr>
                        )) 
                    }
                    </tbody>
                    </table>
                    {openWin && 
                    <NewWindow  onUnload={onCloseWin}  
                                features={{ left: 150, top: 450, width: 800, height: 800, location: 'no' }}
                                title="Test Log Details">
                        {selectedTestLog && <RenderTestLog selTestLog={selectedTestLog}/>}
                    </NewWindow> }
                    </>
                :
                    <span>No tests for the past 7 days</span>
    )
}