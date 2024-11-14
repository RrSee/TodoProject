let accesToken = null
const loginButton = document.getElementById("button2")
const registerLogButton = document.getElementById("button1")
const emailInput = document.getElementById("input1")
const passwordInput = document.getElementById("input2")


const Login = async (email, password) => {
    const response = await fetch("http://localhost:5001/users/login", {
        method : "POST",
        headers : {
            "Content-Type": 'application/json'
        },
        body: JSON.stringify({
            email: email,
            password: password
        })
    })

    if(response.ok) {
        alert("Succesfully Login")
        const data = await response.json()
        accesToken = data.token;
        localStorage.setItem('accesToken',accesToken) // local storage-e setItem edirik ki, todo-da local storage-den goturek.
        console.log("saved");
        window.location.href = "todo.html"
    }
    else {
        alert("Wrong Email or Password")
    }
}


loginButton.addEventListener("click", () => {
    let email = emailInput.value
    let password = passwordInput.value
    Login(email,password)
})

registerLogButton.addEventListener("click", () => {
    window.location.href = "register.html"
})