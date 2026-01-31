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


/**
 * Main function to load guest data and personalize the website
 */
async function loadGuestData() {
    try {
        // Extract guest ID from URL
        const urlParams = new URLSearchParams(window.location.search);
        const guestId = urlParams.get('id');

        // Load invitates data
        const response = await fetch('invitates.json');
        const invitatesData = await response.json();

        // Check if guest ID exists
        if (guestId && invitatesData[guestId]) {
            // Personalized version for valid guest
            const guestData = invitatesData[guestId];
            personalizeContent(guestData);
            filterProgramSections(guestData.groupes);
            filterLocationSections(guestData.groupes);
            displayTableAssignment(guestData.table);
        } else {
            // Public/fallback version for invalid or missing ID
            displayPublicVersion();
        }
    } catch (error) {
        console.error('Error loading guest data:', error);
        // Display public version on error
        displayPublicVersion();
    }
}

/**
 * Personalize content with guest information
 * @param {Object} guestData - Guest data from invitates.json
 */
function personalizeContent(guestData) {
    const greetingElement = document.getElementById('personal-greeting');

    if (greetingElement) {
        // Create personalized greeting
        const greeting = `Bonjour ${guestData.prenom} ${guestData.nom}`;
        greetingElement.textContent = greeting;

        // Add a subtle animation
        greetingElement.style.animation = 'fadeInUp 0.8s ease-out';
    }
}

/**
 * Filter program sections based on guest's allowed groups
 * @param {Array} allowedGroups - Array of group names the guest can access
 */
function filterProgramSections(allowedGroups) {
    // All possible section types
    const allSections = ['civil', 'salle-royaume', 'vh', 'diner'];

    // Loop through all sections
    allSections.forEach(sectionType => {
        const sectionElement = document.querySelector(`.section-${sectionType}`);

        if (sectionElement) {
            if (!allowedGroups.includes(sectionType)) {
                // Hide sections not in guest's groups
                sectionElement.style.display = 'none';
            } else {
                // Ensure visible sections are displayed
                sectionElement.style.display = 'flex';
            }
        }
    });
}

/**
 * Filter location cards based on guest's allowed groups
 * @param {Array} allowedGroups - Array of group names the guest can access
 */
function filterLocationSections(allowedGroups) {
    // All possible location types
    const allLocations = ['civil', 'salle-royaume', 'vh', 'diner'];

    // Loop through all location cards
    allLocations.forEach(locationType => {
        const locationElement = document.querySelector(`.location-${locationType}`);

        if (locationElement) {
            if (!allowedGroups.includes(locationType)) {
                // Hide location cards not in guest's groups
                locationElement.style.display = 'none';
            } else {
                // Ensure visible location cards are displayed
                locationElement.style.display = 'block';
            }
        }
    });
}

/**
 * Display table assignment for the guest
 * @param {string} tableName - Name/number of the assigned table
 */
function displayTableAssignment(tableName) {
    const tableSection = document.getElementById('table-section');
    const tableAssignmentElement = document.getElementById('table-assignment');
    const tableLinkNav = document.querySelector('.nav-link-table');

    if (tableSection && tableAssignmentElement && tableName) {
        // Show table section
        tableSection.style.display = 'block';

        // Display table name
        tableAssignmentElement.textContent = tableName;

        // Show table navigation link
        if (tableLinkNav) {
            tableLinkNav.parentElement.style.display = 'list-item';
        }
    } else {
        // Hide table navigation link if no table
        if (tableLinkNav) {
            tableLinkNav.parentElement.style.display = 'none';
        }
    }
}

/**
 * Display public/fallback version of the website
 * Shows ONLY civil and religieux (salle-royaume) ceremonies
 */
function displayPublicVersion() {
    const greetingElement = document.getElementById('personal-greeting');
    const tableSection = document.getElementById('table-section');
    const tableLinkNav = document.querySelector('.nav-link-table');

    // Set generic greeting
    if (greetingElement) {
        greetingElement.textContent = 'Bienvenue à notre mariage';
    }

    // Hide table section
    if (tableSection) {
        tableSection.style.display = 'none';
    }

    // Hide table navigation link
    if (tableLinkNav) {
        tableLinkNav.parentElement.style.display = 'none';
    }

    // ONLY show civil and salle-royaume (hide vh and diner)
    const publicSections = ['civil', 'salle-royaume']; // Only these two
    const allSections = ['civil', 'salle-royaume', 'vh', 'diner'];

    allSections.forEach(sectionType => {
        const sectionElement = document.querySelector(`.section-${sectionType}`);
        const locationElement = document.querySelector(`.location-${sectionType}`);

        if (publicSections.includes(sectionType)) {
            // Show civil and salle-royaume
            if (sectionElement) sectionElement.style.display = 'flex';
            if (locationElement) locationElement.style.display = 'block';
        } else {
            // Hide vh and diner
            if (sectionElement) sectionElement.style.display = 'none';
            if (locationElement) locationElement.style.display = 'none';
        }
    });
}

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
                // Close mobile menu if open - Re-use the click on hamburger logic or just manual cleanup
                // The global event listener we added in initializeHamburgerMenu handles the class cleanup for nav-links generally,
                // but this specific internal link handler might run before or after.
                // Safest to just let the specific nav-link listener in initializeHamburgerMenu handle it.
                // Or force it here if we want to be sure.
                const navMenu = document.getElementById('nav-menu');
                if (navMenu && !navMenu.classList.contains('hidden')) {
                    // We can just trigger the function logic but simpler to just let the other listener work
                    // but since we are preventingDefault here, we should ensure the close logic runs.
                    // The other listener is attached to .nav-link, so it should fire.
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
            scrollToTopBtn.classList.remove('opacity-0', 'invisible');
            scrollToTopBtn.classList.add('opacity-100', 'visible');
        } else {
            scrollToTopBtn.classList.add('opacity-0', 'invisible');
            scrollToTopBtn.classList.remove('opacity-100', 'visible');
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

    // Mobile Menu Classes
    const mobileClasses = [
        'flex',
        'flex-col',
        'fixed',
        'inset-0',
        'z-[2000]',
        'h-screen',
        'justify-center',
        'items-center',
        'gap-8',
        'bg-soft-bg/95',
        'backdrop-blur-xl',
        'text-2xl',
        'font-heading'
    ];

    // Toggle menu on hamburger click
    hamburger.addEventListener('click', () => {
        const isActive = hamburger.classList.toggle('active');

        if (isActive) {
            // Open Menu
            navMenu.classList.remove('hidden');
            navMenu.classList.add(...mobileClasses);
            // Animate items could be added here
        } else {
            // Close Menu
            navMenu.classList.add('hidden');
            navMenu.classList.remove(...mobileClasses);
        }
    });

    // Close menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.add('hidden');
            navMenu.classList.remove(...mobileClasses);
        });
    });

    // Close menu when clicking outside (if needed, though top-full covers usually mostly everything or we click elsewhere)
    document.addEventListener('click', (e) => {
        if (hamburger.classList.contains('active') && !navMenu.contains(e.target) && !hamburger.contains(e.target)) {
            hamburger.classList.remove('active');
            navMenu.classList.add('hidden');
            navMenu.classList.remove(...mobileClasses);
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

