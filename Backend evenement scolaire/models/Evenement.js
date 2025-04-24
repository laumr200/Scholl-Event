import database from "../config/connection.js";
import { DataTypes } from "sequelize";

const Evenement = database.define("Evenement", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    titre: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.TEXT, allowNull: false },
    date: { type: DataTypes.DATE, allowNull: false },
    heure: { type: DataTypes.TIME, allowNull: false },
    lieu: { type: DataTypes.STRING, allowNull: false },
    categorie: { type: DataTypes.STRING, allowNull: false },
    limite_participants: { type: DataTypes.INTEGER, allowNull: false ,  defaultValue: 50}
}, { timestamps: false });

export default Evenement;
