const supabaseClient = supabase.createClient('https://dujpxiwctslbpcziquqr.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR1anB4aXdjdHNsYnBjemlxdXFyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA1MzkzMjIsImV4cCI6MjA4NjExNTMyMn0.FKJ3Mei_i3psMBkWbrZ11HwMuNl2h6-wEFloYGRkOnw');

const modifierDefinitions = [
    { key: 'noSprinting', label: 'No Sprinting', default: false, tooltip: "If true, you cannot sprint" },
    { key: 'noJumping', label: 'No Jumping', default: false, tooltip: "If true, you cannot jump. This should also disable ropes and chains." },
    { key: 'Itemless', label: 'Itemless', default: false, tooltip: "Can't use items except flare and 1 use of an item" },
    { key: 'alwaysHaveTick', label: 'Always Have Tick', default: false, tooltip: "You will always have a tick attached to you" },
    { key: 'noMultiplayer', label: 'No Multiplayer', default: false, tooltip: "You can only play singleplayer" },
    { key: 'noBackpack', label: 'No Backpack', default: false, tooltip: "If true, you cannot use a backpack" },
    { key: 'AllowHigherAscents', label: 'Allow Higher Ascents', default: true, tooltip: "If minAscent is 4, can they do 5, 6 and above?" },
    { key: 'DisableRopeTypes', label: 'Disable Rope, Chains & Vines', default: false, tooltip: "If true, all rope, chains and vines are disabled." },
    { key: 'allowReserveStamina', label: 'Allow Reserve Stamina', default: true, tooltip: "If false all reserve stamina is removed upon gaining it" },
    { key: 'startSkeleton', label: 'Start Skeleton', default: false, tooltip: "If true, you start the run as a skeleton." },
    { key: 'controlLockLeftAndRight_Ground', label: 'Lock Left/Right (Ground)', default: false, tooltip: "If true, you can only move left and right on the ground" },
    { key: 'controlLockForwardAndBackward_Ground', label: 'Lock Forward/Back (Ground)', default: false, tooltip: "If true, you can only move forward and backward on the ground" },
    { key: 'controlLockLeftAndRight_Climb', label: 'Lock Left/Right (Climb)', default: false, tooltip: "If true, you can only move left and right whilst climbing" },
    { key: 'controlLockForwardAndBackward_Climb', label: 'Lock Forward/Back (Climb)', default: false, tooltip: "If true, you can only move forward and backward whilst climbing" },
    { key: 'endRunOnCurse', label: 'End Run on Curse', default: false, tooltip: "If true, the run will end if you get the curse affliction" },
    { key: 'noLuggages', label: 'No Luggages', default: false, tooltip: "If true, you cannot open luggages." },
    { key: 'noAncientStatues', label: 'No Ancient Statues', default: false, tooltip: "If true, you cannot interact with ancient statues at all." },
    { key: 'noCampfireHealAndMorale', label: 'No Campfire Heal/Morale', default: false, tooltip: "If true, you cannot heal or gain morale from campfires." },
    { key: 'temporaryStatusesDecay', label: 'Temporary Statuses Decay', default: true, tooltip: "If true, statuses like cold, heat, and poison will decay normally." },
    { key: 'cannotSeeStaminaBar', label: 'Cannot see stamina bar', default: false, tooltip: "If true, you have the mushroom effect on your stamina bar where you casnnot see your stamina bar (Numbness)" },
    { key: 'alwaysNearSighted', label: 'Always Near Sighted', default: false, tooltip: "If true, you will always be near sighted. Good look finding a path being basically blind!" }
];

let cached = JSON.parse(localStorage.getItem('peak_preset_cache')) || {};
let currentChallenge = { ...getDefaultChallenge(), ...cached };

if (!currentChallenge.requiredBadges) currentChallenge.requiredBadges = [];
if (!currentChallenge.disallowedItems) currentChallenge.disallowedItems = [];
if (!currentChallenge.oneTimeUseItems) currentChallenge.oneTimeUseItems = [];
if (!currentChallenge.allowedItemsOnly) currentChallenge.allowedItemsOnly = [];

let badgeData = {};
let itemsData = {};

