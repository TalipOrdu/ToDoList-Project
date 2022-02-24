//all elements picking
const form = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo");
const todoList = document.querySelector(".list-group");
const firstCardBody = document.querySelectorAll(".card-body")[0];
const secondaryCardBody = document.querySelectorAll(".card-body")[1];
const filter = document.querySelector("#filter");
const clearButton = document.querySelector("#clear-todos");

eventListeners();

function eventListeners(){//tüm eventListeners
    form.addEventListener("submit",addTodo);
    document.addEventListener("DOMContentLoaded",loadAllTodosToUI);
    secondaryCardBody.addEventListener("click",deleteTodo);
    filter.addEventListener("keyup",filterTodos);
    clearButton.addEventListener("click",clearAllTodos);
}
function clearAllTodos(e){
    
    if(confirm("are you sure clear All Todos ?")){
        //clear to UI    
        // todoList.innerHTML = "";//slow
        while(todoList.firstElementChild != null){
            todoList.removeChild(todoList.firstElementChild);
        }
        localStorage.removeItem("todos");

    }
}

function filterTodos(e){
    const filterValue = e.target.value.toLowerCase();
    const listItems = document.querySelectorAll(".list-group-item");

    listItems.forEach(function(listItem){
        const text = listItem.textContent.toLowerCase();
        if(text.indexOf(filterValue) === -1){
            //not found
            listItem.setAttribute("style","display : none !important");//d-flex more important display thats why used important.

        }else{
            listItem.setAttribute("style","display : block");
        }
    });
}

function showAlert(type,message){
    const alert = document.createElement("div");
    alert.className = `alert, alert-${type}`;
    alert.textContent = message;

    firstCardBody.appendChild(alert);

    //SetTimeOut
    setTimeout(function(){
        alert.remove();
    },2000);
}

function deleteTodo(e){
    if(e.target.className === "fa fa-remove"){
        e.target.parentElement.parentElement.remove();
        deleteTodoFromStorage(e.target.parentElement.parentElement.textContent);

        showAlert("success","Todo Deleted successfuly");
        
    }

}
function deleteTodoFromStorage(deleteTodo){//li elemts textContent
    let todos = getTodosFromStorage();//todos came from storage as Array
    
    todos.forEach(function(todo,index){   
        if(todo === deleteTodo){
            todos.splice(index,1);//deleting Element
        }
    });
    localStorage.setItem("todos",JSON.stringify(todos));
}

function loadAllTodosToUI(){
    let todos = getTodosFromStorage();

    todos.forEach(function(todo){
        addTodoToUI(todo);
    });
}

function duplicateControl(){
    const newTodo = todoInput.value.trim().toLowerCase();//trim ile baştaki ve sonkadi spaceler silinir.
    const listItems = document.querySelectorAll(".list-group-item");

    listItems.forEach(function(todo){
        
    })
    listItems.forEach(function(todo){
        if(todo.textContent === newTodo){
            showAlert("danger","aynısı var");
            listItems.pop(newTodo);
        }   
    })

}
function addTodo(e){
    const newTodo = todoInput.value.trim();//trim ile baştaki ve sonkadi spaceler silinir.
    
    if(newTodo === ""){       
        showAlert("danger"," Plase write a Todo...");//type, message

    }
    else if(e){
        duplicateControl();
       addTodoToUI(newTodo);
       addTodoToStorage(newTodo);
       showAlert("success"," Todo Added successfuly");
    }
    

    todoInput.value = "";//yazıldıktan sonra inputu temizler.
    e.preventDefault();

}

function getTodosFromStorage(){//storageden todoları alır.
    let todos;
    if(localStorage.getItem("todos") === null){
        todos = [];
    }else{
        todos =JSON.parse(localStorage.getItem("todos"));
    }   
    return todos; 
}

function addTodoToStorage(newTodo){
    let todos = getTodosFromStorage();


     todos.push(newTodo);

    localStorage.setItem("todos",JSON.stringify(todos));
}

function addTodoToUI(newTodo){ //string değerini list item olarak UI ekleyecek.

//     <!-- <li class="list-group-item d-flex justify-content-between">
//     Todo 1
//     <a href="#" class="delete-item">
//         <i class="fa fa-remove"></i>
//     </a>
// </li> -->

    duplicateControl();
    //List item olsturma
    const listItem = document.createElement("li");
    listItem.className = "list-group-item d-flex justify-content-between";

    //link olusturma
    const link = document.createElement("a");
    link.href = "#";
    link.className = "delete-item";
    link.innerHTML = "<i class='fa fa-remove'></i>";

    //text Node
    listItem.appendChild(document.createTextNode(newTodo));
    listItem.appendChild(link);

    //todoList'e list İtem'ı ekleme
    todoList.appendChild(listItem);

}