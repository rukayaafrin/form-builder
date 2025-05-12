import { useContext } from 'react';
import { FormContext } from '../utils/FormContext';

export function useFormContext() {
  const context = useContext(FormContext);
  if (!context) throw new Error('useFormContext must be used within a FormProvider');
  return context;
}
