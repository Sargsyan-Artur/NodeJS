import express from "express"

const app = express()
import userRouter from "../../routers/user.routers"
import bp from 'body-parser'
app.use(bp.json())
app.use(bp.urlencoded({ extended: true }))


app.use("/user", userRouter)
app.listen(3000)
