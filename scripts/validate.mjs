import assert from 'node:assert/strict';
import {readFileSync,existsSync,readdirSync} from 'node:fs';
const config=JSON.parse(readFileSync('docs.json','utf8'));
const spec=JSON.parse(readFileSync('openapi.json','utf8'));
let pages=0;
function visit(value){
 if(Array.isArray(value)){for(const x of value)visit(x);return;}
 if(!value||typeof value!=='object')return;
 if(value.pages)for(const p of value.pages){assert.ok(existsSync(p+'.mdx'),`Missing ${p}`);pages++;}
 for(const [k,v] of Object.entries(value))if(k!=='pages')visit(v);
}
visit(config.navigation);
function walk(dir){return readdirSync(dir,{withFileTypes:true}).flatMap(e=>e.isDirectory()&&!e.name.startsWith('.')&&!['node_modules'].includes(e.name)?walk(dir+'/'+e.name):e.isFile()?[dir+'/'+e.name]:[]);}
for(const file of walk('.').filter(f=>f.endsWith('.mdx'))){
 const text=readFileSync(file,'utf8');
 const binding=text.match(/^openapi: "(GET|POST|DELETE) (.+)"$/m);
 if(binding)assert.ok(spec.paths[binding[2]]?.[binding[1].toLowerCase()],`Unknown endpoint in ${file}`);
 for(const m of text.matchAll(/(?:href="|\]\()\/(?!\/)([^"#)]+)(?:#[^" )]*)?["\)]/g)){
  const path=m[1];assert.ok(existsSync(path)||existsSync(path+'.mdx'),`Broken local link ${path} in ${file}`);
 }
}
assert.equal(spec.servers[0].url,'https://soldfetch.com');
if(process.argv.includes('--live')){
 const response=await fetch('https://soldfetch.com/api/v1/openapi.json',{signal:AbortSignal.timeout(20000)});
 assert.equal(response.status,200);assert.deepEqual(await response.json(),spec,'Live contract changed; review and refresh openapi.json');
}
console.log(`Validated ${pages} navigation pages, endpoint bindings, and local links.`);
