const COMMUNITIES_DATA = [
    { id: 'peak-modding', display: 'PEAK Modding Community', join: '19 April 2025', status: 'Server Owner', invite: 'discord.gg/SAw86z24rB', favourite: true, members: '5,800+', image: 'https://cdn.discordapp.com/icons/1363179626435707082/586dcf12199ee8680c018e4923ee3d2e.webp', description: 'The official modding community, partnered with Thunderstore for PEAK.', website: 'https://peakmodding.github.io/' },
    { id: 'peak', display: 'Official PEAK Discord', join: '17 June 2025', status: 'Moderator', invite: 'discord.gg/peakgame', favourite: true, members: '453,000+', image: 'https://cdn.discordapp.com/icons/1368870708335083650/9547ab960b4e3337ae6f608a63aab45e.webp', description: 'The official discord for PEAK by Landcrab (Landfall & Aggro Crab)', website: 'https://peakpeakpeak.com/' },
    { id: 'lethal-company-modding', display: 'Lethal Company Modding', join: '6 August 2024', status: 'Moderator', invite: 'discord.gg/XeyYqRdRGC', favourite: true, members: '39,000+', image: 'https://cdn.discordapp.com/icons/1168655651455639582/a_a1f853e2ebb09bbaa428648109eca048.webp', description: 'The first modding community I joined and modded in!', website: 'https://lethal.wiki/' },
    { id: 'atomics-lab', display: 'Atomic\'s Lab', join: '12 September 2025', status: 'Server Owner', invite: 'discord.gg/PGf9aa9n2t', favourite: false, members: '4+', image: 'https://cdn.discordapp.com/icons/1416132317243510906/6ad870513c1985845888086dff36707c.webp', description: 'A hub for my personal projects and developments.', website: 'https://atomictyler.dev/' },
    { id: 'content-warning-mods', display: 'Content Warning Mods', join: '19 September 2024', status: 'Modder', invite: 'discord.gg/yeGDSm4gFq', favourite: false, members: '14,900+', image: 'https://cdn.discordapp.com/icons/1224455971057958954/bd4d57e5aae0cc746e643a9b427b2a4e.webp', description: 'Official community for Content Warning Mods, by Landfall.' },
    { id: 'repo', display: 'R.E.P.O. Modding Community', join: '17 April 2025', status: 'Thunderstore', invite: 'discord.gg/vPJtKhYAFe', favourite: false, members: '12,300+', image: 'https://cdn.discordapp.com/icons/1344557689979670578/55ee5d529af2ce487eb9b1d0b6d9d49f.webp', description: 'Modding Community for R.E.P.O.' },
    { id: 'thunderstore', display: 'Thunderstore', join: '12 November 2024', status: 'Community Moderator', invite: 'discord.gg/UWpWhjZken', favourite: false, members: '11,200+', image: 'https://cdn.discordapp.com/icons/809128887366975518/b3e3ff21e74318f6c1fc734286e8ac76.webp', description: 'Popular mod hosting site.', website: 'https://thunderstore.io/' }
];

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

const DEFAULT_CLA_STEP = { r: 208, g: 163, b: 232, a: 1, ms: 1000 };

const CLA_PRESETS = {
    'Default Pulse': [
        { r: 208, g: 163, b: 232, a: 1, ms: 1500 },
        { r: 27, g: 128, b: 130, a: 1, ms: 500 },
        { r: 228, g: 33, b: 33, a: 1, ms: 1500 }
    ],
    'Soft Glow': [
        { r: 255, g: 182, b: 193, a: 0.7, ms: 2000 },
        { r: 255, g: 192, b: 203, a: 0.7, ms: 2000 }
    ],
    'Cool Breeze': [
        { r: 135, g: 206, b: 250, a: 1, ms: 1500 },
        { r: 173, g: 216, b: 230, a: 1, ms: 1500 }
    ],
    'Sunset Fade': [
        { r: 255, g: 94, b: 77, a: 1, ms: 2000 },
        { r: 255, g: 165, b: 0, a: 1, ms: 2000 },
        { r: 255, g: 223, b: 186, a: 1, ms: 2000 }
    ],
    'Emergency Strobe': [
        { r: 255, g: 0, b: 0, a: 1, ms: 100 },
        { r: 0, g: 0, b: 255, a: 1, ms: 100 },
        { r: 255, g: 0, b: 0, a: 1, ms: 100 },
        { r: 0, g: 0, b: 255, a: 0, ms: 100 }
    ]
};


