document.addEventListener("DOMContentLoaded", function() {
    fetch('cursos.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            const cursos = data.paginaWebCursos.cursos;
            const contenedor = document.querySelector('.cards-container');
            contenedor.innerHTML = '';

            cursos.forEach(curso => {
                const card = document.createElement('div');
                card.className = 'card';
                card.innerHTML = `
                    <div class="image-container">
                        <img src="${curso.imagen}" alt="${curso.titulo}">
                    </div>
                    <div class="text-container">
                        <h6>${curso.titulo}</h6>
                        <span>Instructor: ${curso.profesor.nombre}</span>
                        <div class="datos">
                            <p>${curso.duracion} - $${curso.valor.toLocaleString()}</p>
                        </div>
                        <p>${curso.descripcion}</p>
                        <button type="button" class="btn">Más información</button>
                    </div>
                `;
                contenedor.appendChild(card);
            });
        })
        .catch(error => console.error('Error al cargar el JSON:', error));
});
