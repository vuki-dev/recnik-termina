import * as yup from 'yup';


export const validationSchema = yup.object().shape({
    term: yup.string().required("Term is required."),
    definition: yup
      .string()
      .required("Definition is required."),
  });