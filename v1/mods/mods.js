function toggleDropdown(id, button) {
    const lethalMods = document.getElementById('lethalMods');
    const cwMods = document.getElementById('cwMods');
    const otherGames = document.getElementById('otherGames');
    const slimeRancher = document.getElementById('slimeRancher');

    let target = document.getElementById(id);
    let arrow = button.querySelector("img");

    if (target.classList.contains('open')) {
        target.classList.remove('open');
        arrow.style.transform = "rotate(0deg)";
    } else {
        lethalMods.classList.remove('open');
        cwMods.classList.remove('open');
        otherGames.classList.remove('open');
        slimeRancher.classList.remove('open');

        let allArrows = document.querySelectorAll(".button img");
        allArrows.forEach(img => img.style.transform = "rotate(0deg)");

        target.classList.add('open');
        arrow.style.transform = "rotate(90deg)";
    }
}

function toggleSubDropdown(id, button) {
    const slimeRancher = document.getElementById('slimeRancher');
    let arrow = button.querySelector("img");

    if (slimeRancher.classList.contains('open')) {
        slimeRancher.classList.remove('open');
        arrow.style.transform = "rotate(0deg)";
    } else {
        slimeRancher.classList.add('open');
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
