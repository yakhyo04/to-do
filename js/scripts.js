const form = document.querySelector(".todo-form");
const input = document.querySelector(".todo-input");
const list = document.querySelector(".todo-list");
const elTemplate = document.querySelector("#todo-item--template").content

let localArr = JSON.parse(window.localStorage.getItem('todos'))
let todos = localArr || []

function renderTodos(todosArr, element){
    element.innerHTML = null
    todosArr.forEach(todo => {
        const cloneTemplate = elTemplate.cloneNode(true)

        let elTitle = cloneTemplate.querySelector('.todo-item-complete-text')
        elTitle.textContent = todo.content

        let deleteBtn = cloneTemplate.querySelector('.todo-item-delete-btn');
        deleteBtn.dataset.id = todo.id

        let checkBox = cloneTemplate.querySelector('#complated');
        checkBox.dataset.id = todo.id

        checkBox.addEventListener('click', (e)=>{
            let checkBoxId = e.target.dataset.id

            let checkedItem = todos.find(todo => todo.id === checkBoxId)

            checkedItem.isCompleted = !checkedItem.isCompleted

            if(checkedItem.isCompleted){
                elTitle.classList.add('completed')
            }else{
                elTitle.classList.remove('completed')
            }

            window.localStorage.setItem('todos', JSON.stringify(todos))

           renderTodos(todos, list)
        })

        deleteBtn.addEventListener('click', (e)=>{
            let btnId = e.target.dataset.id

            const findElem = todos.findIndex(todo => todo.id == btnId);

            todos.splice(findElem, 1)

            window.localStorage.setItem('todos', JSON.stringify(todos))

           renderTodos(todos, list)
        })
        element.appendChild(cloneTemplate)
    });
}

form.addEventListener('submit', (e) =>{
    e.preventDefault();
    
    let inputValue = input.value.trim()
    
    let newObj = {
        id: new Date().getTime(),
        content: inputValue,
        isCompleted: false
    }
    
    todos.unshift(newObj)
    
    renderTodos(todos, list)

    window.localStorage.setItem('todos', JSON.stringify(todos))
    
    input.value = null
})