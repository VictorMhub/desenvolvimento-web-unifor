const jwt = require('jsonwebtoken');

function authenticate(req, res, next){
  const token = req.header('Authorization');
  if(!token) return res.status(401).jason({ message: 'Acesso negado. Token não fornecido'});

  try{
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch(error) {
    res.status(400).json({message: 'Token inválido.'});
  }
}

module.exports = authenticate;