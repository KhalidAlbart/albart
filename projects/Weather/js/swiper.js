function next(target) {
    const slider = document.querySelector(`.${target}`)
    const sliderElement = slider.querySelector(`li`)
    slider.scrollLeft += sliderElement.clientWidth * 2
}

function prev(target) {
    const slider = document.querySelector(`.${target}`)
    const sliderElement = slider.querySelector(`li`)
    slider.scrollLeft -= sliderElement.clientWidth * 2
}