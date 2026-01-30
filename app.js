// ===================================
// Wedding Website - Dynamic Content
// ===================================

// Initialize AOS (Animate On Scroll)
document.addEventListener('DOMContentLoaded', function() {
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        offset: 100
    });

    // Load guest data and personalize content
    loadGuestData();
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
 * Display table assignment for the guest
 * @param {string} tableName - Name/number of the assigned table
 */
function displayTableAssignment(tableName) {
    const tableSection = document.getElementById('table-section');
    const tableAssignmentElement = document.getElementById('table-assignment');
    
    if (tableSection && tableAssignmentElement && tableName) {
        // Show table section
        tableSection.style.display = 'block';
        
        // Display table name
        tableAssignmentElement.textContent = tableName;
    }
}

/**
 * Display public/fallback version of the website
 * Shows minimal information without personalization
 */
function displayPublicVersion() {
    const greetingElement = document.getElementById('personal-greeting');
    const tableSection = document.getElementById('table-section');
    
    // Set generic greeting
    if (greetingElement) {
        greetingElement.textContent = 'Bienvenue à notre mariage';
    }
    
    // Hide table section
    if (tableSection) {
        tableSection.style.display = 'none';
    }
    
    // Hide all specific program sections to show only basic info
    // In public version, we can choose to show all or none
    // For this case, let's show all sections but without personalization
    const allSections = ['civil', 'salle-royaume', 'vh', 'diner'];
    allSections.forEach(sectionType => {
        const sectionElement = document.querySelector(`.section-${sectionType}`);
        if (sectionElement) {
            sectionElement.style.display = 'flex';
        }
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

// Smooth scroll for internal links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add parallax effect to hero section
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero-content');
    
    if (hero && scrolled < window.innerHeight) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
        hero.style.opacity = 1 - (scrolled / window.innerHeight);
    }
});
