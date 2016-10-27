

setTimeout(function(){ buttonPressed("1 Year"); }, 150);


google.charts.load('current', {'packages':['corechart']});

      // Set a callback to run when the Google Visualization API is loaded.

//Setting up date for later
    var d = new Date()
    var year = d.getFullYear()
    var month = d.getMonth()+1
    var day = d.getDate()

    function addzeros(number){
      var maybebetternumber = number
      if (number < 10){
        maybebetternumber = "0" + number;  }
      return maybebetternumber
    }
    console.log(addzeros(day))

var startDate
var endDate
// var startDate = parseFloat(prompt("What date would you like the data to start? (Please put your answer in the form yyyy-mm-dd"))
// var endDate = parseFloat(prompt("What date would you like the data to start? (Please put your answer in the form yyyy-mm-dd"))

function getDates(){
  console.log("Getting dates");
  startDate = document.getElementById("startDate").value;
  endDate = document.getElementById("endDate").value;
  var sA = startDate.split("-")
  var eA = endDate.split("-")
  if ((isNaN(parseFloat(sA[0])))||(isNaN(parseFloat(eA[0])))||(isNaN(parseFloat(sA[1])))||(isNaN(parseFloat(eA[1])))
    ||(isNaN(parseFloat(eA[2])))||(isNaN(parseFloat(sA[1])))||(parseFloat(eA[1])>12)|| (parseFloat(sA[1])>12) || 
    (parseFloat(eA[1])>12) || (parseFloat(eA[2])>31) || (parseFloat(sA[2])>31)||(((parseFloat(eA[0]))-(parseFloat(sA[0])))>1)||
    (((parseFloat(eA[0]))-(parseFloat(sA[0])))<0) ){
       $('#myModal').modal('show');
  }
  console.log(startDate);
  console.log(endDate);
  drawChart();
}


function buttonPressed(buttonTitle){
  console.log("i'm working")
  if (buttonTitle==="1 Year"){
    console.log("same")
    startDate = (year-1) + "-" + addzeros(month) + "-" + addzeros(day)
    endDate = year + "-" + addzeros(month) + "-" + addzeros(day)
    console.log(startDate)
    console.log(endDate)
  }
  else if (buttonTitle==="6 Months"){
    startDate = year + "-" + addzeros(month-6) + "-" + addzeros(day)
    endDate = year + "-" + addzeros(month) + "-" + addzeros(day)
  }
  else if (buttonTitle==="1 Month"){
    startDate = year + "-" + addzeros(month-1) + "-" + addzeros(day)
    endDate = year + "-" + addzeros(month) + "-" + addzeros(day)
  }
  
  // alert(startDate + " " + endDate)
  drawChart();

}

// buttonPressed("1 Year")
//test start and end dates:
// var startDate = "2009-09-11";
// var endDate = "2010-08-11";





function drawChart(){


var urlBase = "https://query.yahooapis.com/v1/public/yql?q="
var urlMiddle = "select%20*%20from%20yahoo.finance.historicaldata%20where%20symbol%20%3D%20%22BKS%22%20and%20startDate%20%3D%20%22" + startDate+ "%22%20and%20endDate%20%3D%20%22" + endDate + "%22"
var urlEnd = "&format=json&diagnostics=true&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&callback="

var totalUrl = urlBase + urlMiddle + urlEnd;
console.log(totalUrl)





$.ajax({
  url: totalUrl,
  type: 'GET',
  success: function(result){
    console.log(result)
  var stockArray = result.query.results.quote;
  var dataArray  = [['Date', "Stock Price"]];
  for (var i =(stockArray.length-1); i>0; i--){
      var currentObject = stockArray[i];
      // console.log(currentObject.Close);
      var pushedArray = [currentObject.Date, parseFloat(currentObject.Close)];
      dataArray[(stockArray.length)-i] = pushedArray;
    }
    console.log(dataArray)
    var chartData = google.visualization.arrayToDataTable(dataArray)
    var chart = new google.visualization.LineChart(document.getElementById('chart_div'))
    chart.draw(chartData, options);
  }
})
}




var options = {
          legend: { position: 'bottom' },
          colors: ['#112512'],
          fontName:'Cambria',
          backgroundColor:{
            fill: 'transparent'},
          boxStyle: {
                // Color of the box outline.
                stroke: '#112512'},
    }

$(window).resize(function(){
   drawChart();
 })


