// assets/js/authForms.js

export function afficherFormulaireConnexion() {
  const container = document.getElementById("form-container");
  container.innerHTML = `
    <form id="login-form" class="mt-3">
      <div class="mb-3">
        <label for="login-email" class="form-label">Email</label>
        <input type="email" class="form-control" id="login-email" required />
      </div>
      <div class="mb-3">
        <label for="login-password" class="form-label">Mot de passe</label>
        <input type="password" class="form-control" id="login-password" required />
      </div>
      <button type="submit" class="btn btn-primary">Connexion</button>
    </form>
  `;
}

export function afficherFormulaireInscription() {
  const container = document.getElementById("form-container");
  container.innerHTML = `
    <form id="signup-form" class="mt-3">
      <div class="mb-3">
        <label for="signup-email" class="form-label">Email</label>
        <input type="email" class="form-control" id="signup-email" required />
      </div>
      <div class="mb-3">
        <label for="signup-password" class="form-label">Mot de passe</label>
        <input type="password" class="form-control" id="signup-password" required />
      </div>
      <div class="mb-3">
        <label for="signup-confirm" class="form-label">Confirmer mot de passe</label>
        <input type="password" class="form-control" id="signup-confirm" required />
      </div>
      <button type="submit" class="btn btn-success">Inscription</button>
    </form>
  `;
}