function renderLevelingPage() {
    contentDiv.innerHTML = `
    <div class="page-transition">
        <h2 class="text-4xl font-extrabold text-[--color-text-main] mb-8 border-b-2 border-[--color-border] pb-2">Leveling XP Calculator</h2>
        <p class="text-lg text-[--color-subtle] mb-8">Calculate the exact XP needed to reach your target level with the Leveling mod.</p>
        
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div class="lg:col-span-1 panel-block p-6 flex flex-col">
                <div class="flex flex-col items-center mb-6">
                    <img src="https://gcdn.thunderstore.io/live/repository/icons/AtomicStudio-Leveling-0.2.0.png.128x128_q95.png" class="w-32 h-32 rounded-2xl shadow-xl mb-4" alt="Leveling Mod Icon">
                    <h3 class="text-2xl font-extrabold text-[--color-accent] text-center mb-2">Leveling</h3>
                    <p class="text-sm text-[--color-subtle] text-center font-semibold">by AtomicStudio</p>
                    <span class="text-xs text-[--color-text-main] bg-[--color-subtle]/20 px-3 py-1 rounded-full mt-2">v0.2.0</span>
                </div>
                
                <div class="flex-grow space-y-4 mb-6">
                    <div class="border-t border-[--color-border] pt-4">
                        <h4 class="text-sm font-bold text-[--color-text-main] mb-2 flex items-center">
                            <i data-lucide="info" class="w-4 h-4 mr-2 text-[--color-accent]"></i>
                            About This Mod
                        </h4>
                        <p class="text-sm text-[--color-subtle] leading-relaxed">
                            The Leveling mod adds a progressive XP and leveling system to PEAK. Gain experience through gameplay and unlock new levels!
                        </p>
                    </div>
                    
                    <div class="border-t border-[--color-border] pt-4">
                        <h4 class="text-sm font-bold text-[--color-text-main] mb-3 flex items-center">
                            <i data-lucide="calculator" class="w-4 h-4 mr-2 text-[--color-accent]"></i>
                            XP Formula
                        </h4>
                        <div class="bg-[--color-primary-bg] p-3 rounded-lg font-mono text-xs text-[--color-text-main] border border-[--color-border]">
                            XP per level = Level × 100
                        </div>
                        <div class="bg-[--color-primary-bg] p-3 rounded-lg font-mono text-xs text-[--color-text-main] border border-[--color-border]">
                            Total XP = 50×(T²−T−S²+S)
                        </div>
                        <p class="text-xs text-[--color-subtle] mt-2 italic">
                            This formula calculates total XP required from starting level S to target level T.
                        </p>
                    </div>
                </div>
                
                <a href="https://thunderstore.io/c/peak/p/AtomicStudio/Leveling/" target="_blank" class="w-full bg-[--color-accent] text-white font-bold py-3 rounded-lg shadow-lg hover:opacity-90 transition duration-300 flex items-center justify-center">
                    <i data-lucide="external-link" class="w-5 h-5 mr-2"></i>
                    View on Thunderstore
                </a>
            </div>

            <div class="lg:col-span-2 space-y-6">
                <div class="panel-block p-6">
                    <h3 class="text-xl font-bold mb-6 flex items-center">
                        <i data-lucide="target" class="w-5 h-5 mr-2 text-[--color-accent]"></i>
                        Calculate XP Requirements
                    </h3>
                    
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                        <div>
                            <label class="block text-sm font-semibold text-[--color-text-main] mb-2">
                                <i data-lucide="arrow-up-from-line" class="w-4 h-4 inline mr-1 text-[--color-accent]"></i>
                                Start Level
                            </label>
                            <input id="leveling-start" type="number" min="0" placeholder="0" class="cla-step-input text-xl font-bold">
                        </div>
                        
                        <div>
                            <label class="block text-sm font-semibold text-[--color-text-main] mb-2">
                                <i data-lucide="flag" class="w-4 h-4 inline mr-1 text-[--color-accent]"></i>
                                Target Level
                            </label>
                            <input id="leveling-end" type="number" min="1" placeholder="10" class="cla-step-input text-xl font-bold">
                        </div>
                        
                        <div>
                            <label class="block text-sm font-semibold text-[--color-text-main] mb-2">
                                <i data-lucide="zap" class="w-4 h-4 inline mr-1 text-[--color-accent]"></i>
                                Current XP
                            </label>
                            <input id="leveling-xp" type="number" min="0" placeholder="0" class="cla-step-input text-xl font-bold">
                        </div>
                    </div>

                    <div class="flex justify-center">
                        <button onclick="updateLevelingXP()" class="px-8 py-3 rounded-full font-bold text-lg bg-[--color-accent] text-white shadow-lg hover:scale-105 transition duration-300 flex items-center">
                            <i data-lucide="calculator" class="w-5 h-5 mr-2"></i>
                            Calculate XP
                        </button>
                    </div>
                </div>

                <div class="panel-block p-6">
                    <h3 class="text-xl font-bold mb-4 flex items-center">
                        <i data-lucide="trophy" class="w-5 h-5 mr-2 text-[--color-accent]"></i>
                        Results
                    </h3>
                    <div id="leveling-result" class="text-center py-12 text-2xl font-extrabold text-[--color-subtle] opacity-0 transition-opacity duration-300">
                        Enter values above
                    </div>
                </div>
                
                <div class="panel-block p-6 bg-gradient-to-br from-[--color-subtle]/10 to-transparent">
                    <h3 class="text-lg font-bold mb-3 flex items-center">
                        <i data-lucide="lightbulb" class="w-5 h-5 mr-2 text-[--color-accent]"></i>
                        Quick Tips
                    </h3>
                    <ul class="space-y-2 text-sm text-[--color-text-main]">
                        <li class="flex items-start">
                            <i data-lucide="check" class="w-4 h-4 mr-2 mt-0.5 text-green-500 flex-shrink-0"></i>
                            <span>Each level requires progressively more XP (Level × 100)</span>
                        </li>
                        <li class="flex items-start">
                            <i data-lucide="check" class="w-4 h-4 mr-2 mt-0.5 text-green-500 flex-shrink-0"></i>
                            <span>Current XP is subtracted from the total requirement</span>
                        </li>
                        <li class="flex items-start">
                            <i data-lucide="check" class="w-4 h-4 mr-2 mt-0.5 text-green-500 flex-shrink-0"></i>
                            <span>Use this tool to plan your progression goals!</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
    `;
    lucide.createIcons();
}

function calculateXP(startLevel, endLevel, currentXP = 0.0) {
    let totalXP = 0;
    for (let level = startLevel; level < endLevel; level++) {
        totalXP += level * 100;
    }
    return totalXP - currentXP;
}

function updateLevelingXP() {
    const start = parseInt(document.getElementById("leveling-start").value) || 0;
    const end = parseInt(document.getElementById("leveling-end").value) || 0;
    const currentXP = parseInt(document.getElementById("leveling-xp").value) || 0;
    const result = document.getElementById("leveling-result");

    if (isNaN(start) || isNaN(end) || end <= start) {
        result.textContent = "Please enter a valid target level higher than start level.";
        result.classList.remove("opacity-0");
        return;
    }

    const xpNeeded = calculateXP(start, end, currentXP);
    result.textContent = `Experience Needed: ${xpNeeded.toLocaleString()}`;
    result.classList.remove("opacity-0");
}