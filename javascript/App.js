import {createAccountForm,form,User,storage,ui} from "./Register.js";


window.addEventListener('load',()=>{


    storage.database=indexedDB.open('hydraco',17)

    storage.database.addEventListener('error',e=>{
        console.log(e)
    })

    storage.database.addEventListener('success',e=>{
        storage.dbInfo=e.target.result
        storage.getUsers()
        console.log('success')
    })


    storage.database.addEventListener('upgradeneeded',e=>{
        storage.dbInfo=e.target.result
        if(!storage.dbInfo.objectStoreNames.contains('users')){
            storage.dbInfo.createObjectStore('users',{
                keyPath:'userId'
            })
        }
        // if(storage.dbInfo.objectStoreNames.contains('users')){
        //     storage.dbInfo.deleteObjectStore('users')
        // }

        console.log(storage.dbInfo.objectStoreNames)
    })



})

const createAccountHandler = e => {
    e.preventDefault()

    let newUser=new User(form.name.value,form.password.value,form.email.value)

    storage.storeData(newUser)

    ui.userContainer.innerHTML=''

    storage.getUsers()

    form.clearInput()

}

ui.userContainer.addEventListener('click',e=>{
    if(e.target.tagName==='BUTTON'){
        storage.userId=e.target.dataset.userid
        e.target.parentElement.parentElement.remove()
        storage.removeUser()
    }
})






createAccountForm.addEventListener('submit',createAccountHandler)
