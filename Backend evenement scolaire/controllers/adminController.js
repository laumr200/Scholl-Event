import { Op } from "sequelize";
import { Evenement, Etudiant, Admin } from "../models/relation.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";

dotenv.config();
const SECRET_KEY = process.env.CODE_SECRET || "secret_key";

// Middleware pour vérifier si l'utilisateur est un admin
export const verifierAdmin = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    console.log("🛠️ Headers reçus:", req.headers);

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(403).json({ message: "⚠️ Accès interdit : Aucun token fourni" });
    }

    const token = authHeader.split(" ")[1];
    console.log("🔑 Token reçu:", token);

    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        console.log("✅ Token décodé:", decoded);

        if (decoded.role !== 'Admin') {
            return res.status(403).json({ message: "Accès interdit : Vous n'êtes pas administrateur" });
        }

        req.user = decoded;
        next();
    } catch (error) {
        console.error("❌ Erreur de vérification du token:", error);
        return res.status(403).json({ message: "Token invalide" });
    }
};

// Créer un événement
export const creerEvenement = async (req, res) => {
    try {
        const { titre, description, date, heure, lieu, categorie, limite_participants } = req.body;
        console.log("📩 Requête reçue:", req.body);

        if (!titre || !description || !date || !heure || !lieu || !categorie || limite_participants === undefined) {
            return res.status(400).json({ message: "Tous les champs sont requis, y compris 'limite_participants'." });
        }

        const evenement = await Evenement.create({ titre, description, date, heure, lieu, categorie, limite_participants });
        res.status(201).json({ message: "Événement créé avec succès", evenement });
    } catch (error) {
        console.error("❌ Erreur lors de la création de l'événement:", error);
        res.status(500).json({ message: "Erreur lors de la création de l'événement", error });
    }
};

// 2- Modifier un événement
export const modifierEvenement = [verifierAdmin, async (req, res) => {
    const { id } = req.params;
    const { titre, description, date, heure, lieu, categorie, limite_participants } = req.body;

    try {
        // Mise à jour des champs de l'événement, y compris la limite de participants
        await Evenement.update(
            { titre, description, date, heure, lieu, categorie, limite_participants },
            { where: { id } }
        );
        
        res.json({ message: "Événement modifié avec succès" });
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la modification de l'événement", error });
    }
}];


// 3- Supprimer un événement
export const supprimerEvenement = [verifierAdmin, async (req, res) => {
    const { id } = req.params;
    try {
        await Evenement.destroy({ where: { id } });
        res.json({ message: "Événement supprimé avec succès" });
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la suppression de l'événement", error });
    }
}];

// 4- Liste des participants à un événement
// 4- Liste des participants à un événement
export const listeParticipants = async (req, res) => {
    const { id } = req.params;  // Récupère l'ID de l'événement à partir des paramètres
    try {
        // Vérifier d'abord si l'événement existe
        const evenement = await Evenement.findByPk(id);

        if (!evenement) {
            return res.status(404).json({ message: "⚠️ Événement non trouvé." });
        }

        // Charger les étudiants associés à cet événement
        const evenementAvecParticipants = await Evenement.findByPk(id, {
            include: {
                model: Etudiant, 
                through: { attributes: [] }  // Ne récupérer que les étudiants liés
            }
        });

        if (!evenementAvecParticipants || !evenementAvecParticipants.Etudiants.length) {
            return res.status(404).json({ message: "⚠️ Aucun participant trouvé pour cet événement." });
        }

        res.json(evenementAvecParticipants.Etudiants);
    } catch (error) {
        console.error("❌ Erreur lors de la récupération des participants :", error);
        res.status(500).json({ message: "Erreur serveur lors de la récupération des participants.", error });
    }
};


// 5- Envoyer un message aux participants
export const envoyerMessage = async (req, res) => {
    const { id } = req.params;
    const { message } = req.body;
    try {
        const evenement = await Evenement.findByPk(id, { include: Etudiant });
        
        // Simuler l'envoi du message
        evenement.etudiants.forEach(etudiant => {
            console.log(`Message envoyé à ${etudiant.email}: ${message}`);
        });
        res.json({ message: "Messages envoyés avec succès" });
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de l'envoi des messages", error });
    }
};

// 6- Voir les événements passés
export const evenementsPasses = [verifierAdmin, async (req, res) => {
    try {
        const evenements = await Evenement.findAll({ where: { date: { [Op.lt]: new Date() } } });
        res.json(evenements);
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la récupération des événements passés", error });
    }
}];

// 7- Voir les événements à venir
export const evenementsAVenir = [verifierAdmin, async (req, res) => {
    try {
        const evenements = await Evenement.findAll({ where: { date: { [Op.gt]: new Date() } } });
        res.json(evenements);
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la récupération des événements à venir", error });
    }
}];