let CLA_STATE = {
    steps: CLA_PRESETS['Default Pulse'],
    currentStepIndex: 0,
    animationTimeout: null,
    isPlaying: false,
};

const APP_STATE = {
    currentPage: 'home',
    isMobileMenuOpen: false,
};

const contentDiv = document.getElementById('content');
const appContainer = document.getElementById('app');

const formatNumber = (num) => new Intl.NumberFormat('en-US').format(num);
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
        default:
            renderHomePage();
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

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

async function fetchModData() {
    try {
        const response = await fetch(GIST_API_URL);
        const gist = await response.json();

        if (!gist.files || !gist.files[GIST_FILE_NAME]) {
            console.error("⚠️ prev.json not found in Gist");
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
            .map(([key, modData]) => ({
                name: key,
                author: key.startsWith("Steam -") ? "AtomicStudio (Steam)" : "AtomicStudio",
                ratings: modData.ratings ??
                    (modData["positive ratings"] || 0) + (modData["negative ratings"] || 0),
                ...modData
            }));

        console.log("✅ Successfully loaded", ALL_MODS.length, "mods from Gist");
        localStorage.setItem(CACHE_KEY_MODS, JSON.stringify({
            data: { mods: ALL_MODS, stats: MOD_STATS },
            timestamp: Date.now()
        }));
    } catch (err) {
        console.error("❌ Failed to fetch mod data:", err);
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

function updateHomePageStats() {
    const downloadEl = document.getElementById('total-downloads');
    const ratingEl = document.getElementById('total-ratings');
    const modsEl = document.getElementById('total-mods-count');

    if (downloadEl) downloadEl.textContent = formatNumber(MOD_STATS?.total_downloads ?? 0);
    if (ratingEl) ratingEl.textContent = formatNumber(MOD_STATS?.total_ratings ?? 0);
    if (modsEl) modsEl.textContent = (ALL_MODS?.length ?? 0);

    lucide.createIcons();
}

function refreshDataViews() {
    if (APP_STATE.currentPage === 'home') {
        updateHomePageStats();
    }
    if (APP_STATE.currentPage === 'projects') {
        renderProjectsPage();
    }
}

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
    const isPopular = mod.popular ? `<span class="text-xs bg-yellow-500/20 text-yellow-500 px-2 py-0.5 rounded-full font-semibold ml-2">POPULAR</span>` : '';
    const platformIcon = mod.platform === 'Steam' ? 'cog' : 'zap';

    const ratingsText = mod.platform === 'Steam'
        ? `${formatNumber(mod["positive ratings"] || 0)} <span class="text-green-500 font-semibold">^</span> / ${formatNumber(mod["negative ratings"] || 0)} <span class="text-red-500 font-semibold">v</span>`
        : `${formatNumber(mod.ratings)} Total`;

    return `
                <a href="${mod.link}" target="_blank" class="panel-block p-4 flex items-center hover:bg-[--color-subtle]/10 transition duration-300">
                    <i data-lucide="${platformIcon}" class="w-6 h-6 text-[--color-accent] mr-4 flex-shrink-0"></i>
                    <div class="flex-grow min-w-0">
                        <h4 class="text-lg font-bold text-[--color-text-main] truncate">${mod.name}${isPopular}</h4>
                        <p class="text-sm text-[--color-subtle]">${mod.community} (${mod.platform}) - v${mod.version || 'N/A'}</p>
                    </div>
                    <div class="text-right flex-shrink-0 ml-4 hidden sm:block">
                        <p class="text-md font-bold text-[--color-accent]">${formatNumber(mod.downloads)}</p>
                        <p class="text-xs text-[--color-subtle]">Downloads</p>
                    </div>
                    <div class="text-right flex-shrink-0 ml-4 hidden sm:block w-32">
                        <p class="text-sm font-semibold text-[--color-text-main]">${ratingsText}</p>
                        <p class="text-xs text-[--color-subtle]">Ratings</p>
                    </div>
                </a>
            `;
}

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

                        <div id="mods-list-container" class="space-y-4">
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

function renderCommunitiesPage() {
    const communityCardTemplate = (community) => {
        const isFavourite = community.favourite ? '<span class="absolute top-4 left-4 text-yellow-500"><i data-lucide="star" class="w-5 h-5 fill-current"></i></span>' : '';

        const websiteIcon = community.website ? `
                    <a href="${community.website}" target="_blank" class="absolute top-4 right-4 text-[--color-accent] hover:text-[--color-text-main] transition duration-300 z-10" aria-label="Visit Community Website">
                        <i data-lucide="globe" class="w-5 h-5"></i>
                    </a>
                ` : '';

        return `
                    <div class="panel-block p-6 flex flex-col justify-between h-full relative overflow-hidden">
                        ${isFavourite}
                        ${websiteIcon}
                        
                        <div class="flex items-start space-x-4 mb-4">
                            <img src="${community.image}" alt="${community.display} icon" class="w-16 h-16 rounded-xl shadow-md flex-shrink-0">
                            <div>
                                <h3 class="text-xl font-bold text-[--color-text-main]">${community.display}</h3>
                                <p class="text-sm text-[--color-accent] font-semibold">${community.status}</p>
                            </div>
                        </div>
                        
                        <p class="text-sm text-[--color-text-main] mb-4 flex-grow">${community.description}</p>
                        
                        <div class="text-xs text-[--color-subtle] mb-4 border-t border-[--color-border] pt-3">
                            <p>Joined: ${community.join}</p>
                            <p>Members: ${community.members}</p>
                        </div>

                        <button onclick="window.open('https://${community.invite}', '_blank')" class="mt-4 w-full bg-[--color-accent] text-white py-2 rounded-lg font-bold hover:opacity-80 transition duration-300 shadow-md shadow-[--color-shadow-base]">
                            Join Discord
                        </button>
                    </div>
                `;
    };

    const favouriteCommunities = COMMUNITIES_DATA.filter(c => c.favourite).map(communityCardTemplate).join('');
    const otherCommunities = COMMUNITIES_DATA.filter(c => !c.favourite).map(communityCardTemplate).join('');

    contentDiv.innerHTML = `
                <div class="page-transition">
                    <h2 class="text-4xl font-extrabold text-[--color-text-main] mb-8 border-b-2 border-[--color-border] pb-2">Favourite Communities</h2>
                    <p class="text-lg text-[--color-subtle] mb-8">These are the communities I am most actively involved in, featuring some of my main modding work.</p>
                    
                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                        ${favouriteCommunities}
                    </div>

                    <h3 class="text-3xl font-extrabold text-[--color-text-main] mb-6 border-b border-[--color-border] pb-2 mt-12">Other Communities</h3>
                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        ${otherCommunities}
                    </div>
                </div>
            `;
    lucide.createIcons();
}

function renderToolsPage() {
    const toolCards = [
        {
            id: 'cla',
            icon: 'wrench',
            title: 'Cozy Lights Animator',
            description: 'A visual editor for generating animation data for the Cozy Lights mod.',
            link: '#cla',
            accent: 'text-pink-500'
        }
    ];

    contentDiv.innerHTML = `
                <div class="page-transition">
                    <h2 class="text-4xl font-extrabold text-[--color-text-main] mb-8 border-b-2 border-[--color-border] pb-2">Online Tools</h2>
                    <p class="text-lg text-[--color-subtle] mb-8">Handy tools built to simplify the modding experience for developers and users.</p>
                    
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        ${toolCards.map(tool => `
                            <a href="${tool.link}" class="panel-block p-6 flex items-start space-x-4">
                                <i data-lucide="${tool.icon}" class="w-8 h-8 ${tool.accent} flex-shrink-0 mt-1"></i>
                                <div>
                                    <h3 class="text-xl font-bold text-[--color-text-main]">${tool.title}</h3>
                                    <p class="text-sm text-[--color-subtle] mt-1">${tool.description}</p>
                                </div>
                            </a>
                        `).join('')}
                    </div>
                </div>
            `;
    lucide.createIcons();
}

function updateClaButtonStates() {
    const playBtn = document.getElementById('cla-play-btn');
    const stopBtn = document.getElementById('cla-stop-btn');

    if (playBtn) {
        playBtn.disabled = CLA_STATE.isPlaying;
        playBtn.classList.toggle('opacity-50', CLA_STATE.isPlaying);
        playBtn.classList.toggle('cursor-not-allowed', CLA_STATE.isPlaying);
    }
    if (stopBtn) {
        stopBtn.disabled = !CLA_STATE.isPlaying;
        stopBtn.classList.toggle('opacity-50', !CLA_STATE.isPlaying);
        stopBtn.classList.toggle('cursor-not-allowed', !CLA_STATE.isPlaying);
    }
}

function updateClaPreviewLight(step) {
    const lightElement = document.getElementById('cla-preview-light');
    if (!lightElement) return;

    if (step === null) {
        return;
    }

    const r = Math.round(step.r);
    const g = Math.round(step.g);
    const b = Math.round(step.b);
    const a = step.a;
    const color = `rgba(${r}, ${g}, ${b}, ${a})`;

    lightElement.style.backgroundColor = color;
    lightElement.style.boxShadow = `0 0 20px ${color}`;
}

function rgbToHex(r, g, b) {
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase();
}

function hexToRgb(hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}

function formatClaSteps(steps) {
    return steps.map(step => {
        const r = Math.round(step.r);
        const g = Math.round(step.g);
        const b = Math.round(step.b);
        const a = step.a.toFixed(2).replace(/(\.\d*?)0+$/, '$1').replace(/\.$/, '');
        const ms = Math.round(step.ms);
        return `{'${r},${g},${b},${a}','${ms}'}`;
    }).join(',');
}

function parseClaSteps(input) {
    const stepRegex = /\{'(\d+),(\d+),(\d+),([\d\.]+)','(\d+)'\}/g;
    const steps = [];
    let match;

    if (input.trim().length === 0) {
        throw new Error("Input cannot be empty.");
    }

    while ((match = stepRegex.exec(input)) !== null) {
        steps.push({
            r: parseInt(match[1]),
            g: parseInt(match[2]),
            b: parseInt(match[3]),
            a: parseFloat(match[4]),
            ms: parseInt(match[5])
        });
    }

    if (steps.length === 0) {
        throw new Error("Invalid animation data format. Must be {'R,G,B,A','TIME_IN_MS'},{'R,G,B,A','TIME_IN_MS'},...");
    }
    return steps;
}

function updateClaContent() {
    const stepsContainer = document.getElementById('cla-steps-container');
    if (stepsContainer) {
        stepsContainer.innerHTML = CLA_STATE.steps.map(renderClaStep).join('');
    }

    const outputDiv = contentDiv.querySelector('.bg-gray-100.dark\\:bg-gray-400');
    if (outputDiv) {
        outputDiv.textContent = formatClaSteps(CLA_STATE.steps);
    }

    lucide.createIcons();
    updateClaButtonStates();
    if (!CLA_STATE.isPlaying) {
        updateClaPreviewLight(CLA_STATE.steps[0]);
    }
}


window.copyClaToClipboard = () => {
    const dataString = formatClaSteps(CLA_STATE.steps);
    navigator.clipboard.writeText(dataString).then(() => {
        showMessage('cla-message', 'Animation data copied to clipboard!', 'text-green-500 bg-green-100 dark:bg-green-900');
    }).catch(err => {
        showMessage('cla-message', 'Failed to copy data. Check browser permissions.', 'text-red-500 bg-red-100 dark:bg-red-900');
    });
};

window.importClaFromClipboard = async () => {
    try {
        const dataString = await navigator.clipboard.readText();
        const newSteps = parseClaSteps(dataString);

        stopClaAnimation();
        CLA_STATE.steps = newSteps;
        CLA_STATE.currentStepIndex = 0;

        renderClaPage();
        showMessage('cla-message', 'Animation data imported successfully!', 'text-green-500 bg-green-100 dark:bg-green-900');
    } catch (error) {
        showMessage('cla-message', 'Import failed: ' + error.message, 'text-red-500 bg-red-100 dark:bg-red-900');
    }
};

window.updateClaStepColor = (index, hex) => {
    const rgb = hexToRgb(hex);
    if (rgb) {
        CLA_STATE.steps[index].r = rgb.r;
        CLA_STATE.steps[index].g = rgb.g;
        CLA_STATE.steps[index].b = rgb.b;
        updateClaContent();
    }
};

window.updateClaStepRgb = (index, component, value) => {
    let val = parseInt(value);
    if (isNaN(val) || val < 0) val = 0;
    if (val > 255) val = 255;
    CLA_STATE.steps[index][component] = val;
    updateClaContent();
};

window.updateClaStepAlpha = (index, value) => {
    let alpha = parseFloat(value);
    if (isNaN(alpha) || alpha < 0) alpha = 0;
    if (alpha > 1) alpha = 1;
    CLA_STATE.steps[index].a = parseFloat(alpha.toFixed(2));
    updateClaContent();
};

window.updateClaStepOpacitySlider = (index, value) => {
    let alpha = parseInt(value) / 100;
    CLA_STATE.steps[index].a = alpha;
    updateClaContent();
};

window.updateClaStepMs = (index, value) => {
    let ms = parseInt(value);
    if (isNaN(ms) || ms < 100) ms = 100;
    CLA_STATE.steps[index].ms = ms;
    updateClaContent();
};

window.addClaStep = () => {
    CLA_STATE.steps.push(JSON.parse(JSON.stringify(DEFAULT_CLA_STEP)));
    updateClaContent();
};

window.deleteAllClaSteps = () => {
    if (confirm("Are you sure you want to delete ALL animation steps? This will reset the animation to the default single step.")) {
        stopClaAnimation();
        CLA_STATE.steps = [JSON.parse(JSON.stringify(DEFAULT_CLA_STEP))];
        CLA_STATE.currentStepIndex = 0;
        updateClaContent();
        showMessage('cla-message', 'All steps deleted. Default step restored.', 'text-yellow-500 bg-yellow-100 dark:bg-yellow-900');
    }
};


window.deleteClaStep = (index) => {
    if (CLA_STATE.steps.length > 1 && confirm("Are you sure you want to delete this animation step?")) {
        CLA_STATE.steps.splice(index, 1);
        stopClaAnimation();
        CLA_STATE.currentStepIndex = 0;
        updateClaContent();
    }
};

window.moveClaStep = (index, direction) => {
    const newIndex = index + direction;
    if (newIndex >= 0 && newIndex < CLA_STATE.steps.length) {
        const [movedStep] = CLA_STATE.steps.splice(index, 1);
        CLA_STATE.steps.splice(newIndex, 0, movedStep);
        stopClaAnimation();
        CLA_STATE.currentStepIndex = 0;

        const idxA = index;
        const idxB = newIndex;

        updateClaContent();

        [idxA, idxB].forEach(idx => {
            const el = document.getElementById(`cla-step-${idxB}`);
            if (el) {
                el.classList.add('animate-swap');
                setTimeout(() => {
                    el.classList.remove('animate-swap');
                }, 300);
            }
        });
    }
};

window.loadClaPreset = (presetName) => {
    if (CLA_PRESETS[presetName]) {
        CLA_STATE.steps = JSON.parse(JSON.stringify(CLA_PRESETS[presetName]));
        stopClaAnimation();
        CLA_STATE.currentStepIndex = 0;
        renderClaPage();
    }
};

function startClaAnimation() {
    if (CLA_STATE.isPlaying) return;
    CLA_STATE.isPlaying = true;

    const lightElement = document.getElementById('cla-preview-light');

    const runStep = () => {
        if (!CLA_STATE.isPlaying) {
            updateClaPreviewLight(CLA_STATE.steps[0]);
            updateClaButtonStates();
            return;
        }

        const step = CLA_STATE.steps[CLA_STATE.currentStepIndex];

        const r = Math.round(step.r);
        const g = Math.round(step.g);
        const b = Math.round(step.b);
        const a = step.a;
        const ms = step.ms;

        const color = `rgba(${r}, ${g}, ${b}, ${a})`;

        lightElement.style.backgroundColor = color;
        lightElement.style.boxShadow = `0 0 20px ${color}`;

        CLA_STATE.currentStepIndex = (CLA_STATE.currentStepIndex + 1) % CLA_STATE.steps.length;

        CLA_STATE.animationTimeout = setTimeout(runStep, ms);
    };

    CLA_STATE.currentStepIndex = 0;
    runStep();
    updateClaButtonStates();
}

function stopClaAnimation() {
    if (CLA_STATE.animationTimeout) {
        clearTimeout(CLA_STATE.animationTimeout);
        CLA_STATE.animationTimeout = null;
    }

    CLA_STATE.isPlaying = false;
    CLA_STATE.currentStepIndex = 0;

    if (CLA_STATE.steps.length > 0) {
        updateClaPreviewLight(CLA_STATE.steps[0]);
    } else {
        updateClaPreviewLight(DEFAULT_CLA_STEP);
    }
    updateClaButtonStates();
}

function renderClaStep(step, index) {
    const hex = rgbToHex(step.r, step.g, step.b);
    const opacity = step.a * 100;
    return `
                <div id="cla-step-${index}" class="cla-step-card panel-block p-4 mb-4 flex items-center shadow-lg flame-border">
                    <div class="flex-grow grid grid-cols-12 gap-4 items-center">
                        <div class="col-span-1 text-center font-bold text-xl text-[--color-accent]">${index + 1}</div>

                        <div class="col-span-4 flex flex-col space-y-2">
                            <div class="flex items-center space-x-3">
                                <label class="font-semibold text-sm">Color Picker:</label>
                                <input type="color" value="${hex}" 
                                       onchange="updateClaStepColor(${index}, this.value)" 
                                       class="w-8 h-8 rounded-full cursor-pointer focus:ring-2 focus:ring-[--color-accent] p-0 m-0 border-none"> 
                            </div>
                            
                            <div class="flex items-center space-x-1">
                                <label class="text-xs font-semibold">R</label>
                                <input type="number" min="0" max="255" value="${step.r}" 
                                       onchange="updateClaStepRgb(${index}, 'r', this.value)" 
                                       class="cla-step-input w-1/4 !p-1 text-center">
                                <label class="text-xs font-semibold">G</label>
                                <input type="number" min="0" max="255" value="${step.g}" 
                                       onchange="updateClaStepRgb(${index}, 'g', this.value)" 
                                       class="cla-step-input w-1/4 !p-1 text-center">
                                <label class="text-xs font-semibold">B</label>
                                <input type="number" min="0" max="255" value="${step.b}" 
                                       onchange="updateClaStepRgb(${index}, 'b', this.value)" 
                                       class="cla-step-input w-1/4 !p-1 text-center">
                            </div>
                        </div>
                        
                        <div class="col-span-3">
                            <label for="ms-${index}" class="font-semibold text-sm block mb-1">Duration (ms):</label>
                            <input id="ms-${index}" type="number" min="100" step="50" max="10000" value="${step.ms}" 
                                   onchange="updateClaStepMs(${index}, this.value)" 
                                   class="cla-step-input">
                        </div>
                        
                        <div class="col-span-3">
                            <label class="font-semibold text-sm block mb-1">Alpha (0.00 - 1.00):</label>
                            <div class="flex items-center space-x-2">
                                <input id="alpha-${index}" type="number" min="0" max="1" step="0.01" value="${step.a.toFixed(2)}" 
                                       onchange="updateClaStepAlpha(${index}, this.value)" 
                                       class="cla-step-input w-1/3 !p-1 text-center">
                                <input type="range" min="0" max="100" value="${opacity.toFixed(0)}" 
                                       oninput="updateClaStepOpacitySlider(${index}, this.value)" 
                                       class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 accent-[--color-accent]">
                            </div>
                        </div>
                        
                        <div class="col-span-1 flex flex-col items-center justify-center space-y-1">
                            <button onclick="deleteClaStep(${index})" class="text-red-500 hover:text-red-700 p-1 transition duration-150" title="Delete Step">
                                <i data-lucide="trash-2" class="w-5 h-5"></i>
                            </button>
                            <div class="flex flex-col space-y-1 mt-2">
                                ${index > 0 ? `<button onclick="moveClaStep(${index}, -1)" class="text-[--color-text-main] hover:text-[--color-accent] p-1 transition duration-150" title="Move Up"><i data-lucide="arrow-up" class="w-4 h-4"></i></button>` : ''}
                                ${index < CLA_STATE.steps.length - 1 ? `<button onclick="moveClaStep(${index}, 1)" class="text-[--color-text-main] hover:text-[--color-accent] p-1 transition duration-150" title="Move Down"><i data-lucide="arrow-down" class="w-4 h-4"></i></button>` : ''}
                            </div>
                        </div>
                    </div>
                </div>
            `;
}

function renderClaPage() {
    const presets = Object.keys(CLA_PRESETS).map(key => `
                <button onclick="loadClaPreset('${key}')" class="w-full bg-[--color-background-panel] hover:bg-[--color-border] border border-[--color-border] text-[--color-text-main] py-2 px-4 rounded-lg text-sm font-semibold transition duration-300">
                    ${key}
                </button>
            `).join('');

    contentDiv.innerHTML = `
                <div class="page-transition">
                    <h2 class="text-4xl font-extrabold text-[--color-text-main] mb-8 border-b-2 border-[--color-border] pb-2">Cozy Lights Animator</h2>
                    <p class="text-lg text-[--color-subtle] mb-8">Visually create animation steps for the Cozy Lights mod and copy the resulting string into your config file.</p>
                    
                    <div class="flex space-x-4 mb-6">
                        <button onclick="window.copyClaToClipboard()" class="flex-1 bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg shadow-md transition duration-300">
                            <i data-lucide="clipboard" class="w-5 h-5 mr-2 inline"></i>Copy to Clipboard
                        </button>
                        <button onclick="window.importClaFromClipboard()" class="flex-1 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg shadow-md transition duration-300">
                            <i data-lucide="file-input" class="w-5 h-5 mr-2 inline"></i>Import Animation
                        </button>
                    </div>
                    <div id="cla-message" class="text-center transition-opacity duration-500" style="opacity: 0;"></div>
                    
                    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                        <div class="lg:col-span-1 panel-block p-6">
                            <h3 class="text-xl font-bold mb-4 flex items-center">
                                <i data-lucide="eye" class="w-5 h-5 mr-2 text-[--color-accent]"></i> Live Preview
                            </h3>
                            <div class="light-preview-container">
                                <div id="cla-preview-light" 
                                     class="w-24 h-24 rounded-full" 
                                     style="background-color: rgba(0,0,0,0); transition: background-color 0s, box-shadow 0s; box-shadow: 0 0 20px var(--color-accent)80;">
                                </div>
                            </div>
                            
                            <div class="mt-6 flex justify-between space-x-4">
                                <button id="cla-play-btn" onclick="startClaAnimation()" class="flex-1 bg-green-500 text-white font-bold py-2 rounded-lg hover:bg-green-600 transition duration-300">
                                    <i data-lucide="play" class="w-5 h-5 mr-1 inline"></i> Play
                                </button>
                                <button id="cla-stop-btn" onclick="stopClaAnimation()" class="flex-1 bg-red-500 text-white font-bold py-2 rounded-lg hover:bg-red-600 transition duration-300">
                                    <i data-lucide="square" class="w-5 h-5 mr-1 inline"></i> Stop
                                </button>
                            </div>

                            <h4 class="text-lg font-bold mt-6 mb-4 border-t border-[--color-border] pt-4">Presets</h4>
                            <div class="flex flex-col space-y-2">
                                ${presets}
                            </div>
                        </div>

                        <div class="lg:col-span-2">
                             <h3 class="text-xl font-bold mb-4 flex items-center">
                                <i data-lucide="list-ordered" class="w-5 h-5 mr-2 text-[--color-accent]"></i> Animation Steps (${CLA_STATE.steps.length} total)
                            </h3>
                            <div id="cla-steps-scroll-container" class="max-h-[34rem] overflow-y-auto pr-2">
                                <div id="cla-steps-container">
                                    ${CLA_STATE.steps.map(renderClaStep).join('')}
                                </div>
                            </div>
                            <div class="flex space-x-4 mt-4">
                                <button onclick="addClaStep()" class="flex-1 border-2 border-dashed border-[--color-subtle] text-[--color-text-main] py-3 rounded-lg hover:bg-[--color-subtle]/30 transition duration-300 font-semibold flex items-center justify-center">
                                    <i data-lucide="plus" class="w-5 h-5 mr-2"></i> Add New Step
                                </button>
                                <button onclick="deleteAllClaSteps()" class="w-1/3 border-2 border-dashed border-red-500/50 text-red-500 py-3 rounded-lg hover:bg-red-500/10 transition duration-300 font-semibold flex items-center justify-center">
                                    <i data-lucide="trash-2" class="w-5 h-5 mr-2"></i> Delete All
                                </button>
                            </div>
                        </div>
                    </div>
                    
                    <div class="panel-block p-6 mt-6">
                        <h3 class="text-xl font-bold mb-4 flex items-center">
                            <i data-lucide="code" class="w-5 h-5 mr-2 text-[--color-accent]"></i> Animation String Output
                        </h3>
                        <div class="bg-gray-100 dark:bg-gray-500 p-4 rounded-lg font-mono text-sm break-all">
                            ${formatClaSteps(CLA_STATE.steps)}
                        </div>
                    </div>
                </div>
            `;
    lucide.createIcons();
    updateClaButtonStates();
    updateClaPreviewLight(CLA_STATE.steps[0]);
}

async function initializeApp() {
    const initialPage = window.location.hash.substring(1) || 'home';

    if (['home', 'communities', 'projects', 'tools', 'cla'].includes(initialPage)) {
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
        if (['home', 'communities', 'projects', 'tools', 'cla'].includes(page)) {
            navigate(page);
        } else {
            navigate('home');
        }
    });
};

const konamiCode = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];
let konamiCodePosition = 0;
let easterEggActivated = false;

