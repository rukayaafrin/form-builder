export type FormElementType = 'text' | 'paragraph' | 'checkbox' | 'select';

export interface FormElement {
  id: string;
  type: FormElementType;
  label: string;
  required: boolean;
  options?: string[];
}
