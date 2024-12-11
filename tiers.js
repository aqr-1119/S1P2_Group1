document.addEventListener('DOMContentLoaded', () => {
    const tierSections = document.querySelectorAll('.tier-section');

    tierSections.forEach((section) => {
        section.addEventListener('click', () => {
            alert(`You selected ${section.querySelector('h2').innerText}`);
        });
    });
});
