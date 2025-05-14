window.onload = () => {
    document.body.style.opacity = "1";
};

window.onload = () => {
    document.body.style.opacity = "1";
};

let animationStepsContainer = null;

window.addEventListener("DOMContentLoaded", () => {
    animationStepsContainer = document.getElementById("animation-steps");
    updateOutput();
});

function addAnimationStep(r = 0, g = 0, b = 0, a = 1, ms = 100) {
    const wrapper = document.createElement("div");
    wrapper.className = "anim-step";

    wrapper.innerHTML = `
        <div class="input-group">
            <label>R</label><input type="number" min="0" max="255" value="${r}">
            <label>G</label><input type="number" min="0" max="255" value="${g}">
            <label>B</label><input type="number" min="0" max="255" value="${b}">
            <label>A</label><input type="number" step="0.01" min="0" max="1" value="${a}">
            <label>MS</label><input type="number" min="1" value="${ms}">
            <div class="color-preview" style="background-color: rgba(${r}, ${g}, ${b}, ${a})"></div>
            <span class="trash">🗑️</span>
        </div>
    `;

    animationStepsContainer.appendChild(wrapper);

    const trash = wrapper.querySelector(".trash");

    trash.addEventListener("mouseenter", () => {
        wrapper.classList.add("trash-hover");
    });
    trash.addEventListener("mouseleave", () => {
        wrapper.classList.remove("trash-hover");
    });

    trash.addEventListener("click", () => {
        wrapper.remove();
        updateOutput();
        updateStepCount();
    });    

    const inputs = wrapper.querySelectorAll("input");
    inputs.forEach(input => {
        input.addEventListener("input", enforceInputRules);
        input.addEventListener("input", updateOutput);
    });

    updateColorPreview(wrapper);
    updateOutput();
    updateStepCount();
    wrapper.scrollIntoView({ behavior: "smooth", block: "end" });
}

function enforceInputRules(e) {
    const input = e.target;
    updateColorPreview(input.closest('.anim-step'));
}

function updateColorPreview(step) {
    const inputs = step.querySelectorAll("input");
    const r = inputs[0].value || 0;
    const g = inputs[1].value || 0;
    const b = inputs[2].value || 0;
    const a = inputs[3].value || 1;

    const colorPreview = step.querySelector('.color-preview');
    colorPreview.style.backgroundColor = `rgba(${r}, ${g}, ${b}, ${a})`;
}

function updateOutput() {
    const steps = animationStepsContainer.querySelectorAll(".anim-step");
    const outputArray = [];

    steps.forEach(step => {
        const inputs = step.querySelectorAll("input");

        if (inputs.length === 5) {
            const r = parseInt(inputs[0].value) || 0;
            const g = parseInt(inputs[1].value) || 0;
            const b = parseInt(inputs[2].value) || 0;
            const a = parseFloat(inputs[3].value).toFixed(2) || 1.00;
            const ms = parseInt(inputs[4].value) || 100;

            outputArray.push(`{'${r},${g},${b},${a}','${ms}'}`);
        }
    });

    document.getElementById("output").value = outputArray.join(",");
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

function removeAnimationStep(trashIcon) {
    const stepToRemove = trashIcon.closest('.anim-step');
    if (stepToRemove) {
        stepToRemove.remove();
        updateOutput();
    }
}

function deleteAllAnimations() {
    if (confirm("Are you sure you want to delete all animation steps?")) {
        animationStepsContainer.innerHTML = "";
        updateOutput();
        updateStepCount();
    }
}

function updateStepCount() {
    const count = animationStepsContainer.querySelectorAll(".anim-step").length;
    document.getElementById("step-count").textContent = count;
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
            window.location.href = "/tools/"+window.location.search;
        }
        else {
            window.location.href = "/tools/"
        }
    }, 1000);
}