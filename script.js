const password = document.getElementById("password");
const toggleBtn = document.getElementById("toggleBtn");
const strengthFill = document.getElementById("strength-fill");
const crackTime = document.getElementById("crack-time");
const entropyText = document.getElementById("entropy");
const warning = document.getElementById("warning");

const rules = {
    length: document.getElementById("length"),
    upper: document.getElementById("upper"),
    lower: document.getElementById("lower"),
    number: document.getElementById("number"),
    special: document.getElementById("special")
};

const commonPasswords = ["password", "123456", "qwerty", "admin", "letmein"];

/* Toggle password visibility */
toggleBtn.addEventListener("click", () => {
    password.type = password.type === "password" ? "text" : "password";
});

/* Live password analysis */
password.addEventListener("input", () => {
    const pwd = password.value;
    let charset = 0;
    let score = 0;

    warning.textContent = "";

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

    if (charset > 0 && pwd.length > 0) {
        const entropy = Math.log2(Math.pow(charset, pwd.length));
        entropyText.textContent = `Entropy: ${entropy.toFixed(2)} bits`;

        const guessesPerSecond = 1e9;
        const seconds = Math.pow(2, entropy) / guessesPerSecond;
        crackTime.textContent = formatTime(seconds);
    } else {
        entropyText.textContent = "Entropy: —";
        crackTime.textContent = "—";
    }

    if (commonPasswords.includes(pwd.toLowerCase())) {
        warning.textContent = "⚠ This is a commonly used password.";
    }
});

/* Human-readable time formatter */
function formatTime(seconds) {
    if (!isFinite(seconds) || seconds <= 0) return "Instantly";

    const units = [
        { name: "second", value: 1 },
        { name: "minute", value: 60 },
        { name: "hour", value: 3600 },
        { name: "day", value: 86400 },
        { name: "year", value: 31536000 },
        { name: "decade", value: 315360000 },
        { name: "century", value: 3153600000 },
        { name: "millennium", value: 31536000000 },
        { name: "billion years", value: 31536000000 * 1e9 },
        { name: "trillion years", value: 31536000000 * 1e12 }
    ];

    for (let i = units.length - 1; i >= 0; i--) {
        if (seconds >= units[i].value) {
            const time = seconds / units[i].value;
            return `${time.toFixed(2)} ${units[i].name}${time >= 2 ? "s" : ""}`;
        }
    }

    return `${seconds.toFixed(2)} seconds`;
}
