import { FormErrorMessage } from "./FormErrorMessage";

interface IProps {
  id: string;
  formik: any;
}
export const FormError: React.FC<IProps> = ({ formik, id }) => {
  const message = formik.errors[id];
  const touched = formik.touched[id];
  const showError = message && touched;
  if (!showError) {
    return null;
  }
  return <FormErrorMessage message={message} />;
};
