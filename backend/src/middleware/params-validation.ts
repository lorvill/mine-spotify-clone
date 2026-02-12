import { Request, Response, NextFunction } from 'express'
import z from 'zod'

export function paramsValidation<T extends z.ZodTypeAny>(schema: T) {
  return (req: Request, _res: Response, next: NextFunction) => {
    try {
      req.params = schema.parse(req.params)
      next()
    } catch (error) {
      next(error)
    }
  }
}