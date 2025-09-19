document.addEventListener('DOMContentLoaded', () => {
    const loginCard = document.getElementById('login-card');
    const signupCard = document.getElementById('signup-card');
    const showSignupBtn = document.getElementById('show-signup');
    const showLoginBtn = document.getElementById('show-login');

    const loginForm = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form');

    const loginEmailInput = document.getElementById('login-email');
    const loginPasswordInput = document.getElementById('login-password');
    const loginButton = document.getElementById('login-button');
    const loginSpinner = loginButton.querySelector('.spinner');

    const signupFullnameInput = document.getElementById('signup-fullname');
    const signupEmailInput = document.getElementById('signup-email');
    const signupPasswordInput = document.getElementById('signup-password');
    const signupConfirmPasswordInput = document.getElementById('signup-confirm-password');
    const termsConditionsCheckbox = document.getElementById('terms-conditions');
    const signupButton = document.getElementById('signup-button');
    const signupSpinner = signupButton.querySelector('.spinner');

    const loginEmailError = document.getElementById('login-email-error');
    const loginPasswordError = document.getElementById('login-password-error');
    const signupFullnameError = document.getElementById('signup-fullname-error');
    const signupEmailError = document.getElementById('signup-email-error');
    const signupPasswordError = document.getElementById('signup-password-error');
    const signupConfirmPasswordError = document.getElementById('signup-confirm-password-error');
    const termsConditionsError = document.getElementById('terms-conditions-error');

    const languageSwitcher = document.getElementById('language-switcher');
    const langOptionsDiv = languageSwitcher.querySelector('.lang-options');
    const htmlTag = document.documentElement;
    const notification = document.getElementById('notification');

    const translations = {
        en: {
            "login-title": "Login",
            "email-username-label": "Email / Username",
            "email-username-placeholder": "Enter your email or username",
            "password-label": "Password",
            "password-placeholder": "Enter your password",
            "remember-me": "Remember me",
            "login-button": "Login",
            "forgot-password": "Forgot password?",
            "no-account": "Don't have an account?",
            "signup-link": "Sign Up",
            "signup-title": "Sign Up",
            "fullname-label": "Full Name",
            "fullname-placeholder": "Enter your full name",
            "email-label": "Email",
            "email-placeholder": "Enter your email",
            "confirm-password-label": "Confirm Password",
            "confirm-password-placeholder": "Confirm your password",
            "terms-conditions": "I agree to the terms and conditions",
            "already-account": "Already have an account?",
            "login-link": "Login",
            "email-empty-error": "Email/Username cannot be empty.",
            "password-length-error": "Password must be at least 8 characters.",
            "fullname-length-error": "Full name must be at least 2 characters.",
            "email-invalid-error": "Please enter a valid email address.",
            "passwords-match-error": "Passwords do not match.",
            "terms-accept-error": "You must accept the terms and conditions.",
            "login-success": "Login successful!",
            "signup-success": "Account created successfully!"
        },
        ar: {
            "login-title": "تسجيل الدخول",
            "email-username-label": "البريد الإلكتروني / اسم المستخدم",
            "email-username-placeholder": "أدخل بريدك الإلكتروني أو اسم المستخدم",
            "password-label": "كلمة المرور",
            "password-placeholder": "أدخل كلمة المرور",
            "remember-me": "تذكرني",
            "login-button": "تسجيل الدخول",
            "forgot-password": "هل نسيت كلمة المرور؟",
            "no-account": "ليس لديك حساب؟",
            "signup-link": "إنشاء حساب",
            "signup-title": "إنشاء حساب",
            "fullname-label": "الاسم الكامل",
            "fullname-placeholder": "أدخل اسمك الكامل",
            "email-label": "البريد الإلكتروني",
            "email-placeholder": "أدخل بريدك الإلكتروني",
            "confirm-password-label": "تأكيد كلمة المرور",
            "confirm-password-placeholder": "تأكيد كلمة المرور",
            "terms-conditions": "أوافق على الشروط والأحكام",
            "already-account": "هل لديك حساب بالفعل؟",
            "login-link": "تسجيل الدخول",
            "email-empty-error": "لا يمكن أن يكون البريد الإلكتروني/اسم المستخدم فارغًا.",
            "password-length-error": "يجب أن تتكون كلمة المرور من 8 أحرف على الأقل.",
            "fullname-length-error": "يجب أن يتكون الاسم الكامل من حرفين على الأقل.",
            "email-invalid-error": "الرجاء إدخال عنوان بريد إلكتروني صالح.",
            "passwords-match-error": "كلمات المرور غير متطابقة.",
            "terms-accept-error": "يجب عليك الموافقة على الشروط والأحكام.",
            "login-success": "تم تسجيل الدخول بنجاح!",
            "signup-success": "تم إنشاء الحساب بنجاح!"
        }
    };

    function showNotification(messageKey, type = 'success') {
        const currentLang = htmlTag.lang;
        const message = translations[currentLang][messageKey] || messageKey;
        notification.textContent = message;
        notification.className = `notification ${type} show`;
        setTimeout(() => {
            notification.classList.remove('show');
        }, 3000);
    }

    function updateContent(lang) {
        document.querySelectorAll('[data-en]').forEach(element => {
            element.textContent = element.dataset[lang] || element.dataset.en;
        });

        document.querySelectorAll('[data-en-placeholder]').forEach(element => {
            element.placeholder = element.dataset[`${lang}Placeholder`] || element.dataset.enPlaceholder;
        });
    }

    function setLanguage(lang) {
        htmlTag.lang = lang;
        localStorage.setItem('selectedLang', lang);
        updateContent(lang);
        validateLoginForm();
        validateSignupForm();
    }

    const savedLang = localStorage.getItem('selectedLang') || 'ar';
    setLanguage(savedLang);

    languageSwitcher.addEventListener('click', (event) => {
        langOptionsDiv.classList.toggle('show');
        event.stopPropagation();
    });

    langOptionsDiv.querySelectorAll('div').forEach(option => {
        option.addEventListener('click', (event) => {
            const newLang = option.dataset.lang;
            setLanguage(newLang);
            langOptionsDiv.classList.remove('show');
            event.stopPropagation();
        });
    });

    document.addEventListener('click', (event) => {
        if (!languageSwitcher.contains(event.target)) {
            langOptionsDiv.classList.remove('show');
        }
    });

    showSignupBtn.addEventListener('click', (e) => {
        e.preventDefault();
        loginCard.classList.add('hidden');
        signupCard.classList.remove('hidden');
        resetForm(loginForm);
        signupFullnameInput.focus();
    });

    showLoginBtn.addEventListener('click', (e) => {
        e.preventDefault();
        signupCard.classList.add('hidden');
        loginCard.classList.remove('hidden');
        resetForm(signupForm);
        loginEmailInput.focus();
    });

    function resetForm(form) {
        form.reset();
        form.querySelectorAll('.validation-message').forEach(msg => msg.style.display = 'none');
        form.querySelectorAll('input').forEach(input => {
            input.classList.remove('invalid', 'valid');
            input.removeAttribute('aria-invalid');
        });
        form.querySelectorAll('.toggle-password i').forEach(icon => {
            icon.classList.remove('fa-eye-slash');
            icon.classList.add('fa-eye');
        });
        form.querySelectorAll('.status-icon').forEach(iconContainer => {
            iconContainer.style.display = 'none';
            iconContainer.querySelector('i').className = '';
        });
        const button = form.querySelector('button[type="submit"]');
        if (button) {
            button.disabled = true;
        }
        const spinner = form.querySelector('.spinner');
        if (spinner) {
            spinner.classList.add('hidden');
        }
    }

    document.querySelectorAll('.toggle-password').forEach(toggle => {
        toggle.addEventListener('click', () => {
            const targetId = toggle.dataset.target;
            const passwordInput = document.getElementById(targetId);
            const icon = toggle.querySelector('i');

            if (passwordInput.type === 'password') {
                passwordInput.type = 'text';
                icon.classList.remove('fa-eye');
                icon.classList.add('fa-eye-slash');
            } else {
                passwordInput.type = 'password';
                icon.classList.remove('fa-eye-slash');
                icon.classList.add('fa-eye');
            }
        });
    });

    const isValidEmail = (email) => {
        const re = /^(([^<>()[\\]\\.,;:\s@\"]+(\.[^<>()[\\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    };

    const updateStatusIcon = (inputElement, isValid) => {
        const inputGroup = inputElement.closest('.input-group');
        const statusIconContainer = inputGroup ? inputGroup.querySelector('.status-icon') : null;
        const icon = statusIconContainer ? statusIconContainer.querySelector('i') : null;

        if (icon) {
            statusIconContainer.style.display = 'inline-block';
            icon.className = '';

            if (isValid) {
                icon.classList.add('fas', 'fa-check-circle');
                inputElement.removeAttribute('aria-invalid');
            } else {
                icon.classList.add('fas', 'fa-times-circle');
                inputElement.setAttribute('aria-invalid', 'true');
            }
        }
    };

    const validateField = (inputElement, errorElement, validationFn, errorMessageKey) => {
        const isValid = validationFn(inputElement.value);
        const currentLang = htmlTag.lang;
        if (!isValid) {
            inputElement.classList.add('invalid');
            inputElement.classList.remove('valid');
            errorElement.textContent = translations[currentLang][errorMessageKey];
            errorElement.style.display = 'block';
        } else {
            inputElement.classList.remove('invalid');
            inputElement.classList.add('valid');
            errorElement.style.display = 'none';
        }
        updateStatusIcon(inputElement, isValid);
        return isValid;
    };

    const validateMatch = (inputElement, matchElement, errorElement, errorMessageKey) => {
        const isValid = (inputElement.value === matchElement.value && inputElement.value !== '');
        const currentLang = htmlTag.lang;
        if (!isValid) {
            inputElement.classList.add('invalid');
            inputElement.classList.remove('valid');
            errorElement.textContent = translations[currentLang][errorMessageKey];
            errorElement.style.display = 'block';
        } else {
            inputElement.classList.remove('invalid');
            inputElement.classList.add('valid');
            errorElement.style.display = 'none';
        }
        updateStatusIcon(inputElement, isValid);
        return isValid;
    };

    const validateLength = (inputElement, errorElement, minLength, errorMessageKey) => {
        const isValid = (inputElement.value.length >= minLength);
        const currentLang = htmlTag.lang;
        if (!isValid) {
            inputElement.classList.add('invalid');
            inputElement.classList.remove('valid');
            errorElement.textContent = translations[currentLang][errorMessageKey];
            errorElement.style.display = 'block';
        } else {
            inputElement.classList.remove('invalid');
            inputElement.classList.add('valid');
            errorElement.style.display = 'none';
        }
        updateStatusIcon(inputElement, isValid);
        return isValid;
    };

    const validateCheckbox = (checkboxElement, errorElement, errorMessageKey) => {
        const isValid = checkboxElement.checked;
        const currentLang = htmlTag.lang;
        if (!isValid) {
            errorElement.textContent = translations[currentLang][errorMessageKey];
            errorElement.style.display = 'block';
            checkboxElement.setAttribute('aria-invalid', 'true');
        } else {
            errorElement.style.display = 'none';
            checkboxElement.removeAttribute('aria-invalid');
        }
        return isValid;
    };

    const validateLoginForm = () => {
        const isEmailValid = validateField(loginEmailInput, loginEmailError, (val) => val.length > 0, 'email-empty-error');
        const isPasswordValid = validateLength(loginPasswordInput, loginPasswordError, 8, 'password-length-error');
        loginButton.disabled = !(isEmailValid && isPasswordValid);
    };

    loginEmailInput.addEventListener('input', validateLoginForm);
    loginPasswordInput.addEventListener('input', validateLoginForm);

    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        validateLoginForm();
        if (!loginButton.disabled) {
            loginButton.disabled = true;
            loginSpinner.classList.remove('hidden');
            setTimeout(() => {
                showNotification('login-success');
                loginSpinner.classList.add('hidden');
                loginButton.disabled = false;
                resetForm(loginForm);
            }, 1500);
        }
    });

    const validateSignupForm = () => {
        const isFullnameValid = validateLength(signupFullnameInput, signupFullnameError, 2, 'fullname-length-error');
        const isEmailValid = validateField(signupEmailInput, signupEmailError, isValidEmail, 'email-invalid-error');
        const isPasswordValid = validateLength(signupPasswordInput, signupPasswordError, 8, 'password-length-error');
        const isConfirmPasswordMatching = validateMatch(signupConfirmPasswordInput, signupPasswordInput, signupConfirmPasswordError, 'passwords-match-error');
        const areTermsAccepted = validateCheckbox(termsConditionsCheckbox, termsConditionsError, 'terms-accept-error');

        signupButton.disabled = !(isFullnameValid && isEmailValid && isPasswordValid && isConfirmPasswordMatching && areTermsAccepted);
    };

    signupFullnameInput.addEventListener('input', validateSignupForm);
    signupEmailInput.addEventListener('input', validateSignupForm);
    signupPasswordInput.addEventListener('input', validateSignupForm);
    signupConfirmPasswordInput.addEventListener('input', validateSignupForm);
    termsConditionsCheckbox.addEventListener('change', validateSignupForm);

    signupForm.addEventListener('submit', (e) => {
        e.preventDefault();
        validateSignupForm();
        if (!signupButton.disabled) {
            signupButton.disabled = true;
            signupSpinner.classList.remove('hidden');
            setTimeout(() => {
                showNotification('signup-success');
                signupSpinner.classList.add('hidden');
                signupButton.disabled = false;
                resetForm(signupForm);
                signupCard.classList.add('hidden');
                loginCard.classList.remove('hidden');
            }, 1500);
        }
    });

    loginButton.disabled = true;
    signupButton.disabled = true;
});