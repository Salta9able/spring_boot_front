const getById = (id) => {
    return document.getElementById(id)
}

const loginForm = getById("login_form")
const loginName = getById("login_name")
const loginPassword = getById("login_password")


loginForm.addEventListener("submit", (e) => {
    e.preventDefault()
    let userName = loginName.value
    let userPassword = loginPassword.value
    
    let code = window.btoa(`${userName}:${userPassword}`)
    window.localStorage.setItem("code", code)


    fetch("http://localhost:8080/user", {
        method:'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Basic ' + code
        }
    })
    .then(resp => resp.json())
    .then(data => {
        if (data.authorities[0].authority == "ROLE_USER") {
            window.location.href = "/user.html"
        }
        if (data.authorities[0].authority == "ROLE_ADMIN"){
            window.location.href = "/index.html"
        }
    })
    .catch((e) => alert("wrong user"))
})
