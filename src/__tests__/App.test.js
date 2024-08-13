import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from '../App';

// Initial State
test('form initially has empty fields and no submission message', () => {
  render(<App />);
  expect(screen.getByLabelText(/enter your name/i)).toHaveValue('');
  expect(screen.getByLabelText(/enter your email address/i)).toHaveValue('');
  expect(screen.queryByText(/thank you,/i)).not.toBeInTheDocument();
});

// Handle Name and Email Input
test('user can type their name and email into the input fields', () => {
  render(<App />);
  fireEvent.change(screen.getByLabelText(/enter your name/i), { target: { value: 'John Doe' } });
  fireEvent.change(screen.getByLabelText(/enter your email address/i), { target: { value: 'john.doe@example.com' } });
  
  expect(screen.getByLabelText(/enter your name/i)).toHaveValue('John Doe');
  expect(screen.getByLabelText(/enter your email address/i)).toHaveValue('john.doe@example.com');
});

// Handle Checkbox Input
test('user can select interests checkboxes', () => {
  render(<App />);
  fireEvent.click(screen.getByLabelText(/coding/i));
  fireEvent.click(screen.getByLabelText(/design/i));
  
  expect(screen.getByLabelText(/coding/i)).toBeChecked();
  expect(screen.getByLabelText(/design/i)).toBeChecked();
  expect(screen.getByLabelText(/writing/i)).not.toBeChecked();
});

// Form Submission
test('submission displays a thank you message with user input', () => {
  render(<App />);
  fireEvent.change(screen.getByLabelText(/enter your name/i), { target: { value: 'Jane Doe' } });
  fireEvent.change(screen.getByLabelText(/enter your email address/i), { target: { value: 'jane.doe@example.com' } });
  fireEvent.click(screen.getByLabelText(/coding/i));
  
  fireEvent.click(screen.getByRole('button', { name: /submit/i }));

  expect(screen.getByText(/thank you, jane doe!/i)).toBeInTheDocument();
  expect(screen.getByText(/your email address jane.doe@example.com has been added to our newsletter/i)).toBeInTheDocument();
  expect(screen.getByText(/your interests: coding/i)).toBeInTheDocument();
});

