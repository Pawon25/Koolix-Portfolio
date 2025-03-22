// Initialize Firebase
const firebaseConfig = {
    // Your Firebase configuration object goes here
    // You'll need to replace this with your actual Firebase config

    apiKey: "AIzaSyCuBRx8JJF7877Dc_RDsdB0tbvxImgEsAE",
    authDomain: "koolix-2a964.firebaseapp.com",
    databaseURL: "https://koolix-2a964-default-rtdb.firebaseio.com",
    projectId: "koolix-2a964",
    storageBucket: "koolix-2a964.firebasestorage.app",
    messagingSenderId: "95064583154",
    appId: "1:95064583154:web:723ae3a7b96c5402df996b",
    measurementId: "G-0BV2FELSPL"
};

firebase.initializeApp(firebaseConfig);

// Get a reference to the database service
const database = firebase.database();

document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');

    mobileMenuButton.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Contact form submission
    const contactForm = document.getElementById('contact-form');
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;

        // Save form data to Firebase
        database.ref('contact_submissions').push({
            name: name,
            email: email,
            message: message,
            timestamp: firebase.database.ServerValue.TIMESTAMP
        }).then(() => {
            // Show success message
            alert('Thank you for your message. We will get back to you soon!');
            contactForm.reset();
        }).catch((error) => {
            // Show error message
            alert('There was an error submitting your message. Please try again later.');
            console.error('Error:', error);
        });
    });

    // Scroll-triggered animations
    const animatedElements = document.querySelectorAll('.animate-on-scroll');

    const isInViewport = (element) => {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    };

    const handleScrollAnimation = () => {
        animatedElements.forEach((element) => {
            if (isInViewport(element)) {
                element.classList.add('animate-fade-in');
            }
        });
    };

    window.addEventListener('scroll', handleScrollAnimation);
    handleScrollAnimation();
});