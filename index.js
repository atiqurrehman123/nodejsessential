import express from "express";
import routes from './src/routes/crmRoutes';
import mongoose from 'mongoose'
import bodyparser, { json } from 'body-parser'
import jsonwebtoken from "jsonwebtoken";


const app = express();
const port = 4000;

//mongoose connection
mongoose.Promise = global.Promise;  //this is use for waiting purpose when we connecting to db
mongoose.connect('mongodb://localhost/CRMdb', {
    useUnifiedTopology: true,
    useNewUrlParser: true,
})

//bodyparser setup use for reading url and make it for readable for program 
app.use(bodyparser.urlencoded({ extended: true }))
app.use(bodyparser.json())


// jwt setup
app.use((req, res, next) => {
    if (req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'JWT') {
        jsonwebtoken.verify(req.headers.authorization.split(' ')[1], 'RESTFULAPIs', (err, decode) => {
            if (err) req.user = undefined;
            req.user = decode;
            next()
        })  

    } else {
        req.user = undefined;
        next()
    }
})

//routes
routes(app)

//static server file
app.use(express.static("public"))

app.get('/', (req, res) => {
    res.send("how are you")
})
app.listen(4000, () => {
    console.log("listen on port 4000")
})
// --save-dev dependencies are used for making environment of Dependencies or development 
// babel-preset-env use for allow to transpile our code 
// npm i --save-dev babel-cli babel-preset-env babel-preset-stage-0