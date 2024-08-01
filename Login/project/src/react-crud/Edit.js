import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import array from "./array";
import { Link, useNavigate } from "react-router-dom";

function Edit() {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [id, setId] = useState("");
  let navigate = useNavigate();

  let index = array.findIndex((e) => e.id === id);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name === "" || age === "") {
      alert("Invalid input");
      return;
    }

    let a = array[index];
    a.Name = name;
    a.Age = age;

    navigate("/react-crud/home");
  };

  useEffect(() => {
    setName(localStorage.getItem("Name"));
    setAge(localStorage.getItem("Age"));
    setId(localStorage.getItem("id"));
  }, []);

  return (
    <div className="container">
      <Form onSubmit={handleSubmit} className="form-container">
        <Form.Group className="mb-3" controlId="formBasicName">
          <Form.Control
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            placeholder="Enter Name"
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicAge">
          <Form.Control
            value={age}
            onChange={(e) => setAge(e.target.value)}
            type="number"
            placeholder="Age"
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Update
        </Button>
        <Link to="/react-crud/home">
          <Button variant="warning" className="ml-2">
            Home
          </Button>
        </Link>
      </Form>
    </div>
  );
}

export default Edit;
