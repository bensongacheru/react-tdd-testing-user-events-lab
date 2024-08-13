import React, { useState } from 'react';

function App() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [interests, setInterests] = useState({
    coding: false,
    design: false,
    writing: false
  });
  const [submitted, setSubmitted] = useState(false);

  const handleNameChange = (e) => setName(e.target.value);
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handleInterestChange = (e) => {
    const { name, checked } = e.target;
    setInterests(prevInterests => ({ ...prevInterests, [name]: checked }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const interestList = Object.entries(interests)
    .filter(([_, checked]) => checked)
    .map(([interest]) => interest)
    .join(', ');

  return (
    <div>
      <h1>Newsletter Signup</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={handleNameChange}
            aria-label="Enter your name"
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={handleEmailChange}
            aria-label="Enter your email address"
          />
        </div>
        <fieldset>
          <legend>Interests:</legend>
          <div>
            <input
              type="checkbox"
              id="coding"
              name="coding"
              checked={interests.coding}
              onChange={handleInterestChange}
            />
            <label htmlFor="coding">Coding</label>
          </div>
          <div>
            <input
              type="checkbox"
              id="design"
              name="design"
              checked={interests.design}
              onChange={handleInterestChange}
            />
            <label htmlFor="design">Design</label>
          </div>
          <div>
            <input
              type="checkbox"
              id="writing"
              name="writing"
              checked={interests.writing}
              onChange={handleInterestChange}
            />
            <label htmlFor="writing">Writing</label>
          </div>
        </fieldset>
        <button type="submit">Submit</button>
      </form>
      {submitted && (
        <p>
          Thank you, {name}! Your email address {email} has been added to our
          newsletter. Your interests: {interestList}.
        </p>
      )}
    </div>
  );
}

export default App;
