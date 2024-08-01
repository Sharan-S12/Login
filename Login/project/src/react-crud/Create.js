import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import array from "./array";
import { v4 as uuid } from "uuid";
import { Link, useNavigate } from "react-router-dom";

function Create() {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  let navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const ids = uuid();
    let uni = ids.slice(0, 8);
    let a = name,
      b = age;

    if (name === "" || age === "") {
      alert("Invalid input");
      return;
    }

    array.push({ id: uni, Name: a, Age: b });
    navigate("/react-crud/home");
  };

  return (
    <div className="container">
      <Form onSubmit={handleSubmit} className="form-container">
        <Form.Group className="mb-3" controlId="formBasicName">
          <Form.Control
            onChange={(e) => setName(e.target.value)}
            type="text"
            placeholder="Enter Name"
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicAge">
          <Form.Control
            onChange={(e) => setAge(e.target.value)}
            type="number"
            placeholder="Age"
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
        <Link to="/react-crud/home">
          <Button variant="info" className="ml-2">Home</Button>
        </Link>
      </Form>
    </div>
  );
}

export default Create;
