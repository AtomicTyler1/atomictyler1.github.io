async function fetchData() {
    const cacheKey = "modStats";
    const cacheTimeKey = "modStatsTimestamp";
    const cacheDuration = 5 * 60 * 1000;
    const now = Date.now();

    const cachedData = localStorage.getItem(cacheKey);
    const cachedTime = localStorage.getItem(cacheTimeKey);

    if (cachedData && cachedTime && now - cachedTime < cacheDuration) {
        console.log("Using cached data");
        return JSON.parse(cachedData);
    }

    console.log("Fetching new data...");
    try {
        const response = await fetch("https://gist.githubusercontent.com/AtomicTyler1/913a40238b453d557cb1073fd4c05a83/raw");
        if (!response.ok) throw new Error("Failed to fetch data");

        const data = await response.json();

        localStorage.setItem(cacheKey, JSON.stringify(data));
        localStorage.setItem(cacheTimeKey, now.toString());

        return data;
    } catch (error) {
        console.error("Error fetching data:", error);
        return cachedData ? JSON.parse(cachedData) : null;
    }
}

function updateUI(data) {
    if (!data) {
        document.getElementById("downloads").textContent = "Error loading data";
        document.getElementById("ratings").textContent = "Error loading data";
        return;
    }

    const lastCheckedTimestamp = new Date(data.last_checked * 1000);
    const formattedDate = `${lastCheckedTimestamp.getDate().toString().padStart(2, '0')}/${
        (lastCheckedTimestamp.getMonth() + 1).toString().padStart(2, '0')}/${
        lastCheckedTimestamp.getFullYear()} ${lastCheckedTimestamp.getHours().toString().padStart(2, '0')}:${
        lastCheckedTimestamp.getMinutes().toString().padStart(2, '0')}:${lastCheckedTimestamp.getSeconds().toString().padStart(2, '0')}`;

    document.getElementById("downloads").textContent = data.total_downloads.toLocaleString();
    document.getElementById("ratings").textContent = data.total_ratings.toLocaleString();
    document.getElementById("lastChecked").textContent = formattedDate + " (GMT)";

    
}

fetchData().then(data => {
    updateUI(data);
});


setInterval(async () => {
    console.log("Checking for new data...");
    const data = await fetchData();
    updateUI(data);
}, 5 * 60 * 1000);

window.onload = () => {
    document.body.style.opacity = "1";
};

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

setInterval(createLeaf, 750);

function goBack() {
    document.body.style.opacity = "0";
    document.querySelector(".container").style.opacity = "0";
    setTimeout(() => {
        window.location.href = "/";
    }, 1000);
}
