(() => {
    const dropdowns = document.querySelectorAll(".dropdown");
    
    dropdowns.forEach(dropdown => {
        const dropdownBtn = dropdown.querySelector(".dropdown-btn");
        const dropdownContent = dropdown.querySelector(".dropdown-content");

        dropdownBtn.addEventListener("click", event => {
            // display selected dropdown
            dropdownContent.classList.toggle("show");

            // close any dropdowns that aren't the currently selected
            dropdowns.forEach(dropdown => {
                const dropdownBtn = dropdown.querySelector(".dropdown-btn");
                const dropdownContent = dropdown.querySelector(".dropdown-content");
                if (event.target.innerText != dropdownBtn.innerText && dropdownContent.classList.contains("show")) {
                    dropdownContent.classList.remove("show");
                }
            });
        });
    });

    window.addEventListener("click", event => {
        // close dropdowns if anything but a dropdown button was selected
        if (!event.target.matches(".dropdown-btn")) {
            dropdowns.forEach(dropdown => {
                const dropdownContent = dropdown.querySelector(".dropdown-content");
                if (dropdownContent.classList.contains("show")) {
                    dropdownContent.classList.remove("show");
                }
            });
        }
    });
})();