import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import Admin from "../models/Admin.js";
import Etudiant from "../models/Etudiant.js";

dotenv.config();
const SECRET_KEY = process.env.CODE_SECRET || "secret_key";

// Inscription d'un utilisateur (Admin ou Étudiant)
export const register = async (req, res) => {
    try {
        const { nom, email, mot_de_passe, role } = req.body;
        const emailLower = email.toLowerCase();

        // Vérifie si l'email existe déjà
        const existingAdmin = await Admin.findOne({ where: { email: emailLower } });
        const existingEtudiant = await Etudiant.findOne({ where: { email: emailLower } });

        if (existingAdmin || existingEtudiant) {
            return res.status(400).json({ message: "Cet email est déjà utilisé." });
        }

        // Si c'est un admin, vérifier s'il y en a déjà un
        if (role === "Admin") {
            const adminCount = await Admin.count();
            if (adminCount > 0) {
                return res.status(403).json({ message: "Un administrateur existe déjà." });
            }

            // Hashage du mot de passe et création de l'admin
            const hashedPassword = await bcrypt.hash(mot_de_passe, 10);
            const newAdmin = await Admin.create({ nom, email: emailLower, mot_de_passe: hashedPassword, role: "Admin" });
            return res.status(201).json({ message: "Administrateur créé avec succès." });
        } 

        // Si c'est un étudiant, création d'un compte étudiant
        const hashedPassword = await bcrypt.hash(mot_de_passe, 10);
        const newEtudiant = await Etudiant.create({ nom, email: emailLower, mot_de_passe: hashedPassword, role: "Etudiant" });
        return res.status(201).json({ message: "Étudiant créé avec succès." });
    
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de l'inscription", error });
    }
};

// Connexion d'un utilisateur (Admin ou Étudiant)
export const login = async (req, res) => {
    try {
        console.log("🔵 Requête reçue :", req.body);
        
        const { email, mot_de_passe } = req.body;
        const emailLower = email.toLowerCase();

        let user = await Admin.findOne({ where: { email: emailLower } });
        let role = "Admin";

        if (!user) {
            user = await Etudiant.findOne({ where: { email: emailLower } });
            role = "Etudiant";
        }

        if (!user) {
            console.log("❌ Utilisateur non trouvé !");
            return res.status(404).json({ message: "Utilisateur non trouvé." });
        }

        console.log("✅ Utilisateur trouvé :", user.email);

        // Vérification du mot de passe
        const isMatch = await bcrypt.compare(mot_de_passe, user.mot_de_passe);
        if (!isMatch) {
            console.log("❌ Mot de passe incorrect !");
            return res.status(401).json({ message: "Mot de passe incorrect." });
        }

        console.log("🔑 Génération du token...");

        // Génération du token JWT
        const token = jwt.sign(
            { id: user.id, role },
            SECRET_KEY,
            { expiresIn: "2h" }
        );

        console.log("✅ Connexion réussie !");
        res.json({
            message: "Connexion réussie.",
            token,
            user: {
                id: user.id,
                nom: user.nom,
                email: user.email,
                role
            },
            role
        });
    } catch (error) {
        console.error("❌ Erreur serveur :", error);
        if (error.name === "TokenExpiredError") {
            return res.status(401).json({ message: "⏳ Token expiré, veuillez vous reconnecter." });
        } else if (error.name === "JsonWebTokenError") {
            return res.status(403).json({ message: "❌ Token invalide." });
        }
        res.status(500).json({ message: "Erreur lors de la connexion", error });
    }
};
