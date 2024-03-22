import Modal from "react-modal";
import style from "./DeleteTerm.module.css";
import { useState } from "react";
import { useCookies } from "react-cookie";
import { useDispatch } from "react-redux";
import { notificationActions } from "../../../store/notificationSlice";
import { fetchDeletedTerm } from "../../../utils/requests";
import { DeleteTermType } from "types/types";

Modal.setAppElement("#root");

const customStyles = {
  overlay: {
    backgroundColor: "rgba(0,0,0,0.9)",
  },
  content: {
    overflow: "visible",
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "rgba(0,0,0,0.7)",
    bgcolor: "background.paper",
  },
};

export default function DeleteTermModal({
  modalIsOpen,
  closeModal,
  termData,
}: {
  modalIsOpen: boolean;
  closeModal: () => void;
  termData: DeleteTermType;
}) {
  const [errors, setErrors] = useState<{message: string}>({message: ""});
  const [cookies] = useCookies();
  const dispatch = useDispatch();

  async function handleDelete() {
    try {
      await fetchDeletedTerm(cookies.token, termData.id);
      closeModal();
      dispatch(
        notificationActions.notify({
          message: "You have succesfully deleted term",
          action: "delete",
        })
      );
    } catch (error: any) {
      setErrors(error);
    }
  }

  return (
    <>
      {modalIsOpen && (
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          contentLabel="Delete term modal"
          style={customStyles}
        >
          <div className={`${style.dialog}`}>
            <h2>
              Are you sure you want to delete term: <span>{termData.term}</span>
            </h2>
            <div className={` ${style.buttons}`}>
              <button onClick={closeModal} className={style.btnBack}>
                Back
              </button>
              <button onClick={handleDelete} className={`button-6`}>
                Delete
              </button>
            </div>
            {errors.message && errors.message.length > 0 && (
              <p className={`${style.error}`}>{errors.message}</p>
            )}
          </div>
        </Modal>
      )}
    </>
  );
}
