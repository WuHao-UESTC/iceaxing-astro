import { snowRiftMeshes } from '../src/data/chapter-landscapes.ts';
const cross = (a,b,c) => (b[0]-a[0])*(c[1]-a[1])-(b[1]-a[1])*(c[0]-a[0]);
const inside = (point,polygon) => {
 let hit=false;
 for(let i=0,j=polygon.length-1;i<polygon.length;j=i++) {
  const a=polygon[i],b=polygon[j];
  if((a[1]>point[1])!==(b[1]>point[1])&&point[0]<(b[0]-a[0])*(point[1]-a[1])/(b[1]-a[1])+a[0])hit=!hit;
 }
 return hit;
};
const overlaps=(a,b)=> {
 for(const face of [a,b])for(let i=0;i<3;i++){
  const p=face[i],q=face[(i+1)%3],axis=[q[1]-p[1],p[0]-q[0]];
  const project=points=>points.map(p=>p[0]*axis[0]+p[1]*axis[1]);
  const u=project(a),v=project(b);
  if(Math.max(...u)<=Math.min(...v)+1e-6||Math.max(...v)<=Math.min(...u)+1e-6)return false;
 }
 return true;
};
for(const compact of [false,true]){
 const mesh=snowRiftMeshes(compact);
 for(let i=0;i<mesh.upper.length;i++){
  const a=mesh.upper[i].points;
  if(cross(...a)<=0)throw Error('Degenerate or inverted triangle '+i);
  for(let j=i+1;j<mesh.upper.length;j++)if(overlaps(a,mesh.upper[j].points))throw Error('Overlapping triangles '+i+','+j);
 }
 const edges=new Map();
 for(const face of mesh.upper)for(let i=0;i<3;i++){
  const a=face.points[i],b=face.points[(i+1)%3];
  const key=[a.slice(0,2).join(','),b.slice(0,2).join(',')].sort().join('/');
  edges.set(key,(edges.get(key)||0)+1);
 }
 if([...edges.values()].some(count=>count>2))throw Error('Non-manifold mesh');
 console.log(compact?'mobile':'desktop',mesh.upper.length+' whole triangles;', [...edges.values()].filter(count=>count===1).length+' exposed triangle edges; no overlaps/inverted triangles');
}
