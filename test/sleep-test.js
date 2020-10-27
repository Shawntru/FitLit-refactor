import { expect } from 'chai';

import Sleep from '../src/Sleep';
import UserRepo from '../src/User-repo';
import User from '../src/User';
import {sampleUsersData, sampleHydrationData, sampleSleepData, SampleActivityData} from '../test/sample-data';

describe('Sleep', () => {
  let sleepData;
  let sleep;
  let sleep4
  let user1;
  let user4;
  let users;
  let userRepo;

  beforeEach(() => {
    user1 = sampleUsersData[0];
    user4 = sampleUsersData[3];
    users = [user1, user4];
    sleepData = sampleSleepData;
    sleep = new Sleep(sleepData, user1);
    sleep4 = new Sleep(sleepData, user4);
    userRepo = new UserRepo(users);
    users = userRepo.createUsers(users);
    sleep = new Sleep(sleepData, user1);
    sleep4 = new Sleep(sleepData, user4);
  });

  it.only('should have a user id that matches the current user', () => {
    expect(sleep.userId).to.equal(1);
  });

  it.only('should have sleep data that includes dates slept', () => {
    expect(sleep.userSleepData[0].date).to.equal('2017/06/15')
  })

  it.only('should have sleep data that includes hours slept for any given date', () => {
    expect(sleep.userSleepData[1].hoursSlept).to.equal(4.1)
  });

  // I could write more tests, but I think the 2 above prove that the getSleepData(sleepData) is working

  it.only('should find the average sleep hours per day for a user', () => {
    expect(sleep.calculateAverageSleep()).to.equal(7);
  });

  it.only('should find the average sleep quality per day for a user', () => {
    expect(sleep.calculateAverageSleepQuality()).to.equal(2);
  });

  /*
  TODO: need an edge case test for a non-existent date for all methods that take a date as an argument
  */

  it.only('should find the sleep hours for a user on a specified date', () => {
    expect(sleep.getDailySleep('2017/06/15')).to.equal(6.1);
    expect(sleep.getDailySleep('2019/08/22')).to.equal(10.1);
  });

  it.only('should give an error message if there is no data for a specific date', () => {
    expect(sleep.getDailySleep('2015/06/15')).to.equal("Sorry, there is no sleep data for that date.");
  })
  
  it.only('should find the sleep quality for a user on a specified date', () => {
    expect(sleep.getDailySleepQuality('2018/07/15')).to.equal(3.6);
    expect(sleep.getDailySleepQuality('2019/05/30')).to.equal(2.2);
  });

  it.only('should give an error message if there is no data for a specific date', () => {
    expect(sleep.getDailySleepQuality('2015/06/15')).to.equal("Sorry, there is no sleep data for that date.");
  })

  it.only('should find sleep by day for that days week', () => {
    expect(sleep4.getWeekData('2019/06/18', 'hoursSlept')[0]).to.eql('2017/06/15: 5.4');
    expect(sleep4.getWeekData('2019/06/18', 'hoursSlept')[6]).to.eql('2019/06/18: 7.9');
  });

  it.only('should give an emtpy array if there is no data for a specific date', () => {
    expect(sleep.getWeekData('2015/06/15')).to.equal("Sorry, there is no sleep data for that week.");
  })

  it.only('should find sleep quality by day for that days week', () => {
    expect(sleep4.getWeekData('2019/06/18', 'sleepQuality')[0]).to.eql('2017/06/15: 3');
    expect(sleep4.getWeekData('2019/06/18', 'sleepQuality')[6]).to.eql('2019/06/18: 1.6');
  });

  /*
  TODO: All tests below need to be moved to UserRepo-test in order to test the UserRepo class.
  */

  it('should determine the best quality sleepers for a week', () => {
    expect(sleep.determineBestSleepers('2019/06/21', userRepo)).to.eql(['Allie McCarthy', 'Bugs Bunny']);
  });

  it('should return person with best quality sleep for the week', () => {
    expect(sleep.determineSleepWinnerForWeek('2019/06/21', userRepo)).to.eql(['Bugs Bunny']);
  });

  it('should return all qualifying users if best quality sleep is a tie', () => {
    sleepData = sleepData.push({
      userID: 6,
      date: '2019/06/15',
      hoursSlept: 9,
      sleepQuality: 4,
    });
    const user6 = new User({
      id: 6,
      name: 'Richmond',
      address: '1234 Looney Street, Denver CO 80301-1697',
      email: 'BugsB1@hotmail.com',
      strideLength: 3.8,
      dailyStepGoal: 7000,
      friends: [1, 2, 3],
    });
    users = [user1, user2, user3, user4, user5, user6];
    userRepo = new UserRepo(users);

    expect(sleep.determineSleepWinnerForWeek('2019/06/21', userRepo)).to.eql(['Bugs Bunny', 'Richmond']);
  });

  it('should return person with longest sleep for the day', () => {
    expect(sleep.determineSleepHoursWinnerForDay('2019/06/21', userRepo)).to.eql(['Bugs Bunny']);
  });
  it('should return all qualifying users if longest sleep is a tie', () => {
    sleepData = sleepData.push({
      userID: 6,
      date: '2019/06/21',
      hoursSlept: 9,
      sleepQuality: 4,
    });
    const user6 = new User({
      id: 6,
      name: 'Richmond',
      address: '1234 Looney Street, Denver CO 80301-1697',
      email: 'BugsB1@hotmail.com',
      strideLength: 3.8,
      dailyStepGoal: 7000,
      friends: [1, 2, 3],
    });
    users = [user1, user2, user3, user4, user5, user6];
    userRepo = new UserRepo(users);

    expect(sleep.determineSleepHoursWinnerForDay('2019/06/21', userRepo)).to.eql(['Bugs Bunny', 'Richmond']);
  });
  // make this test fail when user is NOT best in week
});
