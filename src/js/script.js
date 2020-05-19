'use strict';

window.addEventListener('DOMContentLoaded', function() {
    const calc = require('./modules/calc'),
          form = require('./modules/form'),
          slider = require('./modules/slider'),
          tabs = require('./modules/tabs'),
          timer = require('./modules/timer'),
          modal = require('./modules/modal');

    calc();
    form();
    slider();
    tabs();
    timer();
    modal();
});