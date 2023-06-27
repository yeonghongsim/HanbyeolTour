


const API_KEY = `302ae459053e8dc1f0e76fbc7efc7206`;


function onGeoOk(position) {
   const lat = position.coords.latitude;
   const lon = position.coords.longitude;
   const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&lang=kr&appid=${API_KEY}&units=metric`;
  // console.log(`You live in ${lat} and ${lon}`);
   
   const icon = document.querySelector('.weather-icon');
   const text = document.querySelector('.weather-text');
   const temp = document.querySelector('.weather-temp');
   const city = document.querySelector('.weather-city');

   fetch(url)
      .then(response => response.json())
      .then(data => {
	
	  const weather_icon_url = `<img src="https://openweathermap.org/img/wn/${data.weather[0].icon}.png" alt="${data.weather[0].description}">`;
     // console.log(`온도 : ${data.main.temp}, 날씨 : ${data.weather[0].main},도시 : ${data.sys.country} , ${data.name}, 아이콘 : ${data.weather[0].icon}`);
      icon.innerHTML = weather_icon_url;
      text.innerText = `${data.weather[0].main}`;
      temp.innerText = `${data.main.temp} °C`;
      city.innerText = `${data.name} , ${data.sys.country}`;
      document.querySelector('.weather-ment').innerText = `현재 날씨 :   `;
      
      })
}

function onGeoError() {
   alert("위치 정보 파악이 불가하여, 날씨 정보 제공이 어렵습니다");
}

navigator.geolocation.getCurrentPosition(onGeoOk, onGeoError);