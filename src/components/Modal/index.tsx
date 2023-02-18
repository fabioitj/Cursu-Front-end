import "./style.scss";
import ReactDOM from "react-dom";

const root: HTMLElement = document.getElementById("root") as HTMLElement;

function Modal({ title, buttonName, callback, setIsOpenedModal, children }) {
    const handleCloseModal = () => {
        setIsOpenedModal(false);
    };

    return ReactDOM.createPortal(
        <div className="modal">
            <div className="modal-content">
                <div className="modal-content-box">
                    <div className="modal-content-box-header">
                        <h3 className="modal-content-box-header-title">
                            {title}
                        </h3>

                        <span
                            className="modal-content-box-header-error"
                            onClick={handleCloseModal}
                        >
                            &#215;
                        </span>
                    </div>
                    <div className="modal-content-box-body">{children}</div>
                    <div className="modal-content-box-footer">
                        <button
                            className="modal-content-box-footer-button"
                            onClick={handleCloseModal}
                        >
                            Fechar
                        </button>
                        <button
                            className="modal-content-box-footer-button"
                            onClick={callback}
                        >
                            {buttonName}
                        </button>
                    </div>
                </div>
            </div>
        </div>,
        root
    );
}

export default Modal;
