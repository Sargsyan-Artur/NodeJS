import express, {NextFunction, Request, Response} from "express"
import * as Joi from 'joi'
import {groupController} from "../controllers/group.controller";
import {
    createValidator
} from 'express-joi-validation'
import {login} from "../middlewares/authorization";
const validator = createValidator()


const bodySchema = Joi.object({
    name: Joi.string().required(),
    permissions: Joi.array(),
})

const router = express.Router();

router.get("/",  (req: Request, res: Response, next: NextFunction) =>
     groupController.getGroups(req, res, next)
)
router.post("/", [validator.body(bodySchema), login], (req: Request, res: Response, next: NextFunction) =>
    groupController.createGroup(req, res, next)
)
router.get("/id/:id?", login, (req: Request, res: Response, next: NextFunction) =>
    groupController.getGroup(req, res, next)
)
router.put("/update/:id", login, (req: Request, res: Response, next: NextFunction) =>
    groupController.updateGroup(req, res, next)
)
router.delete("/delete/:id", login, (req: Request, res: Response, next: NextFunction) =>
    groupController.deleteGroup(req, res, next)
)

export default router
