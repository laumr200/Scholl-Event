
import database from "../config/connection.js";
import { DataTypes } from "sequelize";

const Admin = database.define("Admin", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    nom: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    mot_de_passe: { type: DataTypes.STRING, allowNull: false },
    role: { type: DataTypes.STRING, defaultValue: "Admin" } // Un seul administrateur
}, { timestamps: false });

export default Admin;