document.addEventListener("DOMContentLoaded", () => {
  // Get elements from the DOM
  const loginBtn = document.getElementById("loginBtn");
  const loginModal = document.getElementById("loginModal");
  const loginSubmit = document.getElementById("loginSubmit");
  const registerLink = document.getElementById("registerLink");
  const profileIcon = document.getElementById("profileIcon");
  const logoutBtn = document.getElementById("logoutBtn");
  const logoutTooltip = document.getElementById("logoutTooltip");

  // Show login modal when login button is clicked
  loginBtn.addEventListener("click", () => {
    loginModal.style.display = "block";
  });

  // Handle login form submission
  loginSubmit.addEventListener("click", () => {
    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    // Save username and email to local storage
    localStorage.setItem("username", username);
    localStorage.setItem("email", email);
    // Hide login modal and login button, show profile icon with username
    loginModal.style.display = "none";
    loginBtn.style.display = "none";
    profileIcon.innerText = username;
  });

  // Show tooltip with logout button when hovering over profile icon
  profileIcon.addEventListener("mouseover", () => {
    logoutTooltip.style.display = "block";
  });

  // Hide tooltip when not hovering over profile icon
  profileIcon.addEventListener("mouseout", () => {
    logoutTooltip.style.display = "none";
  });

  // Handle register link click
  registerLink.addEventListener("click", (event) => {
    event.preventDefault();
    alert("Registration functionality not implemented yet.");
  });

  // Handle logout button click
  logoutBtn.addEventListener("click", () => {
    // Remove username and email from local storage
    localStorage.removeItem("username");
    localStorage.removeItem("email");
    // Show login button and clear profile icon text
    loginBtn.style.display = "block";
    profileIcon.innerText = "";
    alert("Logged out successfully");
  });

  // Close login modal when clicking outside of it
  window.addEventListener("click", (event) => {
    if (event.target == loginModal) {
      loginModal.style.display = "none";
    }
  });
});
