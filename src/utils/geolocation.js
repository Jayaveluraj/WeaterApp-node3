const request = require('request')
const geoLocation = (address, callback) => {
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + address + ".json?access_token=pk.eyJ1IjoiamF5YXZlbHVyYWoiLCJhIjoiY2p6Z2x6N3NsMG43MzNtczlweXY2aThsOCJ9.ofzuJrDzODJI7y8J0U30BA"

    console.log("URL:" + url)
request({url, json: true}, (error, {body}) => {
    if (error) {
        console.log("error1")
        callback("Unable to reach Geoloacion service!!!", undefined)
    } else if (body.features && body.features.length === 0) {
        console.log("error2")
        callback("Unable to find the location try another one.", undefined)
    } else {
        console.log(body)
        const coordinates = body.features[0].center
        const data = {
            longitude: coordinates[0],
            latitude: coordinates[1],
            location: body.features[0].place_name
            }
        callback(undefined, data)
    }
}) 
}

module.exports = geoLocation