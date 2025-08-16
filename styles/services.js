// ===== SHARED NAVIGATION FUNCTIONALITY =====
class NavigationService {
  constructor() {
    this.hamburger = null;
    this.navMenu = null;
    this.header = null;
    this.init();
  }

  init() {
    // Wait for DOM to be ready
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", () => this.setup());
    } else {
      this.setup();
    }
  }

  setup() {
    this.hamburger = document.querySelector(".hamburger");
    this.navMenu = document.querySelector(".nav-menu");
    this.header = document.querySelector(".banner");

    this.setupMobileMenu();
    this.setupScrollEffect();
    this.setupSmoothScrolling();
  }

  setupMobileMenu() {
    if (!this.hamburger || !this.navMenu) return;

    // Mobile menu toggle
    this.hamburger.addEventListener("click", () => {
      this.hamburger.classList.toggle("active");
      this.navMenu.classList.toggle("active");
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll(".nav-link").forEach((link) => {
      link.addEventListener("click", () => {
        this.hamburger.classList.remove("active");
        this.navMenu.classList.remove("active");
      });
    });
  }

  setupScrollEffect() {
    if (!this.header) return;

    // Add scroll effect to header
    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        this.header.classList.add("scrolled");
      } else {
        this.header.classList.remove("scrolled");
      }
    });
  }

  setupSmoothScrolling() {
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute("href"));
        if (target) {
          target.scrollIntoView({
            behavior: "smooth",
          });
        }
      });
    });
  }
}

// ===== SANDBOX FUNCTIONALITY =====
class SandboxService {
  constructor() {
    this.htmlEditor = null;
    this.cssEditor = null;
    this.previewFrame = null;
    this.timeout = null;
    this.init();
  }

