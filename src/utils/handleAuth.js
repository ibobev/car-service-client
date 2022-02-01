const setToken = (token) => {
    sessionStorage.setItem("token", token);
}

const getToken = () => {
    return sessionStorage.getItem("token");
}

const setRole = (role) => {
    sessionStorage.setItem("role", role);
}

const getRole = () => {
    return sessionStorage.getItem("role");
}

const deleteToken = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("role");
}

export {setToken, getToken, setRole, getRole, deleteToken, };




