window.onload = () => {
    document.body.style.opacity = "1";
};

function toggleDropdown(id, button) {
    const dev_2025 = document.getElementById('2025');

    let target = document.getElementById(id);
    let arrow = button.querySelector("img");

    if (target.classList.contains('open')) {
        target.classList.remove('open');
        arrow.style.transform = "rotate(0deg)";
    } else {
        dev_2025.classList.remove('open');

        let allArrows = document.querySelectorAll(".button img");
        allArrows.forEach(img => img.style.transform = "rotate(0deg)");

        target.classList.add('open');
        arrow.style.transform = "rotate(90deg)";
    }
}

function toggleSubDropdown(id, button) {
    const dev_28_2_2025 = document.getElementById('28/2/2025');

    let arrow = button.querySelector("img");
    let target = document.getElementById(id);

    if (target.classList.contains('open')) {
        target.classList.remove('open');
        arrow.style.transform = "rotate(0deg)";
    } else {
        dev_28_2_2025.classList.remove('open');

        target.classList.add('open');
        arrow.style.transform = "rotate(90deg)";
    }
}

function createLeaf() {
    const leaf = document.createElement("img");
    leaf.src = "/images/icons/leaf.png";
    leaf.classList.add("leaf");

    leaf.style.left = Math.random() * window.innerWidth + "px";
    const duration = Math.random() * 5 + 3;
    leaf.style.animationDuration = duration + "s";

    document.body.appendChild(leaf);

    setTimeout(() => {
        leaf.classList.add("fade-out");

        setTimeout(() => {
            leaf.remove();
        }, 1000);
    }, duration * 1000);
}

setInterval(createLeaf, 750);

function goBack() {
    document.body.style.opacity = "0";
    document.querySelector(".container").style.opacity = "0";

    setTimeout(() => {
        window.location.href = "https://atomictyler1.github.io";
    }, 1000);
}