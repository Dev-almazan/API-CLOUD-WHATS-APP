
import { response , envs } from '../../config.js';
const validateAccessToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).send(response(401, 'Metodo de autenticación inválido.', 'Auth'));
    }
    //recuperamos token de accesso
    const token = authHeader.split(' ')[1];
    if (token !== envs.userToken)
    {
        return res.status(401).send(response(401, 'Token de autenticación inválido.', 'Auth'));
    }
    //si coincide dar acceso a rutas
    next();
};

export default  validateAccessToken ;