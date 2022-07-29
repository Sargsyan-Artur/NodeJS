import express from "express"
import * as Joi from 'joi'
import userController from "../controllers/user.controller";
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

export default router
