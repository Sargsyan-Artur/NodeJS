import express from "express"
import * as Joi from 'joi'
import userGroupController from "../controllers/user.group.controller";
import {
    ContainerTypes,
    // Use this as a replacement for express.Request
    ValidatedRequest,
    // Extend from this to define a valid schema type/interface
    ValidatedRequestSchema,
    // Creates a validator that generates middlewares
    createValidator
} from 'express-joi-validation'
import {login} from "../middlewares/authorization";
const validator = createValidator()

const querySchema = Joi.object({
    substring: Joi.string().alphanum().required(),
    limit: Joi.number().max(100).required()
})

const bodySchema = Joi.object({
    userId: Joi.string().required(),
    groupId: Joi.string().required(),
})

const router = express.Router();

router.post("/", [validator.body(bodySchema), login], userGroupController.addUsersToGroup)

export default router