const manualImageOverrides = {
    "ANTI-ROPE SPOOL": "https://peak.wiki.gg/images/thumb/Anti-Rope_Spool.png/64px-Anti-Rope_Spool.png?ae4d5d",
    "THE BOOK OF BONES": "https://peak.wiki.gg/images/thumb/The_Book_of_Bones.png/64px-The_Book_of_Bones.png?90f081",
    "BUGLE OF FRIENDSHIP": "https://peak.wiki.gg/images/thumb/Bugle_of_Friendship.png/64px-Bugle_of_Friendship.png?ae33da",
    "CURE-ALL": "https://peak.wiki.gg/images/thumb/Cure-All.png/64px-Cure-All.png?de867e",
    "GREEN CLUSTERBERRY": "https://peak.wiki.gg/images/thumb/Clusterberry_Green.png/64px-Clusterberry_Green.png?b366c0",
    "BERRYNANA PEEL": "https://peak.wiki.gg/images/thumb/Yellow_Berrynana_Peel.png/192px-Yellow_Berrynana_Peel.png?512b95",
    "BISHOP": "https://peak.wiki.gg/images/thumb/Bishop_Black.png/64px-Bishop_Black.png?9a2fe4",
    "KING": "https://peak.wiki.gg/images/thumb/King_Black.png/64px-King_Black.png?cd0105",
    "KNIGHT": "https://peak.wiki.gg/images/thumb/Knight_Black.png/64px-Knight_Black.png?8c2f00",
    "PAWN": "https://peak.wiki.gg/images/thumb/Pawn_Black.png/64px-Pawn_Black.png?8c2f00",
    "QUEEN": "https://peak.wiki.gg/images/thumb/Queen_Black.png/64px-Queen_Black.png?8c2f00",
    "ROOK": "https://peak.wiki.gg/images/thumb/Rook_Black.png/64px-Rook_Black.png?8c2f00",
    "BIRD": "https://peak.wiki.gg/images/thumb/Cooked_Bird.png/192px-Cooked_Bird.png?ea44a3",
    "STICK": "https://peak.wiki.gg/images/thumb/FireWood.png/64px-FireWood.png?852c2e",
    "TORN PAGE": "https://peak.wiki.gg/images/thumb/Scroll.png/192px-Scroll.png?6a5530",
    "COCONUT HALF": "https://peak.wiki.gg/images/thumb/Half-Coconut.png/192px-Half-Coconut.png?ff191b",
    "ANTI-ROPE CANNON": "https://peak.wiki.gg/images/thumb/Anti-Rope_Cannon.png/192px-Anti-Rope_Cannon.png?1fa9f9",
};

function getDefaultChallenge() {
    let base = {
        Name: "", 
        Creators: "", 
        Notes: "", 
        MinAscent: -1, 
        minimumPlayers: 1,
        disallowedItems: [], 
        oneTimeUseItems: [], 
        allowedItemsOnly: [], 
        requiredBadges: []
    };
    modifierDefinitions.forEach(mod => base[mod.key] = mod.default);
    return base;
}

function savePresetCache() {
    localStorage.setItem('peak_preset_cache', JSON.stringify(currentChallenge));
}

function createTooltip(text) {
    return `
        <span class="relative inline-flex items-center ml-2">
            <i data-lucide="help-circle" 
               class="w-4 h-4 text-[--color-subtle] cursor-help peer"></i>
            <div class="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-xs rounded-lg shadow-xl 
                        opacity-0 pointer-events-none peer-hover:opacity-100 transition-opacity duration-200 w-48 z-50 text-center font-normal">
                ${text}
                <div class="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-4 border-transparent border-t-gray-900"></div>
            </div>
        </span>
    `;
}

function getWikiIcon(itemName) {
    if (manualImageOverrides[itemName.toUpperCase()]) {
        return `https://images.weserv.nl/?url=${encodeURIComponent(manualImageOverrides[itemName.toUpperCase()])}&default=https://lucide.dev/api/icons/package`;
    }
    const formatted = itemName.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join('_');
    const wikiUrl = `https://peak.wiki.gg/images/thumb/${formatted}.png/64px-${formatted}.png`;
    return `https://images.weserv.nl/?url=${encodeURIComponent(wikiUrl)}&default=https://lucide.dev/api/icons/x`;
}

