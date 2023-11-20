function backBtnFunc(){
    result.style.visibility="hidden";
    location.reload();
    // myform.reset();
}
function goBackFunc(){
    failedCard.style.visibility="hidden";
    location.reload();
    // myform.reset();
}

function searchFunc(){
    if(searchValue.value==""){
        alert("Please enter a city!")
    } else{
    var city=searchValue.value;
    console.log(city);
    var request= new XMLHttpRequest();
    request.open('get',`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=68b0b5f0db57621f8d1e51cddcf907aa&units=metric`);
    console.log(request);
    request.send();
    request.onreadystatechange=()=>{
        if (request.readyState==4) {
            if (request.status>199 && request.status<300) { 
                let weatherData=JSON.parse(request.responseText);
                dispWeather(weatherData);
            } else{
                failedData=`<div class="d-flex flex-column py-2 rounded text-center bg-light" style="width: 18rem; height: 22rem;" id="failedCard">
                <button onclick="goBackFunc()">GO BACK TO HOME</button>
              </div>`;
                  result.innerHTML=failedData;
            }
        }
    }

    function dispWeather(weatherData){
        htmlData=`<div class="d-flex flex-column py-2 rounded" style="width: 18rem; height: 22rem;" id="resultCard">
        <img src="https://images.unsplash.com/photo-1516912481808-3406841bd33c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8d2VhdGhlcnxlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80" class="card-img-top" alt="...">
        <button class="btn" onclick="backBtnFunc()"><i class="fa-solid fa-circle-left"></i></button>
        <h1>${weatherData.main.temp}°C</h1>
        <div class="mt-2">
            <p><span style="float: left;">Country</span><span style="float: right;"><i class="fa-regular fa-sun me-1"></i>${weatherData.sys.country}</span></p><br>
            <p><span style="float: left;">Humidity</span><span style="float: right;"><i class="fa-regular fa-moon me-1"></i>${weatherData.main.humidity}</span></p><br>
            <p><span style="float: left;">Pressure</span><span style="float: right;"><i class="fa-solid fa-cloud me-1"></i>${weatherData.main.pressure}</span></p><br>
            <p><span style="float: left;">Feels like</span><span style="float: right;"><i class="fa-solid fa-earth-africa me-1"></i>${weatherData.main.feels_like}</span></p>
        </div>
      </div>`;

      result.innerHTML=htmlData;
        }
    // }
    }
}