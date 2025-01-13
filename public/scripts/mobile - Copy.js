const mobileMenuButtonElement = document.getElementById('mobileMenuButton');
const mobileMenuElement = document.getElementById('mobileMenu');

function toggle(){
    mobileMenuElement.classList.toggle('open')
}




mobileMenuButtonElement.addEventListener('click',toggle)