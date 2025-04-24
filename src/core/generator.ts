import { promises as fs } from 'fs';
import path from 'path';
import { Contributor } from './types';
import { ContributorFetcher } from './fetcher';
import { ContributorProcessor } from './processor';

const TEMPLATE_DIR = path.join(process.cwd(), 'src', 'templates');

export class SpotlightGenerator {
  static async generate(): Promise<void> {
    try {
      const contributors = await ContributorFetcher.fetch();
      const processed = ContributorProcessor.process(contributors);

      const [header, footer] = await Promise.all([
        this.readTemplate('header.md'),
        this.readTemplate('footer.md')
      ]);

      const content = this.buildContent(processed, header, footer);
      await fs.writeFile('SPOTLIGHT.md', content);
      console.log('Successfully generated SPOTLIGHT.md');
    } catch (error) {
      console.error(
        'Error generating spotlight:',
        error instanceof Error ? error.message : String(error)
      );
      process.exit(1);
    }
  }

  private static async readTemplate(name: string): Promise<string> {
    return fs.readFile(path.join(TEMPLATE_DIR, name), 'utf8');
  }

  private static buildContent(contributors: Contributor[], header: string, footer: string): string {
    const grid = contributors
      .map(
        c => `
      <a href="${c.html_url}" title="${c.login} (${c.contributions} commits)">
        <img src="${c.avatar_url}" width="100" alt="${c.login}" 
             style="border-radius:50%;transition:transform 0.3s ease;">
      </a>`
      )
      .join('\n');

    return `${header}\n\n<div style="
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
      gap: 15px;
      margin: 20px 0;">
      ${grid}
    </div>\n\n${footer.replace('{{DATE}}', new Date().toLocaleDateString())}`;
  }
}
