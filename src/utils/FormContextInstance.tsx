import { createContext } from "react";
import type { FormElement } from '../types/form';
interface FormContextType {
  formTitle: string;
  setFormTitle: (val: string) => void;
  formDescription: string;
  setFormDescription: (val: string) => void;
  formElements: FormElement[];
  setFormElements: (val: FormElement[]) => void;
}

export const FormContext = createContext<FormContextType | undefined>(undefined); 