import express from 'express'
import { errorHandler } from './middleware/errorHandler.js';
import passwordResetRouter from '../src/routes/passwordReset.routes.js'
const app = express();

app.use(express.json());
app.use(express.urlencoded());


app.get('/', (req, res)=>{
    res.status(200).json({
        msg : "Server is running"
    })
})

app.use('/api/auth', passwordResetRouter)


app.use(errorHandler)

export default app;