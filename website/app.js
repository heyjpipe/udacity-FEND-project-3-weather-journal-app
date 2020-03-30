/* Global Variables */

const baseURL = 'https://api.openweathermap.org/data/2.5/weather?zip='
const apiKey = '&appid=ded2480664e28367b432793866b6b8c5';

// Create a new date instance dynamically with JS
function getDate() {
  let d = newDate();
  let newDate = d.getMonth()+1+'.'+ d.getDate()+'.'+ d.getFullYear();
  return newDate;
}

// Adds click event for #generate button
document.getElementById('generate').addEventListener('click', performAction);

// Gets zipcode and feelings from user input
function performAction(event){
    event.preventDefault();
    const newZip =  document.getElementById('zip').value;
    const content =  document.getElementById('content').value;

    // Gets zipcode from Open Weather Map
    getWeather(baseURL, zipCode, apiKey) 
      .then(function(userData){
          // Add data to POST request
          postData('/add', { date: newDate, temp: userData.main.temp, content })
      }).then(function (newData) {
      // call updateUI to update browser content
        updateUI()
      })
    // reset form
    form.reset();
}

/* Function to GET API Data*/
const getWeather = async (baseURL, newZip, apiKey) => {
const res = await fetch(baseURL + newZip + apiKey);
  try {
    // userData is result of fetch function
    const userData = await res.json();
    return userData;
  } catch (error) {
    console.log("error", error);
  }
}

/* Function to POST data */
const postData = async (url = '', data = {}) => {
  const req = await fetch(url, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json;charset=UTF-8"
    },
    body: JSON.stringify({
      date: data.date,
      temp: data.temp,
      content: data.content
    })
  })

  try {
    const newData = await req.json();
    return newData;
  }
  catch (error) {
    console.log(error);
  }
};


const updateUI = async () => {
  const request = await fetch('/all');
  try {
    const allData = await request.json()
    // show icons on the page
    icons.forEach(icon => icon.style.opacity = '1');
    // update new entry values
    document.getElementById('date').innerHTML = allData.date;
    document.getElementById('temp').innerHTML = allData.temp;
    document.getElementById('content').innerHTML = allData.content;
  }
  catch (error) {
    console.log("error", error);
  }
};