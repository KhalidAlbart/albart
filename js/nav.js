const link = document.querySelector('.nav__breadcrumbs');
const navigationPanel = document.querySelector('.nav');
const humburgerMenu = document.querySelector('.nav__icon');
const navigationLinks = document.querySelector('.nav__breadcrumbs');

function hundleToggle() {
    if (navigationLinks.style.display != 'none') {
        navigationLinks.style.display = 'none';
        navigationPanel.style.height = 'auto';
    } else {
        navigationPanel.style.height = '100%';
        navigationLinks.style.display = 'flex';
    }
}

function hundleSelectLink(event) {
    const nav__item = event.path[1];
    console.log(nav__item);
    if (!nav__item.classList.contains('nav__item_active') && nav__item.classList.contains('nav__item')) {
        document.querySelector('.nav__item_active').classList.remove('nav__item_active');
        nav__item.classList.add('nav__item_active');
    }
}


link.addEventListener('click', hundleSelectLink)
humburgerMenu.addEventListener('click', hundleToggle);