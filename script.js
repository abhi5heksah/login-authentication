import { initializeApp } from  "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyCBRYy-bgrW494zaGC1KQDrTJnnySw2oEY",
    authDomain: "userauth-18942.firebaseapp.com",
    projectId: "userauth-18942",
    storageBucket: "userauth-18942.appspot.com",
    messagingSenderId: "118343108813",
    appId: "1:118343108813:web:9c89c2628cb2aca49f8184",
    measurementId: "G-1WQ49Y4CGD"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const main = document.getElementById("main");
const createAcc = document.getElementById("create-acct");
const logged = document.getElementById("logged-in");
const logoutButton = document.getElementById("logout");

const user = auth.currentUser;

if (user) {
   
    logged.style.display = "block";
    main.style.display = "none";
    createAcc.style.display = "none";
} else {
    
    logged.style.display = "none";
}

// Login functionality
const submitButton = document.getElementById("submit");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");

submitButton.addEventListener("click", function () {
    const email = emailInput.value;
    const password = passwordInput.value;

    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            console.log("Success! Welcome back!");
            window.alert("Success! Welcome back!");
            logged.style.display = "block"; // Show logout button after login
            main.style.display = "none"; // Hide the login form
            createAcc.style.display = "none"; // Hide the signup form
            document.getElementById("user").innerHTML = "Hello, "+user.email
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.error("Error occurred. Try again.");
            window.alert("Error occurred. Try again.");
        });
});

// Sign-up functionality
const signupButton = document.getElementById("sign-up");

signupButton.addEventListener("click", function () {
    main.style.display = "none";
    createAcc.style.display = "block";
});

const signupEmailIn = document.getElementById("email-signup");
const confirmSignupEmailIn = document.getElementById("confirm-email-signup");
const signupPasswordIn = document.getElementById("password-signup");
const confirmSignUpPasswordIn = document.getElementById("confirm-password-signup");
const createAccbtn = document.getElementById("create-acct-btn");
const returnBtn = document.getElementById("return-btn");

createAccbtn.addEventListener("click", function () {
    var isVerified = true;
    const signupEmail = signupEmailIn.value;

    const signupPassword = signupPasswordIn.value;
    const confirmSignUpPassword = confirmSignUpPasswordIn.value;

    if (signupPassword !== confirmSignUpPassword) {
        window.alert("Password fields do not match. Try again.");
        isVerified = false;
    }

    if (signupEmail === "" || signupPassword === "" || confirmSignUpPassword === "") {
        window.alert("Please fill out all required fields.");
        isVerified = false;
    }

    if (isVerified) {
        createUserWithEmailAndPassword(auth, signupEmail, signupPassword)
            .then((userCredential) => {
                // Signed in
                const user = userCredential.user;
                window.alert("Success! Account created.");
                main.style.display = "block";
                createAcc.style.display = "none";
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.error("Error occurred. Try again.");
                window.alert("Error occurred. Try again.");
            });
    }
});

returnBtn.addEventListener("click", function () {
    main.style.display = "block";
    createAcc.style.display = "none";
});

// Logout functionality
logoutButton.addEventListener("click", function () {
    signOut(auth)
        .then(() => {
            // Sign-out successful.
            console.log("User signed out.");
            window.alert("You have been logged out.");
            logoutButton.style.display = "none";
            main.style.display = "block";
            createAcc.style.display = "none";
            logged.style.display="none";
        })
        .catch((error) => {
            // An error happened.
            console.error("Error occurred while signing out:", error);
            window.alert("Error occurred while signing out. Please try again.");
        });
});