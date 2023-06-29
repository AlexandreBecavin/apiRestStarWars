import mongoose from 'mongoose';
import express from 'express';
import { films } from './route/films.js';
import { planets } from './route/planets.js';
import { peoples } from './route/peoples.js';
import { species } from './route/species.js';
import { starships } from './route/starship.js';
import { transports } from './route/transport.js';
import { vehicles } from './route/vehicle.js';
import { auth } from './route/auth.js';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

mongoose
    .connect("mongodb+srv://alex:alex@cluster0.wcagpyn.mongodb.net/?retryWrites=true&w=majority", { useNewUrlParser: true })
    .then(() => console.log('mongoDB connected.'))
    .catch((err) => console.log(err, "connection failed"));

app.use('/films', films);
app.use('/planets', planets);
app.use('/peoples', peoples);
app.use('/species', species);
app.use('/starships', starships);
app.use('/transports', transports);
app.use('/vehicles', vehicles);
app.use('/auth', auth);


app.listen(3000, () => {
    console.log("Server has started!")
})
