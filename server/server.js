import express from "express";
import dotenv from "dotenv"
import  path  from "path";
import http from "http"
import { Server } from "socket.io"; 
import cors from 'cors'
import { fileURLToPath } from 'url';
dotenv.config({"path": "config.env"})

import userRoutes from "./Routes/userRoutes.js"
import postRoutes from "./Routes/postRoutes.js"


import { notFound , globalError } from "./MiddleWare/ErrorMiddleWare.js";
import databaseConnection from "./Config/DBConnection.js";
import cookieParser from "cookie-parser";
import { Socket } from "dgram";

const port = process.env.PORT ;

// #################### Creating app ############################ 
const app = express()


const corsOptions = {
    origin: ['http://localhost:3000' ,'http://localhost:3000/socket'],
    methods : ['GET' , 'POST'],
    credentials: true,
    optionSuccessStatus: 200
  }
  app.use(cors(corsOptions))
  

// #################### Connect to data base (MongoDb) ############################
databaseConnection()

// #################### Socket.io configuration ############################
const serverIo = http.createServer(app)
const io = new Server(serverIo ,{
    cors:{
        origin: ['http://localhost:3000'],
        methods : ['GET' , 'POST'],
        credentials: true,
        optionSuccessStatus: 200
    }
})

// #################### Make app get requests ############################
const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

app.use(express.json())

app.use(express.urlencoded({extended : true}))
app.use(express.static(path.join(__dirname, 'uploads')))
app.use(cookieParser())

// #################### Routes ############################
app.use("/seemo-gram/api/users" , userRoutes)
app.use("/seemo-gram/api/post" , postRoutes)

// #################### Global Error ############################
app.all("*" ,notFound)
app.use(globalError)


// #################### app listing ############################
io.on("connection" , (socket)=>{
    socket.on("following" ,(numberOfFollowers)=>{
        io.emit("numberOfFollowers" , numberOfFollowers)
    })
})

const server = serverIo.listen(port , ()=>{
    console.log(`server rendering on : http://localhost:${port}`)
})

// #################### Handle rejections outside express ############################
process.on("unhandledRejection" , (err)=>{
    console.log(`unhandledRejection Error : ${err}`)
    server.close(()=>{
        console.log(`app shutting down ...`)
        process.exit(1);
    })
})