class UserData {
  constructor(hydrationData, sleepData, activityData, users){
    this.hydrationData = hydrationData;
    this.sleepData = sleepData;
    this.activityData = activityData;
    this.users = users;
  }

  //TODO: Refactor to add sad path testing for undefined data entries

  getDataFromID(id) {
    return this.users.find((user) => id === user.id);
  }

  getDataFromUserID(id, dataSet) {
    return dataSet.filter((userData) => id === userData.userID);
  }

  makeSortedUserArray(id, dataSet) {
    const selectedID = this.getDataFromUserID(id, dataSet);
    const sortedByDate = selectedID.sort((a, b) => new Date(b.date) - new Date(a.date));
    return sortedByDate;
  }

  getWeekFromDate(date, id, dataSet) {
    const dateIndex = this.makeSortedUserArray(id, dataSet).indexOf(this.makeSortedUserArray(id, dataSet).find((sortedItem) => (sortedItem.date === date)));
    return this.makeSortedUserArray(id, dataSet).slice(dateIndex, dateIndex + 7);
  }

  calculateWeekData(id, date, userRepo, dataRepo, releventData) {
    return this
      .getWeekFromDate(date, id, this[dataRepo])
      .map((data) => `${data.date}: ${data[releventData]}`);
  }

}

export default UserData;
