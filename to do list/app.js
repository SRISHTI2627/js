//selectors
const input = document.querySelector('.input');
const btn = document.querySelector('.btn');
const list = document.querySelector('.list');
const filter = document.querySelector('.filter-todo');
// const input = document.querySelector('.input');


//Event listeners
document.addEventListener('DOMContentLoaded',gettodos);
btn.addEventListener('click',addToDo);
list.addEventListener('click',deletecomplete);
filter.addEventListener('click',filterOptions);


//functions

function addToDo(event){
  event.preventDefault();

  const todoDiv = document.createElement('div');
  todoDiv.classList.add('todo');

  const newtodo = document.createElement('li');
  newtodo.classList.add('item');
  newtodo.innerText =input.value;
  todoDiv.appendChild(newtodo);

  saveLocaltodos(input.value);

  const done = document.createElement('button');
  done.innerHTML = '<i class="fas fa-check"></i>';
  done.classList.add('done');
  todoDiv.appendChild(done);

  const trash = document.createElement('button');
  trash.innerHTML = '<i class="fas fa-trash"></i>';
  trash.classList.add('trash');
  todoDiv.appendChild(trash);

    list.appendChild(todoDiv);

  input.value = "";
};

function deletecomplete(e){
  const item = e.target;
  if(item.classList[0] === "trash"){
    // item.parentElement.remove();
    const bill = item.parentElement;
    item.parentElement.classList.add("fall");
    removeLocaltodos(bill);
    item.parentElement.addEventListener('transitionend',function(){
    item.parentElement.remove();
    });
  }
  if(item.classList[0] === "done"){
    item.parentElement.classList.toggle("Completed");
  }
};


function filterOptions(e){
   const todos = list.childNodes;
   console.log(todos);
   todos.forEach(function(todo){
     switch(e.target.value){
       case "all" :
       todo.style.display = "flex";
       break;
       case "completed" :
       if(todo.classList.contains('Completed'))
         {
         todo.style.display = "flex";
         }
         else
         {
           todo.style.display = "none";
         }
      break;
      case "uncompleted" :
      if(!todo.classList.contains('Completed'))
      {
        todo.style.display = "flex";
      }
        else
        {
        todo.style.display = "none";
      }
      break;
       }
     });
};


function saveLocaltodos(todo){
  let todos;
  if(localStorage.getItem('todos') === null)
  {
    todos = [];
  }
  else
  {
    todos = JSON.parse(localStorage.getItem('todos'));
  }
  todos.push(todo);
  localStorage.setItem('todos',JSON.stringify(todos));
};


function gettodos(){
  let todos;
  if(localStorage.getItem('todos') === null)
  {
    todos = [];
  }
  else
  {
    todos = JSON.parse(localStorage.getItem('todos'));
  }
  todos.forEach(function(bill){
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');

    const newtodo = document.createElement('li');
    newtodo.classList.add('item');
    newtodo.innerText =bill;
    todoDiv.appendChild(newtodo);

    // saveLocaltodos(input.value);

    const done = document.createElement('button');
    done.innerHTML = '<i class="fas fa-check"></i>';
    done.classList.add('done');
    todoDiv.appendChild(done);

    const trash = document.createElement('button');
    trash.innerHTML = '<i class="fas fa-trash"></i>';
    trash.classList.add('trash');
    todoDiv.appendChild(trash);

      list.appendChild(todoDiv);
  });
};

function removeLocaltodos(bill){
  let todos;
  if(localStorage.getItem('todos') === null)
  {
    todos = [];
  }
  else
  {
    todos = JSON.parse(localStorage.getItem('todos'));
  }
  console.log(bill);
const item = bill.children[0].innerText;
const itemIndex = todos.indexOf(item);
todos.splice(itemIndex,1);
localStorage.setItem("todos", JSON.stringify(todos))
}
