const button = document.getElementById('colorButton');
const title = document.getElementById('main-title');

button.addEventListener('click', () => {
    // Generates a random hex color
    const randomColor = '#' + Math.floor(Math.random()*16777215).toString(16);
    title.style.color = randomColor;
});
