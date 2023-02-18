import { useModalContext } from "../../context/ModalContext";
import { useEffect } from "react";

const notify = (title: string, message: string, setTitle: React.Dispatch<string>, setMessage: React.Dispatch<string>, setType: React.Dispatch<string>, setOpenedModal: React.Dispatch<boolean>) => {
    setTitle(title);
    setMessage(message);
    setType("notify");
    setOpenedModal(true);
}

const error = (message: string, setTitle: React.Dispatch<string>, setMessage: React.Dispatch<string>, setType: React.Dispatch<string>, setOpenedModal: React.Dispatch<boolean>) => {
    setTitle("Atenção");
    setMessage(message);
    setType("notify");
    setOpenedModal(true);
}

const confirm = (title: string, message: string, callback: () => void, setTitle: React.Dispatch<string>, setMessage: React.Dispatch<string>, setType: React.Dispatch<string>, setOpenedModal: React.Dispatch<boolean>, setCallback: React.Dispatch<() => void>) => {
    setTitle(title);
    setMessage(message);
    setOpenedModal(true);
    setType("confirm");
    setCallback(() => callback);
}   

export { notify, error, confirm };