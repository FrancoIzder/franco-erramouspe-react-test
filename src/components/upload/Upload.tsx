import React, { useState } from "react";
import styles from "./Upload.module.css";
import { useNavigate } from "react-router-dom";

const Upload = () => {
  const navigate = useNavigate();
  const [selectedId, setSelectedId] = useState("");
  const [selectedText, setSelectedText] = useState("");
  const [isCompleted, setIsCompleted] = useState(false);
  const options = [1, 2, 3, 4, 5];

  const handleSubmit = () => {
    fetch("https://jsonplaceholder.typicode.com/todos", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: 1,
        id: parseInt(selectedId),
        title: selectedText,
        completed: isCompleted,
      }),
    });
    navigate("/todo");
  };

  return (
    <div className={styles.uploadContainer}>
      <div className={styles.box}>
        <select
          defaultValue='1'
          className={styles.input}
          onChange={(e) => setSelectedId(e.target.value)}
        >
          {options.map((option) => (
            <option value={option} key={option}>
              {option}
            </option>
          ))}
        </select>
        <input
          type='text'
          placeholder='Title'
          className={styles.input}
          onChange={(e) => setSelectedText(e.target.value)}
        />
        <div className={styles.checkboxContainer}>
          <input
            type='checkbox'
            name='completed'
            className={styles.checkbox}
            onClick={(e) =>
              setIsCompleted((e.target as HTMLInputElement).checked)
            }
          ></input>
          <label htmlFor='completed' className={styles.checkboxLabel}>
            Completed
          </label>
        </div>
        <button
          className={styles.loginButton}
          disabled={selectedId === "" || selectedText === ""}
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default Upload;
