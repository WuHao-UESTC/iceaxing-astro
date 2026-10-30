import Delaunator from '../node_modules/delaunator/index.js';
import { writeFileSync } from 'node:fs';

const noise = seed => { const x = Math.sin(seed * 127.1) * 43758.5453; return x - Math.floor(x); };
const scenes = [];
for (const compact of [false, true]) {
  const edge = compact
    ? [[440,-160],[590,-15],[695,150],[835,250],[875,355],[1000,440],[1040,550],[1165,650],[1210,760],[1370,920]]
    : [[440,-160],[560,-35],[650,55],[690,155],[815,225],[850,325],[980,395],[1030,510],[1135,585],[1160,690],[1280,770],[1350,920]];
  const boundary = [...edge, [1700,920], [1700,-160]];
  const inside = ([x,y]) => {
    let hit = false;
    for (let i=0,j=boundary.length-1;i<boundary.length;j=i++) {
      const a=boundary[i], b=boundary[j];
      if ((a[1]>y)!==(b[1]>y) && x<(b[0]-a[0])*(y-a[1])/(b[1]-a[1])+a[0]) hit=!hit;
    }
    return hit;
  };
  const points = [...boundary];
  // Offset rows only seed the spacing; Delaunay selects the connections.
  for(let row=0;row<8;row++) for(let col=0;col<11;col++) {
    const x=Math.round(500+col*(compact?205:135)+(row%2?60:0)+(noise(row*91+col*17+8)-0.5)*75);
    const y=Math.round(-105+row*145+(noise(row*37+col*23+2)-0.5)*65);
    if(!inside([x,y]) || points.some(([px,py])=>Math.hypot((px-x)*(compact?0.7:1),py-y)<(compact?90:92)))continue;
    points.push([x,y]);
  }
  const delaunay = Delaunator.from(points);
  const triangles=[];
  for(let i=0;i<delaunay.triangles.length;i+=3) {
    const ids=Array.from(delaunay.triangles.slice(i,i+3));
    const ps=ids.map(id=>points[id]);
    const center=[ps.reduce((s,p)=>s+p[0],0)/3,ps.reduce((s,p)=>s+p[1],0)/3];
    if(inside(center))triangles.push(ids);
  }
  const edges=new Map();
  for(const ids of triangles)for(let i=0;i<3;i++){
    const pair=[ids[i],ids[(i+1)%3]].sort((a,b)=>a-b).join(',');
    edges.set(pair,(edges.get(pair)||0)+1);
  }
  for(let i=0;i<boundary.length;i++){
    const pair=[i,(i+1)%boundary.length].sort((a,b)=>a-b).join(',');
    if(edges.get(pair)!==1)throw Error('Missing contour segment '+compact+' '+pair);
  }
  if([...edges.values()].filter(n=>n===1).length!==boundary.length)throw Error('Unexpected hole');
  scenes.push({ points: points.map(([x,y],i)=>[x,y,Math.round(15+noise(i*19+7)*90)]), triangles });
  console.log(compact?'mobile':'desktop',points.length,'vertices',triangles.length,'triangles; exact contour, no holes');
}
const array = value => JSON.stringify(value);
writeFileSync('src/data/life-upper-terrain.ts', `// Art-directed contours and irregular triangulations for the upper snow bank.\nimport type { TerrainPoint } from '../lib/terrain-mesh';\n\nexport const lifeUpperTerrain: { points: TerrainPoint[]; triangles: [number, number, number][] }[] = [\n${scenes.map(scene=>`  {\n    points: ${array(scene.points)},\n    triangles: ${array(scene.triangles)},\n  }`).join(',\n')}\n];\n`);
