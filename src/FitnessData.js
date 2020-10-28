class FitnessData {

  getRelevantData(dataArray) {
    return dataArray.filter((data) => {
      return this.userId === data.userID;
    });
  }

  findGivenWeek(date, dataset) {
    let sorted = this[dataset].sort((a, b) => {
      return Date.parse(a.date) - Date.parse(b.date)
    })
      let endDate = sorted.findIndex(data =>{
      return data.date === date;
    })
    let startDate = endDate;
    if (startDate < 6){
       startDate = 6;
     }
    return sorted.slice((startDate - 6), (endDate + 1));
  }

  // TODO: change calculateAverageOunces &
  // calculateWeekSleep(), and calculateWeekSleepQuality() calls
  // to calculateAverageDaily
  calculateAverageDaily(dataset) {
    let totalOunces = this[dataset].reduce((total, data) => {
      total += data.numOunces
      return total
    }, 0)
    return Math.round(totalOunces / this[dataset].length)
  }

}

export default FitnessData;
