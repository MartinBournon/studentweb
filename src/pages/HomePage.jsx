import React, { useEffect, useState } from "react";
const { fillTableStudent, saveStudent } = require("../services/apiCall");

const HomePage = () => {
  /**
   * Declaración hook de estado estado usado para actualizar la tabla cuando se agrega un nuevo estudiante
   */
  const [refresh, setRefresh] = useState(0);

  /**
   * Declaración hook de estado usado para almacenar los datos provenietes de la BD para llenar la tabla estudiantes
   */
  const [studentTableData, setStudentTableData] = useState({ student: [] });

  /**
   * Declaración de hook de estado usado para almacenar los datos de cada input del form
   */
  const [studentFormData, setStudentFormData] = useState({
    identification: "",
    firstname: "",
    lastname: "",
  });
  /**
   * Hook de efecto usado para buscar los datos de la base de datos y se ejecuta cada vez que la variable de estado "refresh" se actualice
   */
  useEffect(() => {
    fillTableStudent().then((response) => {
      setStudentTableData(response.data);
    });
  }, [refresh]);

  /**
   * Función que captura el cambio de valor en cada input del form
   * @param {*} event
   */
  const handleInputChange = (event) => {
    setStudentFormData({
      ...studentFormData,
      [event.target.name]: event.target.value,
    });
  };

  /**
   * Función que ejecuta el método POST saveStudent para guardar un estudiante al hacer submit
   * @param {*} event
   */
  const handleSubmit = (event) => {
    event.preventDefault();
    saveStudent(studentFormData).then((response) => {
      if (response.status === 200) {
        setRefresh(Math.random());
      }
    });
  };

  /**
   * El form posee un atributo "onSubmit" el cual ejecuta la función "handleSubmit" al momento de clickear en el botón
   * Cada input tiene asignado un atributo "onChange" el cual ejecuta la función "handleInputChange" cuando
   * se modifica el mismo (input).
   */
  return (
    <>
      <div className="container-sm w-30">
        <form onSubmit={handleSubmit}>
          <div className="row">
            <label htmlFor="identification" className="form-label">
              Identification
            </label>
            <input
              type="text"
              placeholder="identification"
              className="form-control"
              onChange={handleInputChange}
              name="identification"
            ></input>
          </div>
          <div className="row">
            <label htmlFor="firstname" className="form-label">
              Firstname
            </label>
            <input
              type="text"
              placeholder="firstname"
              className="form-control"
              onChange={handleInputChange}
              name="firstname"
            ></input>
          </div>
          <div className="row">
            <label htmlFor="lastname" className="form-label">
              Lastname
            </label>
            <input
              type="text"
              placeholder="lastname"
              className="form-control"
              onChange={handleInputChange}
              name="lastname"
            ></input>
          </div>
          <div className="d-flex justify-content-center">
            <button type="submit" className="btn btn-dark btn-submit mb-4">
              Submit
            </button>
          </div>
        </form>
      </div>

      <div className="container-sm">
        <table class="table table-dark table-striped">
          <thead>
            <tr>
              <th>Identification</th>
              <th>Firstname</th>
              <th>Lastname</th>
            </tr>
          </thead>
          <tbody>
            {/**
             * La función map se ejecuta sobre la variable de estado que contiene los datos traidos de la base de datos
             * y realizamos un "map" para llenar nuestra tabla por cada elemento dentro del array de estudiantes
             */}
            {studentTableData.student.map((student) => (
              <tr>
                <td>{student.identification}</td>
                <td>{student.firstname}</td>
                <td>{student.lastname}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default HomePage;
