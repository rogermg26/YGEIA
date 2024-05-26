import { login } from "./auth";
import { AtSymbolIcon, KeyIcon } from '@heroicons/react/24/outline';
import { ArrowRightIcon } from '@heroicons/react/20/solid';

import styles from "./login.module.css";

export default function LoginPage() {
  const handleLogin = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const success = await login(formData);
    if (success) {
      window.location.href = "/dashboard";
    } else {
      console.log("Login failed");
    }
  };

  return (
    <section>
      <form onSubmit={handleLogin} className={styles.loginForm}>
        <div className={styles.inputGroup}>
          <label htmlFor="email" className={styles.inputLabel}>Correu electrònic</label>
          <div className={styles.inputContainer}>
            <AtSymbolIcon className={styles.inputIcon} />
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Correu electrònic"
              className={styles.input}
            />
          </div>
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="password" className={styles.inputLabel}>Contrasenya</label>
          <div className={styles.inputContainer}>
            <KeyIcon className={styles.inputIcon} />
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Contrasenya"
              className={styles.input}
            />
          </div>
        </div>
        <button type="submit" className={styles.loginButton}>
          Iniciar sessió <ArrowRightIcon className={styles.loginButtonIcon} />
        </button>
      </form>
    </section>
  );
}
