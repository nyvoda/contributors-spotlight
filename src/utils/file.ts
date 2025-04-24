import { promises as fs } from 'fs';
import path from 'path';

export class FileUtils {
  static async readFile(relativePath: string): Promise<string> {
    const absolutePath = path.join(process.cwd(), relativePath);
    return fs.readFile(absolutePath, 'utf8');
  }

  static async writeFile(relativePath: string, content: string): Promise<void> {
    const absolutePath = path.join(process.cwd(), relativePath);
    await fs.writeFile(absolutePath, content);
  }

  static async exists(relativePath: string): Promise<boolean> {
    try {
      await fs.access(path.join(process.cwd(), relativePath));
      return true;
    } catch {
      return false;
    }
  }
}
