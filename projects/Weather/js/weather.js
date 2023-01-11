const apiKey = '5703e5cb782c148e2045e6559bb38e93'

function getWeather(apiUrl) {
    return new Promise((resolve, reject) => {
        const weather = new XMLHttpRequest()

        weather.open('GET', apiUrl)

        weather.responseType = 'json'
        weather.timeout = 5000
        weather.send()

        weather.onload = () => {
            if (weather.response.cod != 200) {
                reject(new Error('По данному региону информации не найдено!\n Пожалуйста, проверьте корректность введенных данных!'))
            } else {
                resolve(true)
                dataParse(weather.response)
            }
        }

        weather.onerror = function() {
            reject(new Error('Проблема с сетью, проверьте соеденение или повторите попытку позже!'))
        }

        weather.ontimeout = () => {
            reject(new Error('Проблема с сетью, проверьте соеденение или повторите попытку позже!'))
        }
    })
}

export default function open(city = {}) {
    return new Promise((resolve, reject) => {
        if (typeof city === 'object') {
            getWeather(`https://api.openweathermap.org/data/2.5/forecast?lat=${city.lat}&lon=${city.lon}&appid=${apiKey}&units=metric&lang=ru`)
                .then(
                    response => resolve(response),
                    error => reject(error))
        } else {
            const request = new XMLHttpRequest()
            request.open('GET', `https://api.mymemory.translated.net/get?q=${city}&langpair=ru|en`, true)
            request.timeout = 10000
            request.responseType = 'json'
            request.send()
    
            request.onload = () => {
                getWeather(`https://api.openweathermap.org/data/2.5/forecast?q=${request.response.responseData.translatedText}&appid=${apiKey}&units=metric&lang=ru`)
                    .then(
                        response => resolve(response),
                        error => reject(error))
            }
    
            request.timeout = () => {
                reject(new Error('Проблема с сетью, проверьте соеденение или повторите попытку позже!'))
            }
        }
    })
}

function dataParse(data) {
    let hourlyForecast = ''
    let dailyForecast = ''

    const getPositiveNumber = (number) => number > 0 ? "+" + number : number

    document.querySelector('.current-location__item').innerHTML = data.city.name
    document.querySelector('.current-weather__temp').innerHTML = getPositiveNumber(data.list[0].main.temp.toFixed(1)) + '&#176;'
    document.querySelector('.current-weather__icon').src = `http://openweathermap.org/img/wn/${data.list[0].weather[0].icon}@2x.png`
    document.querySelector('.current-weather__feels').innerHTML = `${data.list[0].weather[0].description}<br><span class="current-weather__feels_font-weight">ощущается как </span>${data.list[0].main.feels_like.toFixed(1)}&#176;`
    document.querySelector('.wind').innerHTML = data.list[0].wind.speed.toFixed(1) + ' м/с'
    document.querySelector('.humidity').innerHTML = data.list[0].main.humidity + '%'
    document.querySelector('.pressure').innerHTML = data.list[0].main.pressure + ' мм рт. ст.'
    
    let previusDay = 0
    data.list.forEach(item => {
        const currentDay = Number(new Date(item.dt_txt).getDate())
        const today = new Date().getDate()
        const itemDate = new Date(item.dt_txt)

        if (previusDay != 0 && previusDay != currentDay) {
            hourlyForecast += `<li class="hourly-forecast__separator">
            <svg height="100%" width="2rem">
            <line x1="50%" y1="0%" x2="50%" y2="100%" style="stroke:var(--separator-color);stroke-width:1" />
            </svg>
            </li>`
        } else {
            hourlyForecast += `<li class="hourly-forecast__item flex-column">
            <p class=" hourly-forecast__time">${new Intl.DateTimeFormat("ru", {hour: "2-digit", minute: "2-digit"}).format(itemDate)}</p>
            <img src="http://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png" alt="weather-icon" class="hourly-forecast__icon title='${item.weather[0].description}'">
            <p class=" hourly-forecast__temperature">${Math.floor(item.main.temp)}&#176;</p>
            </li>`
        }

        if (currentDay != previusDay) {
            const weekDay = new Intl.DateTimeFormat("ru", {day: '2-digit'}).format(itemDate) == today ? 'Сегодня' : new Intl.DateTimeFormat("ru", {weekday: "short"}).format(itemDate)
            const date = `${currentDay} ${new Intl.DateTimeFormat("ru", {month: 'short'}).format(itemDate)}`
            dailyForecast += `<li class="forecast-item inline-flex-column">
            <p class="forecast-item__day">${weekDay}</p>
            <p class="forecast-item__date">${date.slice(0, -1)}</p>
            <img class="forecast-item__icon" src="http://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png" alt="icon">
            <div class="forecast-item__range flex-row">
                <p class="forecast-item__temp">${getPositiveNumber(Math.floor(item.main.temp_min))}&#176;</p>
                <p class="forecast-item__temp">${getPositiveNumber(Math.floor(item.main.temp_max))}&#176;</p>
            </div>
            <p class="forecast-item__description">${item.weather[0].description}</p>
            </li>`
        }
        
        previusDay = currentDay
    })

    document.querySelector('.hourly-forecast__wrapper').innerHTML = hourlyForecast
    document.querySelector('.forecast__items').innerHTML = dailyForecast
}