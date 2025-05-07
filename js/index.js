document.addEventListener('DOMContentLoaded', function() {
    
    const isProfilePage = document.querySelector('.main-perfil') !== null;
    const configPath = isProfilePage ? '../conf/configES.json' : './conf/configES.json';

    fetch(configPath)
    .then(response => response.text())
    .then(text => {
        const config = JSON.parse(text);
        
        if (isProfilePage) {
            
            const labels = document.querySelectorAll('.perfil__list li span');
            labels[0].textContent = config.color + ": ";
            labels[1].textContent = config.libro + ": ";
            labels[2].textContent = config.musica + ": ";
            labels[3].textContent = config.video_juego + ": ";
            labels[4].textContent = config.lenguajes + ": ";

            
            const params = new URLSearchParams(window.location.search);
            const ci = params.get('ci');

            if (ci) {
                fetch(`../${ci}/perfil.json`)
                .then(response => response.text())
                .then(text => {
                    const perfil = JSON.parse(text.replace('const perfil = ', ''));
                    
                    
                    document.title = perfil.nombre;
                    
                    
                    const img = document.querySelector('.perfil__img');
                    const source = document.querySelector('source');
                    const imgPath = `../${ci}/${ci}`;
                    
                    img.onerror = () => {
                        img.src = `${imgPath}.png`;
                        source.srcset = `${imgPath}.png`;
                    };
                    
                    img.src = `${imgPath}.jpg`;
                    source.srcset = `${imgPath}.jpg`;
                    img.alt = perfil.ci;
                    
                    
                    document.querySelector('.perfil__name').textContent = perfil.nombre;
                    document.querySelector('.perfil__description').textContent = 
                        perfil.descripcion || perfil.descripccion;
                    
                    
                    const formatList = (arr) => {
                        if (!Array.isArray(arr)) return arr;
                        if (arr.length === 1) return arr[0];
                        if (arr.length === 2) return `${arr[0]} y ${arr[1]}`;
                        return arr.slice(0, -1).join(', ') + ' y ' + arr.slice(-1);
                    };
                    
                    const listItems = document.querySelectorAll('.perfil__list li');
                    listItems[0].appendChild(document.createTextNode(perfil.color));
                    listItems[1].appendChild(document.createTextNode(formatList(perfil.libro)));
                    listItems[2].appendChild(document.createTextNode(formatList(perfil.musica)));
                    listItems[3].appendChild(document.createTextNode(formatList(perfil.video_juego)));
                    listItems[4].appendChild(document.createTextNode(formatList(perfil.lenguajes)));
                    
                    
                    const emailLink = document.querySelector('.perfil__info a');
                    emailLink.href = `mailto:${perfil.email}`;
                    emailLink.textContent = perfil.email;
                })
                .catch(error => console.error('Error al cargar el perfil:', error));
            }
        } else {
            
            document.querySelector('#curso').innerHTML = 
                `${config.sitio[0]}<span class="small">${config.sitio[1]}</span>${config.sitio[2]}`;
            document.querySelector('li:nth-child(2)').textContent = config.saludo + ", ";
            document.querySelector('input[type="text"]').placeholder = config.buscar + "...";
            document.querySelector('button[type="submit"]').innerHTML = config.buscar;
            document.querySelector('footer').textContent = config.copyRight;
        }
    })
    .catch(error => console.error('Error al cargar la configuración:', error));

    
    if (!isProfilePage) {
        fetch('./datos/index.json')
        .then(response => response.text())
        .then(text => {
            const perfiles = JSON.parse(text.replace('const perfiles = ', ''));
            const perfilesSection = document.querySelector('.perfiles__section ul');
            perfilesSection.innerHTML = '';
            
            perfiles.forEach(estudiante => {
                const li = document.createElement('li');
                li.innerHTML = `
                    <a href="perfil.html?ci=${estudiante.ci}">
                        <img src="./${estudiante.imagen}" alt="${estudiante.ci}">
                        <p>${estudiante.nombre}</p>
                    </a>
                `;
                perfilesSection.appendChild(li);
            });
        })
        .catch(error => console.error('Error al cargar los estudiantes:', error));
    }
}); 