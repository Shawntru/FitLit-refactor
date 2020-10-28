// import sleepData from './data/sleep';
import FitnessData from './FitnessData';

class Sleep extends FitnessData {
  constructor(sleepData, user) {
    super();
    this.userId = user.id;
    this.userSleepData = this.getRelevantData(sleepData);
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
    if (dailySleep === undefined) {
      return "Sorry, there is no sleep data for that date.";
    } else {
    return dailySleep.hoursSlept;
    }
  }

  getDailySleepQuality(givenDate) {
    let dailyQuality = this.userSleepData.find(data => {
      return givenDate === data.date;
    })
    if (dailyQuality === undefined) {
      return "Sorry, there is no sleep data for that date.";
    } else {
    return dailyQuality.sleepQuality;
    }
  }

  // findGivenWeek(date) {
  //   this.userSleepData.sort()
  //   let endDate = this.userSleepData.findIndex(data =>{
  //     return data.date === date;
  //   })
  //   let startDate = endDate
  //   if (startDate < 6) {
  //     startDate = 6;
  //   };
  //   return this.userSleepData.slice((startDate - 6), (endDate + 1));
  // }

  getWeekData(date, dataKey) {
    let week = this.findGivenWeek(date, 'userSleepData')
    if (week.length < 1) {
      return "Sorry, there is no sleep data for that week."
    } else {
    return week.map(data => {
      return `${data.date}: ${data[dataKey]}`;
    })
    }
  }

/*
TODO: All methods below likely need to be moved to UserRepo class:
*/

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
}

export default Sleep;
