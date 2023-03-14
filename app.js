const btn_ajustes = document.getElementById('btn-ajustes');
const btn_cerrar = document.getElementById('btn-cerrar');
const ajustes = document.getElementById('ajustes');

btn_ajustes.addEventListener('click', () => {
    ajustes.style.display = 'flex';
})

btn_cerrar.addEventListener('click', () => {
    ajustes.style.display = 'none';
})