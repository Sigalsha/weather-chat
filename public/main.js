export class WeatherBox {
    constructor(cityName, tempC, tempF, date){
        this.cityName = cityName;
        this.tempC = tempC;
        this.tempF = tempF;
        this.date = date;
        this.comments = [];
        this.id = this.getId();
    }

    getComment (comment) {
        this.comments.push(comment);
    }

    S4 () {
        return (((1+Math.random())*0x10000)|0).toString(16).substring(1); 
    }

    getId () {
        var guidID = (this.S4() + this.S4() + "-" + this.S4() + "-4" + this.S4().substr(0,3) + "-" + this.S4() + "-" + this.S4() + this.S4() + this.S4()).toLowerCase();
        return guidID;
    }
}





