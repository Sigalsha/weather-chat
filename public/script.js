var source = $('#weather-template').html();
var template = Handlebars.compile(source);

import { WeatherBox} from './main.js';
import { Comment} from './secondary.js';

const weathers = [];

var fetch = function () {
    $('.weather-container').html('Loading, count to 5...');
    let urlBack = createUrl();
    $.get({
        url: urlBack,
        success: function (data) {
            let newData = data;
            newWeather(newData);
            renderWeather();		
        },
        error: function () {
            console.log("error");
            $('.weather-container').html('It seems that something is not working...Try refreshing the page');
        }
    });    
};


  var createUrl = function() {
    var cityName = $('#search').val();
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

var createComment = function (commentTxt, weatherID) {
    var comment = new Comment(commentTxt);
    let currentWeather = _findWeatherById(weatherID);
    currentWeather.getComment(comment);
};
    
var _findWeatherById = function (id) {
    for (var i = 0; i < weathers.length; i += 1) {
      if (weathers[i].id === id) {
        return weathers[i];
      }
    }
};    

var removeCityWeather = function(weatherID) {
    let weather =  _findWeatherById(weatherID);
    weathers.splice(weathers.indexOf(weather), 1);
};

//--------------EVENTS-------------------------//

$('.get-temp').on('click', function (ev) {
    ev.preventDefault();
    fetch();    
});

$('.weather-container').on('click', '.add-comment', function () {
    var $weatherItem = $(this).parents('.weather-item');
    var commentText = $weatherItem.find('#comment-input').val();
    var weatherId = $weatherItem.data("id");
    createComment(commentText, weatherId);
    renderWeather();
});

$('.weather-container').on('click', '.remove', function () {
    var $weatherItem = $(this).parents('.weather-item');
    var weatherId = $weatherItem.data("id");
    removeCityWeather(weatherId);
    renderWeather();
  });