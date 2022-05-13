import displayMessage from "./components/displayMessage.js";
import { saveToken, saveUser } from "./utils/storage.js";
import { baseUrl } from "./api.js";

const form = document.querySelector(".form");
const username = document.querySelector("#exampleInputEmail1");
const password = document.querySelector("#exampleInputPassword1");
const message = document.querySelector(".message-container");

form.addEventListener("submit", submitForm);

function submitForm(event) {
    event.preventDefault();

    message.innerHTML = ""; 

    const usernameValue = username.value.trim();
    const passwordValue = password.value.trim();

    if(usernameValue.length === 0 || passwordValue.length === 0) {
        return displayMessage("warning", "invalid values", (".message-container"));
    }

    userLogin(usernameValue, passwordValue); 
}

async function userLogin(username, password) {
    const url = baseUrl + "auth/local"; 

    const data = JSON.stringify({ identifier: username, password: password}); 

    const options = {
        method: "POST",
        body: data,
        headers: {
            "Content-Type": "application/json",
        },
    }; 

    try {
        const response = await fetch(url, options); 
        const json = await response.json();
        
        console.log(json); 

        if (json.user) {
           displayMessage("success", "Successfylly logged in", ".message-container"); 

            saveToken(json.jwt); 
            saveUser(json.user); 

            location.href = "/"; 
        }

        if(json.error) {
            displayMessage("warning", "Invalid login details", ".message-container"); 
        }
    }
    catch(error) {
        console.log(error); 
    }
}