export function useLogout() {
  const logout = () => {
    // clear auth data
    localStorage.removeItem("token");
    localStorage.removeItem("role");

    // do a full-page replace to /login so the protected page is removed from history
    // and the user cannot navigate back to it using the browser back button
    window.location.replace('/login');
  };

  return logout;
}
