import React from "react";

const idb =
  window.indexedDB ||
  window.mozIndexedDB ||
  window.webkitIndexedDB ||
  window.msIndexedDB ||
  window.shimIndexedDB;

export const intializeDB = () => {
  if (!idb) {
    console.log("browser does not support");
  }

  const req = idb.open("user-db", 1);

  req.onerror = (event) => {
    console.log("Error ", event);
  };

  req.onupgradeneeded = (event) => {
    const db = req.result;

    if (!db.objectStoreNames.contains("userData")) {
      db.createObjectStore("userData", {
        keyPath: "email",
      });
    }
  };

  req.onsuccess = () => {
    console.log("database opened");
  };

  console.log("DB ", idb);
};

export const registerUser = (email, password) => {
  const dbPromise = idb.open("user-db", 1);

  dbPromise.onsuccess = () => {
    const db = dbPromise.result;

    const tx = db.transaction("userData", "readwrite");

    const userData = tx.objectStore("userData");

    const postRequest = userData.add({
      email,
      password,
    });

    postRequest.onsuccess = () => {
      tx.oncomplete = () => {
        db.close();
      };

      console.log("user added");
    };

    postRequest.onerror = (event) => {
      console.log("error occ ", event);
    };
  };
};


export const loginUser = async (email) => {
  return new Promise((resolve, reject) => {
    const dbPromise = idb.open("user-db", 1);

    dbPromise.onsuccess = () => {
      const db = dbPromise.result;
      const tx = db.transaction("userData", "readonly");
      const userData = tx.objectStore("userData");
      const getRequest = userData.get(email);

      getRequest.onsuccess = (event) => {
        const data = event.target.result;
        console.log("User data:", data);
        resolve(data);
      };

      getRequest.onerror = (event) => {
        console.log("Error fetching user data:", event.target.error);
        reject(event.target.error);
      };
    };

    dbPromise.onerror = (event) => {
      console.log("Error opening database:", event.target.error);
      reject(event.target.error);
    };
  });
};



export const addTodos = (email, task) => {
  const dbPromise = idb.open("user-db", 1);

  dbPromise.onsuccess = () => {
    const db = dbPromise.result;
    const tx = db.transaction("userData", "readwrite");
    const userData = tx.objectStore("userData");
    const getRequest = userData.get(email);

    getRequest.onsuccess = (event) => {
      let data = event.target.result;

      // Ensure the property 'tasks' exists in the data
      data.tasks = [...(data.tasks || []), task];

      const putRequest = userData.put(data);

      putRequest.onsuccess = () => {
        tx.oncomplete = () => {
          db.close();
        };
        console.log("Task added");
      };

      putRequest.onerror = (event) => {
        console.log("Error adding task:", event.target.error);
      };
    };

    getRequest.onerror = (event) => {
      console.log("Error fetching user data:", event.target.error);
    };
  };

  dbPromise.onerror = (event) => {
    console.log("Error opening database:", event.target.error);
  };
};



export const updateTask = (email, updatedTasks) => {


  const dbPromise = idb.open("user-db", 1);

  dbPromise.onsuccess = () => {
    const db = dbPromise.result;
    const tx = db.transaction("userData", "readwrite");
    const userData = tx.objectStore("userData");
    const getRequest = userData.get(email);

    getRequest.onsuccess = (event) => {
      let data = event.target.result;

      let Tasks = data.tasks;

    


      // console.log("check ",updatedTask ,allTasks)




      // data.tasks = [...allTasks];

      const putRequest = userData.put({...data,tasks:updatedTasks});

      putRequest.onsuccess = () => {
        tx.oncomplete = () => {
          db.close();
        };
        console.log("Task added");
      };

      putRequest.onerror = (event) => {
        console.log("Error adding task:", event.target.error);
      };
    };

    getRequest.onerror = (event) => {
      console.log("Error fetching user data:", event.target.error);
    };
  };

  dbPromise.onerror = (event) => {
    console.log("Error opening database:", event.target.error);
  };




}



export const getAllTodos = (email) => {
  return new Promise((resolve, reject) => {
    const dbPromise = idb.open("user-db", 1);

    dbPromise.onsuccess = () => {
      const db = dbPromise.result;
      const tx = db.transaction("userData", "readonly");
      const userData = tx.objectStore("userData");

      console.log("key ", email)
      const getRequest = userData.get(email);

      getRequest.onsuccess = (event) => {
        const data = event.target.result;
        console.log("User data:", data);


        if (data && data.tasks) {
          resolve(data.tasks);
        } else {
          resolve([]);
        }
      };

      getRequest.onerror = (event) => {
        console.log("Error fetching user data:", event.target.error);
        reject(event.target.error);
      };
    };

    dbPromise.onerror = (event) => {
      console.log("Error opening database:", event.target.error);
      reject(event.target.error);
    };
  });
}


