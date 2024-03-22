import { FormEvent, useEffect, useState } from "react";
import style from "./AddTermAndRelated.module.css";
import Modal from "react-modal"
import { validationSchema } from "../../../utils/crudValidations";
import { useCookies } from "react-cookie";
import RelatedTerms from "./RelatedTerms";

import editSvg from "../../../assets/edit.svg";
import { notificationActions } from "../../../store/notificationSlice";
import { useDispatch } from "react-redux";
import { fetchEditedTerm, fetchNewTerm } from "../../../utils/requests";
import { TermType, ValidationError, ValidationErrors } from "types/types";

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

export default function AddTerm({ identifier, termForEdit }: {identifier?: string, termForEdit?: any}) {
  const [cookies] = useCookies();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const dispatch = useDispatch();

  const [errors, setErrors] = useState<any>({});
  const [fetching, setFetching] = useState(false);
  const [formData, setFormData] = useState<TermType>({
    term: "",
    definition: "",
    relatedTerms: [],
  });

  useEffect(() => {
    if (identifier === "EDIT") {
      setIsEditMode(true);
      setFormData((prevState) => {
        return {
          ...prevState,
          term: termForEdit.term,
          definition: termForEdit.definition,
        };
      });
    }
  }, [modalIsOpen]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>, identifier: string) {
    setFormData((prevState) => {
      return {
        ...prevState,
        [identifier]: e.target.value,
      };
    });
  }

  function handleRelatedTerms(relatedTerm: {term: string, id: number}, callback: ()=>any) {
    setFormData((prevState) => {
      return {
        ...prevState,
        relatedTerms: [relatedTerm, ...prevState.relatedTerms],
      };
    });
    callback();
  }

  function handleRemoveRelated(relatedTermId: number) {
    setFormData((prevState) => {
      return {
        ...prevState,
        relatedTerms: prevState.relatedTerms.filter(
          (term) => term.id !== relatedTermId
        ),
      };
    });
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      const data = {
        term: formData.term,
        definition: formData.definition,
        related_terms: formData.relatedTerms.map(
          (relatedTerm) => relatedTerm.id
        ),
      };

      await validationSchema.validate(formData, { abortEarly: false });

      setFetching(true);

      if (isEditMode) {
        const fetch = await fetchEditedTerm(
          cookies.token,
          termForEdit.slug,
          data
        );
      } else {
        const fetch = await fetchNewTerm(cookies.token, data);
      }

      closeModal();
      setErrors({});

      setFetching(false);

      if(identifier === "EDIT"){
        dispatch(
          notificationActions.notify({
            message: "You have succesfully edited term",
            action: "edit",
          })
        );
      } else 
      {
        dispatch(
        notificationActions.notify({
          message: "You have succesfully added term",
          action: "add",
        })
      );}

    } catch (validationErrors: any) {
      setFetching(false);
      const errors: Record<string, string> = {};
      if (validationErrors.inner) {
        validationErrors.inner.forEach((error: {path: string, message: string}) => {
          errors[error.path] = error.message;
        });
        setErrors(errors);
        return
      }
      setErrors(validationErrors);
    }
  }

  function openModal() {
    if (identifier && identifier === "EDIT") {
      setIsEditMode(true);
    }
    setModalIsOpen(true);
  }

  function closeModal() {
    setModalIsOpen(false);
    setIsEditMode(false);
    setFormData((prevState) => {
      return {
        term: "",
        definition: "",
        relatedTerm: "",
        relatedTerms: [],
      };
    });
    setErrors({});
  }

  return (
    <>
      <div>
        {identifier && identifier === "EDIT" ? (
          <div onClick={openModal} className={style.editIcon}>
            <img src={editSvg} alt="edit icon" />
          </div>
        ) : (
          <button onClick={openModal} className="button-6">
            Add new word
          </button>
        )}
      </div>
      {modalIsOpen && 
      
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Add term modal"
        style={customStyles}
      >
        <form onSubmit={handleSubmit} className={`${style.addTermForm}`}>
          <div className={style.termNdef}>
            <label htmlFor="term">Term</label>
            <input
              type="text"
              name="term"
              id="term"
              onChange={(e) => handleChange(e, "term")}
              value={formData.term}
            />
            {errors.term && <p className={style.error}>{errors.term}</p>}

            <label htmlFor="definition">Definition</label>
            <textarea
              name="definition"
              id="definition"
              cols={30}
              rows={10}
              onChange={(e) => handleChange(e, "definition")}
              value={formData.definition}
            ></textarea>
            {errors.definition && (
              <p className={style.error}>{errors.definition}</p>
            )}
          </div>

          <RelatedTerms
            formData={formData}
            handleRelatedTerms={handleRelatedTerms}
            handleRemoveRelated={handleRemoveRelated}
          />
          {errors.message && <p className={style.error}>{errors.message}</p>}

          <div className={style.buttons}>
            <button
              type="button"
              onClick={closeModal}
              className={`${style.closeBtn} ${fetching ? style.fetching : undefined}`}
              disabled={fetching}
            >
              Close
            </button>
            <button
              className={`button-6 ${fetching ? style.fetching : undefined}`}
              disabled={fetching}
            >
              Submit
            </button>
          </div>
        </form>
      </Modal>
      }
    </>
  );
}
