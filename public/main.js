class WeatherBox {
    constructor(cityName, tempC, tempF, date){
        this.cityName = cityName;
        this.tempC = tempC;
        this.tempF = tempF;
        this.date = date;
        this.comments = [];
        // WeatherBox.id++;
    }

    getComment (comment) {
        this.comments.push(comment);
    }
}

class Comment {
    constructor(text){
        Comment.id++;
        this.text = text;
    }
}
