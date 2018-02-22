(function () {
    'use strict';

    class Grid {
        constructor(config) {
            this.placeholder = config.wrapper;
            this.columns = config.columns;
            this.rows = config.rows;
            this.build()
        }

        build() {
            let table = document.createElement('table');
            table.id = 'table';
            table.appendChild(this.buildHeader());
            table.appendChild(this.buildTable());
            document.getElementById(this.placeholder).appendChild(table);
            document.addEventListener('click', e => {
                this.eventer(e);
            });
        }

        buildHeader() {
            let header = document.createElement('tr');
            header.id = 'head';
            this.columns.forEach((item, i) => {
                let child = document.createElement('th');
                child.id = item;
                child.innerHTML = item;
                header.appendChild(child);
            });
            return header;
        }

        buildTable() {
            let fragment = document.createDocumentFragment();
            this.rows.forEach((item, i) => {
                let row = document.createElement('tr');
                row.id = 'row' + i;
                row.classList.add("rows");
                for (let i = 0; i < Object.keys(item).length; i++) {
                    let cell = document.createElement('td');
                    cell.innerHTML = item[this.columns[i]];
                    row.appendChild(cell);
                }
                fragment.appendChild(row);
            });
            return fragment;
        }

        eventer(e) {
            if (e.target.parentNode.tagName !== "DIV" && e.target.parentNode.id !== "form") {
                let tr = document.querySelectorAll('tr');
                for (let i = 0; i < tr.length; i++) {
                    tr[i].classList.remove('active');
                }
            }
            if (document.getElementById('dialog')) {
                document.getElementById('dialog').remove()
            }
            if (e.target.parentNode.id === 'head' || (e.target.classList.contains('stalk'))) {
                this.sort(e);
            }
            else if (e.target.parentNode.id !== 'head' && e.target.tagName === 'TD' || e.target.parentNode.id === 'dialog') {
                let dialog = new ClassDialog(e, this.columns, this.placeholder);
            }

        }

        sort(e) {
            let el = e.target;
            if (e.target.parentNode.parentNode.id === 'head') {
                el = e.target.parentNode
            }
            if (document.getElementsByClassName('stalk')[0] && !el.querySelector('.stalk')) {
                document.getElementsByClassName('stalk')[0].remove()
            }
            if (el.querySelector('.stalk')) {
                if (el.querySelector('#down')) {
                    el.querySelector('#down').id = 'up';
                    el.querySelectorAll('.stalk')[0].innerHTML = '&#9650';
                    Grid.goSort(el, 'up', this.placeholder, this.columns);
                }
                else if (el.querySelector('#up')) {
                    el.querySelector('#up').id = 'down';
                    el.querySelectorAll('.stalk')[0].innerHTML = '&#9660';
                    Grid.goSort(el, 'down', this.placeholder, this.columns);
                }
            }
            else {
                let stalk = document.createElement('span');
                stalk.innerHTML = '&#9660';
                stalk.id = 'down';
                stalk.classList.add('stalk');
                el.appendChild(stalk);
                Grid.goSort(el, 'down', this.placeholder, this.columns);
            }
        }

        static goSort(el, sortTo, placeholder, columns) {
            let rows = document.getElementById(placeholder).querySelectorAll('tr');
            rows = [...rows];
            let head = rows.shift();
            let indexCol = columns.indexOf(el.id);
            let contentCol = [];
            for (let i = 0; i < rows.length; i++) {
                contentCol.push(rows[i].querySelectorAll('td')[indexCol].innerHTML);
            }
            let type = 'string';
            if (el.id === 'Date') {
                type = 'date';
            }
            else if (el.id === 'Id') {
                type = 'number';
            }
            let contentColClone = contentCol.slice();
            let classSortArray = new Sorter(contentCol);
            let sortedArr = classSortArray.sortArray(type, sortTo);
            if (JSON.stringify(sortedArr) !== JSON.stringify(contentColClone)) {
                let fragment = document.createDocumentFragment();
                for (let i = 0; i < sortedArr.length; i++) {
                    let el = sortedArr[i];
                    for (let i = 0; i < rows.length; i++) {
                        if (rows[i].querySelectorAll('td')[indexCol].innerHTML === el) {
                            rows[i].remove();
                            fragment.appendChild(rows[i]);
                        }
                    }
                }
                document.getElementById('table').insertBefore(fragment, head.nextSibling);
            }
        }
    }

    window.Grid = Grid;
})();