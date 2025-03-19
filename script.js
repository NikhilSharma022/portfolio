AOS.init({
    duration: 800,
    once: true
});

function createBinaryEffect() {
    const container = document.getElementById('binaryContainer');
    if (!container) return;

    function spawnBit() {
        const bit = document.createElement('div');
        bit.className = 'binary-bit';
        bit.textContent = Math.random() > 0.5 ? '1' : '0';
        bit.style.left = `${Math.random() * 100}%`;
        bit.style.animationDuration = `${Math.random() * 3 + 2}s`;
        container.appendChild(bit);
        setTimeout(() => bit.remove(), 5000);
    }

    setInterval(spawnBit, 200);
}

const contactForm = document.getElementById('contactForm');
const submitBtn = document.getElementById('submitBtn');
const formProgress = document.getElementById('formProgress');
const formProgressBar = document.getElementById('formProgressBar');

contactForm.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    if (!this.checkValidity()) {
        e.stopPropagation();
        this.classList.add('was-validated');
        return;
    }

    submitBtn.disabled = true;
    submitBtn.innerHTML = 'Sending...';
    formProgress.classList.add('active');
    formProgressBar.style.width = '0';

    setTimeout(() => formProgressBar.style.width = '33%', 200);
    setTimeout(() => formProgressBar.style.width = '66%', 500);
    setTimeout(() => formProgressBar.style.width = '100%', 800);

    try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        alert('Thank you for your message! I will get back to you soon.');
        this.reset();
        this.classList.remove('was-validated');
        formProgress.classList.remove('active');
    } catch (error) {
        alert('Error sending message. Please try again.');
        formProgress.classList.remove('active');
    } finally {
        submitBtn.disabled = false;
        submitBtn.innerHTML = 'Send Message';
        formProgressBar.style.width = '0';
    }
});

document.addEventListener('DOMContentLoaded', () => {
    createBinaryEffect();

    const cursorDot = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');
    
    if (cursorDot && cursorOutline) {
        let mouseX = 0, mouseY = 0;
        let dotX = 0, dotY = 0;
        let outlineX = 0, outlineY = 0;

        // Update mouse position
        window.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });

        // Animate cursor using requestAnimationFrame
        function animateCursor() {
            // Smoothly interpolate dot position
            dotX += (mouseX - dotX) * 0.5;
            dotY += (mouseY - dotY) * 0.5;
            cursorDot.style.left = `${dotX}px`;
            cursorDot.style.top = `${dotY}px`;

            // Smoothly interpolate outline position (slower for trailing effect)
            outlineX += (mouseX - outlineX) * 0.1;
            outlineY += (mouseY - outlineY) * 0.1;
            cursorOutline.style.left = `${outlineX}px`;
            cursorOutline.style.top = `${outlineY}px`;

            requestAnimationFrame(animateCursor);
        }
        requestAnimationFrame(animateCursor);

        // Particle effect (reduced frequency)
        window.addEventListener('mousemove', (e) => {
            if (Math.random() < 0.05) { // Reduced from 0.1 to 0.05
                const particle = document.createElement('div');
                particle.className = 'particle';
                particle.style.left = `${e.clientX}px`;
                particle.style.top = `${e.clientY}px`;
                document.body.appendChild(particle);
                setTimeout(() => particle.remove(), 1500); // Matches reduced animation duration
            }
        });

        // Hover effects
        document.querySelectorAll('a, button').forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursorOutline.style.transform = 'translate(-50%, -50%) scale(1.5)';
                cursorOutline.style.borderColor = 'rgba(0, 112, 243, 0.8)';
                cursorDot.style.transform = 'translate(-50%, -50%) scale(1.5)';
                cursorDot.style.backgroundColor = 'var(--accent-color)';
            });
            
            el.addEventListener('mouseleave', () => {
                cursorOutline.style.transform = 'translate(-50%, -50%) scale(1)';
                cursorOutline.style.borderColor = 'rgba(0, 112, 243, 0.5)';
                cursorDot.style.transform = 'translate(-50%, -50%) scale(1)';
                cursorDot.style.backgroundColor = 'var(--primary-color)';
            });

            el.addEventListener('mousemove', (e) => {
                const shine = el.querySelector('span');
                if (shine) {
                    const rect = el.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    shine.style.transform = `translateX(${x - rect.width}px)`;
                }
            });

            el.addEventListener('mouseleave', () => {
                const shine = el.querySelector('span');
                if (shine) shine.style.transform = 'translateX(-100%)';
            });
        });
    }
});

window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.classList.remove('bg-transparent');
        navbar.classList.add('bg-dark');
        navbar.classList.add('shadow');
    } else {
        navbar.classList.add('bg-transparent');
        navbar.classList.remove('bg-dark');
        navbar.classList.remove('shadow');
    }
});

const darkModeToggle = document.getElementById('darkModeToggle');
const icon = darkModeToggle.querySelector('i');
const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'light') {
    document.body.classList.remove('dark-mode');
    icon.classList.replace('bi-sun', 'bi-moon');
} else {
    document.body.classList.add('dark-mode');
    icon.classList.add('bi-sun');
}

darkModeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    if (document.body.classList.contains('dark-mode')) {
        icon.classList.replace('bi-moon', 'bi-sun');
        localStorage.setItem('theme', 'dark');
    } else {
        icon.classList.replace('bi-sun', 'bi-moon');
        localStorage.setItem('theme', 'light');
    }
});

document.querySelectorAll('section h2').forEach(h2 => {
    h2.style.transition = 'transform 0.5s ease, color 0.5s ease';
    window.addEventListener('scroll', () => {
        const rect = h2.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.8 && rect.bottom > 0) {
            h2.style.transform = 'scale(1.05)';
            h2.style.color = 'var(--primary-color)';
        } else {
            h2.style.transform = 'scale(1)';
            h2.style.color = '';
        }
    });
});
