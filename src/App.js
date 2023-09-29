import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import "./App.css";

const Loader = () => (
  <div className="w-full h-full d-flex align-items-center justify-content-center">
    <div className="loader"></div>
  </div>
);

const URL = "https://602e7c2c4410730017c50b9d.mockapi.io/users";

const App = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false); //

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(URL)
      .then((response) => {
        const first = response.data.slice(15, 23);
        setUsers(first);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setIsLoading(false);
      });
  }, []);

  const handleUserClick = (user) => {
    setSelectedUser(user);
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  };

  return (
    <div className="container mt-5 pt-5">
      <div className="row">
        <div className="col-md-6 p-2">
          <div
            className="d-flex justify-content-center px-4 py-3 rounded-top mb-3 align-items-center"
            style={{ backgroundColor: "#C5DFFF" }}
          >
            <div className="fs-4 fw-normal">USERS LIST</div>
          </div>

          {
            <ul className="list-group ">
              {users.map((user) => (
                <li
                  key={user.id}
                  className={`mb-2 list-group-item ${
                    selectedUser && selectedUser.id === user.id ? "active" : ""
                  }`}
                  onClick={() => handleUserClick(user)}
                  style={{ backgroundColor: "#ECECEC" }}
                >
                  <div className="d-flex align-items-center rounded">
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="rounded-circle mr-3"
                      width="50"
                      height="50"
                    />
                    <div className="mx-3 fs-5 text-dark ">
                      {user.profile.firstName}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          }
        </div>
        <div className="col-md-6 p-2">
          <div
            className="d-flex justify-content-center px-4 py-3 rounded-top mb-3 align-items-center"
            style={{
              backgroundColor: "#C5DFFF",
            }}
          >
            <div className="fs-4 fw-normal">USER PROFILE</div>
          </div>
          <div>
            {selectedUser ? (
              <div>
                {isLoading ? (
                  <Loader />
                ) : (
                  <div className="card d-flex align-items-center">
                    <img
                      src={selectedUser.avatar}
                      alt={selectedUser.name}
                      className="mt-4 card-img-top rounded-circle"
                      style={{
                        backgroundColor: "#C5DFFF",
                        width: "156px",
                        height: "156px",
                      }}
                    />
                    <div className="fs-6 fw-bold mt-2">
                      @{selectedUser.profile.username}
                    </div>

                    <div className="card-body">
                      <div
                        style={{
                          backgroundColor: "#DBDBDB",
                          border: "1px solid #6C6C6C",
                          fontWeight: "530",
                        }}
                        className="p-2 rounded"
                      >
                        {selectedUser.Bio}
                      </div>
                      <div className="mt-5">
                        <div
                          className="py-1"
                          style={{
                            fontWeight: "600",
                            fontSize: "12px",
                          }}
                        >
                          Full Name
                        </div>
                        <div
                          style={{
                            backgroundColor: "#DBDBDB",
                            border: "1px solid #6C6C6C",
                            fontWeight: "530",
                          }}
                          className="p-2 rounded"
                        >
                          {selectedUser.profile.firstName}{" "}
                          {selectedUser.profile.lastName}
                        </div>
                        <div
                          className="py-1 mt-3"
                          style={{
                            fontWeight: "600",
                            fontSize: "12px",
                          }}
                        >
                          Job Title
                        </div>
                        <div
                          style={{
                            backgroundColor: "#DBDBDB",
                            border: "1px solid #6C6C6C",
                            fontWeight: "530",
                          }}
                          className="p-2 rounded"
                        >
                          {selectedUser.jobTitle}
                        </div>
                        <div
                          className="py-1 mt-3"
                          style={{
                            fontWeight: "600",
                            fontSize: "12px",
                          }}
                        >
                          Email
                        </div>
                        <div
                          style={{
                            backgroundColor: "#DBDBDB",
                            border: "1px solid #6C6C6C",
                            fontWeight: "530",
                          }}
                          className="p-2 rounded"
                        >
                          {selectedUser.profile.email}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <p>Please select a user to view their profile.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
