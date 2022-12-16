//https://lo-victoria.com/build-rest-api-with-nodejs-design-and-plan-restful-api 
 
 
 
 
 
 
 
 //import mongoose
 
 const mongoose = require('mongoose');

 //establish connection to database
 mongoose.connect
 (
    'mongodb+srv://projetReact:projetReact@cluster0.mys8spf.mongodb.net/?retryWrites=true&w=majority',

    (err) => 
    {
        if (err)
        {
            console.log("Error: ", err);
        }
        console.log("MongoDB Connection -- Ready state is:", mongoose.connection.readyState);
    }
 );
 

    

const express = require("express");

const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require('cors')

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const personnesRouter = require("./routes/personnes");
const tdlRouter = require("./routes/tdl");

const app = express();

app.use(express.json());
app.use(logger("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors()) // Use this after the variable declaration

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/personnes", personnesRouter);
app.use("/tdl", tdlRouter);



module.exports = app;



