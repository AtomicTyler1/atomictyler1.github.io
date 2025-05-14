let activeColorPreview = null;
let activeStepWrapper = null;
let animationStepsContainer = null;

document.addEventListener("DOMContentLoaded", function() {
    console.log("DOM loaded");
    
    animationStepsContainer = document.getElementById("animation-steps");
    
    setupColorPickerEvents();
    
    updateOutput();
});

function setupColorPickerEvents() {
    const colorPicker = document.getElementById("colorPickerPopup");
    const applyBtn = document.getElementById("applyColorBtn");
    const cancelBtn = document.getElementById("cancelColorBtn");
    const alphaSlider = document.getElementById("alphaSlider");
    
    alphaSlider.addEventListener("input", function() {
        document.getElementById("alphaValue").textContent = `Alpha: ${parseFloat(this.value).toFixed(2)}`;
    });

    applyBtn.addEventListener("click", function() {
        applyColorSelection();
    });
    
    cancelBtn.addEventListener("click", function() {
        hideColorPicker();
    });

    document.addEventListener("click", function(e) {
        const colorPicker = document.getElementById("colorPickerPopup");
        if (colorPicker && 
            colorPicker.style.display === "block" && 
            !colorPicker.contains(e.target) && 
            !e.target.classList.contains("color-preview")) {
            hideColorPicker();
        }
    });
}

function addAnimationStep(r = 0, g = 0, b = 0, a = 1, ms = 100) {
    if (!animationStepsContainer) {
        animationStepsContainer = document.getElementById("animation-steps");
        if (!animationStepsContainer) {
            console.error("Animation steps container not found");
            return;
        }
    }
    
    const wrapper = document.createElement("div");
    wrapper.className = "anim-step";

    wrapper.innerHTML = `
        <div class="input-group">
            <label>R</label><input type="number" min="0" max="255" value="${r}" class="r-input">
            <label>G</label><input type="number" min="0" max="255" value="${g}" class="g-input">
            <label>B</label><input type="number" min="0" max="255" value="${b}" class="b-input">
            <label>A</label><input type="number" step="0.01" min="0" max="1" value="${a}" class="a-input">
            <label>MS</label><input type="number" min="1" value="${ms}" class="ms-input">
            <div class="color-preview" style="background-color: rgba(${r}, ${g}, ${b}, ${a})"></div>
            <span class="trash">🗑️</span>
        </div>
    `;

    animationStepsContainer.appendChild(wrapper);

    const trash = wrapper.querySelector(".trash");
    
    trash.addEventListener("mouseenter", function() {
        wrapper.classList.add("trash-hover");
    });
    
    trash.addEventListener("mouseleave", function() {
        wrapper.classList.remove("trash-hover");
    });

    trash.addEventListener("click", function() {
        wrapper.remove();
        updateOutput();
        updateStepCount();
    });    

    const inputs = wrapper.querySelectorAll("input");
    inputs.forEach(function(input) {
        input.addEventListener("input", function() {
            enforceInputRules(this);
            updateColorPreview(wrapper);
            updateOutput();
        });
    });

    const colorPreview = wrapper.querySelector(".color-preview");
    colorPreview.addEventListener("click", function(e) {
        e.stopPropagation();
        showColorPicker(this, wrapper, e);
    });

    updateColorPreview(wrapper);
    updateOutput();
    updateStepCount();
    wrapper.scrollIntoView({ behavior: "smooth", block: "end" });
}

function enforceInputRules(input) {
    const value = parseFloat(input.value);
    
    if (input.classList.contains('r-input') || 
        input.classList.contains('g-input') || 
        input.classList.contains('b-input')) {
        if (value < 0) input.value = 0;
        if (value > 255) input.value = 255;
    }
    else if (input.classList.contains('a-input')) {
        if (value < 0) input.value = 0;
        if (value > 1) input.value = 1;
    }
    else if (input.classList.contains('ms-input')) {
        if (value < 1) input.value = 1;
    }
}

function updateColorPreview(step) {
    const rInput = step.querySelector(".r-input");
    const gInput = step.querySelector(".g-input");
    const bInput = step.querySelector(".b-input");
    const aInput = step.querySelector(".a-input");
    
    if (!rInput || !gInput || !bInput || !aInput) return;
    
    const r = rInput.value || 0;
    const g = gInput.value || 0;
    const b = bInput.value || 0;
    const a = aInput.value || 1;

    const colorPreview = step.querySelector('.color-preview');
    if (colorPreview) {
        colorPreview.style.backgroundColor = `rgba(${r}, ${g}, ${b}, ${a})`;
    }
}

