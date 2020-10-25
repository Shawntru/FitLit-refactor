import sleepData from './data/sleep';

class Sleep {
  constructor(sleepData, user) {
    this.userId = user.id;
    this.userSleepData = this.getSleepData(sleepData);
  }

  getSleepData(sleepersData) {
    let userSleep = sleepersData.filter(data => {
      return this.userId === data.userID
    })
    return userSleep.map(data => {
      return {
        date: data.date,
        hoursSlept: data.hoursSlept,
        sleepQuality: data.sleepQuality,
      }
    })
  }

  calculateAverageSleep() {
    let totalSleep = this.userSleepData.reduce((total, current) => {
      total += current.hoursSlept;
      return total
    }, 0)
    return Math.round(totalSleep / this.userSleepData.length);
  }

  calculateAverageSleepQuality() {
    let totalSleepQuality = this.userSleepData.reduce((total, current) => {
      total += current.sleepQuality;
      return total
    }, 0)
    return Math.round(totalSleepQuality / this.userSleepData.length);
  }

  getDailySleep(givenDate) {
    let dailySleep = this.userSleepData.find(data => {
      return givenDate === data.date;
    })
    return dailySleep.hoursSlept;
  }

  getDailySleepQuality(givenDate) {
    let dailyQuality = this.userSleepData.find(data => {
      return givenDate === data.date;
    })
    return dailyQuality.sleepQuality;
  }

  findGivenWeek(date) {
    this.userSleepData.sort()
    let endDate = this.userSleepData.findIndex(data =>{
      return data.date === date;
    })
    let startDate = endDate
    if (startDate < 6) {
      startDate = 6;
    };
    return this.userSleepData.slice((startDate - 6), (endDate + 1));
  }

  getWeekData(date, dataKey) {
    let week = this.findGivenWeek(date)
    return week.map(data => {
      return `${data.date}: ${data[dataKey]}`;
    })
  }

/*
All methods below likely need to be moved to UserRepo class:

  calculateAllUserSleepQuality() {
    const totalSleepQuality = this.sleepData.reduce((sumSoFar, dataItem) => {
      sumSoFar += dataItem.sleepQuality;
      return sumSoFar;
    }, 0);
    return totalSleepQuality / sleepData.length;
  }

  determineBestSleepers(date, userRepo) {
    const timeline = userRepo.chooseWeekDataForAllUsers(this.sleepData, date);
    const userSleepObject = userRepo.isolateUsernameAndRelevantData(this.sleepData, date, 'sleepQuality', timeline);

    return Object.keys(userSleepObject).filter((key) => (userSleepObject[key].reduce((sumSoFar, sleepQualityValue) => {
      sumSoFar += sleepQualityValue;
      return sumSoFar;
    }, 0) / userSleepObject[key].length) > 3).map((sleeper) => userRepo.getDataFromID(parseInt(sleeper)).name);
  }

  determineSleepWinnerForWeek(date, userRepo) {
    const timeline = userRepo.chooseWeekDataForAllUsers(this.sleepData, date);
    const sleepRankWithData = userRepo.combineRankedUserIDsAndAveragedData(this.sleepData, date, 'sleepQuality', timeline);

    return this.getWinnerNamesFromList(sleepRankWithData, userRepo);
  }

  determineSleepHoursWinnerForDay(date, userRepo) {
    const timeline = userRepo.chooseDayDataForAllUsers(this.sleepData, date);
    const sleepRankWithData = userRepo.combineRankedUserIDsAndAveragedData(this.sleepData, date, 'hoursSlept', timeline);

    return this.getWinnerNamesFromList(sleepRankWithData, userRepo);
  }

  getWinnerNamesFromList(sortedArray, userRepo) {
    const bestSleepers = sortedArray.filter((element) => element[Object.keys(element)] === Object.values(sortedArray[0])[0]);

    const bestSleeperIds = bestSleepers.map((bestSleeper) => (Object.keys(bestSleeper)));

    return bestSleeperIds.map((sleepNumber) => userRepo.getDataFromID(parseInt(sleepNumber)).name);
  }
*/
}

export default Sleep;
