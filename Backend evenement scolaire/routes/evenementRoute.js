import { Router } from "express";
import { 
    listeEvenements as listeEvenementsSimple, 
    detailsEvenement 
} from "../controllers/evenementController.js";

const route = Router();

route.get('/liste', listeEvenementsSimple)
    .get('/details/:id', detailsEvenement);

export default route
