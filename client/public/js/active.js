document.addEventListener("DOMContentLoaded", function() {
    const currentFile = window.location.pathname.split('/').pop();

    const navLinks = document.querySelectorAll(".navbar-nav .nav-item a");

    navLinks.forEach(link => {
        const linkHref = link.getAttribute("href").split('/').pop();

        if (linkHref === currentFile) {
            const exactItem = link.closest("li");
            if (exactItem) {
                exactItem.classList.add("active");
            }

            const parentDropdown = link.closest(".dropdown");
            if (parentDropdown) {
                parentDropdown.classList.add("active");
            }
        }
    });
});
