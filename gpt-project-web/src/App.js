import React, { useState } from 'react';
import axios from 'axios';

function InputForm() {
  const [inputText, setInputText] = useState('');
  const [response, setResponse] = useState('');

  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await axios.post('http://localhost:5000/ask', {
        text: inputText
      });
      console.log(result.data.answer)
      setResponse(result.data.answer)

    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={inputText}
          onChange={handleInputChange}
          placeholder="Enter your question..."
        />
        <button type="submit">Submit</button>
      </form>
      <div>
        <h2>ChatGPT Response</h2>
        <p>{response}</p>
      </div>
    </div>
  );
}

export default InputForm;
