import './css/base.scss';
import './css/style.scss';

import './images/person walking on path.jpg';
import './images/The Rock.jpg';

import requests from './fetch';

import User from './User';
import Activity from './Activity';
import Hydration from './Hydration';
import Sleep from './Sleep';
import UserRepo from './User-repo';

const sidebarName = document.getElementById('sidebarName');
const stepGoalCard = document.getElementById('stepGoalCard');
const headerText = document.getElementById('headerText');
const userAddress = document.getElementById('userAddress');
const userEmail = document.getElementById('userEmail');
const userStridelength = document.getElementById('userStridelength');
const friendList = document.getElementById('friendList');
const hydrationToday = document.getElementById('hydrationToday');
const hydrationAverage = document.getElementById('hydrationAverage');
const hydrationThisWeek = document.getElementById('hydrationThisWeek');
const hydrationEarlierWeek = document.getElementById('hydrationEarlierWeek');
const historicalWeek = document.querySelectorAll('.historicalWeek');
const sleepToday = document.getElementById('sleepToday');
const sleepQualityToday = document.getElementById('sleepQualityToday');
const avUserSleepQuality = document.getElementById('avUserSleepQuality');
const sleepThisWeek = document.getElementById('sleepThisWeek');
const sleepEarlierWeek = document.getElementById('sleepEarlierWeek');
const friendChallengeListToday = document.getElementById('friendChallengeListToday');
const friendChallengeListHistory = document.getElementById('friendChallengeListHistory');
const bigWinner = document.getElementById('bigWinner');
const userStepsToday = document.getElementById('userStepsToday');
const avgStepsToday = document.getElementById('avgStepsToday');
const userStairsToday = document.getElementById('userStairsToday');
const avgStairsToday = document.getElementById('avgStairsToday');
const userMinutesToday = document.getElementById('userMinutesToday');
const avgMinutesToday = document.getElementById('avgMinutesToday');
const userStepsThisWeek = document.getElementById('userStepsThisWeek');
const userStairsThisWeek = document.getElementById('userStairsThisWeek');
const userMinutesThisWeek = document.getElementById('userMinutesThisWeek');
const bestUserSteps = document.getElementById('bestUserSteps');
const streakList = document.getElementById('streakList');
const streakListMinutes = document.getElementById('streakListMinutes');
const newHydrationInput = document.querySelector('.new-hydration-input');
const newStepsInput = document.querySelector('.new-activity-input-steps');
const newActiveMinutesInput = document.querySelector('.new-activity-input-minutes');
const newStairsInput = document.querySelector('.new-activity-input-stairs');
const newHoursSlept = document.querySelector('.new-hours-slept-input');
const newSleepQuality = document.querySelector('.new-sleep-quality-input');

window.addEventListener('click', windowOnClick);

const receivedUserData = requests.fetchUserData();
const receivedActivityData = requests.fetchActivityData();
const receivedHydrationData = requests.fetchHydrationData();
const receivedSleepData = requests.fetchSleepData();

let userNowId;
let userData;
let activityData;
let hydrationData;
let sleepData;
let userRepo;

Promise.all([receivedUserData, receivedActivityData, receivedHydrationData, receivedSleepData])
  .then(value => {
    userData = value[0]
    activityData = value[1];
    hydrationData = value[2];
    sleepData = value[3];
    startApp();
  })

function startApp() {
  let userList = makeUsers(userData);
  userRepo = new UserRepo(userList);
  const hydrationRepo = new Hydration(hydrationData);
  const sleepRepo = new Sleep(sleepData);
  const activityRepo = new Activity(activityData);
  userNowId = pickUser();
  const userNow = getUserById(userNowId, userRepo);
  const today = makeToday(userRepo, userNowId, hydrationData);
  const randomHistory = makeRandomDate(userRepo, userNowId, hydrationData);
  historicalWeek.forEach((instance) => instance.insertAdjacentHTML('afterBegin', `Week of ${randomHistory}`));
  addInfoToSidebar(userNow, userRepo);
  addHydrationInfo(userNowId, hydrationRepo, today, userRepo, randomHistory);
  addSleepInfo(userNowId, sleepRepo, today, userRepo, randomHistory);
  const winnerNow = makeWinnerID(activityRepo, userNow, today, userRepo);
  addActivityInfo(userNowId, activityRepo, today, userRepo, randomHistory, userNow, winnerNow);
  addFriendGameInfo(userNowId, activityRepo, userRepo, today, randomHistory, userNow);
}

