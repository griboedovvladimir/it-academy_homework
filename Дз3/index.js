(function () {

    'use strict';

    let addButton=document.getElementById('add').addEventListener('click',function(){getTags()});
    let tagSet = new Set();
    let tagArray=[];


function getTags(){
    let tagValue=document.getElementById('addTag').value;
    tagSet.add(tagValue);
    tagArray=([...tagSet]).sort();
    console.log(tagArray);
    if(document.getElementById('wrap')){
        let wrap = document.getElementById('wrap');
        document.body.removeChild(wrap)
    }
    let wrap = document.createElement('div');
    wrap.id='wrap';
    wrap=document.body.appendChild(wrap);


    tagArray.forEach(function (i,item,tagArray) {
        let tag = document.createElement('div');
        tag.className='tag';
        tag.textContent=i;
        wrap.appendChild(tag);
    },0)

}

}());

