document.addEventListener("DOMContentLoaded", function() {
    // Get the current page's filename (e.g., 'about.html' or 'index.html')
    const currentFile = window.location.pathname.split('/').pop();

    // Select all navigation links
    const navLinks = document.querySelectorAll(".navbar-nav .nav-item a");

    // Loop through each link
    navLinks.forEach(link => {
        // Get the link's href attribute
        const linkHref = link.getAttribute("href").split('/').pop();

        // Check if the link's href matches the current file name exactly
        if (linkHref === currentFile) {
            // Add 'active' class to the link's parent <li> element (for the exact page)
            const exactItem = link.closest("li");
            if (exactItem) {
                exactItem.classList.add("active");
            }

            // If the link is part of a dropdown, activate the parent dropdown as well
            const parentDropdown = link.closest(".dropdown");
            if (parentDropdown) {
                parentDropdown.classList.add("active"); // Mark the dropdown as active
            }
        }
    });
});
