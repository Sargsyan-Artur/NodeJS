import userController from "../controllers/user.controller";
import {NextFunction, Request, Response} from "express"
import {UserService} from "../services/user.service";
import {TUser} from "../types/user.type";
import {UserModel} from "../entity/user.model";

const userMockModel = {
     findById(id: string) {

     },
     create(user: TUser) {

     },
     remove(id: string) {
     },
     update(id: string, newUser: TUser) {

     },

     search(limit: number, login: string) {

     },
     login(name: string, password: string) {

     },
}
const userModelMock =  UserModel as jest.MockedClass<typeof UserModel>;

UserModel.create.mockImplementation(() => {
    return { "foo": "bar" };
});
// const userService = new UserService(userMockModel as UserModel)

jest.mock('../entity/user.model', () => () => ({
    create(user: TUser) {
        return "aaaa"
    },
    strings: {
        polish: {
            agree: 'tak',
            disagree: 'nie',
        },
        malaysian: {
            agree: 'ya',
            disagree: 'tidak',
        },
    },
}));

describe("user controller", () => {
    it("user controller", async () => {
        const req = {
            body: {
                name: "name",
                password: "pass"
            }}
        const res = {}
        const next = {}
        const exp = [{}]
        const createUser = userController.createUser(req as Request, res as Response, next as NextFunction)
        console.log("createUser==", await createUser)
    })

})

export {}
