import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const UPdate = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState(0);
  const [error, setError] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getSingleData();
  }, []);

  const getSingleData = async () => {
    try {
      const response = await fetch(`http://localhost:5000/${id}`);
      const result = await response.json();
      if (response.ok) {
        setName(result.name);
        setEmail(result.email);
        setAge(result.age);
      } else {
        setError(result.error);
      }
    } catch (err) {
      setError("An error occurred while fetching data.");
      console.error("Fetching error:", err);
    }
  };

  const handleUPdate = async (e) => {
    e.preventDefault();
    const updatedUser = { name, email, age };
    try {
      const response = await fetch(`http://localhost:5000/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedUser),
      });
      const result = await response.json();
      if (response.ok) {
        navigate("/all");  // Redirect to /all page after successful update
      } else {
        setError(result.error);
      }
    } catch (err) {
      setError("An error occurred while updating data.");
      console.error("Update error:", err);
    }
  };

  return (
    <div className="container my-2">
      <h1 className="h1 text-center">Edit Data</h1>
      {error && <div className="alert alert-danger">{error}</div>}
      <form className="form" onSubmit={handleUPdate}>
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input
            type="text"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Email address</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Age</label>
          <input
            type="number"
            className="form-control"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-info">
          Update
        </button>
      </form>
    </div>
  );
};

export default UPdate;
