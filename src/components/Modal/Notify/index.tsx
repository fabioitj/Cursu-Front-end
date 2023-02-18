import { useModalContext } from "../../../context/ModalContext";
import { useEffect } from "react";
import "./styles.scss";

function ModalNotify() {
    const {message, type, title, openedModal, setOpenedModal} = useModalContext();

    const handleCloseModal = () => {
        setOpenedModal(false);
        // if(callback)
        //     callback();
    }

    return (
        openedModal && type === "notify"
        ? <div className="modal-notify">
            <div className="modal-notify-content">
                <div className="modal-notify-content-box">
                    <div className="modal-notify-content-box-header">
                        <h3 className="modal-notify-content-box-header-title">
                            {title}
                        </h3>

                        <span className="modal-notify-content-box-header-error" onClick={handleCloseModal}>
                            &#215;
                        </span>
                    </div>
                    <div className="modal-notify-content-box-body">
                        <p className="modal-notify-content-box-body-content">
                            {
                                message ? message.split("&space").map((item) => {
                                    return (
                                        <p>&#8226; {item}</p>
                                    );
                                }) : message
                            }
                        </p>
                    </div>
                    <div className="modal-notify-content-box-footer">
                        <button className="modal-notify-content-box-footer-button" onClick={handleCloseModal}>
                            Fechar
                        </button>
                    </div>
                </div>
            </div>
        </div>

        : <></>
    );
}

export default ModalNotify;
