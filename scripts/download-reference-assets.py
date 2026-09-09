import concurrent.futures
import hashlib
import json
import pathlib
import re
import urllib.parse
import urllib.request
from html.parser import HTMLParser

ROOT = pathlib.Path(__file__).resolve().parents[1]
SOURCE = ROOT / 'docs/research/navercorp-65983208/main-c98712e4/source'
DEST = ROOT / 'public/sites/navercorp-65983208/main-c98712e4'
PUBLIC = '/sites/navercorp-65983208/main-c98712e4/'
CSS_BASE = 'https://www.navercorp.com/_app/immutable/assets/0.CQ3BoULZ.css'
BASE = 'https://www.navercorp.com/main'
css = (SOURCE / 'main.css').read_text()
urls = set()

def absolute(value, base):
    value = value.strip().strip('"\'')
    if not value or value.startswith(('data:', 'blob:', '#')):
        return None
    return urllib.parse.urljoin(base, value)

for value in re.findall(r'url\(([^)]+)\)', css):
    url = absolute(value, CSS_BASE)
    if url: urls.add(url)

class Assets(HTMLParser):
    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        values = []
        if tag in ('img', 'source', 'video', 'audio'):
            values += [attrs.get('src', ''), attrs.get('poster', '')]
            for part in attrs.get('srcset', '').split(','):
                if part.strip(): values.append(part.strip().split()[0])
        if tag == 'link' and 'icon' in attrs.get('rel', ''):
            values.append(attrs.get('href', ''))
        for value in re.findall(r'url\(([^)]+)\)', attrs.get('style', '')):
            values.append(value)
        for value in values:
            url = absolute(value, BASE)
            if url: urls.add(url)

Assets().feed((SOURCE / 'main.html').read_text())
swiper = 'https://www.navercorp.com/_app/immutable/assets/swiper-bundle.CXe816k3.css'
urls.add(swiper)
DEST.mkdir(parents=True, exist_ok=True)

def download(url):
    parsed = urllib.parse.urlsplit(url)
    name = pathlib.PurePosixPath(urllib.parse.unquote(parsed.path)).name
    name = re.sub(r'[^a-zA-Z0-9._-]', '_', name)
    filename = hashlib.sha256(url.encode()).hexdigest()[:10] + '-' + name
    if url == swiper: filename = 'swiper.css'
    try:
        encoded = urllib.parse.urlunsplit((parsed.scheme, parsed.netloc, urllib.parse.quote(parsed.path, safe='/%:@'), urllib.parse.quote(parsed.query, safe='=&%:@/?'), ''))
        request = urllib.request.Request(encoded, headers={'User-Agent': 'Mozilla/5.0', 'Referer': BASE})
        with urllib.request.urlopen(request, timeout=60) as response:
            data = response.read()
        (DEST / filename).write_bytes(data)
        return url, PUBLIC + filename, None
    except Exception as error:
        return url, None, str(error)

manifest, failures = {}, {}
with concurrent.futures.ThreadPoolExecutor(max_workers=8) as pool:
    for url, path, error in pool.map(download, sorted(urls)):
        if error: failures[url] = error
        else: manifest[url] = path

def replace(match):
    url = absolute(match.group(1), CSS_BASE)
    return 'url("' + manifest[url] + '")' if url in manifest else match.group(0)

(DEST / 'reference.css').write_text(re.sub(r'url\(([^)]+)\)', replace, css))
(DEST / 'asset-manifest.json').write_text(json.dumps(manifest, ensure_ascii=False, indent=2))
(DEST / 'asset-failures.json').write_text(json.dumps(failures, ensure_ascii=False, indent=2))
print(json.dumps({'downloaded': len(manifest), 'failed': len(failures), 'failures': failures}, ensure_ascii=False, indent=2))
