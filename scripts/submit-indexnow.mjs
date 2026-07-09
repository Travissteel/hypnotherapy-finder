// Submit all sitemap URLs to IndexNow (Bing, Seznam, Naver, Yandex, and AI crawlers that consume it).
// Run after a deploy that adds or meaningfully changes pages:
//   node scripts/submit-indexnow.mjs
// The key file must be live at https://hypnotherapy-finder.com/<key>.txt first.

const HOST = 'hypnotherapy-finder.com';
const KEY = '8ea1efe48244f06a73d2b544defd8822';

async function main() {
  const res = await fetch(`https://${HOST}/sitemap.xml`);
  const xml = await res.text();
  const urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
  console.log(`Found ${urls.length} URLs in sitemap`);

  // IndexNow accepts up to 10,000 URLs per POST
  const response = await fetch('https://api.indexnow.org/indexnow', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify({
      host: HOST,
      key: KEY,
      keyLocation: `https://${HOST}/${KEY}.txt`,
      urlList: urls,
    }),
  });
  console.log(`IndexNow response: ${response.status} ${response.statusText}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
