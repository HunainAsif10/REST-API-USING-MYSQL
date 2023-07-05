import express from "express"
import cors from "cors"
import { PORT } from "./config/config.js"
import { connectToDb } from "./db.js"
import userRoute from "./routes/user.route.js"
const app=express()
connectToDb()

app.use(express.json())
app.use(cors())


app.use("/users",userRoute)


app.listen(PORT,()=>{
    console.log(`Server is listening on port ${PORT}`)
})