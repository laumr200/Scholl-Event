import { Router } from "express";
import { 
    inscriptionEvenement, 
    mesEvenements, 
    annulerInscription, 
    rechercherParCategorie 
} from "../controllers/etudiantController.js";

const route = Router();

route.post('/inscription', inscriptionEvenement)
    .get('/mesevenements/:etudiantId', mesEvenements)
    .delete('/annulerInscription/:etudiantId/:evenementId', annulerInscription)
    .get('/recherchercategorie', rechercherParCategorie);

export default route
