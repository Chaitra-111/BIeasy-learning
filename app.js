/* BIeasy Main Script */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Sticky Header
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.padding = '10px 0';
            header.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
            header.style.boxShadow = 'var(--shadow-sm)';
        } else {
            header.style.padding = '0';
            header.style.backgroundColor = 'rgba(255, 255, 255, 0.9)';
            header.style.boxShadow = 'none';
        }
    });

    // 2. Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => {
            navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
            if (navLinks.style.display === 'flex') {
                navLinks.style.flexDirection = 'column';
                navLinks.style.position = 'absolute';
                navLinks.style.top = '80px';
                navLinks.style.left = '0';
                navLinks.style.width = '100%';
                navLinks.style.backgroundColor = 'white';
                navLinks.style.padding = '20px';
                navLinks.style.boxShadow = 'var(--shadow-md)';
                navLinks.style.gap = '20px';
            }
        });
    }

    // 3. Active Link Highlighting
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    const links = document.querySelectorAll('.nav-links a');
    
    links.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPath) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });

    // 4. Smooth Scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // 5. Reveal on Scroll Animation
    const revealItems = document.querySelectorAll('.card, .hero-content, .hero-image');
    
    const revealOnScroll = () => {
        revealItems.forEach(item => {
            const itemTop = item.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            if (itemTop < windowHeight * 0.9) {
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
            }
        });
    };

    // Set initial state for reveal
    revealItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px)';
        item.style.transition = 'all 0.6s ease-out';
    });

    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Run once on load

    // 6. Form Handling (Natural submission with FormSubmit)
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', () => {
            const submitBtn = form.querySelector('button[type="submit"]');
            submitBtn.innerText = 'Redirecting...';

            // Add dynamic _next field for formsubmit.co
            let nextInput = form.querySelector('input[name="_next"]');
            if (!nextInput) {
                nextInput = document.createElement('input');
                nextInput.type = 'hidden';
                nextInput.name = '_next';
                form.appendChild(nextInput);
            }

            if (form.id === 'enrollment-form') {
                // Save names for account creation
                const firstName = form.querySelector('#firstName').value;
                const lastName = form.querySelector('#lastName').value;
                sessionStorage.setItem('bieasy_temp_name', `${firstName} ${lastName}`);
                
                // Redirect to account creation for students
                const email = form.querySelector('input[type="email"]').value;
                const nextUrl = window.location.origin + `/create-account.html?email=${encodeURIComponent(email)}`;
                nextInput.value = nextUrl;
            } else {
                // Redirect back to current page
                nextInput.value = window.location.href;
            }
        });
    });
});
