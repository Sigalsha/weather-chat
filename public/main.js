export class WeatherBox {
    constructor(cityName, tempC, tempF, date){
        this.cityName = cityName;
        this.tempC = tempC;
        this.tempF = tempF;
        this.date = date;
        this.comments = [];
        WeatherBox.id++;
    }

    getComment (comment) {
        this.comments.push(comment);
    }
}

