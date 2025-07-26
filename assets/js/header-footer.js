document.addEventListener("DOMContentLoaded", () => {
  const boutonMembre = document.querySelector(".btn-success");
  const boutonInscription = document.querySelector(".btn-outline-primary");
  const container = document.querySelector(".container.my-5");

  if (!boutonMembre || !boutonInscription || !container) return;

  boutonMembre.addEventListener("click", (e) => {
    e.preventDefault();
    container.insertAdjacentHTML("beforeend", `
      <div class="mt-4">
        <h5>Connexion</h5>
        <form>
          <input type="email" placeholder="Email" class="form-control mb-2" required />
          <input type="password" placeholder="Mot de passe" class="form-control mb-2" required />
          <button class="btn btn-success">Se connecter</button>
        </form>
      </div>
    `);
  });

  boutonInscription.addEventListener("click", (e) => {
    e.preventDefault();
    container.insertAdjacentHTML("beforeend", `
      <div class="mt-4">
        <h5>Inscription</h5>
        <form>
          <input type="text" placeholder="Nom complet" class="form-control mb-2" required />
          <input type="email" placeholder="Email" class="form-control mb-2" required />
          <input type="password" placeholder="Mot de passe" class="form-control mb-2" required />
          <button class="btn btn-primary">S’inscrire</button>
        </form>
      </div>
    `);
  });
});