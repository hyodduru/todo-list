'use strict';

const input = document.querySelector('.footer__input');
const addBtn = document.querySelector('.footer__btn');
const items = document.querySelector('.items');
let itemsArr = [];
const savedItems = localStorage.getItem('items');

if(savedItems!==null){
    const parsedItems = JSON.parse(savedItems);
    itemsArr = parsedItems;
    parsedItems.forEach((item)=> paintItems(item))

}



function saveItems(){
    localStorage.setItem('items', JSON.stringify(itemsArr))
}

function deleteItems(event){
    
    const deletedItem = event.target.parentNode.parentNode.parentNode;
    deletedItem.remove();
    itemsArr = itemsArr.filter((item)=>
        item.id !==  parseInt(deletedItem.id)
    )
    saveItems();
}



function paintItems(text){
    const itemRow = document.createElement('li');
    itemRow.setAttribute('class','item__row');
    itemRow.id = text.id;

    const item = document.createElement('div');
    item.setAttribute('class', 'item');

    const name = document.createElement('span');
    name.setAttribute('class', 'item__name');

    name.innerText = text.name;

    const deleteBtn = document.createElement('button');
    deleteBtn.setAttribute('class','item__deletebtn');
    deleteBtn.innerHTML = `<i class="fas fa-trash-alt"></i>`;
    deleteBtn.addEventListener('click', deleteItems);

    const divider = document.createElement('div');
    divider.setAttribute('class','item__divider');

   
    item.appendChild(name);
    item.appendChild(deleteBtn);
    itemRow.appendChild(item);
    itemRow.appendChild(divider);
    items.appendChild(itemRow)
}


function onAdd(){
    const text = input.value;
    const textObj = {name : text, id :  Date.now(),}
    if(text==""){
        input.focus;
        return;
    }
    paintItems(textObj);
    itemsArr.push(textObj);
    input.value ="";
    input.focus();
    saveItems();
}


addBtn.addEventListener('click',()=>{
    onAdd();
})

input.addEventListener('keydown', (event)=>{
    if(event.key==='Enter'){
        onAdd();
    }
})