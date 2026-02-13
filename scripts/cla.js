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

    if (step === null) return;

    const r = Math.round(step.r);
    const g = Math.round(step.g);
    const b = Math.round(step.b);
    const a = step.a;
    const color = `rgba(${r}, ${g}, ${b}, ${a})`;

    lightElement.style.backgroundColor = color;
    lightElement.style.boxShadow = `0 0 20px ${color}`;
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

function updateClaStepColor(index, hex) {
    const rgb = hexToRgb(hex);
    if (rgb) {
        CLA_STATE.steps[index].r = rgb.r;
        CLA_STATE.steps[index].g = rgb.g;
        CLA_STATE.steps[index].b = rgb.b;
        updateClaContent();
    }
}

function updateClaStepRgb(index, component, value) {
    let val = parseInt(value);
    if (isNaN(val) || val < 0) val = 0;
    if (val > 255) val = 255;
    CLA_STATE.steps[index][component] = val;
    updateClaContent();
}

function updateClaStepAlpha(index, value) {
    let alpha = parseFloat(value);
    if (isNaN(alpha) || alpha < 0) alpha = 0;
    if (alpha > 1) alpha = 1;
    CLA_STATE.steps[index].a = parseFloat(alpha.toFixed(2));
    updateClaContent();
}

function updateClaStepOpacitySlider(index, value) {
    let alpha = parseInt(value) / 100;
    CLA_STATE.steps[index].a = alpha;
    updateClaContent();
}

function updateClaStepMs(index, value) {
    let ms = parseInt(value);
    if (isNaN(ms) || ms < 100) ms = 100;
    CLA_STATE.steps[index].ms = ms;
    updateClaContent();
}

function updateClaContent() {
    const stepsContainer = document.getElementById('cla-steps-container');
    if (stepsContainer) {
        stepsContainer.innerHTML = CLA_STATE.steps.map(renderClaStep).join('');
    }

    const outputDiv = contentDiv.querySelector('.bg-gray-100.dark\\:bg-gray-500');
    if (outputDiv) {
        outputDiv.textContent = formatClaSteps(CLA_STATE.steps);
    }

    lucide.createIcons();
    updateClaButtonStates();
    if (!CLA_STATE.isPlaying) {
        updateClaPreviewLight(CLA_STATE.steps[0]);
    }
}

function addClaStep() {
    CLA_STATE.steps.push(JSON.parse(JSON.stringify(DEFAULT_CLA_STEP)));
    updateClaContent();
}

function deleteClaStep(index) {
    if (CLA_STATE.steps.length > 1 && confirm("Are you sure you want to delete this animation step?")) {
        CLA_STATE.steps.splice(index, 1);
        stopClaAnimation();
        CLA_STATE.currentStepIndex = 0;
        updateClaContent();
    }
}

function deleteAllClaSteps() {
    if (confirm("Are you sure you want to delete ALL animation steps? This will reset the animation to the default single step.")) {
        stopClaAnimation();
        CLA_STATE.steps = [JSON.parse(JSON.stringify(DEFAULT_CLA_STEP))];
        CLA_STATE.currentStepIndex = 0;
        updateClaContent();
        showMessage('cla-message', 'All steps deleted. Default step restored.', 'text-yellow-500 bg-yellow-100 dark:bg-yellow-900');
    }
}

function moveClaStep(index, direction) {
    const newIndex = index + direction;
    if (newIndex >= 0 && newIndex < CLA_STATE.steps.length) {
        const [movedStep] = CLA_STATE.steps.splice(index, 1);
        CLA_STATE.steps.splice(newIndex, 0, movedStep);
        stopClaAnimation();
        CLA_STATE.currentStepIndex = 0;

        updateClaContent();

        [index, newIndex].forEach(idx => {
            const el = document.getElementById(`cla-step-${idx}`);
            if (el) {
                el.classList.add('animate-swap');
                setTimeout(() => {
                    el.classList.remove('animate-swap');
                }, 300);
            }
        });
    }
}

function loadClaPreset(presetName) {
    if (CLA_PRESETS[presetName]) {
        CLA_STATE.steps = JSON.parse(JSON.stringify(CLA_PRESETS[presetName]));
        stopClaAnimation();
        CLA_STATE.currentStepIndex = 0;
        renderClaPage();
    }
}

function copyClaToClipboard() {
    const dataString = formatClaSteps(CLA_STATE.steps);
    navigator.clipboard.writeText(dataString).then(() => {
        showMessage('cla-message', 'Animation data copied to clipboard!', 'text-green-500 bg-green-100 dark:bg-green-900');
    }).catch(err => {
        showMessage('cla-message', 'Failed to copy data. Check browser permissions.', 'text-red-500 bg-red-100 dark:bg-red-900');
    });
}

async function importClaFromClipboard() {
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
}