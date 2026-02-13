// main.js - Core application logic

// Global variables and state
let MOD_STATS = { total_downloads: 0, total_ratings: 0, last_checked: 0 };
let ALL_MODS = [];
let GITHUB_REPOS = [];

const GIST_API_URL = 'https://api.github.com/gists/913a40238b453d557cb1073fd4c05a83';
const GIST_FILE_NAME = 'prev.json';
const GITHUB_API_URL = 'https://api.github.com/users/AtomicTyler1/repos';

const CACHE_KEY_MODS = 'atomic_mod_data_cache_v3';
const CACHE_KEY_GITHUB = 'atomic_github_repos_cache_v3';
const CACHE_KEY_THEME = 'atomic_theme_preference_v3';
const CACHE_EXPIRY_MS = 3600000;
const MOD_CACHE_EXPIRY_MS = 3600000 * 4;

let CURRENT_SORT = { by: 'downloads', order: 'desc' };
let CURRENT_FILTER = { community: 'All', platform: 'All' };

const APP_STATE = {
    currentPage: 'home',
    isMobileMenuOpen: false,
};

// DOM Elements
const contentDiv = document.getElementById('content');
const appContainer = document.getElementById('app');

// Utility Functions
const formatNumber = (num) => new Intl.NumberFormat('en-US').format(num);

// Theme Management
function initializeTheme() {
    const savedTheme = localStorage.getItem(CACHE_KEY_THEME);
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
        document.body.classList.add('dark');
    } else {
        document.body.classList.remove('dark');
    }
    updateThemeIcons();
}

function toggleTheme() {
    const isDark = document.body.classList.toggle('dark');
    localStorage.setItem(CACHE_KEY_THEME, isDark ? 'dark' : 'light');
    updateThemeIcons();
}

function updateThemeIcons() {
    const isDark = document.body.classList.contains('dark');
    document.querySelectorAll('.theme-icon-light').forEach(icon => {
        icon.classList.toggle('hidden', isDark);
    });
    document.querySelectorAll('.theme-icon-dark').forEach(icon => {
        icon.classList.toggle('hidden', !isDark);
    });
    lucide.createIcons();
}

// Mobile Menu
function toggleMobileMenu() {
    APP_STATE.isMobileMenuOpen = !APP_STATE.isMobileMenuOpen;
    const menuEl = document.getElementById('mobile-menu');

    if (APP_STATE.isMobileMenuOpen) {
        menuEl.classList.remove('hidden');
        setTimeout(() => {
            menuEl.classList.replace('bottom-0', 'bottom-50')
            menuEl.classList.remove('translate-y-full');
        }, 10);
    } else {
        menuEl.classList.add('translate-y-full');
        menuEl.classList.replace('bottom-50', 'bottom-0')
        setTimeout(() => {
            menuEl.classList.add('hidden');
        }, 300);
    }

    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const iconElement = mobileMenuButton ? mobileMenuButton.querySelector('i') : null;

    if (iconElement) {
        iconElement.setAttribute('data-lucide', APP_STATE.isMobileMenuOpen ? 'x' : 'menu');
    }
    lucide.createIcons();
}

