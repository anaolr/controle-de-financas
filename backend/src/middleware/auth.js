const jwt = require("jsonwebtoken");

function verificarToken(req, res, next) {
  const token = req.headers["authorization"];
  if (!token) return res.status(403).json({ erro: "Token não fornecido." });

  // Tira a palavra "Bearer " do token
  const tokenLimpo = token.replace("Bearer ", "");

  jwt.verify(tokenLimpo, process.env.JWT_SECRET, (err, decoded) => {
    if (err)
      return res.status(401).json({ erro: "Acesso negado. Token inválido." });

    req.usuarioId = decoded.id; // Guarda o ID do usuário para usar depois
    next(); // Pode passar!
  });
}

module.exports = verificarToken;
