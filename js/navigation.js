(() => {
    // navbar
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

    // code example buttons
    const examples = document.querySelectorAll(".example");

    examples.forEach(example => {
        const content = example.querySelector(".example-content");
        const exampleBtns = example.querySelector(".example-buttons");
        const renderBtn = example.querySelector(".example-buttons > .render-btn");
        const rawBtn = example.querySelector(".example-buttons > .raw-btn");

        try {
            const rawView = document.createElement("pre");
            rawView.classList.add("block-code");
            const rawViewCode = document.createElement("code");
            rawViewCode.append(document.createTextNode(stringifyElement(content.childNodes, 0)));
            rawView.append(rawViewCode);

            if (rawBtn != null) rawBtn.addEventListener("click", event => {
                // console.log(stringifyElement(content.childNodes, 0));
                content.remove();
                exampleBtns.insertAdjacentElement("beforeBegin", rawView);
            });

            if (renderBtn != null) renderBtn.addEventListener("click", event => {
                rawView.remove();
                exampleBtns.insertAdjacentElement("beforeBegin", content);
            });
        } catch (err) {
            console.warn(err);
        }
    });

    function stringifyElement(elements, indentation) {
        let output = "";

        elements.forEach(element => {
            const elementName = element.localName;
            let selfClosing = false;
            let blockLevel = false;

            // is element or text node?
            if (elementName) {
                output += " ".repeat(indentation) + "<" + elementName + ">";
                // add a newline if block-level to the end of the opening element
                const displayStyle = window.getComputedStyle(element, null).getPropertyValue("display");
                if (displayStyle == "block" || displayStyle == "flex" || displayStyle == "grid" ||
                    displayStyle == "table" || displayStyle == "table-row-group" || displayStyle == "table-row" ||
                    displayStyle == "table-header-group" || displayStyle == "table-footer-group") {
                    output += "\n";
                    blockLevel = true;
                }
            }
            else {
                // is a text node
                selfClosing = true;
                const content = element.textContent.trim();
                if (content.length > 0) output += content;
            }

            // is self closing?
            switch (elementName) {
                case "input":
                case "meta":
                case "area":
                case "base":
                case "br":
                case "hr":
                case "col":
                case "embed":
                case "img":
                case "link":
                case "param":
                case "source":
                case "track":
                case "wbr":
                    selfClosing = true;
            }

            // handle any children
            output += stringifyElement(element.childNodes, indentation + 4);

            // if not self closing, add indentation for block level and no indentation for inline
            if (!selfClosing) {
                if (elementName && blockLevel) output += " ".repeat(indentation) + "</" + elementName + ">" + "\n";
                else if (elementName) output += "</" + elementName + ">" + "\n";
            }
        });

        // output += "\n";
        return output;
    }
})();