// Navigation
function navigate(page) {
    APP_STATE.currentPage = page;

    if (APP_STATE.isMobileMenuOpen) {
        toggleMobileMenu();
    }

    window.location.hash = page;

    document.querySelectorAll('.nav-link, .nav-link-mobile').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('data-page') === page) {
            link.classList.add('active');
        }
    });

    contentDiv.innerHTML = '';
    switch (page) {
        case 'home':
            renderHomePage();
            break;
        case 'communities':
            renderCommunitiesPage();
            break;
        case 'projects':
            renderProjectsPage();
            break;
        case 'tools':
            renderToolsPage();
            break;
        case 'cla':
            renderClaPage();
            break;
        case 'leveling':
            renderLevelingPage();
            break;
        case 'peakPresets':
            renderPeakPresetsPage();
            break;
        default:
            renderHomePage();
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Message Display
function showMessage(id, message, colorClass) {
    const el = document.getElementById(id);
    if (el) {
        el.textContent = message;
        el.className = `p-3 rounded-lg text-sm font-semibold mt-4 text-center ${colorClass}`;
        el.style.opacity = 1;
        setTimeout(() => {
            el.style.opacity = 0;
            el.textContent = '';
            el.className = `text-center transition-opacity duration-500`;
        }, 4000);
    }
}

// Data Fetching
async function fetchModData() {
    try {
        const response = await fetch(GIST_API_URL);
        const gist = await response.json();

        if (!gist.files || !gist.files[GIST_FILE_NAME]) {
            console.error("prev.json not found in Gist");
            return;
        }

        const fileContent = JSON.parse(gist.files[GIST_FILE_NAME].content);

        MOD_STATS = {
            total_downloads: fileContent.total_downloads || 0,
            total_ratings: fileContent.total_ratings || 0,
            last_checked: fileContent.last_checked || 0
        };

        ALL_MODS = Object.entries(fileContent)
            .filter(([k, v]) => v && v.downloads !== undefined)
            .map(([key, modData]) => {
                const isSteam = modData.platform === 'Steam';
                
                return {
                    name: key,
                    author: isSteam ? "Atomic();" : "AtomicStudio",
                    ...modData
                };
            });

        console.log("Successfully loaded", ALL_MODS.length, "mods from Gist");
        localStorage.setItem(CACHE_KEY_MODS, JSON.stringify({
            data: { mods: ALL_MODS, stats: MOD_STATS },
            timestamp: Date.now()
        }));
    } catch (err) {
        console.error("Failed to fetch mod data:", err);
    }
}

async function fetchGithubRepos() {
    const cachedData = localStorage.getItem(CACHE_KEY_GITHUB);
    if (cachedData) {
        const { data, timestamp } = JSON.parse(cachedData);
        if (Date.now() - timestamp < CACHE_EXPIRY_MS) {
            GITHUB_REPOS = data;
            return;
        }
    }

    try {
        const response = await fetch(GITHUB_API_URL);
        const repos = await response.json();

        GITHUB_REPOS = repos
            .filter(repo => !repo.fork && repo.name !== 'AtomicTyler1' && repo.name !== 'AtomicTyler1.github.io')
            .sort((a, b) => new Date(b.pushed_at) - new Date(a.pushed_at));

        localStorage.setItem(CACHE_KEY_GITHUB, JSON.stringify({
            data: GITHUB_REPOS,
            timestamp: Date.now()
        }));
    } catch (error) {
        console.error("Failed to fetch GitHub repos:", error);
    }
}

// Home Page
function renderHomePage() {
    contentDiv.innerHTML = `
        <div class="hero-container page-transition">
            <div class="hero-content">
                <h1 class="text-7xl sm:text-8xl lg:text-9xl font-extrabold text-[--color-text-main] tracking-tighter opacity-90">
                    Atomic<span class="text-[--color-accent] text-12xl">();</span>
                </h1>
                <p class="text-xl sm:text-2xl font-light mt-4 text-[--color-subtle] max-w-2xl mx-auto">
                    The personal hub for my projects, mods, and communities.
                </p>
                
                <div class="mt-12 flex justify-center space-x-6">
                    <a href="#projects" class="bg-[--color-accent] text-white font-bold py-3 px-8 rounded-full shadow-lg shadow-[--color-shadow-base] hover:opacity-90 transition duration-300 transform hover:scale-105">
                        View Projects
                    </a>
                    <a href="#communities" class="bg-gray-700 dark:bg-[--color-background-panel] text-white dark:text-[--color-text-main] font-bold py-3 px-8 rounded-full shadow-lg dark:shadow-md dark:shadow-[--color-subtle]/50 hover:bg-gray-600 dark:hover:bg-[--color-border] transition duration-300 transform hover:scale-105">
                        Join Communities
                    </a>
                </div>
            </div>
        </div>

        <section id="mod-stats" class="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 text-center">
            <div class="panel-block p-6">
                <i data-lucide="download-cloud" class="w-8 h-8 text-[--color-accent] mx-auto mb-3"></i>
                <p class="text-3xl font-bold text-[--color-text-main]" id="total-downloads">...</p>
                <p class="text-sm text-[--color-subtle] uppercase tracking-wider mt-1">Total Downloads</p>
            </div>
            <div class="panel-block p-6">
                <i data-lucide="star" class="w-8 h-8 text-[--color-accent] mx-auto mb-3"></i>
                 <p class="text-3xl font-bold text-[--color-text-main]" id="total-ratings">...</p>
                <p class="text-sm text-[--color-subtle] uppercase tracking-wider mt-1">Total Ratings</p>
            </div>
            <div class="panel-block p-6">
                <i data-lucide="puzzle" class="w-8 h-8 text-[--color-accent] mx-auto mb-3"></i>
                 <p class="text-3xl font-bold text-[--color-text-main]" id="total-mods-count">...</p>
                <p class="text-sm text-[--color-subtle] uppercase tracking-wider mt-1">Mods Available</p>
            </div>
        </section>
        
        <section class="mt-16 text-center">
            <h2 class="text-4xl font-extrabold text-[--color-text-main] mb-4">Online Tools</h2>
            <p class="text-lg text-[--color-subtle] mb-8">Quickly access the online tools I've built to help mod developers.</p>
            <a href="#tools" class="inline-block bg-[--color-subtle]/30 dark:bg-[--color-background-panel] text-[--color-text-main] font-bold py-3 px-8 rounded-full shadow-lg hover:bg-[--color-subtle]/50 dark:hover:bg-[--color-border] transition duration-300">
                Explore Tools <i data-lucide="wrench" class="w-5 h-5 inline ml-2"></i>
            </a>
        </section>
    `;
    lucide.createIcons();
    updateHomePageStats();
}

function updateHomePageStats() {
    const downloadEl = document.getElementById('total-downloads');
    const ratingEl = document.getElementById('total-ratings');
    const modsEl = document.getElementById('total-mods-count');

    if (downloadEl) downloadEl.textContent = formatNumber(MOD_STATS?.total_downloads ?? 0);
    if (ratingEl) ratingEl.textContent = formatNumber(MOD_STATS?.total_ratings ?? 0);
    if (modsEl) modsEl.textContent = (ALL_MODS?.length ?? 0);

    lucide.createIcons();
}

// Projects Page
function renderProjectsPage() {
    const allModsArray = ALL_MODS || [];
    const platforms = ['All', ...new Set(allModsArray.map(m => m.platform).filter(p => p))];
    const communities = ['All', ...new Set(allModsArray.map(m => m.community).filter(c => c))];
    const githubContent = GITHUB_REPOS.length > 0
        ? GITHUB_REPOS.map(renderRepoCard).join('')
        : '<p class="text-center text-gray-500 italic col-span-full py-8">Fetching GitHub repositories...</p>';

    contentDiv.innerHTML = `
        <div class="page-transition">
            <h2 class="text-4xl font-extrabold text-[--color-text-main] mb-8 border-b-2 border-[--color-border] pb-2 mt-16">My Mods (${allModsArray.length} Total)</h2>
            <p class="text-lg text-[--color-subtle] mb-8">All my published mods and their statistics.</p>
            
            <div class="panel-block p-6 mb-8">
                <div class="flex flex-wrap items-center gap-4 mb-6 p-4 border-b border-[--color-border]">
                    <label class="font-semibold text-sm">Sort By:</label>
                    <select id="mod-sort-by" onchange="updateModSort(this.value)" class="p-2 border rounded-lg bg-[--color-background-panel] text-[--color-text-main]">
                        <option value="downloads" ${CURRENT_SORT.by === 'downloads' ? 'selected' : ''}>Downloads</option>
                        <option value="ratings" ${CURRENT_SORT.by === 'ratings' ? 'selected' : ''}>Ratings</option>
                        <option value="name" ${CURRENT_SORT.by === 'name' ? 'selected' : ''}>Name</option>
                    </select>
                    
                    <button onclick="toggleModSortOrder()" class="p-2 bg-[--color-subtle]/30 rounded-lg text-[--color-text-main] hover:bg-[--color-subtle]/50" id="mod-sort-order-btn">
                        <i data-lucide="arrow-down" class="w-4 h-4 inline mr-1"></i> Desc
                    </button>
                    
                    <label class="font-semibold text-sm ml-4">Platform:</label>
                    <select id="mod-filter-platform" onchange="updateModFilter('platform', this.value)" class="p-2 border rounded-lg bg-[--color-background-panel] text-[--color-text-main]">
                        ${platforms.map(p => `<option value="${p}" ${CURRENT_FILTER.platform === p ? 'selected' : ''}>${p}</option>`).join('')}
                    </select>

                    <label class="font-semibold text-sm ml-4">Community:</label>
                    <select id="mod-filter-community" onchange="updateModFilter('community', this.value)" class="p-2 border rounded-lg bg-[--color-background-panel] text-[--color-text-main]">
                        ${communities.map(c => `<option value="${c}" ${CURRENT_FILTER.community === c ? 'selected' : ''}>${c}</option>`).join('')}
                    </select>
                </div>

                <div id="mods-list-container" class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                </div>
            </div>
        </div>
        <h2 class="text-4xl font-extrabold text-[--color-text-main] mb-8 border-b-2 border-[--color-border] pb-2">My Open-Source Code</h2>
        <p class="text-lg text-[--color-subtle] mb-8">A snapshot of my recent activity on GitHub, showcasing my open-source infrastructure and projects.</p>
        <div id="github-repos-container" class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
            ${githubContent}
        </div> 
    `;

    lucide.createIcons();
    sortAndFilterMods();
}

function renderRepoCard(repo) {
    const lastPushed = new Date(repo.pushed_at).toLocaleDateString();
    return `
        <a href="${repo.html_url}" target="_blank" class="panel-block p-6 flex flex-col justify-between">
            <div>
                <div class="flex items-center justify-between">
                    <h3 class="text-xl font-bold text-[--color-accent]">${repo.name}</h3>
                    ${repo.language ? `<span class="text-xs font-mono bg-[--color-subtle]/20 px-2 py-1 rounded-full text-[--color-text-main]">${repo.language}</span>` : ''}
                </div>
                <p class="text-sm text-[--color-text-main] mt-2">${repo.description || 'No description provided.'}</p>
            </div>
            <div class="mt-4 flex justify-between items-center text-sm text-[--color-subtle]">
                <span class="flex items-center">
                    <i data-lucide="star" class="w-4 h-4 mr-1"></i>${repo.stargazers_count}
                </span>
                <span class="flex items-center">
                    <i data-lucide="git-fork" class="w-4 h-4 mr-1"></i>${repo.forks_count}
                </span>
                <span>Updated: ${lastPushed}</span>
            </div>
        </a>
    `;
}

function renderModCard(mod) {
    let isPopular = ``;
    if (mod.popular == "True") {
        isPopular = `
            <div class="absolute top-2 right-2 bg-gradient-to-r from-amber-500/90 to-yellow-500/90 backdrop-blur-sm rounded-full px-2.5 py-1.5 shadow-lg z-10 flex items-center gap-1 border border-yellow-300/30">
                <i data-lucide="flame" class="w-3.5 h-3.5 text-white"></i>
                <span class="text-[11px] font-bold text-white tracking-wide">POPULAR</span>
            </div>
        `;
    }
    
    let platformBadge = '';
    if (mod.platform) {
        const platform = mod.platform.toLowerCase();
        let platformSvg = PLATFORM_SVGS[platform] || PLATFORM_SVGS.thunderstore;
        
        const coloredSvg = platformSvg
            .replace('class="', 'class="w-5 h-5 ')
            .replace('fill="currentColor"', 'fill="currentColor"');
        
        platformBadge = `
            <div class="absolute top-2 left-2 bg-black/70 dark:bg-gray-900/80 backdrop-blur-sm rounded-full p-1.5 shadow-lg z-10 border border-white/10">
                <div class="w-5 h-5 flex items-center justify-center text-white">
                    ${coloredSvg}
                </div>
            </div>
        `;
    }
    
    const platform = mod.platform ? mod.platform.toLowerCase() : 'thunderstore';

    let ratings = mod.ratings || 0;
    if (mod.platform == "Steam") {
        ratings = mod["positive ratings"] || 0;
    }
    
    let iconHtml = `<div class="text-[--color-accent] opacity-50 scale-75">${PLATFORM_SVGS[platform] || PLATFORM_SVGS.thunderstore}</div>`;
    
    if (platform === 'thunderstore' && mod.link) {
        try {
            const urlParts = mod.link.split('/p/')[1].split('/');
            const author = urlParts[0];
            const modName = urlParts[1];
            const version = mod.version || "1.0.0";
            const iconUrl = `https://gcdn.thunderstore.io/live/repository/icons/${author}-${modName}-${version}.png`;
            
            iconHtml = `<img src="${iconUrl}" alt="${mod.name}" class="mod-card-image w-full h-full object-cover" onerror="this.outerHTML='<div class=\\'flex items-center justify-center w-full h-full text-[--color-accent] opacity-50 scale-75\\'>${PLATFORM_SVGS.thunderstore}</div>`; 
        } catch (e) {
            console.warn("Could not parse Thunderstore link for icon", mod.name);
        }
    } else if (mod.icon) {
        iconHtml = `<img src="${mod.icon}" alt="${mod.name}" class="mod-card-image w-full h-full object-cover" onerror="this.outerHTML='<div class=\\'flex items-center justify-center w-full h-full text-[--color-accent] opacity-50 scale-75\\'>${PLATFORM_SVGS[platform] || PLATFORM_SVGS.thunderstore}</div>`;
    }

    return `
        <a href="${mod.link}" target="_blank" class="mod-card panel-block group relative flex flex-col p-0 overflow-hidden transition-all duration-300">
            <div class="mod-card-icon-wrapper aspect-square w-full bg-gradient-to-br from-[--color-subtle]/5 to-[--color-subtle]/15 flex items-center justify-center relative overflow-hidden">
                ${platformBadge}
                ${isPopular}
                ${iconHtml}
            </div>
            <div class="p-4 flex flex-col flex-grow">
                <h4 class="text-base font-bold text-[--color-text-main] line-clamp-2 min-h-[3rem] group-hover:text-[--color-accent] transition-colors leading-tight mb-2">${mod.name}</h4>
                <p class="text-xs text-[--color-subtle] mb-3 font-medium">${mod.community || 'Unknown'} • v${mod.version || '1.0.0'}</p>
                
                <div class="mt-auto pt-3 border-t border-[--color-border] flex items-center justify-between text-sm font-bold">
                    <span class="flex items-center gap-1.5 text-[--color-accent] bg-[--color-accent]/10 px-3 py-1.5 rounded-full">
                        <i data-lucide="download" class="w-4 h-4"></i>
                        <span class="text-xs">${formatNumber(mod.downloads || 0)}</span>
                    </span>
                    <span class="flex items-center gap-1.5 text-yellow-600 dark:text-yellow-400 bg-yellow-500/10 px-3 py-1.5 rounded-full">
                        <i data-lucide="star" class="w-4 h-4 fill-current"></i>
                        <span class="text-xs">${formatNumber(ratings)}</span>
                    </span>
                </div>
            </div>
        </a>
    `;
}

// Mod Sorting & Filtering
function updateModSort(by) {
    CURRENT_SORT.by = by;
    sortAndFilterMods();
}

function toggleModSortOrder() {
    CURRENT_SORT.order = CURRENT_SORT.order === 'desc' ? 'asc' : 'desc';
    sortAndFilterMods();
}

function updateModFilter(type, value) {
    CURRENT_FILTER[type] = value;
    sortAndFilterMods();
}

function sortAndFilterMods() {
    const allModsArray = ALL_MODS || [];
    const container = document.getElementById('mods-list-container');

    if (!container) return;
    if (allModsArray.length === 0 && (MOD_STATS?.last_checked === 0)) {
        container.innerHTML = '<p class="text-center text-gray-500 italic py-8">Fetching mod data...</p>';
        lucide.createIcons();
        return;
    }

    let filtered = allModsArray.filter(mod => {
        const platformMatch = CURRENT_FILTER.platform === 'All' || mod.platform === CURRENT_FILTER.platform;
        const communityMatch = CURRENT_FILTER.community === 'All' || mod.community === CURRENT_FILTER.community;
        return platformMatch && communityMatch;
    });

    filtered.sort((a, b) => {
        let valA = a[CURRENT_SORT.by] || 0;
        let valB = b[CURRENT_SORT.by] || 0;

        if (CURRENT_SORT.by === 'ratings') {
            valA = a.platform === 'Steam' ? (a['positive ratings'] || 0) : valA;
            valB = b.platform === 'Steam' ? (b['positive ratings'] || 0) : valB;
        }

        if (CURRENT_SORT.by === 'name') {
            valA = a.name.toLowerCase();
            valB = b.name.toLowerCase();
        }

        let comparison = 0;
        if (valA > valB) comparison = 1;
        if (valA < valB) comparison = -1;

        return CURRENT_SORT.order === 'desc' ? comparison * -1 : comparison;
    });

    if (filtered.length === 0) {
        container.innerHTML = '<p class="text-center text-gray-500 italic py-8">No mods found matching the current filters.</p>';
    } else {
        container.innerHTML = filtered.map(renderModCard).join('');
    }
    lucide.createIcons();

    const sortBtn = document.getElementById('mod-sort-order-btn');
    if (sortBtn) {
        const iconName = CURRENT_SORT.order === 'desc' ? 'arrow-down' : 'arrow-up';
        sortBtn.innerHTML = `<i data-lucide="${iconName}" class="w-4 h-4 inline mr-1"></i> ${CURRENT_SORT.order === 'desc' ? 'Desc' : 'Asc'}`;
        lucide.createIcons();
    }
}

// Data Refresh
function refreshDataViews() {
    if (APP_STATE.currentPage === 'home') {
        updateHomePageStats();
    }
    if (APP_STATE.currentPage === 'projects') {
        renderProjectsPage();
    }
}

// Konami Code Easter Egg
const konamiCode = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];
let konamiCodePosition = 0;
let easterEggActivated = false;

