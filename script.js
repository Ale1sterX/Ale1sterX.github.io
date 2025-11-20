// THEME TOGGLE
const toggleBtn = document.getElementById("theme-toggle");
const body = document.body;

if (localStorage.getItem("theme") === "light") {
    body.classList.add("light");
    toggleBtn.textContent = "☀️";
}

toggleBtn.addEventListener("click", () => {
    body.classList.toggle("light");

    if (body.classList.contains("light")) {
        localStorage.setItem("theme", "light");
        toggleBtn.textContent = "☀️";
    } else {
        localStorage.setItem("theme", "dark");
        toggleBtn.textContent = "🌙";
    }
});
