import UserData from './UserData';

class UserRepo extends UserData{
  constructor(users) {
    super();
    this.users = users;
  }

  getDataFromID(id) {
    return this.users.find((user) => id === user.id);
  }

  calculateAverageStepGoal() {
    const totalStepGoal = this.users.reduce((sumSoFar, data) => sumSoFar += data.dailyStepGoal, 0);
    return totalStepGoal / this.users.length;
  }

  getToday(id, dataSet) {
    return this.makeSortedUserArray(id, dataSet)[0].date;
  }

  getFirstWeek(id, dataSet) {
    return this.makeSortedUserArray(id, dataSet).slice(0, 7);
  }

  // getWeekFromDate(date, id, dataSet) {
  //   return getWeekFromDate(date, id, dataSet)
  // }

  chooseWeekDataForAllUsers(dataSet, date) {
    return dataSet.filter((dataItem) => (new Date(date)).setDate((new Date(date)).getDate() - 7) <= new Date(dataItem.date) && new Date(dataItem.date) <= new Date(date));
  }

  chooseDayDataForAllUsers(dataSet, date) {
    return dataSet.filter((dataItem) => dataItem.date === date);
  }

  isolateUsernameAndRelevantData(dataSet, date, relevantData, listFromMethod) {
    return listFromMethod.reduce((objectSoFar, dataItem) => {
      if (!objectSoFar[dataItem.userID]) {
        objectSoFar[dataItem.userID] = [dataItem[relevantData]];
      } else {
        objectSoFar[dataItem.userID].push(dataItem[relevantData]);
      }
      return objectSoFar;
    }, {});
  }

  rankUserIDsbyRelevantDataValue(dataSet, date, relevantData, listFromMethod) {
    const sortedObjectKeys = this.isolateUsernameAndRelevantData(dataSet, date, relevantData, listFromMethod);
    return Object.keys(sortedObjectKeys).sort((b, a) => (sortedObjectKeys[a].reduce((sumSoFar, sleepQualityValue) => {
      sumSoFar += sleepQualityValue;
      return sumSoFar;
    }, 0) / sortedObjectKeys[a].length) - (sortedObjectKeys[b].reduce((sumSoFar, sleepQualityValue) => {
      sumSoFar += sleepQualityValue;
      return sumSoFar;
    }, 0) / sortedObjectKeys[b].length));
  }

  combineRankedUserIDsAndAveragedData(dataSet, date, relevantData, listFromMethod) {
    const sortedObjectKeys = this.isolateUsernameAndRelevantData(dataSet, date, relevantData, listFromMethod);
    const rankedUsersAndAverages = this.rankUserIDsbyRelevantDataValue(dataSet, date, relevantData, listFromMethod);
    return rankedUsersAndAverages.map((rankedUser) => {
      rankedUser = {
        [rankedUser]: sortedObjectKeys[rankedUser].reduce(
          (sumSoFar, sleepQualityValue) => {
            sumSoFar += sleepQualityValue;
            return sumSoFar;
          }, 0,
        ) / sortedObjectKeys[rankedUser].length,
      };
      return rankedUser;
    });
  }
}

export default UserRepo;
