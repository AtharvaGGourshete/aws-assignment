import jwt from "jsonwebtoken";

export const signToken = (user) =>
  jwt.sign(
    {
      id: user.id,
      email: user.email,
      fullName: user.full_name
    },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
