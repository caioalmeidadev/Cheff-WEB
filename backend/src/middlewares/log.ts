import { NextFunction, Request, Response } from "express"

export async function Log(req: Request, res: Response, next: NextFunction) {

    console.log(`${new Date()} - [${req.method}]:${req.url} : ${JSON.stringify(req.body)}`)

    return next()

}