document.querySelector('.submit').addEventListener('click', (e) => {
    e.preventDefault();

    const TEMPLATE_PARAMETERS = {
        phone_number: document.querySelector('.contactForm__phone').value,
        email: document.querySelector('.contactForm__email').value,
        message: document.querySelector('.contactForm__message').value,
    };

    emailjs.send("service_wlf34fq","template_j9a5xes", TEMPLATE_PARAMETERS)
        .then(function(response) {
            alert('Заявка прината в обращение! Мы свяжемся с вами в ближайшее время.');
        }, function(error) {
            alert('На данный момент на серевере ведутся технические работы, пожалуйста, повторите попытку позднее!');
        });
});