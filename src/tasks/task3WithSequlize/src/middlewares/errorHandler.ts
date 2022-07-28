export function errorHandler (err:any, req: any, res: any, next: any) {
    if (err) {
        console.log("error is here")
        res.status(500).json({key: "smt BROKEN"})
        return next(err)
    }
}
