import "./styles.css";

const themeBtn = document.getElementById('moon-icon');
const todoInput = document.getElementById("create-todo-input");

function toggleTheme() {
    const DARKCOLOR = 'rgb(14, 10, 15)';
    const LIGHTCOLOR = 'rgb(255, 255, 255)';
    if (document.body.classList.contains('light')) {
        document.body.style.backgroundColor = LIGHTCOLOR;
        document.body.style.color = DARKCOLOR;
        themeBtn.innerHTML = `<i class="fa-solid fa-moon fa-2x"></i>`;
    } else if (document.body.classList.contains('dark')) {
        document.body.style.backgroundColor = DARKCOLOR;
        document.body.style.color = LIGHTCOLOR;
        themeBtn.innerHTML = `<i class="fa-solid fa-sun fa-2x"></i>`;
    }
}

themeBtn.addEventListener('click', () => {
    document.body.classList.toggle('light');
    document.body.classList.toggle('dark');
    toggleTheme();
});

