import React from 'react';
import ReactJson from 'react-json-view';
import { FormSchema } from '../types/formSchema';

interface JsonEditorProps {
  onChange: (json: FormSchema) => void;
  json: FormSchema;
}

const JsonEditor: React.FC<JsonEditorProps> = ({ onChange, json }) => {
  const handleEditorChange = (updatedJson: any) => {
    try {
      onChange(updatedJson.updated_src); // Extract the updated JSON from ReactJson's output
    } catch (error) {
      console.error("Invalid JSON", error);
    }
  };

  return (
    <div className="w-full p-4 bg-gray-100">
      <h2 className="text-lg font-semibold">JSON Editor</h2>
      <ReactJson
        src={json} // JSON object to be edited
        onEdit={handleEditorChange} // Handle edit events
        onAdd={handleEditorChange}  // Handle add events
        onDelete={handleEditorChange} // Handle delete events
        theme="monokai" // Optional: Set your preferred theme
        displayDataTypes={false} // Optional: Hide the data type
        displayObjectSize={false} // Optional: Hide the object size
        iconStyle="circle" // Optional: Change icon style for the JSON keys
      />
    </div>
  );
};

export default JsonEditor;
