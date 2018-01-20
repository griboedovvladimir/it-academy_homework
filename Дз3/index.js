(function () {

    'use strict';

    let addButton = document.getElementById('add').addEventListener('click', function () {
        getTags()
    });
    let tagSet = new Set();
    let tagArray = [];
    let parent = document.getElementById('align');

    function getTags() {
        if (document.getElementById('addTag').value) {
            let tagValue = document.getElementById('addTag').value.toLowerCase();
            tagSet.add(tagValue);

            tagArray = ([...tagSet]).sort();
            document.getElementById("addTag").value = "";

            if (document.getElementById('wrap')) {
                let wrap = document.getElementById('wrap');
                parent.removeChild(wrap)
            }
            let wrap = document.createElement('div');
            wrap.id = 'wrap';
            parent.insertBefore(wrap, document.getElementById('takeTag'));

            tagArray.forEach(function (i, item, tagArray) {
                let tag = document.createElement('div');
                tag.className = 'tag';
                tag.textContent = i[0].toUpperCase() + i.slice(1);
                wrap.appendChild(tag);
                let clearButton = document.createElement('button');
                clearButton.textContent = 'X';
                clearButton.className = 'X';
                tag.appendChild(clearButton);
                clearButton.addEventListener('click', function () {
                    deleteTags()
                });

                function deleteTags() {
                    wrap.removeChild(tag);
                    tagSet.delete(i);
                }

            }, 0)
        }
    }

    let takeTag = document.getElementById('takeTag').addEventListener('focus', function () {
        takeTags()
    });

    function takeTags() {
        let takeTagValue = document.getElementById('takeTag').value;
        let tagArray2 = [];
        tagArray = ([...tagSet]);
        let list = new Set();
        for (let i = 0; i < tagArray.length; i++) {
            if (takeTagValue.toLowerCase() === tagArray[i].substr(0, takeTagValue.length).toLowerCase() && takeTagValue.length > 0) {
                list.add(tagArray[i]);
            }
            if (document.getElementById('wrap2')) {
                let wrap2 = document.getElementById('wrap2');
                parent.removeChild(wrap2);
            }

            let tagFromTagZone = document.getElementsByClassName('tag3');
            for (let i = 0; i < tagFromTagZone.length; i++) {
                list.delete(tagFromTagZone[i].innerHTML.toLowerCase());
            }

            tagArray2 = [...list];
            let wrap2 = document.createElement('ul');
            wrap2.id = 'wrap2';
            parent.insertBefore(wrap2, document.getElementById('tagZone'));

            tagArray2.forEach(function (i, item, tagArrayOut) {
                let tag2 = document.createElement('li');
                tag2.className = 'tag2';
                tag2.id = 'tagId' + item;
                tag2.textContent = i[0].toUpperCase() + i.slice(1);

                wrap2.appendChild(tag2).addEventListener('click', function () {
                    addToList()
                });

                if (document.getElementsByClassName('tag2')[0]) {
                    let tagFromList = document.getElementById('tagId0');
                    tagFromList.classList.add('firstEl');
                    document.onkeyup = function (e) {
                        e = e || window.event;
                        if (e.keyCode === 13 && document.getElementById('takeTag').value) {
                            addToList();
                        }
                    }
                }

                function addToList() {
                    let tag3 = document.createElement('div');
                    tag3.className = 'tag3';
                    tag3.textContent = i[0].toUpperCase() + i.slice(1);
                    document.getElementById('tagZone').appendChild(tag3);
                    document.getElementById('takeTag').value = '';
                }

            })
        }
        setTimeout(takeTags, 1000);
    }

}());

