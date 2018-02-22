(function () {
    'use strict';

    class Sorter {
        constructor(arr) {
            this.arr = arr;
        }

        sortArray(type, sortTo) {
            let sortedArray = [];
            if (type === 'string') {
                sortedArray = sortTo === 'down' ? this.arr.sort(function (a, b) {
                    return a.toLowerCase().localeCompare(b.toLowerCase());
                }) : this.arr.sort(function (a, b) {
                    return a.toLowerCase().localeCompare(b.toLowerCase());
                }).reverse();
            }
            else if (type === 'number') {
                sortedArray = sortTo === 'down' ? this.arr.sort((a, b) => {
                    return a - b
                }) : this.arr.sort((a, b) => {
                    return a - b
                }).reverse();
            }
            else if (type === 'date') {
                let array = [];
                this.arr.forEach(item => {
                    item = new Date(item.split('-').reverse().join('-')).getTime();
                    sortedArray.push(item);
                });
                sortedArray = sortTo === 'down' ? sortedArray.sort((a, b) => {
                    return a - b
                }) : sortedArray.sort((a, b) => {
                    return a - b
                }).reverse();
                sortedArray.forEach((item, i, arr) => {
                    let date = new Date(item);

                    function formatDate(date) {

                        let dd = date.getDate();
                        if (dd < 10) dd = '0' + dd;

                        let mm = date.getMonth() + 1;
                        if (mm < 10) mm = '0' + mm;

                        let yyyy = date.getFullYear();

                        return dd + '-' + mm + '-' + yyyy;
                    }

                    arr[i] = formatDate(date);
                });
            }
            return sortedArray;
        }
    }

    window.Sorter = Sorter;
})();

