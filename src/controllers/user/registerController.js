import bcrypt from 'bcrypt';
import { saveUser } from '../../database/queries/userQueries.js';
import { passwordValidator, emailValidator, nameValidator } from '../../services/verifyInput.js';
// Register the user and save it to the database
export const postUserRegistration = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const nameError = nameValidator(name);
    const emailError = emailValidator(email);
    const passwordError = passwordValidator(password);

    // Transforms the error output into an object, clearly stating the error and the field affected
    const errorValidator = [
      ...nameError.map((msg) => ({ field: 'Name', message: msg })),
      ...emailError.map((msg) => ({ field: 'E-mail', message: msg })),
      ...passwordError.map((msg) => ({ field: 'Password', message: msg })),
    ];

    if (errorValidator.length) {
      return res.status(400).json({
        success: false,
        error: errorValidator,
      });
    }

    const passwordHash = await bcrypt.hash(password, 6); // Transform the user's password into a hash

    const id = await saveUser(name, email, passwordHash);

    return res.status(201).json({
      success: true,
      message: `user ${name} created`,
      user: { id, name, email },
    });
  } catch (err) {
    console.log(err);
    if (err.code === '23505') {
      return res.status(409).json({
        success: false,
        message: 'E-mail already registered',
      });
    }
    return res.status(500).json({ err: 'Server error', message: err.message });
  }
};
