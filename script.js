// Dark mode toggle
const toggleBtn = document.getElementById("toggle-dark");

toggleBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark");

  // Save preference
  if (document.body.classList.contains("dark")) {
    localStorage.setItem("theme", "dark");
  } else {
    localStorage.setItem("theme", "light");
  }
});

// Load saved theme
if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark");
}
