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

  const deleteRow = (id: number) => {
    try {
      fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then((res) => console.log(res));
      alert("Row Deleted");
    } catch (error: any) {
      alert(error.message);
    }
  };

  const isCompletedToggle = (row: fetchedDataI) => {
    try {
      fetch(`https://jsonplaceholder.typicode.com/todos/${row.id}`, {
        method: "PATCH",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: parseInt((row.id / 20 + 1).toString()),
          id: row.id,
          title: row.title,
          completed: row.completed.props.children === "true" ? false : true,
        }),
      });
      alert(
        `Completed Changed to ${
          row.completed.props.children === "true" ? false : true
        }`
      );
    } catch (error: any) {
      alert(error.message);
    }
  };

  const fetchedData = () => {
    fetch("https://jsonplaceholder.typicode.com/todos")
      .then((response) => response.json())
      .then((data) => {
        let rows: React.SetStateAction<any> = [];
        data.forEach((row: fetchedDataI) => {
          row.completed = (
            <span
              className={styles.isCompleted}
              onClick={() => isCompletedToggle(row)}
            >
              {row.completed.toString()}
            </span>
          );
          row.delete = (
            <button
              className={styles.deleteRowButton}
              onClick={() => deleteRow(row.id)}
            >
              Delete
            </button>
          );
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
      {
        label: "Delete",
        field: "delete",
        sort: "asc",
        width: 50,
      },
    ],
    rows: dataToShow,
  };

  useEffect(() => {
    fetchedData();
    // eslint-disable-next-line
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
      <a href='/#/upload' className={styles.uploadButton}>
        Upload
      </a>
    </div>
  );
};

export default Todo;
