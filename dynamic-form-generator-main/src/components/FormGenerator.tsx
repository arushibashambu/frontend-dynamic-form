import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Field, FormSchema } from '../types/formSchema';

interface FormGeneratorProps {
  schema: FormSchema;
}

const FormGenerator: React.FC<FormGeneratorProps> = ({ schema }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const { control, handleSubmit, formState: { errors }, setValue } = useForm();
  const onSubmit = (data: any) => {
    console.log(data);
    alert('Form submitted successfully!');
    downloadJson(data);  // Optionally, download the data as JSON when form is submitted
  };

  // Function to toggle dark mode
  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);

  // Function to copy form JSON to clipboard
  const copyFormJson = () => {
    const jsonString = JSON.stringify(schema, null, 2);
    navigator.clipboard.writeText(jsonString)
      .then(() => alert('Form JSON copied to clipboard!'))
      .catch((err) => console.error('Failed to copy:', err));
  };

  // Function to download form submission as JSON
  const downloadJson = (data: any) => {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'form_submission.json';
    link.click();
  };

  return (
    <div className={`w-full p-4 ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-gray-50 text-black'}`}>
      <button
        onClick={toggleDarkMode}
        className="absolute top-4 right-4 px-4 py-2 bg-gray-500 text-white rounded-md"
      >
        Toggle Dark Mode
      </button>
      <h2 className="text-xl font-semibold">{schema.formTitle}</h2>
      <p className="mb-4">{schema.formDescription}</p>
      
      <button
        onClick={copyFormJson}
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded-md"
      >
        Copy Form JSON
      </button>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {schema.fields.map((field: Field) => {
          return (
            <div key={field.id} className="space-y-2">
              <label htmlFor={field.id} className="block text-sm font-medium">{field.label}</label>
              <div className="flex justify-between items-center">
                <div className="w-3/4">
                  {field.type === 'text' || field.type === 'email' || field.type === 'textarea' ? (
                    <Controller
                      name={field.id}
                      control={control}
                      rules={{
                        required: field.required,
                        pattern: field.validation?.pattern ? new RegExp(field.validation.pattern) : undefined,
                      }}
                      render={({ field: controllerField }) => (
                        <input
                          {...controllerField}
                          type={field.type}
                          id={field.id}
                          placeholder={field.placeholder}
                          className="block w-full p-2 border border-gray-300 rounded-md"
                        />
                      )}
                    />
                  ) : field.type === 'select' ? (
                    <Controller
                      name={field.id}
                      control={control}
                      rules={{ required: field.required }}
                      render={({ field: controllerField }) => (
                        <select
                          {...controllerField}
                          className={`block w-full p-2 border border-gray-300 rounded-md ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-white text-black'}`}
                        >
                          {field.options?.map((option: { label: string, value: string }) => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </select>
                      )}
                    />
                  ) : field.type === 'radio' ? (
                    field.options?.map((option: { label: string, value: string }) => (
                      <div key={option.value} className="flex items-center">
                        <Controller
                          name={field.id}
                          control={control}
                          rules={{ required: field.required }}
                          render={({ field: controllerField }) => (
                            <input
                              {...controllerField}
                              type="radio"
                              id={option.value}
                              value={option.value}
                              className="mr-2"
                            />
                          )}
                        />
                        <label htmlFor={option.value} className="text-sm">{option.label}</label>
                      </div>
                    ))
                  ) : null}
                </div>
                {/* Validation preview */}
                <div className="w-1/4">
                  <div className="text-sm">
                    {field.required && <div><strong>Required</strong></div>}
                    {field.validation?.pattern && <div><strong>Pattern: </strong>{field.validation.pattern}</div>}
                  </div>
                </div>
              </div>
              {errors[field.id] && (
                <span className="text-red-500 text-xs">
                  {field.validation?.message || 'This field is required'}
                </span>
              )}
            </div>
          );
        })}
        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-md">Submit</button>
      </form>
    </div>
  );
};

export default FormGenerator;
