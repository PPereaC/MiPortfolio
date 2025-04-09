/*=============== FILTERS TABS ===============*/
const tabs = document.querySelectorAll('[data-target]'),
      tabContents = document.querySelectorAll('[data-content]');

tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        const target = document.querySelector(tab.dataset.target);

        tabContents.forEach(tc => {
            tc.classList.remove('filters__active');
        });
        target.classList.add('filters__active');

        tabs.forEach(t => {
            t.classList.remove('filter-tab-active');
        });
        tab.classList.add('filter-tab-active');
    });
});

/*=============== EXPERIENCE ===============*/
const loadExperience = (data) => {
    const timelineContainer = document.getElementById('experience-timeline');
    
    if (data.experience && Array.isArray(data.experience)) {
        data.experience.forEach((exp, index) => {
            const timelineItem = document.createElement('div');
            timelineItem.className = 'timeline-item';
            timelineItem.style.animationDelay = `${index * 0.2}s`;
            
            timelineItem.innerHTML = `
                <div class="timeline-header">
                    <div class="timeline-position">${exp.position}</div>
                    <div class="timeline-company">${exp.company}</div>
                    <div class="timeline-period">${exp.period}</div>
                </div>
                <p class="timeline-description">${exp.description}</p>
                <div class="timeline-tech">
                    ${exp.technologies.map(tech => {
                        const iconHtml = tech.icon.endsWith('.svg') ? 
                            `<img src="${tech.icon}" alt="${tech.name}">` : 
                            `<i class="${tech.icon}"></i>`;
                        return `<span class="timeline-tech-item">
                            ${iconHtml} ${tech.name}
                        </span>`;
                    }).join('')}
                </div>
            `;
            
            timelineContainer.appendChild(timelineItem);
        });

        // Añadir animaciones para cada elemento
        ScrollReveal().reveal('.timeline-item', {
            origin: 'bottom',
            distance: '30px',
            duration: 1000,
            interval: 200
        });
    }
};

/*=============== SCROLL REVEAL ANIMATION ===============*/
const sr = ScrollReveal({
    origin: 'top',
    distance: '60px',
    duration: 2500,
    delay: 400,
});

sr.reveal(`.profile__border`);
sr.reveal(`.profile__name`, {delay: 500});
sr.reveal(`.profile__profession`, {delay: 600});
sr.reveal(`.profile__social`, {delay: 700});
sr.reveal(`.profile__info-group`, {interval: 100, delay: 700});
sr.reveal(`.profile__buttons`, {delay: 800});
sr.reveal(`.filters__content`, {delay: 900});
sr.reveal(`.filters`, {delay: 1000});

/*=============== PROJECTS DATA LOADING ===============*/
function loadData() {
    fetch('assets/data/portfolio-data.json')
        .then(response => response.json())
        .then(data => {
            loadProjects(data);
            loadExperience(data);
            loadSkills(data);
            loadEducation(data);
            loadCertifications(data);
        })
        .catch(error => console.error('Error loading data:', error));
}

document.addEventListener('DOMContentLoaded', loadData);

function loadProjects() {
    fetch('assets/data/portfolio-data.json')
        .then(response => response.json())
        .then(data => {
            const projectsContainer = document.querySelector('#projects-container');
            
            if (projectsContainer) {
                projectsContainer.innerHTML = '';
                
                data.projects.forEach(project => {
                    const projectCard = `
                        <article class="projects__card">
                            <div class="projects__header">
                                <h3 class="projects__title">${project.title}</h3>
                                <span class="projects__subtitle">${project.description}</span>
                            </div>
                            <div class="projects__img-container">
                                <img src="assets/img/${project.image}" alt="${project.title}" class="projects__img">
                            </div>
                            <div class="projects__modal">
                                <div>
                                    <div class="projects__footer">
                                        <div class="projects__technologies">
                                            ${project.technologies.map(tech => 
                                                `<span class="tech-item ${tech.size ? `tech-item--${tech.size}` : ''}" title="${tech.name}">
                                                    <img src="${tech.icon}" alt="${tech.name}" class="tech-icon" />
                                                </span>`
                                            ).join('')}
                                        </div>
                                        <a href="${project.link}" class="projects__button button button__small">
                                            <i class="ri-link"></i>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </article>
                    `;
                    projectsContainer.innerHTML += projectCard;
                });

                // Inicializar animaciones
                ScrollReveal().reveal('.projects__card', {
                    origin: 'top',
                    distance: '60px',
                    duration: 2500,
                    delay: 400,
                    interval: 100
                });
            }
        })
        .catch(error => console.error('Error loading projects:', error));
}

