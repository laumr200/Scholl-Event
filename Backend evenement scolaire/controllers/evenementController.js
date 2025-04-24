import {Evenement} from "../models/relation.js";

// 1 - Liste des événements
export const listeEvenements = async (req, res) => {
    try {
        const evenements = await Evenement.findAll();
        res.json(evenements);
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la récupération des événements", error });
    }
};

// 2 - Détails d'un événement
export const detailsEvenement = async (req, res) => {
    const { id } = req.params;
    try {
        const evenement = await Evenement.findByPk(id);
        if (!evenement) {
            return res.status(404).json({ message: "Événement introuvable" });
        }
        res.json(evenement);
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la récupération de l'événement", error });
    }
};
