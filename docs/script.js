
$(document).ready(function(){

    for(i=0;i<=5;i++){
        

        $("#forecast").append(  `
          <div id="${i}" class="col-md-2 border bg-info" >
                <p class="border-bottom text-center"> ${moment().add(i,'days').format('MMMM Do')}
              <p id="temp${i}">temp: </p>
              <p id="wind${i}">wind: </p>
              <p id="humidity${i}">humidity: </p>
              
      `
        )
      
      }
    
    var key= '6a79fe0c726e4ba94b45d81d838c1172';

var current='';

$("form").submit(function (event){
    event.preventDefault()
    var search = $("#search").val()
    weatherSearch(search)
})
function weatherSearch(search){

$.get('https://api.openweathermap.org/data/2.5/forecast?q='+search+'&units=imperial&appid='+ key,function(data){
    console.log(data);

    for(i=0;i<=5;i++){
        var wId = String('#wind'+i);
        var tId = String('#temp'+i);
        var hId = String('#humidity'+i);

        $(wId).html("wind: " + data.list[i].wind.speed+' MPH');
        $(tId).html("temp: " + data.list[i].main.temp+' F');
        $(hId).html("humidity: " + data.list[i].main.humidity + '%');
    
    }

    $("#previous").append(
        `<p>${search}</p>`
        )
});
            

}
})