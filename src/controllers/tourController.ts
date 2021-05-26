import express from 'express';
import fs from 'fs';
import { promisify } from 'util';

// local
import type { SimpleTour } from '@projectTypes/tours';

const writeFile = promisify(fs.writeFile);

export const tours: Partial<SimpleTour>[] = JSON.parse(
  fs.readFileSync(
    `${__dirname}/../../dev-data/data/tours-simple.json`,
    'utf-8',
  ),
);

export const checkId = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
  val: string,
): void => {
  if (+val >= tours.length) {
    res.status(404).json({ status: 'fail', message: 'Invalid Id' });
  } else {
    next();
  }
};

export const getTour = (req: express.Request, res: express.Response): void => {
  const { tourId } = req.params;
  const requestedTour = tours.find((tour) => tour.id === +tourId);
  // tourId*1 to convert

  res.status(200).json({ status: 'success', data: { tour: requestedTour } });
};

export const getAllTours = (
  req: express.Request,
  res: express.Response,
): void => {
  res
    .status(200)
    .json({ status: 'success', results: tours.length, data: { tours } });
};
export const checkBody = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
): void => {
  const { name, price } = req.body;
  if (name && price > 0) {
    next();
  } else {
    res.status(400).json({ status: 'fail', message: 'No price or name' });
  }
};
export const createTour = async (
  req: express.Request,
  res: express.Response,
): Promise<void> => {
  const newId = tours.length;
  const newTour = { ...req.body, id: newId } as Partial<SimpleTour>;
  tours.push(newTour);
  try {
    await writeFile(
      `${__dirname}/dev-data/data/tours-simple.json`,
      JSON.stringify(tours),
    );
    res.status(201).json({ status: 'success', data: { tour: newTour } });
  } catch (err) {
    res.status(400).json({ status: 'err', message: err.message });
  }
};

export const updateTour = async (
  req: express.Request,
  res: express.Response,
): Promise<void> => {
  const { tourId } = req.params;

  const updatedTours = tours.map((tour) => {
    if (tour.id !== +tourId) {
      return tour;
    }
    return { ...tour, ...req.body };
  });
  try {
    await writeFile(
      `${__dirname}/dev-data/data/tours-simple.json`,
      JSON.stringify(updatedTours),
    );
    res
      .status(200)
      .json({ status: 'success', data: { tour: updatedTours[+tourId] } });
  } catch (err) {
    res.status(500).json({
      status: 'fail',
      message: 'Could not update \nInternal Server error',
    });
  }
};

export const deleteTour = async (
  req: express.Request,
  res: express.Response,
): Promise<void> => {
  const { tourId } = req.params;

  const updatedTours = tours.filter((tour) => tour.id !== +tourId);
  try {
    await writeFile(
      `${__dirname}/dev-data/data/tours-simple.json`,
      JSON.stringify(updatedTours),
    );
    res.status(204).json({ status: 'success', data: null });
  } catch (err) {
    res.status(500).json({
      status: 'fail',
      message: 'Could not delete \nInternal Server error',
    });
  }
};
