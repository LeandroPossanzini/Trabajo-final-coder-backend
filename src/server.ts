import express from "express";
import cors from "cors";
import compression from "compression";
import { createServer } from "http";
import enviroment from './config/enviroments';

if(process.env.NODE_ENV !== "production"){
    const env = enviroment;
    console.log(env)
}


async function init() {
        
    const app = express();


    app.use(cors());

    app.use(compression())

    app.get("/", (req,res) =>{
        res.send("API -online")
    });
    const PORT = process.env.PORT || 2002
    const httpServer = createServer(app)
    httpServer.listen(
        {
            port:PORT,
        },
        () => console.log("server ok")
        
    );

};

init()