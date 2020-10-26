class Activity {
  constructor(activityData, user) {

    //TODO: change to userId
    this.user = user;
    this.activityData = this.getUserActivityData(activityData);
  }

  getUserActivityData(activityData) {
    return activityData.filter((data) => {
      return this.user.id === data.userID;
    });
  }

  getActivityOnDate(date) {
    return this.activityData.find((data) => {
      return date === data.date;
    })
  }

  getMilesFromStepsByDate(date) {
    let activityLog = this.getActivityOnDate(date);
    let stepsPerMile = (5280 / this.user.strideLength);
    let milesWalked = (activityLog.numSteps / stepsPerMile);
    return (Math.round(milesWalked * 10) / 10);
  }

  getActiveMinutesByDate(date) {
    let activityLog = this.getActivityOnDate(date);
    return activityLog.minutesActive;
  }

  calculateActiveAverageForWeek(date) {
    let week = this.findGivenWeek(date);
    let totalTime = week.reduce((totalMinutes, element) => {
      totalMinutes += element.minutesActive;
      return totalMinutes;
    }, 0);
    return (Math.round((totalTime / 7) * 10) / 10);
  }

  findGivenWeek(date) {
    let sortedElements = this.activityData.sort((a, b) => {
      return Date.parse(a.date) - Date.parse(b.date);
    })
    let endDateIndex = sortedElements.findIndex(data =>{
      return data.date === date;
    })
    let startDateIndex = endDateIndex;
    if (startDateIndex < 6) {
      startDateIndex = 6;
    }
    return this.activityData.slice((startDateIndex - 6), (endDateIndex + 1));
  }

  accomplishStepGoal(date) {
    let activityLog = this.getActivityOnDate(date);
    return (activityLog.numSteps >= this.user.dailyStepGoal);
  }

  getDaysGoalExceeded() {
    return this.activityData
      .filter(element => this.accomplishStepGoal(element.date))
      .map(element => element.date);
  }

  getStairRecord() {
    let record = 0;
    this.activityData.forEach(element => {
      if (element.flightsOfStairs > record) {
        record = element.flightsOfStairs;
      }
    })
    return record;
  }

  userDataForToday(date, key) {
    let activityLog = this.getActivityOnDate(date);
    return activityLog[key];
  }

  userDataForWeek(date, key) {
    return this
      .findGivenWeek(date)
      .map(day => `${day.date}: ${day[key]}`);
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


  //TODO: Switch this method to User-repo class
  getAllUserAverageForDay(date, userRepo, relevantData) {
    const selectedDayData = userRepo.chooseDayDataForAllUsers(this.activityData, date);
    return parseFloat((selectedDayData.reduce((acc, elem) => acc += elem[relevantData], 0) / selectedDayData.length).toFixed(1));
  }
  //**********


}

export default Activity;
