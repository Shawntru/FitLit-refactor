class Activity {
  constructor(activityData) {
    this.activityData = activityData;
  }

  getMilesFromStepsByDate(id, date, userRepo) {
    const userStepsByDate = this.activityData.find((data) => id === data.userID && date === data.date);
    return parseFloat(((userStepsByDate.numSteps * userRepo.strideLength) / 5280).toFixed(1));
  }

  getActiveMinutesByDate(id, date) {
    const userActivityByDate = this.activityData.find((data) => id === data.userID && date === data.date);
    return userActivityByDate.minutesActive;
  }

  calculateActiveAverageForWeek(id, date, userRepo) {
    return parseFloat((userRepo.getWeekFromDate(date, id, this.activityData).reduce((acc, elem) => acc += elem.minutesActive, 0) / 7).toFixed(1));
  }

  accomplishStepGoal(id, date, userRepo) {
    const userStepsByDate = this.activityData.find((data) => id === data.userID && date === data.date);
    if (userStepsByDate.numSteps === userRepo.dailyStepGoal) {
      return true;
    }
    return false;
  }

  getDaysGoalExceeded(id, userRepo) {
    return this.activityData.filter((data) => id === data.userID && data.numSteps > userRepo.dailyStepGoal).map((data) => data.date);
  }

  getStairRecord(id) {
    return this.activityData.filter((data) => id === data.userID).reduce((acc, elem) => ((elem.flightsOfStairs > acc) ? elem.flightsOfStairs : acc), 0);
  }

  getAllUserAverageForDay(date, userRepo, relevantData) {
    const selectedDayData = userRepo.chooseDayDataForAllUsers(this.activityData, date);
    return parseFloat((selectedDayData.reduce((acc, elem) => acc += elem[relevantData], 0) / selectedDayData.length).toFixed(1));
  }

  userDataForToday(id, date, userRepo, relevantData) {
    const userData = userRepo.getDataFromUserID(id, this.activityData);
    return userData.find((data) => data.date === date)[relevantData];
  }

  userDataForWeek(id, date, userRepo, releventData) {
    return userRepo.getWeekFromDate(date, id, this.activityData).map((data) => `${data.date}: ${data[releventData]}`);
  }

  // Friends

  getFriendsActivity(user, userRepo) {
    const data = this.activityData;
    const userDatalist = user.friends.map((friend) => userRepo.getDataFromUserID(friend, data));
    return userDatalist.reduce((arraySoFar, listItem) => arraySoFar.concat(listItem), []);
  }

  getFriendsAverageStepsForWeek(user, date, userRepo) {
    const friendsActivity = this.getFriendsActivity(user, userRepo);
    const timeline = userRepo.chooseWeekDataForAllUsers(friendsActivity, date);
    return userRepo.combineRankedUserIDsAndAveragedData(friendsActivity, date, 'numSteps', timeline);
  }

  showChallengeListAndWinner(user, date, userRepo) {
    const rankedList = this.getFriendsAverageStepsForWeek(user, date, userRepo);

    return rankedList.map((listItem) => {
      const userID = Object.keys(listItem)[0];
      const userName = userRepo.getDataFromID(parseInt(userID)).name;
      return `${userName}: ${listItem[userID]}`;
    });
  }

  showcaseWinner(user, date, userRepo) {
    const namedList = this.showChallengeListAndWinner(user, date, userRepo);
    const winner = this.showChallengeListAndWinner(user, date, userRepo).shift();
    return winner;
  }

  getStreak(userRepo, id, relevantData) {
    const data = this.activityData;
    const sortedUserArray = (userRepo.makeSortedUserArray(id, data)).reverse();
    const streaks = sortedUserArray.filter((element, index) => {
      if (index >= 2) {
        return (sortedUserArray[index - 2][relevantData] < sortedUserArray[index - 1][relevantData] && sortedUserArray[index - 1][relevantData] < sortedUserArray[index][relevantData]);
      }
    });
    return streaks.map((streak) => streak.date);
  }

  getWinnerId(user, date, userRepo) {
    const rankedList = this.getFriendsAverageStepsForWeek(user, date, userRepo);
    const keysList = rankedList.map((listItem) => Object.keys(listItem));
    return parseInt(keysList[0].join(''));
  }
}

export default Activity;
