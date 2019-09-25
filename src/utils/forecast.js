const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = "https://api.darksky.net/forecast/96ca49a1f7450250e513ec3af3e2038c/" + latitude + "," + longitude
    console.log("FORCAST URL" + url)
    request({url: url, json: true}, (error, {body}) => {
        if (error) {
            callback("Unable to reach the forcast app....", undefined)
        }else if (body.error) {
            callback("Invalid latitude and longitude", undefined)
        }else{
            callback(undefined, {weather: body.daily.data[0].summary + "It's currently " + body.currently.temperature + " degrees out. There is a " + body.currently.precipProbability + " chance of rain."})
        }
    })
}
module.exports = forecast