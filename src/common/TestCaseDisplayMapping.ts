export function mapJSONDateTimeToString(dateTime:string): string {
    //convert to json string first which adds escape " at the beginning and end
    var jsonStr = JSON.stringify(dateTime);
    console.log("jsonStr", jsonStr);
    var dateStr = JSON.parse(jsonStr);    
    var date = new Date(dateStr);
    return date.toLocaleString();
}
export function mapTestTypeToString(testType:number):string {
    switch (testType) {
        case 0: return "HTTP UE Download";
        case 1: return "HTTP Webkit";
        case 2: return "HTTP UE Upload";
        case 3: return "Youtube";
        case 4: return "FTP UE Upload";
        case 5: return "FTP UE Download";
        
        default:
            return "N/A";
    }
}
export function mapOutcomeToString(outcome:number):string {
    switch (outcome) {
        case 0: return "Pass";
        case 1: return "Failed";
        default:
            return "N/A";
    }
}
export function mapDefectToString(defect:boolean):string {
    return defect ? "True" : "False";
}