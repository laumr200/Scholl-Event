import { useState } from "react";
import "../styles/signup.css"; 
import { useNavigate } from "react-router-dom";  // Pour la redirection

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "Etudiant",  // Valeur par défaut à "Etudiant"
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);  // Pour gérer l'état de chargement
  const [successMessage, setSuccessMessage] = useState("");  // Pour gérer le message de succès
  const navigate = useNavigate();  // Pour la redirection après la création du compte

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = "Le nom est requis";
    if (!formData.email) {
      newErrors.email = "L'email est requis";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "L'email est invalide";
    }
    if (!formData.password) {
      newErrors.password = "Le mot de passe est requis";
    } else if (formData.password.length < 6) {
      newErrors.password = "Le mot de passe doit contenir au moins 6 caractères";
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Les mots de passe ne correspondent pas";
    }
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    setLoading(true);  // Afficher le chargement pendant l'envoi

    // Envoi des données à l'API
    fetch("http://localhost:3000/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nom: formData.name,
        email: formData.email,
        mot_de_passe: formData.password,
        role: formData.role,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message) {
          if (data.message === "Un administrateur existe déjà.") {
            setErrors({ role: data.message });
          } else if (data.message === "Cet email est déjà utilisé.") {
            setErrors({ email: data.message });
          } else {
            // Afficher le message de succès avant de rediriger
            setSuccessMessage("Utilisateur créé avec succès !");
            // Rediriger après 3 secondes
            setTimeout(() => {
              navigate("/Login");  // Rediriger vers la page de connexion
            }, 3000);
          }
        }
      })
      .catch((error) => {
        console.error("Erreur:", error);
        setErrors({ general: "Une erreur est survenue, veuillez réessayer." });
      })
      .finally(() => setLoading(false));  // Masquer le chargement après l'envoi
  };

  return (
    <div className="signup-container">
      <div className="signup-card">
        <h2>Créer un compte</h2>
        <form onSubmit={handleSubmit} noValidate>
          <div className="form-group">
            <label htmlFor="name">Nom complet</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            {errors.name && <span className="error">{errors.name}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            {errors.email && <span className="error">{errors.email}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="role">Role</label>
            <select
              id="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              required
            >
              <option value="Admin">Admin</option>
              <option value="Etudiant">Étudiant</option>
            </select>
            {errors.role && <span className="error">{errors.role}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="password">Mot de passe</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            {errors.password && <span className="error">{errors.password}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Confirmer le mot de passe</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
            {errors.confirmPassword && (
              <span className="error">{errors.confirmPassword}</span>
            )}
          </div>

          <button type="submit" className="signup-button" disabled={loading}>
            {loading ? "Chargement..." : "S'inscrire"}
          </button>

          {errors.general && <span className="error">{errors.general}</span>}
        </form>

        {/* Affichage du message de succès */}
        {successMessage && <div className="success-message">{successMessage}</div>}
      </div>
    </div>
  );
};

export default Signup;
