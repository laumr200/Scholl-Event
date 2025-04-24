import Admin from "./Admin.js";
import Evenement from "./Evenement.js";
import Etudiant from "./Etudiant.js";

// Relations entre les entités

// Relation entre Administrateur et Evenement : Un administrateur peut gérer plusieurs événements
Admin.hasMany(Evenement);
Evenement.belongsTo(Admin);

// Relation entre Etudiant et Evenement : Un étudiant peut être inscrit à plusieurs événements, un événement peut avoir plusieurs étudiants
Etudiant.belongsToMany(Evenement, {
    through: 'etudiant_evenement', 
});
Evenement.belongsToMany(Etudiant, {
    through: 'etudiant_evenement', 
});



export  { Admin , Evenement, Etudiant } ;
