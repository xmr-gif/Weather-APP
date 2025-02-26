function formatDate(input) {
    const [year, month, day] = input.split('-');
    const date = new Date(year, month - 1, day);
    const weekday = date.toLocaleDateString('en-US', { weekday: 'short' });
    return `${weekday} ${date.getDate()}`;
  }

  function changeStyle(){
    const d = new Date();
    let hour = d.getHours();
    if(hour < 7 || hour > 18){
        document.querySelector(".pageContent").style.backgroundColor="#152238" ;
        document.querySelector(".second-part").style.backgroundColor="#192841" ;
        document.querySelector(".third-part").style.backgroundColor="#192841" ;
        document.querySelector(".fourth-part").style.backgroundColor="#192841" ;


    }

    console.log(hour) ;
  }
  changeStyle() ;


navigator.geolocation.getCurrentPosition(getPosition) ;

function getPosition(position){
    var userLatitude = position.coords.latitude ;
    var userLongitude = position.coords.longitude ;
    fetchWeatherApi(userLatitude,userLongitude) ;
    fetchAdhanApi(userLatitude,userLongitude) ;
}

function getDayName(dateString) {
    const date = new Date(dateString);


    const dayName = new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(date);

    return dayName;

}



 function fetchWeatherApi(latitude,longitude){

     const xhr = new XMLHttpRequest() ;

     xhr.open('GET',`http://api.weatherapi.com/v1/forecast.json?key=586d1ffa09ce4288863171059252402&q=${latitude},${longitude}&days=7&hourly=1&daily=1&elements=humidity`);

     xhr.onload = function() {
         console.log(xhr.response);
         var data = JSON.parse(xhr.response) ;
         document.getElementById('todayTemperature').innerHTML = Math.round(data.current.temp_c) + "°" ;
         document.getElementById('cityName').innerHTML = data.location.name ;
         document.querySelector(".feelsLike").innerHTML = Math.round(data.forecast.forecastday[0].day.maxtemp_c) + "° / " + Math.round(data.forecast.forecastday[0].day.mintemp_c) + "°" +" Feels Like " + Math.round(data.current.feelslike_c) + "°"  ;
         var dateAndTimeArray = data.location.localtime.split(' ');
         document.querySelector(".todayDate").innerHTML = formatDate(dateAndTimeArray[0]) + ", " + dateAndTimeArray[1]  ;
         document.querySelector(".todayHumidity").innerHTML = data.current.humidity ;
         for(let i = 0 ; i <=23 ; i++){
            var tab = data.forecast.forecastday[0].hour[i].time.split(' ');
            document.getElementsByClassName("hours")[i].innerHTML = tab[1] ;
            document.getElementsByClassName("hourlyTemp")[i].innerHTML = data.forecast.forecastday[0].hour[i].temp_c + "°" ;
            document.getElementsByClassName("hourlyHumidity")[i].innerHTML = data.forecast.forecastday[0].hour[i].humidity + "%" ;

            var weatherConditionText = data.forecast.forecastday[0].hour[i].condition.text.trim() ;
            var dateAndTimeArray = data.location.localtime.split(' ');
            var parsedHour = dateAndTimeArray[1];



                document.getElementsByClassName("hourlyIcon")[i].src = `../Icons/${weatherConditionText}.svg`
                console.log(data.forecast.forecastday[0].hour[i].condition) ;





         }

        var MidDayConditionText = data.forecast.forecastday[0].hour[12].condition.text.trim() ;
        document.getElementsByClassName("DailyMidDayCondition")[0].src = `../Icons/${MidDayConditionText}.svg`
        document.getElementsByClassName("DailyMidDayCondition")[0].alt = MidDayConditionText ;

        var todayMidNightConditionText = data.forecast.forecastday[0].hour[0].condition.text.trim() ;
        document.getElementsByClassName("DailyMidNightCondition")[0].src = `../Icons/${todayMidNightConditionText}.svg`
        document.getElementsByClassName("DailyMidNightCondition")[0].alt = todayMidNightConditionText ;


        // loop for days
         for(let i = 1 ; i <=6 ; i++){
            document.getElementsByClassName("forecastMaxTemp")[i].innerHTML = Math.round(data.forecast.forecastday[i].day.maxtemp_c) + "°";
            document.getElementsByClassName("forecastMinTemp")[i].innerHTML = Math.round(data.forecast.forecastday[i].day.mintemp_c) + "°";
            document.getElementsByClassName("forecastHumidity")[i].innerHTML = data.forecast.forecastday[i].day.avghumidity ;
            document.getElementsByClassName("dayName")[i].innerHTML = getDayName(data.forecast.forecastday[i].date) ;

            var MidNightConditionText = data.forecast.forecastday[i].hour[0].condition.text.trim() ;
            document.getElementsByClassName("DailyMidNightCondition")[i].src = `../Icons/${MidNightConditionText}.svg`
            var MidDayConditionText = data.forecast.forecastday[i].hour[12].condition.text.trim() ;
            document.getElementsByClassName("DailyMidDayCondition")[i].src = `../Icons/${MidDayConditionText}.svg`
            document.getElementsByClassName("DailyMidDayCondition")[i].alt = MidDayConditionText ;

            console.log(data) ;


         }


     };
     xhr.onerror = function() {

         console.log("la requete a échoué");
     }

     xhr.onloadend = function () {
         document.querySelector(".loading").style.display = "none" ;
         document.querySelector(".pageContent").style.display = "block"

     }

     xhr.send() ;
 }



function fetchAdhanApi(latitude,longitude) {
    const xhr = new XMLHttpRequest() ;

    xhr.open('GET',`https://api.aladhan.com/v1/timings/25-02-2025?latitude=${latitude}&longitude=${longitude}&method=3&shafaq=general&tune=5%2C3%2C5%2C7%2C9%2C-1%2C0%2C8%2C-6&timezonestring=UTC&calendarMethod=UAQ`);

    xhr.onload = function(){
        var timeData = JSON.parse(xhr.response) ;

        // alert("hello") ;
        document.querySelector(".sunriseTime").innerHTML = timeData.data.timings.Sunrise ;
        document.querySelector(".sunsetTime").innerHTML = timeData.data.timings.Sunset ;
    }

    xhr.onerror = function(){
        console.log("la requete a échoué");
    }
    xhr.onloadend = function () {
        document.querySelector(".loading").style.display = "none" ;
        document.querySelector(".pageContent").style.display = "block"

    }

    xhr.send() ;



}

// adhan api
