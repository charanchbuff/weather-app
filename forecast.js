const request = require('request')
const forecast = (lat,lon,loc,callback) => {
const url = 'http://api.weatherstack.com/current?access_key=09e08ea7c5c39db6c0367f11696a5f1a&query=' +  lat + ',%20' + lon

request({url, json : true}, (error,{body}) => {
    if(error){
        callback({error : 'Network connectivity'},undefined)
    }
    else if(body.error){
        callback({error : 'Enter the co ordinates ' },undefined)
    }
    else {
        callback(undefined,{
            location : loc,
            forecast :loc + '\n' + '\n It is currently ' + body.current.temperature + ' degrees out' + ' but it feels like ' + body.current.feelslike + ' degrees out'
        })
    }
})
}
module.exports = forecast