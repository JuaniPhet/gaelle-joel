// ===================================
// Wedding Website - Dynamic Content
// ===================================

// Initialize AOS (Animate On Scroll) and all features
document.addEventListener('DOMContentLoaded', function () {
    AOS.init({
        duration: 500, // Faster animation
        easing: 'ease-out-cubic',
        once: true,
        offset: 50
    });

    // Load guest data and personalize content
    loadGuestData();

    // Initialize navigation features
    initializeNavigation();

    // Initialize hamburger menu
    initializeHamburgerMenu();

    // Initialize scroll-to-top button
    initializeScrollToTop();

    // Initialize countdown timer
    initializeCountdown();

    // Initialize Intro Animation
    initializeIntroAnimation();
});

/**
 * Handle Envelope Intro Animation
 */
function initializeIntroAnimation() {
    const envelopeContainer = document.getElementById('envelope-container');
    const waxSeal = document.getElementById('wax-seal');
    const envelopeFlap = document.getElementById('envelope-flap');
    const envelopeFlapInner = document.getElementById('envelope-flap-inner');
    const invitationCard = document.getElementById('invitation-card');
    const introOverlay = document.getElementById('intro-overlay');
    const clickText = document.getElementById('click-text');

    if (!envelopeContainer || !introOverlay) return;

    // Ensure body is locked initially
    document.body.style.overflow = 'hidden';

    // Trigger open on click
    const openEnvelope = () => {
        // Prevent double clicks
        if (envelopeContainer.classList.contains('is-open')) return;
        envelopeContainer.classList.add('is-open');

        // 1. Rotate Flap Open
        // We act on the generic flap style
        envelopeFlap.style.transform = 'rotateX(180deg)';
        envelopeFlap.style.zIndex = '1'; // Move behind card visually after rotation

        // Handle inner flap visibility if needed, or just let CSS handle it
        if (envelopeFlapInner) {
            envelopeFlapInner.style.opacity = '1';
            envelopeFlapInner.style.transform = 'rotateX(0deg)';
            envelopeFlapInner.style.zIndex = '1';
        }

        // Hide Seal and Text
        waxSeal.classList.add('opacity-0', 'pointer-events-none');
        clickText.style.opacity = '0';

        // 2. Slide Card Up (delayed slightly to match flap opening)
        setTimeout(() => {
            // Move card up nicely
            invitationCard.style.transform = 'translateY(-80px) scale(1.05)';
            invitationCard.style.zIndex = '35'; // Bring closer to front but keep 3D consistence
        }, 300);

        // 3. Fade Out Overlay (after reading the card briefly)
        setTimeout(() => {
            introOverlay.classList.add('opacity-0', 'pointer-events-none');
        }, 2200);

        // 4. Cleanup and Unlock Site
        setTimeout(() => {
            introOverlay.style.display = 'none';
            document.body.style.overflow = '';
            document.body.classList.remove('overflow-hidden');

            // Refresh AOS to ensure animations trigger correctly on the now-visible page
            AOS.refresh();
        }, 3200);
    };

    envelopeContainer.addEventListener('click', openEnvelope);
    waxSeal.addEventListener('click', (e) => {
        e.stopPropagation(); // prevent double trigger if bubbling
        openEnvelope();
    });
}


// ... (loadGuestData and other functions remain active ...
// I will only include the changed parts for navigation below)

/**
 * Initialize navigation scroll tracking and active state
 */
