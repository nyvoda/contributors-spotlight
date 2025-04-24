import https from 'https';

export class NetworkUtils {
  static async httpsGet(url: string): Promise<string> {
    return new Promise((resolve, reject) => {
      https
        .get(url, res => {
          let data = '';

          res.on('data', chunk => (data += chunk));
          res.on('end', () => {
            if (res.statusCode === 200) {
              resolve(data);
            } else {
              reject(new Error(`Request failed with status code ${res.statusCode}`));
            }
          });
        })
        .on('error', reject);
    });
  }

  static async fetchJson<T>(url: string): Promise<T> {
    const data = await this.httpsGet(url);
    return JSON.parse(data) as T;
  }
}
