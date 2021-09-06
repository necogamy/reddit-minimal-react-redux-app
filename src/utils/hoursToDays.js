export function changeHoursToDays(hours) {
    let result = {
      hours,
      days: null,
      months: null,
      years: null
    };
    
    if (hours >= 24) {
      let finalDays = 0;
      for (let i = 24; i <= hours; i+=24) {
        finalDays++;
      }
      result.days = finalDays;
    }

    if (result.days >= 30) {
      let finalMonths = 0;
      for (let i = 30; i <= result.days; i+=30) {
        finalMonths++;
      }
      result.months = finalMonths;
    }

    if (result.months >= 12) {
      let finalYears = 0;
      for (let i = 12; i <= result.months; i+=12) {
        finalYears++;
      }
      result.years = finalYears;
    }

    let postTime = hours + ' hours ago';
    if (result.years !== null) {
      if (result.years > 1) {
        postTime = `${result.months} years ago`;
      } else {
        postTime = `a year ago`;
      }
      return postTime;
    } else if (result.months !== null) {
      if (result.months > 1) {
        postTime = `${result.months} months ago`;
      } else {
        postTime = `a month ago`;
      }
      return postTime;
    } else if (result.days !== null) {
      if (result.days > 1) {
        postTime = `${result.days} days ago`;
      } else {
        postTime = `a day ago`;
      }
      return postTime;
    } else {
      if (result.hours > 1) {
        postTime = `${result.hours} hours ago`;
      } else {
        postTime = `a hour ago`;
      }
      return postTime;
    }
  

}