import DeleteTermModal from "./DeleteTermModal";
import deleteSvg from "../../../assets/delete.svg";
import style from "./DeleteTerm.module.css";
import { useState } from "react";
import { DeleteTermType } from "types/types";

export default function DeleteTerm({ termData }: {termData: DeleteTermType}) {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  function openModal() {
    setModalIsOpen(true);
  }

  function closeModal() {
    setModalIsOpen(false);
  }

  return (
    <div>
      <div className={style.deleteIcon} onClick={openModal}>
        <img src={deleteSvg} alt="delete icon" />
      </div>
      <DeleteTermModal termData={termData} closeModal={closeModal} modalIsOpen={modalIsOpen}/>
    </div>
  );
}
