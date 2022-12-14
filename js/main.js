'use strict';

const images = [
    {className: "h-stretch", src: "./src/workLanding1.png", alt: "workLanding"},
    {className: "v-stretch", src: "./src/workLanding2.png", alt: "workLanding"},
    {className: "h-stretch", src: "./src/workLanding3.png", alt: "workLanding"},
    {className: "h-stretch", src: "./src/workLanding4.png", alt: "workLanding"},
    {className: "half-stretch", src: "./src/workLogo1.png", alt: "workLogo"},
    {className: "half-stretch", src: "./src/workLogo2.png", alt: "workLogo"},
    {className: "h-stretch", src: "./src/workLanding5.png", alt: "workLanding"},
];


const workList = document.getElementById('workList');
const showMore = document.querySelector('.showMoreButton');

if (images.length <= 5) {
    showMore.style.display = 'none';
} else {
    showMore.style.display = 'inline-block';
}

showMore.addEventListener('click', (e) => {
    e.preventDefault();
    const works = document.getElementsByClassName('work');
    if (showMore.innerHTML === "Больше"){
        for (let i = 6; i < works.length; i++) {
            works[i].style.display = "block";
        }
    } else {
        for (let i = 6; i < works.length; i++) {
            works[i].style.display = "none";
        }
    }
    showMore.innerHTML = showMore.innerHTML === "Больше" ? "Скрыть" : "Больше";
});

function addWork() {
    for (let i = 0; i < images.length; i++) {
        const div = createWorkBox(images[i].src, images[i].alt, images[i].className);
        if (i > 5) {
            div.style.display = 'none';
            workList.appendChild(div)
        } else {
            workList.appendChild(div);
        }
    }
}

function createWorkBox(src, alt, className) {
    const img = document.createElement('img');
    const div = document.createElement('div');
    img.src = src;
    img.alt = alt;
    div.classList.add('work', className);
    div.appendChild(img);
    return div;
}

addWork();