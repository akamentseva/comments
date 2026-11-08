import { saveAuth } from "./auth.js";

export function renderLoginPage(onLoginSuccess) {
  const container = document.querySelector(".container");

  container.innerHTML = `
    <div class="login-form">
      <input id="login-input" placeholder="Логин" />
      <input id="password-input" type="password" placeholder="Пароль" />
      <button id="login-btn">Войти</button>
      <p id="login-error" style="color: red;"></p>
    </div>
  `;

  const loginInput = document.getElementById("login-input");
  const passwordInput = document.getElementById("password-input");
  const loginBtn = document.getElementById("login-btn");
  const errorEl = document.getElementById("login-error");

  loginBtn.addEventListener("click", async () => {
    const login = loginInput.value.trim();
    const password = passwordInput.value.trim();
    errorEl.textContent = "";

    if (!login || !password) {
      errorEl.textContent = "Введите логин и пароль";
      return;
    }

    try {
      const response = await fetch(
        "https://wedev-api.sky.pro/api/v2/akamentseva/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ login, password }),
        },
      );

      if (!response.ok) {
        errorEl.textContent = "Неверный логин или пароль";
        return;
      }

      const data = await response.json();
      const token = data.user.token;
      const name = data.user.name;

      saveAuth(token, name);
      onLoginSuccess();
    } catch (err) {
      errorEl.textContent = "Ошибка сети, попробуйте снова";
    }
  });
}
