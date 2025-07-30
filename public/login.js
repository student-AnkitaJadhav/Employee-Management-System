document.getElementById("loginForm").addEventListener("submit", async function (e) {
  e.preventDefault(); // prevent default form submission

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;

  try {
    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, password })
    });

    const data = await response.json();

    if (response.ok) {
      alert("Login successful!");
      console.log("Token:", data.token);

      // Store token in localStorage (optional)
      localStorage.setItem("token", data.token);

      // Redirect to dashboard or some protected page
      window.location.href = "/home.html";
    } else {
      alert("Login failed: " + data.message);
    }
  } catch (err) {
    console.error("Error:", err);
    alert("Something went wrong. Try again.");
  }
});
