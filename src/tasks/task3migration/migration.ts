import express from "express";
import bodyParser from "body-parser";
import db from "../../models"
import userRoutes from "../../routers/user.routers"

const app = express()

app.use(bodyParser.json());
app.use('/user', userRoutes);

db.sequelize.sync().then(() => {
    console.log("listneing")

    app.listen("3001")
})
