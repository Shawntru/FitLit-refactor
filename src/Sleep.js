import sleepData from './data/sleep';

class Sleep {
  constructor(sleepData) {
    this.sleepData = sleepData;
  }

  calculateAverageSleep(id) {
    const perDaySleep = this.sleepData.filter((data) => id === data.userID);
    return perDaySleep.reduce((sumSoFar, data) => sumSoFar += data.hoursSlept, 0) / perDaySleep.length;
  }

  calculateAverageSleepQuality(id) {
    const perDaySleepQuality = this.sleepData.filter((data) => id === data.userID);
    return perDaySleepQuality.reduce((sumSoFar, data) => sumSoFar += data.sleepQuality, 0) / perDaySleepQuality.length;
  }

  calculateDailySleep(id, date) {
    const findSleepByDate = this.sleepData.find((data) => id === data.userID && date === data.date);
    return findSleepByDate.hoursSlept;
  }

  calculateDailySleepQuality(id, date) {
    const findSleepQualityByDate = this.sleepData.find((data) => id === data.userID && date === data.date);
    return findSleepQualityByDate.sleepQuality;
  }

  calculateWeekSleep(date, id, userRepo) {
    return userRepo.getWeekFromDate(date, id, this.sleepData).map((data) => `${data.date}: ${data.hoursSlept}`);
  }

  calculateWeekSleepQuality(date, id, userRepo) {
    return userRepo.getWeekFromDate(date, id, this.sleepData).map((data) => `${data.date}: ${data.sleepQuality}`);
  }

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
