import { validationResult, body } from "express-validator";

export const validationError = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

export const validationUseOrpassRegister = [
  body("email", "Formato de email incorrecto").trim().isEmail(),
  body("password", "minimo 6 caracteres").trim().isLength({ min: 5 }),

  validationError,
];

export const bodyLoginValidator = [
  body("email", "Formato de email incorrecto").trim().isEmail(),
  body("password", "Mínimo 6 carácteres").trim().isLength({ min: 6 }),
  validationError,
];
