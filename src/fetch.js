let requests = {
  fetchUserData() {
    return fetch('https://fe-apps.herokuapp.com/api/v1/fitlit/1908/users/userData')
      .then(response => response.json())
      .then(data => data.userData)
      .catch(error => console.log(error))
  },

  fetchActivityData() {
    return fetch('https://fe-apps.herokuapp.com/api/v1/fitlit/1908/activity/activityData')
      .then(response => response.json())
      .then(data => data.activityData)
      .catch(error => console.log(error))
  },

  fetchHydrationData() {
    return fetch('https://fe-apps.herokuapp.com/api/v1/fitlit/1908/hydration/hydrationData')
      .then(response => response.json())
      .then(data => data.hydrationData)
      .catch(error => console.log(error))
  }, 

  fetchSleepData() {
    return fetch('https://fe-apps.herokuapp.com/api/v1/fitlit/1908/sleep/sleepData')
      .then(response => response.json())
      .then(data => data.sleepData)
      .catch(error => console.log(error))
  },
  
  postActivityData(inputId, inputDate, inputSteps, inputMinutesActive, inputStairs) {
    return fetch('https://fe-apps.herokuapp.com/api/v1/fitlit/1908/activity/activityData', {
      method: 'POST',
      headers: {
       'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "userID": inputId,
        "date": inputDate,
        "numSteps": inputSteps, 
        "minutesActive": inputMinutesActive,
        "flightsOfStairs": inputStairs
     })
   })
   .then(response => response.json())
   .then(data => console.log(data))
   .catch(error => console.log(error))
   },
 
 postSleepData(inputId, inputDate, inputHoursSlept, inputSleepQuality) {
   return fetch('	https://fe-apps.herokuapp.com/api/v1/fitlit/1908/sleep/sleepData', {
     method: 'POST',
     headers: {
      'Content-Type': 'application/json'
     },
     body: JSON.stringify({
       "userID": inputId,
       "date": inputDate,
       "hoursSlept": inputHoursSlept,
       "sleepQuality": inputSleepQuality
     })
    })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.log(error))
  },

  postHydrationData(inputId, inputDate, inputNumOunces) {
    return fetch('https://fe-apps.herokuapp.com/api/v1/fitlit/1908/hydration/hydrationData', {
      method: 'POST',
      headers: {
       'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "userID": inputId,
        "date": inputDate,
        "numOunces": inputNumOunces
      })
    })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.log(error))
  }
}

export default requests;
