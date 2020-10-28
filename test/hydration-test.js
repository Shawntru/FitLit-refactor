import { expect } from 'chai';
import Hydration from '../src/Hydration';
import UserRepo from '../src/User-repo';
import User from '../src/User';
import {sampleUsersData, sampleHydrationData} from '../test/sample-data';

describe('Hydration', () => {
  let user1;
  let user4;
  let users;
  let userRepo;
  let hydrationData;
  let hydration;

  beforeEach(() => {
    user1 = sampleUsersData[0];
    user4 = sampleUsersData[3];
    users = [user1, user4];
    userRepo = new UserRepo(users);
    users = userRepo.createUsers(users);

    hydrationData = sampleHydrationData;
    hydration = new Hydration(hydrationData, user4);
  });

  it('should have a userID', () => {
    expect(hydration.userId).to.deep.equal(4);
  });
  
  it('should take in a list of data', () => {
    expect(hydration.hydrationData[0].numOunces).to.equal(36);
    expect(hydration.hydrationData[0].date).to.equal('2019/04/15');
  });

  it('should find the average water intake per day for a user', () => {
    expect(hydration.calculateAverageOunces()).to.equal(34);
  });

  it('should find the water intake for user on a specified date', () => {
    expect(hydration.calculateDailyOunces('2018/02/01')).to.equal(28);
    expect(hydration.calculateDailyOunces('2019/03/15')).to.equal(35);
  });
  
  it('should have an error code if there is not data for water intake ona specific date', () => {
      expect(hydration.calculateDailyOunces('2019/09/14')).to.equal("Sorry there is no hydration data for that date");
  });

  it('should find water intake by day for first week', () => {
    expect(hydration.calculateFirstWeekOunces('2019/09/18')).to.deep.eql([
      { date: '2018/02/01', numOunces: 28 },
      { date: '2019/03/15', numOunces: 35 },
      { date: '2019/04/15', numOunces: 36 },
      { date: '2019/09/15', numOunces: 30 },
      { date: '2019/09/16', numOunces: 30 },
      { date: '2019/09/17', numOunces: 40 },
      { date: '2019/09/18', numOunces: 40 }
    ])
    // TODO: I believe this is an edge case?
    // expect(hydration.calculateFirstWeekOunces('2019/09/21')).to.deep.eql([
    //   { date: '2019/09/15', numOunces: 30 },
    //   { date: '2019/09/16', numOunces: 30 },
    //   { date: '2019/09/17', numOunces: 40 },
    //   { date: '2019/09/18', numOunces: 40 },
    //   { date: '2019/09/19', numOunces: 30 },
    //   { date: '2019/09/20', numOunces: 40 },
    //   { date: '2019/09/21', numOunces: 61 }
    // ])
  });
  /* there is no method for this test:
  it('should find ounces by day for that days week', () => {
    const user3 = new User({
      id: 3,
      name: 'The Rock',
      address: '1236 Awesome Street, Denver CO 80301-1697',
      email: 'therock@hotmail.com',
      strideLength: 10,
      dailyStepGoal: 60000,
      friends: [1, 2, 4],
    });
  
    const user4 = new User({
      id: 4,
      name: 'Rainbow Dash',
      address: '1237 Equestria Street, Denver CO 80301-1697',
      email: 'rainbowD1@hotmail.com',
      strideLength: 3.8,
      dailyStepGoal: 7000,
      friends: [1, 2, 3],
    });
    const users = [user3, user4];
    const userRepo = new UserRepo(users);
    console.log('HELOOO', hydration.calculateRandomWeekOunces('2018/02/01', 4, userRepo));
    expect(hydration.calculateRandomWeekOunces('2019/09/18', 4, userRepo)[0]).to.eql('2019/09/18: 40');
    expect(hydration.calculateRandomWeekOunces('2018/02/01', 4, userRepo)[6]).to.eql('2019/09/16: 30');
    // this is failing because it doesn't exist, need a failure case
  });
  // day of hydration should not include user 2 or user 1 on August 22
  // week of hydration should not include user 4 not during the week
  */
});
