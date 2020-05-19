'use strict';

window.addEventListener('DOMContentLoaded', function() {
    // TABS START
    const tab = document.querySelectorAll('.info-header-tab'),
          info = document.querySelector('.info-header'),
          tabContent = document.querySelectorAll('.info-tabcontent');

    function hideTabContent(a) {
        for (let i = a; i < tabContent.length; i++) {
            tabContent[i].classList.remove('show');
            tabContent[i].classList.add('hide');
        }
    }


    hideTabContent(1);

    function showTabContent(b) {
        if (tabContent[b].classList.contains('hide')) {
            tabContent[b].classList.remove('hide');
            tabContent[b].classList.add('show');
        }
    }

    info.addEventListener('click', function(event) {
        const target = event.target;
        if (target && target.classList.contains('info-header-tab')) {
            for( let i = 0; i < tab.length; i++) {
                if (target == tab[i]) {
                    hideTabContent(0);
                    showTabContent(i);
                    break;
                }
            }
        }
    });
    // TABS END

    //TIMER START
    const deadline = '2020-06-17';

    function getTimerRemaining(endtime) {
        const t = Date.parse(endtime) - Date.parse(new Date()),
              seconds = Math.floor((t / 1000) % 60),
              minutes = Math.floor((t / 1000 / 60) % 60),
              hours = Math.floor(t / (1000 * 60 * 60));
            //hours = Math.floor(t / (1000 * 60 * 60) % 24);

        return {
            'total': t,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
    }

    function getZero(num) {
        if (num >= 0 && num < 10) {
            return `0${num}`;
        } else {
            return num;
        }
    }

    function setClock(id, endtime) {
        let timer = document.getElementById(id),
            hours = timer.querySelector('.hours'),
            minutes = timer.querySelector('.minutes'),
            seconds = timer.querySelector('.seconds'),
            timeInterval = setInterval(updateClock, 1000);
        
        updateClock();

        function updateClock() {
            let t = getTimerRemaining(endtime);
            hours.textContent = getZero(t.hours);
            minutes.textContent = getZero(t.minutes);
            seconds.textContent = getZero(t.seconds);

            if (t.total <= 0) {
                clearInterval(timeInterval);
            }
        }
    }

    setClock('timer', deadline);
    // TIMER END

    // MODAL START
    
    const more = document.querySelector('.more'),
          overlay = document.querySelector('.overlay'),
          close = document.querySelector('.popup-close');

    // without functions 
    // more.addEventListener('click', function() {
    //     overlay.style.display = 'block';
    //     this.classList.add('more-splash');
    //     document.body.style.overflow = 'hidden';
    // });

    // close.addEventListener('click', function() {
    //     overlay.style.display = 'none';
    //     more.classList.remove('more-splash');
    //     document.body.style.overflow = '';
    // });

    function openModal() {
        overlay.style.display = 'block';
        more.classList.add('more-splash');
        document.body.style.overflow = 'hidden';
        clearInterval(modalTimerId);
    }

    more.addEventListener('click', openModal);

    function closeModal() {
        overlay.style.display = 'none';
        more.classList.remove('more-splash');
        document.body.style.overflow = '';
    }

    close.addEventListener('click', closeModal);

    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
            closeModal();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.code === 'Escape' && overlay.style.display === 'block') {
            closeModal();
        }
    });

    function showModalByScroll () {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight){
            openModal();
            window.removeEventListener('scroll', showModalByScroll);
        }
    }

    const modalTimerId = setInterval(openModal, 50000);

    window.addEventListener('scroll', showModalByScroll);
    // MODAL END

    // Form 
    const message = {
        loading: "Загрузка...",
        sucsess: "Спасибо! Скоро мы с Вами свяжемся!",
        failure: "Что-то пошло не так..."
    };
     
    const form = document.querySelector('.main-form'),
        formDown = document.querySelector('#form'),
        input = form.getElementsByTagName ('input'),
        statusMessage = document.createElement('div');
         
     
        statusMessage.classList.add('status');
     
    function sendForm(form){
     
        form.addEventListener('submit', function (event) {
            event.preventDefault();
            form.append(statusMessage);
        
            const formData = new FormData(form);
        
        function postData() {
            return new Promise(function (resolve, reject) {
                const request = new XMLHttpRequest();
                request.open('POST', 'server.php');
                request.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
        
                request.onreadystatechange = function () {
                    if(request.readyState < 4) {
                        resolve();
                    } else if (request.readyState === 4) {
                        if (request.status == 200 && request.status < 300) {
                            resolve();
                        } else {
                            reject();
                        }
                    }
                };
        
                let obj = {};
                formData.forEach (function (value, key) {
                    obj[key] = value;
                });
                const json = JSON.stringify(obj);
                request.send(json);
     
     
            });
        }
        
        function clearInput() {
            for (let i = 0; i < input.length; i++) {
                input[i].value = '';
            }
        }
        
        postData (formData)
            .then (() => statusMessage.innerHTML = message.loading)
            .then (() => statusMessage.innerHTML = message.sucsess)
            .catch (() => statusMessage.innerHTML = message.failure)
            .then (clearInput);
        });
     
     
    }
     
    sendForm(form);
    sendForm(formDown);

    // Slider
    const slides = document.querySelectorAll('.slider-item'),
          prev = document.querySelector('.prev'),
          next = document.querySelector('.next'),
          dotsWrap = document.querySelector('.slider-dots'),
          dots = document.querySelectorAll('.dot');

    let slideIndex = 1;

    showSlides(slideIndex);

    function showSlides(n) {
        if (n > slides.length) {
            slideIndex = 1;
        }
        if (n < 1) {
            slideIndex = slides.length;
        }

        slides.forEach((item) => item.style.display = 'none');
        dots.forEach((item) => item.classList.remove('dot-active'));

        slides[slideIndex - 1].style.display = 'block';
        dots[slideIndex - 1].classList.add('dot-active');
    }

    function plusSlides(n) {
        showSlides(slideIndex += n);
    }

    function cureentSlide(n) {
        showSlides(slideIndex = n);
    }

    prev.addEventListener('click', function() {
        plusSlides(-1);
    });

    next.addEventListener('click', function() {
        plusSlides(1);
    });

    dotsWrap.addEventListener('click', function(event) {
        for (let i = 0; i < dots.length + 1; i++) {
            if (event.target.classList.contains('dot') && event.target == dots[i-1]) {
                cureentSlide(i);
            }
        }
    });

    // Calc
    const persons = document.querySelectorAll('.counter-block-input')[0],
          restDays = document.querySelectorAll('.counter-block-input')[1],
          place = document.getElementById('select'),
          totalValue = document.getElementById('total');
    
    let personsSum = 0,
        daysSum = 0,
        total = 0;

    totalValue.innerHTML = 0;

    persons.addEventListener('change', function() {
        personsSum = +this.value;
        total = (daysSum + personsSum) * 4000;

        if (restDays.value == '') {
            totalValue.innerHTML = 0;
        } else {
            totalValue.innerHTML = total;
        }
    });

    restDays.addEventListener('change', function() {
        daysSum = +this.value;
        total = (daysSum + personsSum) * 4000;

        if (persons.value == '') {
            totalValue.innerHTML = 0;
        } else {
            totalValue.innerHTML = total;
        }
    });

    place.addEventListener('change', function() {
        if (restDays.value == '' || persons.value == '') {
            totalValue.innerHTML = 0;
        } else {
            let a = total;
            totalValue.innerHTML = a * this.options[this.selectedIndex].value;
        }
    });
});