import "./styles.css";

document.addEventListener('DOMContentLoaded', () => {

    const themeBtn = document.getElementById('moon-icon');
    const todoInput = document.getElementById('create-todo-input');
    const headerElement = document.getElementById('header');
    const inputTodoContainer = document.querySelector('.input-todo');

    function toggleTheme() {
        const DARKCOLOR = 'rgb(14, 10, 15)';
        const LIGHTCOLOR = 'rgb(255, 255, 255)';
        if (document.body.classList.contains('light')) {
            document.body.style.backgroundColor = LIGHTCOLOR;
            document.body.style.color = DARKCOLOR;
            themeBtn.innerHTML = `<i class="fa-solid fa-moon fa-2x"></i>`;
            headerElement.style.backgroundImage = "url('/assets/sticky-unsplash.webp)";
            headerElement.style.color = DARKCOLOR;
        } else if (document.body.classList.contains('dark')) {
            document.body.style.backgroundColor = DARKCOLOR;
            document.body.style.color = LIGHTCOLOR;
            themeBtn.innerHTML = `<i class="fa-solid fa-sun fa-2x"></i>`;
            headerElement.style.backgroundImage = "url('/assets/sticky-3-unsplash.webp')";
            inputTodoContainer.style.backgroundColor = 'rgba(14, 10, 15, 0.25)';
            inputTodoContainer.style.color = LIGHTCOLOR;
            headerElement.style.color = LIGHTCOLOR;
        }
    }

    themeBtn.addEventListener('click', () => {
        document.body.classList.toggle('light');
        document.body.classList.toggle('dark');
        toggleTheme();
    });

    toggleTheme();
});