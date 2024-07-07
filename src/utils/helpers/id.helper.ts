export class GeneratorHelper {
  private static readonly CHARACTERS = 'abcdefghijklmnopqrstuvwxyz0123456789';
  private static readonly ID_LENGTH = 10;

  static generateCustomerId(): string {
    const timestamp = Date.now().toString(36);
    let randomString = '';
    const charactersLength = this.CHARACTERS.length;

    for (let i = 0; i < this.ID_LENGTH - timestamp.length; i++) {
      randomString += this.CHARACTERS.charAt(
        Math.floor(Math.random() * charactersLength),
      );
    }

    return 'dkn' + timestamp + randomString;
  }

  static generateSlug(name: string): string {
    return name
      .toLowerCase()
      .replace(/\s+/g, '-') // replace spaces with hyphens
      .replace(/[^\w\-]+/g, '') // remove non-word characters except hyphens
      .replace(/\-\-+/g, '-') // replace multiple hyphens with single hyphen
      .replace(/^-+/, '') // remove leading hyphens
      .replace(/-+$/, ''); // remove trailing hyphens
  }
}
