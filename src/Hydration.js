import FitnessData from './FitnessData';

class Hydration extends FitnessData {
  constructor(hydrationData, user) {
    super();
    this.userId = user.id;
    this.hydrationData = this.getRelevantData(hydrationData);
  }

  // calculateAverageOunces() {
  //   let totalOunces = this.hydrationData.reduce((total, data) => {
  //     total += data.numOunces
  //     return total
  //   }, 0)
  //   return Math.round(totalOunces / this.hydrationData.length)
  // }

  calculateDailyOunces(date) {
     let daily = this.hydrationData.find(data => {
       return date === data.date
     })
     if(daily === undefined)
       return "Sorry there is no hydration data for that date"
     return daily.numOunces
  }

  calculateFirstWeekOunces(date) {
    let weekData = this.findGivenWeek(date, 'hydrationData');
    let weekHydration = weekData.reduce((wholeWeek, day) => {
      wholeWeek.push(day)
      return wholeWeek
    }, [])
    return weekHydration
    }

    // findGivenWeek(date) {
    //   let sorted = this.hydrationData.sort((a, b) => {
    //     return Date.parse(a.date) - Date.parse(b.date)
    //   })
    //     let endDate = sorted.findIndex(data =>{
    //     return data.date === date;
    //   })
    //   let startDate = endDate;
    //   if (startDate < 6){
    //      startDate = 6;
    //    }
    //   return sorted.slice((startDate - 6), (endDate + 1));
    // }

}

export default Hydration;
