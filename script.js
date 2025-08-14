document.getElementById('year').textContent = new Date().getFullYear();

const form = document.getElementById('contactForm');
const toast = document.getElementById('toast');

form.addEventListener('submit', async function(e) {
  e.preventDefault();

  const fname = form.firstName.value.trim();
  const email = form._replyto.value.trim();
  const message = form.message.value.trim();

  if (!fname || !email || !message) {
    showToast("Please fill in all required fields.", "error");
    return;
  }




  try {
    const res = await fetch(form.action, {
      method: 'POST',
      body: new FormData(form),
      headers: { 'Accept': 'application/json' }
    });

    if (res.ok) {
      showToast("Message sent successfully. Thank you!", "success");
      form.reset();
    } else {
      showToast("Error sending message. Please try again later.", "error");
    }
  } catch (error) {
    showToast("Network error. Please try again later.", "error");
  }
});

function showToast(message, type) {
  toast.textContent = message;
  toast.className = `show ${type}`;
  setTimeout(() => {
    toast.className = toast.className.replace("show", "");
  }, 3000);
}


