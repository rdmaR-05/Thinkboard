import express from "express"
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import notesroutes from "./routes/notesroutes.js";
import { connectDB } from "./config/db.js";
import rateLimiter from "./middleware/ratelimiter.js";

dotenv.config();
const PORT = process.env.PORT || 5001


const app = express() // middleware hai yeh jo JSON bodies ko parse karega : req.body
const __dirname = path.resolve();
app.use(express.json());
if(process.env.NODE_ENV!=="production"){
    app.use(cors({
        origin: "http://localhost:5173",
    }));
}
app.use(rateLimiter);
// app.use((req,res,next)=>{
//     console.log(`Req method is ${req.method} & Req URL is ${req.url}`);
//     next();

// });
app.use("/api/notes",notesroutes);
if(process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname,"../frontend/dist")));
    app.get("*",(req,res)=>{
        res.send(path.join(__dirname,"../frontend/dist","index.html"))
    });
}

connectDB().then(()=>{
    app.listen(PORT,()=>{
    console.log("server startesd on port : ${PORT}",PORT);

    });
});
