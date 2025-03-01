window.onload = () => {
    document.body.style.opacity = "1";
    checkQuery();
    if ( SocialsDisabled === true ) {
        window.location.href = "/404"+window.location.search;
    }
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

var SocialsDisabled = false;

function checkQuery() {
    const queryString = window.location.search;
    if (queryString.includes("disabled=true")) {
        SocialsDisabled = true;
        console.log(SocialsDisabled+", it should be true now.")
    }
}

checkQuery();

function goBack() {
    document.body.style.opacity = "0";
    document.querySelector(".container").style.opacity = "0";
    setTimeout(() => {
        checkQuery();
        if ( SocialsDisabled === true ) {
            window.location.href = "/"+window.location.search;
        }
        else {
            window.location.href = "/"
        }
    }, 1000);
}