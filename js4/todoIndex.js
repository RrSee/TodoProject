const todos = document.querySelector(".todos")
const addButton = document.getElementById("addButton")
const inputTodo = document.getElementById("inputText")
let editMode = false;
let editId = null


const getTodos = async() => {
    const accessToken = localStorage.getItem('accesToken');
    console.log(accessToken);
    if (!accessToken) {
        console.log("Access token not found, please login.");
        return;
    }

    const response = await fetch("http://localhost:5001/todos/", {
        headers: {
            "Authorization": `Bearer ${accessToken}`
        }
    })

    const data = await response.json()
    console.log(data);

    addTodoItems(data)
}

getTodos()

const CreateNewTodo = async(todoValue) => {
    const accessToken = localStorage.getItem('accesToken'); // login hissesinde localStorage-e save elediyimiz token-i aliriq burda. Ama diqqet elemelisen loginde adin morterizede birincide nece yazmisansa burdada ele yazmalisan.
    console.log(todoValue,accessToken);
    const response = await fetch("http://localhost:5001/todos/", {
    method: "POST",
    headers: {
        "Authorization": `Bearer ${accessToken}`,
        "Content-Type": "application/json"
    },
    body: JSON.stringify({
        title: todoValue
    })

})

const data = await response.json()

console.log(data);

getTodos()
// addTodoItems(todoValue)
}

addButton.addEventListener("click", () => {
    const inputValue = inputTodo.value.trim()
    if (inputValue === "") {
        alert("Lütfen bir şeyler yazın!");
        return;
    }
    console.log(editMode);
    if (editMode == false) {
        inputTodo.value = ""
        CreateNewTodo(inputValue)
    }
    else {
        editTodo(editId,inputValue)
        addButton.innerText = "Add"
        inputTodo.value = ""
        editMode = false
    }
})

async function deleteTodo(id) {

    const token = localStorage.getItem('accesToken');
    console.log(id);
    const response = await fetch(`http://localhost:5001/todos/${id}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })
    const data = response.json()
    getTodos()
    
}

async function editTodo(id,editTodo) {
    const token = localStorage.getItem('accesToken')
    const response = await fetch(`http://localhost:5001/todos/${id}`, {
        method: "PUT",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": 'application/json'
        },
        body: JSON.stringify({
            title: editTodo
        })
    })
    getTodos()
}

const addTodoItems = (data) => {
    console.log(data);
    todos.innerHTML = ""

    data.map(item => {
        const div = document.createElement("div")
        const p = document.createElement("p")
        const deleteBtn = document.createElement("a")
        const editBtn = document.createElement("a")
        
        p.innerText = item.title
        
        div.appendChild(p)
        const divIcons = document.createElement("div")
        divIcons.classList.add("icons")
        
        deleteBtn.innerHTML = `<i class="fa fa-trash" aria-hidden="true"></i>`;
        editBtn.innerHTML = `<i class="fas fa-edit"></i>`;
        
        divIcons.appendChild(deleteBtn)
        divIcons.appendChild(editBtn)

        div.appendChild(divIcons)
        todos.appendChild(div)


        deleteBtn.addEventListener("click",() => {
            deleteTodo(item._id)
        })

        editBtn.addEventListener("click",() => {
            inputTodo.value = item.title
            editMode = true
            editId = item._id
            addButton.innerText = "Save"    
        })

    })
}

