// Update Copyright Year
const yearElement = document.getElementById('year');
if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}

// Contact Form Handling with Formspree
const form = document.getElementById('contactForm');
const toast = document.getElementById('toast');
const submitBtn = document.getElementById('submitBtn');

if (form) {
  form.addEventListener('submit', async function(e) {
    e.preventDefault();

    const firstName = form.firstName.value.trim();
    const lastName = form.lastName.value.trim();
    const email = form._replyto.value.trim();
    const message = form.message.value.trim();

    // Required fields check
    if (!firstName || !lastName || !email || !message) {
      showToast("Please fill in all required fields.", "error");
      return;
    }

    // Email format check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      showToast("Please enter a valid email address.", "error");
      return;
    }

    // Button loading state
    const originalBtnText = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = `<span>Sending...</span>`;

    try {
      const res = await fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { 'Accept': 'application/json' }
      });

      if (res.ok) {
        showToast("Message sent successfully! I'll get back to you soon.", "success");
        form.reset();
      } else {
        const data = await res.json().catch(() => null);
        if (data && data.errors) {
          showToast(data.errors.map(err => err.message).join(", "), "error");
        } else {
          showToast("Failed to send message. Please try again later.", "error");
        }
      }
    } catch (error) {
      showToast("Network connection error. Please try again later.", "error");
    } finally {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalBtnText;
    }
  });
}

// Toast Notification Manager
let toastTimeout;
function showToast(message, type = "success") {
  if (!toast) return;

  clearTimeout(toastTimeout);
  toast.textContent = message;
  toast.className = `show ${type}`;

  toastTimeout = setTimeout(() => {
    toast.className = toast.className.replace("show", "").trim();
  }, 4000);
}

// Download CV trigger
const downloadButtons = document.querySelectorAll('.download-cv-btn');
downloadButtons.forEach(btn => {
  btn.addEventListener('click', function() {
    showToast("Starting CV download...", "success");
  });
});
