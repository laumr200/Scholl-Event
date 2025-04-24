import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Events from "../pages/Events";
import About from "../pages/About";
import Contact from "../pages/Contact";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer.jsx"; 
import Signup from "../pages/Signup";
import Login from "../pages/Login";
import Admin from "../pages/Admin";
import CreerEvent from "../pages/CreerEvent.jsx";
import Etudiant from "../pages/Etudiant.jsx";
import InscriptionEvent from "../pages/InscritionEvent.jsx";
import MesEvenements from "../pages/MesEvents.jsx";
import SuprimerEvenements from "../pages/SuprimerEvent.jsx";
import ModifierEvenements from "../pages/ModifierEvent.jsx";
import DetailEvenement from "../pages/DetailEvenement.jsx";
import ModifierEventForm from "../components/ModifierEventForm.jsx";
import ListeParticipants from "../pages/ListParticipants.jsx";

const AppRoutes = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/events" element={<Events />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />}/>
          <Route path="/admin" element={<Admin />}/>
          <Route path="/create-event" element={<CreerEvent />}/>
          <Route path="/etudiant" element={<Etudiant />}/>
          <Route path="/inscriptionevent" element={<InscriptionEvent/>} />
          <Route path="/mesevenements" element={<MesEvenements/>} />
          <Route path="/suprimerevent" element={<SuprimerEvenements/>} />
           <Route path="/modifiererevent" element={<ModifierEvenements/>} />
           <Route path="/evenement/:id" element={<DetailEvenement />} />
           <Route path="/evenementform/:id" element={<ModifierEventForm />} />
          <Route path="/listpart" element={<ListeParticipants/>} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default AppRoutes;
