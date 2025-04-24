import { Etudiant, Evenement } from "../models/relation.js";
import { Op } from "sequelize";

// 1 - Inscription à un événement
export const inscriptionEvenement = async (req, res) => {
    const { etudiantId, evenementId } = req.body;
    try {
        const etudiant = await Etudiant.findByPk(etudiantId);
        const evenement = await Evenement.findByPk(evenementId);

        if (!etudiant || !evenement) {
            return res.status(404).json({ message: "Étudiant ou événement introuvable" });
        }

        await evenement.addEtudiant(etudiant);
        res.json({ message: "Inscription réussie" });
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de l'inscription", error });
    }
};

// 2 - Affichage des événements auxquels un étudiant est inscrit
export const mesEvenements = async (req, res) => {
    console.log("📥 Requête reçue avec paramètres :", req.params);
    const { etudiantId } = req.params;

    try {
        const etudiant = await Etudiant.findByPk(etudiantId, {
            include: { model: Evenement, through: { attributes: [] } }
        });

        if (!etudiant) {
            return res.status(404).json({ message: "Étudiant introuvable" });
        }

        return res.json(etudiant.Evenements || []);
    } catch (error) {
        console.error("❌ Erreur serveur :", error);
        return res.status(500).json({ message: "Erreur lors de la récupération des événements", error: error.message });
    }
};


export const annulerInscription = async (req, res) => {
    const { etudiantId, evenementId } = req.params;
    try {
        const etudiant = await Etudiant.findByPk(etudiantId);
        const evenement = await Evenement.findByPk(evenementId);

        if (!etudiant || !evenement) {
            return res.status(404).json({ message: "Étudiant ou événement introuvable" });
        }

        await evenement.removeEtudiant(etudiant);
        return res.json({ message: "Inscription annulée" });
    } catch (error) {
        return res.status(500).json({ message: "Erreur lors de l'annulation de l'inscription", error: error.message });
    }
};


export const rechercherParCategorie = async (req, res) => {
    const { categorie } = req.query;

    if (!categorie) {
        return res.status(400).json({ message: "Veuillez entrer une catégorie." });
    }

    try {
        const evenements = await Evenement.findAll({
            where: {
                categorie: { [Op.like]: `%${categorie}%` } // Recherche partielle
            }
        });

        if (evenements.length === 0) {
            return res.status(404).json({ message: "Aucun événement trouvé pour cette catégorie." });
        }

        res.json(evenements);
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la recherche des événements", error });
    }
};
