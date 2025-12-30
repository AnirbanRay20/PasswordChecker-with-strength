# 🔐 Password Validation System (Web + Python)

This project implements a **Password Validation System** using two approaches:

1. 🌐 A **Web-based Password Analyzer** (HTML, CSS, JavaScript)
2. 🐍 A **Python-based Password Validator** (Command Line)

Both implementations validate a password as **VALID** or **INVALID** using standard security rules.

---

## 📌 Password Validation Rules

A password is considered **VALID** only if **all** of the following conditions are satisfied:

- Minimum **8 characters**
- At least **one uppercase letter** (A–Z)
- At least **one lowercase letter** (a–z)
- At least **one numeric digit** (0–9)
- At least **one special character** (e.g. `@, #, $, !, %, *`)

If **any rule fails**, the password is marked **INVALID**.

---

## 🌐 Web-Based Password Analyzer

### 🧠 Features
- Dark cybersecurity-themed UI
- Live password validation
- Show / Hide password button
- Rule-by-rule validation feedback
- Fully centered and responsive layout
- No backend required

---

### 🛠️ Technologies Used (Web)
- HTML5
- CSS3
- JavaScript (Vanilla)


password-analyzer/
├── index.html
├── style.css
└── script.js


---

### ▶️ How to Run the Website
1. Download or clone the repository
2. Open `index.html` in any modern web browser
3. Enter a password
4. View live validation results

---

## 🐍 Python Password Validator (CLI)

### 🧠 Features
- Simple command-line interface
- Uses regular expressions
- Outputs only **VALID** or **INVALID**
- Suitable for lab exams and assignments

---

### 🛠️ Technologies Used (Python)
- Python 3
- Built-in `re` module

---

### 📂 Python File

---

### 📜 Python Source Code

```python
import re

def is_valid_password(password):
    if len(password) < 8:
        return False

    if not re.search(r"[A-Z]", password):
        return False

    if not re.search(r"[a-z]", password):
        return False

    if not re.search(r"[0-9]", password):
        return False

    if not re.search(r"[^A-Za-z0-9]", password):
        return False

    return True


pwd = input("Enter password: ")

if is_valid_password(pwd):
    print("Password is VALID")
else:
    print("Password is INVALID")

python password_validator.py


Enter password: Abc@1234
Password is VALID


Enter password: password
Password is INVALID

---

### 📂 Website File Structure
