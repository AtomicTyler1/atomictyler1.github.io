window.onload = () => {
    let leafInterval;

    function createLeaf() {
        const leaf = document.createElement("img");
        leaf.src = "images/icons/leaf.png";
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

    setTimeout(() => {
        leafInterval = setInterval(createLeaf, 750);
    }, 3500);

    document.querySelectorAll(".button").forEach((button) => {
        button.addEventListener("click", function (e) {
            e.preventDefault();
            const link = this.href;

            clearInterval(leafInterval);

            document.body.classList.add("fade-out");
            document.querySelector(".container").classList.add("fade-out");

            document.body.style.pointerEvents = "none";

            setTimeout(() => {
                window.location.href = link;
            }, 1000);
        });
    });
};