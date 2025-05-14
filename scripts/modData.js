const steamTitleMap = {
    "Charging Divebell 🔋": "Steam - Charging Divebell 🔋",
    "Breakable Glass": "Steam - Breakable Glass",
    "Configurable Film ( Infinite included )": "Steam - Configurable Film ( Infinite included )",
    "Exit Confirmation": "Steam - Exit Confirmation",
    "Divebell Oxygen Refill": "Steam - Divebell Oxygen Refill",
    "SuitColors": "Steam - SuitColors",
    "More Visor Colors": "Steam - More Visor Colors",
    "Free Hospital Bills": "Steam - Free Hospital Bills"
};

function updateUI(data) {
    if (!data) return;

    const modElements = document.querySelectorAll(".mod-item");

    const totalDownloadsElement = document.getElementById("total-downloads");
    const totalRatingsGoodElement = document.getElementById("total-ratings-good");
    const totalRatingsBadElement = document.getElementById("total-ratings-bad");

    totalDownloadsElement.textContent = "Total Mod Downloads: " + data.total_downloads.toLocaleString()
    totalRatingsGoodElement.textContent = "Total Mod Ratings (Good): " + data.total_ratings.toLocaleString()
    totalRatingsBadElement.textContent = "Total Mod Ratings (Bad): " + data.total_ratings_bad.toLocaleString()

    modElements.forEach(modEl => {
        const titleEl = modEl.querySelector(".mod-title");
        if (!titleEl) return;

        const modName = titleEl.textContent.trim();

        const isSteamMod = steamTitleMap[modName];
        const matchKey = isSteamMod ? steamTitleMap[modName] : modName;

        if (!data[matchKey] || typeof data[matchKey].downloads !== 'number') return;

        const modData = data[matchKey];
        const stats = modEl.querySelectorAll(".mod-stat .stat-value");
        if (isSteamMod) {
            if (stats.length < 3) return;
            stats[0].textContent = modData.downloads.toLocaleString();

            if (typeof modData.ratings === 'number') {
                stats[1].textContent = modData.ratings.toLocaleString();
            } else if (typeof modData['positive ratings'] === 'number') {
                const pos = modData['positive ratings'];
                const total = pos;
                stats[1].textContent = total.toLocaleString();
            } else {
                stats[1].textContent = "0";
            }

            if (typeof modData['negative ratings'] === 'number') {
                stats[2].textContent = modData['negative ratings'].toLocaleString();
            } else {
                stats[2].textContent = "0"; 
            }
        } else {
            if (stats.length < 2) return;
            stats[0].textContent = modData.downloads.toLocaleString();

            if (typeof modData.ratings === 'number') {
                stats[1].textContent = modData.ratings.toLocaleString();
            } else {
                stats[1].textContent = "0";
            }
        }
    });
}

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

setInterval(async () => {
    console.log("Checking for new data...");
    const data = await fetchData();
    updateUI(data);
}, 5 * 60 * 1000);

window.onload = () => {
    fetchData().then(data => {
        updateUI(data);
    });
};

window.forceRefreshStats = async function () {
    console.log("Forcing data refresh via console command...");
    localStorage.removeItem("modStats");
    localStorage.removeItem("modStatsTimestamp");
    const data = await fetchData();
    updateUI(data);
    console.log("Stats refreshed.");
};
