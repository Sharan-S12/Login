import React from "react";
import { Button, Table } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import array from "./array";
import { Link, useNavigate } from "react-router-dom";

function Home() {
  let navigate = useNavigate();

  function setID(id, name, age) {
    localStorage.setItem("id", id);
    localStorage.setItem("Name", name);
    localStorage.setItem("Age", age);
  }

  function deleted(id) {
    let index = array.findIndex((e) => e.id === id);
    array.splice(index, 1);
    navigate("/react-crud/home");
  }

  return (
    <div className="container">
      <Table striped bordered hover size="10">
        <thead>
          <tr>
            <th>Employee_Name</th>
            <th>Employee_Age</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {array.map((item, index) => (
            <tr key={index}>
              <td>{item.Name}</td>
              <td>{item.Age}</td>
              <td>
                <Link to="/react-crud/edit">
                  <Button
                    onClick={() => setID(item.id, item.Name, item.Age)}
                    variant="info"
                    size="sm"
                  >
                    Update
                  </Button>
                </Link>
                <Button
                  onClick={() => deleted(item.id)}
                  variant="danger"
                  size="sm"
                  className="ml-2"
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Link to="/react-crud/create">
        <Button variant="warning" size="lg">
          Create
        </Button>
      </Link>
    </div>
  );
}

export default Home;
