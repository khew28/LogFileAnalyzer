import { TestCase } from '../model/TestCase'
export enum AnalysisStatus {
    Completed_AnalysisFailed = 0,
    Completed_AnalysisSuccessful = 1,
    NotComplete = 2,
}
export interface TestLogRecord {
    [key:string]: string|number|TestCase[]|boolean;
    by: string;
    testBeginTime: string;
    submittedTime: string;
    fileName: string;
    success: number;
    failed: number;
    defect: number;
    testId: string;
    status: AnalysisStatus;
    //testCases: TestCase[];
}
