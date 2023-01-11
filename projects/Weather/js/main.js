// Импортируем погодный модуль
import open from './weather.js'

//Создадим экземпляр класса weather для получения сведений о погоде
const cityInput = document.querySelector('.search__input')
// Записываем переменную, для селектора full-screen
const isFullScreen = document.querySelector('.full-screen')
/*
    Используем локальное хранилище для записи/удаления локации полученных от пользователя или
    через функцию navigation.
    Для этих целей создадим функцию chache, которая будет для нас это все делать.
*/
function chache(value) {
    if (value) {
        localStorage.setItem('city', value)
    } else {
        localStorage.removeItem('city');
    }
}
// Задаем функцию для удаления селектора full-screen, при получении результатов погоды
function removeFullScreen () {
    isFullScreen.classList.remove('full-screen')
}

//  Обработаем событие изменения значения в строке поиска.
document.querySelector('.search__input').addEventListener('change', event => {
    // Выполним функцию chache передав в нее значение из строки поиска
    chache(event.target.value)
})
//  Перехватим нажитие на кнопку поиска
document.querySelector('.search__submit').addEventListener('click', event => {
    event.preventDefault()
    if (cityInput.value !== '') {
        // Выполним функцию chache передав в нее значение из строки поиска
        chache(document.querySelector('.search__input').value)
        // Далее вызовем метод open экземпляра класса Weather
        open(String(cityInput.value))
            .then(
                response => {
                    removeFullScreen()
                },
                error => {
                    alert(error)
                }
            )
    }
})
// Обработаем событие нажатия на клавишу Enter при фокусе на поискову строку
document.querySelector('.search__input').addEventListener('keyup', event => {
    if (event.key === 'Enter' && cityInput.value !== '') {
        // Выполним функцию chache передав в нее значение из строки поиска
        chache(event.target.value)
        // Далее вызовем метод open экземпляра класса Weather
        open(String(cityInput.value))
            .then(
                response => {
                    removeFullScreen()
                },
                error => {
                    alert(error)
                }
            )
    }
})

// Перехватываем событие загрузки контента страницы
window.addEventListener('DOMContentLoaded', function() {
    const options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
    }
    // Записываем функцию, которая вызывается при разрешении пользователем получать данные о местоположении
    function success(pos) {
        // Вызываем метод open
        const result = open({lat: pos.coords.latitude, lon: pos.coords.longitude})
                            .then(response => true, error => false)
        console.log(result, isFullScreen)
        if (result && isFullScreen) {
            removeFullScreen()
            chache(document.querySelector('.current-location__item').value)
        }
    }
    // Функция error нужна для случая, когда пользоваетель не дал разрешение на получение данных о местоположении
    function error(err) {
        console.warn(`ERROR(${err.code}): ${err.message}`)
    }
    /*  Проверяем локальное хранище, на предмет присутвия записи city.
        При начии данной записи выполним метод open.*/
    if (localStorage.getItem('city')){
        open(localStorage.getItem('city'))
            .then(
                response => {
                    removeFullScreen()
                    document.querySelector('.search__input').value = localStorage.getItem('city')
                },
                error => {
                    alert(error)
            })
    } else { // Иначе запросем разрешение на сбор сведений о местоположении пользователя
        navigator.geolocation.getCurrentPosition(success, error, options)
    }
})