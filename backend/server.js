//Importing dependencies
const express = require("express")
const socketBackend = require("./socketManager")

const app = express();
const mongoose = require('mongoose');
const cors = require("cors")



//Importing Routes
const UserRoute = require("./routes/userRoute")
const MessagesUserRouter = require("./routes/messagesRoute")



//Static files setup
app.use(express.static("public"))

app.use(express.urlencoded({ extended: true }))

//cors
app.use(cors())


// parse application/json
app.use(express.json())

//Setting Route Middlewares
app.use("/user", UserRoute)
app.use("/messages", MessagesUserRouter)


//Database Connection Connect to mongoose
mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost/chatApp', {
    useNewUrlParser: true,
    useFindAndModify: false

})
    .then(() => console.log('MongoDB Connected...'))
    .catch(err => console.log(err));


//Setting-up the port

const port = process.env.PORT || 5000;
const server = app.listen(port, () => console.log("App is running at port " + port))

socketBackend(server)









