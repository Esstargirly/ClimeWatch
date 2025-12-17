import { apiKey } from "./config.js";

const apiUrl = `https://api.openweathermap.org/data/2.5/weather?&appid=${apiKey}&units=metric&q=`

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const icon = document.querySelector(".main-icon");

async function checkWeather(city) {
    if (!city) return;
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

    if (data.weather[0].main == "Clouds"){
        icon.src ="./Images/cloud.png";
    }
    else if (data.weather[0].main == "Clear"){
        icon.src = "./Images/sun.png";
    }
    else if (data.weather[0].main == "Rain"){
        icon.src = "./Images/rain.png";
    }
    else if (data.weather[0].main == "Drizzle"){
        icon.src = "./Images/drizzle.png";
    }
    else if (data.weather[0].main == "Mist"){
        icon.src = "./Images/mist.png";
    }
    else if (data.weather[0].main == "Snow"){
        icon.src = "./Images/snow.png";
    }
    else if (data.weather[0].main == "Fog"){
        icon.src = "./Images/fog.png";
    }
    else if (data.weather[0].main == "Smoke"){
        icon.src = "./Images/smoke.png";
    }

    document.querySelector(".weather").style.display = "block"
}
searchBtn.addEventListener("click", ()=>{
    checkWeather(searchBox.value);
})
checkWeather();