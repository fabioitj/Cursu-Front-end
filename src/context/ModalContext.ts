import { createContext, useContext } from "react";

export type ModalContent = {
    title: string;
    setTitle: (t: string) => void;

    message: string;
    setMessage: (m: string) => void;

    openedModal: boolean;
    setOpenedModal: (o: boolean) => void;

    type: string;
    setType: (m: string) => void;

    callback: () => void;
    setCallback: React.Dispatch<React.SetStateAction<() => void>>;
};

export const MyModalContext = createContext<ModalContent>({
    title: "",
    setTitle: () => {},

    message: "",
    setMessage: () => {},

    openedModal: false,
    setOpenedModal: () => {},

    type: "",
    setType: () => {},

    callback: () => {},
    setCallback: () => () => {}
});

export const useModalContext = () => useContext(MyModalContext);
