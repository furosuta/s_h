document.addEventListener('DOMContentLoaded', () => {
    const bufferPage = document.getElementById('buffer-page');
    const doorOverlay = document.getElementById('door-overlay');
    const mainContent = document.getElementById('main-content');
    const clickHint = document.querySelector('.click-hint');

    const openPrompt = document.getElementById('open-prompt');
    let promptTimer;

    // 1. Buffer Page Logic - Show "nakkahwin.com" for 2.5 seconds
    setTimeout(() => {
        bufferPage.style.opacity = '0';
        setTimeout(() => {
            bufferPage.style.display = 'none';

            // Start prompt timer after buffer page is gone
            promptTimer = setTimeout(() => {
                if (!doorOverlay.classList.contains('door-open')) {
                    openPrompt.style.opacity = '1';
                }
            }, 3000);

        }, 1000); // Wait for fade out to finish
    }, 2500); // Show buffer for 2.5 seconds

    // 2. Door Interaction - Click to open doors
    doorOverlay.addEventListener('click', () => {
        if (!doorOverlay.classList.contains('door-open')) {
            clearTimeout(promptTimer); // Cancel prompt
            openPrompt.style.opacity = '0'; // Hide prompt immediate
            doorOverlay.classList.add('door-open');

            // Hide the click hint
            clickHint.style.opacity = '0';

            // Reveal main content
            setTimeout(() => {
                mainContent.style.opacity = '1';
            }, 500);

            // Enable scrolling and remove door overlay after animation
            setTimeout(() => {
                doorOverlay.style.pointerEvents = 'none';
                document.body.style.overflow = 'auto';
                // Optionally fade out the doors completely
                setTimeout(() => {
                    doorOverlay.style.opacity = '0';
                }, 1000);
            }, 2000);

            // Generate falling leaves infinitely with a delay
            setTimeout(() => {
                startFallingLeaves();
            }, 1000);
        }
    });

    function startFallingLeaves() {
        // Create initial batch for immediate effect
        for (let i = 0; i < 10; i++) createLeaf();

        // Start infinite interval
        setInterval(() => {
            createLeaf();
        }, 300); // Create a leaf every 300ms
    }

    function createLeaf() {
        const leaf = document.createElement('div');
        leaf.classList.add('leaf');

        // Randomize properties
        const randomLeft = Math.random() * 100; // 0% to 100%
        const randomDuration = Math.random() * 3 + 3; // 3s to 6s
        const randomSize = Math.random() * 5 + 5; // 10px to 20px
        const randomColor = Math.random() > 0.5 ? '#d4af37' : '#5b753a'; // Gold or Lavender

        leaf.style.left = `${randomLeft}vw`;
        leaf.style.width = `${randomSize}px`;
        leaf.style.height = `${randomSize}px`;
        leaf.style.backgroundColor = randomColor;
        leaf.style.animation = `fall ${randomDuration}s linear forwards`;

        document.body.appendChild(leaf);

        // Cleanup after animation
        setTimeout(() => {
            if (leaf && leaf.parentNode) {
                leaf.remove();
            }
        }, randomDuration * 1000);
    }

    // Initialize Swiper
    var swiper = new Swiper(".mySwiper", {
        effect: "coverflow",
        grabCursor: true,
        centeredSlides: true,
        slidesPerView: "auto",
        loop: true,
        coverflowEffect: {
            rotate: 50,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: true,
        },
        pagination: {
            el: ".swiper-pagination",
        },
        autoplay: {
            delay: 2500,
            disableOnInteraction: false,
        },
    });
});