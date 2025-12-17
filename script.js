import { apiKey } from "./config.js";

const apiUrl = `https://api.openweathermap.org/data/2.5/weather?&appid=${apiKey}&units=metric&q=`

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const icon = document.querySelector(".main-icon");

async function checkWeather(city) {
    if (!city) return;
    try{
        const response = await fetch (apiUrl + city );

    if (response.status == 404){
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
    }

    let data = await response.json();

    console.log(data);

    const timeStamp = data.dt;
    const date = new Date(timeStamp * 1000);
    document.querySelector(".date").innerHTML = date.toDateString();

    document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C" ;
    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".desc").innerHTML = data.weather[0].description;
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind").innerHTML = data.wind.speed + "km/h";
    document.querySelector(".visibility").innerHTML = data.visibility + " km";

    const weatherMain = data.weather[0].main;
        const iconMap = {
            Clouds: "./Images/cloud.png",
            Clear: "./Images/sun.png",
            Rain: "./Images/rain.png",
            Drizzle: "./Images/drizzle.png",
            Mist: "./Images/mist.png",
            Snow: "./Images/snow.png",
            Fog: "./Images/fog.png",
            Smoke: "./Images/smoke.png"
        };
        icon.src = iconMap[weatherMain] || "./Images/sun2.png";

    document.querySelector(".weather").style.display = "block";
    document.querySelector(".error").style.display = "none";
    }
    catch (error) {
       document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
        console.error("Error fetching weather:", error); 
    }
}
searchBtn.addEventListener("click", ()=>{
    checkWeather(searchBox.value);
})
checkWeather();