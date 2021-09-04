function addZero(i) {
    if (i < 10) {
        i = "0" + i;
    }
    return i;
}
function convertToHumanTime(date) {
    const d = date;
    var h = addZero(d.getHours());
    var m = addZero(d.getMinutes());
    var s = addZero(d.getSeconds());
    
    return h + ":" + m + ":" + s;
}
 

function epochToJsDate(ts){
    // ts = epoch timestamp
    // returns date obj
    return new Date(ts*1000);
}
function jsDateToEpoch(d){
    // d = javascript date obj
    // returns epoch timestamp
    return (d.getTime()-d.getMilliseconds())/1000;
}



function diffTime(time) {
    const actual = new Date();

    // To calculate the time difference of two dates
    const Difference_In_Time = actual.getTime() - time.getTime();
  
    // To calculate the no. of days between two dates
    const Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
    
    
    return [Difference_In_Time, Difference_In_Days];
}

export function timeDifference(epoch) {
    const old = epochToJsDate(epoch);
    const msFormule = 3.6e+6;
    
    const [ Difference_In_Time ] = diffTime(old);

    return Math.ceil(Difference_In_Time / msFormule);
}