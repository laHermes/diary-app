import express, { Response, Request } from 'express';
import { currentUser } from '../../../middleware/current-user';

const router = express.Router();

router.get('/getuser', currentUser, (req: Request, res: Response) => {
	res.send({ user: req.user || null });
});

export { router as getUserRouter };
