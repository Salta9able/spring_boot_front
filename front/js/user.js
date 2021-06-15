let code = window.localStorage.getItem("code")
let user_name = document.getElementById("td_name")
let user_email = document.getElementById("td_email")
let user_occupation = document.getElementById("td_occupation")
let logout = document.getElementById("logout_user")

window.onload = fetch("http://localhost:8080/user", {
    method:'GET',
    headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Basic ' + code
        }
})
.then((resp) => resp.json())
.then(data => {
    let {name, occupation,email} = data.principal
    user_name.textContent = name
    user_email.textContent = email
    user_occupation.textContent = occupation
})

logout.addEventListener("click", (e) => {
    e.preventDefault()
    window.localStorage.removeItem("code")
    window.location.href = "/login.html"
})