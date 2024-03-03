// Toast function
function toast({ message, type }) {
    const toastContainer = document.createElement('div');
    toastContainer.classList.add('toast');
    toastContainer.classList.add(type);
  
    toastContainer.innerText = message;
  
    document.body.appendChild(toastContainer);
  
    setTimeout(() => {
      document.body.removeChild(toastContainer);
    }, 3000);
  }
  
  // Login form submission
  document.getElementById('login-form').addEventListener('submit', (e) => {
    e.preventDefault();
  
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
  
    // Perform your login logic here
    // For example purposes, we'll just check if the email is "test@example.com" and password is "test"
    if (email === 'test@example.com' && password === 'test') {
      // Redirect to another page or perform any action you need
      alert('Login successful');
    } else {
      // Display an error toast
      toast({ message: 'Invalid email or password', type: 'error' });
    }
  });