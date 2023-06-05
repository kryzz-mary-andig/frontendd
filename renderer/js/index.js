// Form Submit
const movie_form = document.getElementById("movie_form");
const movie_title = document.getElementById("movie_title");
const emoji_response = document.getElementById("emoji_response");
if (movie_form) {
  movie_form.onsubmit = async function (e) {
    e.preventDefault();

    const btn_submit = document.querySelector("#movie_form button[type='submit']");
    btn_submit.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Submit';
    btn_submit.disabled = true;

    let movie_title_value = movie_title.value;

    if (movie_title_value.length <= 2) {
      alertMessage("error", "Please input another text!");
      btn_submit.innerHTML = 'Submit';
      btn_submit.disabled = false;
      return;
    }

    try {
      // Show loading animation
      btn_submit.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Submit';

      const response = await window.axios.openAI(movie_title_value);
      let emoji_response_value = response.choices[0].text;
      emoji_response.value = emoji_response_value.replace(/\n/g, "");

      await window.axios.supaBase('post', 'https://txaucvkwqhoiwerjlweg.supabase.co/rest/v1/movie_form', {
        movie_title: movie_title_value,
        emoji_response: emoji_response_value,
      });

      alertMessage("success", "Emoji generated and saved successfully!");
    } catch (error) {
      alertMessage("error", "An error occurred. Please try again later.");
    } finally {
      // Reset submit button
      btn_submit.innerHTML = 'Submit';
      btn_submit.disabled = false;
    }
  };
}

// Alert Message
function alertMessage(type, message) {
  const alertDiv = document.createElement("div");
  alertDiv.className = `alert alert-${type} alert-dismissible fade show`;
  alertDiv.innerHTML = `<button type="button" class="btn-close" data-bs-dismiss="alert"></button>${message}`;
  document.body.prepend(alertDiv);

  setTimeout(() => {
    alertDiv.remove();
  }, 3000);
}
