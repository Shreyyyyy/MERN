import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Read = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  async function handleDelete(id) {
    try {
      const response = await fetch(`http://localhost:5000/${id}`, {
        method: "DELETE",
      });
      const result1 = await response.json();
      if (!response.ok) {
        setError(result1.error);
      } else {
        setError("Deleted Successfully");
        setTimeout(() => {
          setError("");
          getData();
        }, 1000);
      }
    } catch (err) {
      setError("An error occurred while deleting.");
    }
  }

  async function getData() {
    try {
      const response = await fetch("http://localhost:5000");
      const result = await response.json();
      if (!response.ok) {
        setError(result.error);
      } else {
        setData(result);
        setError("");
      }
    } catch (err) {
      setError("An error occurred while fetching data.");
    }
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="container my-2">
      {error && <div className="alert alert-danger">{error}</div>}
      <div className="row">
        {data.map((ele) => (
          <div key={ele._id} className="col-3">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{ele.name}</h5>
                <h6 className="card-subtitle mb-2 text-muted">{ele.email}</h6>
                <p className="card-text">{ele.age}</p>
                <a
                  className="card-link"
                  onClick={() => navigate(`/${ele._id}`)}
                >
                  Edit
                </a>
                <a className="card-link" onClick={() => handleDelete(ele._id)}>
                  Delete
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Read;
