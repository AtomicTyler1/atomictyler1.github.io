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

document.addEventListener("DOMContentLoaded", () => {
    const passwordInput = document.getElementById("password");
    const viewPasswordBtn = document.getElementById("viewPasswordBtn");
    const copyPasswordBtn = document.getElementById("copyPasswordBtn");
    const pastePasswordBtn = document.getElementById("pastePasswordBtn");
    const generatePasswordBtn = document.getElementById("generatePasswordBtn");

    if (generatePasswordBtn) {
        generatePasswordBtn.addEventListener("click", () => {
            const password = generateRandomPassword(Math.floor(Math.random() * 25) + 18);
            passwordInput.value = password;
        });
    }

    function generateRandomPassword(length = 12) {
        const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        let result = "";
        const array = new Uint32Array(length);
        window.crypto.getRandomValues(array);

        for (let i = 0; i < length; i++) {
            result += charset[array[i] % charset.length];
        }

        return result;
    }


    if (viewPasswordBtn) {
        viewPasswordBtn.addEventListener("click", () => {
            if (passwordInput.type === "password") {
                passwordInput.type = "text";
            } else {
                passwordInput.type = "password";
            }
        });
    }

    if (copyPasswordBtn) {
        copyPasswordBtn.addEventListener("click", async () => {
            try {
                await navigator.clipboard.writeText(passwordInput.value);
            } catch (err) {
                alert("Failed to copy: " + err);
            }
        });
    }

    if (pastePasswordBtn) {
        pastePasswordBtn.addEventListener("click", async () => {
            try {
                const text = await navigator.clipboard.readText();
                passwordInput.value = text;
            } catch (err) {
                alert("Failed to paste: " + err);
            }
        });
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
});
