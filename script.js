// DOM Elements
const darkModeToggle = document.getElementById('dark-mode-toggle');
const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
const mobileMenu = document.getElementById('mobile-menu');
const tabBtns = document.querySelectorAll('.tab-btn');
const navLinks = document.querySelectorAll('.main-nav a, .mobile-menu a');
const storyCards = document.querySelectorAll('.story-card, .latest-story');

// Dark Mode Toggle
function initDarkMode() {
    // Check for saved dark mode preference or system setting
    const isDarkMode = localStorage.getItem('dark-mode') === 'true' || 
                       (localStorage.getItem('dark-mode') === null && 
                        window.matchMedia('(prefers-color-scheme: dark)').matches);
    
    if (isDarkMode) {
        document.body.classList.add('dark-mode');
        darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    } else {
        document.body.classList.remove('dark-mode');
        darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    }
}

darkModeToggle.addEventListener('click', () => {
    const isDarkMode = document.body.classList.toggle('dark-mode');
    localStorage.setItem('dark-mode', isDarkMode);
    darkModeToggle.innerHTML = isDarkMode ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
});

// Mobile Menu Toggle
mobileMenuToggle.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
    const isOpen = !mobileMenu.classList.contains('hidden');
    mobileMenuToggle.innerHTML = isOpen ? '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
});

// Close mobile menu when a link is clicked
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
        mobileMenuToggle.innerHTML = '<i class="fas fa-bars"></i>';
    });
});

// Category Filtering
function filterStories(category) {
    storyCards.forEach(card => {
        if (category === 'all' || card.dataset.category === category) {
            card.style.display = 'grid'; // Use 'block' if needed for some elements
        } else {
            card.style.display = 'none';
        }
    });

    // Update active tab and nav link
    tabBtns.forEach(btn => {
        btn.classList.toggle('active', btn.dataset.tab === category);
    });

    navLinks.forEach(link => {
        link.classList.toggle('active', link.dataset.category === category);
    });
}

// Add click handlers to tabs and nav links
tabBtns.forEach(btn => {
    btn.addEventListener('click', () => filterStories(btn.dataset.tab));
});

navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault(); // Prevent page reload
        filterStories(link.dataset.category);
    });
});

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    initDarkMode();
    filterStories('all'); // Show all stories by default
});
