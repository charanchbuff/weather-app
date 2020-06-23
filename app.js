const express = require('express')
const path = require('path')
const hbs = require('hbs')
const app = express()
const port = process.env.PORT || 3000
const geocode = require('./geocode')
const forecast = require('./forecast')
const request = require('request')
app.set('view engine','hbs')
// app.use(express.static(path.join(__dirname,"/public")))
const TemplatePath = path.join(__dirname,'/templates')

app.set('views',TemplatePath)
hbs.registerPartials(path.join(__dirname,'/templates/partial'))
app.get('', (req,res) => {
    res.render('index',{
        title : 'Home Page',
        name : 'Yedhokati'
    })
})
app.get('/about', (req,res) => {
    res.render('about',{
        title : 'About Page',
        name : 'Yedhokati'
})
})
app.get('/help', (req,res) => {
    res.render('help',{title : 'Help Page',
    name : 'Yedhokati'})
})
app.get('/help/*',(req,res) => {
    res.render('error', {message : 'Help Not Found',name : 'Yedhokati',title : 'Help Page'
})
})


app.get('/weather', (req,res) => {
    if(!req.query.address){
        return res.send({
            error : 'No address provided'
        })
    }
    const addres = req.query.address
    geocode(addres, (error,{latitude,longitude,locations} = {}) => {
        if(error){
            return res.send(error)
        }
        forecast(latitude,longitude,locations,(error,forecastResponse) => {
            if(error){
                return res.send(error)
            }
            res.send(forecastResponse)
        })
    })
})



app.get('*',(req,res) => {
    res.render('error', {message : 'Page Not Found'})
})

app.listen(port,() => {
    console.log('Server up')
})
