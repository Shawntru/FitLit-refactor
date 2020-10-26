class Hydration {
  constructor(hydrationData, user) {
    this.userId = user.id;
    this.hydrationData = this.getHydrationData(hydrationData);
  }
  
  getHydrationData(hydrationData) {
    let filteredData = hydrationData.filter(data => {
      return this.userId === data.userID
    })
       return filteredData.map( data => {
       return {date: data.date, numOunces: data.numOunces}
    })
  }
  
  calculateAverageOunces() {
    let totalOunces = this.hydrationData.reduce((total, data) => {
      total += data.numOunces
      return total 
    }, 0)
    return Math.round(totalOunces / this.hydrationData.length)
  }

  calculateDailyOunces(date) {
     let daily = this.hydrationData.find(data => {
       return date === data.date
     })
     if(daily === undefined) 
       return "Sorry there is no hydration data for that date"
     return daily.numOunces
  }
  
  calculateFirstWeekOunces(date) {
    let weekData = this.findGivenWeek(date);
    let weekHydration = weekData.reduce((wholeWeek, day) => {
      wholeWeek.push(day)
      return wholeWeek
    }, [])
    return weekHydration
    }
  
    findGivenWeek(date) {
      let sorted = this.hydrationData.sort((a, b) => {
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
  
}

export default Hydration;
