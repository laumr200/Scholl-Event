import { useState } from "react";
import axios from "axios";

const EventForm = () => {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("https://api.example.com/events", { title, date, location })
      .then(() => alert("Événement ajouté avec succès!"))
      .catch(error => console.error("Erreur :", error));
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="Titre" value={title} onChange={(e) => setTitle(e.target.value)} required />
      <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
      <input type="text" placeholder="Lieu" value={location} onChange={(e) => setLocation(e.target.value)} required />
      <button type="submit">Ajouter</button>
    </form>
  );
};

export default EventForm;
