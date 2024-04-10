import bcrypt from "bcrypt";

const saltRounds = parseInt(process.env.SALT as string, 10) || 10;

export async function hashPassword(password: string): Promise<string> {
  try {
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
  } catch (error) {
    throw new Error("Error hashing password");
  }
}

export async function comparePassword(
  password: string,
  hashedPassword: string,
): Promise<boolean> {
  try {
    const match = await bcrypt.compare(password, hashedPassword);
    return match;
  } catch (error) {
    throw new Error("Error comparing passwords");
  }
}
