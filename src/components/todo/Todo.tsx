import React, { useState, useEffect } from "react";
import styles from "./Todo.module.css";
import { fetchedDataI } from "../../interfaces";
import { useDispatch } from "react-redux";
import { logout } from "../../store/loginSlice";
const mdbreact = require("mdbreact");
const { MDBDataTable } = mdbreact;

const Todo = () => {
  const [dataToShow, setDataToShow] = useState<any[]>([]);
  const dispatch = useDispatch();

  const fetchedData = () => {
    fetch("https://jsonplaceholder.typicode.com/todos")
      .then((response) => response.json())
      .then((data) => {
        let rows: React.SetStateAction<any> = [];
        data.forEach((row: fetchedDataI) => {
          row.completed = row.completed.toString();
          rows.push(row);
        });
        setDataToShow(rows);
      });
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  const data = {
    columns: [
      {
        label: "ID",
        field: "id",
        sort: "asc",
        width: 50,
      },
      {
        label: "Title",
        field: "title",
        sort: "asc",
        width: 200,
      },
      {
        label: "Completed",
        field: "completed",
        sort: "asc",
        width: 50,
      },
    ],
    rows: dataToShow,
  };

  useEffect(() => {
    fetchedData();
  }, []);

  return (
    <div className={styles.todoContainer}>
      <div className={styles.tableContainer}>
        <MDBDataTable
          scrollY
          entriesOptions={[10, 20, 50]}
          entries={20}
          pagesAmount={5}
          maxHeight='400px'
          materialSearch
          hover
          data={data}
        />
      </div>
      <a href='/#' className={styles.logout} onClick={handleLogout}>
        Logout
      </a>
    </div>
  );
};

export default Todo;
