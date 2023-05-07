const express = require("express"),
app = express(),
mongoose = require("mongoose");
const path = require("path");
userRoutes = require("./routes/user");
// const {MONGOURI} = require('./config/keys')
const dotenv = require('dotenv');
dotenv.config();

const morgan = require("morgan");
var cors = require('cors');
app.use(morgan("dev"));
app.use(express.json());
app.use(cors());

// Connect to database mongoose atlas online/realtime
try {
mongoose.connect(process.env.MONGOURI, {
useUnifiedTopology: true,
useNewUrlParser: true
});
console.log("connected to db");
} catch (error) {
handleError(error);
}



process.on('unhandledRejection', error => {
console.log('unhandledRejection', error.message);
});
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({
extended: true
}));
//using user route
app.use("/api",userRoutes);
//setup server to listen on port 8080



app.use(express.static(path.join(__dirname, "./client/build")))

app.get("*", (req, res) => {
    res.sendFile(
        path.join(__dirname, "./client/build/index.html"),
        function (err) {
            res.status(500).send(err)
        }
    )
})

app.listen(process.env.PORT || 8080, () => {
    console.log("Server is live on port 8080");
    })
    