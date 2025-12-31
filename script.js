
document.addEventListener('DOMContentLoaded', () => {
    // Theme Toggle
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;

    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        body.classList.remove('light-mode', 'dark-mode');
        body.classList.add(savedTheme);
        if (savedTheme === 'dark-mode') {
            themeToggle.checked = true;
        }
    } else {
        // Default to light mode if no preference saved
        body.classList.add('light-mode');
    }

    themeToggle.addEventListener('change', () => {
        if (themeToggle.checked) {
            body.classList.remove('light-mode');
            body.classList.add('dark-mode');
            localStorage.setItem('theme', 'dark-mode');
        } else {
            body.classList.remove('dark-mode');
            body.classList.add('light-mode');
            localStorage.setItem('theme', 'light-mode');
        }
    });

    // Scroll Animations (Intersection Observer)
    const sections = document.querySelectorAll('.scroll-animate');

    const observerOptions = {
        root: null, // viewport
        rootMargin: '0px',
        threshold: 0.1 // Trigger when 10% of the item is visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-visible');
                observer.unobserve(entry.target); // Stop observing once visible
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        observer.observe(section);
    });

    // Project Filtering
    const filterButtons = document.querySelectorAll('.filter-button');
    const projectCards = document.querySelectorAll('.project-card');
    const projectsContainer = document.querySelector('.projects-container');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to the clicked button
            button.classList.add('active');

            const filterCategory = button.dataset.filter;

            projectsContainer.style.transition = 'none'; // Temporarily disable transition for container
            projectsContainer.style.opacity = 0; // Fade out container for smoother transition

            // First, hide all projects with a smooth transition
            projectCards.forEach(card => {
                card.classList.add('hide-project');
            });

            setTimeout(() => {
                // After fade-out, update display property
                projectCards.forEach(card => {
                    const cardCategory = card.dataset.category;
                    if (filterCategory === 'all' || cardCategory === filterCategory) {
                        card.style.display = 'flex'; // Make it visible in flow for animation
                    } else {
                        card.style.display = 'none'; // Keep hidden
                    }
                });

                // Force reflow
                void projectsContainer.offsetWidth;

                // Then, show relevant projects with a smooth transition
                projectCards.forEach(card => {
                    const cardCategory = card.dataset.category;
                    if (filterCategory === 'all' || cardCategory === filterCategory) {
                        card.classList.remove('hide-project');
                    }
                });

                projectsContainer.style.transition = 'opacity 0.5s ease-in-out';
                projectsContainer.style.opacity = 1;

            }, 400); // This timeout should match the CSS transition duration for hide-project + a little extra
        });
    });
});
