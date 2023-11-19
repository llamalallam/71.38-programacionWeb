const navToggle = document.querySelector(".nav-toggle")
const navMenu = document.querySelector(".nav-menu")

navToggle.addEventListener("click", () =>{
    navMenu.classList.toggle("nav-menu_visible");

    if (navMenu.classList.contains("nav-menu_visible")){
        navToggle.setAttribute("aria-label", "Cerrar menu");
        } else {
            navToggle.setAttribute("aria-label", "Abrir menu");
        }
})

const carousel = document.querySelector(".carousel");
firstImg = carousel.querySelectorAll("img")[0];
arrowIcons = document.querySelectorAll(".wrapper i");

let isDragStart = false, prevPageX, prevScrollLeft;

const showHideIcons = () => {
    let scrollWidth = carousel.scrollWidth - carousel.clientWidth;
    arrowIcons[0].style.display = carousel.scrollLeft == 0 ? "none" : "block";
    arrowIcons[1].style.display = carousel.scrollLeft == scrollWidth ? "none" : "block";
}

arrowIcons.forEach(icon => { 
    icon.addEventListener("click", () =>{
        let firstImgWidth = firstImg.clientWidth + 14;
        carousel.scrollLeft += icon.id == "left" ? -firstImgWidth:firstImgWidth;
        setTimeout(() => showHideIcons(), 60);
    })
})

const dragStart = (e) => {
    // actualizar variables globales cuando el mouse se mueve hacia abajo
    isDragStart=true;
    prevPageX=e.pageX || e.touched[0].pageX;
    prevScrollLeft = carousel.scrollLeft;
}

const dragging = (e) => {
    // scrolling a la izquierda según movimiento del mouse
    if(!isDragStart) return;
    e.preventDefault();
    carousel.classList.add("dragging");
    let positionDiff = (e.pageX || e.touched[0].pageX) - prevPageX;
    carousel.scrollLeft = prevScrollLeft - positionDiff;
}

const dragStop = () => {
    isDragStart=false;
    carousel.classList.remove("dragging");
}

carousel.addEventListener("mousedown", dragStart);
carousel.addEventListener("touchstart", dragStart);

carousel.addEventListener("mousemove", dragging);
carousel.addEventListener("touchmove", dragging);

carousel.addEventListener("mouseup", dragStop);
carousel.addEventListener("mouseleave", dragStop);
carousel.addEventListener("touchend", dragStop);

const preguntas = document.querySelectorAll(".pregunta_encabezado");

preguntas.forEach ((pregunta) => {
    pregunta.addEventListener("click", () =>{
        removerClaseActivo();
        pregunta.nextElementSibling.classList.toggle("activo");
    })
});

function removerClaseActivo() {
    preguntas.forEach((pregunta)=>{
        pregunta.nextElementSibling.classList.remove("activo");
    })
}