  init() {
    // Only initialize if we're on the sandbox page
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", () => this.setup());
    } else {
      this.setup();
    }
  }

  setup() {
    this.htmlEditor = document.getElementById("htmlEditor");
    this.cssEditor = document.getElementById("cssEditor");
    this.previewFrame = document.getElementById("previewFrame");

    // Only setup if elements exist (sandbox page)
    if (this.htmlEditor && this.cssEditor && this.previewFrame) {
      this.setupEditors();
      this.runCode(); // Auto-run on page load
    }
  }

  setupEditors() {
    // Auto-run code when typing (with debounce)
    this.htmlEditor.addEventListener("input", () => this.debounceRun());
    this.cssEditor.addEventListener("input", () => this.debounceRun());
  }

  runCode() {
    if (!this.htmlEditor || !this.cssEditor || !this.previewFrame) return;

    const htmlCode = this.htmlEditor.value;
    const cssCode = this.cssEditor.value;

    // Create the complete HTML document with embedded CSS
    const fullHTML = htmlCode.replace(
      "</head>",
      `<style>${cssCode}</style></head>`
    );

    // Update the iframe
    const blob = new Blob([fullHTML], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    this.previewFrame.src = url;
  }

  clearCode() {
    if (!this.htmlEditor || !this.cssEditor) return;

    if (confirm("Are you sure you want to clear all code?")) {
      this.htmlEditor.value =
        '<!DOCTYPE html>\n<html lang="en">\n<head>\n    <meta charset="UTF-8">\n    <meta name="viewport" content="width=device-width, initial-scale=1.0">\n    <title>My Website</title>\n</head>\n<body>\n    \n</body>\n</html>';
      this.cssEditor.value = "";
      this.runCode();
    }
  }

  loadExample() {
    if (!this.htmlEditor || !this.cssEditor) return;

    this.htmlEditor.value = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Card</title>
</head>
<body>
    <div class="card">
        <h2>Card</h2>
        <p>This is an example of a card component with modern styling.</p>
        <button class="btn">Learn More</button>
    </div>
</body>
</html>`;

    this.cssEditor.value = `body {
    margin: 0;
    padding: 40px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    font-family: 'Arial', sans-serif;
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
}

.card {
    background: white;
    padding: 2rem;
    border-radius: 16px;
    box-shadow: 0 10px 30px rgba(0,0,0,0.2);
    text-align: center;
    max-width: 400px;
    transform: translateY(0);
    transition: all 0.3s ease;
}

.card:hover {
    transform: translateY(-10px);
    box-shadow: 0 20px 40px rgba(0,0,0,0.3);
}

h2 {
    color: #2d3748;
    margin-bottom: 1rem;
    font-size: 1.8rem;
}

p {
    color: #4a5568;
    margin-bottom: 2rem;
    line-height: 1.6;
}

.btn {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    border: none;
    padding: 12px 24px;
    border-radius: 25px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
}

.btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(102, 126, 234, 0.4);
}`;
    this.runCode();
  }

  debounceRun() {
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => this.runCode(), 500);
  }
}

// ===== CONTACT FORM FUNCTIONALITY =====
class ContactService {
  constructor() {
    this.form = null;
    this.submitBtn = null;
    this.formStatus = null;
    this.init();
  }

  init() {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", () => this.setup());
    } else {
      this.setup();
    }
  }

  setup() {
    this.form = document.getElementById("contactForm");
    this.submitBtn = document.querySelector(".submit-btn");
    this.formStatus = document.getElementById("formStatus");

    if (this.form) {
      this.setupForm();
    }
  }

  setupForm() {
    this.form.addEventListener("submit", (e) => this.handleSubmit(e));
  }

  async handleSubmit(e) {
    e.preventDefault();

    // Get form data
    const formData = new FormData(this.form);
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      subject: formData.get("subject"),
      message: formData.get("message"),
    };

    // Validate form
    if (!this.validateForm(data)) {
      return;
    }

    // Show loading state
    this.setLoadingState(true);

    // Simulate processing time
    setTimeout(() => {
      this.showStatus("success", "Thanks! \nYou enail was sent successfully!");
      this.form.reset();
      this.setLoadingState(false);
    }, 1000);
  }

  validateForm(data) {
    // Basic validation
    if (!data.name.trim()) {
      this.showStatus("error", "Please enter your name.");
      return false;
    }

    if (!data.email.trim() || !this.isValidEmail(data.email)) {
      this.showStatus("error", "Please enter a valid email address.");
      return false;
    }

    if (!data.subject.trim()) {
      this.showStatus("error", "Please enter a subject.");
      return false;
    }

    if (!data.message.trim() || data.message.trim().length < 10) {
      this.showStatus("error", "Please enter a message with at least 10 characters.");
      return false;
    }

    return true;
  }

  isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }


  setLoadingState(loading) {
    if (!this.submitBtn) return;

    const btnText = this.submitBtn.querySelector(".btn-text");
    const btnLoading = this.submitBtn.querySelector(".btn-loading");

    if (loading) {
      btnText.style.display = "none";
      btnLoading.style.display = "inline-flex";
      this.submitBtn.disabled = true;
    } else {
      btnText.style.display = "inline";
      btnLoading.style.display = "none";
      this.submitBtn.disabled = false;
    }
  }

  showStatus(type, message) {
    if (!this.formStatus) return;

    this.formStatus.className = `form-status ${type}`;
    this.formStatus.textContent = message;
    this.formStatus.style.display = "block";

    // Auto-hide status after 10 seconds
    setTimeout(() => {
      this.formStatus.style.display = "none";
    }, 10000);
  }
}

// ===== GLOBAL SERVICES INITIALIZATION =====
class WebDevGuideApp {
  constructor() {
    this.navigationService = new NavigationService();
    this.sandboxService = new SandboxService();
    this.contactService = new ContactService();
    this.setupGlobalFunctions();
  }

  setupGlobalFunctions() {
    // Make sandbox functions globally available for onclick handlers
    window.runCode = () => {
      if (this.sandboxService) {
        this.sandboxService.runCode();
      }
    };

    window.clearCode = () => {
      if (this.sandboxService) {
        this.sandboxService.clearCode();
      }
    };

    window.loadExample = () => {
      if (this.sandboxService) {
        this.sandboxService.loadExample();
      }
    };
  }
}

// Initialize the application
const webDevGuideApp = new WebDevGuideApp();