function getMinimalConfig(config) {
    const defaults = getDefaultChallenge();
    const minimal = {};

    Object.keys(config).forEach(key => {
        const val = config[key];
        const def = defaults[key];

        if (Array.isArray(val)) {
            if (val.length > 0) {
                minimal[key] = val;
            }
        } 
        else if (typeof val === 'string') {
            if (val.trim() !== "" && val !== def) {
                minimal[key] = val;
            }
        }
        else if (val !== def) {
            minimal[key] = val;
        }
    });

    return minimal;
}

function updatePresetField(field, value) {
    currentChallenge[field] = value;
    savePresetCache();
    updatePresetOutput();
}

function toggleBadge(badgeId) {
    const index = currentChallenge.requiredBadges.indexOf(badgeId);
    if (index > -1) {
        currentChallenge.requiredBadges.splice(index, 1);
    } else {
        currentChallenge.requiredBadges.push(badgeId);
    }
    savePresetCache();
    updatePresetOutput();
    filterBadges(document.getElementById('badge-search')?.value || "");
}

function toggleItemInList(itemIds, listKey) {
    const ids = Array.isArray(itemIds) ? itemIds : [itemIds];
    const firstId = ids[0];
    const index = currentChallenge[listKey].indexOf(firstId);

    if (index > -1) {
        currentChallenge[listKey] = currentChallenge[listKey].filter(id => !ids.includes(id));
    } else {
        currentChallenge[listKey] = [...currentChallenge[listKey], ...ids];
        
        if (listKey === 'allowedItemsOnly') {
            currentChallenge.disallowedItems = currentChallenge.disallowedItems.filter(id => !ids.includes(id));
        } else if (listKey === 'disallowedItems') {
            currentChallenge.allowedItemsOnly = currentChallenge.allowedItemsOnly.filter(id => !ids.includes(id));
        }
    }
    savePresetCache();
    updatePresetOutput();
    updateItemCardUI(firstId);
}

function updateItemCardUI(id) {
    const card = document.querySelector(`.preset-item-card[data-id="${id}"]`);
    if (!card) return;

    const isBlack = currentChallenge.disallowedItems.includes(id);
    const isWhite = currentChallenge.allowedItemsOnly.includes(id);
    const isOneTime = currentChallenge.oneTimeUseItems.includes(id);

    const setBtnState = (btn, isActive, activeClass) => {
        if (isActive) {
            btn.classList.add(activeClass, 'text-white');
            btn.classList.remove('border-[--color-border]');
        } else {
            btn.classList.remove(activeClass, 'text-white');
            btn.classList.add('border-[--color-border]');
        }
    };

    const buttons = card.querySelectorAll('button');
    setBtnState(buttons[0], isBlack, 'bg-red-500');
    setBtnState(buttons[1], isWhite, 'bg-green-500');
    setBtnState(buttons[2], isOneTime, 'bg-blue-500');
}

function filterListItems(listKey) {
    const items = document.querySelectorAll('.preset-item-card');
    const targetIds = currentChallenge[listKey] || [];

    items.forEach(item => {
        const itemId = parseInt(item.getAttribute('data-id'));
        if (targetIds.includes(itemId)) {
            item.style.display = 'flex';
        } else {
            item.style.display = 'none';
        }
    });
}

function resetItemFilter() {
    const items = document.querySelectorAll('.preset-item-card');
    items.forEach(item => item.style.display = 'flex');
}

function filterItems(searchTerm) {
    const items = document.querySelectorAll('.preset-item-card');
    const term = searchTerm.toLowerCase();

    items.forEach(item => {
        const name = item.getAttribute('data-name').toLowerCase();
        if (name.includes(term)) {
            item.style.display = 'flex';
        } else {
            item.style.display = 'none';
        }
    });
}

function filterBadges(searchTerm) {
    const container = document.getElementById('badge-selection-container');
    if (container) {
        container.innerHTML = renderBadgeSelection(searchTerm);
        lucide.createIcons();
    }
}