function initializeNavigation() {
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');

    // Track scroll for navbar shadow and active link
    window.addEventListener('scroll', () => {
        if (window.scrollY > 20) {
            navbar.classList.add('scrolled', 'shadow-md');
            navbar.classList.remove('shadow-sm');
        } else {
            navbar.classList.remove('scrolled', 'shadow-md');
            navbar.classList.add('shadow-sm');
        }

        highlightActiveSection();
    });

    // Initial highlight
    highlightActiveSection();

    // Smooth scroll with offset for fixed navbar
    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                const navbarHeight = navbar.offsetHeight;
                const targetPosition = targetElement.offsetTop - navbarHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });

                // Close mobile menu if open
                const hamburger = document.getElementById('hamburger');
                const navMenu = document.getElementById('nav-menu');
                if (hamburger.classList.contains('active')) {
                    hamburger.classList.remove('active');
                    navMenu.classList.add('hidden');
                    // Clean up mobile menu classes
                    navMenu.classList.remove('flex', 'flex-col', 'absolute', 'top-[60px]', 'left-0', 'w-full', 'bg-white', 'p-4', 'shadow-lg');
                }
            }
        });
    });
}

/**
 * Highlight the currently active section in the navigation
 */
function highlightActiveSection() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    const navbarHeight = document.getElementById('navbar').offsetHeight;

    // Offset to trigger earlier (when section enters top part of screen)
    const scrollPosition = window.scrollY + navbarHeight + 50;

    let currentSectionId = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionBottom = sectionTop + sectionHeight;

        // Check if current scroll position is within this section
        if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
            currentSectionId = section.getAttribute('id');
        }
    });

    // Special case: if at bottom of page, highlight last section
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 10) {
        // Optionally handle bottom of page logic if essential
    }

    navLinks.forEach(link => {
        link.classList.remove('active');
        link.classList.remove('text-primary');
        link.classList.add('text-dark');

        if (link.getAttribute('href') === `#${currentSectionId}`) {
            link.classList.add('active');
            link.classList.add('text-primary');
            link.classList.remove('text-dark');
        }
    });
}

function updateActiveNavLink() {
    // Deprecated in favor of IntersectionObserver
}

// ===================================
// Scroll to Top Button
// ===================================

/**
 * Initialize scroll-to-top button functionality
 */
function initializeScrollToTop() {
    const scrollToTopBtn = document.getElementById('scrollToTop');

    if (!scrollToTopBtn) return;

    // Show/hide button based on scroll position
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            scrollToTopBtn.classList.add('visible');
        } else {
            scrollToTopBtn.classList.remove('visible');
        }
    });

    // Scroll to top when clicked
    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ===================================
// Additional Animations & Effects
// ===================================

// Add fade-in animation keyframes
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);

// Add parallax effect to hero section
window.addEventListener('scroll', function () {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero-content');

    if (hero && scrolled < window.innerHeight) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
        hero.style.opacity = 1 - (scrolled / window.innerHeight);
    }
});

// ===================================
// Hamburger Menu
// ===================================

/**
 * Initialize hamburger menu for mobile navigation
 */
function initializeHamburgerMenu() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (!hamburger || !navMenu) return;

    // Toggle menu on hamburger click
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Close menu when clicking on backdrop
    navMenu.addEventListener('click', (e) => {
        if (e.target === navMenu) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
}

// ===================================
// Countdown Timer
// ===================================

/**
 * Initialize countdown timer to wedding date (April 25, 2026)
 */
function initializeCountdown() {
    // Wedding date: April 25, 2026 at 14:00 (2:00 PM)
    const weddingDate = new Date('2026-04-25T14:00:00').getTime();

    // Update countdown every second
    const countdownInterval = setInterval(() => {
        updateCountdown(weddingDate);
    }, 1000);

    // Initial update
    updateCountdown(weddingDate);
}

/**
 * Update countdown display
 * @param {number} weddingDate - Target date in milliseconds
 */
function updateCountdown(weddingDate) {
    const now = new Date().getTime();
    const distance = weddingDate - now;

    // If countdown is over
    if (distance < 0) {
        document.getElementById('days').textContent = '00';
        document.getElementById('hours').textContent = '00';
        document.getElementById('minutes').textContent = '00';
        document.getElementById('seconds').textContent = '00';
        return;
    }

    // Calculate time units
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Update display with leading zeros
    document.getElementById('days').textContent = String(days).padStart(2, '0');
    document.getElementById('hours').textContent = String(hours).padStart(2, '0');
    document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
    document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
}

