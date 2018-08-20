var source = $('#weather-template').html();
var template = Handlebars.compile(source);

import { WeatherBox} from './main.js';
// import { Comment} from './secondary.js';

const weathers = [];

var fetch = function () {
    $('.weather-container').html('Loading, count to 5...');
    let urlBack = createUrl();
    $.get({
        url: urlBack,
        success: function (data) {
            let newData = data;
            newWeather(newData);		
        },
        error: function () {
            console.log("error");
            $('.weather-container').html('It seems that something is not working...Try refreshing the page');
        }
    });    
};


  var createUrl = function() {
    var cityName = $('#search').val();
    console.log(cityName);
    var baseUrl = 'http://api.apixu.com/v1/current.json?key=9e30a8992e0d45fb864153729181908&q=';
    var newUrl = baseUrl + cityName;
    return newUrl;
};

  
var newWeather = function(info) {
    var weather = new WeatherBox(info.location.name, info.current.temp_c, info.current.temp_f, info.current.last_updated);
    weathers.push(weather);
};

var renderWeather = function () {
    $('.weather-container').empty();

    var newHTML = template({weathers});
    $('.weather-container').append(newHTML);
};

var createComment = function (commentTxt) {
    var newComment = new Comment(commentTxt);
    return newComment;
};

var addCommentToWeather = function(weatherID, commentOBj) {
    let currentWeather = _findWeatherById(weatherID);
    currentWeather.getComment(commentOBj);
};
    
var _findWeatherById = function (id) {
    for (var i = 0; i < weathers.length; i += 1) {
      if (weathers[i].id === id) {
        return weathers[i];
      }
    }
};    


$('.get-temp').on('click', function (ev) {
    ev.preventDefault();
    fetch();
    renderWeather();
    
});

$('.weather-container').on('click', '.add-comment', function (ev) {
    ev.preventDefault();
    var $commentText = $(this).prev('#comment-input').val();
    var $clickedWeather = $commentText.closest('.single-weather');
    var weatherId = $clickedWeather.find('h5').data("id");
    addCommentToWeather(weatherId, createComment($commentText));
    renderWeather();
});
