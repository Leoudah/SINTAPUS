import { loginService } from "../services/auth.service.js";

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password required" });
    }

    const result = await loginService(email, password);
    res.json(result);

  } catch (err) {
    res.status(401).json({ message: err.message });
  }
};
