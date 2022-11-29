var key= '6a79fe0c726e4ba94b45d81d838c1172';
let history =[];
//renders 5 day forecast
function renderForecastTemplate(){

    for(i=0;i<=5;i++){
        if (i===0){
          $("#today").append(  
            `
                <div id="${i}" class=" border p-2 border-dark" >
                <div class=" border-bottom fw-bold justify-content-around">
                <h3 id="city" class="col-md-2"> city </h3>
                <p class="col-md-2"> Today </p>
                </div>
                <p id="temp${i}">temp: </p>
                <p id="wind${i}">wind: </p>
                <p id="humidity${i}">humidity: </p>      
            `
        )}else{

        $("#forecast").append(  
          `
              <div id="${i}" class="border text-light border-dark bg-secondary" style="width:17.4%">
              <p class="border-bottom fw-bold text-center"> ${moment().add(i,'days').format('MMMM Do')}
              <p id="temp${i}">temp: </p>
              <p id="wind${i}">wind: </p>
              <p id="humidity${i}">humidity: </p>      
          `
        )
        }
      }

// var current='';
}


function updateForecast(data){
  $("#city").html(data.city.name);

  for(i=0;i<=5;i++){
    var wId = String('#wind'+i);
    var tId = String('#temp'+i);
    var hId = String('#humidity'+i);

    $(wId).html("wind: " + data.list[i].wind.speed+' MPH');
    $(tId).html("temp: " + data.list[i].main.temp+' F');
    $(hId).html("humidity: " + data.list[i].main.humidity + '%');

};

};
function renderHistory(){
  $("#previous").html("");
  if(localStorage.getItem('history')){
    history = JSON.parse(localStorage.getItem('history'));
  };

  for (var i =0; i< history.length; i++){
 

    var btn = document.createElement('div');
    btn.setAttribute('type', 'button');
    btn.classList.add('btnn', 'border', 'm-1', 'bg-secondary', 'p-2', 'text-light', "border-dark");

    // `data-search` allows access to city name when click handler is invoked
    btn.setAttribute('data-search', history[i]);
    btn.textContent = history[i];

    $("#previous").append(btn);
    
  }

  const buttons = document.querySelectorAll('.btnn');

  buttons.forEach(box => {box.addEventListener('click', handleHistoryClick)})
}

function searchHistory(search){

  history.push(search);

  localStorage.setItem('history', JSON.stringify(history))

  renderHistory();
  
  }

//api call
function weatherSearch(search){

  $.get('https://api.openweathermap.org/data/2.5/forecast?q='+search+'&units=imperial&appid='+ key,function(data){
      console.log(data);
      updateForecast(data);

      
    });
};

  //event listener to call search and history update on search for submit
  $("form").submit(function (event){
    
    event.preventDefault()
    var search = $("#search").val()
    if(search){
    //calls to render forecast and update history
    weatherSearch(search);
    console.log('wsearch');
    searchHistory(search);
    }
})


$(document).ready(function(){
  renderHistory();
  renderForecastTemplate();
});



function handleHistoryClick(button) {
 
  var btn = button.target;
  var search = btn.getAttribute('data-search');
  weatherSearch(search);
}

