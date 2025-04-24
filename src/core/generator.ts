import { promises as fs } from 'fs';
import path from 'path';
import { Contributor } from './types';
import { ContributorFetcher } from './fetcher';
import { ContributorProcessor } from './processor';

const TEMPLATE_DIR = path.join(process.cwd(), 'src', 'templates');

export class ContributorsGenerator {
  static async generate(): Promise<void> {
    try {
      const contributors = await ContributorFetcher.fetch();
      const processed = ContributorProcessor.process(contributors);

      const [header, topContributorsTemplate, allContributorsTemplate, footer] = await Promise.all([
        this.readTemplate('header.md'),
        this.readTemplate('top-contributors.md'),
        this.readTemplate('all-contributors.md'),
        this.readTemplate('footer.md')
      ]);

      const content = this.buildContent(processed, {
        header,
        topContributorsTemplate,
        allContributorsTemplate,
        footer
      });

      await fs.writeFile('CONTRIBUTORS.md', content);
      console.log('Successfully generated CONTRIBUTORS.md');
    } catch (error) {
      console.error(
        'Error generating contributors:',
        error instanceof Error ? error.message : String(error)
      );
      process.exit(1);
    }
  }

  private static async readTemplate(name: string): Promise<string> {
    return fs.readFile(path.join(TEMPLATE_DIR, name), 'utf8');
  }

  private static buildContent(
    contributors: Contributor[],
    templates: {
      header: string;
      topContributorsTemplate: string;
      allContributorsTemplate: string;
      footer: string;
    }
  ): string {
    const currentDate = new Date().toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });

    const top5 = contributors.slice(0, 5);
    const allContributors = contributors;

    const renderContributor = (c: Contributor, size: number, extraStyle = '') =>
      templates.topContributorsTemplate
        .replace('{{AVATAR_URL}}', `${c.avatar_url}?s=${size}&r=g`)
        .replace('{{PROFILE_URL}}', c.html_url)
        .replace('{{USERNAME}}', c.login)
        .replace('{{COMMITS}}', c.contributions.toString())
        .replace('{{WIDTH}}', size.toString())
        .replace('<div align="center"', `<div align="center" style="${extraStyle}"`);

    // Top contributors with more spacing
    const topContributors = top5.map(c => renderContributor(c, 100, 'margin: 20px;')).join('\n');

    // All contributors in a tight grid
    const allContributorsGrid = allContributors
      .map(c => renderContributor(c, 80, 'margin: 5px;'))
      .join('\n');

    return [
      templates.header.trim(),
      `<div style="display: flex; flex-wrap: wrap; justify-content: center; gap: 10px;">${topContributors}</div>`,
      templates.allContributorsTemplate.replace('{{CONTRIBUTORS_GRID}}', allContributorsGrid),
      templates.footer.replace('{{DATE}}', currentDate)
    ].join('\n\n');
  }
}

(async () => {
  console.log('Generating CONTRIBUTORS.md...');
  await ContributorsGenerator.generate();
})();
