let todoList = document.getElementById('todolist');
let date = document.getElementById('date');
let dd = new Date().getDate();
let mm = new Date().getMonth();
let yyyy = new Date().getFullYear();
let today = `Date: ${dd}/${mm}/${yyyy}`;
date.innerHTML = today;

let addItem = () => {
    //li text 
    let todoItem = document.getElementById('todoItem');
    if (todoItem.value !== "") {
        //create firebase key
        let firebasekey = firebase.database().ref('todos').push().key;
        let todo = {
            value: todoItem.value,
            key: firebasekey
        }
        firebase.database().ref(`todos/${firebasekey}`).set(todo);
        todoItem.value = "";
    }
    else {
        alert("Please Enter some Todo value!");
    }
}
firebase.database().ref('todos').on('child_added', data => {
    // console.log();
    // let li = document.createElement('li');
    // let liText = document.createTextNode(data.val().value);
    // li.appendChild(liText);

    // //create delete btn
    // let dltbtn = document.createElement('button');
    // let dltbtnText = document.createTextNode("Delete");
    // dltbtn.appendChild(dltbtnText);
    // dltbtn.setAttribute("class", "inlinebttn");
    // dltbtn.setAttribute("id", data.val().key);
    // dltbtn.setAttribute("onclick", "deleteText(this)");
    // li.appendChild(dltbtn);

    // //create edited btn
    // let editBtn = document.createElement('button');
    // let editBtnText = document.createTextNode("Edited");
    // editBtn.appendChild(editBtnText);
    // editBtn.setAttribute("class", "inlinebttn");
    // editBtn.setAttribute("id", data.val().key);
    // editBtn.setAttribute("onclick", "editText(this)");
    // li.appendChild(editBtn);

    // // create hr after li
    // let hr = document.createElement('hr');
    // li.appendChild(hr);
    // todoList.appendChild(li);

    todoList.innerHTML += `
    <li>
        <span>${data.val().value}</span> 
        <div>
        <button type="button" id="${data.val().key}" class="btn btn-warning" onclick="editText(this)">Edit</button>
        <button type="button" id="${data.val().key}" class="btn btn-danger" onclick="deleteText(this)">Delete</button> 
        </div>
    </li>`;
})

let deleteText = (del) => {
    firebase.database().ref(`todos/${del.id}`)/*child(del.id)*/.remove();
    del.parentNode.remove();
}

let editText = (edit) => {
    let oldTodo = edit.parentNode.firstChild.nodeValue;
    console.log(oldTodo)
    let newTodo = prompt("Enter your updated value and your previous value is", oldTodo);
    let updateTodo = {
        value: newTodo,
        key: edit.id
    }
    if (newTodo === "" || newTodo === null) {
        updateTodo.value = oldTodo;
    }
    else {
        firebase.database().ref(`todos/${edit.id}`).set(updateTodo);
        edit.parentNode.firstChild.nodeValue = newTodo;
    }
}

let deleteAll = () => {
    firebase.database().ref(`todos`)/*child(del.id)*/.remove();
    document.getElementById("todolist").innerHTML = "";
}
