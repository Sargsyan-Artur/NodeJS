import express from "express"
import * as Joi from 'joi'
import userController from "./controllers/user.controller";
import {
    ContainerTypes,
    // Use this as a replacement for express.Request
    ValidatedRequest,
    // Extend from this to define a valid schema type/interface
    ValidatedRequestSchema,
    // Creates a validator that generates middlewares
    createValidator
} from 'express-joi-validation'
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

router.post("/", validator.body(bodySchema), userController.createUser)
router.get("/id/:id?", userController.getUser)
router.get("/search", validator.query(querySchema), userController.searchUser)
router.put("/update/:id", userController.updateUser)
router.delete("/delete/:id", userController.deleteUser)


// router.post("/", validator.body(bodySchema), (req: Request, res: Response) => {
//     const body: TUser = req.body as TUser
//     const user = userService.createUser(body)
//     res.setHeader("Content-Type", "application/json").status(HTTP_STATUS.SUCCESS).json(user)
// })
//
// router.get("/id/:id?", (req: Request, res: Response) => {
//     const user = userService.getUser(req)
//     user
//         ? res.setHeader("Content-Type", "application/json")
//             .status(HTTP_STATUS.SUCCESS)
//             .json(user)
//             .send(res.locals.user)
//         : res.status(HTTP_STATUS.NOT_FOUND)
//             .send(MESSAGE.NOT_FOUND)
// })
//
// router.get("/search", validator.query(querySchema), (req: Request, res: Response) => {
//     const users = userService.searchUsers(req)
//     users
//         ? res.status(HTTP_STATUS.SUCCESS).json(users)
//         : res.status(HTTP_STATUS.NOT_FOUND).send(MESSAGE.NOT_FOUND)
// })
//
// router.put("/update/:id", (req: Request, res: Response) => {
//     const updatedUser = userService.updateUser(req)
//     updatedUser
//         ? res.status(HTTP_STATUS.SUCCESS)
//             .setHeader("Content-Type", "application/json")
//             .json(updatedUser)
//         : res.status(HTTP_STATUS.NOT_FOUND)
//             .send(MESSAGE.NOT_FOUND)
// })
//
// router.delete("/delete/:id", (req: Request, res: Response) => {
//     userService.deleteUser(req)
//         ? res.setHeader("Content-Type", "application/json")
//             .status(HTTP_STATUS.SUCCESS)
//             .send(`${req.params.id} User is ${MESSAGE.DELETED}`)
//         : res.status(HTTP_STATUS.NOT_FOUND)
//             .send(`${req.params.id} User ${MESSAGE.NOT_FOUND}`)
// })

export default router
