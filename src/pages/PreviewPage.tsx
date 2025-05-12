import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Send, CheckCircle } from 'lucide-react';
import { useFormContext } from '../hooks/useFormContext';

export default function PreviewPage() {
  const navigate = useNavigate();
  const { formTitle, formDescription, formElements } = useFormContext();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [submittedData, setSubmittedData] = useState<Record<string, any> | null>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const output: Record<string, any> = {};

    formElements.forEach((el) => {
      if (el.type === 'checkbox') {
        const selected = form.getAll(el.id);
        if (selected.length > 0) output[el.id] = selected;
      } else {
        output[el.id] = form.get(el.id);
      }
    });

    setSubmittedData(output);
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 px-4">
      <div className="flex justify-between mb-6">
        <button
          onClick={() => navigate('/')}
          className="inline-flex items-center gap-1 text-sm border border-gray-300 shadow bg-white px-3 py-2 rounded text-gray-700 font-bold"
        >
          <ArrowLeft size={16} />
          Back to Editor
        </button>
      </div>

      <div className="rounded-xl overflow-hidden shadow bg-white">
        

        {submittedData ? (
          <div className="text-center py-16 px-8">
            <CheckCircle className="mx-auto text-green-500 mb-4" size={48} />
            <h2 className="text-xl font-semibold mb-2">Form submitted successfully!</h2>
            <p className="text-sm text-gray-600 mb-6">Thank you for your submission.</p>

            <pre className="bg-gray-100 rounded p-4 text-left text-sm w-full overflow-x-auto">
              {JSON.stringify(submittedData, null, 2)}
            </pre>

            <div className="mt-6 flex justify-center gap-4">
              <button
                onClick={() => navigate('/')}
                className="px-4 py-2 text-sm bg-gray-100 text-gray-700 rounded"
              >
                Back to editor
              </button>
              <button
                onClick={() => setSubmittedData(null)}
                className="px-4 py-2 text-sm bg-purple-600 text-white rounded"
              >
                Back to form
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className="bg-purple-50 p-8">
              <h1 className="text-2xl font-bold text-gray-900 mb-1">{formTitle}</h1>
              <p className="text-sm text-gray-600">{formDescription}</p>
            </div>
            <form onSubmit={handleSubmit} className="p-8 space-y-6">
              {formElements.map((el) => (
                <div key={el.id}>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {el.label}
                    {el.required && <span className="text-red-500"> *</span>}
                  </label>

                  {el.type === 'text' && (
                    <input
                      type="text"
                      name={el.id}
                      className="w-full border border-gray-300 rounded px-3 py-2"
                      placeholder={el.label}
                      required={el.required}
                    />
                  )}

                  {el.type === 'paragraph' && (
                    <textarea
                      name={el.id}
                      rows={4}
                      className="w-full border border-purple-500 rounded px-3 py-2"
                      placeholder={el.label}
                      required={el.required}
                    />
                  )}

                  {el.type === 'select' && (
                    <select
                      name={el.id}
                      className="w-full border border-gray-300 rounded px-3 py-2 text-sm text-gray-700"
                      required={el.required}
                    >
                      <option value="">Select an option</option>
                      {(el.options || []).map((opt, idx) => (
                        <option key={idx} value={opt}>{opt}</option>
                      ))}
                    </select>
                  )}

                  {el.type === 'checkbox' && (
                    <div className="space-y-1">
                      {(el.options || []).map((opt, idx) => (
                        <label key={idx} className="flex items-center gap-2 text-sm text-gray-700">
                          <input
                            type="checkbox"
                            name={el.id}
                            value={opt}
                            className="accent-purple-600"
                          />
                          {opt}
                        </label>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              <button
                type="submit"
                className="w-full mt-6 bg-purple-600 text-white py-2 rounded hover:bg-purple-700 flex items-center justify-center gap-2"
              >
                <Send size={14} />
                Submit
              </button>
            </form>
          </>
        )}
</div>
</div>
)}