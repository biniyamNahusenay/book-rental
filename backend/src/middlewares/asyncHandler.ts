import { Request, Response, NextFunction } from 'express';

// Define the type for the async function that will be passed to the handler
type AsyncFunction = (req: Request, res: Response, next: NextFunction) => Promise<any>;

const asyncHandler = (fn: AsyncFunction) => (req: Request, res: Response, next: NextFunction): void => {
    Promise.resolve(fn(req, res, next)).catch((error) => {
        res.status(500).json({ message: error.message });
    });
};

export default asyncHandler;