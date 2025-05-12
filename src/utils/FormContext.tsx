import { useState } from 'react';
import type { ReactNode } from 'react';
import type { FormElement } from '../types/form';
import { FormContext } from './FormContextInstance';

export function FormProvider({ children }: { children: ReactNode }) {
  const [formTitle, setFormTitle] = useState('Untitled Form');
  const [formDescription, setFormDescription] = useState('Form description');
  const [formElements, setFormElements] = useState<FormElement[]>([]);

  return (
    <FormContext.Provider
      value={{ formTitle, setFormTitle, formDescription, setFormDescription, formElements, setFormElements }}
    >
      {children}
    </FormContext.Provider>
  );
}
export { FormContext };

