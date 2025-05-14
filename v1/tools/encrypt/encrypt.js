class FileEncryptor {
    constructor() {
        this.progressBar = document.getElementById("progressBar");
        this.fileLabel = document.getElementById("fileLabel");
    }

    async encryptFile(file, password) {
        const key = await this.deriveKey(password);
        const iv = crypto.getRandomValues(new Uint8Array(12));
        const data = await file.arrayBuffer();
        const encryptedData = await crypto.subtle.encrypt(
            { name: "AES-GCM", iv },
            key,
            data
        );
        return { encryptedData, iv };
    }

    async decryptFile(encryptedFile, password, iv) {
        const key = await this.deriveKey(password);
        try {
            const decryptedData = await crypto.subtle.decrypt(
                { name: "AES-GCM", iv },
                key,
                encryptedFile
            );
            return new Blob([decryptedData]);
        } catch (e) {
            alert("Incorrect password or corrupted file.");
            return null;
        }
    }

    async deriveKey(password) {
        const encoder = new TextEncoder();
        const keyMaterial = await crypto.subtle.importKey(
            "raw",
            encoder.encode(password),
            { name: "PBKDF2" },
            false,
            ["deriveKey"]
        );
        return crypto.subtle.deriveKey(
            {
                name: "PBKDF2",
                salt: new Uint8Array(16),
                iterations: 100000,
                hash: "SHA-256",
            },
            keyMaterial,
            { name: "AES-GCM", length: 256 },
            true,
            ["encrypt", "decrypt"]
        );
    }

    updateProgress(progress) {
        this.progressBar.value = progress;
    }

}

function updateFileLabel() {
    const fileInput = document.getElementById("fileInput");
    const fileLabel = document.getElementById("fileLabel");
    
    if (fileInput.files.length > 0) {
        const fileNames = Array.from(fileInput.files).map(file => file.name).join(", ");
        fileLabel.textContent = `Selected files: ${fileNames}`;
    } else {
        fileLabel.textContent = "";
    }
}

document.getElementById("encryptBtn").addEventListener("click", async () => {
    const files = document.getElementById("fileInput").files;
    const password = document.getElementById("password").value;
    const encryptor = new FileEncryptor();
    
    let processed = 0;
    for (const file of files) {
        const { encryptedData, iv } = await encryptor.encryptFile(file, password);
        const blob = new Blob([iv, encryptedData]);
        const a = document.createElement("a");
        a.href = URL.createObjectURL(blob);
        a.download = file.name + ".atomic";
        a.click();
        processed++;
        encryptor.updateProgress((processed / files.length) * 100);
    }
});

document.getElementById("decryptBtn").addEventListener("click", async () => {
    const files = document.getElementById("fileInput").files;
    const password = document.getElementById("password").value;
    const encryptor = new FileEncryptor();
    
    let processed = 0;
    for (const file of files) {
        const data = await file.arrayBuffer();
        const iv = new Uint8Array(data.slice(0, 12));
        const encryptedData = data.slice(12);
        const decryptedBlob = await encryptor.decryptFile(encryptedData, password, iv);
        if (decryptedBlob) {
            const a = document.createElement("a");
            a.href = URL.createObjectURL(decryptedBlob);
            a.download = file.name.replace(".atomic", "");
            a.click();
        }
        processed++;
        encryptor.updateProgress((processed / files.length) * 100);
    }
});

document.addEventListener("DOMContentLoaded", function () {
    const passwordField = document.getElementById('password');
    const togglePasswordButton = document.getElementById('togglePassword');
    const copyPasswordButton = document.getElementById('copyPassword');
    const pastePasswordButton = document.getElementById('pastePassword');

    let isPasswordVisible = false;

    togglePasswordButton.addEventListener('click', () => {
        isPasswordVisible = !isPasswordVisible;
        if (isPasswordVisible) {
            passwordField.type = 'text';
            togglePasswordButton.innerHTML = '<img src="/images/buttons/visible.png" alt="Hide password" class="eye-icon">';
        } else {
            passwordField.type = 'password';
            togglePasswordButton.innerHTML = '<img src="/images/buttons/hidden.png" alt="Show password" class="eye-icon">';
        }
    });

    copyPasswordButton.addEventListener('click', () => {
        navigator.clipboard.writeText(passwordField.value).then(() => {
            console.log('Password copied to clipboard');
        }).catch(err => {
            console.error('Error copying password: ', err);
        });
    });

    pastePasswordButton.addEventListener('click', async () => {
        const text = await navigator.clipboard.readText();
        passwordField.value = text;
    });

    function loaderbar() {
        const progressBar = document.getElementById('progressBar');
        setTimeout(() => {
            if (progressBar.value === 100) {
                progressBar.value = 0;
            }
            loaderbar();
        }, 5000);
    }

    loaderbar();

    function generateRandomPassword() {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let password = '';
        const passwordLength = Math.floor(Math.random() * (32 - 24 + 1)) + 24;
        for (let i = 0; i < passwordLength; i++) {
            password += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        return password;
    }
    
    document.getElementById("generatePasswordBtn").addEventListener("click", () => {
        const password = generateRandomPassword();
        document.getElementById("password").value = password;
    });
    
});

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
            window.location.href = "/tools"+window.location.search;
        }
        else {
            window.location.href = "/tools"
        }
    }, 1000);
}

