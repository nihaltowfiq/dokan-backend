export class GeneratorHelper {
  private static readonly CHARACTERS = 'abcdefghijklmnopqrstuvwxyz0123456789';
  private static readonly ID_LENGTH = 10;

  static generateUniqueId(): string {
    const timestamp = Date.now().toString(36); // Converts current timestamp to a base-36 string
    let randomString = '';
    const charactersLength = this.CHARACTERS.length;

    // Generate a random string with the remaining length
    for (let i = 0; i < this.ID_LENGTH - timestamp.length; i++) {
      randomString += this.CHARACTERS.charAt(
        Math.floor(Math.random() * charactersLength),
      );
    }

    return timestamp + randomString; // Concatenate timestamp and random string
  }
}
