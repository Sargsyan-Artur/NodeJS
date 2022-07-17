import express from "express"
import userRouter from "../task3/routers/user.routers"
import bp from 'body-parser'


const app = express()

app.use(bp.json())
app.use(bp.urlencoded({ extended: true }))


app.use("/user", userRouter)
app.listen(3000)
