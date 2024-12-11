// TEXT FADE IN
setTimeout(() => { //fading in skip link and first line simultaneously 
    const lineOne = document.getElementById('hiddenText1');
    lineOne.style.opacity = 1; 
    const skipLink = document.getElementById('hiddenLink');
    skipLink.style.opacity = 1; 
}, 1500); 

setTimeout(() => {
    const lineTwo = document.getElementById('hiddenText2');
    lineTwo.style.opacity = 1; 
}, 2750); 

setTimeout(() => {
    const lineThree = document.getElementById('hiddenText3');
    lineThree.style.opacity = 1; 
}, 4000); 

setTimeout(() => {  //replacing text display of skip link
    const lineFour = document.getElementById('hiddenText4');
    lineFour.style.opacity = 1; 
    const homePageLink = document.getElementById('hiddenLink');
    homePageLink.textContent = "To Home Page";
}, 5250); 

// BACK TO STOP BUTTON
const backToTopButton = document.getElementById('backToTop');

window.addEventListener('scroll', () => { // showing button when scolled 400px
    if (window.scrollY > 1000) { 
        backToTopButton.classList.add('show');
    } else {
        backToTopButton.classList.remove('show');
    }
});

backToTopButton.addEventListener('click', () => { // smooth scroll back to the top of page
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});