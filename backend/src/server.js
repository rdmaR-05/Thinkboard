import express from "express"
import cors from "cors";
import dotenv from "dotenv";

import notesroutes from "./routes/notesroutes.js";
import { connectDB } from "./config/db.js";
import rateLimiter from "./middleware/ratelimiter.js";

dotenv.config();
const PORT = process.env.PORT || 5001

const app = express() // middleware hai yeh jo JSON bodies ko parse karega : req.body
app.use(express.json());
app.use(cors({
    origin: "http://localhost:5173",
}
));
app.use(rateLimiter);
// app.use((req,res,next)=>{
//     console.log(`Req method is ${req.method} & Req URL is ${req.url}`);
//     next();

// });
app.use("/api/notes",notesroutes);

connectDB().then(()=>{
    app.listen(PORT,()=>{
    console.log("server startesd on port : ${PORT}",PORT);

    });
});
