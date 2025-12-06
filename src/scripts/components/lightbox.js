/**
 * Lightbox component
 * Handles lightbox creation and display logic
 */

/**
 * Create and display a lightbox with an image
 * @param {string} src - Image source URL
 * @param {string|null} link - Optional link to visit project
 */
export function createLightbox(src, link = null) {
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    
    const img = document.createElement('img');
    img.src = src;
    
    const closeBtn = document.createElement('button');
    closeBtn.className = 'lightbox-close';
    closeBtn.innerHTML = '&times;'; // Close X symbol
    
    lightbox.appendChild(img);
    lightbox.appendChild(closeBtn);

    // Add "Visit Project" button if link exists
    if (link) {
        const linkBtn = document.createElement('a');
        linkBtn.href = link;
        linkBtn.target = '_blank';
        linkBtn.className = 'lightbox-link-btn';
        linkBtn.textContent = 'VISIT PROJECT ↗';
        lightbox.appendChild(linkBtn);
    }

    document.body.appendChild(lightbox);
    
    // Trigger fade in
    requestAnimationFrame(() => {
        lightbox.classList.add('active');
    });
    
    const closeLightbox = () => {
        lightbox.classList.remove('active');
        setTimeout(() => {
            lightbox.remove();
        }, 300); // Wait for transition
    };
    
    closeBtn.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) closeLightbox();
    });
}
