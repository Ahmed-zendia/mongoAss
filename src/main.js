import express from 'express'
import { bookController , logController } from './modules/index.js';
import { globalErrorHandling } from './middelware/index.js';
import { successResponse } from './common/utils/index.js';
import { bootsrapDB } from './DB/connection.db.js';
import { PORT } from './config.js';


const app = express()
bootsrapDB(app,PORT)

app.get('/', (req, res) => res.send('Hello World!'))

app.use(express.json());
app.use('/collection/books', bookController);
app.use('/books', bookController);
app.use('/collection/logs', logController);
app.use('/logs', logController);

app.use(globalErrorHandling);
app.use(successResponse);
app.all('{/*dummy}', (req, res) => {
    res.status(404).json({
        message : "Route not found"
    })
})