function makeUsers(usersData) {
  return usersData.map((dataItem) => {
    return new User(dataItem);
  });
}

function pickUser() {
  return Math.floor(Math.random() * 50);
}

function getUserById(id, listRepo) {
  return listRepo.getDataFromID(id);
}

function windowOnClick(event) {
  if (event.target.classList.contains("new-hydration-button")) {
    submitNewHydration(userNowId);
  }
  if (event.target.classList.contains("new-activity-button")) {
    submitNewActivity(userNowId);
  }
  if (event.target.classList.contains("new-sleep-button")) {
    submitNewSleep(userNowId);
  }
}

function getTodaysDate() {
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  var yyyy = today.getFullYear();
  return today = yyyy + '/' + mm + '/' + dd;
}

function submitNewHydration(userNowId) {
  let todaysDate = getTodaysDate();
  requests.postHydrationData(userNowId, todaysDate, +newHydrationInput.value)
    .then(() => {
      updatePageHydration(userNowId, todaysDate);
  });
}

function updatePageHydration (userNowId, todaysDate) {
  requests.fetchHydrationData().then(value => {
      hydrationData = value;
      const newHydration = new Hydration(hydrationData);
      let hydrationElementsToClear = [hydrationToday];
      clearHtml(hydrationElementsToClear);
      addDailyOuncesInfo(userNowId, newHydration, todaysDate);
  })
}

function submitNewActivity(userNowId) {
  let todaysDate = getTodaysDate()
  requests.postActivityData(userNowId, todaysDate, +newStepsInput.value, +newActiveMinutesInput.value, +newStairsInput.value)
    .then(value => {
      updatePageActivity(userNowId, todaysDate)
    })
}

function updatePageActivity(userNowId, todaysDate) {
  requests.fetchActivityData()
    .then(value => {
      activityData = value;
      const currentActivityRepo = new Activity(activityData);
      let activityElementsToClear = [
        userStairsToday, 
        userStepsToday, 
        userMinutesToday, 
      ]
      clearHtml(activityElementsToClear);
      addDailyActivityInfo(userNowId, currentActivityRepo, todaysDate, userRepo);
    })
}

function submitNewSleep(userNowId) {
  let todaysDate = getTodaysDate();
  requests.postSleepData(userNowId, todaysDate, +newHoursSlept.value, +newSleepQuality.value)    .then(value => {
      updatePageSleep(userNowId, todaysDate)
    })
}

function updatePageSleep(userNowId, todaysDate) {
  requests.fetchSleepData()
    .then(value => {
    sleepData = value;
    const currentSleepRepo = new Sleep(sleepData);
    let sleepElementsToClear = [
      sleepToday,
      sleepQualityToday,
    ];
    clearHtml(sleepElementsToClear);
    addDailySleepInfo(userNowId, currentSleepRepo, todaysDate) 
  })
}
function addInfoToSidebar(user, userStorage) {
  sidebarName.innerText = user.name;
  headerText.innerText = `${user.getFirstName()}'s Activity Tracker`;
  stepGoalCard.innerText = `Your daily step goal is ${user.dailyStepGoal}.`;
  avStepGoalCard.innerText = `The average daily step goal is ${userStorage.calculateAverageStepGoal()}`;
  userAddress.innerText = user.address;
  userEmail.innerText = user.email;
  userStridelength.innerText = `Your stridelength is ${user.strideLength} meters.`;
  friendList.insertAdjacentHTML('afterBegin', makeFriendHTML(user, userStorage));
}

function makeFriendHTML(user, userStorage) {
  return user.getFriendsNames(userStorage).map((friendName) => `<li class='historical-list-listItem'>${friendName}</li>`).join('');
}

function makeWinnerID(activityInfo, user, dateString, userStorage) {
  return activityInfo.getWinnerId(user, dateString, userStorage);
}

function makeToday(userStorage, id, dataSet) {
  const sortedArray = userStorage.makeSortedUserArray(id, dataSet);
  return sortedArray[0].date;
}

function makeRandomDate(userStorage, id, dataSet) {
  const sortedArray = userStorage.makeSortedUserArray(id, dataSet);
  return sortedArray[Math.floor(Math.random() * sortedArray.length + 1)].date;
}

function clearHtml(queryElements) {
  queryElements.forEach(query => {
    query.innerHTML = '';
  })
}

