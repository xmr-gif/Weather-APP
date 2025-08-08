function formatDate(input) {
    const [year, month, day] = input.split('-');
    const date = new Date(year, month - 1, day);
    const weekday = date.toLocaleDateString('en-US', { weekday: 'short' });
    return `${weekday} ${date.getDate()}`;
  }

console.log(formatDate('2025-02-24')); // Output: "Mon 24"
navigator.geolocation.getCurrentPosition(getPosition) ;

function getPosition(position){
    var userLatitude = position.coords.latitude ;
    var userLongitude = position.coords.longitude ;
    console.log(userLatitude) ;
    console.log(userLongitude) ;
    //fetchWeatherApi(userLatitude,userLongitude) ;
    fetchOpenMeteoApi(userLatitude,userLongitude);
    fetchAdhanApi(userLatitude,userLongitude) ;
}

function fetchOpenMeteoApi(latitude,longitude) {
    const xhr = new XMLHttpRequest() ;
    xhr.open('GET',`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m&hourly=temperature_2m&daily=temperature_2m_max,temperature_2m_min&temperature_unit=fahrenheit&timezone=auto`) ;
    xhr.onload = function() {
        alert("hello")
        console.log(xhr.response);
        alert("hello") ;
        var data = JSON.parse(xhr.response) ;
        console.log(data) ;
}
    xhr.onerror = function(){
        console.log("error") ;

    }
    xhr.send() ;
}

// function fetchWeatherApi(latitude,longitude){

//     const xhr = new XMLHttpRequest() ;

//     xhr.open('GET',`http://api.weatherapi.com/v1/current.json?key=api_key&q=${latitude},${longitude}&days=5&hour=17&days=3`);

//     xhr.onload = function() {
//         console.log(xhr.response);
//         // alert("hello") ;
//         var data = JSON.parse(xhr.response) ;
//         document.getElementById('todayTemperature').innerHTML = Math.round(data.current.temp_c) + "°" ;
//         document.getElementById('cityName').innerHTML = data.location.name ;
//         document.querySelector(".feelsLike").innerHTML = " Feels Like " + data.current.feelslike_c + "°"  ;
//         var dateAndTimeArray = data.location.localtime.split(' ');
//         console.log(dateAndTimeArray);
//         document.querySelector(".todayDate").innerHTML = formatDate(dateAndTimeArray[0]) + ", " + dateAndTimeArray[1]  ;
//         document.querySelector(".todayHumidity").innerHTML = data.current.humidity ;
//         console.log(data) ;

//     };

//     xhr.onerror = function() {

//         console.log("la requete a échoué");
//     }

//     xhr.onloadend = function () {
//         document.querySelector(".loading").style.display = "none" ;
//         document.querySelector(".pageContent").style.display = "block"

//     }

//     xhr.send() ;
// }
