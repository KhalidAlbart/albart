const theme = document.querySelector('body');
const theme_toggler = document.querySelector('.theme-toggler__icon');
const theme_toggler_pos = document.querySelector('.theme-toggler');


if(localStorage.getItem('theme')) {
    theme.classList.add(localStorage.getItem('theme'));
}

theme_toggler.addEventListener('click', toggle);

function toggle() {
    theme.classList.toggle('theme-dark');
    if (theme.classList.contains('theme-dark')) {
        localStorage.setItem('theme', theme.classList);
    } else {
        localStorage.removeItem('theme');
    }
}