function rickroll() {
    if (easterEggActivated) return;

    const overlay = document.getElementById('rickroll-overlay');
    const video = document.getElementById('rickroll-video');

    if (overlay && video) {
        // 1. Show the overlay
        overlay.classList.remove('konami-hidden');

        // 2. Play the video
        video.play().catch(error => {
            // Autoplay prevention is common, so we mute it and try again if play fails.
            console.warn("Autoplay blocked. Attempting to play muted.", error);
            video.muted = true;
            video.play().catch(e => {
                console.error("Failed to play video even muted. User must interact.", e);
            });
        });

        easterEggActivated = true;
    }
}

document.addEventListener('keydown', (e) => {
    if (easterEggActivated) return;
    
    // Get the required key code for the current position
    let requiredKey = konamiCode[konamiCodePosition];

    if (e.keyCode === requiredKey) {
        konamiCodePosition++;

        // If the entire sequence is entered, trigger the function
        if (konamiCodePosition === konamiCode.length) {
            rickroll();
            konamiCodePosition = 0; // Reset just in case
        }
    } else {
        // Key sequence broken, reset to the start
        konamiCodePosition = 0;
    }
});

document.addEventListener("DOMContentLoaded", async () => {
    initializeTheme();
    await fetchModData();
    await fetchGithubRepos();
    navigate(window.location.hash.replace("#", "") || "home");
    refreshDataViews();
    lucide.createIcons();

});
