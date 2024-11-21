# Dynamic Form Generator
A React-based application that dynamically generates forms based on a JSON schema.

## Features
- Real-time JSON validation and form generation
- Responsive design with Tailwind CSS
- Support for all field types (text, email, select, radio, etc.)
- Form submission and success message
- Mobile-friendly layout

## Setup Instructions
1. Clone the repository:
   ```bash
   git clone https://github.com/jaga4/dynamic-form-generator.git
   cd dynamic-form-generator

   
1. Install dependencies:

npm install

2. Run the development server:

npm start

3. Open your browser and visit http://localhost:3000 to view the application.

Example JSON Schema
Here's an example of how a schema might look:


{
  "formTitle": "Contact Us",
  "formDescription": "Please fill out the form below.",
  "fields": [
    {
      "id": "name",
      "type": "text",
      "label": "Your Name",
      "required": true,
      "placeholder": "Enter your name"
    },
    {
      "id": "email",
      "type": "email",
      "label": "Email Address",
      "required": true,
      "placeholder": "Enter your email"
    },
    {
      "id": "contactMethod",
      "type": "select",
      "label": "Preferred Contact Method",
      "required": true,
      "options": [
        { "label": "Email", "value": "email" },
        { "label": "Phone", "value": "phone" }
      ]
    }
  ]
}


Local Development Guide
Clone the repository.
Install dependencies using npm install.
Start the application using npm start.
Open http://localhost:3000 to see the form generator in action.

