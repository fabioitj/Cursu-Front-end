import { useModalContext } from "../../../context/ModalContext";
import "./style.scss";

function ModalConfirm() {
    const { message, type, title, openedModal, setOpenedModal, callback } = useModalContext();

    const handleCloseModal = () => {
        setOpenedModal(false);
    };

    const handleCallback = () => {
        callback();
        setOpenedModal(false);
    }

    return (
        openedModal && type === "confirm" 
        ? 
        <div className="modal-confirm">
            <div className="modal-confirm-content">
                <div className="modal-confirm-content-box">
                    <div className="modal-confirm-content-box-header">
                        <h3 className="modal-confirm-content-box-header-title">
                            {title}
                        </h3>

                        <span
                            className="modal-confirm-content-box-header-error"
                            onClick={handleCloseModal}
                        >
                            &#215;
                        </span>
                    </div>
                    <div className="modal-confirm-content-box-body">
                        <p className="modal-confirm-content-box-body-content">
                            {
                                message
                            }
                        </p>
                    </div>
                    <div className="modal-confirm-content-box-footer">
                        <button
                            className="modal-confirm-content-box-footer-button"
                            onClick={handleCloseModal}
                        >
                            Fechar
                        </button>

                        <button
                            className="modal-confirm-content-box-footer-button"
                            onClick={handleCallback}
                        >
                            Confirmar
                        </button>
                    </div>
                </div>
            </div>
        </div> 
        :
        <></>
    );
}

export default ModalConfirm;
