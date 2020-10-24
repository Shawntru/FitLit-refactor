class Hydration {
  constructor(hydrationData, user) {
    this.userID = user.id;
    this.hydrationData = this.getHydrationData(hydrationData);
  }
  
  getHydrationData(hydrationData) {
    let filteredData = hydrationData.filter(data => {
      return this.userID === data.userID
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
  
     return daily.numOunces
  }
  //complete refactoring following tests after refactoring userRepo
  calculateFirstWeekOunces(userRepo, id) {
    return userRepo.getFirstWeek(id, this.hydrationData).map((data) => `${data.date}: ${data.numOunces}`);
  }

  calculateRandomWeekOunces(date, id, userRepo) {
    return userRepo.getWeekFromDate(date, id, this.hydrationData).map((data) => `${data.date}: ${data.numOunces}`);
  }
}

export default Hydration;