function renderBadgeSelection(searchTerm = "") {
    const badgesHTML = Object.entries(badgeData)
        .filter(([name]) => name.toLowerCase().includes(searchTerm.toLowerCase()))
        .map(([name, id]) => {
            const isSelected = currentChallenge.requiredBadges.includes(id);
            return `
                <div class="flex items-center gap-3 p-2 hover:bg-[--color-background-panel] rounded cursor-pointer ${isSelected ? 'bg-green-500/10' : ''}" 
                     onclick="toggleBadge(${id})">
                    <div class="w-8 h-8 bg-gradient-to-br from-amber-500 to-yellow-700 rounded-lg flex items-center justify-center">
                        <i data-lucide="award" class="w-4 h-4 text-white"></i>
                    </div>
                    <span class="text-sm font-medium flex-1">${name}</span>
                    <input type="checkbox" ${isSelected ? 'checked' : ''} class="w-4 h-4 accent-[--color-accent]">
                </div>
            `;
        }).join('');
    
    return badgesHTML || `<p class="text-[10px] text-center w-full py-4 text-[--color-subtle]">No badges found...</p>`;
}

function renderModifierCheckboxes() {
    return modifierDefinitions.map(mod => `
        <div class="flex items-center justify-between py-2 border-b border-[--color-border]/30">
            <div class="flex items-center">
                <span class="text-sm font-medium text-[--color-text-main]">${mod.label}</span>
                ${createTooltip(mod.tooltip)}
            </div>
            <input type="checkbox" ${currentChallenge[mod.key] ? 'checked' : ''} 
                   onchange="updatePresetField('${mod.key}', this.checked)" 
                   class="w-4 h-4 accent-[--color-accent] cursor-pointer">
        </div>
    `).join('');
}

function updatePresetOutput() {
    const output = document.getElementById('preset-json-output');
    if (output) {
        const minimal = getMinimalConfig(currentChallenge);
        output.textContent = JSON.stringify(minimal, null, 2);
    }
}

function copyPresetsToClipboard() {
    const jsonString = JSON.stringify(getMinimalConfig(currentChallenge), null, 2);

    const textArea = document.createElement("textarea");
    textArea.value = jsonString;
    document.body.appendChild(textArea);
    textArea.select();
    
    try {
        document.execCommand('copy');
        const btn = event.target;
        btn.innerText = "✓ Copied!";
        setTimeout(() => btn.innerText = "Copy Final Config", 2000);
    } catch (err) {
        alert("Manual copy required: Check console.");
        console.log(jsonString);
    }
    
    document.body.removeChild(textArea);
}

function clearPresetConfig() {
    if (confirm("Are you sure you want to clear ALL configuration?")) {
        currentChallenge = getDefaultChallenge();
        savePresetCache();
        renderPeakPresetsPage();
    }
}

async function exportAsShortcode() {
    const jsonConfig = getMinimalConfig(currentChallenge);
    
    const btn = document.getElementById('shortcode-btn');
    const resultDiv = document.getElementById('shortcode-result');
    const display = document.getElementById('shortcode-display');

    if(jsonConfig.Name.trim() === "" || jsonConfig.Creators.trim() === "") {
        alert("Please provide a name/or creators for your challenge.");
        return;
    }
    
    if(btn) btn.innerText = "Generating...";

    try {
        const msgUint8 = new TextEncoder().encode(JSON.stringify(jsonConfig));
        const hashBuffer = await crypto.subtle.digest('SHA-256', msgUint8);
        const hashHex = Array.from(new Uint8Array(hashBuffer)).map(b => b.toString(16).padStart(2, '0')).join('');

        const { data: existing } = await supabaseClient
            .from('challenges')
            .select('id')
            .eq('content_hash', hashHex)
            .single();

        let finalId = "";

        if (existing) {
            finalId = existing.id;
        } else {
            const shortId = Math.random().toString(36).substring(2, 8).toUpperCase();
            const { error } = await supabaseClient
                .from('challenges')
                .insert([{ id: shortId, config: jsonConfig, content_hash: hashHex }]);
            
            if (error) throw error;
            finalId = shortId;
        }

        const fullCode = "CHALLENGE_" + finalId;
        
        if (resultDiv && display) {
            resultDiv.classList.remove('hidden');
            display.innerText = fullCode;
        } else {
            alert("Your code is: " + fullCode);
        }

        if(btn) btn.innerText = "Get Shortcode";
        
        navigator.clipboard.writeText(fullCode);

    } catch (e) {
        console.error("Shortener Error:", e);
        alert("Failed to generate code. Plesae give your JSON to @atomictyler on discord.");
        if(btn) btn.innerText = "Get Shortcode";
    }
}

