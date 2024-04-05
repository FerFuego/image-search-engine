import {api} from '../app.js';

class UI {

    validateInput(termino) {
        if (termino === '') {
            return false
        } else {
            return true
        }
    }

    showAlert(mensaje, tipo) {
        const div = document.createElement('div');
        if (tipo === 'error') {
            div.classList.add('bg-red-500', 'text-white', 'p-3', 'mt-5', 'text-center', 'font-bold');
        } else {
            div.classList.add('bg-green-500', 'text-white', 'p-3', 'mt-5', 'text-center', 'font-bold');
        }
        div.innerHTML = `${mensaje}`;
        formulario.appendChild(div);
        setTimeout(() => {
            div.remove();
        }, 3000);
    }

    showData(results) {
        // limpiar HTML
        this.clearHtml();

        // Mostrar los resultados
        results.then(results => {
            if (results.total > 0) {
                results.hits.forEach(result => {
                    const {user, largeImageURL, likes, views, downloads, tags} = result;
                    const div = document.createElement('div');
                    div.classList.add('card', 'max-w-sm', 'rounded', 'overflow-hidden', 'shadow-lg', 'bg-white');
                    div.innerHTML = `
                        <a class="card-img-link" href="${largeImageURL}" target="_blank">
                            <img class="w-full h-80" src="${largeImageURL}">
                        </a>
                        <div class="px-6 py-4">
                            <div class="font-bold text-xl mb-2">@${user}</div>
                            <p class="text-gray-700 text-base">
                                Likes: ${likes} <br>
                                Visitas: ${views} <br>
                                Descargas: ${downloads}
                            </p>
                        </div>`;

                    const divFooter = document.createElement('div');
                    divFooter.classList.add('px-6', 'pt-4', 'pb-2');
                        tags.split(',').forEach(tag => {
                            divFooter.innerHTML += `<span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">${tag}</span>`;
                        });

                    div.appendChild(divFooter);
                    resultado.appendChild(div); 
                });
            } else {
                const noResults = document.createElement('div');
                noResults.classList.add('alerta', 'bg-red-500', 'text-white', 'p-3', 'mt-5', 'text-center', 'font-bold');
                noResults.textContent = 'No hay resultados';
                resultado.appendChild(noResults);
            }
        })
    }

    showPaginacion(totalPaginas) {
        // limpiar HTML
        const paginacion = document.querySelector('#paginacion');
        paginacion.innerHTML = '';
        const div = document.createElement('div');
        div.classList.add('py-3', 'w-full', 'flex', 'gap-2', 'justify-center', 'mt-10');
        for (let i = 1; i <= totalPaginas; i++) {
            const btn = document.createElement('a');
            btn.textContent = i;
            btn.onclick = () => {
                // traer el termino de la busqueda
                const termino = document.querySelector('#termino').value;
                // Llamada a la API
                this.showData(api.getData(termino, i));
            }
            btn.classList.add('bg-green-400', 'px-4', 'py-1', 'cursor-pointer');
            div.appendChild(btn);
        }
        paginacion.appendChild(div);
    }

    clearHtml() {
        while (resultado.firstChild) {
            resultado.removeChild(resultado.firstChild);
        }
    }

}

export default UI;