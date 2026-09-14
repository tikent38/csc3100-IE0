// src/MyApp.jsx
//import React from "react";
import React, { useState, useEffect } from "react";

import Table from "./Table";
import Form from "./Form";

function MyApp() {
  const [characters, setCharacters] = useState([]);

  function removeOneCharacter(index) {
    const id = characters[index].id; // find the id to remove

    fetch(`http://localhost:8000/users/${id}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (res.status !== 204) { // 204 means removed successfully
          throw new Error("User was not deleted");
        }

        setCharacters((current) => // remove that chartter
          current.filter((character) => character.id !== id)
        );
      })
      .catch((error) => {
        console.log(error);
      });
  }





  function updateList(person) {
    postUser(person)
    .then((res) => { // check to make suer 201 status returned
      if (res.status !== 201) {
        throw new Error("User was not created");
      }

      return res.json();
    })

    .then((newUser) => {
      setCharacters((current) => [...current, newUser]);
    })
    .catch((error) => {
      console.log(error);
    });
  }


  function fetchUsers() {
  const promise = fetch("http://localhost:8000/users");
  return promise;
}
useEffect(() => {
  fetchUsers()
    .then((res) => res.json())
    .then((json) => setCharacters(json["users_list"]))
    .catch((error) => {
      console.log(error);
    });
}, []);

function postUser(person) {
  const promise = fetch("Http://localhost:8000/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(person),
  });

  return promise;
}


  return (
    <div className="container">
      <Table characterData={characters} removeCharacter={removeOneCharacter} />
      <Form handleSubmit={updateList} />
    </div>
  );

  
}

export default MyApp;
