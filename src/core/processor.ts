import { Contributor, ProcessOptions } from './types';

export class ContributorProcessor {
  static process(contributors: Contributor[], options: ProcessOptions = {}): Contributor[] {
    const { maxContributors = 20, excludeBots = true, excludeOrgs = true } = options;

    return contributors
      .filter(c => !excludeBots || c.type === 'User')
      .filter(c => !excludeOrgs || !c.login.includes('[bot]'))
      .sort((a, b) => b.contributions - a.contributions)
      .slice(0, maxContributors);
  }
}
