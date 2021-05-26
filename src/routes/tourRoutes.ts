import {
  createTour,
  deleteTour,
  getAllTours,
  getTour,
  updateTour,
  checkBody,
  checkId,
} from '@controllers/tourController';
import express from 'express';

const router = express.Router();

router.param('tourId', checkId);
router.route('/').get(getAllTours).post(checkBody, createTour);

router.route('/:tourId').get(getTour).patch(updateTour).delete(deleteTour);

export default router;
