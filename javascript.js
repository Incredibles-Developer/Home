/*preLoader */
const preLoader = document.getElementById('preloader');
function preLoaderFun(){
    preLoader.style.display = 'none';
}
/*End of PreLoader */

/*Hamburger Menu*/
const hamburger = document.querySelector('.hamburger');
const navUL = document.querySelector('.nav_bar_ul');
const navList = document.querySelectorAll('.nav_bar_li');
let menuOpen = false;
hamburger.addEventListener('click', () => {
    if(!menuOpen){
        hamburger.classList.add('open');
        navUL.classList.add('sm_nav_open');
        menuOpen = true;
    }else{
        hamburger.classList.remove('open');
        navUL.classList.remove('sm_nav_open');
        menuOpen = false;
    }
});
for (let i = 0; i < navList.length; i++) {
    navList[i].addEventListener('click', () =>{
        hamburger.classList.remove('open');
        navUL.classList.remove('sm_nav_open');
        menuOpen = false;
    });
}
/*end of Hamburger menu*/

/*Start of Active menu List*/
const sections = document.querySelectorAll('.keyPage');
const activeLI = document.querySelector('.activeLI');

const options = {
    threshold: 0.7
};
let observer = new IntersectionObserver(navCheck, options);

function navCheck(entries){
    entries.forEach(entry => {
        const idName = entry.target.id;
        const activeAnchor = document.querySelector(`[data-page=${idName}]`);
        const coords = activeAnchor.getBoundingClientRect();
        const direction = {
            width: coords.width,
            left: coords.left
        };
        if(entry.isIntersecting){
            activeLI.style.setProperty("left", `${direction.left}px`);
            activeLI.style.setProperty("width", `${direction.width}px`);
        }
    });
}
sections.forEach(section => {
    observer.observe(section);
});
/*End of Active menu List*/
/*Start of slides*/
const slides = document.querySelectorAll('.posterSlide');
const control = document.querySelectorAll('.controlBtn');
let currentSlide = 1;
//mannual slides
    var manualControl = function(manual){
        slides.forEach((slide) => {
            slide.classList.remove('active');
            control.forEach((btn) => {
                btn.classList.remove('active');
            });
        });
        slides[manual].classList.add('active');
        control[manual].classList.add('active');
    }
    control.forEach((btn, i) => {
        btn.addEventListener("click", () => {
            manualControl(i);
            currentSlide = i;
        });
    });
//auto slides
    var repeat = function(activeClass){
        let active = document.getElementsByClassName('active');
        let i=1;
        var repeater = () => {
            setTimeout(function(){
                [...active].forEach((activeSlide) => {
                    activeSlide.classList.remove('active');
                });
                
                slides[i].classList.add('active');
                control[i].classList.add('active');
                i++;

                if(slides.length == i){
                    i=0;
                }
                if(i>= slides.length){
                    return;
                }
                repeater();
            }, 5000);
        }
        repeater();
    }
    repeat();
/*End of slides*/