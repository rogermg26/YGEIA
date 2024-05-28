
export async function login(formData: FormData): Promise<boolean> {
    // Hard-coded credentials (replace with your authentication logic)
    const email = formData.get("email");
    const password = formData.get("password");
    if (email === "usuari@ics.cat" && password === "salutmental") {
      // Create the session
      const user = { email, name: "John" };
      const expires = new Date(Date.now() + 10 * 1000);
      const session = JSON.stringify({ user, expires });
    
      // Save the session in a cookie
      document.cookie = `session=${encodeURIComponent(session)}; expires=${expires.toUTCString()}; path=/;`;
      return true; // Login successful
    } else {
      return false; // Login failed
    }
  }
  
  export async function logout() {
    // Destroy the session
    document.cookie = `session=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  }
  
  export async function getSession(): Promise<any> {
    const cookies = Object.fromEntries(document.cookie.split("; ").map(cookie => cookie.split("=")));
    const session = cookies["session"];
    if (!session) return null;
    return JSON.parse(decodeURIComponent(session));
  }
  