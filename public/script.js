var source = $('#weather-template').html();
var template = Handlebars.compile(source);
var weather;


var fetch = function () {
    $('.weather-container').html('Loading, count to 5...');
    $.get({
        url: createUrl(),
        success: function (data) {
            console.log("In success");
            renderWeather(newWeather(data));		
        },
        // error: function (jqXHR, textStatus, errorThrown) {
        //     console.log("ERROR");
        //     console.log(textStatus);
        //     $('.weather-container').html('It seems that something is not working...Try refreshing the page');
        // }
    });    


    // $.ajax({
    //   method: "GET",
    //   url: createUrl(),
    //   success: function (data) {
    //     console.log("In success");
    //     renderWeather(newWeather(data));
    //   },
    //   error: function (jqXHR, textStatus, errorThrown) {
    //     console.log("ERROR");
    //     console.log(textStatus);
    //     $('.weather-container').html('It seems that something is not working...Try refreshing the page');
    //   }
    // });
  };

  var createUrl = function() {
    var cityName = $('#search').val();
    var baseUrl = 'http://api.apixu.com/v1/current.json?key=9e30a8992e0d45fb864153729181908&q=';
    var newUrl = baseUrl + cityName;
    return newUrl;
};

  
var newWeather = function(info) {
    weather = new WeatherBox(info.location.name, info.current.temp_c, info.current.temp_f, info.current.last_updated);
    return weather;
};

var renderWeather = function (newCityWeather) {
    $('.weather-container').empty();

    var newHTML = template(newCityWeather);
    $('.weather-container').append(newHTML);
};

var createComment = function (commentTxt) {
    var newComment = new Comment(commentTxt);
    if (newComment.text === "") {
        return;
    }
    return newComment;
};

// var addCommentToWeather = function(weatherID, commentOBj) {
//     let currentWeather = _findWeatherById(weatherID);
//     currentWeather.getComment(commentOBj);
// };
    
// var _findWeatherById = function (id) {
//     for (var i = 0; i < weathers.length; i += 1) {
//       if (weathers[i].id === id) {
//         return weathers[i];
//       }
//     }
// };    


$('.get-temp').on('click', function () {
    fetch();
    return false;
});

// $('.weather-container').on('click', '.add-comment', function () {
//     var $commentText = $(this).prev('#comment-input').val();
//     var $clickedWeather = $commentText.closest('.single-weather');
//     var weatherId = $clickedWeather.find('h5').data("id");
//     addCommentToWeather(weatherId, createComment($commentText));
//     renderWeather(weathers);
// });





// var tempToC = function(tempFromData) {
//      let temp = tempFromData - 273.16;
//      return temp;
// };

// var tempToF = function(tempFromData) {
//     let temp = tempFromData * 1.8 - 459.67; 
//     return temp;
// };

// var getFullTime = function() {
//     var t = new Date();
//     return d.getHours() + ":" + d.getMinutes();
// };

// var getFullDate = function() {
//     var d = new Date();
//     return d.getDate() + "/" + d.getMonth() + "/" + d.getFullYear();
// }


//   var renderItems = function (data) {
//     let loopCount;
//     if (data.items.length <= 10) {
//       loopCount = data.items.length;
//     } else {
//       loopCount = 10;
//     }
  
//     for (i = 0; i < loopCount; i++) {
//         newBook(infoObj(data.items[i].volumeInfo));
//     } 
//   };
  

  
