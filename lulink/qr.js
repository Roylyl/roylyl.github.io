// Minimal fixed Version 15-L QR encoder for UTF-8 byte payloads.
// 77x77 modules, 523 data codewords, 132 ECC codewords.
(function(global){
  const VERSION=15, SIZE=77, DATA_CW=523;
  const RS_BLOCKS=[
    {total:109,data:87},{total:109,data:87},{total:109,data:87},
    {total:109,data:87},{total:109,data:87},{total:110,data:88}
  ];
  const ALIGN=[6,26,48,70];
  const EXP=new Uint8Array(512), LOG=new Uint8Array(256);
  let x=1; for(let i=0;i<255;i++){EXP[i]=x;LOG[x]=i;x<<=1;if(x&0x100)x^=0x11d;} for(let i=255;i<512;i++)EXP[i]=EXP[i-255];
  const gfMul=(a,b)=>a&&b?EXP[LOG[a]+LOG[b]]:0;
  function polyMul(a,b){const out=new Uint8Array(a.length+b.length-1);for(let i=0;i<a.length;i++)for(let j=0;j<b.length;j++)out[i+j]^=gfMul(a[i],b[j]);return out;}
  function generator(n){let g=new Uint8Array([1]);for(let i=0;i<n;i++)g=polyMul(g,new Uint8Array([1,EXP[i]]));return g;}
  function ecc(data,n){const gen=generator(n), rem=new Uint8Array(n);for(const b of data){const f=b^rem[0];rem.copyWithin(0,1);rem[n-1]=0;for(let j=0;j<n;j++)rem[j]^=gfMul(gen[j+1],f);}return rem;}
  class Bits{constructor(){this.a=[];}put(v,n){for(let i=n-1;i>=0;i--)this.a.push((v>>>i)&1);}bytes(){const out=new Uint8Array(Math.ceil(this.a.length/8));this.a.forEach((b,i)=>{if(b)out[i>>>3]|=0x80>>>(i&7);});return out;}}
  function makeData(text){const bytes=new TextEncoder().encode(text);if(bytes.length>520)throw new Error('QR payload too large');const b=new Bits();b.put(4,4);b.put(bytes.length,16);for(const v of bytes)b.put(v,8);const max=DATA_CW*8;for(let i=0;i<Math.min(4,max-b.a.length);i++)b.put(0,1);while(b.a.length%8)b.put(0,1);let arr=Array.from(b.bytes());let pad=true;while(arr.length<DATA_CW){arr.push(pad?0xec:0x11);pad=!pad;}return new Uint8Array(arr);}
  function interleave(data){let p=0;const blocks=[], eccs=[];for(const rs of RS_BLOCKS){const d=data.slice(p,p+rs.data);p+=rs.data;blocks.push(d);eccs.push(ecc(d,rs.total-rs.data));}const out=[];const maxD=Math.max(...blocks.map(b=>b.length));for(let i=0;i<maxD;i++)for(const b of blocks)if(i<b.length)out.push(b[i]);const maxE=Math.max(...eccs.map(b=>b.length));for(let i=0;i<maxE;i++)for(const e of eccs)if(i<e.length)out.push(e[i]);return new Uint8Array(out);}
  function bchDigit(v){let d=0;while(v){d++;v>>>=1;}return d;}
  function typeInfo(data){const G15=0x537, MASK=0x5412;let d=data<<10;while(bchDigit(d)-bchDigit(G15)>=0)d^=G15<<(bchDigit(d)-bchDigit(G15));return ((data<<10)|d)^MASK;}
  function mask0(r,c){return (r+c)%2===0;}
  function drawFinder(m,row,col){for(let r=-1;r<=7;r++)for(let c=-1;c<=7;c++){const rr=row+r,cc=col+c;if(rr<0||rr>=SIZE||cc<0||cc>=SIZE)continue;const dark=(r>=0&&r<=6&&c>=0&&c<=6&&(r===0||r===6||c===0||c===6||(r>=2&&r<=4&&c>=2&&c<=4)));m[rr][cc]=dark;}}
  function build(text){const data=interleave(makeData(text));const m=Array.from({length:SIZE},()=>Array(SIZE).fill(null));drawFinder(m,0,0);drawFinder(m,SIZE-7,0);drawFinder(m,0,SIZE-7);
    for(const row of ALIGN)for(const col of ALIGN){if(m[row][col]!==null)continue;for(let r=-2;r<=2;r++)for(let c=-2;c<=2;c++)m[row+r][col+c]=(Math.abs(r)===2||Math.abs(c)===2||(r===0&&c===0));}
    for(let r=8;r<SIZE-8;r++)if(m[r][6]===null)m[r][6]=(r%2===0);for(let c=8;c<SIZE-8;c++)if(m[6][c]===null)m[6][c]=(c%2===0);
    // Version info for version >= 7.
    const G18=0x1f25;let d=VERSION<<12;while(bchDigit(d)-bchDigit(G18)>=0)d^=G18<<(bchDigit(d)-bchDigit(G18));const vb=(VERSION<<12)|d;for(let i=0;i<18;i++){const bit=((vb>>i)&1)===1;m[Math.floor(i/3)][i%3+SIZE-11]=bit;m[i%3+SIZE-11][Math.floor(i/3)]=bit;}
    // Format info: EC L=1, mask 0.
    const bits=typeInfo((1<<3)|0);for(let i=0;i<15;i++){const mod=((bits>>i)&1)===1;if(i<6)m[i][8]=mod;else if(i<8)m[i+1][8]=mod;else m[SIZE-15+i][8]=mod;if(i<8)m[8][SIZE-i-1]=mod;else if(i<9)m[8][7]=mod;else m[8][15-i-1]=mod;}m[SIZE-8][8]=true;
    let inc=-1,row=SIZE-1,bit=7,byte=0;for(let col=SIZE-1;col>0;col-=2){let dataCol=col;if(dataCol<=6)dataCol--;while(true){for(const c of [dataCol,dataCol-1])if(m[row][c]===null){let dark=byte<data.length?(((data[byte]>>bit)&1)===1):false;if(mask0(row,c))dark=!dark;m[row][c]=dark;bit--;if(bit<0){byte++;bit=7;}}row+=inc;if(row<0||row>=SIZE){row-=inc;inc=-inc;break;}}}
    return m;
  }
  function render(text,canvas,scale=10,border=4){const m=build(text), n=SIZE+border*2;canvas.width=n*scale;canvas.height=n*scale;const ctx=canvas.getContext('2d');ctx.imageSmoothingEnabled=false;ctx.fillStyle='#fff';ctx.fillRect(0,0,canvas.width,canvas.height);ctx.fillStyle='#000';for(let r=0;r<SIZE;r++)for(let c=0;c<SIZE;c++)if(m[r][c])ctx.fillRect((c+border)*scale,(r+border)*scale,scale,scale);return m;}
  global.FixedQR={render,build};
})(window);
