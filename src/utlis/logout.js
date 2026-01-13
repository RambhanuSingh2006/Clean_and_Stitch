export const logoutUser = (navigate, clearCart) => {
  localStorage.removeItem("token");
  clearCart?.(); // optional
  navigate("/", { replace: true });
};
