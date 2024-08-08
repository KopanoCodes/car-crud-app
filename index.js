import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { countNissansFromCk, car } from './nissanfromCK.js';

const app = express();
const port = process.env.PORT || 3007;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(bodyParser.json());
app.use(cors());
app.use(express.static('public'));

// Read - Get all cars
app.get('/api/cars', (req, res) => {
  res.json(car);
});

// Read - Get a specific car by reg_number
app.get('/api/cars/:reg_number', (req, res) => {
  const { reg_number } = req.params;
  const foundCar = car.find(v => v.reg_number === reg_number);
  if (foundCar) {
    res.json(foundCar);
  } else {
    res.status(404).json({ message: 'Car not found' });
  }
});

// Create - Add a new car
app.post('/api/cars', (req, res) => {
  const newCar = req.body;
  car.push(newCar);
  res.status(201).json(newCar);
});

// Update - Update a car
app.put('/api/car/:reg_number', (req, res) => {
  const { reg_number } = req.params;
  const updatedCar = req.body;
  const index = car.findIndex(v => v.reg_number === reg_number);
  
  if (index !== -1) {
    car[index] = { ...car[index], ...updatedCar };
    res.json(car[index]);
  } else {
    res.status(404).json({ message: 'Car not found' });
  }
});

// Delete - Remove a car
app.delete('/api/car/:reg_number', (req, res) => {
  const { reg_number } = req.params;
  const index = car.findIndex(v => v.reg_number === reg_number);
  
  if (index !== -1) {
    car.splice(index, 1);
    res.status(200).json({ message: 'Car deleted' });
  } else {
    res.status(404).json({ message: 'Car not found' });
  }
});

// Count Nissans from CK
app.get('/api/nissansfromCK', (req, res) => {
  const count = countNissansFromCk();
  res.json({ count });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});