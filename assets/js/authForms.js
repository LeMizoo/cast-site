<script>
  // Afficher le formulaire correspondant au bouton cliqué
  document.addEventListener("DOMContentLoaded", () => {
    const btnLogin = document.getElementById("btn-deja");
    const btnSignup = document.getElementById("btn-nouveau");
    const formAuth = document.getElementById("formulaire-auth");
    const formConnexion = document.getElementById("form-connexion");
    const formInscription = document.getElementById("form-inscription");

    btnLogin.addEventListener("click", () => {
      formAuth.style.display = "block";
      formConnexion.style.display = "block";
      formInscription.style.display = "none";
    });

    btnSignup.addEventListener("click", () => {
      formAuth.style.display = "block";
      formConnexion.style.display = "none";
      formInscription.style.display = "block";
    });
  });
</script>