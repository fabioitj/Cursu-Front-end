import { createContext, useContext } from "react";
import LoggedUser from "../models/Conta/LoggedUser";

export type GlobalContent = {
    conta: LoggedUser | null;
    setConta: (c: LoggedUser | null) => void;
};

export const MyGlobalContext = createContext<GlobalContent>({
    conta: null, // set a default value
    setConta: () => {},
});
export const useGlobalContext = () => useContext(MyGlobalContext);