async function importConfig() {
    const area = document.getElementById('import-json-area');
    const input = area.value.trim();

    if (!input) {
        alert("Please paste a JSON configuration or a Challenge Code.");
        return;
    }

    if (input.startsWith("CHALLENGE_")) {
        const shortId = input.replace("CHALLENGE_", "").toUpperCase();
        
        area.placeholder = "Fetching challenge...";
        area.value = "";

        try {
            const { data, error } = await supabaseClient
                .from('challenges')
                .select('config')
                .eq('id', shortId)
                .single();

            if (error || !data) throw new Error("Challenge not found.");

            applyImportedConfig(data.config);
            alert(`Challenge '${data.config.Name}' loaded via code!`);
        } catch (e) {
            alert("Error: " + e.message);
            area.placeholder = "Paste JSON or CHALLENGE_CODE here...";
        }
        return;
    }

    try {
        const imported = JSON.parse(input);
        applyImportedConfig(imported);
        area.value = "";
        alert("JSON configuration loaded successfully!");
    } catch (e) {
        console.error("Import Error:", e);
        alert("Invalid format. Please paste a valid JSON or a CHALLENGE_ code.");
    }
}

function applyImportedConfig(configData) {
    currentChallenge = { ...getDefaultChallenge(), ...configData };
    savePresetCache();
    renderPeakPresetsPage();
}

