import express from "express"
const app = express();
import "dotenv/config";
import cookieParser from "cookie-parser";
import cors from "cors"
import { connectDb } from "./config/db.js";
import { router } from "./routes/userRoutes.js";

const port = process.env.PORT || 8080

// miidelwares
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())
app.use(cors({
    origin:"https://sealeditor.netlify.app/",
    credentials:true
}))


app.use("/api",router);

app.listen(port,()=>{
    console.log(`Server is running at port ${port}`);
    connectDb();
})