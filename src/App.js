import "./styles.css";
import { useState } from "react";
import celebrities, { deleteRecord } from "./celebrities";
import { CaretDown } from "phosphor-react";

export default function App() {
  const [Celebrities, setCelebrities] = useState(celebrities);
  const [contentEditable, setContentEditable] = useState(false);
  const [dropDown, setDropDown] = useState(false);
  const [id, setId] = useState(0);
  const date = new Date();
  const currentYear = date.getFullYear();

  //  console.log(currentYear);

  function handleClick(value) {
    console.log(value);
    setId(value);
    if (id === value) {
      setDropDown(!dropDown);
    }
  }

  function upDateData() {
    setContentEditable(!contentEditable);
  }

  function handleDelete(id) {
    // setCelebrities(deleteRecord(id));
    const newArr = deleteRecord(id);
    setCelebrities(newArr);
    console.log(Celebrities);
  }
  return (
    <div className="App">
      {Celebrities.map((celebrity) => {
        return (
          <div className="card">
            <div
              key={celebrity.id}
              className="profile"
              onClick={() => {
                !contentEditable ? handleClick(celebrity.id) : null;
              }}
            >
              <div
                style={{ display: "flex", alignItems: "center", gap: "30px" }}
              >
                <img
                  src={celebrity.picture}
                  style={{ borderRadius: "50px" }}
                  alt={celebrity.picture}
                />
                <span style={{ display: "flex", gap: "8px", cursor: "text" }}>
                  <h2
                    style={{
                      outline:
                        id === celebrity.id && contentEditable
                          ? "2px solid black"
                          : "none",
                      Padding: "2px"
                    }}
                  >
                    {celebrity.first} {celebrity.last}
                  </h2>
                </span>
              </div>
              <div
                style={{
                  transform:
                    id === celebrity.id && dropDown
                      ? "rotate(180deg)"
                      : "rotate(0deg)"
                }}
              >
                <CaretDown size="30" />
              </div>
            </div>
            <div
              className="profile-details"
              style={{
                display: id === celebrity.id && dropDown ? "inline" : "none"
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  objectFit: "cover"
                }}
              >
                <span>
                  Dob
                  <p
                    style={{
                      outline: contentEditable ? "2px solid black" : "none"
                    }}
                    contentEditable={contentEditable}
                  >
                    {currentYear - Number(celebrity.dob.substring(0, 4))}yrs
                  </p>
                </span>
                <span style={{ width: "90px" }}>
                  Gender
                  <p
                    style={{
                      outline: contentEditable ? "2px solid black" : "none"
                    }}
                    contentEditable={contentEditable}
                  >
                    {!contentEditable ? (
                      celebrity.gender
                    ) : (
                      <select
                        style={{
                          border: "none",
                          outline: "none",
                          width: "100%"
                        }}
                      >
                        <option selected>{celebrity.gender}</option>
                        <option>
                          {celebrity.gender === "male" ? "female" : "male"}
                        </option>
                      </select>
                    )}
                  </p>
                </span>
                <span>
                  Email
                  <p
                    style={{
                      outline: contentEditable ? "2px solid black" : "none"
                    }}
                    contentEditable={contentEditable}
                  >
                    {celebrity.email}
                  </p>
                </span>
                <span>
                  Country
                  <p
                    style={{
                      outline: contentEditable ? "2px solid black" : "none"
                    }}
                    contentEditable={contentEditable}
                  >
                    {celebrity.country}
                  </p>
                </span>
              </div>
              <div className="description">
                <span>
                  Description
                  <p
                    style={{
                      outline: contentEditable ? "2px solid black" : "none"
                    }}
                    contentEditable={contentEditable}
                  >
                    {celebrity.description}
                  </p>
                </span>
              </div>
              <div className="buttons">
                <button onClick={() => handleDelete(celebrity.id - 1)}>
                  Delete
                </button>
                <button
                  onClick={() =>
                    !contentEditable
                      ? setContentEditable(!contentEditable)
                      : upDateData()
                  }
                >
                  {!contentEditable ? "Edit" : "Save"}
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
