const express = require('express')
const path = require('path')
const app = express()
const hbs = require('hbs')
const request = require('request')
const geoLocation = require('./utils/geolocation')
const forcast = require('./utils/forecast')

// Setup Default path for express configuration.
const dirName = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '../templates/views')
const partialPath = path.join(__dirname, '../templates/partials')

// var requestTime = function(req, res, next) {
//     req.requestTime = Date.now()
// }
// app.use(requestTime)

// Setup handlebar engin and views
app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(partialPath)

app.use(express.static(dirName))

app.get('', (req, res) => {
    // console.log(req.requestTime)
    res.render('index', {
        "title": "Weather",
        "name": "jayavelu"
    }) 
})
app.get('/about', (req, res) => {
    res.render('about', {
        "title": "About Me",
        "name": "jayavelu"
    })
})
app.get('/help', (req, res) => {
    res.render('help', {
        "title": "Help Title",
        "name": "jayavelu",
        "message": "Help message to help you "
    })
})
app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            "error": "you must enter the address"
        })
    }
    geoLocation(req.query.address, (error,{latitude, longitude, location}={}) => {
        if (error) {
            return res.send({"error": error})
        }
            forcast(latitude, longitude, (error, {weather}) => {
                if (error) {
                    console.log(error)
                    return {error}
                }
                console.log(weather)
                res.send({
                    "forcast": weather,
                    location,
                    "address": req.query.address
                })
        })  
    })
    // res.send({
    //     "forcast": "It is snowing",
    //     "location": "chennai",
    //     "address": req.query.address
    // })
})
app.get('/help/*', (req, res) => {
    res.render("404",{
        "title": "Help Not found",
        "name": "Jayavelu",
        "errormessage": "Help Message not found"
    })
})
app.get('*',(req, res) => {
    res.render("404", { 
        "title": "Help Not found",
        "name": "Jayavelu",
        "errormessage": "Help Message not found"
    })
    
})
app.listen(3000, () => {
    console.log('Server is up on port 3000')
})