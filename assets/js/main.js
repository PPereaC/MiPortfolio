/*=============== DARK LIGHT THEME ===============*/
const themeButton = document.getElementById('theme-button');
const darkTheme = 'dark-theme';
const iconTheme = 'ri-sun-line';

// Previously selected topic (if user selected)
const selectedTheme = localStorage.getItem('selected-theme');
const selectedIcon = localStorage.getItem('selected-icon');

// We obtain the current theme that the interface has by validating the dark-theme class
const getCurrentTheme = () => document.body.classList.contains(darkTheme) ? 'dark' : 'light';
const getCurrentIcon = () => themeButton.classList.contains(iconTheme) ? 'ri-moon-line' : 'ri-sun-line';

// We validate if the user previously chose a topic
if (selectedTheme) {
  // If the validation is fulfilled, we ask what the issue was to know if we activated or deactivated the dark
  document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](darkTheme);
  themeButton.classList[selectedIcon === 'ri-moon-line' ? 'add' : 'remove'](iconTheme);
}

// Activate / deactivate the theme manually with the button
themeButton.addEventListener('click', () => {
    // Add or remove the dark / icon theme
    document.body.classList.toggle(darkTheme);
    themeButton.classList.toggle(iconTheme);
    // We save the theme and the current icon that the user chose
    localStorage.setItem('selected-theme', getCurrentTheme());
    localStorage.setItem('selected-icon', getCurrentIcon());
});

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