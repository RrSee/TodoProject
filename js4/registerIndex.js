const registerButton = document.getElementById("button1")
const userInput = document.getElementById("input1")
const emailInput = document.getElementById("input2")
const passwordInput = document.getElementById("input3")

const Register = async (name, email, pass) => {
    const response = await fetch("http://localhost:5001/users/register", {
        method: "POST",
        body: JSON.stringify({
            username: name,
            email: email,
            password: pass
        }),
        headers: {
            "Content-Type": 'application/json'
        }
    })

    console.log(JSON.stringify({
        username: name,
        email: email,
        password: pass
    }));

    if (response.ok) {
        alert("Register Succesfully");
    } else {
        const errorData = await response.json();
        console.error("Error:", errorData);
        alert("Bad Register: " + errorData.message);
    }
}

registerButton.addEventListener("click",() => {
    let username = userInput.value
    let email = emailInput.value
    let password = passwordInput.value
    Register(username,email,password)
})