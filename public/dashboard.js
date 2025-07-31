// Wait until DOM is fully loaded
document.addEventListener("DOMContentLoaded", () => {
  const token = localStorage.getItem("token");

  //  Protect dashboard - redirect if not logged in
  if (!token) {
    alert(" Access Denied. Please login first.");
    window.location.href = "/login.html";
    return;
  }

  //  Optional: Display user info (if stored)
  const userInfo = localStorage.getItem("user");
  if (userInfo) {
    const user = JSON.parse(userInfo);
    document.getElementById("welcome-msg").textContent = `Welcome, ${user.name}`;
  }

  // Logout logic
  const logoutBtn = document.getElementById("logoutBtn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "/login.html";
    });
  }
});
