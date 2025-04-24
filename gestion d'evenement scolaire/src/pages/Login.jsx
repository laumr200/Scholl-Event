import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../services/loginService"; // Assure-toi que cette fonction est correcte
import { logedInUser } from "../stores/action_creators";
import { useNavigate } from "react-router-dom";
import "../styles/login.css";

function Login() {
  const [loginInfo, setLogin] = useState({ email: "", mot_de_passe: "" });
  const [message, setMessage] = useState({ type: "", text: "" });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const authUser = useSelector((state) => state.auth.authUser);

  // Vérification automatique de l'expiration du token
  useEffect(() => {
    const isTokenExpired = () => {
      const loginTime = localStorage.getItem("loginTime");
      if (!loginTime) return true;
      const elapsedTime = (new Date() - new Date(loginTime)) / 1000; // Temps écoulé en secondes
      return elapsedTime > 7200; // Expiration après 2 heures
    };

    if (authUser && localStorage.getItem("token")) {
      if (isTokenExpired()) {
        localStorage.clear();
        setMessage({ type: "error", text: "Session expirée. Veuillez vous reconnecter." });
        navigate("/login");
      } else {
       // navigate("/");
      }
    }
  }, []);

  // Gestion des champs du formulaire
  const onChange = (event) => {
    const { name, value } = event.target;
    setLogin((prev) => ({ ...prev, [name]: value }));
  };

  // Gestion de la connexion
  const connecter = async (e) => {
    e.preventDefault();

    if (!loginInfo.email || !loginInfo.mot_de_passe) {
      setMessage({ type: "error", text: "Veuillez remplir tous les champs." });
      return;
    }

    try {
      const res = await login(loginInfo);

      if (res && res.token) {
        localStorage.setItem("token", res.token);
        localStorage.setItem("role", res.role);
        localStorage.setItem("loginTime", new Date().toISOString());
        if (res.role === "etudiant") {
          localStorage.setItem("etudiant", JSON.stringify({ id: res.id, email: res.email }));
      }
      
        
        dispatch(logedInUser(res));

        setMessage({ type: "success", text: "Connexion réussie ! Redirection en cours..." });

        setTimeout(() => navigate("/"), 1500);
      } else {
        throw new Error("Identifiants incorrects.");
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || "Erreur de connexion. Vérifiez vos identifiants.";
      setMessage({ type: "error", text: errorMessage });
    }
  };

  return (
    <main className="login-container">
      <div className="login-card">
        <h2>Se connecter</h2>
        {message.text && <div className={`message ${message.type}`}>{message.text}</div>}
        <form onSubmit={connecter}>
          <div className="form-group">
            <label htmlFor="email">Adresse email</label>
            <input
              onChange={onChange}
              name="email"
              value={loginInfo.email}
              type="email"
              id="email"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="mot_de_passe">Mot de passe</label>
            <input
              onChange={onChange}
              name="mot_de_passe"
              value={loginInfo.mot_de_passe}
              type="password"
              id="mot_de_passe"
              required
            />
          </div>
          <button type="submit" className="login-button">Connexion</button>
        </form>
      </div>
    </main>
  );
}

export default Login;
