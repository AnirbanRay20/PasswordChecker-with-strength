const password = document.getElementById("password");
const toggleBtn = document.getElementById("toggleBtn");
const strengthFill = document.getElementById("strength-fill");
const entropyText = document.getElementById("entropy");
const crackTime = document.getElementById("crack-time");

const rules = {
    length: document.getElementById("length"),
    upper: document.getElementById("upper"),
    lower: document.getElementById("lower"),
    number: document.getElementById("number"),
    special: document.getElementById("special")
};

/* Toggle password visibility */

const eyeOpen = document.getElementById("eyeOpen");
const eyeClosed = document.getElementById("eyeClosed");

toggleBtn.addEventListener("click", () => {
    if (password.type === "password") {
        password.type = "text";
        eyeOpen.style.display = "none";
        eyeClosed.style.display = "inline";
    } else {
        password.type = "password";
        eyeOpen.style.display = "inline";
        eyeClosed.style.display = "none";
    }
});


/* Live validation */
password.addEventListener("input", () => {
    const pwd = password.value;
    let score = 0;
    let charset = 0;

    if (pwd.length >= 8) {
        rules.length.textContent = "✅ Minimum 8 characters";
        score++;
    } else rules.length.textContent = "❌ Minimum 8 characters";

    if (/[A-Z]/.test(pwd)) {
        rules.upper.textContent = "✅ One uppercase letter";
        charset += 26; score++;
    } else rules.upper.textContent = "❌ One uppercase letter";

    if (/[a-z]/.test(pwd)) {
        rules.lower.textContent = "✅ One lowercase letter";
        charset += 26; score++;
    } else rules.lower.textContent = "❌ One lowercase letter";

    if (/[0-9]/.test(pwd)) {
        rules.number.textContent = "✅ One number";
        charset += 10; score++;
    } else rules.number.textContent = "❌ One number";

    if (/[^A-Za-z0-9]/.test(pwd)) {
        rules.special.textContent = "✅ One special character";
        charset += 32; score++;
    } else rules.special.textContent = "❌ One special character";

    strengthFill.style.width = `${(score / 5) * 100}%`;
    strengthFill.style.background =
        score <= 2 ? "#ef4444" :
        score === 3 ? "#facc15" :
        "#22c55e";

    if (pwd.length > 0 && charset > 0) {
        const entropy = Math.log2(Math.pow(charset, pwd.length));
        entropyText.textContent = `Entropy: ${entropy.toFixed(2)} bits`;

        const seconds = Math.pow(2, entropy) / 1e9;
        crackTime.textContent = formatTime(seconds);
    } else {
        entropyText.textContent = "Entropy: —";
        crackTime.textContent = "—";
    }
});

/* Human readable time */
function formatTime(seconds) {
    const units = [
        { n: "second", v: 1 },
        { n: "minute", v: 60 },
        { n: "hour", v: 3600 },
        { n: "day", v: 86400 },
        { n: "year", v: 31536000 },
        { n: "decade", v: 315360000 },
        { n: "century", v: 3153600000 },
        { n: "millennium", v: 31536000000 },
        { n: "billion years", v: 3.1536e16 },
        { n: "trillion years", v: 3.1536e19 }
    ];

    for (let i = units.length - 1; i >= 0; i--) {
        if (seconds >= units[i].v) {
            const val = seconds / units[i].v;
            return `${val.toFixed(2)} ${units[i].n}${val >= 2 ? "s" : ""}`;
        }
    }
    return `${seconds.toFixed(2)} seconds`;
}
