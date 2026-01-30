// ===================================
// Wedding Website - Dynamic Content
// ===================================

// Initialize AOS (Animate On Scroll) and all features
document.addEventListener('DOMContentLoaded', function () {
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        offset: 100
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
});

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

// ===================================
// Navigation Features
// ===================================

/**
 * Initialize navigation scroll tracking and active state
 */
function initializeNavigation() {
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-link');

    // Track scroll for navbar shadow
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Update active nav link based on scroll position
        updateActiveNavLink();
    });

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
            }
        });
    });
}

/**
 * Update active navigation link based on current scroll position
 */
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    const navbar = document.getElementById('navbar');
    const navbarHeight = navbar ? navbar.offsetHeight : 0;

    let currentSection = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop - navbarHeight - 100;
        const sectionHeight = section.offsetHeight;

        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
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

