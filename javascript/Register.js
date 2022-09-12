//////////////////// Variables //////////////////////////////////////
const $=document
const createAccountForm=_id('create-account-form')
/////////////// Catching Elements with functions////////////////////
function _id(tag) {
    return  $.getElementById(tag)
}
function _class(tag) {
    return $.getElementsByClassName(tag)
}
function _q(tag) {
    return $.querySelector(tag)
}
function _qAll(tag) {
    return $.querySelectorAll(tag)
}
/////////////////////////////

class Form {
    constructor() {
        this.name=_id('name')
        this.password=_id('password')
        this.email=_id('email')
    }
    clearInput(){
        this.name.value=''
        this.password.value=''
        this.email.value=''
    }
}
class User {
    constructor(name,password,email) {
        this.userId=Math.floor(Math.random()*9999)
        this.name=name
        this.password=password
        this.email=email
    }
}
class Storage {
    constructor () {
        this.dbInfo=null
        this.database=null
        this.transaction=null
        this.usersStore=null
        this.request=null
        this.allUsers=null
        this.userId=null
    }
    createTx(mode){
        this.transaction=this.dbInfo.transaction('users',mode)

        this.transaction.addEventListener('error',e=>{
            console.log('tx error',e)
        })


        this.transaction.addEventListener('complete',e=>{
            console.log('tx success',e)
        })
        return this.transaction
    }

    storeData(newUser){

        this.usersStore=this.createTx("readwrite").objectStore('users')

        this.request=this.usersStore.add(newUser)

        this.request.addEventListener('error',e=>{
            console.log('req error',e)
        })


        this.request.addEventListener('success',e=>{
            console.log('req success',e)
        })
    }



    getUsers(){

        this.usersStore=this.createTx("readonly").objectStore('users')

        this.request=this.usersStore.getAll()

        this.request.addEventListener('error',e=>{
            console.log('get error',e)
        })


        this.request.addEventListener('success',e=>{
            console.log('get success',e)
            this.allUsers=e.target.result
            ui.showUsers(this.allUsers)

        })
    }

    removeUser(){

        this.usersStore=this.createTx("readwrite").objectStore('users')

        this.request=this.usersStore.delete(Number(this.userId))

        this.request.addEventListener('error',e=>{
            console.log('remove req error',e)
        })

        this.request.addEventListener('success',e=>{
            console.log('remove req success',e)

        })
    }
}
class UI {
    constructor() {
        this.userContainer=_id('user-container')
        this.usersFragment=null
    }
    showUsers(allUsers){
        this.usersFragment=allUsers.map(user=>{
            return `<tr ><th scope="row">${user.userId}</th><td>${user.name}</td><td>${user.password}</td><td>${user.email}</td><td><button class="btn btn-danger" data-userId="${user.userId}">Remove</button></td></tr>`
        }).join('')
        this.userContainer.insertAdjacentHTML('beforeend',this.usersFragment)
    }

}




let form=new Form()
let storage=new Storage()
let ui=new UI()

export {createAccountForm,form,User,storage,ui}