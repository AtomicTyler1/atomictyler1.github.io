document.addEventListener("DOMContentLoaded", function () {
    const themeToggle = document.getElementById('dark-mode-toggle');
    const body = document.body;

    if (localStorage.getItem('dark-mode') === 'enabled') {
        body.classList.add('dark-mode');
        themeToggle.classList.add('active');
        themeToggle.textContent = "Light Mode"
    }

    themeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-mode');

        if (body.classList.contains('dark-mode')) {
            localStorage.setItem('dark-mode', 'enabled');
            themeToggle.textContent = "Light Mode"
        } else {
            localStorage.removeItem('dark-mode');
            themeToggle.textContent = "Dark Mode"
        }
    });
});