function initProjectAnimations() {
    // Animaciones para los proyectos
    ScrollReveal().reveal('.projects__card', {
        origin: 'bottom',
        distance: '30px',
        duration: 800,
        interval: 100,
        delay: 300
    });
}

/*=============== SKILLS LOADING ===============*/
function loadSkills(data) {
    const skillsContainer = document.getElementById('skills-container');
    const filterItems = document.querySelectorAll('.skills__filter-item');
    
    if (skillsContainer && data.skills && Array.isArray(data.skills)) {
        // Función para renderizar las habilidades según el filtro
        const renderSkills = (filter = 'all') => {
            skillsContainer.innerHTML = '';
            
            // Filtrar las habilidades según la categoría seleccionada
            const filteredSkills = filter === 'all' 
                ? data.skills 
                : data.skills.filter(skill => skill.category === filter);
            
            // Crear y añadir cada habilidad al contenedor
            filteredSkills.forEach((skill, index) => {
                const skillItem = document.createElement('div');
                skillItem.className = 'skill-item';
                skillItem.style.animationDelay = `${index * 0.1}s`;
                
                skillItem.innerHTML = `
                    <img src="${skill.icon}" alt="${skill.name}">
                    <div class="skill-name">${skill.name}</div>
                `;
                
                skillsContainer.appendChild(skillItem);
            });
            
            // Inicializar animaciones para las habilidades
            ScrollReveal().reveal('.skill-item', {
                origin: 'bottom',
                distance: '20px',
                duration: 800,
                interval: 50,
                delay: 200
            });
        };
        
        // Renderizar todas las habilidades al inicio
        renderSkills();
        
        // Añadir eventos de clic a los filtros
        filterItems.forEach(item => {
            item.addEventListener('click', () => {
                // Remover la clase active de todos los filtros
                filterItems.forEach(i => i.classList.remove('active'));
                // Añadir la clase active al filtro seleccionado
                item.classList.add('active');
                // Obtener el valor del filtro
                const filterValue = item.getAttribute('data-filter');
                // Renderizar las habilidades según el filtro
                renderSkills(filterValue);
            });
        });
    }
}

/*=============== EDUCATION LOADING ===============*/
function loadEducation(data) {
    const educationContainer = document.getElementById('education-list');
    
    if (educationContainer && data.education && Array.isArray(data.education)) {
        educationContainer.innerHTML = '';
        
        data.education.forEach((edu, index) => {
            const eduItem = document.createElement('div');
            eduItem.className = 'education-item';
            eduItem.style.animationDelay = `${index * 0.2}s`;
            
            eduItem.innerHTML = `
                <div class="education-content">
                    <h3 class="education-title">${edu.title}</h3>
                    <div class="education-info">
                        <span class="education-institution">${edu.institution}</span>
                        <span class="education-year">${edu.year}</span>
                    </div>
                    ${edu.description ? `<p class="education-description">${edu.description}</p>` : ''}
                </div>
            `;
            
            educationContainer.appendChild(eduItem);
        });

        ScrollReveal().reveal('.education-item', {
            origin: 'bottom',
            distance: '30px',
            duration: 800,
            interval: 100,
            delay: 200
        });
    }
}

/*=============== CERTIFICATIONS LOADING ===============*/
function loadCertifications(data) {
    const certsContainer = document.getElementById('certifications-grid');
    
    if (certsContainer && data.certifications && Array.isArray(data.certifications)) {
        certsContainer.innerHTML = '';
        
        data.certifications.forEach((cert, index) => {
            const certItem = document.createElement('div');
            certItem.className = 'certification-card';
            certItem.style.animationDelay = `${index * 0.1}s`;
            
            certItem.innerHTML = `
                <div class="certification-image-container">
                    <img src="assets/img/${cert.image}" alt="${cert.title}" class="certification-image">
                    <div class="certification-overlay">
                        <div class="certification-info">
                            <h3 class="certification-title">${cert.title}</h3>
                            <p class="certification-instructor">${cert.instructor}</p>
                            <div class="certification-platform">
                                <img src="${cert.platform_icon}" alt="${cert.platform}" class="platform-icon">
                                <span>${cert.platform}</span>
                            </div>
                            <span class="certification-year">${cert.year}</span>
                            <a href="${cert.certificate_link}" target="_blank" class="certification-button button button__small">
                                Ver certificado <i class="ri-external-link-line"></i>
                            </a>
                        </div>
                    </div>
                </div>
            `;
            
            certsContainer.appendChild(certItem);
        });

        ScrollReveal().reveal('.certification-card', {
            origin: 'bottom',
            distance: '20px',
            duration: 800,
            interval: 50,
            delay: 200
        });
    }
}