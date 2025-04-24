
import {Router}  from "express";
import { 
    creerEvenement, 
    modifierEvenement, 
    supprimerEvenement, 
    listeParticipants, 
    envoyerMessage, 
    evenementsPasses, 
    evenementsAVenir 
} from "../controllers/adminController.js";
import  {verifierAdmin}  from "../controllers/adminController.js"; 


const route = Router();

route.post('/creer',verifierAdmin, creerEvenement)
    .put('/modifier/:id',verifierAdmin, modifierEvenement)
    .delete('/supprimer/:id',verifierAdmin, supprimerEvenement)
    .get('/participants/:id', listeParticipants)
    .post('/envoyerMessage/:id', envoyerMessage)
    .get('/passes', evenementsPasses)
    .get('/avenir', evenementsAVenir);

export default route
