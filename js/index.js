document.addEventListener('DOMContentLoaded', function() {
    fetch('./reto3/conf/configES.json')
    .then(response => response.text())
    .then(text => {
        const config = JSON.parse(text);
        document.querySelector('#curso').innerHTML = 
            `${config.sitio[0]}<span class="small">${config.sitio[1]}</span>${config.sitio[2]}`;
        document.querySelector('li:nth-child(2)').textContent = config.saludo + ", ";
        document.querySelector('input[type="text"]').placeholder = config.buscar + "...";
        document.querySelector('button[type="submit"]').innerHTML = config.buscar;
        document.querySelector('footer').textContent = config.copyRight;
        console.log(config);
        console.log('Configuración cargada');
    })
    .catch(error => console.error('Error al cargar la configuración:', error));
}); 