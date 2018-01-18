(function () {

    'use strict';

    let addButton = document.getElementById('add').addEventListener('click', function () {
        getTags()
    });
    let tagSet = new Set();
    let tagArray = [];

    function getTags() {
        if (document.getElementById('addTag').value) {
            let tagValue = document.getElementById('addTag').value.toLowerCase();//строки со строчными и прописными буквами будут различаться, переводим в единый регистр
            tagSet.add(tagValue);

            tagArray = ([...tagSet]).sort();
            document.getElementById("addTag").value = "";

            if (document.getElementById('wrap')) {
                let wrap = document.getElementById('wrap');
                document.body.removeChild(wrap)
            }
            let wrap = document.createElement('div');
            wrap.id = 'wrap';
            wrap = document.body.appendChild(wrap);

            tagArray.forEach(function (i, item, tagArray) {
                let tag = document.createElement('div');
                tag.className = 'tag';
                //делаем теги с заглавной буквы
                tag.textContent = i[0].toUpperCase() + i.slice(1);
                wrap.appendChild(tag);
                let clearButton = document.createElement('button');
                clearButton.textContent = 'X';
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
        let tagArray2=[];
        tagArray = ([...tagSet]);
        let list = new Set();
        for (let i = 0; i < tagArray.length; i++) {
            if (takeTagValue.toLowerCase() === tagArray[i].substr(0, takeTagValue.length).toLowerCase()&&takeTagValue.length>1) {
                list.add(tagArray[i]);
            }
            //tagArray2 = [...list];
                if (document.getElementById('wrap2')) {
                    let wrap2 = document.getElementById('wrap2');
                    document.body.removeChild(wrap2);
                }

                let tagFromTagZone=document.getElementsByClassName('tag3');
                for(let i=0;i<tagFromTagZone.length;i++){
                    list.delete(tagFromTagZone[i].innerHTML.toLowerCase());
                }

                tagArray2 = [...list];
                let wrap2 = document.createElement('div');
                wrap2.id = 'wrap2';
                wrap2 = document.body.appendChild(wrap2);

                tagArray2.forEach(function (i, item, tagArrayOut){
                    let tag2 = document.createElement('div');
                    tag2.className = 'tag2';
                    tag2.textContent = i[0].toUpperCase() + i.slice(1);


                    wrap2.appendChild(tag2).addEventListener('click',function(){addToList()});

                    function addToList(){

                        let tag3 = document.createElement('div');
                        tag3.className = 'tag3';
                        tag3.textContent = i[0].toUpperCase() + i.slice(1);
                        document.getElementById('tagZone').appendChild(tag3);
                        //tagArray2[tagArray2.indexOf(i)]=null;
                        document.getElementById('takeTag').value='';
                    }

                })

        }
        setTimeout(takeTags, 1000);
    }
}());


