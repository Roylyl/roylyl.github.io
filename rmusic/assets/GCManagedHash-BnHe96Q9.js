import{n as e}from"./rolldown-runtime-8BhlS34s.js";import{Dt as t,Et as n,Gt as r,K as i,M as a,Mt as o,N as s,Pt as c,Tt as l,_ as u,g as d,i as f,n as p,q as m,qt as h,r as g,t as _,wt as v}from"./Shader-DULq7Zha.js";import{D as y,O as b,c as ee,l as x,n as te,s as ne,t as re,u as ie}from"./Geometry-Dhn-_-zL.js";var S;function C(){return(C=e((()=>{S=class{constructor(e){this.rawBinaryData=typeof e==`number`?new ArrayBuffer(e):e instanceof Uint8Array?e.buffer:e,this.uint32View=new Uint32Array(this.rawBinaryData),this.float32View=new Float32Array(this.rawBinaryData),this.size=this.rawBinaryData.byteLength}get int8View(){return this._int8View||=new Int8Array(this.rawBinaryData),this._int8View}get uint8View(){return this._uint8View||=new Uint8Array(this.rawBinaryData),this._uint8View}get int16View(){return this._int16View||=new Int16Array(this.rawBinaryData),this._int16View}get int32View(){return this._int32View||=new Int32Array(this.rawBinaryData),this._int32View}get float64View(){return this._float64Array||=new Float64Array(this.rawBinaryData),this._float64Array}get bigUint64View(){return this._bigUint64Array||=new BigUint64Array(this.rawBinaryData),this._bigUint64Array}view(e){return this[`${e}View`]}destroy(){this.rawBinaryData=null,this.uint32View=null,this.float32View=null,this.uint16View=null,this._int8View=null,this._uint8View=null,this._int16View=null,this._int32View=null,this._float64Array=null,this._bigUint64Array=null}static sizeOf(e){switch(e){case`int8`:case`uint8`:return 1;case`int16`:case`uint16`:return 2;case`int32`:case`uint32`:case`float32`:return 4;default:throw Error(`${e} isn't a valid view type`)}}}})))()}function ae(e,t,n,r){if(n??=0,r??=Math.min(e.byteLength-n,t.byteLength),!(n&7)&&!(r&7)){let i=r/8;new Float64Array(t,0,i).set(new Float64Array(e,n,i))}else if(!(n&3)&&!(r&3)){let i=r/4;new Float32Array(t,0,i).set(new Float32Array(e,n,i))}else new Uint8Array(t).set(new Uint8Array(e,n,r))}function oe(){return(oe=e((()=>{})))()}var se,ce;function le(){return(le=e((()=>{se={normal:`normal-npm`,add:`add-npm`,screen:`screen-npm`},ce=(e=>(e[e.DISABLED=0]=`DISABLED`,e[e.RENDERING_MASK_ADD=1]=`RENDERING_MASK_ADD`,e[e.MASK_ACTIVE=2]=`MASK_ACTIVE`,e[e.INVERSE_MASK_ACTIVE=3]=`INVERSE_MASK_ACTIVE`,e[e.RENDERING_MASK_REMOVE=4]=`RENDERING_MASK_REMOVE`,e[e.NONE=5]=`NONE`,e))(ce||{})})))()}function w(e,t){return t.alphaMode===`no-premultiply-alpha`&&se[e]||e}function T(){return(T=e((()=>{le()})))()}function ue(e){let t=``;for(let n=0;n<e;++n)n>0&&(t+=`
else `),n<e-1&&(t+=`if(test == ${n}.0){}`);return t}function de(e,t){if(e===0)throw Error("Invalid value of `0` passed to `checkMaxIfStatementsInShader`");let n=t.createShader(t.FRAGMENT_SHADER);try{for(;;){let r=fe.replace(/%forloop%/gi,ue(e));if(t.shaderSource(n,r),t.compileShader(n),!t.getShaderParameter(n,t.COMPILE_STATUS))e=e/2|0;else break}}finally{t.deleteShader(n)}return e}var fe;function E(){return(E=e((()=>{fe=[`precision mediump float;`,`void main(void){`,`float test = 0.1;`,`%forloop%`,`gl_FragColor = vec4(0.0);`,`}`].join(`
`)})))()}function pe(){if(D)return D;let e=i();return D=e.getParameter(e.MAX_TEXTURE_IMAGE_UNITS),D=de(D,e),e.getExtension(`WEBGL_lose_context`)?.loseContext(),D}var D;function O(){return(O=e((()=>{m(),E(),D=null})))()}var k;function A(){return(A=e((()=>{k=class{constructor(){this.ids=Object.create(null),this.textures=[],this.count=0}clear(){for(let e=0;e<this.count;e++){let t=this.textures[e];this.textures[e]=null,this.ids[t.uid]=null}this.count=0}}})))()}function me(){return N>0?M[--N]:new j}function he(e){e.elements=null,M[N++]=e}var j,M,N,P,F,I;function L(){return(L=e((()=>{o(),C(),t(),b(),T(),O(),A(),j=class{constructor(){this.renderPipeId=`batch`,this.action=`startBatch`,this.start=0,this.size=0,this.textures=new k,this.blendMode=`normal`,this.topology=`triangle-strip`,this.canBundle=!0}destroy(){this.textures=null,this.gpuBindGroup=null,this.bindGroup=null,this.batcher=null,this.elements=null}},M=[],N=0,y.register({clear:()=>{if(M.length>0)for(let e of M)e&&e.destroy();M.length=0,N=0}}),P=0,F=class e{constructor(t){this.uid=c(`batcher`),this.dirty=!0,this.batchIndex=0,this.batches=[],this._elements=[],t={...e.defaultOptions,...t},t.maxTextures||(n(`v8.8.0`,`maxTextures is a required option for Batcher now, please pass it in the options`),t.maxTextures=pe());let{maxTextures:r,attributesInitialSize:i,indicesInitialSize:a}=t;this.attributeBuffer=new S(i*4),this.indexBuffer=new Uint16Array(a),this.maxTextures=r}begin(){this.elementSize=0,this.elementStart=0,this.indexSize=0,this.attributeSize=0;for(let e=0;e<this.batchIndex;e++)he(this.batches[e]);this.batchIndex=0,this._batchIndexStart=0,this._batchIndexSize=0,this.dirty=!0}add(e){this._elements[this.elementSize++]=e,e._indexStart=this.indexSize,e._attributeStart=this.attributeSize,e._batcher=this,this.indexSize+=e.indexSize,this.attributeSize+=e.attributeSize*this.vertexSize}checkAndUpdateTexture(e,t){let n=e._batch.textures.ids[t._source.uid];return!n&&n!==0?!1:(e._textureId=n,e.texture=t,!0)}updateElement(e){this.dirty=!0;let t=this.attributeBuffer;e.packAsQuad?this.packQuadAttributes(e,t.float32View,t.uint32View,e._attributeStart,e._textureId):this.packAttributes(e,t.float32View,t.uint32View,e._attributeStart,e._textureId)}break(e){let t=this._elements;if(!t[this.elementStart])return;let n=me(),r=n.textures;r.clear();let i=t[this.elementStart],a=w(i.blendMode,i.texture._source),o=i.topology;this.attributeSize*4>this.attributeBuffer.size&&this._resizeAttributeBuffer(this.attributeSize*4),this.indexSize>this.indexBuffer.length&&this._resizeIndexBuffer(this.indexSize);let s=this.attributeBuffer.float32View,c=this.attributeBuffer.uint32View,l=this.indexBuffer,u=this._batchIndexSize,d=this._batchIndexStart,f=`startBatch`,p=[],m=this.maxTextures;for(let i=this.elementStart;i<this.elementSize;++i){let h=t[i];t[i]=null;let g=h.texture._source,_=w(h.blendMode,g),v=a!==_||o!==h.topology;g._batchTick===P&&!v?(h._textureId=g._textureBindLocation,u+=h.indexSize,h.packAsQuad?(this.packQuadAttributes(h,s,c,h._attributeStart,h._textureId),this.packQuadIndex(l,h._indexStart,h._attributeStart/this.vertexSize)):(this.packAttributes(h,s,c,h._attributeStart,h._textureId),this.packIndex(h,l,h._indexStart,h._attributeStart/this.vertexSize)),h._batch=n,p.push(h)):(g._batchTick=P,(r.count>=m||v)&&(this._finishBatch(n,d,u-d,r,a,o,e,f,p),f=`renderBatch`,d=u,a=_,o=h.topology,n=me(),r=n.textures,r.clear(),p=[],++P),h._textureId=g._textureBindLocation=r.count,r.ids[g.uid]=r.count,r.textures[r.count++]=g,h._batch=n,p.push(h),u+=h.indexSize,h.packAsQuad?(this.packQuadAttributes(h,s,c,h._attributeStart,h._textureId),this.packQuadIndex(l,h._indexStart,h._attributeStart/this.vertexSize)):(this.packAttributes(h,s,c,h._attributeStart,h._textureId),this.packIndex(h,l,h._indexStart,h._attributeStart/this.vertexSize)))}r.count>0&&(this._finishBatch(n,d,u-d,r,a,o,e,f,p),d=u,++P),this.elementStart=this.elementSize,this._batchIndexStart=d,this._batchIndexSize=u}_finishBatch(e,t,n,r,i,a,o,s,c){e.gpuBindGroup=null,e.bindGroup=null,e.action=s,e.batcher=this,e.textures=r,e.blendMode=i,e.topology=a,e.start=t,e.size=n,e.elements=c,++P,this.batches[this.batchIndex++]=e,o.add(e)}finish(e){this.break(e)}ensureAttributeBuffer(e){e*4<=this.attributeBuffer.size||this._resizeAttributeBuffer(e*4)}ensureIndexBuffer(e){e<=this.indexBuffer.length||this._resizeIndexBuffer(e)}_resizeAttributeBuffer(e){let t=Math.max(e,this.attributeBuffer.size*2),n=new S(t);ae(this.attributeBuffer.rawBinaryData,n.rawBinaryData),this.attributeBuffer=n}_resizeIndexBuffer(e){let t=this.indexBuffer,n=Math.max(e,t.length*1.5);n+=n%2;let r=n>65535?new Uint32Array(n):new Uint16Array(n);if(r.BYTES_PER_ELEMENT!==t.BYTES_PER_ELEMENT)for(let e=0;e<t.length;e++)r[e]=t[e];else ae(t.buffer,r.buffer);this.indexBuffer=r}packQuadIndex(e,t,n){e[t]=n+0,e[t+1]=n+1,e[t+2]=n+2,e[t+3]=n+0,e[t+4]=n+2,e[t+5]=n+3}packIndex(e,t,n,r){let i=e.indices,a=e.indexSize,o=e.indexOffset,s=e.attributeOffset;for(let e=0;e<a;e++)t[n++]=r+i[e+o]-s}destroy(e={}){if(this.batches!==null){for(let e=0;e<this.batchIndex;e++)he(this.batches[e]);this.batches=null,this.geometry.destroy(!0),this.geometry=null,e.shader&&(this.shader?.destroy(),this.shader=null);for(let e=0;e<this._elements.length;e++)this._elements[e]&&(this._elements[e]._batch=null);this._elements=null,this.indexBuffer=null,this.attributeBuffer.destroy(),this.attributeBuffer=null}}},F.defaultOptions={maxTextures:null,attributesInitialSize:4,indicesInitialSize:6},I=F})))()}var ge,_e,R;function z(){return(z=e((()=>{ee(),ie(),te(),ge=new Float32Array(1),_e=new Uint32Array(1),R=class extends re{constructor(){let e=new ne({data:ge,label:`attribute-batch-buffer`,usage:x.VERTEX|x.COPY_DST,shrinkToFit:!1}),t=new ne({data:_e,label:`index-batch-buffer`,usage:x.INDEX|x.COPY_DST,shrinkToFit:!1});super({attributes:{aPosition:{buffer:e,format:`float32x2`,stride:24,offset:0},aUV:{buffer:e,format:`float32x2`,stride:24,offset:8},aColor:{buffer:e,format:`unorm8x4`,stride:24,offset:16},aTextureIdAndRound:{buffer:e,format:`uint16x2`,stride:24,offset:20}},indexBuffer:t})}}})))()}function B(e,t,n){if(e)for(let r in e){let i=t[r.toLocaleLowerCase()];if(i){let t=e[r];r===`header`&&(t=t.replace(/@in\s+[^;]+;\s*/g,``).replace(/@out\s+[^;]+;\s*/g,``)),n&&i.push(`//----${n}----//`),i.push(t)}else l(`${r} placement hook does not exist in shader`)}}function V(){return(V=e((()=>{v()})))()}function H(e){let t={};return(e.match(ve)?.map(e=>e.replace(/[{()}]/g,``))??[]).forEach(e=>{t[e]=[]}),t}var ve;function U(){return(U=e((()=>{ve=/\{\{(.*?)\}\}/g})))()}function ye(e,t){let n,r=/@in\s+([^;]+);/g;for(;(n=r.exec(e))!==null;)t.push(n[1])}function W(e,t,n=!1){let r=[];ye(t,r),e.forEach(e=>{e.header&&ye(e.header,r)});let i=r;n&&i.sort();let a=i.map((e,t)=>`       @location(${t}) ${e},`).join(`
`),o=t.replace(/@in\s+[^;]+;\s*/g,``);return o=o.replace(`{{in}}`,`
${a}
`),o}function be(){return(be=e((()=>{})))()}function xe(e,t){let n,r=/@out\s+([^;]+);/g;for(;(n=r.exec(e))!==null;)t.push(n[1])}function Se(e){let t=/\b(\w+)\s*:/g.exec(e);return t?t[1]:``}function Ce(e){return e.replace(/@.*?\s+/g,``)}function we(e,t){let n=[];xe(t,n),e.forEach(e=>{e.header&&xe(e.header,n)});let r=0,i=n.sort().map(e=>e.indexOf(`builtin`)>-1?e:`@location(${r++}) ${e}`).join(`,
`),a=n.sort().map(e=>`       var ${Ce(e)};`).join(`
`),o=`return VSOutput(
            ${n.sort().map(e=>` ${Se(e)}`).join(`,
`)});`,s=t.replace(/@out\s+[^;]+;\s*/g,``);return s=s.replace(`{{struct}}`,`
${i}
`),s=s.replace(`{{start}}`,`
${a}
`),s=s.replace(`{{return}}`,`
${o}
`),s}function Te(){return(Te=e((()=>{})))()}function G(e,t){let n=e;for(let e in t){let r=t[e];n=r.join(`
`).length?n.replace(`{{${e}}}`,`//-----${e} START-----//
${r.join(`
`)}
//----${e} FINISH----//`):n.replace(`{{${e}}}`,``)}return n}function Ee(){return(Ee=e((()=>{})))()}function De({template:e,bits:t}){let n=Ae(e,t);if(K[n])return K[n];let{vertex:r,fragment:i}=ke(e,t);return K[n]=je(r,i,t),K[n]}function Oe({template:e,bits:t}){let n=Ae(e,t);return K[n]||(K[n]=je(e.vertex,e.fragment,t)),K[n]}function ke(e,t){let n=t.map(e=>e.vertex).filter(e=>!!e),r=t.map(e=>e.fragment).filter(e=>!!e),i=W(n,e.vertex,!0);i=we(n,i);let a=W(r,e.fragment,!0);return{vertex:i,fragment:a}}function Ae(e,t){return t.map(e=>(q.has(e)||q.set(e,Me++),q.get(e))).sort((e,t)=>e-t).join(`-`)+e.vertex+e.fragment}function je(e,t,n){let r=H(e),i=H(t);return n.forEach(e=>{B(e.vertex,r,e.name),B(e.fragment,i,e.name)}),{vertex:G(e,r),fragment:G(t,i)}}var K,q,Me;function J(){return(J=e((()=>{V(),U(),K=Object.create(null),q=new Map,Me=0})))()}var Ne,Pe,Fe,Ie;function Le(){return(Le=e((()=>{Ne=`
    @in aPosition: vec2<f32>;
    @in aUV: vec2<f32>;

    @out @builtin(position) vPosition: vec4<f32>;
    @out vUV : vec2<f32>;
    @out vColor : vec4<f32>;

    {{header}}

    struct VSOutput {
        {{struct}}
    };

    @vertex
    fn main( {{in}} ) -> VSOutput {

        var worldTransformMatrix = globalUniforms.uWorldTransformMatrix;
        var modelMatrix = mat3x3<f32>(
            1.0, 0.0, 0.0,
            0.0, 1.0, 0.0,
            0.0, 0.0, 1.0
          );
        var position = aPosition;
        var uv = aUV;

        {{start}}

        vColor = vec4<f32>(1., 1., 1., 1.);

        {{main}}

        vUV = uv;

        var modelViewProjectionMatrix = globalUniforms.uProjectionMatrix * worldTransformMatrix * modelMatrix;

        vPosition =  vec4<f32>((modelViewProjectionMatrix *  vec3<f32>(position, 1.0)).xy, 0.0, 1.0);

        vColor *= globalUniforms.uWorldColorAlpha;

        {{end}}

        {{return}}
    };
`,Pe=`
    @in vUV : vec2<f32>;
    @in vColor : vec4<f32>;

    {{header}}

    @fragment
    fn main(
        {{in}}
      ) -> @location(0) vec4<f32> {

        {{start}}

        var outColor:vec4<f32>;

        {{main}}

        var finalColor:vec4<f32> = outColor * vColor;

        {{end}}

        return finalColor;
      };
`,Fe=`
    in vec2 aPosition;
    in vec2 aUV;

    out vec4 vColor;
    out vec2 vUV;

    {{header}}

    void main(void){

        mat3 worldTransformMatrix = uWorldTransformMatrix;
        mat3 modelMatrix = mat3(
            1.0, 0.0, 0.0,
            0.0, 1.0, 0.0,
            0.0, 0.0, 1.0
          );
        vec2 position = aPosition;
        vec2 uv = aUV;

        {{start}}

        vColor = vec4(1.);

        {{main}}

        vUV = uv;

        mat3 modelViewProjectionMatrix = uProjectionMatrix * worldTransformMatrix * modelMatrix;

        gl_Position = vec4((modelViewProjectionMatrix * vec3(position, 1.0)).xy, 0.0, 1.0);

        vColor *= uWorldColorAlpha;

        {{end}}
    }
`,Ie=`

    in vec4 vColor;
    in vec2 vUV;

    out vec4 finalColor;

    {{header}}

    void main(void) {

        {{start}}

        vec4 outColor;

        {{main}}

        finalColor = outColor * vColor;

        {{end}}
    }
`})))()}var Re,ze,Be;function Ve(){return(Ve=e((()=>{Re={name:`global-uniforms-bit`,vertex:{header:`
        struct GlobalUniforms {
            uProjectionMatrix:mat3x3<f32>,
            uWorldTransformMatrix:mat3x3<f32>,
            uWorldColorAlpha: vec4<f32>,
            uResolution: vec2<f32>,
        }

        @group(0) @binding(0) var<uniform> globalUniforms : GlobalUniforms;
        `}},ze={name:`global-uniforms-ubo-bit`,vertex:{header:`
          uniform globalUniforms {
            mat3 uProjectionMatrix;
            mat3 uWorldTransformMatrix;
            vec4 uWorldColorAlpha;
            vec2 uResolution;
          };
        `}},Be={name:`global-uniforms-bit`,vertex:{header:`
          uniform mat3 uProjectionMatrix;
          uniform mat3 uWorldTransformMatrix;
          uniform vec4 uWorldColorAlpha;
          uniform vec2 uResolution;
        `}}})))()}function He({bits:e,name:t}){let n=De({template:{fragment:Pe,vertex:Ne},bits:[Re,...e]});return d.from({name:t,vertex:{source:n.vertex,entryPoint:`main`},fragment:{source:n.fragment,entryPoint:`main`}})}function Ue({bits:e,name:t}){return new a({name:t,...Oe({template:{vertex:Fe,fragment:Ie},bits:[Be,...e]})})}function We(){return(We=e((()=>{s(),u(),J(),Le(),Ve()})))()}var Ge,Ke;function qe(){return(qe=e((()=>{Ge={name:`color-bit`,vertex:{header:`
            @in aColor: vec4<f32>;
        `,main:`
            vColor *= vec4<f32>(aColor.rgb * aColor.a, aColor.a);
        `}},Ke={name:`color-bit`,vertex:{header:`
            in vec4 aColor;
        `,main:`
            vColor *= vec4(aColor.rgb * aColor.a, aColor.a);
        `}}})))()}function Je(e){let t=[];if(e===1)t.push(`@group(1) @binding(0) var textureSource1: texture_2d<f32>;`),t.push(`@group(1) @binding(1) var textureSampler1: sampler;`);else{let n=0;for(let r=0;r<e;r++)t.push(`@group(1) @binding(${n++}) var textureSource${r+1}: texture_2d<f32>;`),t.push(`@group(1) @binding(${n++}) var textureSampler${r+1}: sampler;`)}return t.join(`
`)}function Ye(e){let t=[];if(e===1)t.push(`outColor = textureSampleGrad(textureSource1, textureSampler1, vUV, uvDx, uvDy);`);else{t.push(`switch vTextureId {`);for(let n=0;n<e;n++)n===e-1?t.push(`  default:{`):t.push(`  case ${n}:{`),t.push(`      outColor = textureSampleGrad(textureSource${n+1}, textureSampler${n+1}, vUV, uvDx, uvDy);`),t.push(`      break;}`);t.push(`}`)}return t.join(`
`)}function Xe(e){return Y[e]||(Y[e]={name:`texture-batch-bit`,vertex:{header:`
                @in aTextureIdAndRound: vec2<u32>;
                @out @interpolate(flat) vTextureId : u32;
            `,main:`
                vTextureId = aTextureIdAndRound.y;
            `,end:`
                if(aTextureIdAndRound.x == 1)
                {
                    vPosition = vec4<f32>(roundPixels(vPosition.xy, globalUniforms.uResolution), vPosition.zw);
                }
            `},fragment:{header:`
                @in @interpolate(flat) vTextureId: u32;

                ${Je(e)}
            `,main:`
                var uvDx = dpdx(vUV);
                var uvDy = dpdy(vUV);

                ${Ye(e)}
            `}}),Y[e]}function Ze(e){let t=[];for(let n=0;n<e;n++)n>0&&t.push(`else`),n<e-1&&t.push(`if(vTextureId < ${n}.5)`),t.push(`{`),t.push(`	outColor = texture(uTextures[${n}], vUV);`),t.push(`}`);return t.join(`
`)}function Qe(e){return X[e]||(X[e]={name:`texture-batch-bit`,vertex:{header:`
                in vec2 aTextureIdAndRound;
                out float vTextureId;

            `,main:`
                vTextureId = aTextureIdAndRound.y;
            `,end:`
                if(aTextureIdAndRound.x == 1.)
                {
                    gl_Position.xy = roundPixels(gl_Position.xy, uResolution);
                }
            `},fragment:{header:`
                in float vTextureId;

                uniform sampler2D uTextures[${e}];

            `,main:`

                ${Ze(e)}
            `}}),X[e]}var Y,X;function $e(){return($e=e((()=>{Y={},X={}})))()}var Z,et;function tt(){return(tt=e((()=>{Z={name:`round-pixels-bit`,vertex:{header:`
            fn roundPixels(position: vec2<f32>, targetSize: vec2<f32>) -> vec2<f32>
            {
                return (floor(((position * 0.5 + 0.5) * targetSize) + 0.5) / targetSize) * 2.0 - 1.0;
            }
        `}},et={name:`round-pixels-bit`,vertex:{header:`
            vec2 roundPixels(vec2 position, vec2 targetSize)
            {
                return (floor(((position * 0.5 + 0.5) * targetSize) + 0.5) / targetSize) * 2.0 - 1.0;
            }
        `}}})))()}function nt(e){let t=rt[e];if(t)return t;let n=new Int32Array(e);for(let t=0;t<e;t++)n[t]=t;return t=rt[e]=new g({uTextures:{value:n,type:`i32`,size:e}},{isStatic:!0}),t}var rt;function it(){return(it=e((()=>{f(),rt={}})))()}var Q;function at(){return(at=e((()=>{We(),qe(),$e(),tt(),it(),p(),Q=class extends _{constructor(e){let t=Ue({name:`batch`,bits:[Ke,Qe(e),et]}),n=He({name:`batch`,bits:[Ge,Xe(e),Z]});super({glProgram:t,gpuProgram:n,resources:{batchSamplers:nt(e)}}),this.maxTextures=e}}})))()}var $,ot,st;function ct(){return(ct=e((()=>{h(),L(),z(),at(),$=null,ot=class e extends I{constructor(t){super(t),this.geometry=new R,this.name=e.extension.name,this.vertexSize=6,$??=new Q(t.maxTextures),this.shader=$}packAttributes(e,t,n,r,i){let a=i<<16|e.roundPixels&65535,o=e.transform,s=o.a,c=o.b,l=o.c,u=o.d,d=o.tx,f=o.ty,{positions:p,uvs:m}=e,h=e.color,g=e.attributeOffset,_=g+e.attributeSize;for(let e=g;e<_;e++){let i=e*2,o=p[i],g=p[i+1];t[r++]=s*o+l*g+d,t[r++]=u*g+c*o+f,t[r++]=m[i],t[r++]=m[i+1],n[r++]=h,n[r++]=a}}packQuadAttributes(e,t,n,r,i){let a=e.texture,o=e.transform,s=o.a,c=o.b,l=o.c,u=o.d,d=o.tx,f=o.ty,p=e.bounds,m=p.maxX,h=p.minX,g=p.maxY,_=p.minY,v=a.uvs,y=e.color,b=i<<16|e.roundPixels&65535;t[r+0]=s*h+l*_+d,t[r+1]=u*_+c*h+f,t[r+2]=v.x0,t[r+3]=v.y0,n[r+4]=y,n[r+5]=b,t[r+6]=s*m+l*_+d,t[r+7]=u*_+c*m+f,t[r+8]=v.x1,t[r+9]=v.y1,n[r+10]=y,n[r+11]=b,t[r+12]=s*m+l*g+d,t[r+13]=u*g+c*m+f,t[r+14]=v.x2,t[r+15]=v.y2,n[r+16]=y,n[r+17]=b,t[r+18]=s*h+l*g+d,t[r+19]=u*g+c*h+f,t[r+20]=v.x3,t[r+21]=v.y3,n[r+22]=y,n[r+23]=b}_updateMaxTextures(e){this.shader.maxTextures!==e&&($=new Q(e),this.shader=$)}destroy(){this.shader=null,super.destroy()}},ot.extension={type:[r.Batcher],name:`default`},st=ot})))()}var lt;function ut(){return(ut=e((()=>{lt=class{constructor(e){this.items=Object.create(null);let{renderer:t,type:n,onUnload:r,priority:i,name:a}=e;this._renderer=t,t.gc.addResourceHash(this,`items`,n,i??0),this._onUnload=r,this.name=a}add(e){return!this.items[e.uid]&&(this.items[e.uid]=e,e.once(`unload`,this.remove,this),e._gcLastUsed=this._renderer.gc.now,!0)}remove(e,...t){if(!this.items[e.uid])return;let n=e._gpuData[this._renderer.uid];n&&(this._onUnload?.(e,...t),e.off(`unload`,this.remove,this),n.destroy(),e._gpuData[this._renderer.uid]=null,this.items[e.uid]=null)}removeAll(...e){Object.values(this.items).forEach(t=>t&&this.remove(t,...e))}destroy(...e){this.removeAll(...e),this.items=Object.create(null),this._renderer=null,this._onUnload=null}}})))()}export{E as $,De as A,U as B,ze as C,Le as D,Ie as E,we as F,j as G,V as H,Te as I,k as J,I as K,W as L,J as M,Ee as N,Ne as O,G as P,de as Q,be as R,Be as S,Pe as T,R as U,B as V,z as W,pe as X,A as Y,O as Z,qe as _,Q as a,ae as at,We as b,it as c,C as ct,et as d,w as et,Xe as f,Ke as g,Ge as h,ct as i,le as it,Oe as j,Fe as k,tt as l,$e as m,ut as n,se as nt,at as o,oe as ot,Qe as p,L as q,st as r,ce as rt,nt as s,S as st,lt as t,T as tt,Z as u,Ue as v,Ve as w,Re as x,He as y,H as z};