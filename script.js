// Smooth scrolling for navigation links
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Add smooth scrolling to all navigation links
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            scrollToSection(targetId);
        });
    });

    // Add scroll effect to navbar
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(102, 126, 234, 0.95)';
            navbar.style.backdropFilter = 'blur(10px)';
        } else {
            navbar.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
            navbar.style.backdropFilter = 'none';
        }
    });

    // Add animation on scroll for cards
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe all cards for animation
    const cards = document.querySelectorAll('.argument-card, .counter-card, .solution-card, .resource-card');
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });

    // Add click effect to CTA button
    const ctaButton = document.querySelector('.cta-button');
    if (ctaButton) {
        ctaButton.addEventListener('click', function() {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    }

    // Add interactive hover effects to evidence boxes
    const evidenceBoxes = document.querySelectorAll('.evidence');
    evidenceBoxes.forEach(box => {
        box.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.02)';
            this.style.boxShadow = '0 4px 15px rgba(16, 185, 129, 0.2)';
        });
        
        box.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
            this.style.boxShadow = 'none';
        });
    });

    // Add counter animation for statistics
    function animateCounter(element, target, duration = 2000) {
        let start = 0;
        const increment = target / (duration / 16);
        
        function updateCounter() {
            start += increment;
            if (start < target) {
                element.textContent = Math.floor(start);
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target;
            }
        }
        updateCounter();
    }

    // Animate counters when they come into view
    const counterObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const text = entry.target.textContent;
                const numbers = text.match(/\d+/g);
                if (numbers) {
                    numbers.forEach(num => {
                        const numElement = document.createElement('span');
                        numElement.textContent = num;
                        numElement.style.color = '#10b981';
                        numElement.style.fontWeight = 'bold';
                        // Replace the number in the text with the animated element
                        entry.target.innerHTML = entry.target.innerHTML.replace(num, numElement.outerHTML);
                        animateCounter(numElement, parseInt(num));
                    });
                }
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    // Observe evidence boxes for counter animation
    evidenceBoxes.forEach(box => {
        counterObserver.observe(box);
    });

    // Add typing effect to hero title
    const heroTitle = document.querySelector('.hero h1');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        heroTitle.textContent = '';
        let i = 0;
        
        function typeWriter() {
            if (i < originalText.length) {
                heroTitle.textContent += originalText.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        }
        
        // Start typing effect after a short delay
        setTimeout(typeWriter, 500);
    }

    // Add parallax effect to hero section
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        const earthAnimation = document.querySelector('.earth-animation');
        
        if (hero && earthAnimation) {
            const rate = scrolled * -0.5;
            earthAnimation.style.transform = `translateY(${rate}px)`;
        }
    });

    // Add mobile menu toggle (for future mobile menu implementation)
    function createMobileMenu() {
        const navbar = document.querySelector('.nav-container');
        const mobileMenuButton = document.createElement('button');
        mobileMenuButton.innerHTML = '<i class="fas fa-bars"></i>';
        mobileMenuButton.className = 'mobile-menu-toggle';
        mobileMenuButton.style.display = 'none';
        
        // Add mobile menu styles
        const style = document.createElement('style');
        style.textContent = `
            @media (max-width: 768px) {
                .mobile-menu-toggle {
                    display: block !important;
                    background: none;
                    border: none;
                    color: white;
                    font-size: 1.5rem;
                    cursor: pointer;
                    padding: 0.5rem;
                }
                
                .nav-menu {
                    position: absolute;
                    top: 100%;
                    left: 0;
                    right: 0;
                    background: rgba(102, 126, 234, 0.95);
                    backdrop-filter: blur(10px);
                    flex-direction: column;
                    padding: 1rem;
                    transform: translateY(-100%);
                    opacity: 0;
                    transition: all 0.3s ease;
                }
                
                .nav-menu.active {
                    transform: translateY(0);
                    opacity: 1;
                }
            }
        `;
        document.head.appendChild(style);
        
        navbar.appendChild(mobileMenuButton);
        
        mobileMenuButton.addEventListener('click', function() {
            const navMenu = document.querySelector('.nav-menu');
            navMenu.classList.toggle('active');
        });
    }
    
    // Initialize mobile menu
    createMobileMenu();
});

// Add some fun environmental facts that appear randomly
const environmentalFacts = [
    "A single tree can absorb up to 48 pounds of carbon dioxide per year.",
    "The Great Barrier Reef is the largest living structure on Earth.",
    "Recycling one aluminum can saves enough energy to run a TV for 3 hours.",
    "The Amazon rainforest produces 20% of the world's oxygen.",
    "Plastic takes up to 1,000 years to decompose in landfills.",
    "The average American uses 7 trees worth of paper products each year."
];

// Show random fact in console (for educational purposes)
function showRandomFact() {
    const randomFact = environmentalFacts[Math.floor(Math.random() * environmentalFacts.length)];
    console.log(`🌱 Environmental Fact: ${randomFact}`);
}

// Show a fact every 30 seconds
setInterval(showRandomFact, 30000);
showRandomFact(); // Show first fact immediately 