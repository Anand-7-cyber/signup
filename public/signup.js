document.addEventListener('DOMContentLoaded', function () {
    const signupForm = document.getElementById('signupForm');

    signupForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const username = document.getElementById('username').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        try {
            const response = await fetch('http://localhost:5000/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, email, password }),
            });

            // Check for response status
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();

            if (data.success) {
                document.getElementById('successMessage').textContent = data.message;
                alert('Signup Successful!');
                window.location.href = '/login'; // Redirect to login page after success
            } else {
                document.getElementById('errorMessage').textContent = data.message;
            }
        } catch (error) {
            console.error('Error:', error);  // Log any error that occurs
            document.getElementById('errorMessage').textContent = 'There was an error with the request.';
        }
    });
});
