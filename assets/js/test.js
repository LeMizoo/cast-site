// test.js
document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("btn-test");
  const output = document.getElementById("test-output");

  if (btn && output) {
    btn.addEventListener("click", () => {
      output.innerHTML = "<strong>✅ JavaScript fonctionne !</strong>";
    });
  } else {
    console.error("Bouton ou container introuvable");
  }
});