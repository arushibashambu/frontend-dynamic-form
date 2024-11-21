// src/tests/jsonEditor.test.tsx
import { render, screen } from '@testing-library/react';
import JsonEditor from '../components/JsonEditor';

test('renders JSON editor', () => {
  render(<JsonEditor onChange={() => {}} json={{ formTitle: 'Test Form', formDescription: 'Test Description', fields: [] }} />);
  expect(screen.getByText('JSON Editor')).toBeInTheDocument();
});
