/ --- Carousel Logic (Original) ---
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


// --- Form Validation Logic (New) ---

const submitBtn = document.getElementById("submitBtn");
// Select all inputs that have the 'validate' class
const inputs = document.querySelectorAll(".validate");
const checkBoxes = document.querySelectorAll(".chk");

submitBtn.addEventListener("click", (e) => {
  e.preventDefault(); // Stop form submission
  
  let isValid = true;

  // 1. Validate Text, Email, Number, and Select inputs
  inputs.forEach((input) => {
    let errorMessage = "";
    const value = input.value.trim();

    // Check if empty
    if (value === "") {
      errorMessage = "This field is required";
    } 
    // Specific check for Email
    else if (input.type === "email") {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(value)) {
        errorMessage = "Invalid email address";
      }
    } 
    // Specific check for Mobile Number
    else if (input.type === "tel") {
      const phonePattern = /^[0-9]{10}$/; // Assumes 10 digit number
      if (!phonePattern.test(value)) {
        errorMessage = "Invalid mobile number (10 digits)";
      }
    }

    // If there is an error, show it
    if (errorMessage !== "") {
      isValid = false;
      showError(input, errorMessage);
    }
  });

  // 2. Validate Checkboxes (Languages) - At least one must be checked
  let isChecked = false;
  checkBoxes.forEach(box => {
    if(box.checked) isChecked = true;
  });

  if(!isChecked) {
    isValid = false;
    const langContainer = document.getElementById("lang-error");
    
    // Custom logic to show error for checkboxes since they are in a different layout
    if(!langContainer.querySelector(".error-text")) {
        const errorDiv = document.createElement("div");
        errorDiv.className = "error-text";
        errorDiv.innerText = "Please select at least one language";
        langContainer.appendChild(errorDiv);
        
        setTimeout(() => {
            errorDiv.remove();
        }, 3000);
    }
  }

  // 3. Success Action
  if (isValid) {
    // Change button style
    submitBtn.textContent = "Submitted Successfully!";
    submitBtn.classList.add("success");
    
    // Clear all fields
    inputs.forEach(input => input.value = "");
    checkBoxes.forEach(box => box.checked = false);

    // Optional: Revert button text after a few seconds
    setTimeout(() => {
        submitBtn.textContent = "Submit";
        submitBtn.classList.remove("success");
    }, 3000);
  }
});

// Helper function to display error messages
function showError(inputElement, message) {
  const parent = inputElement.parentElement; // The .input-wrapper div
  
  // Check if an error message is already displayed to prevent duplicates
  if (parent.querySelector(".error-text")) {
    return;
  }

  const errorDiv = document.createElement("div");
  errorDiv.className = "error-text";
  errorDiv.innerText = message;
  
  parent.appendChild(errorDiv);

  // Remove the error message after 3 seconds
  setTimeout(() => {
    errorDiv.remove();
  }, 3000);
}