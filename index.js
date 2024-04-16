// template_mqi4yw2
// service_6i9ahcj
// T7-W5HNLPTB-fr7Q2

let isModalOpen = false;
let contrastToggle = false;
const scaleFactor = 1 / 20;

// This function leads to the movement of the shapes in the homepage
function moveBackground(event){
    const shapes = document.querySelectorAll(".shape");
    const x = event.clientX * scaleFactor;
    const y = event.clientY * scaleFactor;

    for(let i = 0; i < shapes.length; i++){
        const isOdd = i % 2 !== 0;
        const boolInt = isOdd ? -1 : 1;
        shapes[i].style.transform = `translate(${x * boolInt}px, ${y * boolInt}px) rotate(${x * boolInt * 10}deg)`    }
}

// Clicking the dark theme button causes this function to run
// If the current theme is light, it changes the site to a dark them changing the background and text and vice versa.
function toggleContrast(){
    contrastToggle = !contrastToggle
    if (contrastToggle){
        document.body.classList += " dark-theme"
    }
    else{
        document.body.classList.remove("dark-theme")
    }
}

// This function is responsible for the contact section of the website
// It sends an email to us with the user's message from their provided email
function contact(event){
    event.preventDefault();

    const loading = document.querySelector('.modal__overlay--loading')
    const success = document.querySelector('.modal__overlay--success')
    loading.classList += " modal__overlay--visible"
    
    emailjs
        .sendForm(
            'service_6i9ahcj',
            'template_7zzqgzs',
            event.target,
            'T7-W5HNLPTB-fr7Q2'
    ).then(() =>{
        loading.classList.remove("modal__overlay--visible");
        success.classList += " modal__overlay--visible";
    }).catch(() => {
        loading.classList.remove("modal__overlay--visible");
        alert(
            "The email service is temporarily unavailable. Please contact me directly on fahadalhamad0@outlook.com"
        );
    })    
}

// This function handles the visibilty of the contact section
function toggleModal(){
    if (isModalOpen) {
        isModalOpen = false;
        return document.body.classList.remove("modal--open")
    }
    isModalOpen = true;
    document.body.classList += " modal--open";
}

