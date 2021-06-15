const URL = "http://localhost:8080/admin/users"
const getById = (id) => {
    return document.getElementById(id)
}

let code = window.localStorage.getItem("code")
let logout = document.getElementById("logout_user")

const table = getById("table")
const formNewUser = getById("form_newuser")
const newUserName = getById("newuser_name")
const newUserPassword = getById("newuser_password")
const newUserEmail = getById("newuser_email")
const newUserOccupation = getById("newuser_occupation")
const newUserIsAdmin = getById("newuser_is_admin")
const newUserIsUser = getById("newuser_is_user")

const editUserName = getById("edituser_name")
const editUserPassword = getById("edituser_password")
const editUserEmail = getById("edituser_email")
const editUserOccupation = getById("edituser_occupation")
const editUserIsAdmin = getById("edituser_is_admin")
const editUserIsUser = getById("edituser_is_user")
const formEditUser = getById("form_edituser")



const getUserRoles = (admin,user) => {
    let roles = []
    if (admin.checked) {
        roles.push({id: 1, role: "ADMIN"})
    }
    if (user.checked) {
        roles.push({id:2, role: "USER"})
    }
    return roles
}

let checkRole = (roles, role) => {
    if (roles.length > 1) {
        if (roles.map(role => role.name).includes(role)){
            return role
        }
    }
    if (roles[0].name == role) {
        return role
    }
}


const handleDelete = (id) => {
    fetch(URL+"/" + id, {
        method: 'DELETE',
        headers: {
            'Content-type': 'application/json', 
            'Access-Control-Allow-Origin': 'no-cors',
            'Authorization': 'Basic ' + code
        }
    })
}


const handleEdit = (userInfo) => {
    editUserName.value = userInfo.name
    editUserOccupation.value = userInfo.occupation
    editUserEmail.value = userInfo.email
    editUserIsAdmin.checked = userInfo.adminRole == 'ADMIN' ? true : false
    editUserIsUser.checked = userInfo.userRole == 'USER' ? true : false

    
    formEditUser.addEventListener("submit", (e) => {
        e.preventDefault()
        let roles = getUserRoles(editUserIsAdmin, editUserIsUser)
        let userData = {
            id: userInfo.id,
            password: editUserPassword.value,
            name: editUserName.value,
            email: editUserEmail.value,
            occupation: editUserOccupation.value,
            roles: roles
        }

        fetch(URL, {
            method: "PUT",
            headers: {
                "Content-type": "application/json;charset=UTF-8",
                'Authorization': 'Basic ' + code
            },
            body: JSON.stringify(userData)
        })

        window.location.href="/index.html";  
    })
}


const createUsers = (data) => {
    return data.map(user => {
        const tr = document.createElement("tr")
        let adminrole = checkRole(user.roles, 'ADMIN')
        let userrole = checkRole(user.roles, 'USER')

        tr.innerHTML =  `
                <th>${user.id}</th>
                <th>${user.email}</th>
                <th>${user.name}</th>
                <th>${user.occupation}</th>
                <th><a id="delete" data-userid=${user.id}><i class="bi bi-trash"></i></a></th>
                <th><a id="editId" 
                    data-usereditid=${user.id}
                    data-isadmin=${adminrole}
                    data-isuser=${userrole}
                    data-toggle="modal" 
                    data-target="#modal"
                ><i class="bi bi-pencil-square"></i></a></th>
            `
        return tr
    })
}

fetch(URL, {
    method: "GET",
    headers: {
                "Content-type": "application/json;charset=UTF-8",
                'Authorization': 'Basic ' + code
            }
    })
    .then(resp => resp.json())
    .then(data => createUsers(data)).then(arr => (
    arr.map(item => {
        let editElem = item.querySelector("#editId")
        let deleteElem = item.querySelector("#delete")
        let row = editElem.parentNode.parentNode.getElementsByTagName('th')
        let userId = deleteElem.dataset.userid
        let adminRole = editElem.dataset.isadmin
        let userRole = editElem.dataset.isuser
        let userInfo = {
            id: editElem.dataset.usereditid,
 
            name: row[2].textContent,
            email: row[1].textContent,
            occupation: row[3].textContent,
            adminRole,
            userRole
        }

        deleteElem.addEventListener("click", (e) => {
            e.preventDefault()
            handleDelete(userId)
            table.removeChild(item)
        })

        editElem.addEventListener("click", (e) => {
            e.preventDefault()
            handleEdit(userInfo)
        })
        table.appendChild(item)
})))

 
if (formNewUser) {
    formNewUser.addEventListener("submit", (e) => {
        e.preventDefault()
        let roles = getUserRoles(newUserIsAdmin, newUserIsUser)
        let userData = {
            name: newUserName.value,
            password: newUserPassword.value,
            email: newUserEmail.value,
            occupation: newUserOccupation.value,
            roles: roles
        }
    
    
        fetch(URL, {
            method: "POST",
            headers: {
                "Content-type": "application/json;charset=UTF-8",
                'Access-Control-Allow-Origin': 'no-cors',
                'Authorization': 'Basic ' + code
            },
            body: JSON.stringify(userData)
          })
        
          window.location.href="/index.html"
    
    })
    
}



if (logout) {
    logout.addEventListener("click", (e) => {
        e.preventDefault()
        window.localStorage.removeItem("code")
        window.location.href = "/login.html"
    })
}