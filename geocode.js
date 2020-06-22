const request = require('request')
const geocode = (location,callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + location + '.json?access_token=pk.eyJ1IjoiY2hhcmFuY2g5NyIsImEiOiJja2JlNmw5eWUwY3l4MnJxcXduYWRrczE5In0.ec3x97aAR6afPr-nNtZhoA&limit=1'
    request({url, json : true},(error,{body}) => {
        if(error){
            callback({ error : 'No network connectivity' },undefined)
        }
        else if (body.features.length === 0){
            callback({error : 'No such Location Exists'},undefined)
    
        }
        else{
            callback(undefined, {
                latitude : body.features[0].center[1],
                longitude : body.features[0].center[0],
                locations : body.features[0].place_name
            })
        }
    })
    }
    module.exports = geocode