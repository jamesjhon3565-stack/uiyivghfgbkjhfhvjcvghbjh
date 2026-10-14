'use strict';

const menuButton = document.querySelector('.menu-toggle');
const navLinks = document.getElementById('navlinks');

menuButton.addEventListener('click', () => {
    const open = menuButton.getAttribute('aria-expanded') !== 'true';
    menuButton.setAttribute('aria-expanded', String(open));
    navLinks.classList.toggle('open', open);
});

const currentPage = location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('#navlinks a').forEach((link) => {
    if (link.getAttribute('href') === currentPage) {
        link.setAttribute('aria-current', 'page');
    }
});

const checklist = document.querySelectorAll('.checklist input');
checklist.forEach((input) => {
    input.addEventListener('change', () => {
        const completed = [...checklist].filter((item) => item.checked).length;
        document.getElementById('check-status').textContent = `${completed} von ${checklist.length} Vorbereitungen erledigt.`;
    });
});

const styles = {
    hatha: ['Hatha Yoga', 'Du möchtest Haltungen in Ruhe kennenlernen? Entdecke Hatha als möglichen Einstieg.'],
    vinyasa: ['Vinyasa Flow', 'Du magst fließende Bewegung? Erfahre mehr über die Verbindung von Atem und Bewegung.'],
    yin: ['Yin Yoga', 'Du möchtest dir Zeit für ruhige Positionen nehmen? Lerne die Grundidee von Yin Yoga kennen.']
};

document.querySelectorAll('[data-style]').forEach((button) => {
    button.setAttribute('aria-pressed', 'false');
    button.addEventListener('click', () => {
        document.querySelectorAll('[data-style]').forEach((item) => {
            item.setAttribute('aria-pressed', String(item === button));
        });
        const [name, description] = styles[button.dataset.style];
        const paragraph = document.createElement('p');
        paragraph.textContent = description;
        const link = document.createElement('a');
        const extension = currentPage.endsWith('.php') ? 'php' : 'html';
        link.href = `yoga.${extension}#${button.dataset.style}`;
        link.textContent = `${name} kennenlernen ↗`;
        document.getElementById('style-result').replaceChildren(paragraph, link);
    });
});
