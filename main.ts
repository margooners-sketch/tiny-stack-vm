import{mkdirSync,readdirSync,readFileSync,writeFileSync}from"node:fs";
import{join}from"node:path";
const T=new TextEncoder;
function run(p,g){
 let D=new Int32Array(256),C=new Int32Array(64),M=new Int32Array(256),O=new Uint8Array(65536);
 let s=0,c=0,l=0,i=0,pc=0,n=0;
 const e=x=>[O.slice(0,l),x];
 for(;;){
  if(n===1e6)return e(10);
  if(pc<0||pc>=p.length)return e(9);
  const o=p[pc];
  if(!(o<8||o>=16&&o<=34&&o!==31||o>=48&&o<=52||o===64||o===65||o>=80&&o<=83))return e(5);
  let m=o===1?1:o===2?4:o>=48&&o<=51?2:0;
  if(pc+m>=p.length)return e(9);
  n++;
  const x=pc+1+m;
  let a=0,b=0;
  if(o>=16&&o<=34&&o!==23&&o!==27){a=2;b=1}
  else if(o===3||o===80||o===81||o===83||o===49||o===50)a=1;
  else if(o===23||o===27||o===64){a=1;b=1}
  else if(o===4){a=1;b=2}
  else if(o===5){a=2;b=2}
  else if(o===6){a=2;b=3}
  else if(o===7){a=3;b=3}
  else if(o===65)a=2;
  else if(o===1||o===2||o===82)b=1;
  if(s<a)return e(2);
  if(s-a+b>256)return e(3);
  pc=x;
  switch(o){
   case 0:return e(0);
   case 1:D[s++]=(p[x-1]<<24)>>24;break;
   case 2:D[s++]=p[x-4]|p[x-3]<<8|p[x-2]<<16|p[x-1]<<24;break;
   case 3:s--;break;
   case 4:D[s]=D[s-1];s++;break;
   case 5:{const t=D[s-1];D[s-1]=D[s-2];D[s-2]=t;break}
   case 6:D[s]=D[s-2];s++;break;
   case 7:{const t=D[s-3];D[s-3]=D[s-2];D[s-2]=D[s-1];D[s-1]=t;break}
   case 23:D[s-1]=-D[s-1]|0;break;
   case 27:D[s-1]=~D[s-1];break;
   case 16:case 17:case 18:case 19:case 20:case 21:case 22:case 24:case 25:case 26:case 28:case 29:case 30:case 32:case 33:case 34:{
    const u=D[s-1],v=D[s-2];let r;
    if(o===16)r=v+u|0;
    else if(o===17)r=v-u|0;
    else if(o===18)r=Math.imul(v,u);
    else if(o===19){if(!u)return e(4);r=v===-2147483648&&u===-1?v:(v/u)|0}
    else if(o===20){if(!u)return e(4);r=u===-1?0:v%u|0}
    else if(o===21){if(!u)return e(4);r=Math.floor((v>>>0)/(u>>>0))|0}
    else if(o===22){if(!u)return e(4);r=(v>>>0)%(u>>>0)|0}
    else if(o===24)r=v&u;
    else if(o===25)r=v|u;
    else if(o===26)r=v^u;
    else if(o===28)r=v<<(u&31);
    else if(o===29)r=v>>(u&31);
    else if(o===30)r=v>>>(u&31)|0;
    else if(o===32)r=v===u?1:0;
    else if(o===33)r=v<u?1:0;
    else r=(v>>>0)<(u>>>0)?1:0;
    s-=2;D[s++]=r;break}
   case 48:case 49:case 50:{
    const r=((p[x-2]|p[x-1]<<8)<<16)>>16;
    let t=o===48;
    if(o!==48){const v=D[--s];t=o===49?v===0:v!==0}
    if(t)pc=x+r;
    break}
   case 51:
    if(c===64)return e(7);
    C[c++]=x;pc=p[x-2]|p[x-1]<<8;break;
   case 52:
    if(!c)return e(8);
    pc=C[--c];break;
   case 64:{
    const v=D[s-1];
    if(v<0||v>255)return e(6);
    D[s-1]=M[v];break}
   case 65:{
    const v=D[s-1],w=D[s-2];
    if(v<0||v>255)return e(6);
    s-=2;M[v]=w;break}
   case 80:{
    const y=T.encode(String(D[s-1]));
    if(l+y.length>65536)return e(11);
    s--;O.set(y,l);l+=y.length;break}
   case 81:
    if(l+1>65536)return e(11);
    O[l++]=D[--s]&255;break;
   case 82:D[s++]=i<g.length?g[i++]:-1;break;
   case 83:return e(D[--s]&255);
  }
 }
}
const I=process.env.MAKEFUN_INPUT_DIR??"/input",O=process.env.MAKEFUN_OUTPUT_DIR??"/output";
for(const id of readdirSync(I).sort()){
 const r=run(readFileSync(join(I,id,"program.bin")),readFileSync(join(I,id,"input.bin")));
 mkdirSync(join(O,id),{recursive:true});
 writeFileSync(join(O,id,"stdout.bin"),r[0]);
 writeFileSync(join(O,id,"exit.txt"),r[1]+"\n");
}