function showColorPicker(colorPreview, stepWrapper, event) {
    activeColorPreview = colorPreview;
    activeStepWrapper = stepWrapper;
    
    const rInput = stepWrapper.querySelector(".r-input");
    const gInput = stepWrapper.querySelector(".g-input");
    const bInput = stepWrapper.querySelector(".b-input");
    const aInput = stepWrapper.querySelector(".a-input");
    
    if (!rInput || !gInput || !bInput || !aInput) {
        console.error("Color inputs not found");
        return;
    }
    
    const hexColor = rgbToHex(
        parseInt(rInput.value) || 0,
        parseInt(gInput.value) || 0,
        parseInt(bInput.value) || 0
    );
    
    const colorInput = document.getElementById("colorInput");
    const alphaSlider = document.getElementById("alphaSlider");
    const alphaValue = document.getElementById("alphaValue");
    
    if (!colorInput || !alphaSlider || !alphaValue) {
        console.error("Color picker elements not found");
        return;
    }
    
    colorInput.value = "#" + hexColor;
    alphaSlider.value = parseFloat(aInput.value) || 1;
    alphaValue.textContent = `Alpha: ${parseFloat(aInput.value).toFixed(2) || "1.00"}`;
    
    const colorPicker = document.getElementById("colorPickerPopup");
    
    let topPos = event.clientY + 10;
    let leftPos = event.clientX + 10;
    
    const pickerWidth = 250;
    const pickerHeight = 200;

    if (leftPos + pickerWidth > window.innerWidth) {
        leftPos = window.innerWidth - pickerWidth - 10;
    }

    if (topPos + pickerHeight > window.innerHeight) {
        topPos = window.innerHeight - pickerHeight - 10;
    }
    
    if (leftPos < 10) leftPos = 10;
    if (topPos < 10) topPos = 10;
    
    colorPicker.style.top = topPos + "px";
    colorPicker.style.left = leftPos + "px";
    colorPicker.style.display = "block";
}

function hideColorPicker() {
    const colorPicker = document.getElementById("colorPickerPopup");
    if (colorPicker) {
        colorPicker.style.display = "none";
    }
    activeColorPreview = null;
    activeStepWrapper = null;
}

function applyColorSelection() {
    if (!activeStepWrapper) {
        hideColorPicker();
        return;
    }
    
    const rInput = activeStepWrapper.querySelector(".r-input");
    const gInput = activeStepWrapper.querySelector(".g-input");
    const bInput = activeStepWrapper.querySelector(".b-input");
    const aInput = activeStepWrapper.querySelector(".a-input");
    
    if (!rInput || !gInput || !bInput || !aInput) {
        hideColorPicker();
        return;
    }
    
    const colorInput = document.getElementById("colorInput");
    const alphaSlider = document.getElementById("alphaSlider");
    
    if (!colorInput || !alphaSlider) {
        hideColorPicker();
        return;
    }
    
    const rgb = hexToRgb(colorInput.value);
    const alpha = parseFloat(alphaSlider.value);

    rInput.value = rgb.r;
    gInput.value = rgb.g;
    bInput.value = rgb.b;
    aInput.value = alpha.toFixed(2);

    updateColorPreview(activeStepWrapper);
    updateOutput();
    
    hideColorPicker();
}
function rgbToHex(r, g, b) {
    r = parseInt(r) || 0;
    g = parseInt(g) || 0;
    b = parseInt(b) || 0;
    
    return ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}

function hexToRgb(hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : { r: 0, g: 0, b: 0 };
}

function updateOutput() {
    if (!animationStepsContainer) return;
    
    const steps = animationStepsContainer.querySelectorAll(".anim-step");
    const outputArray = [];

    steps.forEach(step => {
        const rInput = step.querySelector(".r-input");
        const gInput = step.querySelector(".g-input");
        const bInput = step.querySelector(".b-input");
        const aInput = step.querySelector(".a-input");
        const msInput = step.querySelector(".ms-input");

        if (rInput && gInput && bInput && aInput && msInput) {
            const r = parseInt(rInput.value) || 0;
            const g = parseInt(gInput.value) || 0;
            const b = parseInt(bInput.value) || 0;
            const a = parseFloat(aInput.value).toFixed(2) || 1.00;
            const ms = parseInt(msInput.value) || 100;

            outputArray.push(`{'${r},${g},${b},${a}','${ms}'}`);
        }
    });

    const outputElement = document.getElementById("output");
    if (outputElement) {
        outputElement.value = outputArray.join(",");
    }
}

function copyToClipboard() {
    const text = document.getElementById("output").value;
    navigator.clipboard.writeText(text).then(() => {
        alert("Copied to clipboard!");
    });
}

function pasteFromInput() {
    const raw = prompt("Paste your animation string:");
    if (!raw) return;

    animationStepsContainer.innerHTML = "";

    const matches = [...raw.matchAll(/\{\'(.*?)\'\s*,\s*\'(.*?)\'\}/g)];
    matches.forEach(match => {
        const rgba = match[1].split(',').map(s => s.trim());
        const ms = match[2].trim();
        if (rgba.length === 4) {
            addAnimationStep(rgba[0], rgba[1], rgba[2], rgba[3], ms);
        }
    });

    updateOutput();
    updateStepCount();
}

function updateStepCount() {
    const count = animationStepsContainer.querySelectorAll(".anim-step").length;
    document.getElementById("step-count").textContent = count;
}

function deleteAllAnimations() {
    if (confirm("Are you sure you want to delete all animation steps?")) {
        animationStepsContainer.innerHTML = "";
        updateOutput();
        updateStepCount();
    }
}