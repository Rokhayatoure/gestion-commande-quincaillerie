const jwt = require('jsonwebtoken');

// Middleware d'authentification de base (vérifie le token)
module.exports = (req, res, next) => {
  const auth = req.headers.authorization;
  if (!auth) return res.status(401).json({ error: 'Token manquant' });
  const token = auth.split(' ')[1];
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = payload.userId;
    req.userRole = payload.role; // On ajoute le rôle dans la requête
    next();
  } catch {
    res.status(401).json({ error: 'Token invalide' });
  }

 
};
// middleware pour verifiet la connexion de l'utilisateur
module.exports.isAuthenticated = (req, res, next) => {
  const auth = req.headers.authorization;
  if (!auth) return res.status(401).json({ error: 'Token manquant' });
  const token = auth.split(' ')[1];
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = payload.userId;

   } catch {
    res.status(401).json({ error: 'user not auth' });
  }
 
};

// Middleware pour vérifier le rôle gestionnaire
module.exports.onlyGestionnaire = (req, res, next) => {
  if (req.userRole !== 'gestionnaire') {
    // console.log(userRole)
    return res.status(403).json({ error: 'Accès réservé aux gestionnaires' });
  }
  next();
};

// Middleware pour vérifier le rôle responsable_achat
module.exports.onlyResponsableAchat = (req, res, next) => {
  if (req.userRole !== 'responsable_achat') {
    return res.status(403).json({ error: 'Accès réservé aux responsables achat' });
  }
  next();
};

// Middleware pour vérifier le rôle responsable_paiement
module.exports.onlyResponsablePaiement = (req, res, next) => {
  if (req.userRole !== 'responsable_payement') {
    return res.status(403).json({ error: 'Accès réservé aux responsables paiement' });
  }
  next();
};


