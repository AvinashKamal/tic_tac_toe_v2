import createError from 'http-errors'
import express, {Request, Response, NextFunction} from 'express'
import * as path from 'path'

const app = express();

app.use(function (req: Request, res: Response, next: NextFunction) {
    next(createError(404));
});

export default app;
