// This provides protection against attacks such as cross-site request forgery. See RFC-6749.
// https://datatracker.ietf.org/doc/html/rfc6749#section-4.1
export const generateRandomString = (length: number) => {
  const possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const values = crypto.getRandomValues(new Uint8Array(length));
  return values.reduce((acc, x) => acc + possible[x % possible.length], "");
};
