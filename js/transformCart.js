const PERSPECTIVE = 1000;
const SCALE = 1.25;
const ROTATE_X = 79;
const ROTATE_Y = 4;
const ROTATE_Z = -47;
const TRANSLATE_X = 0;
const TRANSLATE_Z = -4.5;
const pictures = document.querySelectorAll('.pic');
const parentBox = document.querySelector('.picture');

const TRANSFORM_NEW_VALUES = (index) => `perspective(${PERSPECTIVE}px)  scale(${(SCALE - 0.25)}) translateX(${(-6 + (index * 4))}rem) rotateY(${(ROTATE_Y + 11)}deg)`;

parentBox.addEventListener("mouseover", (event) => {
    pictures.forEach((picture, index) => {
        picture.style.transform = TRANSFORM_NEW_VALUES(index);
    });
});
parentBox.addEventListener("mouseout", (event) => {
    pictures.forEach((picture, index) => {
        picture.removeAttribute('style');
    });
});