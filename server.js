const express = require("express")
const mongoose = require("mongoose")
var userRoutes = require('./routes/UserRoutes')
var empRoutes = require('./routes/EmpRoutes')

const app = express()
const v1api = express()

const SERVER_PORT = 3032

const DB_CONNECTION_STRING = "mongodb+srv://admin:adminpassword@cluster0.ssteqer.mongodb.net/COMP3123_Assignment1?retryWrites=true&w=majority";

app.use(express.json());
app.use(express.urlencoded({extended: true}));

mongoose.connect(DB_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Successfully connected to the database inside mongoDB Atlas Server");    
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});


v1api.use('/emp', empRoutes)
v1api.use('/user', userRoutes)
app.use('/api/v1', v1api)


//http://localhost:3032/
app.route("/").get((req, res) => {
    res.send("<h1>COMP3123 - Assignment 1</h1>")
})

app.listen(SERVER_PORT, () => {
    console.log(`Server running at http://localhost:${SERVER_PORT}/`);
});