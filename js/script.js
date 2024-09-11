document.addEventListener("DOMContentLoaded", function() {
    /* Show
     /hide password functionality */ // We are using multiline comment know block comment

    document.getElementById("showPassword").addEventListener("change", function() {
        const passwordField = document.getElementById("password");
        if (this.checked) {
            passwordField.type = "text";
        } else {
            passwordField.type = "password";
        }
    });

    // Form submission and validation
    document.getElementById("loginForm").addEventListener("submit", function(event) {
        event.preventDefault();

        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
        const message = document.getElementById("message");
        const loader = document.getElementById("loader");
        
        // Clear previous messages
        message.innerText = "";

        // Client-side validation
        if (!validateEmail(email)) {
            message.innerText = "Please enter a valid email.";
            return;
        }

        if (password.length < 6) {
            message.innerText = "Password must be at least 6 characters long.";
            return;
        }

        
        loader.style.display = "block";

       
        login(email, password);
    });

    // Function to validate email format
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    // Function to handle login via API
    function login(email, password) {
        fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: email,
                password: password
            }),
        })
        .then(response => response.json())
        .then(data => {
            // Check the response format based on your real API
            if (data && data.id) { 
                document.getElementById("message").innerText = "Login successful!";
                console.log(data);
            } else {
                document.getElementById("message").innerText = "Login failed! Invalid credentials.";
                console.log("Error");
            }
        })
        .catch(error => {
            document.getElementById("message").innerText = "Login failed! Please try again.";
            console.error('Error:', error);
        })
        .finally(() => {
            // Hide the loader after processing
            document.getElementById("loader").style.display = "none";
        });
    }
});
