import https from 'https';
import { RepositoryContext } from './context';
import { Contributor } from './types';

export class ContributorFetcher {
  static async fetch(): Promise<Contributor[]> {
    const { owner, repo } = RepositoryContext.get();
    const url = `https://api.github.com/repos/${owner}/${repo}/contributors?per_page=100`;

    return new Promise((resolve, reject) => {
      https
        .get(
          url,
          {
            headers: { 'User-Agent': 'Contributors-Spotlight' }
          },
          res => {
            let data = '';

            res.on('data', chunk => (data += chunk));
            res.on('end', () => {
              if (res.statusCode === 403 && res.headers['x-ratelimit-remaining'] === '0') {
                const resetTime = new Date(Number(res.headers['x-ratelimit-reset']) * 1000);
                reject(new Error(`GitHub API rate limit exceeded. Try again after ${resetTime}`));
              } else if (res.statusCode !== 200) {
                reject(new Error(`GitHub API error: ${res.statusCode}`));
              } else {
                try {
                  resolve(JSON.parse(data));
                } catch (e) {
                  reject(e);
                }
              }
            });
          }
        )
        .on('error', reject);
    });
  }
}
