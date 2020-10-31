class UserData {
  constructor() {
    // this.sleepData = sleepData;
    // this.activityData = activityData;
    // this.hydrationData = hydrationData;
  }
  calculateAverages(id, dataset, uniqueData) {
    const perDay = this[dataset].filter((data) => id === data.userID);
    return perDay.reduce((sumSoFar, data) => sumSoFar += data[uniqueData], 0) / perDay.length;
  }
}

export default UserData;
