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

  calculateWeekSleep(date, id, userRepo) {
    return userRepo.getWeekFromDate(date, id, this.sleepData).map((data) => `${data.date}: ${data.hoursSlept}`);
  }

  findGivenWeek(date) {
    this.userSleepData.sort()
    let endDate = this.userSleepData.findIndex(data =>{
      return data.date === date;
    })
    return this.userSleepData.slice((endDate - 6), (endDate + 1));
  }

  calculateWeekSleepQuality(date) {
    let week = this.findGivenWeek(date)
    console.log(week)
    return week.map(data => {
      return `${data.date}: ${data.sleepQuality}`;
    })
  }



//   calculateAllUserSleepQuality() {
//     const totalSleepQuality = this.sleepData.reduce((sumSoFar, dataItem) => {
//       sumSoFar += dataItem.sleepQuality;
//       return sumSoFar;
//     }, 0);
//     return totalSleepQuality / sleepData.length;
//   }

//   determineBestSleepers(date, userRepo) {
//     const timeline = userRepo.chooseWeekDataForAllUsers(this.sleepData, date);
//     const userSleepObject = userRepo.isolateUsernameAndRelevantData(this.sleepData, date, 'sleepQuality', timeline);

//     return Object.keys(userSleepObject).filter((key) => (userSleepObject[key].reduce((sumSoFar, sleepQualityValue) => {
//       sumSoFar += sleepQualityValue;
//       return sumSoFar;
//     }, 0) / userSleepObject[key].length) > 3).map((sleeper) => userRepo.getDataFromID(parseInt(sleeper)).name);
//   }

//   determineSleepWinnerForWeek(date, userRepo) {
//     const timeline = userRepo.chooseWeekDataForAllUsers(this.sleepData, date);
//     const sleepRankWithData = userRepo.combineRankedUserIDsAndAveragedData(this.sleepData, date, 'sleepQuality', timeline);

//     return this.getWinnerNamesFromList(sleepRankWithData, userRepo);
//   }

//   determineSleepHoursWinnerForDay(date, userRepo) {
//     const timeline = userRepo.chooseDayDataForAllUsers(this.sleepData, date);
//     const sleepRankWithData = userRepo.combineRankedUserIDsAndAveragedData(this.sleepData, date, 'hoursSlept', timeline);

//     return this.getWinnerNamesFromList(sleepRankWithData, userRepo);
//   }

//   getWinnerNamesFromList(sortedArray, userRepo) {
//     const bestSleepers = sortedArray.filter((element) => element[Object.keys(element)] === Object.values(sortedArray[0])[0]);

//     const bestSleeperIds = bestSleepers.map((bestSleeper) => (Object.keys(bestSleeper)));

//     return bestSleeperIds.map((sleepNumber) => userRepo.getDataFromID(parseInt(sleepNumber)).name);
//   }
}

export default Sleep;
