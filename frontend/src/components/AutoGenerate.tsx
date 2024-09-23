import React, { useState } from 'react';
import axios from 'axios';

interface AutoGenerateProps {
  onGeneratedText: (text: string) => void;
}

const AutoGenerate: React.FC<AutoGenerateProps> = ({ onGeneratedText }) => {
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [generatedText, setGeneratedText] = useState('');

  const handleGenerate = async () => {
    if (prompt.trim() === '') return;
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:8000/autogenerate_text', {
        prompt,
      });
      const text = response.data.generated_text;
      setGeneratedText(text);
      onGeneratedText(text);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  return (
    <div>
      <h3>AutoGenerate Text</h3>
      <textarea
        placeholder="Enter your prompt"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        rows={4}
        cols={50}
      />
      <br />
      <button onClick={handleGenerate} disabled={loading}>
        {loading ? 'Generating...' : 'Generate'}
      </button>
      {generatedText && (
        <div>
          <h4>Generated Text:</h4>
          <p>{generatedText}</p>
        </div>
      )}
    </div>
  );
};

export default AutoGenerate;
