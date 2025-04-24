import { RepositoryInfo } from './types';
import { execSync } from 'child_process';

export class RepositoryContext {
  static get(): RepositoryInfo {
    if (process.env.GITHUB_REPOSITORY) {
      const [owner, repo] = process.env.GITHUB_REPOSITORY.split('/');
      return { owner, repo };
    }

    try {
      const gitRemote = execSync('git remote get-url origin').toString().trim();

      const match = gitRemote.match(/github\.com[/:](.+?)\/(.+?)(?:\.git)?$/);
      if (match && match[1] && match[2]) {
        return { owner: match[1], repo: match[2] };
      }
    } catch (error) {
      console.error('Error detecting git remote:', error);
    }

    throw new Error('Could not detect repository context');
  }
}