function rickroll() {
    if (easterEggActivated) return;

    const overlay = document.getElementById('rickroll-overlay');
    const video = document.getElementById('rickroll-video');

    if (overlay && video) {
        overlay.classList.remove('konami-hidden');

        video.play().catch(error => {
            video.muted = true;
            video.play().catch(e => {
                console.error("Failed to play video even muted. User must interact.", e);
            });
        });

        easterEggActivated = true;
    }
}

// Initialization
async function initializeApp() {
    const initialPage = window.location.hash.substring(1) || 'home';

    if (['home', 'communities', 'projects', 'tools', 'cla', 'leveling', 'peakPresets'].includes(initialPage)) {
        navigate(initialPage);
    } else {
        navigate('home');
    }

    await Promise.all([
        fetchModData(),
        fetchGithubRepos()
    ]);

    refreshDataViews();
}

// Event Listeners
window.onload = () => {
    initializeTheme();
    initializeApp();

    document.getElementById('theme-toggle').addEventListener('click', toggleTheme);
    document.getElementById('theme-toggle-mobile').addEventListener('click', toggleTheme);

    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            navigate(link.getAttribute('data-page'));
        });
    });

    document.querySelectorAll('.nav-link-mobile').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            navigate(link.getAttribute('data-page'));
        });
    });
    document.getElementById('mobile-menu-button').addEventListener('click', toggleMobileMenu);

    window.addEventListener('hashchange', () => {
        const page = window.location.hash.substring(1) || 'home';
        if (['home', 'communities', 'projects', 'tools', 'cla', 'leveling', 'peakPresets'].includes(page)) {
            navigate(page);
        } else {
            navigate('home');
        }
    });

    document.addEventListener('keydown', (e) => {
        if (easterEggActivated) return;
        
        let requiredKey = konamiCode[konamiCodePosition];

        if (e.keyCode === requiredKey) {
            konamiCodePosition++;

            if (konamiCodePosition === konamiCode.length) {
                rickroll();
                konamiCodePosition = 0;
            }
        } else {
            konamiCodePosition = 0;
        }
    });
};

document.addEventListener("DOMContentLoaded", async () => {
    initializeTheme();
    await fetchModData();
    await fetchGithubRepos();
    navigate(window.location.hash.replace("#", "") || "home");
    refreshDataViews();
    lucide.createIcons();
});