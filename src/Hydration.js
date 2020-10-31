import UserData from './UserData';

class Hydration extends UserData {
  constructor(hydrationData) {
    super();
    this.hydrationData = hydrationData;
  }

  calculateAverageOunces(id) {
    const perDayUserHydration = this.hydrationData.filter((data) => id === data.userID);
    return perDayUserHydration.reduce((sumSoFar, data) => sumSoFar += data.numOunces, 0) / perDayUserHydration.length;
  }

  calculateDailyOunces(id, date) {
    const findOuncesByDate = this.hydrationData.find((data) => id === data.userID && date === data.date);
    return findOuncesByDate.numOunces;
  }

  calculateFirstWeekOunces(userRepo, id) {
    return userRepo.getFirstWeek(id, this.hydrationData).map((data) => `${data.date}: ${data.numOunces}`);
  }

  calculateRandomWeekOunces(date, id, userRepo) {
    return userRepo.getWeekFromDate(date, id, this.hydrationData).map((data) => `${data.date}: ${data.numOunces}`);
  }
}

export default Hydration;
