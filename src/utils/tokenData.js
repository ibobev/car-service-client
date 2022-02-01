import jwt_decode from 'jwt-decode';
import {getToken} from '../utils/handleAuth';

const getIdFromToken = () => {

    const token = getToken();
    const decodedToken = jwt_decode(token);
    const accountId = decodedToken.id;

    return accountId;

}

export {getIdFromToken};