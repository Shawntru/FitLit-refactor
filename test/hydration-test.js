import { expect } from 'chai';
import Hydration from '../src/Hydration';
import UserRepo from '../src/User-repo';
import User from '../src/User';

describe('Hydration', () => {
  let user 
  let userData
  let hydrationData;
  let hydration;

  beforeEach(() => {
    userData = {
      id: 4,
      name: 'Scooby Doo',
      address: '123 Happy Lane',
      email: 'Givemeajob@gmail.com',
      strideLength: 4.3,     
      dailyStepGoal: 10000,     
      friends: [  16,  2, 6]    
    }
    user = new User(userData)
    hydrationData = [{
      userId: 1,
      date: '2019/06/15',
      numOunces: 37,
    },
    {
      userId: 2,
      date: '2019/06/15',
      numOunces: 38,
    },
    {
      userId: 3,
      date: '2019/05/09',
      numOunces: 1,
    },
    {
      userId: 4,
      date: '2019/04/15',
      numOunces: 36,
    },
    {
      userId: 2,
      date: '2018/10/23',
      numOunces: 34,
    },
    {
      userID: 1,
      date: '2018/06/16',
      numOunces: 39,
    },
    {
      userId: 3,
      date: '2018/03/30',
      numOunces: 2,
    },
    {
      userId: 4,
      date: '2018/02/01',
      numOunces: 28,
    },

    {
      userId: 1,
      date: '2016/08/22',
      numOunces: 30,
    },
    {
      userId: 3,
      date: '2016/05/14',
      numOunces: 3,
    },
    {
      userId: 2,
      date: '2016/04/27',
      numOunces: 40,
    },
    {
      userId: 4,
      date: '2019/03/15',
      numOunces: 35,
    },
    {
      userId: 4,
      date: '2019/09/21',
      numOunces: 61,
    },
    {
      userId: 4,
      date: '2019/09/20',
      numOunces: 40,
    },
    {
      userId: 4,
      date: '2019/09/19',
      numOunces: 30,
    },
    {
      userId: 4,
      date: '2019/09/18',
      numOunces: 40,
    },
    {
      userId: 4,
      date: '2019/09/17',
      numOunces: 40,
    },
    {
      userId: 4,
      date: '2019/09/16',
      numOunces: 30,
    },
    {
      userId: 4,
      date: '2019/09/15',
      numOunces: 30,
    },
    ];

    hydration = new Hydration(hydrationData, user);
  });
  
  it.only('should have a userID', () => {
    expect(hydration.userId).to.deep.equal(4)
  })
  

  it.only('should take in a list of data', () => {
    expect(hydration.hydrationData[0].numOunces).to.equal(36);
    expect(hydration.hydrationData[0].date).to.equal('2019/04/15');
  });

  it.only('should find the average water intake per day for a user', () => {
    expect(hydration.calculateAverageOunces()).to.equal(37);
  });

  it.only('should find the water intake for user on a specified date', () => {
    expect(hydration.calculateDailyOunces('2018/02/01')).to.equal(28);
    expect(hydration.calculateDailyOunces('2019/03/15')).to.equal(35);
  });
  
  it.only('should have an error code if there is not data for water intake ona specific date', () => {
      expect(hydration.calculateDailyOunces('2019/09/14')).to.equal("Sorry there is no hydration data for that date");
  })

  it.only('should find water intake by day for first week', () => {
    expect(hydration.calculateFirstWeekOunces('2019/09/18')).to.deep.eql([
  { date: '2018/02/01', numOunces: 28 },
  { date: '2019/03/15', numOunces: 35 },
  { date: '2019/04/15', numOunces: 36 },
  { date: '2019/09/15', numOunces: 30 },
  { date: '2019/09/16', numOunces: 30 },
  { date: '2019/09/17', numOunces: 40 },
  { date: '2019/09/18', numOunces: 40 }
]
  )
    expect(hydration.calculateFirstWeekOunces('2019/09/21')).to.deep.eql([
  { date: '2019/09/15', numOunces: 30 },
  { date: '2019/09/16', numOunces: 30 },
  { date: '2019/09/17', numOunces: 40 },
  { date: '2019/09/18', numOunces: 40 },
  { date: '2019/09/19', numOunces: 30 },
  { date: '2019/09/20', numOunces: 40 },
  { date: '2019/09/21', numOunces: 61 }
])
  });

  // it('should find  by day for that days week', () => {
  //   const user3 = new User({
  //     id: 3,
  //     name: 'The Rock',
  //     address: '1236 Awesome Street, Denver CO 80301-1697',
  //     email: 'therock@hotmail.com',
  //     strideLength: 10,
  //     dailyStepGoal: 60000,
  //     friends: [1, 2, 4],
  //   });
  // 
  //   const user4 = new User({
  //     id: 4,
  //     name: 'Rainbow Dash',
  //     address: '1237 Equestria Street, Denver CO 80301-1697',
  //     email: 'rainbowD1@hotmail.com',
  //     strideLength: 3.8,
  //     dailyStepGoal: 7000,
  //     friends: [1, 2, 3],
  //   });
  //   const users = [user3, user4];
  //   const userRepo = new UserRepo(users);
  //   console.log('HELOOO', hydration.calculateRandomWeekOunces('2018/02/01', 4, userRepo));
  //   expect(hydration.calculateRandomWeekOunces('2019/09/18', 4, userRepo)[0]).to.eql('2019/09/18: 40');
    // expect(hydration.calculateRandomWeekOunces('2018/02/01', 4, userRepo)[6]).to.eql('2019/09/16: 30');
    // this is failing because it doesn't exist, need a failure case
  // });
  // day of hydration should not include user 2 or user 1 on August 22
  // week of hydration should not include user 4 not during the week
});
