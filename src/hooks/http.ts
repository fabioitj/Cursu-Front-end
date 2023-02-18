import axios from "axios";
import LoggedUser from "../models/Conta/LoggedUser";

const baseUrl = "http://localhost:3000";

const buildHeader = (contentType = "application/json") => {
    const localStorageUser = JSON.parse(localStorage.getItem("user") as string);
    const User = localStorageUser as LoggedUser;
    if (localStorageUser && User) {
        const TOKEN = User.token;

        const headers = {
            headers: {
                Authorization: "Bearer " + TOKEN,
                "Content-Type": contentType,
            },
        };

        return headers;
    }
};

export { baseUrl, buildHeader };
