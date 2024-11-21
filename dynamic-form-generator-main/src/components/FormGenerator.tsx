import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Field, FormSchema } from '../types/formSchema';

interface FormBuilderProps {
  schema: FormSchema;
}

const FormBuilder: React.FC<FormBuilderProps> = ({ schema }) => {
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  const { control, handleSubmit, formState: { errors }, reset } = useForm();

  // Toggle between light and dark themes
  const toggleTheme = () => setIsDarkTheme(!isDarkTheme);

  // Handle form submission
  const handleFormSubmit = (formData: any) => {
    console.log(formData);
    alert('Form submitted successfully!');
    downloadSubmissionAsJson(formData); // Download form data as JSON
    reset(); // Reset the form after submission
  };

  // Copy the schema JSON to clipboard
  const copySchemaToClipboard = () => {
    navigator.clipboard.writeText(JSON.stringify(schema, null, 2))
      .then(() => alert('Form schema copied to clipboard!'))
      .catch((error) => console.error('Failed to copy schema:', error));
  };

  // Download form submission data as JSON
  const downloadSubmissionAsJson = (formData: any) => {
    const dataBlob = new Blob([JSON.stringify(formData, null, 2)], { type: 'application/json' });
    const downloadLink = document.createElement('a');
    downloadLink.href = URL.createObjectURL(dataBlob);
    downloadLink.download = 'form_submission.json';
    downloadLink.click();
  };

  // Render individual form fields
  const renderFormField = (fieldConfig: Field) => {
    switch (fieldConfig.type) {
      case 'text':
      case 'email':
      case 'textarea':
        return (
          <Controller
            name={fieldConfig.id}
            control={control}
            rules={{
              required: fieldConfig.required,
              pattern: fieldConfig.validation?.pattern ? new RegExp(fieldConfig.validation.pattern) : undefined,
            }}
            render={({ field: inputProps }) => (
              <input
                {...inputProps}
                id={fieldConfig.id}
                placeholder={fieldConfig.placeholder}
                type={fieldConfig.type}
                className={block w-full p-2 border rounded-md ${isDarkTheme ? 'bg-gray-700 text-white' : 'bg-white text-black'}}
              />
            )}
          />
        );
      case 'select':
        return (
          <Controller
            name={fieldConfig.id}
            control={control}
            rules={{ required: fieldConfig.required }}
            render={({ field: selectProps }) => (
              <select
                {...selectProps}
                id={fieldConfig.id}
                className={block w-full p-2 border rounded-md ${isDarkTheme ? 'bg-gray-700 text-white' : 'bg-white text-black'}}
              >
                <option value="">Select an option</option>
                {fieldConfig.options?.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            )}
          />
        );
      case 'radio':
        return fieldConfig.options?.map((option) => (
          <div key={option.value} className="flex items-center space-x-2">
            <Controller
              name={fieldConfig.id}
              control={control}
              rules={{ required: fieldConfig.required }}
              render={({ field: radioProps }) => (
                <input
                  {...radioProps}
                  id={${fieldConfig.id}-${option.value}}
                  type="radio"
                  value={option.value}
                  className="mr-2"
                />
              )}
            />
            <label htmlFor={${fieldConfig.id}-${option.value}}>{option.label}</label>
          </div>
        ));
      default:
        return null;
    }
  };

  return (
    <div className={w-full p-6 rounded-md shadow-md ${isDarkTheme ? 'bg-gray-800 text-white' : 'bg-gray-50 text-black'}}>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">{schema.formTitle}</h2>
        <button
          onClick={toggleTheme}
          className="px-4 py-2 bg-gray-500 text-white rounded-md"
        >
          {isDarkTheme ? 'Light Theme' : 'Dark Theme'}
        </button>
      </div>
      <p className="mb-6">{schema.formDescription}</p>

      <button
        onClick={copySchemaToClipboard}
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded-md"
      >
        Copy Schema JSON
      </button>

      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
        {schema.fields.map((field) => (
          <div key={field.id} className="space-y-2">
            <label htmlFor={field.id} className="block text-sm font-medium">
              {field.label} {field.required && <span className="text-red-500">*</span>}
            </label>
            {renderFormField(field)}
            {errors[field.id] && (
              <span className="text-red-500 text-sm">
                {field.validation?.message || 'This field is required'}
              </span>
            )}
          </div>
        ))}
        <button type="submit" className="px-4 py-2 bg-green-500 text-white rounded-md">
          Submit
        </button>
      </form>
    </div>
  );
};

export default FormBuilder;
