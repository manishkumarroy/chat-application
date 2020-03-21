const socket = io.connect("http://localhost:3000", {
    path: "/chat"
});

const chat = document.querySelector(".chat-window")
const submit = document.querySelector(".submit")
const message = document.querySelector(".message")
const messageBox = document.querySelector(".messageBox")
const user = document.querySelector(".user")
const side = document.querySelector(".side")

//Emmiting Events

let users = []
window.onload = () => {
    socket.emit("newUser", user.innerHTML)


};
submit.addEventListener("click", (e) => {
    console.log(message)
    socket.emit('chat', {

        message: message.value,
        handle: user.innerHTML

    })

    console.log('Emitted to server')
})



socket.on("newUser", (users) => {
    let dupUsers = []
    users.forEach((user) => {
        dupUsers.push(user.name)

    })
    users = new Set(dupUsers)
    console.log(users)
    users = Array.from(users)
    users = users.filter((name) => name != user.innerHTML)
    console.log(users)


    side.innerHTML = users.map(user => ` <li class='list-group-item bg-light text-dark usersOnline' style="cursor:pointer">${user}</li>`)

    let usersOnline = document.querySelectorAll(".usersOnline");
    console.log(usersOnline)
    usersOnline.forEach((user) => {
        user.addEventListener("click", (e) => {
            console.log("working")
            let mainChat = document.querySelector(".main-chat")
            let mainShow = document.querySelector(".mainShow")
            let topBar = document.querySelector(".topBar")
            let topBarChat = document.querySelector(".topBarChat")
            let userChat = document.querySelector(".userChat")
            mainChat.style.display = "block"
            topBarChat.style.display = "block"
            mainShow.style.display = 'none'
            topBar.style.display = "none"
            userChat.innerHTML = e.target.innerHTML;
            console.log(e.target)

        })
    })
})
// Listen for events
socket.on('chat', (data) => {
    chat.innerHTML +=
        `<div  class= " bg-light card mb-2 p-1" style = 'width:40%'  >
                <span class="text-secondary">${data.handle}</span>
                <hr />
                <p> ${data.message}</p> 
</div >`

})


