import { Trash2, ArrowUp, ArrowDown } from 'lucide-react';
import EditableText from './EditableText';
import FormFieldRenderer from './FormFieldRenderer';
import type { FormElement } from '../types/form';

interface FieldWrapperProps {
  element: FormElement;
  index: number;
  moveUp: () => void;
  moveDown: () => void;
  update: (changes: Partial<FormElement>) => void;
  remove: () => void;
}

export default function FieldWrapper({ element, index, moveUp, moveDown, update, remove }: FieldWrapperProps) {
  return (
    <div className="relative p-6">
      <div className="absolute left-[0px] top-8 flex flex-col gap-1">
        <button onClick={moveUp} disabled={index === 0} className="text-gray-400 hover:text-gray-700 disabled:opacity-15">
          <ArrowUp size={16} />
        </button>
        <button onClick={moveDown} disabled={false} className="text-gray-400 hover:text-gray-700 disabled:opacity-20">
          <ArrowDown size={16} />
        </button>
      </div>

      <div className="flex justify-between items-center mb-2">
        <EditableText
          value={element.label}
          onChange={(val) => update({ label: val })}
          className="text-base font-semibold"
        />
        <div className="flex items-center gap-3">
          <label className="flex items-center gap-2 text-xs text-gray-700">
            <input
              type="checkbox"
              checked={element.required}
              onChange={(e) => update({ required: e.target.checked })}
              className="sr-only"
            />
            <div className="relative flex items-center justify-center">
              <div className={`w-4 h-4 border ${element.required ? 'border-purple-500' : 'border-gray-300'} rounded`} />
              {element.required && (
                <svg
                  className="absolute w-3 h-3 text-purple-600"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              )}
            </div>
            Required
          </label>
          <button onClick={remove} className="text-gray-400 hover:text-red-500">
            <Trash2 size={18} />
          </button>
        </div>
      </div>

      <FormFieldRenderer
  element={element}
  update={(changes) => update({ ...element, ...changes })}
/>

    </div>
  );
}