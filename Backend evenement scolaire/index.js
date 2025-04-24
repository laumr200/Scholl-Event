import express from "express";
import cors from 'cors'
import helmet from "helmet";
import compression from "compression";
import bodyParser from "body-parser";
import dotenv from 'dotenv'
import database from "./config/connection.js";


 //database.sync({ alter: false })
   
 //import des routes
import adminRoutes from './routes/adminRoute.js'
import etudiantRoutes from './routes/etudiantRoute.js'
import evenementRoutes from './routes/evenementRoute.js'
import authRoutes from './routes/authRoute.js'

const app = express()

app.use(cors())
app.use(helmet())
app.use(compression())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// Les routes 
app.use('/api/admin', adminRoutes)
app.use('/api/etudiant', etudiantRoutes)
app.use('/api/evenement', evenementRoutes)
app.use('/api/auth', authRoutes);

app.use('/public', express.static('public'))

const PORT = dotenv.config().parsed.PORT

app.listen(PORT, () => console.log(`Le serveur tourne sur le port ${PORT}`))