import { sendReview } from './api.js';

document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".php-email-form");
  if (!form) return;

  const stars = document.querySelectorAll("#starRating i");
  const ratingInput = document.getElementById("ratingValue");

  stars.forEach((star) => {
    star.addEventListener("click", () => {
      const value = parseInt(star.getAttribute("data-value"));
      ratingInput.value = value;
      stars.forEach((s, i) => s.classList.toggle("active", i < value));
    });
  });

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    console.log("Submit clicked");

    const personName = form.querySelector("input[name='name']").value;
    const rating = ratingInput.value;
    const comment = form.querySelector("textarea[name='message']").value;

    console.log({ personName, rating, comment });

    const loading = form.querySelector(".loading");
    const error = form.querySelector(".error-message");
    const success = form.querySelector(".sent-message");

    loading.style.display = 'block';
    error.style.display = 'none';
    success.style.display = 'none';

    try {
      await sendReview({ personName, rating, comment });
      success.style.display = 'block';
      form.reset();
      ratingInput.value = "";
      stars.forEach(star => star.classList.remove("active"));
    } catch (err) {
      error.textContent = 'Failed to send review. Please try again.';
      error.style.display = 'block';
    } finally {
      loading.style.display = 'none';
    }
  });
});
