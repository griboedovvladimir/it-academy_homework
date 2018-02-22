(function () {
    class ClassDialog {
        constructor(e, columns, placeholder) {
            this.e = e;
            this.columns = columns;
            this.placeholder = placeholder;
            this.openDialogWindow();
        }

        openDialogWindow() {
            this.e.target.parentNode.classList.add('active');
            if (document.getElementById('dialog')) {
                document.getElementById('dialog').remove()
            }
            let win = document.createElement('div');
            let addBefore = document.createElement('span');
            addBefore.id = 'addBefore';
            addBefore.innerHTML = 'Add row before';
            let addAfter = document.createElement('span');
            addAfter.id = 'addAfter';
            addAfter.innerHTML = 'Add row after';
            let removeRow = document.createElement('span');
            removeRow.id = 'removeRow';
            removeRow.innerHTML = 'Remove row';
            win.append(addBefore, addAfter, removeRow);
            win.id = 'dialog';
            win.style.cssText = 'width:180px;background-color:white; position:absolute;top:' + this.e.y + 'px;left:' + this.e.x + 'px;';
            win.addEventListener('click', event => {
                if (event.target.id === 'removeRow') {
                    document.getElementById('dialog').remove();
                    document.getElementById(this.e.target.parentNode.id).remove();
                }
                else if (event.target.id === 'addBefore' || event.target.id === 'addAfter') {
                    ClassDialog.addRowAction(event, this.columns, this.e.target.parentNode, this.placeholder);

                }
            }, {once: true});
            if (document.getElementById(this.e.target.parentNode.id)) {
                document.body.appendChild(win)
            }
        }

        static addRowAction(e, columns, activeRow, placeholder) {
            let win = document.createElement('div');
            win.id = 'inputform';
            win.style.cssText = 'background-color:white; position:absolute;top:' + e.y + 'px;left:' + e.x + 'px;';
            let form = document.createElement('form');
            form.id = 'form';
            columns.forEach((item, i) => {
                let input = document.createElement('input');
                input.setAttribute('type', 'text');
                input.classList.add('inputs');
                input.id = 'inputs' + item;
                input.setAttribute('name', item);
                let label = document.createElement('label');
                label.setAttribute('type', `${item}`);
                label.innerHTML = item;
                form.append(label, input);
            });
            let addbutton = document.createElement('button');
            addbutton.id = 'addbutton';
            addbutton.setAttribute('type', 'submit');
            addbutton.innerHTML = 'Add';
            form.appendChild(addbutton);
            win.appendChild(form);
            document.body.appendChild(win);

            ///////////////////////////Draggable for window///////////////////////////
            dragElement(document.getElementById(("inputform")));

            function dragElement(elmnt) {
                let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
                if (document.getElementById(elmnt.id)) {
                    document.getElementById(elmnt.id).onmousedown = dragMouseDown;
                } else {
                    elmnt.onmousedown = dragMouseDown;
                }

                function dragMouseDown(e) {
                    if (e.target.tagName !== 'INPUT') {
                        e = e || window.event;
                        pos3 = e.clientX;
                        pos4 = e.clientY;
                        document.onmouseup = closeDragElement;
                        document.onmousemove = elementDrag;
                    }
                }

                function elementDrag(e) {
                    e = e || window.event;
                    pos1 = pos3 - e.clientX;
                    pos2 = pos4 - e.clientY;
                    pos3 = e.clientX;
                    pos4 = e.clientY;
                    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
                    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
                }

                function closeDragElement() {
                    document.onmouseup = null;
                    document.onmousemove = null;
                }
            }

            //////////////////////////////////////////////////

            let listener = document.addEventListener('click', e => {
                if (e.target.parentNode.tagName !== "DIV" && e.target.parentNode.id !== "form" && e.target.id !== "inputform") {
                    win.remove();
                    activeRow = '';
                }
            });
            document.addEventListener('submit', submit => {
                submit.preventDefault();
                let newRow = document.createElement('tr');
                newRow.classList.add('rows');
                newRow.id = 'row' + Date.now();
                let count = 0;
                let check = new Map();
                for (let i = 0; i < columns.length; i++) {
                    let td = document.createElement('td');
                    if (document.getElementById('inputs' + columns[i]).value) {
                        count++
                    }
                    check.set(columns[i], document.getElementById('inputs' + columns[i]).value);
                    td.innerHTML = document.getElementById('inputs' + columns[i]).value;
                    newRow.appendChild(td);
                }
                if (count !== columns.length && !document.getElementById('message')) {
                    let message = document.createElement('span');
                    message.innerHTML = 'All form fields must be filled in';
                    message.style.cssText = 'color:red;font-size:9pt';
                    message.id = 'message';
                    win.appendChild(message);
                }
                else if (count !== columns.length && document.getElementById('message')) {
                    document.getElementById('message').innerHTML = 'All form fields must be filled in';
                }
                let checkmessage = new CheckForm(check);
                if (activeRow && count === columns.length && checkmessage.check()) {
                    if (document.getElementById('message')) {
                        document.getElementById('message').innerHTML = checkmessage.check();
                    }
                    else {
                        let message = document.createElement('span');
                        message.innerHTML = checkmessage.check();
                        message.style.cssText = 'color:red;font-size:9pt';
                        message.id = 'message';
                        win.appendChild(message);
                    }
                }
                else if (activeRow && count === columns.length) {
                    if (e.target.id === 'addBefore') {
                        document.getElementById('table').insertBefore(newRow, activeRow)
                    }
                    else if (e.target.id === 'addAfter') {
                        document.getElementById('table').insertBefore(newRow, activeRow.nextSibling)
                    }
                    win.remove();
                    activeRow.classList.remove('active');
                    activeRow = '';
                    if (document.getElementsByClassName('stalk')[0]) {
                        let el = document.getElementsByClassName('stalk')[0].parentNode;
                        let sortto = document.getElementsByClassName('stalk')[0].id;
                        Grid.goSort(el, sortto, placeholder, columns);
                    }
                }

            });
        }
    }

    window.ClassDialog = ClassDialog;

})();