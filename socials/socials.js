window.onload = () => {
    document.body.style.opacity = "1";
};

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
        window.location.href = "/";
    }, 1000);
}