async function renderPeakPresetsPage() {
    try {
        const [itemsRes, badgesRes] = await Promise.all([
            fetch('https://gist.githubusercontent.com/AtomicTyler1/913a40238b453d557cb1073fd4c05a83/raw/0802ccd517ba8a052631ea7ba0fd14d876edf48b/peak_list.json'),
            fetch('https://gist.githubusercontent.com/AtomicTyler1/913a40238b453d557cb1073fd4c05a83/raw/f5769a75669aa3cfd8492744e105be97b07a1e5c/peak_list_badges.json')
        ]);
        itemsData = await itemsRes.json();
        badgeData = await badgesRes.json();

        contentDiv.innerHTML = `
        <div class="page-transition flex flex-col lg:flex-row gap-8">
            <div class="lg:w-1/3">
                <div class="panel-block p-8 sticky top-8 flex flex-col min-h-[85vh] border-l-4 border-[--color-accent]">
                    <div class="text-center mb-8">
                        <div class="w-20 h-20 bg-gradient-to-br from-amber-400 to-orange-600 rounded-3xl mx-auto flex items-center justify-center mb-4 shadow-xl">
                            <i data-lucide="cog" class="w-10 h-10 text-white"></i>
                        </div>
                        <h3 class="text-2xl font-bold">Challenge Creator</h3>
                        <p class="text-xs text-[--color-subtle] uppercase tracking-widest mt-1">Config Editor</p>
                    </div>

                    <div class="space-y-4 flex-grow overflow-y-auto custom-scrollbar pr-2">
                        <div class="p-3 bg-[--color-background-panel] rounded-lg border border-[--color-border]">
                            <h4 class="font-bold text-green-500 text-xs uppercase mb-1">White (Whitelist)</h4>
                            <button onclick="filterListItems('allowedItemsOnly')" class="w-full mt-2 text-[8px] bg-green-500/20 text-green-500 py-1 rounded font-bold hover:bg-green-500/30 transition">Show Whitelisted</button>
                        </div>
                        <div class="p-3 bg-[--color-background-panel] rounded-lg border border-[--color-border]">
                            <h4 class="font-bold text-red-500 text-xs uppercase mb-1">Black (Blacklist)</h4>
                            <button onclick="filterListItems('disallowedItems')" class="w-full mt-2 text-[8px] bg-red-500/20 text-red-500 py-1 rounded font-bold hover:bg-red-500/30 transition">Show Blacklisted</button>
                        </div>
                        <div class="p-3 bg-[--color-background-panel] rounded-lg border border-[--color-border]">
                            <h4 class="font-bold text-blue-500 text-xs uppercase mb-1">1-Use (One Time)</h4>
                            <button onclick="filterListItems('oneTimeUseItems')" class="w-full mt-2 text-[8px] bg-blue-500/20 text-blue-500 py-1 rounded font-bold hover:bg-blue-500/30 transition">Show 1-Use</button>
                        </div>
                        <button onclick="resetItemFilter()" class="w-full text-[8px] bg-[--color-border] py-2 rounded font-bold hover:bg-[--color-accent] hover:text-white transition">Show All Items</button>
                        
                        <div class="border-t border-[--color-border] pt-4">
                            <textarea id="import-json-area" placeholder="Paste JSON or CODE here..." class="cla-step-input h-24 text-[10px] py-2"></textarea>
                            <button onclick="importConfig()" class="w-full mt-2 text-xs bg-[--color-border] py-2 rounded font-bold hover:bg-[--color-accent] hover:text-white transition">Load Config</button>
                            <button onclick="clearPresetConfig()" class="w-full mt-2 text-xs bg-red-500/20 text-red-500 py-2 rounded font-bold hover:bg-red-500/30 transition">Clear All</button>
                        </div>
                    </div>

                    <div class="pt-6 border-t border-[--color-border] space-y-3">
                        <button onclick="copyPresetsToClipboard()" class="w-full bg-[--color-border] text-[--color-text-main] font-bold py-3 rounded-xl hover:bg-[--color-accent] hover:text-white transition">
                            <i data-lucide="copy" class="w-4 h-4 inline mr-2"></i> Copy Full JSON
                        </button>
                        
                        <button id="shortcode-btn" onclick="exportAsShortcode()" class="w-full bg-[--color-accent] text-white font-bold py-4 rounded-xl shadow-lg hover:scale-[1.02] transition">
                            <i data-lucide="share-2" class="w-4 h-4 inline mr-2"></i> Get Shortcode
                        </button>
                        
                        <div id="shortcode-result" class="hidden animate-pulse text-center p-3 bg-green-500/10 border border-green-500/50 rounded-lg">
                            <span class="text-[10px] uppercase text-green-500 font-bold block">Challenge Code</span>
                            <code id="shortcode-display" class="text-lg font-black text-white">-------</code>
                        </div>
                    </div>
                </div>
            </div>

            <div class="lg:w-2/3 space-y-6 pb-20">
                <details open class="panel-block group">
                    <summary class="p-5 cursor-pointer font-bold text-lg flex items-center list-none select-none">
                        <i data-lucide="edit-3" class="w-5 h-5 mr-3 text-[--color-accent]"></i> Details
                        <i data-lucide="chevron-down" class="ml-auto w-4 h-4 transition-transform group-open:rotate-180"></i>
                    </summary>
                    <div class="px-6 pb-6 pt-2 grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input type="text" placeholder="Challenge Name" class="cla-step-input" value="${currentChallenge.Name}" oninput="updatePresetField('Name', this.value)">
                        <input type="text" placeholder="Creators" class="cla-step-input" value="${currentChallenge.Creators}" oninput="updatePresetField('Creators', this.value)">
                        <textarea placeholder="Notes..." class="md:col-span-2 cla-step-input h-20 py-2" oninput="updatePresetField('Notes', this.value)">${currentChallenge.Notes}</textarea>
                    </div>
                </details>

                <details class="panel-block group">
                    <summary class="p-5 cursor-pointer font-bold text-lg flex items-center list-none select-none">
                        <i data-lucide="zap" class="w-5 h-5 mr-3 text-[--color-accent]"></i> Modifiers
                        <i data-lucide="chevron-down" class="ml-auto w-4 h-4 transition-transform group-open:rotate-180"></i>
                    </summary>
                    <div class="px-6 pb-6 pt-2">
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-1 mb-6">
                            ${renderModifierCheckboxes()}
                        </div>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 border-t border-[--color-border] pt-4">
                            <div>
                                <label class="text-[10px] font-bold uppercase text-[--color-subtle]">Min Ascent (-1 = Tenderfoot)</label>
                                <input type="number" class="cla-step-input" value="${currentChallenge.MinAscent}" oninput="updatePresetField('MinAscent', parseInt(this.value))">
                            </div>
                            <div>
                                <label class="text-[10px] font-bold uppercase text-[--color-subtle]">Minimum Players</label>
                                <input type="number" class="cla-step-input" value="${currentChallenge.minimumPlayers}" oninput="updatePresetField('minimumPlayers', parseInt(this.value))">
                            </div>
                        </div>
                    </div>
                </details>

                <details class="panel-block group">
                    <summary class="p-5 cursor-pointer font-bold text-lg flex items-center list-none select-none">
                        <i data-lucide="award" class="w-5 h-5 mr-3 text-[--color-accent]"></i> Required Badges
                        <i data-lucide="chevron-down" class="ml-auto w-4 h-4 transition-transform group-open:rotate-180"></i>
                    </summary>
                    <div class="px-6 pb-6 pt-2">
                        <input type="text" id="badge-search" placeholder="Search badges..." class="cla-step-input w-full mb-4 px-4 text-xs" oninput="filterBadges(this.value)">
                        <div id="badge-selection-container" class="grid grid-cols-1 md:grid-cols-2 gap-2 max-h-64 overflow-y-auto custom-scrollbar p-2">
                            ${renderBadgeSelection()}
                        </div>
                    </div>
                </details>

                <details open class="panel-block group">
                    <summary class="p-5 cursor-pointer font-bold text-lg flex items-center list-none select-none">
                        <i data-lucide="package" class="w-5 h-5 mr-3 text-[--color-accent]"></i> Item Database
                        <i data-lucide="chevron-down" class="ml-auto w-4 h-4 transition-transform group-open:rotate-180"></i>
                    </summary>
                    <div class="px-6 pb-6 pt-2">
                        <input type="text" placeholder="Search items..." class="cla-step-input w-full mb-4 px-4" oninput="filterItems(this.value)">
                        <div id="items-container" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 max-h-96 overflow-y-auto pr-2 custom-scrollbar">
                            ${Object.entries(itemsData).map(([name, ids]) => {
                                const isBlacklisted = currentChallenge.disallowedItems.includes(ids[0]);
                                const isWhitelisted = currentChallenge.allowedItemsOnly.includes(ids[0]);
                                const isOneTime = currentChallenge.oneTimeUseItems.includes(ids[0]);
                                return `
                                <div class="preset-item-card border border-[--color-border] rounded-xl p-3 flex flex-col gap-2" data-name="${name}" data-id="${ids[0]}">
                                    <div class="flex items-center gap-3">
                                        <img src="${getWikiIcon(name)}" class="w-8 h-8 object-contain">
                                        <span class="text-[10px] font-black uppercase flex-1 leading-tight">${name}</span>
                                    </div>
                                    <div class="flex gap-1">
                                        <button onclick="toggleItemInList([${ids}], 'disallowedItems')" class="flex-1 text-[8px] p-1 rounded font-bold border ${isBlacklisted ? 'bg-red-500 text-white border-red-500' : 'border-[--color-border]'}">Black</button>
                                        <button onclick="toggleItemInList([${ids}], 'allowedItemsOnly')" class="flex-1 text-[8px] p-1 rounded font-bold border ${isWhitelisted ? 'bg-green-500 text-white border-green-500' : 'border-[--color-border]'}">White</button>
                                        <button onclick="toggleItemInList([${ids}], 'oneTimeUseItems')" class="flex-1 text-[8px] p-1 rounded font-bold border ${isOneTime ? 'bg-blue-500 text-white border-blue-500' : 'border-[--color-border]'}">1-Use</button>
                                    </div>
                                </div>`;
                            }).join('')}
                        </div>
                    </div>
                </details>

                <pre id="preset-json-output" class="panel-block p-6 text-[10px] font-mono text-amber-200 overflow-x-auto whitespace-pre-wrap">${JSON.stringify(getMinimalConfig(currentChallenge), null, 2)}</pre>
            </div>
        </div>
        `;
        lucide.createIcons();
    } catch (error) {
        console.error("Failed to load data:", error);
    }
}