function addHydrationInfo(id, hydrationInfo, dateString, userStorage, laterDateString) {
  addDailyOuncesInfo(id, hydrationInfo, dateString);
  hydrationAverage.insertAdjacentHTML('afterBegin', `<p>Your average water intake is</p><p><span class="number">${hydrationInfo.calculateAverageOunces(id)}</span></p> <p>oz per day.</p>`);
  hydrationThisWeek.insertAdjacentHTML('afterBegin', makeHydrationHTML(id, hydrationInfo, userStorage, hydrationInfo.calculateFirstWeekOunces(userStorage, id)));
  hydrationEarlierWeek.insertAdjacentHTML('afterBegin', makeHydrationHTML(id, hydrationInfo, userStorage, hydrationInfo.calculateRandomWeekOunces(laterDateString, id, userStorage)));
}

function addDailyOuncesInfo(id, hydrationInfo, dateString) {
  let ounces = hydrationInfo.calculateDailyOunces(id, dateString);
  hydrationToday.innerHTML = `<p>You drank</p><p><span class="number">${ounces}</span></p><p>oz water today.</p>` ;
}

function makeHydrationHTML(id, hydrationInfo, userStorage, method) {
  return method.map((drinkData) => `<li class="historical-list-listItem">On ${drinkData}oz</li>`).join('');
}

function addSleepInfo(id, sleepInfo, dateString, userStorage, laterDateString) {
  sleepToday.insertAdjacentHTML('afterBegin', `<p>You slept</p> <p><span class="number">${sleepInfo.calculateDailySleep(id, dateString)}</span></p> <p>hours today.</p>`);
  sleepQualityToday.insertAdjacentHTML('afterBegin', `<p>Your sleep quality was</p> <p><span class="number">${sleepInfo.calculateDailySleepQuality(id, dateString)}</span></p><p>out of 5.</p>`);
  avUserSleepQuality.insertAdjacentHTML('afterBegin', `<p>The average user's sleep quality is</p> <p><span class="number">${Math.round(sleepInfo.calculateAllUserSleepQuality() * 100) / 100}</span></p><p>out of 5.</p>`);
  sleepThisWeek.insertAdjacentHTML('afterBegin', makeSleepHTML(id, sleepInfo, userStorage, sleepInfo.calculateWeekSleep(dateString, id, userStorage)));
  sleepEarlierWeek.insertAdjacentHTML('afterBegin', makeSleepHTML(id, sleepInfo, userStorage, sleepInfo.calculateWeekSleep(laterDateString, id, userStorage)));
}

function addDailySleepInfo(id, sleepInfo, dateString) {
  sleepToday.insertAdjacentHTML('afterBegin', `<p>You slept</p> <p><span class="number">${sleepInfo.calculateDailySleep(id, dateString)}</span></p> <p>hours today.</p>`);
  sleepQualityToday.insertAdjacentHTML('afterBegin', `<p>Your sleep quality was</p> <p><span class="number">${sleepInfo.calculateDailySleepQuality(id, dateString)}</span></p><p>out of 5.</p>`);
}

function makeSleepHTML(id, sleepInfo, userStorage, method) {
  return method.map((sleepData) => `<li class="historical-list-listItem">On ${sleepData} hours</li>`).join('');
}

function makeSleepQualityHTML(id, sleepInfo, userStorage, method) {
  return method.map((sleepQualityData) => `<li class="historical-list-listItem">On ${sleepQualityData}/5 quality of sleep</li>`).join('');
}

