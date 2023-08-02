<h1 align="center">Social Media Authentication</h1>
<br>

## Team Members

- Pratheep (21BCE1093)
- Dhanush SR (21BCE1204)
- S.Jayanth Kumar (21BCE1218)

## Setup process

Run the below command in the root directory to install all required packages for the backend server:

```
npm install
```

Create FireBase Account and get the required Secret Keys then create a file inside src folder called firebase.config.js and add the following. Make sure to add the required secret keys inside "" :

```
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "",
  authDomain: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: "",
  measurementId: ""
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
```

## Running process

Run the below command in the root directory:

```
npm start

```

### Research Paper: [Social Media User Authentication](https://drive.google.com/file/d/1i1PPK5zA50B3c7AbSWazA_cKKH5gCFVF/view?usp=sharing)

