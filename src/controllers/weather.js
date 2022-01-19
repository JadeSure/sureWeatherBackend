const axios = require('axios');
const { getLocalTime, getLocalDate } = require('../utils/dateConvert');
const fs = require('fs')
const { validateToken } = require('../utils/jwt')


async function getCurrentWeather(req, res) {
    const { city, stateCode } = req.params;
    const { WEATHER_API_KEY } = process.env
    const output = {}
    let url = ''

    !stateCode ?
        url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&APPID=${WEATHER_API_KEY}` :
        url = `http://api.openweathermap.org/data/2.5/weather?q=${city},${stateCode}&units=metric&APPID=${WEATHER_API_KEY}`
    try {
        let { data } = await axios.get(url)

        output.localDate = getLocalDate(data.dt)
        output.localTime = getLocalTime(data.dt)
        output.main = data.main
        output.location = data.name
        output.weather = data.weather
        output.sunrise = getLocalTime(data.sys.sunrise)
        output.sundown = getLocalTime(data.sys.sunset)
    } catch (e) {
        return res.status(400).json({ e })
    }

    // console.log(data);
    return res.send(output)
}


async function getSevenWeather(req, res) {
    const { city, stateCode } = req.params
    const { WEATHER_API_KEY } = process.env
    let status = true

    try {
        const { lat, lon } = await getCoord(city, stateCode)
        const weatherUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=alert&units=metric&appid=${WEATHER_API_KEY}`
        let { data } = await axios.get(weatherUrl)

        data.current.weather.forEach((item) => {
            if (item.main !== 'Clear') {
                status = false;
            }
        })

        if (status) {
            delete data.minutely
            return res.send(data)
        }

        return res.send(data)
    } catch (error) {
        return res.status(400).json(error)
    }
}

async function getStateCode(req, res) {
    const p = new Promise(function (resolve, reject) {
        fs.readFile('./src/files/stateCode.csv', 'utf-8', (err, data) => {
            if (err) reject(err);

            resolve(data)
        })
    })

    p.then(function (value) {
        const dataRes = value.split(/\n/).map(item => {

            const tempLength = item.split(',').length - 1
            return { label: item.split(',')[tempLength] }
        })

        res.send(dataRes)

    }, function (reason) {
        res.status(400).json({ reason })
    })

}
// './src/files/stateCode.csv'

async function getCoord(city, stateCode) {
    const { WEATHER_API_KEY } = process.env
    let url = ''
    !stateCode ?
        url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&APPID=${WEATHER_API_KEY}`
        : url = `http://api.openweathermap.org/data/2.5/weather?q=${city},${stateCode}&units=metric&APPID=${WEATHER_API_KEY}`
    const { data } = await axios.get(url)
    return data.coord
}

module.exports = { getCurrentWeather, getSevenWeather, getStateCode }