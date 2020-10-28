import Hydration from '../src/Hydration';
import Sleep from '../src/Sleep';
import Activity from '../src/Activity';
import hydrationData from './data/hydration';
import sleepData from './data/sleep';
import activityData from './data/activity';

class User {
  constructor(userDetails) {
    this.id = userDetails.id;
    this.name = userDetails.name;
    this.address = userDetails.address;
    this.email = userDetails.email;
    this.strideLength = userDetails.strideLength;
    this.dailyStepGoal = userDetails.dailyStepGoal;
    this.friends = userDetails.friends;
    this.activity = new Activity(activityData, this);
    this.sleep = new Sleep(sleepData, this);
    this.hydration = new Hydration(hydrationData, this);
  }

  getFirstName() {
    return this.name.split(' ', 1).join();
  }

  getFriendsNames(userStorage) {
    return this.friends.map((friendId) => (userStorage.getDataFromID(friendId).name));
  }
}


export default User;
