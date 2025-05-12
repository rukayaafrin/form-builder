import { v4 as uuidv4 } from 'uuid';
import Sidebar from '../components/Sidebar';
import EditableText from '../components/EditableText';
import FieldWrapper from '../components/FieldWrapper';
import type {  FormElementType } from '../types/form';
import { useFormContext } from '../hooks/useFormContext';


export default function BuilderPage() {
  const {
    formTitle,
    setFormTitle,
    formDescription,
    setFormDescription,
    formElements,
    setFormElements,
  } = useFormContext();



  const addElement = (type: FormElementType) => {
    const newElement = {
      id: uuidv4(),
      type,
      label: `New ${type} field`,
      required: false,
      ...(type === 'select' || type === 'checkbox' ? { options: [] } : {}),
    };
    setFormElements([...formElements, newElement]);
  };

  const updateElement = (id: string, changes: Partial<typeof formElements[0]>) => {
    setFormElements(formElements.map(el => el.id === id ? { ...el, ...changes } : el));
  };

  const removeElement = (id: string) => {
    setFormElements(formElements.filter(el => el.id !== id));
  };

  const moveElement = (fromIndex: number, toIndex: number) => {
    if (toIndex < 0 || toIndex >= formElements.length) return;
    const updated = [...formElements];
    const [moved] = updated.splice(fromIndex, 1);
    updated.splice(toIndex, 0, moved);
    setFormElements(updated);
  };

  return (
    <div className='flex items-start max-w-7xl mx-auto mt-10 px-4 gap-6'>
      <Sidebar onAdd={addElement} />

      <div className='flex-1'>
        <div className='rounded-xl overflow-hidden shadow bg-white'>
          <div className='bg-purple-50 p-8'>
            <h1 className='text-2xl font-bold text-gray-900 mb-1'>
              <EditableText
                value={formTitle}
                onChange={setFormTitle}
                placeholder='Untitled Form'
              />
            </h1>
            <p className='text-sm text-gray-600'>
              <EditableText
                value={formDescription}
                onChange={setFormDescription}
                className='text-sm font-normal text-gray-600'
                placeholder='Form description'
              />
            </p>
          </div>

          {formElements.length === 0 ? (
            <div className='bg-white p-14'>
              <p className='text-gray-500 text-center text-xs'>
                No form fields added yet. Use the panel on the left to add form
                elements.
              </p>
            </div>
          ) : (
            <div className='bg-gray-50 space-y-4 p-8'>
              {formElements.map((el, index) => (
                <FieldWrapper
                  key={el.id}
                  element={el}
                  index={index}
                  moveUp={() => moveElement(index, index - 1)}
                  moveDown={() => moveElement(index, index + 1)}
                  update={(changes) => updateElement(el.id, changes)}
                  remove={() => removeElement(el.id)}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
