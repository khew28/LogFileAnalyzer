import { AnalysisStatus } from '../model/TestLog'
export function mapStatusToString(status: AnalysisStatus): string {
    return (status == AnalysisStatus.Completed_AnalysisFailed ? "Failed to analyse" : 
            status == AnalysisStatus.Completed_AnalysisSuccessful ? "Analysis done" : "Not completed yet");
}