function modal() {
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
}

module.exports = modal;