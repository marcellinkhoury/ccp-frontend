import React from "react";
import { useNavigate } from "react-router-dom";

const ProfileCreation = () => {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
  };

  const handleCancel = () => {
    navigate(-1);
  };

  return (
    <div>
      <h1>Créer un profil</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Prénom:
          <input type="text" name="firstName" />
        </label>
        <label>
          Nom de famille:
          <input type="text" name="lastName" />
        </label>
        <label>
          Email:
          <input type="email" name="email" />
        </label>
        <label>
          Nom d'utilisateur Facebook:
          <input type="text" name="facebook" />
        </label>
        <label>
          Numéro de téléphone:
          <input type="tel" name="phone" />
        </label>
        <button type="submit">Soumettre</button>
        <button type="button" onClick={handleCancel}>
          Annuler
        </button>
        <button type="button" onClick={handleCancel}>
          Retour
        </button>
      </form>
    </div>
  );
};

export default ProfileCreation;
