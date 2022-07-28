import express, {Request, Response, NextFunction} from "express"
import * as Joi from 'joi'
import {createValidator} from 'express-joi-validation'
import userController from "../controllers/user.controller";
import {timestamps} from "../middlewares/loggers";
import {login} from "../middlewares/authorization";

const validator = createValidator()

const querySchema = Joi.object({
    substring: Joi.string().alphanum().required(),
    limit: Joi.number().max(100).required()
})

const bodySchema = Joi.object({
    name: Joi.string().required(),
    login: Joi.string(),
    password: Joi.string().min(4).alphanum().required(),
    age: Joi.number().min(4).max(130).required(),
})

const router = express.Router();

router.post("/", [login, validator.body(bodySchema)], userController.createUser)

router.get("/id/:id?",login, (req:Request, res:Response, next:NextFunction) =>
    userController.getUser(req, res, next)
)
router.get("/search", [validator.query(querySchema), login], (req:Request, res:Response, next:NextFunction) =>
    userController.searchUser(req, res, next)
)
router.put("/update/:id", login,(req:Request, res:Response, next:NextFunction) =>
    userController.updateUser(req, res, next)
)
router.delete("/delete/:id",login, (req:Request, res:Response, next:NextFunction) =>
    userController.deleteUser(req, res, next)
)

router.post("/authorization", async (req:Request, res:Response, next:NextFunction) => {

    await userController.login(req, res, next)

    const {username, password} = req.body;
    // const user = await userController.login(req, res, next)
    // console.log("userAuth=========", user)
})

export default router
