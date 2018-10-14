const body = document.querySelector('body');
const status = document.getElementById('status');
const latitude = document.getElementById('latitude');
const longitude = document.getElementById('longitude');
const track = document.getElementById('track');

// Latitude: max/min +90 to -90
const LATITUDE_RANGE = 90;
// Longitude: max/min +180 to -180
const LONGITUDE_RANGE = 180;

// 8 decimal places means 1.11 mm precision
const GPS_PRECISION = 8;

const http = {
  get(url) {
    return new Promise((resolve, reject) => {
      const request = new XMLHttpRequest();

      request.open('GET', url, true);

      request.onreadystatechange = () => {
        if (request.readyState === 4) {
          if (request.status === 200) {
            resolve(request.responseText);
          } else {
            reject(request.statusText);
          }
        }
      };

      request.send();
    });
  }
};

const inRange = (value, range) => value <= range && value >= -range;

const isValidLatitudeLongitude = (latitude, longitude) =>
    typeof latitude === 'number' &&
    typeof longitude === 'number' &&
    inRange(latitude, LATITUDE_RANGE) &&
    inRange(longitude, LONGITUDE_RANGE);

const getLatitude = () => +parseFloat(latitude.value).toFixed(GPS_PRECISION);
const getLongitude = () => +parseFloat(longitude.value).toFixed(GPS_PRECISION);

const sendRequest = () => {
  if (isValidLatitudeLongitude(getLatitude(), getLongitude())) {
    status.textContent = 'Loading...';
    body.className = 'pending';

    waterOrLand(getLatitude(), getLongitude());

    latitude.value = longitude.value = '';
    latitude.focus();
    track.disabled = true;
  } else {
    status.textContent = 'Wrong latitude/longitude';
  }
};

const waterOrLand = (latitude, longitude) => {
  if (!isValidLatitudeLongitude(getLatitude(), getLongitude())) {
    throw new Error('}{α©keЯ, go home, you are drunk!');
  }

  // https://api.onwater.io doesn't work correctly with SOME values like 0,0
  // but work fine with floats like 0.0,0.0 - so let's convert input values to floats
  const lat = parseFloat(latitude).toFixed(GPS_PRECISION);
  const lon = parseFloat(longitude).toFixed(GPS_PRECISION);

  http.get(`https://api.onwater.io/api/v1/results/${lat},${lon}`).
      then(response => JSON.parse(response)).
      then(data => {
        if (data && 'water' in data) {
          const result = data.water ? 'water' : 'land';

          // ok, we've got the desired result from the server, we doesn't have to
          // show 8 decimal zeros to user, so let's cut them off with the unary '+' operator
          status.textContent = `'${+latitude}:${+longitude}' is on ${result}`;
          body.className = result;
        } else {
          throw new Error('Wrong response from the server');
        }
      }).
      catch(error => {
        console.error(error);
        status.textContent = 'Server error';
        body.className = 'error';
      });
};

latitude.onchange = longitude.onchange = latitude.onkeyup = longitude.onkeyup = event => {
  if (isValidLatitudeLongitude(getLatitude(), getLongitude())) {
    track.disabled = false;

    if (event.code === 'Enter') {
      sendRequest();
    }

  } else {
    track.disabled = true;
  }
};

track.onclick = () => {
  sendRequest();
};
