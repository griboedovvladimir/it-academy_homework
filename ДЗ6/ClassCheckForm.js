(function () {
    'use strict';

    class CheckForm {
        constructor(map) {
            this.map = map;
        }

        check() {
            let message = '';
            this.map.forEach((value, key) => {
                if (key === 'Id') {
                    let reg = /[0-9]+$/;
                    if (reg.test(value) === false) {
                        message = message + '<span style="display: block">incorrect value of field ' + key + '</span>';
                    }
                }
                if (key === 'Email') {
                    let reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
                    if (reg.test(value) === false) {
                        message = message + '<span style="display: block">incorrect value of field ' + key + '</span>';
                    }
                }
                if (key === 'Date') {
                    let reg = /^([0-9]{2})+\-([0-9]{2})+\-([0-9]{4})$/;
                    if (reg.test(value) === false) {
                        message = message + '<span style="display: block">incorrect value of field ' + key + '</span>';
                    }
                }
            });
            return message;
        }
    }

    window.CheckForm = CheckForm;
})();