function addActivityInfo(id, activityInfo, dateString, userStorage, laterDateString, user, winnerId) {
  // addDailyActivityInfo(id, activityInfo, dateString, userStorage);
  userStairsToday.insertAdjacentHTML('afterBegin', `<p>Stair Count:</p><p>You</><p><span class="number">${activityInfo.userDataForToday(id, dateString, userStorage, 'flightsOfStairs')}</span></p>`);
  avgStairsToday.insertAdjacentHTML('afterBegin', `<p>Stair Count: </p><p>All Users</p><p><span class="number">${activityInfo.getAllUserAverageForDay(dateString, userStorage, 'flightsOfStairs')}</span></p>`);
  userStepsToday.insertAdjacentHTML('afterBegin', `<p>Step Count:</p><p>You</p><p><span class="number">${activityInfo.userDataForToday(id, dateString, userStorage, 'numSteps')}</span></p>`);
  avgStepsToday.insertAdjacentHTML('afterBegin', `<p>Step Count:</p><p>All Users</p><p><span class="number">${activityInfo.getAllUserAverageForDay(dateString, userStorage, 'numSteps')}</span></p>`);
  userMinutesToday.insertAdjacentHTML('afterBegin', `<p>Active Minutes:</p><p>You</p><p><span class="number">${activityInfo.userDataForToday(id, dateString, userStorage, 'minutesActive')}</span></p>`);
  avgMinutesToday.insertAdjacentHTML('afterBegin', `<p>Active Minutes:</p><p>All Users</p><p><span class="number">${activityInfo.getAllUserAverageForDay(dateString, userStorage, 'minutesActive')}</span></p>`);
  userStepsThisWeek.insertAdjacentHTML('afterBegin', makeStepsHTML(id, activityInfo, userStorage, activityInfo.userDataForWeek(id, dateString, userStorage, 'numSteps')));
  userStairsThisWeek.insertAdjacentHTML('afterBegin', makeStairsHTML(id, activityInfo, userStorage, activityInfo.userDataForWeek(id, dateString, userStorage, 'flightsOfStairs')));
  userMinutesThisWeek.insertAdjacentHTML('afterBegin', makeMinutesHTML(id, activityInfo, userStorage, activityInfo.userDataForWeek(id, dateString, userStorage, 'minutesActive')));
  bestUserSteps.insertAdjacentHTML('afterBegin', makeStepsHTML(user, activityInfo, userStorage, activityInfo.userDataForWeek(winnerId, dateString, userStorage, 'numSteps')));
}

function addDailyActivityInfo(id, activityInfo, dateString, userStorage) {
  userStairsToday.insertAdjacentHTML('afterBegin', `<p>Stair Count:</p><p>You</><p><span class="number">${activityInfo.userDataForToday(id, dateString, userStorage, 'flightsOfStairs')}</span></p>`);
  userStepsToday.insertAdjacentHTML('afterBegin', `<p>Step Count:</p><p>You</p><p><span class="number">${activityInfo.userDataForToday(id, dateString, userStorage, 'numSteps')}</span></p>`);
  userMinutesToday.insertAdjacentHTML('afterBegin', `<p>Active Minutes:</p><p>You</p><p><span class="number">${activityInfo.userDataForToday(id, dateString, userStorage, 'minutesActive')}</span></p>`);

}

function makeStepsHTML(id, activityInfo, userStorage, method) {
  return method.map((activityData) => `<li class="historical-list-listItem">On ${activityData} steps</li>`).join('');
}

function makeStairsHTML(id, activityInfo, userStorage, method) {
  return method.map((data) => `<li class="historical-list-listItem">On ${data} flights</li>`).join('');
}

function makeMinutesHTML(id, activityInfo, userStorage, method) {
  return method.map((data) => `<li class="historical-list-listItem">On ${data} minutes</li>`).join('');
}

function addFriendGameInfo(id, activityInfo, userStorage, dateString, laterDateString, user) {
  friendChallengeListToday.insertAdjacentHTML('afterBegin', makeFriendChallengeHTML(id, activityInfo, userStorage, activityInfo.showChallengeListAndWinner(user, dateString, userStorage)));
  streakList.insertAdjacentHTML('afterBegin', makeStepStreakHTML(id, activityInfo, userStorage, activityInfo.getStreak(userStorage, id, 'numSteps')));
  streakListMinutes.insertAdjacentHTML('afterBegin', makeStepStreakHTML(id, activityInfo, userStorage, activityInfo.getStreak(userStorage, id, 'minutesActive')));
  friendChallengeListHistory.insertAdjacentHTML('afterBegin', makeFriendChallengeHTML(id, activityInfo, userStorage, activityInfo.showChallengeListAndWinner(user, dateString, userStorage)));
  bigWinner.insertAdjacentHTML('afterBegin', `THIS WEEK'S WINNER! ${activityInfo.showcaseWinner(user, dateString, userStorage)} steps`);
}

function makeFriendChallengeHTML(id, activityInfo, userStorage, method) {
  return method.map((friendChallengeData) => `<li class="historical-list-listItem">Your friend ${friendChallengeData} average steps.</li>`).join('');
}

function makeStepStreakHTML(id, activityInfo, userStorage, method) {
  return method.map((streakData) => `<li class="historical-list-listItem">${streakData}!</li>`).join('');
}
