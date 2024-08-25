import React, { useState } from "react";
import Select from "react-select";
import makeAnimated from "react-select/animated";

function App() {
  const [jsonInput, setJsonInput] = useState("");
  const [response, setResponse] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [error, setError] = useState("");

  const options = [
    { value: "Alphabets", label: "Alphabets" },
    { value: "Numbers", label: "Numbers" },
    {
      value: "Highest lowercase alphabet",
      label: "Highest lowercase alphabet",
    },
  ];

  const handleInputChange = (e) => {
    setJsonInput(e.target.value);
  };

  const handleSubmit = async () => {
    try {
      const normalizedInput = jsonInput.replace(/[\u201C\u201D]/g, '"');
      const parsedInput = JSON.parse(normalizedInput);
      const res = await fetch("https://bfhl-q1-backend-vishwas-projects-ddae81cf.vercel.app", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(parsedInput),
      });
      const data = await res.json();
      console.log(data);
      setResponse(data);
      setError("");
    } catch (err) {
      setError("Invalid JSON input");
      setResponse(null);
    }
  };

  const handleSelectChange = (selected) => {
    setSelectedOptions(selected.map((option) => option.value));
  };

  const renderResponse = () => {
    if (!response) return null;
    const {
      alphabets = [],
      numbers = [],
      highest_lowercase_alphabet = [],
    } = response;

    return (
      <div className="mt-6 p-4 bg-white shadow-lg rounded-lg">
        {selectedOptions.includes("Alphabets") && (
          <div className="mb-2">
            {alphabets.length > 0 ? (
              <>
                <strong>Alphabets:</strong> {alphabets.join(", ")}
              </>
            ) : (
              "No alphabets in the data"
            )}
          </div>
        )}

        {selectedOptions.includes("Numbers") && (
          <div className="mb-2">
            {numbers.length > 0 ? (
              <>
                <strong>Numbers:</strong> {numbers.join(", ")}
              </>
            ) : (
              "No numbers in the data"
            )}
          </div>
        )}

        {selectedOptions.includes("Highest lowercase alphabet") && (
          <div>
            {highest_lowercase_alphabet.length > 0 ? (
              <>
                <strong>Highest Lowercase Alphabet:</strong>{" "}
                {highest_lowercase_alphabet.join(", ")}
              </>
            ) : (
              "No lowercase alphabets in the data"
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6 space-y-3">
      <h1 className="text-4xl font-extrabold mb-6 text-gray-900">
        Bajaj Finserv Health Challenge (Qualifier 1)
      </h1>
      <p className="text-xl">Vishwanatha S K V R Kurella (21BPS1008)</p>
      <textarea
        value={jsonInput}
        onChange={handleInputChange}
        placeholder="Enter JSON here..."
        className="w-full max-w-xl h-40 p-4 border border-gray-300 rounded-lg mb-4 shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        onClick={handleSubmit}
        className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-transform transform hover:scale-105"
      >
        Submit
      </button>
      {error && (
        <div className="text-red-600 mt-4 text-sm font-medium">{error}</div>
      )}
      {response && (
        <>
          <Select
            isMulti
            options={options}
            onChange={handleSelectChange}
            components={makeAnimated()}
            className="mt-6 w-full max-w-xl"
            classNamePrefix="select"
          />
          {renderResponse()}
        </>
      )}
    </div>
  );
}

export default App;
