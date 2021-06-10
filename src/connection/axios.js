const axios = require('axios');


  axios.post('localhost:3000/users', {
    fname: 'Finn',
    lame: 'Williams',
    email: 'finnwilliams@yahoo.com',
    password: 'sdf2231223jf',
    birthdate: '20',
    gender: 'male',
  }).then((response) => {
    console.log(response);
  }, (error) => {
    console.log(error);
  })