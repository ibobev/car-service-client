import axios from "axios";
//import {setToken, setRole} from "../utils/handleAuth";

const ACCOUNT_REST_API_URL = "http://localhost:8080/api/v1/accounts";

class AccountService {

    registerAccount(accountRegisterData) {
        return axios.post(ACCOUNT_REST_API_URL + "/register", accountRegisterData);
    }

    /*loginAccount(accountLoginData) {
        return axios.post(ACCOUNT_REST_API_URL + "/login", accountLoginData);
    }*/
}

export default new AccountService();
