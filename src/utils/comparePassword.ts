import bcrypt from 'bcrypt';

export async function comparePassword(myPlaintextPassword: string, hash: string) {
    const response = await bcrypt.compare(myPlaintextPassword, hash);
    return response;
}
