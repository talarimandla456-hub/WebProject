
 // --- Carousel Logic ---
const slides = ["Image 1", "Image 2", "Image 3"];
let currentIndex = 0;

const text = document.getElementById("carousel-text");
const dots = document.querySelectorAll(".dot");
const nextBtn = document.getElementById("next");
const prevBtn = document.getElementById("prev");

function updateCarousel() {
  text.textContent = slides[currentIndex];
  dots.forEach(dot => dot.classList.remove("active"));
  dots[currentIndex].classList.add("active");
}

nextBtn.addEventListener("click", () => {
  currentIndex = (currentIndex + 1) % slides.length;
  updateCarousel();
});

prevBtn.addEventListener("click", () => {
  currentIndex = (currentIndex - 1 + slides.length) % slides.length;
  updateCarousel();
});

dots.forEach((dot, index) => {
  dot.addEventListener("click", () => {
    currentIndex = index;
    updateCarousel();
  });
});


// --- Form Validation & Preview Logic ---

const submitBtn = document.getElementById("submitBtn");
const inputs = document.querySelectorAll(".validate");
const checkBoxes = document.querySelectorAll(".chk");
const formPreview = document.querySelector(".form-preview");

submitBtn.addEventListener("click", (e) => {
  e.preventDefault(); 
  
  let isValid = true;

  // 1. Validate Text, Email, Number, and Select inputs
  inputs.forEach((input) => {
    let errorMessage = "";
    const value = input.value.trim();

    if (value === "") {
      errorMessage = "This field is required";
    } 
    else if (input.type === "email") {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(value)) {
        errorMessage = "Invalid email address";
      }
    } 
    else if (input.type === "tel") {
      const phonePattern = /^[0-9]{10}$/; 
      if (!phonePattern.test(value)) {
        errorMessage = "Invalid mobile number (10 digits)";
      }
    }

    if (errorMessage !== "") {
      isValid = false;
      showError(input, errorMessage);
    }
  });

  // 2. Validate Checkboxes
  let selectedLanguages = [];
  checkBoxes.forEach(box => {
    if(box.checked) selectedLanguages.push(box.name);
  });

  if(selectedLanguages.length === 0) {
    isValid = false;
    const langContainer = document.getElementById("lang-error");
    
    if(!langContainer.querySelector(".error-text")) {
        const errorDiv = document.createElement("div");
        errorDiv.className = "error-text";
        errorDiv.innerText = "Please select at least one language";
        langContainer.appendChild(errorDiv);
        
        setTimeout(() => { errorDiv.remove(); }, 3000);
    }
  }

  // 3. Success Action: Show Preview and Map Data
  if (isValid) {
    // Make the preview section visible
    formPreview.style.display = "block";

    // Map Input Values to Preview Spans
    const previewSpans = formPreview.querySelectorAll("span");
    
    // Map standard inputs (first name, last name, etc.)
    // Note: This follows the order of your HTML inputs
    inputs.forEach((input, index) => {
        if(previewSpans[index]) {
            previewSpans[index].textContent = input.value;
        }
    });

    // Specifically handle the languages span (which is previewSpans[index 8] in your HTML)
    const langSpan = Array.from(previewSpans).find(span => 
        span.parentElement.textContent.includes("Languages")
    );
    if(langSpan) langSpan.textContent = selectedLanguages.join(", ");

    // Button Success State
    submitBtn.textContent = "Submitted Successfully!";
    submitBtn.classList.add("success");
    
    // Clear all fields
    inputs.forEach(input => input.value = "");
    checkBoxes.forEach(box => box.checked = false);

    setTimeout(() => {
        submitBtn.textContent = "Submit";
        submitBtn.classList.remove("success");
    }, 3000);

    // Scroll to preview automatically
    formPreview.scrollIntoView({ behavior: 'smooth' });
  }
});

function showError(inputElement, message) {
  const parent = inputElement.parentElement; 
  if (parent.querySelector(".error-text")) return;

  const errorDiv = document.createElement("div");
  errorDiv.className = "error-text";
  errorDiv.innerText = message;
  parent.appendChild(errorDiv);

  setTimeout(() => { errorDiv.remove(); }, 3000);
}
