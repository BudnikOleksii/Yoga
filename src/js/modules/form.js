function form() {
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
}

module.exports = form;