"use strict";

const submit = document.querySelector("#submit");
const todoNameInput = document.querySelector("#todo_name_input");
const todoContainer = document.querySelector("#todo_container");
const doneContainer = document.querySelector("#done_container");

let toDoArr = JSON.parse(localStorage.getItem("todoData")) || [];
console.log("toDoArr", toDoArr);
if (toDoArr !== null) {
  writeTodos();
}

submit.addEventListener("click", submitTodo);

function submitTodo(evt) {
  const todoObj = {
    name: todoNameInput.value,
    id: self.crypto.randomUUID(),
    done: false,
  };

  toDoArr.unshift(todoObj);
  console.log("toDoArr 1", toDoArr);
  writeTodos();
  todoNameInput.value = "";
}

function writeTodos() {
  localStorage.setItem("todoData", JSON.stringify(toDoArr));

  //clear lists
  todoContainer.innerHTML = "";
  doneContainer.innerHTML = "";
  //

  //Filter toDoArray for not-done container
  toDoArr
    .filter((todoObj) => !todoObj.done)
    .forEach((todoObj) => {
      todoContainer.innerHTML += `<li data-id=${todoObj.id}><input type="checkbox" name="todoCheck"><h3>${todoObj.name}</h3><div class="actions"><div class="counter"><p class="counter-minus">-<p/><p class="count"></p><p class="counter-plus">+<p/></div> <div id="delete_btn">x</div></div></li>`;
    });
  //
  //Filter toDoArray for done container
  toDoArr
    .filter((todoObj) => todoObj.done)
    .forEach((todoObj) => {
      doneContainer.innerHTML += `<li data-id=${todoObj.id}><input type="checkbox" name="todoCheck" checked><h3>${todoObj.name}</h3><div class="actions"><div class="counter"><p class="counter-minus">-<p/><p class="count"></p><p class="counter-plus">+<p/></div> <div id="delete_btn">x</div></div></li>`;
    });
  //

  //Toggle items between list containers
  todoContainer.querySelectorAll("li").forEach(handleItemsInList);
  doneContainer.querySelectorAll("li").forEach(handleItemsInList);

  function handleItemsInList(li) {
    const checkBox = li.querySelector("input");
    checkBox.addEventListener("click", (evt) => {
      evt.preventDefault();
      const correspondingDataObj = toDoArr.find((toDo) => toDo.id === li.dataset.id);
      correspondingDataObj.done = !correspondingDataObj.done;
      writeTodos();
    });

    //Delete button function
    li.addEventListener("click", (evt) => {
      const id = evt.currentTarget.dataset.id;
      if (evt.target.id === "delete_btn") {
        const indexOfItemInArray = toDoArr.findIndex((toDo) => toDo.id === id);
        toDoArr.splice(indexOfItemInArray, 1);
        writeTodos();
      }
    });

    //Counter UI
    let minusBtn = li.querySelector(".counter-minus");
    let plusBtn = li.querySelector(".counter-plus");
    let counterDisplay = li.querySelector(".count");
    let count = 1;
    counterDisplay.innerHTML = count;
    //
    //Minus btn function
    minusBtn.addEventListener("click", (evt) => {
      evt.stopPropagation();
      if (count > 1) {
        count -= 1;
        counterDisplay.innerHTML = count;
      }
    });

    //
    //Plus btn function
    plusBtn.addEventListener("click", (evt) => {
      evt.stopPropagation();
      count += 1;
      counterDisplay.innerHTML = count;
    });
  }
}
