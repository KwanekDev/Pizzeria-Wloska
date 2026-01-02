document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Loader
    const loader = document.getElementById('loader');
    setTimeout(() => {
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.style.display = 'none';
        }, 500);
    }, 1500); // Loader znika po 1.5s

    // 2. Mobile Menu
    const mobileMenu = document.getElementById('mobile-menu');
    const navList = document.querySelector('.nav-menu');

    mobileMenu.addEventListener('click', () => {
        navList.classList.toggle('active');
        mobileMenu.classList.toggle('active');
    });

    // Zamykanie menu po kliknięciu w link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navList.classList.remove('active');
        });
    });

    // 3. Scroll Animations (Intersection Observer)
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Animuj tylko raz
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.fade-in, .fade-in-up, .fade-in-left, .fade-in-right');
    animatedElements.forEach(el => observer.observe(el));

    // 4. Obsługa formularza (Placeholder pod backend)
    const form = document.getElementById('reservationForm');
    const statusMsg = document.querySelector('.form-status');

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        // Symulacja wysłania danych
        const btn = form.querySelector('button');
        const originalText = btn.innerText;
        
        btn.innerText = 'Wysyłanie...';
        btn.disabled = true;

        // Tu w przyszłości będzie fetch() do API
        setTimeout(() => {
            btn.innerText = 'Zarezerwowano!';
            btn.style.background = '#009246'; // Zielony sukces
            statusMsg.innerText = 'Dziękujemy! Potwierdzenie otrzymasz SMS-em.';
            statusMsg.style.color = '#009246';
            statusMsg.style.marginTop = '10px';
            form.reset();
            
            setTimeout(() => {
                btn.innerText = originalText;
                btn.disabled = false;
                btn.style.background = ''; 
            }, 3000);
        }, 1500);
    });
});