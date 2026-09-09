"""Convert retained public HTML into reviewable React components; never run source scripts."""
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urljoin
import json,re
ROOT=Path(__file__).resolve().parents[1]
BASE='https://www.navercorp.com'
KEY='navercorp-65983208/main-c98712e4'
class Node:
 def __init__(self,tag='',attrs=None): self.tag=tag; self.attrs=dict(attrs or []);self.children=[]
 def has(self,cls): return cls in self.attrs.get('class','').split()
class Parser(HTMLParser):
 def __init__(self): super().__init__(convert_charrefs=True);self.root=Node();self.stack=[self.root]
 def handle_starttag(self,t,a):
  n=Node(t,a);self.stack[-1].children.append(n)
  if t not in void: self.stack.append(n)
 def handle_startendtag(self,t,a): self.handle_starttag(t,a)
 def handle_endtag(self,t):
  for i in range(len(self.stack)-1,0,-1):
   if self.stack[i].tag==t:self.stack=self.stack[:i];break
 def handle_data(self,d):self.stack[-1].children.append(d)
void={'img','br','hr','input','meta','link','source','area','base','embed','param','track','wbr'}
def walk(n):
 if isinstance(n,Node):
  yield n
  for c in n.children:yield from walk(c)
p=Parser();p.feed((ROOT/f'docs/research/{KEY}/source/main.html').read_text())
manifest_file=ROOT/f'public/sites/{KEY}/asset-manifest.json'
manifest=json.loads(manifest_file.read_text()) if manifest_file.exists() else {}
if isinstance(manifest,dict) and 'assets' in manifest:manifest=manifest['assets']
# Asset map is filled after download; source URLs remain exact until then.
def asset(v):
 u=urljoin(BASE,v)
 val=manifest.get(u,u) if isinstance(manifest,dict) else u
 return val if isinstance(val,str) else val.get('local',val.get('publicPath',u))
attrs_map={'class':'className','for':'htmlFor','tabindex':'tabIndex','srcset':'srcSet','autoplay':'autoPlay','playsinline':'playsInline','readonly':'readOnly','maxlength':'maxLength','crossorigin':'crossOrigin','viewbox':'viewBox','fill-rule':'fillRule','clip-rule':'clipRule','stroke-width':'strokeWidth','stroke-linecap':'strokeLinecap','stroke-linejoin':'strokeLinejoin'}
boolean={'disabled','checked','selected','multiple','required','autofocus','hidden','controls','loop','muted','autoplay','playsinline'}
def render(n,depth=0):
 if isinstance(n,str):return '{'+json.dumps(n,ensure_ascii=False)+'}' if n.strip() else ' '
 if n.tag in ['script','noscript']:return ''
 attrs=[]
 for k,v in n.attrs.items():
  if k.startswith('on') or k.startswith('data-nclick') or k=='nonce':continue
  if k=='style':
   vals={}
   for item in (v or '').split(';'):
    if ':' in item:
     prop,val=item.split(':',1);prop=prop.strip();prop=re.sub(r'-([a-z])',lambda m:m[1].upper(),prop) if not prop.startswith('--') else prop;vals[prop]=val.strip()
   if vals:attrs.append('style={'+json.dumps(vals)+'}')
   continue
  if k in ['src','poster']:v=asset(v)
  if k=='srcset':v=', '.join(asset(part.strip().split(' ')[0])+(' '+part.strip().split(' ',1)[1] if ' ' in part.strip() else '') for part in v.split(','))
  if k=='href' and v.startswith('/') and not v.startswith('/main'):v=urljoin(BASE,v)
  if k=='href' and v=='/main':v='/main'
  key=attrs_map.get(k,k)
  if k in boolean:attrs.append(key+'={true}')
  elif v is not None:attrs.append(key+'={'+json.dumps(v,ensure_ascii=False)+'}')
  else:attrs.append(key+'=""')
 a=(' '+ ' '.join(attrs)) if attrs else ''
 if n.tag in void:return f'<{n.tag}{a} />'
 return f'<{n.tag}{a}>'+''.join(render(c,depth+1) for c in n.children)+f'</{n.tag}>'
nodes=list(walk(p.root))
find=lambda cls:next(n for n in nodes if n.has(cls))
outer=next(n for n in nodes if n.has('navercorp') and any(isinstance(c,Node) and c.tag=='header' for c in n.children))
sections={'SiteHeader':next(n for n in nodes if n.tag=='header'),'MobileNavigation':find('mo-nav'),'HeroSection':find('main-header'),'NewsSection':find('main-news'),'PromotionSection':find('main-middle-banner'),'TechnologySection':find('main-tech'),'PartnerSection':find('main-partner'),'SiteFooter':next(n for n in nodes if n.tag=='footer')}
out=ROOT/f'src/components/sites/{KEY}';out.mkdir(parents=True,exist_ok=True)
for name,node in sections.items():
 (out/f'{name}.tsx').write_text('/* Source-faithful React markup generated from the retained NAVER reference. */\nexport function '+name+'() {\n  return (\n'+render(node)+'\n  );\n}\n')
print('Generated',len(sections),'React components')
