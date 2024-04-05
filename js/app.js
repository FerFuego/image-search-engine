import api_pixabay from './classes/class-api.js';
import UI from './classes/class-ui.js';

const formulario = document.querySelector('#formulario');
const resultado = document.querySelector('#resultado');
const paginacion = document.querySelector('#paginacion');

export const ui = new UI();
export const api = new api_pixabay();

document.addEventListener('DOMContentLoaded', () => {

    // Listener del formulario
    formulario.addEventListener('submit', (e) => {
        e.preventDefault();

        const termino = document.querySelector('#termino').value;
        if (ui.validateInput(termino)) {
            // Llamada a la API
            
            const results = api.getData(termino);
            // Llamada a la UI Data
            ui.showData(results);
            // Llamada a la UI Paginación
            results.then(results => {
                const totalPaginas = Math.ceil(results.totalHits / results.hits.length);
                ui.showPaginacion(totalPaginas);
            });
        } else {
            ui.showAlert('Debes escribir un termino de búsqueda', 'error');
        }
    })
});