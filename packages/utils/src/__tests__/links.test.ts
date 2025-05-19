import { appendWithBaseUrl } from '../links';

process.env.BASE_URL = 'http://localhost';

describe('Links', () => {
  it('should correctly return base url links', () => {
    const url = appendWithBaseUrl('/test');

    expect(url).toBe('http://localhost/test');
  });
});
