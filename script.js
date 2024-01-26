// Set the date we're counting down to
var countDownDate = new Date("Feb 16, 2024 08:00:00").getTime();

// Update the countdown every 1 second
var x = setInterval(function() {
  // Get the current date and time
  var now = new Date().getTime();

  // Find the distance between now and the countdown date
  var distance = countDownDate - now;

  // Calculate days, hours, minutes, and seconds
  var days = Math.floor(distance / (1000 * 60 * 60 * 24));
  var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);

  // Get the width of the screen
  var screenWidth = window.screen.width;

  console.log("Screen width: " + screenWidth);

  // Display the countdown
  if (screenWidth <= 760){

    document.getElementById("countdownText").innerHTML = days + " วัน " + "<br>" + hours + " ชั่วโมง " + "<br>"
  + minutes + " นาที " + "<br>" + seconds + " วินาที ";

  }
  else{

    document.getElementById("countdownText").innerHTML = days + " วัน " + hours + " ชั่วโมง " +
    minutes + " นาที " +  seconds + " วินาที ";

  }

  // If the countdown is over, display a message
  if (distance < 0) {
    clearInterval(x);
    document.getElementById("countdownText").innerHTML = "ได้เวลาแล้ววววววววววว";
    document.getElementById("timer").innerHTML = "";
  }
}, 1000);


// อนิเมชั่นเลื่อน //
gsap.registerPlugin(ScrollTrigger);
// REVEAL //
gsap.utils.toArray(".revealUp").forEach(function (elem) {
  ScrollTrigger.create({
    trigger: elem,
    start: "top 80%",
    end: "bottom 20%",
    markers: false,
    onEnter: function () {
      gsap.fromTo(
        elem,
        { y: 100, autoAlpha: 0 },
        {
          duration: 1.25,
          y: 0,
          autoAlpha: 1,
          ease: "back",
          overwrite: "auto"
        }
      );
    },
    onLeave: function () {
      gsap.fromTo(elem, { autoAlpha: 1 }, { autoAlpha: 0, overwrite: "auto" });
    },
    onEnterBack: function () {
      gsap.fromTo(
        elem,
        { y: -100, autoAlpha: 0 },
        {
          duration: 1.25,
          y: 0,
          autoAlpha: 1,
          ease: "back",
          overwrite: "auto"
        }
      );
    },
    onLeaveBack: function () {
      gsap.fromTo(elem, { autoAlpha: 1 }, { autoAlpha: 0, overwrite: "auto" });
    }
  });
});

// Client ID and API key from the Developer Console
const CLIENT_ID = 'YOUR_CLIENT_ID';
const API_KEY = 'YOUR_API_KEY';

// Array of API discovery doc URLs for APIs used by the quickstart
const DISCOVERY_DOCS = ["https://sheets.googleapis.com/$discovery/rest?version=v4"];

// Authorization scopes required by the API
const SCOPES = "https://www.googleapis.com/auth/spreadsheets.readonly";

// Load the Google Sheets API client library
function initClient() {
    gapi.client.init({
        apiKey: API_KEY,
        clientId: CLIENT_ID,
        discoveryDocs: DISCOVERY_DOCS,
        scope: SCOPES
    }).then(function () {
        // Google Sheets API is initialized, load spreadsheet data
        fetchSheetData();
    }, function(error) {
        console.error('Error initializing Google Sheets API:', error);
    });
}

// Fetch data from the Google Spreadsheet
function fetchSheetData() {
    gapi.client.sheets.spreadsheets.values.get({
        spreadsheetId: 'YOUR_SPREADSHEET_ID',
        range: 'Sheet1!A1:B10' // Specify the range you want to retrieve
    }).then(function(response) {
        const values = response.result.values;
        if (values.length > 0) {
            const sheetDataElement = document.getElementById('sheetData');
            values.forEach(function(row) {
                const listItem = document.createElement('li');
                listItem.textContent = row.join(' - '); // Join values with a separator
                sheetDataElement.appendChild(listItem);
            });
        } else {
            console.log('No data found.');
        }
    }, function(error) {
        console.error('Error fetching data from Google Sheets:', error);
    });
}

// Initialize the Google Sheets API client
function handleClientLoad() {
    gapi.load('client', initClient);
}

// https://codepen.io/Moslim/embed/zwJPgL?height=316&theme-id=0&default-tab=result //

// https://codepen.io/alvarotrigo/pen/KKvOGNb //