
// let userData;
// let fetchData = {
//   fetchUserData: () => {
//     // let userDataReturn;
//     return fetch('https://fe-apps.herokuapp.com/api/v1/fitlit/1908/users/userData')
//       .then(response => response.json())
//       .then(data => userData = data.userData)
//       .catch(error => console.log(error))
//     //   console.log(userDataReturn)
//     // return userDataReturn;
//   },

  // Promise.all([userData]) //, hydraData, sleepData, actData])
  //   .then(value => {
  //     userData = value[0]
  //     // hydraData = value[1];
  //     // sleepData = value[2];
  //     // actData = value[3];             
  //     startApp();
  //   })
// }
let requests = {
  fetchUserData() {
    return fetch('https://fe-apps.herokuapp.com/api/v1/fitlit/1908/users/userData')
      .then(response => response.json())
      .then(data => data.userData)
      .catch(error => console.log(error))
  }

}

export default requests;
