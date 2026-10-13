import{n as e,r as t}from"./rolldown-runtime-hePW80VL.js";import{$t as n,An as r,C as i,Jn as a,Vt as o,_ as s,at as c,hr as l,i as u,p as d,qt as f,tt as p}from"./icons-CRZDvY3q.js";import{t as m}from"./jsx-runtime-NZYk81nU.js";import{n as h,t as g}from"./proxy-CcNVlN68.js";import{n as _,t as v}from"./useReducedMotionFor-CUuntfCQ.js";import{d as y,f as b,m as x,n as S,o as C}from"./colorExtractor-DS0gTq5-.js";import{d as w,h as T,l as E,s as ee}from"./types-CXc8a1ne.js";import{r as te,t as D}from"./colorMix-CnH_WQSI.js";import{c as ne,i as O,n as re,t as ie}from"./urlBackground-Vw3fAM0W.js";import{a as ae,i as oe,n as se,s as ce,t as le}from"./lucideIconResolver-Dt9Hx26H.js";import{t as ue}from"./dist-Ds3MPQuv.js";var k=t(l(),1),A=m(),de=e=>e,fe=({onClick:e,label:t,title:n,isDaylight:r})=>(0,A.jsx)(`button`,{type:`button`,onClick:e,className:`h-6 rounded-md px-1.5 text-[10px] font-bold transition-all ${r?`bg-white shadow-sm hover:bg-white/90`:`bg-white/20 shadow-sm hover:bg-white/30`}`,title:n,"aria-label":n,children:t}),pe=({active:e,onToggle:t,label:n,theme:r,children:i})=>(0,A.jsx)(`button`,{type:`button`,onClick:t,className:`flex h-6 w-6 items-center justify-center rounded-md transition-all ${e?``:`opacity-40 hover:opacity-100`}`,style:e?{color:r.accentColor}:void 0,title:n,"aria-label":n,"aria-pressed":e,children:i}),j=({label:e,description:t,checked:n,onChange:r,theme:i})=>(0,A.jsxs)(`div`,{className:`flex items-center justify-between gap-4`,children:[(0,A.jsxs)(`div`,{className:`space-y-1`,children:[(0,A.jsx)(`div`,{className:`text-sm font-medium`,style:{color:i.primaryColor},children:e}),t&&(0,A.jsx)(`div`,{className:`max-w-[320px] text-xs opacity-70`,style:{color:i.secondaryColor},children:t})]}),(0,A.jsx)(`button`,{type:`button`,"aria-pressed":n,disabled:!r,onClick:()=>r?.(!n),className:`h-6 w-12 shrink-0 rounded-full p-1 transition-colors disabled:opacity-45`,style:{backgroundColor:n?i.secondaryColor:D(i.secondaryColor,.18)},children:(0,A.jsx)(`div`,{className:`h-4 w-4 rounded-full shadow-sm transition-transform ${n?`translate-x-6`:`translate-x-0`}`,style:{backgroundColor:i.backgroundColor}})})]}),me=({config:e,actions:t,t:n,theme:r,controlCardBg:i,rangeInputClass:a,onSliderPointerDown:o,onSliderCommit:s})=>{let c=e?.common,l=t?.common,u=D(r.secondaryColor,.16),d=c?.opacity??.75;return(0,A.jsxs)(A.Fragment,{children:[(0,A.jsxs)(`div`,{className:`rounded-[24px] border p-4 space-y-4`,style:{backgroundColor:i,borderColor:u},children:[(0,A.jsx)(j,{label:n(`options.disableVisualizerVignette`),description:n(`options.disableVisualizerVignetteDesc`),checked:c?.disableVignette??!1,onChange:l?.onDisableVignetteChange,theme:r}),(0,A.jsx)(j,{label:n(`options.disableVisualizerGeometricBackground`),description:n(`options.disableVisualizerGeometricBackgroundDesc`),checked:c?.disableGeometricBackground??!1,onChange:l?.onDisableGeometricChange,theme:r})]}),(0,A.jsx)(`div`,{className:`rounded-[24px] border p-4 space-y-4`,style:{backgroundColor:i,borderColor:u},children:(0,A.jsxs)(`div`,{className:`space-y-2`,children:[(0,A.jsx)(`div`,{className:`text-sm font-medium`,style:{color:r.primaryColor},children:n(`options.previewCoverBackgroundSettings`)}),(0,A.jsx)(`div`,{className:`text-xs opacity-70`,style:{color:r.secondaryColor},children:n(`options.previewCoverBackgroundSettingsDesc`)}),(0,A.jsx)(j,{label:n(`theme.addCoverColor`),description:n(`options.coverColorBackgroundDesc`),checked:c?.useCoverColorBg??!1,onChange:l?.onCoverColorChange,theme:r}),(0,A.jsxs)(`div`,{className:`flex items-center justify-between text-sm`,style:{color:r.primaryColor},children:[(0,A.jsx)(`span`,{children:n(`options.previewCoverBackgroundOpacity`)}),(0,A.jsxs)(`span`,{className:`font-mono opacity-70`,style:{color:r.secondaryColor},children:[Math.round(d*100),`%`]})]}),(0,A.jsx)(`input`,{type:`range`,min:`0`,max:`1`,step:`0.05`,value:d,onChange:e=>l?.onOpacityChange?.(Number(e.target.value)),onPointerDown:o,onPointerUp:s,className:a})]})})]})},he=(e,t,n)=>{let r=n=>Math.min(C(e,n)/4.5,C(t,n)/3),i=[n,`#ffffff`,`#000000`].reduce((e,t)=>r(t)>r(e)?t:e,n),a=y(i);for(let e=0;e<=100;e++){let t=e/100;if([0,255].map(e=>b({r:a.r*t+e*(1-t),g:a.g*t+e*(1-t),b:a.b*t+e*(1-t)})).every(e=>r(e)>=1))return{color:i,opacity:t}}return{color:i,opacity:1}},M=24,ge=96,_e=()=>{if(typeof navigator>`u`)return!1;let e=navigator.userAgent,t=/iPad|iPhone|iPod/i.test(e)||navigator.platform===`MacIntel`&&navigator.maxTouchPoints>1,n=/WebKit/i.test(e),r=/CriOS|FxiOS|EdgiOS|OPiOS|DuckDuckGo|YaBrowser|GSA/i.test(e);return t&&n&&!r},ve=e=>new Promise(t=>{if(typeof document>`u`){t(null);return}let n=new Image;n.crossOrigin=`anonymous`,n.decoding=`async`,n.onload=()=>{try{let e=document.createElement(`canvas`),r=document.createElement(`canvas`);e.width=M,e.height=M,r.width=ge,r.height=ge;let i=e.getContext(`2d`),a=r.getContext(`2d`);if(!i||!a){t(null);return}let o=n.naturalWidth||n.width,s=n.naturalHeight||n.height,c=Math.min(o,s),l=Math.max(0,(o-c)/2),u=Math.max(0,(s-c)/2);i.imageSmoothingEnabled=!0,i.imageSmoothingQuality=`high`,i.drawImage(n,l,u,c,c,0,0,M,M),a.imageSmoothingEnabled=!0,a.imageSmoothingQuality=`high`,a.globalAlpha=1,a.drawImage(e,0,0,M,M,0,0,ge,ge),[{x:-8,y:-8,size:112,alpha:.22},{x:6,y:0,size:ge,alpha:.14},{x:0,y:6,size:ge,alpha:.14}].forEach(({x:t,y:n,size:r,alpha:i})=>{a.globalAlpha=i,a.drawImage(e,0,0,M,M,t,n,r,r)}),a.globalAlpha=1,t(r.toDataURL(`image/jpeg`,.72))}catch(e){console.warn(`[FluidBackground] Failed to build soft focus cover`,e),t(null)}},n.onerror=()=>t(null),n.src=e}),ye=384,be=(e,t)=>new Promise(n=>{if(typeof document>`u`){n(null);return}let r=new Image;r.crossOrigin=`anonymous`,r.decoding=`async`,r.onload=()=>{try{let e=r.naturalWidth||r.width,i=r.naturalHeight||r.height;if(!e||!i){n(null);return}let a=Math.min(1,t/Math.max(e,i)),o=Math.max(1,Math.round(e*a)),s=Math.max(1,Math.round(i*a)),c=document.createElement(`canvas`);c.width=o,c.height=s;let l=c.getContext(`2d`);if(!l){n(null);return}l.imageSmoothingEnabled=!0,l.imageSmoothingQuality=`high`,l.drawImage(r,0,0,o,s),n(c.toDataURL(`image/jpeg`,.82))}catch(e){console.warn(`[FluidBackground] Failed to downscale cover`,e),n(null)}},r.onerror=()=>n(null),r.src=e}),xe=(0,k.memo)(({coverUrl:e,theme:t})=>{let n=(0,k.useMemo)(_e,[]),r=(0,k.useMemo)(()=>he(t.primaryColor,t.secondaryColor,t.backgroundColor),[t.primaryColor,t.secondaryColor,t.backgroundColor]),[i,a]=(0,k.useState)(null);(0,k.useEffect)(()=>{let t=!1;return!n||!e?(a(null),()=>{t=!0}):(a(null),ve(e).then(e=>{t||a(e)}),()=>{t=!0})},[e,n]);let o=(0,k.useRef)(0),[s,c]=(0,k.useState)([]),[l,u]=(0,k.useState)(()=>new Set);(0,k.useEffect)(()=>{if(n)return;if(!e){c([]);return}let t=!1;return be(e,ye).then(n=>{if(t)return;let r=n??e;c(t=>{let n=t[t.length-1];return n&&n.sourceCover===e?t:(o.current+=1,[...n?[n]:[],{url:r,sourceCover:e,key:o.current}])})}),()=>{t=!0}},[e,n]);let d=(0,k.useCallback)(e=>{u(t=>t.has(e)?t:new Set(t).add(e))},[]),f=n?i??e??null:null,p=n&&!!i,m=(0,k.useMemo)(()=>n?{transform:`scale(${p?1.28:1.2}) translateZ(0)`,opacity:p?.94:.3,willChange:`transform, opacity`,backfaceVisibility:`hidden`,WebkitBackfaceVisibility:`hidden`}:{filter:`blur(40px)`,transform:`scale(1.5) translateZ(0)`,opacity:1,willChange:`transform, opacity, filter`,backfaceVisibility:`hidden`,WebkitBackfaceVisibility:`hidden`},[n,p]);return(0,A.jsxs)(`div`,{className:`absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0`,style:{isolation:`isolate`,contain:`paint`,transform:`translateZ(0)`},children:[e?(0,A.jsxs)(A.Fragment,{children:[n?(0,A.jsx)(`img`,{src:f??e,alt:``,"aria-hidden":`true`,draggable:!1,decoding:`async`,className:`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-out`,style:m}):s.map((e,t)=>{let n=t===s.length-1,r=l.has(e.key);return(0,A.jsx)(g.div,{className:`absolute inset-0 w-full h-full`,style:{willChange:`opacity`},initial:{opacity:+!n},animate:{opacity:n&&!r?0:1},transition:{duration:1.5,ease:`easeInOut`},onAnimationComplete:()=>{n&&r&&(c(t=>t.filter(t=>t.key===e.key)),u(t=>t.has(e.key)?new Set([e.key]):t))},children:(0,A.jsx)(`img`,{src:e.url,alt:``,"aria-hidden":`true`,draggable:!1,decoding:`async`,className:`absolute inset-0 w-full h-full object-cover`,style:m,ref:t=>{t&&!l.has(e.key)&&t.decode().then(()=>requestAnimationFrame(()=>d(e.key))).catch(()=>d(e.key))},onError:()=>{c(t=>t.length>1?t.filter(t=>t.key!==e.key):t)}})},e.key)}),n&&(0,A.jsxs)(A.Fragment,{children:[!p&&(0,A.jsx)(`img`,{src:e,alt:``,"aria-hidden":`true`,draggable:!1,decoding:`async`,className:`absolute inset-0 w-full h-full object-cover`,style:{transform:`scale(1.36) translateZ(0)`,opacity:.12,willChange:`transform, opacity`,backfaceVisibility:`hidden`,WebkitBackfaceVisibility:`hidden`}}),(0,A.jsx)(`div`,{className:`absolute inset-0 w-full h-full`,style:{backgroundColor:t.backgroundColor,opacity:.28}}),(0,A.jsx)(`div`,{className:`absolute inset-0 w-full h-full`,style:{background:`radial-gradient(circle at 20% 20%, ${t.accentColor}55 0%, transparent 42%), radial-gradient(circle at 80% 28%, ${t.secondaryColor}50 0%, transparent 44%), radial-gradient(circle at 50% 78%, ${t.primaryColor}28 0%, transparent 52%)`,opacity:p?.52:.7}})]})]}):(0,A.jsx)(`div`,{className:`absolute inset-0 w-full h-full transition-colors duration-1000`,style:{backgroundColor:t.backgroundColor,opacity:.8}}),(0,A.jsx)(`div`,{"aria-hidden":`true`,"data-cover-readability":`true`,className:`absolute inset-0 w-full h-full pointer-events-none`,style:{backgroundColor:r.color,opacity:r.opacity}})]})},(e,t)=>{if(e.coverUrl!==t.coverUrl)return!1;let n=e.theme,r=t.theme;return n.backgroundColor===r.backgroundColor&&n.primaryColor===r.primaryColor&&n.secondaryColor===r.secondaryColor}),Se=e=>{let t=e?.join(`
`)??``;return(0,k.useEffect)(()=>{t&&oe(t.split(`
`))},[t]),(0,k.useSyncExternalStore)(ce,le,le)},Ce=e=>{switch(e.type){case`circle`:return`bass`;case`square`:return`lowMid`;case`triangle`:return`mid`;case`cross`:return`treble`;case`icon`:return`vocal`;default:return`default`}},we=e=>e===`triangle`?`polygon(50% 0%, 0% 100%, 100% 100%)`:e===`cross`?`polygon(20% 0%, 0% 20%, 30% 50%, 0% 80%, 20% 100%, 50% 70%, 80% 100%, 100% 80%, 70% 50%, 100% 20%, 80% 0%, 50% 30%)`:`none`,Te=(e,t)=>{let n=(e.type===`circle`||e.type===`square`)&&!e.filled;return{left:`${e.initialX}%`,top:`${e.initialY}%`,width:e.size,height:e.size,border:n?`1px solid ${t.secondaryColor}`:`none`,backgroundColor:n?`transparent`:t.secondaryColor,borderRadius:e.type===`circle`?`50%`:`0%`,opacity:e.opacity,clipPath:we(e.type)}},Ee=({disabled:e=!1})=>e?null:(0,A.jsx)(`div`,{className:`absolute inset-0 pointer-events-none`,style:{background:`radial-gradient(circle, transparent 40%, rgba(0,0,0,0.6) 100%)`}}),De=({theme:e,shapes:t,particles:n,hideShapes:r,disableVignette:i})=>(0,A.jsxs)(`div`,{className:`absolute inset-0`,children:[!r&&(0,A.jsxs)(A.Fragment,{children:[t.map(t=>{if(t.type===`icon`&&t.iconName){if(se(t.iconName)===`loading`)return null;let n=ae(t.iconName);if(n)return(0,A.jsx)(`div`,{className:`absolute flex items-center justify-center`,style:{left:`${t.initialX}%`,top:`${t.initialY}%`,width:t.size,height:t.size,color:e.secondaryColor,opacity:t.opacity,transform:`rotate(${t.initialRotation}deg)`},children:(0,A.jsx)(n,{size:t.size,strokeWidth:1,absoluteStrokeWidth:!0})},t.id)}return(0,A.jsx)(`div`,{className:`absolute`,style:{...Te(t,e),transform:`rotate(${t.initialRotation}deg)`}},t.id)}),n.map(t=>(0,A.jsx)(`div`,{className:`absolute rounded-full`,style:{backgroundColor:e.accentColor,width:t.size,height:t.size,left:`${t.left}%`,top:`${t.top}%`,opacity:t.opacity}},`p-${t.id}`))]}),(0,A.jsx)(Ee,{disabled:i})]}),Oe=({theme:e,audioPower:t,audioBands:n,shapes:r,particles:i,hideShapes:a,disableVignette:o})=>{let s=e=>{let n=x(e||t,{stiffness:300,damping:30});return _(n,[10,200],[.95,1.45])},c={bass:s(n?.bass),lowMid:s(n?.lowMid),mid:s(n?.mid),vocal:s(n?.vocal),treble:s(n?.treble),default:s(t)};return(0,A.jsxs)(`div`,{className:`absolute inset-0`,children:[!a&&(0,A.jsxs)(A.Fragment,{children:[r.map(t=>{if(t.type===`icon`&&t.iconName){if(se(t.iconName)===`loading`)return null;let n=ae(t.iconName);if(n)return(0,A.jsx)(g.div,{className:`absolute flex items-center justify-center`,style:{left:`${t.initialX}%`,top:`${t.initialY}%`,width:t.size,height:t.size,color:e.secondaryColor,scale:c.vocal},animate:{y:t.reverse?[-30,30,-30]:[30,-30,30],x:t.reverse?[15,-15,15]:[-15,15,-15],rotate:[t.initialRotation,t.initialRotation+360],opacity:[0,t.opacity*3,0]},transition:{duration:t.duration,repeat:1/0,ease:`linear`,delay:t.delay,opacity:{duration:t.duration*.5,repeat:1/0,ease:`easeInOut`,delay:t.delay}},children:(0,A.jsx)(n,{size:t.size,strokeWidth:1,absoluteStrokeWidth:!0})},t.id)}return(0,A.jsx)(g.div,{className:`absolute`,style:{...Te(t,e),scale:c[Ce(t)]},animate:{y:t.reverse?[-30,30,-30]:[30,-30,30],x:t.reverse?[15,-15,15]:[-15,15,-15],rotate:[t.initialRotation,t.initialRotation+360]},transition:{duration:t.duration,repeat:1/0,ease:`linear`,delay:t.delay}},t.id)}),i.map(t=>(0,A.jsx)(g.div,{className:`absolute rounded-full`,style:{backgroundColor:e.accentColor,width:t.size,height:t.size,left:`${t.left}%`,top:`${t.top}%`,opacity:t.opacity},animate:{y:[0,-100],opacity:[0,t.opacity,0]},transition:{duration:t.duration,repeat:1/0,ease:`linear`,delay:t.delay}},`p-${t.id}`))]}),(0,A.jsx)(Ee,{disabled:o})]})},ke=({theme:e,audioPower:t,audioBands:n,seed:r,hideShapes:i=!1,disableVignette:a=!1,paused:o=!1})=>{Se(e.lyricsIcons);let s=(0,k.useMemo)(()=>{let t=[`circle`,`square`,`triangle`,`cross`],n=e.lyricsIcons||[],r=0;return Array.from({length:15}).map((e,i)=>{let a=n.length>0&&Math.random()>.7&&r<6;a&&(r+=1);let o=a?n[Math.floor(Math.random()*n.length)]:null;return{id:i,type:a?`icon`:t[Math.floor(Math.random()*t.length)],iconName:o,initialX:Math.random()*100,initialY:Math.random()*100,size:40+Math.random()*100,duration:a?20+Math.random()*20:30+Math.random()*30,delay:Math.random()*5,opacity:.11+Math.random()*.08,reverse:Math.random()>.5,filled:Math.random()<.3,initialRotation:Math.random()*360}})},[e.lyricsIcons,r]),c=(0,k.useMemo)(()=>Array.from({length:20}).map((e,t)=>({id:t,size:Math.random()*4+1,left:Math.random()*100,top:Math.random()*100,opacity:Math.random()*.3,duration:15+Math.random()*20,delay:Math.random()*10})),[r]);return(0,A.jsx)(g.div,{className:`absolute inset-0`,initial:{opacity:0},animate:{opacity:1},exit:{opacity:0},transition:{duration:.6,ease:`easeInOut`},children:o?(0,A.jsx)(De,{theme:e,shapes:s,particles:c,hideShapes:i,disableVignette:a}):(0,A.jsx)(Oe,{theme:e,audioPower:t,audioBands:n,shapes:s,particles:c,hideShapes:i,disableVignette:a})})},Ae=k.memo(e=>{let t=String(e.seed??`default`);return(0,A.jsx)(`div`,{className:`absolute inset-0 overflow-hidden pointer-events-none`,children:(0,A.jsx)(h,{mode:`sync`,children:(0,A.jsx)(ke,{...e},t)})})},(e,t)=>{if(e.seed!==t.seed||e.audioPower!==t.audioPower||e.hideShapes!==t.hideShapes||e.disableVignette!==t.disableVignette||e.paused!==t.paused)return!1;let n=e.audioBands,r=t.audioBands;if(!n!=!r)return!1;let i=!0;if(n&&r&&(i=n.bass===r.bass&&n.lowMid===r.lowMid&&n.mid===r.mid&&n.vocal===r.vocal&&n.treble===r.treble),!i)return!1;let a=e.theme,o=t.theme,s=a.backgroundColor===o.backgroundColor&&a.primaryColor===o.primaryColor&&a.secondaryColor===o.secondaryColor&&a.accentColor===o.accentColor,c=!!(a.lyricsIcons===o.lyricsIcons||a.lyricsIcons?.length===o.lyricsIcons?.length&&a.lyricsIcons?.every((e,t)=>e===o.lyricsIcons?.[t]));return s&&c}),je=e({default:()=>Me}),Me=de({mode:`common`,order:10,labelKey:`options.visualizerBackgroundModeCommon`,labelFallback:`Common`,render:({config:e,theme:t,coverUrl:n,audioPower:r,audioBands:i,seed:a,staticMode:o,paused:s})=>{let c=e?.common,l=c?.useCoverColorBg??!1;return(0,A.jsxs)(A.Fragment,{children:[l&&(0,A.jsx)(g.div,{initial:{opacity:0},animate:{opacity:1},exit:{opacity:0},transition:{duration:1},className:`absolute inset-0 z-0`,children:(0,A.jsx)(xe,{coverUrl:n,theme:t})},`fluid-bg`),(0,A.jsx)(`div`,{className:`absolute inset-0 z-0 transition-all duration-1000`,style:{backgroundColor:t.backgroundColor,opacity:l?c?.opacity??.75:1}}),!o&&(0,A.jsx)(`div`,{className:`absolute inset-0 z-0`,children:(0,A.jsx)(Ae,{theme:t,audioPower:r,audioBands:i,seed:a,hideShapes:c?.disableGeometricBackground??!1,disableVignette:c?.disableVignette??!1,paused:s})})]})},renderSettingsPanel:e=>(0,A.jsx)(me,{...e}),renderQuickControls:({config:e,actions:t,t:n,theme:i})=>{let a=e?.common?.useCoverColorBg??!1;return(0,A.jsx)(pe,{active:a,theme:i,label:n(a?`theme.addCoverColor`:`theme.useDefaultColor`),onToggle:()=>t?.common?.onCoverColorChange?.(!a),children:(0,A.jsx)(r,{size:14})})},resetSettings:e=>{e?.common?.onOpacityChange?.(.75),e?.common?.onCoverColorChange?.(!1),e?.common?.onDisableVignetteChange?.(!1),e?.common?.onDisableGeometricChange?.(!1)}}),Ne=`#version 300 es
precision mediump float;

layout(location = 0) in vec4 a_position;

uniform vec2 u_resolution;
uniform float u_pixelRatio;
uniform float u_imageAspectRatio;
uniform float u_originX;
uniform float u_originY;
uniform float u_worldWidth;
uniform float u_worldHeight;
uniform float u_fit;
uniform float u_scale;
uniform float u_rotation;
uniform float u_offsetX;
uniform float u_offsetY;

out vec2 v_objectUV;
out vec2 v_objectBoxSize;
out vec2 v_responsiveUV;
out vec2 v_responsiveBoxGivenSize;
out vec2 v_patternUV;
out vec2 v_patternBoxSize;
out vec2 v_imageUV;

vec3 getBoxSize(float boxRatio, vec2 givenBoxSize) {
  vec2 box = vec2(0.);
  // fit = none
  box.x = boxRatio * min(givenBoxSize.x / boxRatio, givenBoxSize.y);
  float noFitBoxWidth = box.x;
  if (u_fit == 1.) { // fit = contain
    box.x = boxRatio * min(u_resolution.x / boxRatio, u_resolution.y);
  } else if (u_fit == 2.) { // fit = cover
    box.x = boxRatio * max(u_resolution.x / boxRatio, u_resolution.y);
  }
  box.y = box.x / boxRatio;
  return vec3(box, noFitBoxWidth);
}

void main() {
  gl_Position = a_position;

  vec2 uv = gl_Position.xy * .5;
  vec2 boxOrigin = vec2(.5 - u_originX, u_originY - .5);
  vec2 givenBoxSize = vec2(u_worldWidth, u_worldHeight);
  givenBoxSize = max(givenBoxSize, vec2(1.)) * u_pixelRatio;
  float r = u_rotation * 3.14159265358979323846 / 180.;
  mat2 graphicRotation = mat2(cos(r), sin(r), -sin(r), cos(r));
  vec2 graphicOffset = vec2(-u_offsetX, u_offsetY);


  // ===================================================

  float fixedRatio = 1.;
  vec2 fixedRatioBoxGivenSize = vec2(
  (u_worldWidth == 0.) ? u_resolution.x : givenBoxSize.x,
  (u_worldHeight == 0.) ? u_resolution.y : givenBoxSize.y
  );

  v_objectBoxSize = getBoxSize(fixedRatio, fixedRatioBoxGivenSize).xy;
  vec2 objectWorldScale = u_resolution.xy / v_objectBoxSize;

  v_objectUV = uv;
  v_objectUV *= objectWorldScale;
  v_objectUV += boxOrigin * (objectWorldScale - 1.);
  v_objectUV += graphicOffset;
  v_objectUV /= u_scale;
  v_objectUV = graphicRotation * v_objectUV;

  // ===================================================

  v_responsiveBoxGivenSize = vec2(
  (u_worldWidth == 0.) ? u_resolution.x : givenBoxSize.x,
  (u_worldHeight == 0.) ? u_resolution.y : givenBoxSize.y
  );
  float responsiveRatio = v_responsiveBoxGivenSize.x / v_responsiveBoxGivenSize.y;
  vec2 responsiveBoxSize = getBoxSize(responsiveRatio, v_responsiveBoxGivenSize).xy;
  vec2 responsiveBoxScale = u_resolution.xy / responsiveBoxSize;

  #ifdef ADD_HELPERS
  v_responsiveHelperBox = uv;
  v_responsiveHelperBox *= responsiveBoxScale;
  v_responsiveHelperBox += boxOrigin * (responsiveBoxScale - 1.);
  #endif

  v_responsiveUV = uv;
  v_responsiveUV *= responsiveBoxScale;
  v_responsiveUV += boxOrigin * (responsiveBoxScale - 1.);
  v_responsiveUV += graphicOffset;
  v_responsiveUV /= u_scale;
  v_responsiveUV.x *= responsiveRatio;
  v_responsiveUV = graphicRotation * v_responsiveUV;
  v_responsiveUV.x /= responsiveRatio;

  // ===================================================

  float patternBoxRatio = givenBoxSize.x / givenBoxSize.y;
  vec2 patternBoxGivenSize = vec2(
  (u_worldWidth == 0.) ? u_resolution.x : givenBoxSize.x,
  (u_worldHeight == 0.) ? u_resolution.y : givenBoxSize.y
  );
  patternBoxRatio = patternBoxGivenSize.x / patternBoxGivenSize.y;

  vec3 boxSizeData = getBoxSize(patternBoxRatio, patternBoxGivenSize);
  v_patternBoxSize = boxSizeData.xy;
  float patternBoxNoFitBoxWidth = boxSizeData.z;
  vec2 patternBoxScale = u_resolution.xy / v_patternBoxSize;

  v_patternUV = uv;
  v_patternUV += graphicOffset / patternBoxScale;
  v_patternUV += boxOrigin;
  v_patternUV -= boxOrigin / patternBoxScale;
  v_patternUV *= u_resolution.xy;
  v_patternUV /= u_pixelRatio;
  if (u_fit > 0.) {
    v_patternUV *= (patternBoxNoFitBoxWidth / v_patternBoxSize.x);
  }
  v_patternUV /= u_scale;
  v_patternUV = graphicRotation * v_patternUV;
  v_patternUV += boxOrigin / patternBoxScale;
  v_patternUV -= boxOrigin;
  // x100 is a default multiplier between vertex and fragmant shaders
  // we use it to avoid UV presision issues
  v_patternUV *= .01;

  // ===================================================

  vec2 imageBoxSize;
  if (u_fit == 1.) { // contain
    imageBoxSize.x = min(u_resolution.x / u_imageAspectRatio, u_resolution.y) * u_imageAspectRatio;
  } else if (u_fit == 2.) { // cover
    imageBoxSize.x = max(u_resolution.x / u_imageAspectRatio, u_resolution.y) * u_imageAspectRatio;
  } else {
    imageBoxSize.x = min(10.0, 10.0 / u_imageAspectRatio * u_imageAspectRatio);
  }
  imageBoxSize.y = imageBoxSize.x / u_imageAspectRatio;
  vec2 imageBoxScale = u_resolution.xy / imageBoxSize;

  v_imageUV = uv;
  v_imageUV *= imageBoxScale;
  v_imageUV += boxOrigin * (imageBoxScale - 1.);
  v_imageUV += graphicOffset;
  v_imageUV /= u_scale;
  v_imageUV.x *= u_imageAspectRatio;
  v_imageUV = graphicRotation * v_imageUV;
  v_imageUV.x /= u_imageAspectRatio;

  v_imageUV += .5;
  v_imageUV.y = 1. - v_imageUV.y;
}`,Pe=8294400,Fe=class{parentElement;canvasElement;gl;program=null;uniformLocations={};fragmentShader;rafId=null;lastRenderTime=0;currentFrame=0;speed=0;currentSpeed=0;providedUniforms;mipmaps=[];hasBeenDisposed=!1;resolutionChanged=!0;textures=new Map;minPixelRatio;maxPixelCount;isSafari=ze();uniformCache={};textureUnitMap=new Map;ownerDocument;constructor(e,t,n,r,i=0,a=0,o=2,s=Pe,c=[]){if(e?.nodeType===1)this.parentElement=e;else throw Error(`Paper Shaders: parent element must be an HTMLElement`);if(this.ownerDocument=e.ownerDocument,!this.ownerDocument.querySelector(`style[data-paper-shader]`)){let e=this.ownerDocument.createElement(`style`);e.innerHTML=Re,e.setAttribute(`data-paper-shader`,``),this.ownerDocument.head.prepend(e)}let l=this.ownerDocument.createElement(`canvas`);this.canvasElement=l,this.parentElement.prepend(l),this.fragmentShader=t,this.providedUniforms=n,this.mipmaps=c,this.currentFrame=a,this.minPixelRatio=o,this.maxPixelCount=s;let u=l.getContext(`webgl2`,r);if(!u)throw Error(`Paper Shaders: WebGL is not supported in this browser`);this.gl=u,this.initProgram(),this.setupPositionAttribute(),this.setupUniforms(),this.setUniformValues(this.providedUniforms),this.setupResizeObserver(),visualViewport?.addEventListener(`resize`,this.handleVisualViewportChange),this.setupIntersectionObserver(),this.setSpeed(i),this.parentElement.setAttribute(`data-paper-shader`,``),this.parentElement.paperShaderMount=this,this.ownerDocument.addEventListener(`visibilitychange`,this.handleDocumentVisibilityChange)}initProgram=()=>{let e=Le(this.gl,Ne,this.fragmentShader);e&&(this.program=e)};setupPositionAttribute=()=>{let e=this.gl.getAttribLocation(this.program,`a_position`),t=this.gl.createBuffer();this.gl.bindBuffer(this.gl.ARRAY_BUFFER,t),this.gl.bufferData(this.gl.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,-1,1,1,-1,1,1]),this.gl.STATIC_DRAW),this.gl.enableVertexAttribArray(e),this.gl.vertexAttribPointer(e,2,this.gl.FLOAT,!1,0,0)};setupUniforms=()=>{let e={u_time:this.gl.getUniformLocation(this.program,`u_time`),u_pixelRatio:this.gl.getUniformLocation(this.program,`u_pixelRatio`),u_resolution:this.gl.getUniformLocation(this.program,`u_resolution`)};Object.entries(this.providedUniforms).forEach(([t,n])=>{if(e[t]=this.gl.getUniformLocation(this.program,t),n instanceof HTMLImageElement){let n=`${t}AspectRatio`;e[n]=this.gl.getUniformLocation(this.program,n)}}),this.uniformLocations=e};renderScale=1;parentWidth=0;parentHeight=0;parentDevicePixelWidth=0;parentDevicePixelHeight=0;devicePixelsSupported=!1;intersectionObserver=null;isInViewport=!0;resizeObserver=null;setupResizeObserver=()=>{this.resizeObserver=new ResizeObserver(([e])=>{if(e?.borderBoxSize[0]){let t=e.devicePixelContentBoxSize?.[0];t!==void 0&&(this.devicePixelsSupported=!0,this.parentDevicePixelWidth=t.inlineSize,this.parentDevicePixelHeight=t.blockSize),this.parentWidth=e.borderBoxSize[0].inlineSize,this.parentHeight=e.borderBoxSize[0].blockSize}this.handleResize()}),this.resizeObserver.observe(this.parentElement)};setupIntersectionObserver=()=>{let e=this.ownerDocument.defaultView;e?.IntersectionObserver&&(this.intersectionObserver=new e.IntersectionObserver(([e])=>{this.isInViewport=e?.isIntersecting??!0,this.updateCurrentSpeed()}),this.intersectionObserver.observe(this.parentElement))};handleVisualViewportChange=()=>{this.resizeObserver?.disconnect(),this.setupResizeObserver()};handleResize=()=>{let e=0,t=0,n=Math.max(1,window.devicePixelRatio),r=visualViewport?.scale??1;if(this.devicePixelsSupported){let i=Math.max(1,this.minPixelRatio/n);e=this.parentDevicePixelWidth*i*r,t=this.parentDevicePixelHeight*i*r}else{let i=Math.max(n,this.minPixelRatio)*r;if(this.isSafari){let e=Be(this.ownerDocument);i*=Math.max(1,e)}e=Math.round(this.parentWidth)*i,t=Math.round(this.parentHeight)*i}let i=Math.sqrt(this.maxPixelCount)/Math.sqrt(e*t),a=Math.min(1,i),o=Math.round(e*a),s=Math.round(t*a),c=o/Math.round(this.parentWidth);(this.canvasElement.width!==o||this.canvasElement.height!==s||this.renderScale!==c)&&(this.renderScale=c,this.canvasElement.width=o,this.canvasElement.height=s,this.resolutionChanged=!0,this.gl.viewport(0,0,this.gl.canvas.width,this.gl.canvas.height),this.render(performance.now()))};render=e=>{if(this.hasBeenDisposed)return;if(this.program===null){console.warn(`Tried to render before program or gl was initialized`);return}let t=e-this.lastRenderTime;this.lastRenderTime=e,this.currentSpeed!==0&&(this.currentFrame+=t*this.currentSpeed),this.gl.clear(this.gl.COLOR_BUFFER_BIT),this.gl.useProgram(this.program),this.gl.uniform1f(this.uniformLocations.u_time,this.currentFrame*.001),this.resolutionChanged&&=(this.gl.uniform2f(this.uniformLocations.u_resolution,this.gl.canvas.width,this.gl.canvas.height),this.gl.uniform1f(this.uniformLocations.u_pixelRatio,this.renderScale),!1),this.gl.drawArrays(this.gl.TRIANGLES,0,6),this.currentSpeed===0?this.rafId=null:this.requestRender()};requestRender=()=>{this.rafId!==null&&cancelAnimationFrame(this.rafId),this.rafId=requestAnimationFrame(this.render)};setTextureUniform=(e,t)=>{if(!t.complete||t.naturalWidth===0)throw Error(`Paper Shaders: image for uniform ${e} must be fully loaded`);let n=this.textures.get(e);n&&this.gl.deleteTexture(n),this.textureUnitMap.has(e)||this.textureUnitMap.set(e,this.textureUnitMap.size);let r=this.textureUnitMap.get(e);this.gl.activeTexture(this.gl.TEXTURE0+r);let i=this.gl.createTexture();this.gl.bindTexture(this.gl.TEXTURE_2D,i),this.gl.texParameteri(this.gl.TEXTURE_2D,this.gl.TEXTURE_WRAP_S,this.gl.CLAMP_TO_EDGE),this.gl.texParameteri(this.gl.TEXTURE_2D,this.gl.TEXTURE_WRAP_T,this.gl.CLAMP_TO_EDGE),this.gl.texParameteri(this.gl.TEXTURE_2D,this.gl.TEXTURE_MIN_FILTER,this.gl.LINEAR),this.gl.texParameteri(this.gl.TEXTURE_2D,this.gl.TEXTURE_MAG_FILTER,this.gl.LINEAR),this.gl.texImage2D(this.gl.TEXTURE_2D,0,this.gl.RGBA,this.gl.RGBA,this.gl.UNSIGNED_BYTE,t),this.mipmaps.includes(e)&&(this.gl.generateMipmap(this.gl.TEXTURE_2D),this.gl.texParameteri(this.gl.TEXTURE_2D,this.gl.TEXTURE_MIN_FILTER,this.gl.LINEAR_MIPMAP_LINEAR));let a=this.gl.getError();if(a!==this.gl.NO_ERROR||i===null){console.error(`Paper Shaders: WebGL error when uploading texture:`,a);return}this.textures.set(e,i);let o=this.uniformLocations[e];if(o){this.gl.uniform1i(o,r);let n=`${e}AspectRatio`,i=this.uniformLocations[n];if(i){let e=t.naturalWidth/t.naturalHeight;this.gl.uniform1f(i,e)}}};areUniformValuesEqual=(e,t)=>e===t?!0:Array.isArray(e)&&Array.isArray(t)&&e.length===t.length?e.every((e,n)=>this.areUniformValuesEqual(e,t[n])):!1;setUniformValues=e=>{this.gl.useProgram(this.program),Object.entries(e).forEach(([e,t])=>{let n=t;if(t instanceof HTMLImageElement&&(n=`${t.src.slice(0,200)}|${t.naturalWidth}x${t.naturalHeight}`),this.areUniformValuesEqual(this.uniformCache[e],n))return;this.uniformCache[e]=n;let r=this.uniformLocations[e];if(!r)console.warn(`Uniform location for ${e} not found`);else if(t instanceof HTMLImageElement)this.setTextureUniform(e,t);else if(Array.isArray(t)){let n=null,i=null;if(t[0]!==void 0&&Array.isArray(t[0])){let r=t[0].length;if(t.every(e=>e.length===r))n=t.flat(),i=r;else{console.warn(`All child arrays must be the same length for ${e}`);return}}else n=t,i=n.length;switch(i){case 2:this.gl.uniform2fv(r,n);break;case 3:this.gl.uniform3fv(r,n);break;case 4:this.gl.uniform4fv(r,n);break;case 9:this.gl.uniformMatrix3fv(r,!1,n);break;case 16:this.gl.uniformMatrix4fv(r,!1,n);break;default:console.warn(`Unsupported uniform array length: ${i}`)}}else typeof t==`number`?this.gl.uniform1f(r,t):typeof t==`boolean`?this.gl.uniform1i(r,+!!t):console.warn(`Unsupported uniform type for ${e}: ${typeof t}`)})};getCurrentFrame=()=>this.currentFrame;setFrame=e=>{this.currentFrame=e,this.lastRenderTime=performance.now(),this.render(performance.now())};setSpeed=(e=1)=>{this.speed=e,this.updateCurrentSpeed()};updateCurrentSpeed=()=>{this.setCurrentSpeed(this.ownerDocument.hidden||!this.isInViewport?0:this.speed)};setCurrentSpeed=e=>{this.currentSpeed=e,this.rafId===null&&e!==0&&(this.lastRenderTime=performance.now(),this.rafId=requestAnimationFrame(this.render)),this.rafId!==null&&e===0&&(cancelAnimationFrame(this.rafId),this.rafId=null)};setMaxPixelCount=(e=Pe)=>{this.maxPixelCount=e,this.handleResize()};setMinPixelRatio=(e=2)=>{this.minPixelRatio=e,this.handleResize()};setUniforms=e=>{this.setUniformValues(e),this.providedUniforms={...this.providedUniforms,...e},this.render(performance.now())};handleDocumentVisibilityChange=()=>{this.updateCurrentSpeed()};dispose=()=>{this.hasBeenDisposed=!0,this.rafId!==null&&(cancelAnimationFrame(this.rafId),this.rafId=null),this.gl&&this.program&&(this.textures.forEach(e=>{this.gl.deleteTexture(e)}),this.textures.clear(),this.gl.deleteProgram(this.program),this.program=null,this.gl.bindBuffer(this.gl.ARRAY_BUFFER,null),this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER,null),this.gl.bindRenderbuffer(this.gl.RENDERBUFFER,null),this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,null),this.gl.getError()),this.resizeObserver&&=(this.resizeObserver.disconnect(),null),this.intersectionObserver&&=(this.intersectionObserver.disconnect(),null),visualViewport?.removeEventListener(`resize`,this.handleVisualViewportChange),this.ownerDocument.removeEventListener(`visibilitychange`,this.handleDocumentVisibilityChange),this.uniformLocations={},this.canvasElement.remove(),delete this.parentElement.paperShaderMount}};function Ie(e,t,n){let r=e.createShader(t);return r?(e.shaderSource(r,n),e.compileShader(r),e.getShaderParameter(r,e.COMPILE_STATUS)?r:(console.error(`An error occurred compiling the shaders: `+e.getShaderInfoLog(r)),e.deleteShader(r),null)):null}function Le(e,t,n){let r=e.getShaderPrecisionFormat(e.FRAGMENT_SHADER,e.MEDIUM_FLOAT),i=r?r.precision:null;i&&i<23&&(t=t.replace(/precision\s+(lowp|mediump)\s+float;/g,`precision highp float;`),n=n.replace(/precision\s+(lowp|mediump)\s+float/g,`precision highp float`).replace(/\b(uniform|varying|attribute)\s+(lowp|mediump)\s+(\w+)/g,`$1 highp $3`));let a=Ie(e,e.VERTEX_SHADER,t),o=Ie(e,e.FRAGMENT_SHADER,n);if(!a||!o)return null;let s=e.createProgram();return s?(e.attachShader(s,a),e.attachShader(s,o),e.linkProgram(s),e.getProgramParameter(s,e.LINK_STATUS)?(e.detachShader(s,a),e.detachShader(s,o),e.deleteShader(a),e.deleteShader(o),s):(console.error(`Unable to initialize the shader program: `+e.getProgramInfoLog(s)),e.deleteProgram(s),e.deleteShader(a),e.deleteShader(o),null)):null}var Re=`@layer paper-shaders {
  :where([data-paper-shader]) {
    isolation: isolate;
    position: relative;

    & canvas {
      contain: strict;
      display: block;
      position: absolute;
      inset: 0;
      z-index: -1;
      width: 100%;
      height: 100%;
      border-radius: inherit;
      corner-shape: inherit;
    }
  }
}`;function ze(){let e=navigator.userAgent.toLowerCase();return e.includes(`safari`)&&!e.includes(`chrome`)&&!e.includes(`android`)}function Be(e){let t=visualViewport?.scale??1,n=visualViewport?.width??window.innerWidth,r=window.innerWidth-e.documentElement.clientWidth,i=t*n+r,a=outerWidth/i,o=Math.round(100*a);return o%5==0?o/100:o===33?1/3:o===67?2/3:o===133?4/3:a}var N={fit:`contain`,scale:1,rotation:0,offsetX:0,offsetY:0,originX:.5,originY:.5,worldWidth:0,worldHeight:0},Ve={fit:`none`,scale:1,rotation:0,offsetX:0,offsetY:0,originX:.5,originY:.5,worldWidth:0,worldHeight:0},He={none:0,contain:1,cover:2},Ue=`
#define TWO_PI 6.28318530718
#define PI 3.14159265358979323846
`,We=`
vec2 rotate(vec2 uv, float th) {
  return mat2(cos(th), sin(th), -sin(th), cos(th)) * uv;
}
`,Ge=`
  float hash11(float p) {
    p = fract(p * 0.3183099) + 0.1;
    p *= p + 19.19;
    return fract(p * p);
  }
`,Ke=`
  float hash21(vec2 p) {
    p = fract(p * vec2(0.3183099, 0.3678794)) + 0.1;
    p += dot(p, p + 19.19);
    return fract(p.x * p.y);
  }
`,qe=`
  float randomR(vec2 p) {
    vec2 uv = floor(p) / 100. + .5;
    return texture(u_noiseTexture, fract(uv)).r;
  }
`,Je=`
vec3 permute(vec3 x) { return mod(((x * 34.0) + 1.0) * x, 289.0); }
float snoise(vec2 v) {
  const vec4 C = vec4(0.211324865405187, 0.366025403784439,
    -0.577350269189626, 0.024390243902439);
  vec2 i = floor(v + dot(v, C.yy));
  vec2 x0 = v - i + dot(i, C.xx);
  vec2 i1;
  i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod(i, 289.0);
  vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0))
    + i.x + vec3(0.0, i1.x, 1.0));
  vec3 m = max(0.5 - vec3(dot(x0, x0), dot(x12.xy, x12.xy),
      dot(x12.zw, x12.zw)), 0.0);
  m = m * m;
  m = m * m;
  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * (a0 * a0 + h * h);
  vec3 g;
  g.x = a0.x * x0.x + h.x * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}
`,Ye=`
float fiberRandom(vec2 p) {
  vec2 uv = floor(p) / 100.;
  return texture(u_noiseTexture, fract(uv)).b;
}

float fiberValueNoise(vec2 st) {
  vec2 i = floor(st);
  vec2 f = fract(st);
  float a = fiberRandom(i);
  float b = fiberRandom(i + vec2(1.0, 0.0));
  float c = fiberRandom(i + vec2(0.0, 1.0));
  float d = fiberRandom(i + vec2(1.0, 1.0));
  vec2 u = f * f * (3.0 - 2.0 * f);
  float x1 = mix(a, b, u.x);
  float x2 = mix(c, d, u.x);
  return mix(x1, x2, u.y);
}

float fiberNoiseFbm(in vec2 n, vec2 seedOffset) {
  float total = 0.0, amplitude = 1.;
  for (int i = 0; i < 4; i++) {
    n = rotate(n, .7);
    total += fiberValueNoise(n + seedOffset) * amplitude;
    n *= 2.;
    amplitude *= 0.6;
  }
  return total;
}

float fiberNoise(vec2 uv, vec2 seedOffset) {
  float epsilon = 0.001;
  float n1 = fiberNoiseFbm(uv + vec2(epsilon, 0.0), seedOffset);
  float n2 = fiberNoiseFbm(uv - vec2(epsilon, 0.0), seedOffset);
  float n3 = fiberNoiseFbm(uv + vec2(0.0, epsilon), seedOffset);
  float n4 = fiberNoiseFbm(uv - vec2(0.0, epsilon), seedOffset);
  return length(vec2(n1 - n2, n3 - n4)) / (2.0 * epsilon);
}
`,Xe={maxColorCount:10},Ze=`#version 300 es
precision mediump float;

uniform float u_time;

uniform vec4 u_colors[${Xe.maxColorCount}];
uniform float u_colorsCount;

uniform float u_distortion;
uniform float u_swirl;
uniform float u_grainMixer;
uniform float u_grainOverlay;

in vec2 v_objectUV;
out vec4 fragColor;

${Ue}
${We}
${Ke}

float valueNoise(vec2 st) {
  vec2 i = floor(st);
  vec2 f = fract(st);
  float a = hash21(i);
  float b = hash21(i + vec2(1.0, 0.0));
  float c = hash21(i + vec2(0.0, 1.0));
  float d = hash21(i + vec2(1.0, 1.0));
  vec2 u = f * f * (3.0 - 2.0 * f);
  float x1 = mix(a, b, u.x);
  float x2 = mix(c, d, u.x);
  return mix(x1, x2, u.y);
}

float noise(vec2 n, vec2 seedOffset) {
  return valueNoise(n + seedOffset);
}

vec2 getPosition(int i, float t) {
  float a = float(i) * .37;
  float b = .6 + fract(float(i) / 3.) * .9;
  float c = .8 + fract(float(i + 1) / 4.);

  float x = sin(t * b + a);
  float y = cos(t * c + a * 1.5);

  return .5 + .5 * vec2(x, y);
}

void main() {
  vec2 uv = v_objectUV;
  uv += .5;
  vec2 grainUV = uv * 1000.;

  float grain = noise(grainUV, vec2(0.));
  float mixerGrain = .4 * u_grainMixer * (grain - .5);

  const float firstFrameOffset = 41.5;
  float t = .5 * (u_time + firstFrameOffset);

  float radius = smoothstep(0., 1., length(uv - .5));
  float center = 1. - radius;
  for (float i = 1.; i <= 2.; i++) {
    uv.x += u_distortion * center / i * sin(t + i * .4 * smoothstep(.0, 1., uv.y)) * cos(.2 * t + i * 2.4 * smoothstep(.0, 1., uv.y));
    uv.y += u_distortion * center / i * cos(t + i * 2. * smoothstep(.0, 1., uv.x));
  }

  vec2 uvRotated = uv;
  uvRotated -= vec2(.5);
  float angle = 3. * u_swirl * radius;
  uvRotated = rotate(uvRotated, -angle);
  uvRotated += vec2(.5);

  vec3 color = vec3(0.);
  float opacity = 0.;
  float totalWeight = 0.;

  for (int i = 0; i < ${Xe.maxColorCount}; i++) {
    if (i >= int(u_colorsCount)) break;

    vec2 pos = getPosition(i, t) + mixerGrain;
    vec3 colorFraction = u_colors[i].rgb * u_colors[i].a;
    float opacityFraction = u_colors[i].a;

    float dist = length(uvRotated - pos);

    dist = pow(dist, 3.5);
    float weight = 1. / (dist + 1e-3);
    color += colorFraction * weight;
    opacity += opacityFraction * weight;
    totalWeight += weight;
  }

  color /= max(1e-4, totalWeight);
  opacity /= max(1e-4, totalWeight);

  float grainOverlay = valueNoise(rotate(grainUV, 1.) + vec2(3.));
  grainOverlay = mix(grainOverlay, valueNoise(rotate(grainUV, 2.) + vec2(-1.)), .5);
  grainOverlay = pow(grainOverlay, 1.3);

  float grainOverlayV = grainOverlay * 2. - 1.;
  vec3 grainOverlayColor = vec3(step(0., grainOverlayV));
  float grainOverlayStrength = u_grainOverlay * abs(grainOverlayV);
  grainOverlayStrength = pow(grainOverlayStrength, .8);
  color = mix(color, grainOverlayColor, .35 * grainOverlayStrength);

  opacity += .5 * grainOverlayStrength;
  opacity = clamp(opacity, 0., 1.);

  fragColor = vec4(color, opacity);
}
`,Qe=`#version 300 es
precision mediump float;

uniform float u_time;

uniform vec2 u_resolution;
uniform float u_pixelRatio;
uniform float u_originX;
uniform float u_originY;
uniform float u_worldWidth;
uniform float u_worldHeight;
uniform float u_fit;
uniform float u_scale;
uniform float u_rotation;
uniform float u_offsetX;
uniform float u_offsetY;

uniform float u_pxSize;
uniform vec4 u_colorBack;
uniform vec4 u_colorFront;
uniform float u_shape;
uniform float u_type;

out vec4 fragColor;

${Je}
${Ue}
${Ge}
${Ke}

float getSimplexNoise(vec2 uv, float t) {
  float noise = .5 * snoise(uv - vec2(0., .3 * t));
  noise += .5 * snoise(2. * uv + vec2(0., .32 * t));

  return noise;
}

const int bayer2x2[4] = int[4](0, 2, 3, 1);
const int bayer4x4[16] = int[16](
0, 8, 2, 10,
12, 4, 14, 6,
3, 11, 1, 9,
15, 7, 13, 5
);

const int bayer8x8[64] = int[64](
0, 32, 8, 40, 2, 34, 10, 42,
48, 16, 56, 24, 50, 18, 58, 26,
12, 44, 4, 36, 14, 46, 6, 38,
60, 28, 52, 20, 62, 30, 54, 22,
3, 35, 11, 43, 1, 33, 9, 41,
51, 19, 59, 27, 49, 17, 57, 25,
15, 47, 7, 39, 13, 45, 5, 37,
63, 31, 55, 23, 61, 29, 53, 21
);

float getBayerValue(vec2 uv, int size) {
  ivec2 pos = ivec2(fract(uv / float(size)) * float(size));
  int index = pos.y * size + pos.x;

  if (size == 2) {
    return float(bayer2x2[index]) / 4.0;
  } else if (size == 4) {
    return float(bayer4x4[index]) / 16.0;
  } else if (size == 8) {
    return float(bayer8x8[index]) / 64.0;
  }
  return 0.0;
}


void main() {
  float t = .5 * u_time;

  float pxSize = u_pxSize * u_pixelRatio;
  vec2 pxSizeUV = gl_FragCoord.xy - .5 * u_resolution;
  pxSizeUV /= pxSize;
  vec2 canvasPixelizedUV = (floor(pxSizeUV) + .5) * pxSize;
  vec2 normalizedUV = canvasPixelizedUV / u_resolution;

  vec2 ditheringNoiseUV = canvasPixelizedUV;
  vec2 shapeUV = normalizedUV;

  vec2 boxOrigin = vec2(.5 - u_originX, u_originY - .5);
  vec2 givenBoxSize = vec2(u_worldWidth, u_worldHeight);
  givenBoxSize = max(givenBoxSize, vec2(1.)) * u_pixelRatio;
  float r = u_rotation * PI / 180.;
  mat2 graphicRotation = mat2(cos(r), sin(r), -sin(r), cos(r));
  vec2 graphicOffset = vec2(-u_offsetX, u_offsetY);

  float patternBoxRatio = givenBoxSize.x / givenBoxSize.y;
  vec2 boxSize = vec2(
  (u_worldWidth == 0.) ? u_resolution.x : givenBoxSize.x,
  (u_worldHeight == 0.) ? u_resolution.y : givenBoxSize.y
  );
  
  if (u_shape > 3.5) {
    vec2 objectBoxSize = vec2(0.);
    // fit = none
    objectBoxSize.x = min(boxSize.x, boxSize.y);
    if (u_fit == 1.) { // fit = contain
      objectBoxSize.x = min(u_resolution.x, u_resolution.y);
    } else if (u_fit == 2.) { // fit = cover
      objectBoxSize.x = max(u_resolution.x, u_resolution.y);
    }
    objectBoxSize.y = objectBoxSize.x;
    vec2 objectWorldScale = u_resolution.xy / objectBoxSize;

    shapeUV *= objectWorldScale;
    shapeUV += boxOrigin * (objectWorldScale - 1.);
    shapeUV += vec2(-u_offsetX, u_offsetY);
    shapeUV /= u_scale;
    shapeUV = graphicRotation * shapeUV;
  } else {
    vec2 patternBoxSize = vec2(0.);
    // fit = none
    patternBoxSize.x = patternBoxRatio * min(boxSize.x / patternBoxRatio, boxSize.y);
    float patternWorldNoFitBoxWidth = patternBoxSize.x;
    if (u_fit == 1.) { // fit = contain
      patternBoxSize.x = patternBoxRatio * min(u_resolution.x / patternBoxRatio, u_resolution.y);
    } else if (u_fit == 2.) { // fit = cover
      patternBoxSize.x = patternBoxRatio * max(u_resolution.x / patternBoxRatio, u_resolution.y);
    }
    patternBoxSize.y = patternBoxSize.x / patternBoxRatio;
    vec2 patternWorldScale = u_resolution.xy / patternBoxSize;

    shapeUV += vec2(-u_offsetX, u_offsetY) / patternWorldScale;
    shapeUV += boxOrigin;
    shapeUV -= boxOrigin / patternWorldScale;
    shapeUV *= u_resolution.xy;
    shapeUV /= u_pixelRatio;
    if (u_fit > 0.) {
      shapeUV *= (patternWorldNoFitBoxWidth / patternBoxSize.x);
    }
    shapeUV /= u_scale;
    shapeUV = graphicRotation * shapeUV;
    shapeUV += boxOrigin / patternWorldScale;
    shapeUV -= boxOrigin;
    shapeUV += .5;
  }

  float shape = 0.;
  if (u_shape < 1.5) {
    // Simplex noise
    shapeUV *= .001;

    shape = 0.5 + 0.5 * getSimplexNoise(shapeUV, t);
    shape = smoothstep(0.3, 0.9, shape);

  } else if (u_shape < 2.5) {
    // Warp
    shapeUV *= .003;

    for (float i = 1.0; i < 6.0; i++) {
      shapeUV.x += 0.6 / i * cos(i * 2.5 * shapeUV.y + t);
      shapeUV.y += 0.6 / i * cos(i * 1.5 * shapeUV.x + t);
    }

    shape = .15 / max(0.001, abs(sin(t - shapeUV.y - shapeUV.x)));
    shape = smoothstep(0.02, 1., shape);

  } else if (u_shape < 3.5) {
    // Dots
    shapeUV *= .05;

    float stripeIdx = floor(2. * shapeUV.x / TWO_PI);
    float rand = hash11(stripeIdx * 10.);
    rand = sign(rand - .5) * pow(.1 + abs(rand), .4);
    shape = sin(shapeUV.x) * cos(shapeUV.y - 5. * rand * t);
    shape = pow(abs(shape), 6.);

  } else if (u_shape < 4.5) {
    // Sine wave
    shapeUV *= 4.;

    float wave = cos(.5 * shapeUV.x - 2. * t) * sin(1.5 * shapeUV.x + t) * (.75 + .25 * cos(3. * t));
    shape = 1. - smoothstep(-1., 1., shapeUV.y + wave);

  } else if (u_shape < 5.5) {
    // Ripple

    float dist = length(shapeUV);
    float waves = sin(pow(dist, 1.7) * 7. - 3. * t) * .5 + .5;
    shape = waves;

  } else if (u_shape < 6.5) {
    // Swirl

    float l = length(shapeUV);
    float angle = 6. * atan(shapeUV.y, shapeUV.x) + 4. * t;
    float twist = 1.2;
    float offset = 1. / pow(max(l, 1e-6), twist) + angle / TWO_PI;
    float mid = smoothstep(0., 1., pow(l, twist));
    shape = mix(0., fract(offset), mid);

  } else {
    // Sphere
    shapeUV *= 2.;

    float d = 1. - pow(length(shapeUV), 2.);
    vec3 pos = vec3(shapeUV, sqrt(max(0., d)));
    vec3 lightPos = normalize(vec3(cos(1.5 * t), .8, sin(1.25 * t)));
    shape = .5 + .5 * dot(lightPos, pos);
    shape *= step(0., d);
  }


  int type = int(floor(u_type));
  float dithering = 0.0;

  switch (type) {
    case 1: {
      dithering = step(hash21(ditheringNoiseUV), shape);
    } break;
    case 2:
    dithering = getBayerValue(pxSizeUV, 2);
    break;
    case 3:
    dithering = getBayerValue(pxSizeUV, 4);
    break;
    default :
    dithering = getBayerValue(pxSizeUV, 8);
    break;
  }

  dithering -= .5;
  float res = step(.5, shape + dithering);

  vec3 fgColor = u_colorFront.rgb * u_colorFront.a;
  float fgOpacity = u_colorFront.a;
  vec3 bgColor = u_colorBack.rgb * u_colorBack.a;
  float bgOpacity = u_colorBack.a;

  vec3 color = fgColor * res;
  float opacity = fgOpacity * res;

  color += bgColor * (1. - opacity);
  opacity += bgOpacity * (1. - opacity);

  fragColor = vec4(color, opacity);
}
`,$e={simplex:1,warp:2,dots:3,wave:4,ripple:5,swirl:6,sphere:7},et={random:1,"2x2":2,"4x4":3,"8x8":4},tt=`#version 300 es
precision mediump float;

uniform vec2 u_resolution;
uniform float u_pixelRatio;

uniform vec4 u_colorFront;
uniform vec4 u_colorBack;

uniform sampler2D u_image;
uniform float u_imageAspectRatio;

uniform float u_contrast;
uniform float u_roughness;
uniform float u_fiber;
uniform float u_fiberSize;
uniform float u_crumples;
uniform float u_crumpleSize;
uniform float u_folds;
uniform float u_foldCount;
uniform float u_drops;
uniform float u_seed;
uniform float u_fade;

uniform sampler2D u_noiseTexture;

in vec2 v_imageUV;

out vec4 fragColor;

float getUvFrame(vec2 uv) {
  float aax = 2. * fwidth(uv.x);
  float aay = 2. * fwidth(uv.y);

  float left   = smoothstep(0., aax, uv.x);
  float right = 1. - smoothstep(1. - aax, 1., uv.x);
  float bottom = smoothstep(0., aay, uv.y);
  float top = 1. - smoothstep(1. - aay, 1., uv.y);

  return left * right * bottom * top;
}

${Ue}
${We}
${qe}
float valueNoise(vec2 st) {
  vec2 i = floor(st);
  vec2 f = fract(st);
  float a = randomR(i);
  float b = randomR(i + vec2(1.0, 0.0));
  float c = randomR(i + vec2(0.0, 1.0));
  float d = randomR(i + vec2(1.0, 1.0));
  vec2 u = f * f * (3.0 - 2.0 * f);
  float x1 = mix(a, b, u.x);
  float x2 = mix(c, d, u.x);
  return mix(x1, x2, u.y);
}
float fbm(vec2 n) {
  float total = 0.0, amplitude = .4;
  for (int i = 0; i < 3; i++) {
    total += valueNoise(n) * amplitude;
    n *= 1.99;
    amplitude *= 0.65;
  }
  return total;
}


float randomG(vec2 p) {
  vec2 uv = floor(p) / 50. + .5;
  return texture(u_noiseTexture, fract(uv)).g;
}
float roughness(vec2 p) {
  p *= .1;
  float o = 0.;
  for (float i = 0.; ++i < 4.; p *= 2.1) {
    vec4 w = vec4(floor(p), ceil(p));
    vec2 f = fract(p);
    o += mix(
    mix(randomG(w.xy), randomG(w.xw), f.y),
    mix(randomG(w.zy), randomG(w.zw), f.y),
    f.x);
    o += .2 / exp(2. * abs(sin(.2 * p.x + .5 * p.y)));
  }
  return o / 3.;
}

${Ye}

vec2 randomGB(vec2 p) {
  vec2 uv = floor(p) / 50. + .5;
  return texture(u_noiseTexture, fract(uv)).gb;
}
float crumpledNoise(vec2 t, float pw) {
  vec2 p = floor(t);
  float wsum = 0.;
  float cl = 0.;
  for (int y = -1; y < 2; y += 1) {
    for (int x = -1; x < 2; x += 1) {
      vec2 b = vec2(float(x), float(y));
      vec2 q = b + p;
      vec2 q2 = q - floor(q / 8.) * 8.;
      vec2 c = q + randomGB(q2);
      vec2 r = c - t;
      float w = pow(smoothstep(0., 1., 1. - abs(r.x)), pw) * pow(smoothstep(0., 1., 1. - abs(r.y)), pw);
      cl += (.5 + .5 * sin((q2.x + q2.y * 5.) * 8.)) * w;
      wsum += w;
    }
  }
  return pow(wsum != 0.0 ? cl / wsum : 0.0, .5) * 2.;
}
float crumplesShape(vec2 uv) {
  return crumpledNoise(uv * .25, 16.) * crumpledNoise(uv * .5, 2.);
}


vec2 folds(vec2 uv) {
  vec3 pp = vec3(0.);
  float l = 9.;
  for (float i = 0.; i < 15.; i++) {
    if (i >= u_foldCount) break;
    vec2 rand = randomGB(vec2(i, i * u_seed));
    float an = rand.x * TWO_PI;
    vec2 p = vec2(cos(an), sin(an)) * rand.y;
    float dist = distance(uv, p);
    l = min(l, dist);

    if (l == dist) {
      pp.xy = (uv - p.xy);
      pp.z = dist;
    }
  }
  return mix(pp.xy, vec2(0.), pow(pp.z, .25));
}

float drops(vec2 uv) {
  vec2 iDropsUV = floor(uv);
  vec2 fDropsUV = fract(uv);
  float dropsMinDist = 1.;
  for (int j = -1; j <= 1; j++) {
    for (int i = -1; i <= 1; i++) {
      vec2 neighbor = vec2(float(i), float(j));
      vec2 offset = randomGB(iDropsUV + neighbor);
      offset = .5 + .5 * sin(10. * u_seed + TWO_PI * offset);
      vec2 pos = neighbor + offset - fDropsUV;
      float dist = length(pos);
      dropsMinDist = min(dropsMinDist, dropsMinDist*dist);
    }
  }
  return 1. - smoothstep(.05, .09, pow(dropsMinDist, .5));
}

float lst(float edge0, float edge1, float x) {
  return clamp((x - edge0) / (edge1 - edge0), 0.0, 1.0);
}

void main() {

  vec2 imageUV = v_imageUV;
  vec2 patternUV = v_imageUV - .5;
  patternUV = 5. * (patternUV * vec2(u_imageAspectRatio, 1.));

  vec2 roughnessUv = 1.5 * (gl_FragCoord.xy - .5 * u_resolution) / u_pixelRatio;
  float roughness = roughness(roughnessUv + vec2(1., 0.)) - roughness(roughnessUv - vec2(1., 0.));

  vec2 crumplesUV = fract(patternUV * .02 / u_crumpleSize - u_seed) * 32.;
  float crumples = u_crumples * (crumplesShape(crumplesUV + vec2(.05, 0.)) - crumplesShape(crumplesUV));

  vec2 fiberUV = 2. / u_fiberSize * patternUV;
  float fiber = fiberNoise(fiberUV, vec2(0.));
  fiber = .5 * u_fiber * (fiber - 1.);

  vec2 normal = vec2(0.);
  vec2 normalImage = vec2(0.);

  vec2 foldsUV = patternUV * .12;
  foldsUV = rotate(foldsUV, 4. * u_seed);
  vec2 w = folds(foldsUV);
  foldsUV = rotate(foldsUV + .007 * cos(u_seed), .01 * sin(u_seed));
  vec2 w2 = folds(foldsUV);

  float drops = u_drops * drops(patternUV * 2.);

  float fade = u_fade * fbm(.17 * patternUV + 10. * u_seed);
  fade = clamp(8. * fade * fade * fade, 0., 1.);

  w = mix(w, vec2(0.), fade);
  w2 = mix(w2, vec2(0.), fade);
  crumples = mix(crumples, 0., fade);
  drops = mix(drops, 0., fade);
  fiber *= mix(1., .5, fade);
  roughness *= mix(1., .5, fade);

  normal.xy += u_folds * min(5. * u_contrast, 1.) * 4. * max(vec2(0.), w + w2);
  normalImage.xy += u_folds * 2. * w;

  normal.xy += crumples;
  normalImage.xy += 1.5 * crumples;

  normal.xy += 3. * drops;
  normalImage.xy += .2 * drops;

  normal.xy += u_roughness * 1.5 * roughness;
  normal.xy += fiber;

  normalImage += u_roughness * .75 * roughness;
  normalImage += .2 * fiber;

  vec3 lightPos = vec3(1., 2., 1.);
  float res = dot(normalize(vec3(normal, 9.5 - 9. * pow(u_contrast, .1))), normalize(lightPos));

  vec3 fgColor = u_colorFront.rgb * u_colorFront.a;
  float fgOpacity = u_colorFront.a;
  vec3 bgColor = u_colorBack.rgb * u_colorBack.a;
  float bgOpacity = u_colorBack.a;

  imageUV += .02 * normalImage;
  float frame = getUvFrame(imageUV);
  vec4 image = texture(u_image, imageUV);
  image.rgb += .6 * pow(u_contrast, .4) * (res - .7);

  frame *= image.a;

  vec3 color = fgColor * res;
  float opacity = fgOpacity * res;

  color += bgColor * (1. - opacity);
  opacity += bgOpacity * (1. - opacity);
  opacity = mix(opacity, 1., frame);

  color -= .007 * drops;

  color.rgb = mix(color, image.rgb, frame);

  fragColor = vec4(color, opacity);
}
`,nt=`#version 300 es
precision mediump float;

uniform vec2 u_resolution;
uniform float u_pixelRatio;
uniform float u_rotation;

uniform vec4 u_colorBack;
uniform vec4 u_colorShadow;
uniform vec4 u_colorHighlight;

uniform sampler2D u_image;
uniform float u_imageAspectRatio;

uniform float u_size;
uniform float u_shadows;
uniform float u_angle;
uniform float u_stretch;
uniform float u_shape;
uniform float u_distortion;
uniform float u_highlights;
uniform float u_distortionShape;
uniform float u_shift;
uniform float u_blur;
uniform float u_edges;
uniform float u_marginLeft;
uniform float u_marginRight;
uniform float u_marginTop;
uniform float u_marginBottom;
uniform float u_grainMixer;
uniform float u_grainOverlay;

in vec2 v_imageUV;

out vec4 fragColor;

${Ue}
${We}
${Ke}

float valueNoise(vec2 st) {
  vec2 i = floor(st);
  vec2 f = fract(st);
  float a = hash21(i);
  float b = hash21(i + vec2(1.0, 0.0));
  float c = hash21(i + vec2(0.0, 1.0));
  float d = hash21(i + vec2(1.0, 1.0));
  vec2 u = f * f * (3.0 - 2.0 * f);
  float x1 = mix(a, b, u.x);
  float x2 = mix(c, d, u.x);
  return mix(x1, x2, u.y);
}

float getUvFrame(vec2 uv, float softness) {
  float aax = 2. * fwidth(uv.x);
  float aay = 2. * fwidth(uv.y);
  float left   = smoothstep(0., aax + softness, uv.x);
  float right  = 1. - smoothstep(1. - softness - aax, 1., uv.x);
  float bottom = smoothstep(0., aay + softness, uv.y);
  float top    = 1. - smoothstep(1. - softness - aay, 1., uv.y);
  return left * right * bottom * top;
}

const int MAX_RADIUS = 50;
vec4 samplePremultiplied(sampler2D tex, vec2 uv) {
  vec4 c = texture(tex, uv);
  c.rgb *= c.a;
  return c;
}
vec4 getBlur(sampler2D tex, vec2 uv, vec2 texelSize, vec2 dir, float sigma) {
  if (sigma <= .5) return texture(tex, uv);
  int radius = int(min(float(MAX_RADIUS), ceil(3.0 * sigma)));

  float twoSigma2 = 2.0 * sigma * sigma;
  float gaussianNorm = 1.0 / sqrt(TWO_PI * sigma * sigma);

  vec4 sum = samplePremultiplied(tex, uv) * gaussianNorm;
  float weightSum = gaussianNorm;

  for (int i = 1; i <= MAX_RADIUS; i++) {
    if (i > radius) break;

    float x = float(i);
    float w = exp(-(x * x) / twoSigma2) * gaussianNorm;

    vec2 offset = dir * texelSize * x;
    vec4 s1 = samplePremultiplied(tex, uv + offset);
    vec4 s2 = samplePremultiplied(tex, uv - offset);

    sum += (s1 + s2) * w;
    weightSum += 2.0 * w;
  }

  vec4 result = sum / weightSum;
  if (result.a > 0.) {
    result.rgb /= result.a;
  }

  return result;
}

vec2 rotateAspect(vec2 p, float a, float aspect) {
  p.x *= aspect;
  p = rotate(p, a);
  p.x /= aspect;
  return p;
}

float smoothFract(float x) {
  float f = fract(x);
  float w = fwidth(x);

  float edge = abs(f - 0.5) - 0.5;
  float band = smoothstep(-w, w, edge);

  return mix(f, 1.0 - f, band);
}

void main() {

  float patternRotation = -u_angle * PI / 180.;
  float patternSize = mix(200., 5., u_size);

  vec2 uv = v_imageUV;

  vec2 uvMask = gl_FragCoord.xy / u_resolution.xy;
  vec2 sw = vec2(.005);
  vec4 margins = vec4(u_marginLeft, u_marginTop, u_marginRight, u_marginBottom);
  float mask =
  smoothstep(margins[0], margins[0] + sw.x, uvMask.x + sw.x) *
  smoothstep(margins[2], margins[2] + sw.x, 1.0 - uvMask.x + sw.x) *
  smoothstep(margins[1], margins[1] + sw.y, uvMask.y + sw.y) *
  smoothstep(margins[3], margins[3] + sw.y, 1.0 - uvMask.y + sw.y);
  float maskOuter =
  smoothstep(margins[0] - sw.x, margins[0], uvMask.x + sw.x) *
  smoothstep(margins[2] - sw.x, margins[2], 1.0 - uvMask.x + sw.x) *
  smoothstep(margins[1] - sw.y, margins[1], uvMask.y + sw.y) *
  smoothstep(margins[3] - sw.y, margins[3], 1.0 - uvMask.y + sw.y);
  float maskStroke = maskOuter - mask;
  float maskInner =
  smoothstep(margins[0] - 2. * sw.x, margins[0], uvMask.x) *
  smoothstep(margins[2] - 2. * sw.x, margins[2], 1.0 - uvMask.x) *
  smoothstep(margins[1] - 2. * sw.y, margins[1], uvMask.y) *
  smoothstep(margins[3] - 2. * sw.y, margins[3], 1.0 - uvMask.y);
  float maskStrokeInner = maskInner - mask;

  uv -= .5;
  uv *= patternSize;
  uv = rotateAspect(uv, patternRotation, u_imageAspectRatio);

  float curve = 0.;
  float patternY = uv.y / u_imageAspectRatio;
  if (u_shape > 4.5) {
    // pattern
    curve = .5 + .5 * sin(.5 * PI * uv.x) * cos(.5 * PI * patternY);
  } else if (u_shape > 3.5) {
    // zigzag
    curve = 10. * abs(fract(.1 * patternY) - .5);
  } else if (u_shape > 2.5) {
    // wave
    curve = 4. * sin(.23 * patternY);
  } else if (u_shape > 1.5) {
    // lines irregular
    curve = .5 + .5 * sin(.5 * uv.x) * sin(1.7 * uv.x);
  } else {
    // lines
  }

  vec2 UvToFract = uv + curve;
  vec2 fractOrigUV = fract(uv);
  vec2 floorOrigUV = floor(uv);

  float x = smoothFract(UvToFract.x);
  float xNonSmooth = fract(UvToFract.x) + .0001;

  float highlightsWidth = 2. * max(.001, fwidth(UvToFract.x));
  highlightsWidth += 2. * maskStrokeInner;
  float highlights = smoothstep(0., highlightsWidth, xNonSmooth);
  highlights *= smoothstep(1., 1. - highlightsWidth, xNonSmooth);
  highlights = 1. - highlights;
  highlights *= u_highlights;
  highlights = clamp(highlights, 0., 1.);
  highlights *= mask;

  float shadows = pow(x, 1.3);
  float distortion = 0.;
  float fadeX = 1.;
  float frameFade = 0.;

  float aa = fwidth(xNonSmooth);
  aa = max(aa, fwidth(uv.x));
  aa = max(aa, fwidth(UvToFract.x));
  aa = max(aa, .0001);

  if (u_distortionShape == 1.) {
    distortion = -pow(1.5 * x, 3.);
    distortion += (.5 - u_shift);

    frameFade = pow(1.5 * x, 3.);
    aa = max(.2, aa);
    aa += mix(.2, 0., u_size);
    fadeX = smoothstep(0., aa, xNonSmooth) * smoothstep(1., 1. - aa, xNonSmooth);
    distortion = mix(.5, distortion, fadeX);
  } else if (u_distortionShape == 2.) {
    distortion = 2. * pow(x, 2.);
    distortion -= (.5 + u_shift);

    frameFade = pow(abs(x - .5), 4.);
    aa = max(.2, aa);
    aa += mix(.2, 0., u_size);
    fadeX = smoothstep(0., aa, xNonSmooth) * smoothstep(1., 1. - aa, xNonSmooth);
    distortion = mix(.5, distortion, fadeX);
    frameFade = mix(1., frameFade, .5 * fadeX);
  } else if (u_distortionShape == 3.) {
    distortion = pow(2. * (xNonSmooth - .5), 6.);
    distortion -= .25;
    distortion -= u_shift;

    frameFade = 1. - 2. * pow(abs(x - .4), 2.);
    aa = .15;
    aa += mix(.1, 0., u_size);
    fadeX = smoothstep(0., aa, xNonSmooth) * smoothstep(1., 1. - aa, xNonSmooth);
    frameFade = mix(1., frameFade, fadeX);

  } else if (u_distortionShape == 4.) {
    x = xNonSmooth;
    distortion = sin((x + .25) * TWO_PI);
    shadows = .5 + .5 * asin(distortion) / (.5 * PI);
    distortion *= .5;
    distortion -= u_shift;
    frameFade = .5 + .5 * sin(x * TWO_PI);
  } else if (u_distortionShape == 5.) {
    distortion -= pow(abs(x), .2) * x;
    distortion += .33;
    distortion -= 3. * u_shift;
    distortion *= .33;

    frameFade = .3 * (smoothstep(.0, 1., x));
    shadows = pow(x, 2.5);

    aa = max(.1, aa);
    aa += mix(.1, 0., u_size);
    fadeX = smoothstep(0., aa, xNonSmooth) * smoothstep(1., 1. - aa, xNonSmooth);
    distortion *= fadeX;
  }

  vec2 dudx = dFdx(v_imageUV);
  vec2 dudy = dFdy(v_imageUV);
  vec2 grainUV = v_imageUV - .5;
  grainUV *= (.8 / vec2(length(dudx), length(dudy)));
  grainUV += .5;
  float grain = valueNoise(grainUV);
  grain = smoothstep(.4, .7, grain);
  grain *= u_grainMixer;
  distortion = mix(distortion, 0., grain);

  shadows = min(shadows, 1.);
  shadows += maskStrokeInner;
  shadows *= mask;
  shadows = min(shadows, 1.);
  shadows *= pow(u_shadows, 2.);
  shadows = clamp(shadows, 0., 1.);

  distortion *= 3. * u_distortion;
  frameFade *= u_distortion;

  fractOrigUV.x += distortion;
  floorOrigUV = rotateAspect(floorOrigUV, -patternRotation, u_imageAspectRatio);
  fractOrigUV = rotateAspect(fractOrigUV, -patternRotation, u_imageAspectRatio);

  uv = (floorOrigUV + fractOrigUV) / patternSize;
  uv += pow(maskStroke, 4.);

  uv += vec2(.5);

  uv = mix(v_imageUV, uv, smoothstep(0., .7, mask));
  float blur = mix(0., 50., u_blur);
  blur = mix(0., blur, smoothstep(.5, 1., mask));

  float edgeDistortion = mix(.0, .04, u_edges);
  edgeDistortion += .06 * frameFade * u_edges;
  edgeDistortion *= mask;
  float frame = getUvFrame(uv, edgeDistortion);

  float stretch = 1. - smoothstep(0., .5, xNonSmooth) * smoothstep(1., 1. - .5, xNonSmooth);
  stretch = pow(stretch, 2.);
  stretch *= mask;
  stretch *= getUvFrame(uv, .1 + .05 * mask * frameFade);
  uv.y = mix(uv.y, .5, u_stretch * stretch);

  vec4 image = getBlur(u_image, uv, 1. / u_resolution / u_pixelRatio, vec2(0., 1.), blur);
  image.rgb *= image.a;
  vec4 backColor = u_colorBack;
  backColor.rgb *= backColor.a;
  vec4 highlightColor = u_colorHighlight;
  highlightColor.rgb *= highlightColor.a;
  vec4 shadowColor = u_colorShadow;

  vec3 color = highlightColor.rgb * highlights;
  float opacity = highlightColor.a * highlights;

  shadows = mix(shadows * shadowColor.a, 0., highlights);
  color = mix(color, shadowColor.rgb * shadowColor.a, .5 * shadows);
  color += .5 * pow(shadows, .5) * shadowColor.rgb;
  opacity += shadows;
  color = clamp(color, vec3(0.), vec3(1.));
  opacity = clamp(opacity, 0., 1.);

  color += image.rgb * (1. - opacity) * frame;
  opacity += image.a * (1. - opacity) * frame;

  color += backColor.rgb * (1. - opacity);
  opacity += backColor.a * (1. - opacity);

  float grainOverlay = valueNoise(rotate(grainUV, 1.) + vec2(3.));
  grainOverlay = mix(grainOverlay, valueNoise(rotate(grainUV, 2.) + vec2(-1.)), .5);
  grainOverlay = pow(grainOverlay, 1.3);

  float grainOverlayV = grainOverlay * 2. - 1.;
  vec3 grainOverlayColor = vec3(step(0., grainOverlayV));
  float grainOverlayStrength = u_grainOverlay * abs(grainOverlayV);
  grainOverlayStrength = pow(grainOverlayStrength, .8);
  grainOverlayStrength *= mask;
  color = mix(color, grainOverlayColor, .35 * grainOverlayStrength);

  opacity += .5 * grainOverlayStrength;
  opacity = clamp(opacity, 0., 1.);

  fragColor = vec4(color, opacity);
}
`,rt={lines:1,linesIrregular:2,wave:3,zigzag:4,pattern:5},it={prism:1,lens:2,contour:3,cascade:4,flat:5},at=`#version 300 es
precision mediump float;

uniform vec2 u_resolution;
uniform float u_pixelRatio;
uniform float u_originX;
uniform float u_originY;
uniform float u_worldWidth;
uniform float u_worldHeight;
uniform float u_fit;

uniform float u_scale;
uniform float u_rotation;
uniform float u_offsetX;
uniform float u_offsetY;

uniform vec4 u_colorFront;
uniform vec4 u_colorBack;
uniform vec4 u_colorHighlight;

uniform sampler2D u_image;
uniform float u_imageAspectRatio;

uniform float u_type;
uniform float u_pxSize;
uniform bool u_originalColors;
uniform bool u_inverted;
uniform float u_colorSteps;

out vec4 fragColor;


${Ke}
${Ue}

float getUvFrame(vec2 uv, vec2 pad) {
  float aa = 0.0001;

  float left   = smoothstep(-pad.x, -pad.x + aa, uv.x);
  float right  = smoothstep(1.0 + pad.x, 1.0 + pad.x - aa, uv.x);
  float bottom = smoothstep(-pad.y, -pad.y + aa, uv.y);
  float top    = smoothstep(1.0 + pad.y, 1.0 + pad.y - aa, uv.y);

  return left * right * bottom * top;
}

vec2 getImageUV(vec2 uv) {
  vec2 boxOrigin = vec2(.5 - u_originX, u_originY - .5);
  float r = u_rotation * PI / 180.;
  mat2 graphicRotation = mat2(cos(r), sin(r), -sin(r), cos(r));
  vec2 graphicOffset = vec2(-u_offsetX, u_offsetY);

  vec2 imageBoxSize;
  if (u_fit == 1.) { // contain
    imageBoxSize.x = min(u_resolution.x / u_imageAspectRatio, u_resolution.y) * u_imageAspectRatio;
  } else if (u_fit == 2.) { // cover
    imageBoxSize.x = max(u_resolution.x / u_imageAspectRatio, u_resolution.y) * u_imageAspectRatio;
  } else {
    imageBoxSize.x = min(10.0, 10.0 / u_imageAspectRatio * u_imageAspectRatio);
  }
  imageBoxSize.y = imageBoxSize.x / u_imageAspectRatio;
  vec2 imageBoxScale = u_resolution.xy / imageBoxSize;

  vec2 imageUV = uv;
  imageUV *= imageBoxScale;
  imageUV += boxOrigin * (imageBoxScale - 1.);
  imageUV += graphicOffset;
  imageUV /= u_scale;
  imageUV.x *= u_imageAspectRatio;
  imageUV = graphicRotation * imageUV;
  imageUV.x /= u_imageAspectRatio;

  imageUV += .5;
  imageUV.y = 1. - imageUV.y;

  return imageUV;
}

const int bayer2x2[4] = int[4](0, 2, 3, 1);
const int bayer4x4[16] = int[16](
0, 8, 2, 10,
12, 4, 14, 6,
3, 11, 1, 9,
15, 7, 13, 5
);

const int bayer8x8[64] = int[64](
0, 32, 8, 40, 2, 34, 10, 42,
48, 16, 56, 24, 50, 18, 58, 26,
12, 44, 4, 36, 14, 46, 6, 38,
60, 28, 52, 20, 62, 30, 54, 22,
3, 35, 11, 43, 1, 33, 9, 41,
51, 19, 59, 27, 49, 17, 57, 25,
15, 47, 7, 39, 13, 45, 5, 37,
63, 31, 55, 23, 61, 29, 53, 21
);

float getBayerValue(vec2 uv, int size) {
  ivec2 pos = ivec2(fract(uv / float(size)) * float(size));
  int index = pos.y * size + pos.x;

  if (size == 2) {
    return float(bayer2x2[index]) / 4.0;
  } else if (size == 4) {
    return float(bayer4x4[index]) / 16.0;
  } else if (size == 8) {
    return float(bayer8x8[index]) / 64.0;
  }
  return 0.0;
}


void main() {

  float pxSize = u_pxSize * u_pixelRatio;
  vec2 pxSizeUV = gl_FragCoord.xy - .5 * u_resolution;
  pxSizeUV /= pxSize;
  vec2 canvasPixelizedUV = (floor(pxSizeUV) + .5) * pxSize;
  vec2 normalizedUV = canvasPixelizedUV / u_resolution;

  vec2 imageUV = getImageUV(normalizedUV);
  vec2 ditheringNoiseUV = canvasPixelizedUV;
  vec4 image = texture(u_image, imageUV);
  float frame = getUvFrame(imageUV, pxSize / u_resolution);

  int type = int(floor(u_type));
  float dithering = 0.0;

  float lum = dot(vec3(.2126, .7152, .0722), image.rgb);
  lum = u_inverted ? (1. - lum) : lum;

  switch (type) {
    case 1: {
      dithering = step(hash21(ditheringNoiseUV), lum);
    } break;
    case 2:
    dithering = getBayerValue(pxSizeUV, 2);
    break;
    case 3:
    dithering = getBayerValue(pxSizeUV, 4);
    break;
    default :
    dithering = getBayerValue(pxSizeUV, 8);
    break;
  }

  float colorSteps = max(floor(u_colorSteps), 1.);
  vec3 color = vec3(0.0);
  float opacity = 1.;

  dithering -= .5;
  float brightness = clamp(lum + dithering / colorSteps, 0.0, 1.0);
  brightness = mix(0.0, brightness, frame);
  brightness = mix(0.0, brightness, image.a);
  float quantLum = floor(brightness * colorSteps + 0.5) / colorSteps;
  quantLum = mix(0.0, quantLum, frame);

  if (u_originalColors == true) {
    vec3 normColor = image.rgb / max(lum, 0.001);
    color = normColor * quantLum;

    float quantAlpha = floor(image.a * colorSteps + 0.5) / colorSteps;
    opacity = mix(quantLum, 1., quantAlpha);
  } else {
    vec3 fgColor = u_colorFront.rgb * u_colorFront.a;
    float fgOpacity = u_colorFront.a;
    vec3 bgColor = u_colorBack.rgb * u_colorBack.a;
    float bgOpacity = u_colorBack.a;
    vec3 hlColor = u_colorHighlight.rgb * u_colorHighlight.a;
    float hlOpacity = u_colorHighlight.a;

    fgColor = mix(fgColor, hlColor, step(1.02 - .02 * u_colorSteps, brightness));
    fgOpacity = mix(fgOpacity, hlOpacity, step(1.02 - .02 * u_colorSteps, brightness));

    color = fgColor * quantLum;
    opacity = fgOpacity * quantLum;
    color += bgColor * (1.0 - opacity);
    opacity += bgOpacity * (1.0 - opacity);
  }

  fragColor = vec4(color, opacity);
}
`,ot=`#version 300 es
precision mediump float;

uniform sampler2D u_image;
uniform float u_imageAspectRatio;
uniform float u_spread;
uniform float u_bias;
uniform float u_angle;
uniform float u_perspective;
uniform float u_count;
uniform float u_dispersion;
uniform float u_dispersionShift;
uniform float u_dispersionColor;
uniform float u_focusCenter;
uniform float u_focusEdges;
uniform float u_swirl;
uniform float u_noise;
uniform float u_noiseFrequency;
uniform float u_noiseOffset;
uniform float u_lensBulge;
uniform float u_lensCircle;
uniform float u_grainMixer;
uniform float u_grainOverlay;
uniform float u_imageX;
uniform float u_imageY;

in vec2 v_imageUV;

out vec4 fragColor;

${Ue}
${Ke}
${We}

float valueNoise(vec2 st) {
  vec2 i = floor(st);
  vec2 f = fract(st);
  float a = hash21(i);
  float b = hash21(i + vec2(1., 0.));
  float c = hash21(i + vec2(0., 1.));
  float d = hash21(i + vec2(1., 1.));
  vec2 u = f * f * (3. - 2. * f);
  return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
}

float getUvFrame(vec2 uv) {
  vec2 invAA = 1. / clamp(fwidth(uv), 1e-5, .02);
  vec2 lo = clamp(uv * invAA + .5, 0., 1.);
  vec2 hi = clamp((1. - uv) * invAA + .5, 0., 1.);
  return lo.x * hi.x * lo.y * hi.y;
}

vec4 sampleOverWhite(vec2 uv) {
  vec4 img = texture(u_image, uv);
  float cover = img.a * getUvFrame(uv);
  vec3 colorOverWhite = mix(vec3(1.), img.rgb, cover);
  return vec4(colorOverWhite, cover);
}

vec3 hueColor(float hue) {
  vec3 rgb = clamp(abs(mod(hue * 6. + vec3(0., 4., 2.), 6.) - 3.) - 1., 0., 1.);
  rgb = rgb * rgb * (3. - 2. * rgb);
  return rgb;
}
                                            
float boxInradius() {
  return .5 * min(u_imageAspectRatio, 1.);
}

float boxOutradius() {
  return .5 * length(vec2(u_imageAspectRatio, 1.));
}

float spreadReach() {
  return .7 * pow(u_spread, 1.3 + 2.7 * u_spread);
}

float innerCircleMask(float radius, float inradius) {
  return 1. - smoothstep(.5 * inradius, 1.1 * inradius, radius);
}

float dispersionCurve(float t, float biasPow) {
  float mirroredT = u_bias < 0. ? 1. - t : t;
  float curved = pow(mirroredT, biasPow);
  return u_bias < 0. ? 1. - curved : curved;
}

vec2 getSpread(vec2 fromCenter, float radius, vec2 warpedUV, float edgeAA, float inradius, float outradius, float reach, out float outStrength) {
  float angleRad = radians(u_angle);
  vec2 uniformDir = vec2(cos(angleRad), sin(angleRad));

  float invInradius = 1. / inradius;
  vec2 radialDir = fromCenter * invInradius;
  float maxLen = (outradius + reach) * invInradius;
  float radialLen = radius * invInradius;
  if (radialLen > maxLen) radialDir *= maxLen / radialLen;
  vec2 spreadDir = mix(uniformDir, radialDir, u_perspective);

  float bandProximity = smoothstep(inradius * .8, inradius, radius);
  float lensCircleMaxing = bandProximity * u_lensCircle * u_lensCircle * u_lensCircle;
  spreadDir = mix(spreadDir, radialDir, lensCircleMaxing);

  vec2 warpedAbs = abs(warpedUV - .5);
  float inner = mix(1., smoothstep(0., mix(inradius, outradius, u_focusCenter), radius), u_focusCenter);
  float boxDist = max(warpedAbs.x, warpedAbs.y) * 2.;
  float outer = mix(1., 1. - min(boxDist, 1.), u_focusEdges);
  float strength = inner * outer;

  strength *= mix(1., mix(.15, .03, max(-u_lensBulge, 0.)), lensCircleMaxing);

  vec2 outside = max(warpedAbs - .5, 0.);
  float margin = max(reach * length(spreadDir) * (1. - u_lensCircle), edgeAA);
  strength *= 1. - smoothstep(0., margin, length(outside));

  outStrength = strength;
  vec2 axis = spreadDir * (reach * strength);

  if (u_noise > 0.) {
    float turn = (valueNoise(fromCenter * u_noiseFrequency * 18. + u_noiseOffset * 30.) - .5) * 2. * u_noise;
    float cs = cos(turn), sn = sin(turn);
    axis = mat2(cs, -sn, sn, cs) * axis;
  }

  axis.x /= u_imageAspectRatio;
  return axis;
}

vec2 lensWarp(vec2 fromCenter, float radius, float inradius, out float bulgeFade) {
  bulgeFade = 1.;
  if (u_lensBulge == 0. && u_lensCircle <= 0.) return fromCenter;
  if (radius < 1e-5) return fromCenter;
  
  float r = radius;

  if (u_lensBulge != 0.) {
    float rn = radius / inradius;
    float bulge = abs(u_lensBulge) * (u_lensBulge > 0. ? 1.4 : 1.2);
    if (u_lensBulge > 0.) bulgeFade = 1. - smoothstep(1.45, 1.53, rn * bulge);
    float map = u_lensBulge > 0.
      ? tan(min(rn * bulge, 1.53)) / tan(bulge)
      : atan(rn * tan(bulge)) / bulge;
    float bulgeScale = map / rn;
    fromCenter *= bulgeScale;
    r *= bulgeScale;
  }

  if (u_lensCircle > 0.) {
    vec2 dir = fromCenter / max(r, 1e-5);
    vec2 halfBox = vec2(u_imageAspectRatio, 1.) * .5;
    float rBox = min(halfBox.x / max(abs(dir.x), 1e-4), halfBox.y / max(abs(dir.y), 1e-4));
    float band = inradius * mix(.03, .2, .5 * (u_lensBulge + 1.));
    float innerEdge = inradius - band;
    float over = smoothstep(0., 1., (r - innerEdge) / band);
    float g = r + (rBox - inradius) * pow(over, 14.);
    fromCenter = dir * mix(r, g, u_lensCircle);
  }

  return fromCenter;
}

void main() {
  vec2 uv = v_imageUV;

  float invAspect = 1. / u_imageAspectRatio;
  float inradius = boxInradius();
  float outradius = boxOutradius();
  float reach = spreadReach();

  vec2 fromCenter = uv - .5;
  fromCenter.x *= u_imageAspectRatio;
  float radius = length(fromCenter);

  float bulgeFade;
  vec2 warpedFromCenter = lensWarp(fromCenter, radius, inradius, bulgeFade);
  vec2 baseUV = vec2(warpedFromCenter.x * invAspect, warpedFromCenter.y) + .5;

  vec2 baseDerivative = fwidth(baseUV);
  float edgeAA = clamp(2. * max(baseDerivative.x, baseDerivative.y), .001, .02);

  float spreadStrength;
  vec2 spreadAxis = getSpread(fromCenter, radius, baseUV, edgeAA, inradius, outradius, reach, spreadStrength);

  vec2 grainUV = vec2(0.);
  if (u_grainMixer > 0. || u_grainOverlay > 0.) {
    vec2 dudx = dFdx(v_imageUV);
    vec2 dudy = dFdy(v_imageUV);
    grainUV = (v_imageUV - .5) * (.8 / vec2(length(dudx), length(dudy))) + .5;
  }

  if (u_grainMixer > 0.) {
    float grainSeed = valueNoise(grainUV);
    vec2 jit = fract(grainSeed * vec2(157.31, 113.57)) * 2. - 1.;
    spreadAxis += jit * .3 * u_grainMixer * length(spreadAxis);
  }

  float count = floor(u_count);
  int countInteger = int(count);

  float invCount = 1. / count;
  float invSpan = 1. / max(count - 1., 1.);
  float hueBase = u_dispersionColor + .5;
  float biasPower = 1. + 2. * abs(u_bias);
  vec2 tapBias = .5 - vec2(u_imageX, u_imageY);

  float centerAmount = clamp(1. - u_dispersionShift, 0., 1.);
  float edgesAmount = clamp(1. + u_dispersionShift, 0., 1.);
  float dispersion = u_dispersion * mix(edgesAmount, centerAmount, innerCircleMask(radius, inradius));
  float dispersionPower = pow(dispersion, .8);

  float warpedRadius = length(warpedFromCenter);
  float swirlAngle = u_swirl * .4 * PI * spreadStrength * u_spread * min(1., inradius / max(warpedRadius, 1e-4));

  vec3 colorSum = vec3(0.);
  vec3 weightSum = vec3(0.);
  float coverSum = 0.;

  for (int i = 0; i < ${{maxSamples:50}.maxSamples}; i++) {
    if (i >= countInteger) break;

    float layer = float(i);
    float hue = hueBase + layer * invCount;

    float spread = layer * invSpan;
    if (u_bias != 0.) spread = dispersionCurve(spread, biasPower);

    // mix(axis, -axis, spread) is axis scaled by the signed position along the fan
    float fanPos = 1. - 2. * spread;
    vec2 tapUV = baseUV + spreadAxis * fanPos - .5;

    if (u_swirl != 0.) {
      tapUV.x *= u_imageAspectRatio;
      tapUV = rotate(tapUV, swirlAngle * fanPos);
      tapUV.x *= invAspect;
    }

    vec4 tap = sampleOverWhite(tapUV + tapBias);
    vec3 weight = 1. - dispersionPower * hueColor(hue);

    colorSum += tap.rgb * weight;
    weightSum += weight;
    coverSum += tap.a;
  }

  vec3 color = colorSum / max(weightSum, 1e-4);
  float coverAvg = coverSum * invCount;

  float ground = min(color.r, min(color.g, color.b));
  float alpha = max(coverAvg, 1. - ground);
  vec3 premult = max(color - (1. - alpha), 0.);
  fragColor = vec4(premult, alpha) * bulgeFade;

  if (u_grainOverlay > 0.) {
    float grain = valueNoise(rotate(grainUV, 1.) + vec2(3.));
    grain = mix(grain, valueNoise(rotate(grainUV, 2.) + vec2(-1.)), .5);
    grain = pow(grain, 1.3);
    float grainV = grain * 2. - 1.;
    float grainStrength = pow(u_grainOverlay * abs(grainV), .8) * fragColor.a;
    fragColor.rgb = mix(fragColor.rgb, vec3(step(0., grainV)) * fragColor.a, .35 * grainStrength);
  }
}
`,st=`#version 300 es
precision mediump float;

uniform float u_rotation;

uniform float u_time;

uniform vec4 u_colorFront;
uniform vec4 u_colorBack;
uniform float u_radius;
uniform float u_contrast;

uniform sampler2D u_image;
uniform float u_imageAspectRatio;

uniform float u_size;
uniform float u_grainMixer;
uniform float u_grainOverlay;
uniform float u_grainSize;
uniform float u_grid;
uniform bool u_originalColors;
uniform bool u_inverted;
uniform float u_type;

in vec2 v_imageUV;

out vec4 fragColor;

${Ue}
${We}
${Ke}

float valueNoise(vec2 st) {
  vec2 i = floor(st);
  vec2 f = fract(st);
  float a = hash21(i);
  float b = hash21(i + vec2(1.0, 0.0));
  float c = hash21(i + vec2(0.0, 1.0));
  float d = hash21(i + vec2(1.0, 1.0));
  vec2 u = f * f * (3.0 - 2.0 * f);
  float x1 = mix(a, b, u.x);
  float x2 = mix(c, d, u.x);
  return mix(x1, x2, u.y);
}

float lst(float edge0, float edge1, float x) {
  return clamp((x - edge0) / (edge1 - edge0), 0.0, 1.0);
}

float sst(float edge0, float edge1, float x) {
  return smoothstep(edge0, edge1, x);
}

float getCircle(vec2 uv, float r, float baseR) {
  r = mix(.25 * baseR, 0., r);
  float d = length(uv - .5);
  float aa = fwidth(d);
  return 1. - smoothstep(r - aa, r + aa, d);
}

float getCell(vec2 uv) {
  float insideX = step(0.0, uv.x) * (1.0 - step(1.0, uv.x));
  float insideY = step(0.0, uv.y) * (1.0 - step(1.0, uv.y));
  return insideX * insideY;
}

float getCircleWithHole(vec2 uv, float r, float baseR) {
  float cell = getCell(uv);

  r = mix(.75 * baseR, 0., r);
  float rMod = mod(r, .5);

  float d = length(uv - .5);
  float aa = fwidth(d);
  float circle = 1. - smoothstep(rMod - aa, rMod + aa, d);
  if (r < .5) {
    return circle;
  } else {
    return cell - circle;
  }
}

float getGooeyBall(vec2 uv, float r, float baseR) {
  float d = length(uv - .5);
  float sizeRadius = .3;
  if (u_grid == 1.) {
    sizeRadius = .42;
  }
  sizeRadius = mix(sizeRadius * baseR, 0., r);
  d = 1. - sst(0., sizeRadius, d);

  d = pow(d, 2. + baseR);
  return d;
}

float getSoftBall(vec2 uv, float r, float baseR) {
  float d = length(uv - .5);
  float sizeRadius = clamp(baseR, 0., 1.);
  sizeRadius = mix(.5 * sizeRadius, 0., r);
  d = 1. - lst(0., sizeRadius, d);
  float powRadius = 1. - lst(0., 2., baseR);
  d = pow(d, 4. + 3. * powRadius);
  return d;
}

float getUvFrame(vec2 uv, vec2 pad) {
  float aa = 0.0001;

  float left   = smoothstep(-pad.x, -pad.x + aa, uv.x);
  float right  = smoothstep(1.0 + pad.x, 1.0 + pad.x - aa, uv.x);
  float bottom = smoothstep(-pad.y, -pad.y + aa, uv.y);
  float top    = smoothstep(1.0 + pad.y, 1.0 + pad.y - aa, uv.y);

  return left * right * bottom * top;
}

float sigmoid(float x, float k) {
  return 1.0 / (1.0 + exp(-k * (x - 0.5)));
}

float getLumAtPx(vec2 uv, float contrast) {
  vec4 tex = texture(u_image, uv);
  vec3 color = vec3(
  sigmoid(tex.r, contrast),
  sigmoid(tex.g, contrast),
  sigmoid(tex.b, contrast)
  );
  float lum = dot(vec3(0.2126, 0.7152, 0.0722), color);
  lum = mix(1., lum, tex.a);
  lum = u_inverted ? (1. - lum) : lum;
  return lum;
}

float getLumBall(vec2 p, vec2 pad, vec2 inCellOffset, float contrast, float baseR, float stepSize, out vec4 ballColor) {
  p += inCellOffset;
  vec2 uv_i = floor(p);
  vec2 uv_f = fract(p);
  vec2 samplingUV = (uv_i + .5 - inCellOffset) * pad + vec2(.5);
  float outOfFrame = getUvFrame(samplingUV, pad * stepSize);

  float lum = getLumAtPx(samplingUV, contrast);
  ballColor = texture(u_image, samplingUV);
  ballColor.rgb *= ballColor.a;
  ballColor *= outOfFrame;

  float ball = 0.;
  if (u_type == 0.) {
    // classic
    ball = getCircle(uv_f, lum, baseR);
  } else if (u_type == 1.) {
    // gooey
    ball = getGooeyBall(uv_f, lum, baseR);
  } else if (u_type == 2.) {
    // holes
    ball = getCircleWithHole(uv_f, lum, baseR);
  } else if (u_type == 3.) {
    // soft
    ball = getSoftBall(uv_f, lum, baseR);
  }

  return ball * outOfFrame;
}


void main() {

  float stepMultiplier = 1.;
  if (u_type == 0.) {
    // classic
    stepMultiplier = 2.;
  } else if (u_type == 1. || u_type == 3.) {
    // gooey & soft
    stepMultiplier = 6.;
  }

  float cellsPerSide = mix(300., 7., pow(u_size, .7));
  cellsPerSide /= stepMultiplier;
  float cellSizeY = 1. / cellsPerSide;
  vec2 pad = cellSizeY * vec2(1. / u_imageAspectRatio, 1.);
  if (u_type == 1. && u_grid == 1.) {
    // gooey diagonal grid works differently
    pad *= .7;
  }

  vec2 uv = v_imageUV;
  uv -= vec2(.5);
  uv /= pad;

  float contrast = mix(0., 15., pow(u_contrast, 1.5));
  float baseRadius = u_radius;
  if (u_originalColors == true) {
    contrast = mix(.1, 4., pow(u_contrast, 2.));
    baseRadius = 2. * pow(.5 * u_radius, .3);
  }

  float totalShape = 0.;
  vec3 totalColor = vec3(0.);
  float totalOpacity = 0.;

  vec4 ballColor;
  float shape;
  float stepSize = 1. / stepMultiplier;
  for (float x = -0.5; x < 0.5; x += stepSize) {
    for (float y = -0.5; y < 0.5; y += stepSize) {
      vec2 offset = vec2(x, y);

      if (u_grid == 1.) {
        float rowIndex = floor((y + .5) / stepSize);
        float colIndex = floor((x + .5) / stepSize);
        if (stepSize == 1.) {
          rowIndex = floor(uv.y + y + 1.);
          if (u_type == 1.) {
            colIndex = floor(uv.x + x + 1.);
          }
        }
        if (u_type == 1.) {
          if (mod(rowIndex + colIndex, 2.) == 1.) {
            continue;
          }
        } else {
          if (mod(rowIndex, 2.) == 1.) {
            offset.x += .5 * stepSize;
          }
        }
      }

      shape = getLumBall(uv, pad, offset, contrast, baseRadius, stepSize, ballColor);
      totalColor   += ballColor.rgb * shape;
      totalShape   += shape;
      totalOpacity += shape;
    }
  }

  const float eps = 1e-4;

  totalColor /= max(totalShape, eps);
  totalOpacity /= max(totalShape, eps);

  float finalShape = 0.;
  if (u_type == 0.) {
    finalShape = min(1., totalShape);
  } else if (u_type == 1.) {
    float aa = fwidth(totalShape);
    float th = .5;
    finalShape = smoothstep(th - aa, th + aa, totalShape);
  } else if (u_type == 2.) {
    finalShape = min(1., totalShape);
  } else if (u_type == 3.) {
    finalShape = totalShape;
  }

  vec2 grainSize = mix(2000., 200., u_grainSize) * vec2(1., 1. / u_imageAspectRatio);
  vec2 grainUV = v_imageUV - .5;
  grainUV *= grainSize;
  grainUV += .5;
  float grain = valueNoise(grainUV);
  grain = smoothstep(.55, .7 + .2 * u_grainMixer, grain);
  grain *= u_grainMixer;
  finalShape = mix(finalShape, 0., grain);

  vec3 color = vec3(0.);
  float opacity = 0.;

  if (u_originalColors == true) {
    color = totalColor * finalShape;
    opacity = totalOpacity * finalShape;

    vec3 bgColor = u_colorBack.rgb * u_colorBack.a;
    color = color + bgColor * (1. - opacity);
    opacity = opacity + u_colorBack.a * (1. - opacity);
  } else {
    vec3 fgColor = u_colorFront.rgb * u_colorFront.a;
    float fgOpacity = u_colorFront.a;
    vec3 bgColor = u_colorBack.rgb * u_colorBack.a;
    float bgOpacity = u_colorBack.a;

    color = fgColor * finalShape;
    opacity = fgOpacity * finalShape;
    color += bgColor * (1. - opacity);
    opacity += bgOpacity * (1. - opacity);
  }

  float grainOverlay = valueNoise(rotate(grainUV, 1.) + vec2(3.));
  grainOverlay = mix(grainOverlay, valueNoise(rotate(grainUV, 2.) + vec2(-1.)), .5);
  grainOverlay = pow(grainOverlay, 1.3);

  float grainOverlayV = grainOverlay * 2. - 1.;
  vec3 grainOverlayColor = vec3(step(0., grainOverlayV));
  float grainOverlayStrength = u_grainOverlay * abs(grainOverlayV);
  grainOverlayStrength = pow(grainOverlayStrength, .8);
  color = mix(color, grainOverlayColor, .5 * grainOverlayStrength);

  opacity += .5 * grainOverlayStrength;
  opacity = clamp(opacity, 0., 1.);

  fragColor = vec4(color, opacity);
}
`,ct={classic:0,gooey:1,holes:2,soft:3},lt={square:0,hex:1};function P(e){if(Array.isArray(e))return e.length===4?e:e.length===3?[...e,1]:ht;if(typeof e!=`string`)return ht;let t,n,r,i=1;if(e.startsWith(`#`))[t,n,r,i]=ut(e);else if(e.startsWith(`rgb`)){let a=dt(e);if(a===null)return ht;[t,n,r,i]=a}else if(e.startsWith(`hsl`)){let a=ft(e);if(a===null)return ht;[t,n,r,i]=pt(a)}else return console.error(`Unsupported color format`,e),ht;return[mt(t,0,1),mt(n,0,1),mt(r,0,1),mt(i,0,1)]}function ut(e){return e=e.replace(/^#/,``),(e.length===3||e.length===4)&&(e=e.split(``).map(e=>e+e).join(``)),e.length===6&&(e+=`ff`),/^[0-9a-f]{8}$/i.test(e)?[parseInt(e.slice(0,2),16)/255,parseInt(e.slice(2,4),16)/255,parseInt(e.slice(4,6),16)/255,parseInt(e.slice(6,8),16)/255]:(console.warn(`Invalid hex color`),ht)}function dt(e){let t=e.match(/^rgba?\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*([0-9.]+))?\s*\)$/i);return t?[parseInt(t[1]??`0`)/255,parseInt(t[2]??`0`)/255,parseInt(t[3]??`0`)/255,t[4]===void 0?1:parseFloat(t[4])]:null}function ft(e){let t=e.match(/^hsla?\s*\(\s*(\d+)\s*,\s*(\d+)%\s*,\s*(\d+)%\s*(?:,\s*([0-9.]+))?\s*\)$/i);return t?[parseInt(t[1]??`0`),parseInt(t[2]??`0`),parseInt(t[3]??`0`),t[4]===void 0?1:parseFloat(t[4])]:null}function pt(e){let[t,n,r,i]=e,a=t/360,o=n/100,s=r/100,c,l,u;if(n===0)c=l=u=s;else{let e=(e,t,n)=>(n<0&&(n+=1),n>1&&--n,n<1/6?e+(t-e)*6*n:n<1/2?t:n<2/3?e+(t-e)*(2/3-n)*6:e),t=s<.5?s*(1+o):s+o-s*o,n=2*s-t;c=e(n,t,a+1/3),l=e(n,t,a),u=e(n,t,a-1/3)}return[c,l,u,i]}var mt=(e,t,n)=>Math.min(Math.max(e,t),n),ht=[.5,.5,.5,1];function gt(){if(typeof window>`u`)return;let e=new Image;return e.src=_t,e}var _t=`data:image/png;base64,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`;function vt(e){let t=k.useRef(void 0),n=k.useCallback(t=>{let n=e.map(e=>{if(e!=null){if(typeof e==`function`){let n=e,r=n(t);return typeof r==`function`?r:()=>{n(null)}}return e.current=t,()=>{e.current=null}}});return()=>{n.forEach(e=>e?.())}},e);return k.useMemo(()=>e.every(e=>e==null)?null:e=>{t.current&&=(t.current(),void 0),e!=null&&(t.current=n(e))},e)}function yt(e){if(e.naturalWidth<1024&&e.naturalHeight<1024){if(e.naturalWidth<1||e.naturalHeight<1)return;let t=e.naturalWidth/e.naturalHeight;e.width=Math.round(t>1?1024*t:1024),e.height=Math.round(t>1?1024:1024/t)}}async function bt(e){let t={},n=[],r=e=>{try{return e.startsWith(`/`)||new URL(e),!0}catch{return!1}},i=e=>{try{return!e.startsWith(`/`)&&new URL(e,window.location.origin).origin!==window.location.origin}catch{return!1}};return Object.entries(e).forEach(([e,a])=>{if(typeof a==`string`){let o=a||`data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==`;if(!r(o)){console.warn(`Uniform "${e}" has invalid URL "${o}". Skipping image loading.`);return}let s=new Promise((n,r)=>{let a=new Image;i(o)&&(a.crossOrigin=`anonymous`),a.onload=()=>{yt(a),t[e]=a,n()},a.onerror=()=>{console.error(`Could not set uniforms. Failed to load image at ${o}`),r()},a.src=o});n.push(s)}else if(a instanceof HTMLImageElement){let r=a.decode().then(()=>{yt(a),t[e]=a});n.push(r)}else t[e]=a}),await Promise.all(n),t}var xt=(0,k.forwardRef)(function({fragmentShader:e,uniforms:t,webGlContextAttributes:n,speed:r=0,frame:i=0,width:a,height:o,minPixelRatio:s,maxPixelCount:c,mipmaps:l,style:u,...d},f){let[p,m]=(0,k.useState)(!1),h=(0,k.useRef)(null),g=(0,k.useRef)(null),_=(0,k.useRef)(n);(0,k.useEffect)(()=>((async()=>{let n=await bt(t);h.current&&!g.current&&(g.current=new Fe(h.current,e,n,_.current,r,i,s,c,l),m(!0))})(),()=>{g.current?.dispose(),g.current=null}),[e]),(0,k.useEffect)(()=>{let e=!1;return(async()=>{let n=await bt(t);e||g.current?.setUniforms(n)})(),()=>{e=!0}},[t,p]),(0,k.useEffect)(()=>{g.current?.setSpeed(r)},[r,p]),(0,k.useEffect)(()=>{g.current?.setMaxPixelCount(c)},[c,p]),(0,k.useEffect)(()=>{g.current?.setMinPixelRatio(s)},[s,p]),(0,k.useEffect)(()=>{g.current?.setFrame(i)},[i,p]);let v=vt([h,f]);return(0,A.jsx)(`div`,{ref:v,style:a!==void 0||o!==void 0?{width:typeof a==`string`&&isNaN(+a)===!1?+a:a,height:typeof o==`string`&&isNaN(+o)===!1?+o:o,...u}:u,...d})});xt.displayName=`ShaderMount`;function St(e,t){if(Object.keys(e).length!==Object.keys(t).length)return!1;for(let n in e)if(n===`colors`){let n=Array.isArray(e.colors),r=Array.isArray(t.colors);if(!n||!r){if(Object.is(e.colors,t.colors)===!1)return!1;continue}if(e.colors?.length!==t.colors?.length||!e.colors?.every((e,n)=>e===t.colors?.[n]))return!1}else if(Object.is(e[n],t[n])===!1)return!1;return!0}var F={name:`Default`,params:{...N,speed:1,frame:0,colors:[`#e0eaff`,`#241d9a`,`#f75092`,`#9f50d3`],distortion:.8,swirl:.1,grainMixer:0,grainOverlay:0}};({...N}),{...N},{...N};var Ct=(0,k.memo)(function({speed:e=F.params.speed,frame:t=F.params.frame,colors:n=F.params.colors,distortion:r=F.params.distortion,swirl:i=F.params.swirl,grainMixer:a=F.params.grainMixer,grainOverlay:o=F.params.grainOverlay,fit:s=F.params.fit,rotation:c=F.params.rotation,scale:l=F.params.scale,originX:u=F.params.originX,originY:d=F.params.originY,offsetX:f=F.params.offsetX,offsetY:p=F.params.offsetY,worldWidth:m=F.params.worldWidth,worldHeight:h=F.params.worldHeight,...g}){let _={u_colors:n.map(P),u_colorsCount:n.length,u_distortion:r,u_swirl:i,u_grainMixer:a,u_grainOverlay:o,u_fit:He[s],u_rotation:c,u_scale:l,u_offsetX:f,u_offsetY:p,u_originX:u,u_originY:d,u_worldWidth:m,u_worldHeight:h};return(0,A.jsx)(xt,{...g,speed:e,frame:t,fragmentShader:Ze,uniforms:_})},St),I={name:`Default`,params:{...Ve,speed:1,frame:0,scale:.6,colorBack:`#000000`,colorFront:`#00b2ff`,shape:`sphere`,type:`4x4`,size:2}};({...Ve}),{...Ve},{...N},{...N},{...N};var wt=(0,k.memo)(function({speed:e=I.params.speed,frame:t=I.params.frame,colorBack:n=I.params.colorBack,colorFront:r=I.params.colorFront,shape:i=I.params.shape,type:a=I.params.type,pxSize:o,size:s=o===void 0?I.params.size:o,fit:c=I.params.fit,scale:l=I.params.scale,rotation:u=I.params.rotation,originX:d=I.params.originX,originY:f=I.params.originY,offsetX:p=I.params.offsetX,offsetY:m=I.params.offsetY,worldWidth:h=I.params.worldWidth,worldHeight:g=I.params.worldHeight,..._}){let v={u_colorBack:P(n),u_colorFront:P(r),u_shape:$e[i],u_type:et[a],u_pxSize:s,u_fit:He[c],u_scale:l,u_rotation:u,u_offsetX:p,u_offsetY:m,u_originX:d,u_originY:f,u_worldWidth:h,u_worldHeight:g};return(0,A.jsx)(xt,{..._,speed:e,frame:t,fragmentShader:Qe,uniforms:v})}),L={name:`Default`,params:{...N,fit:`cover`,scale:.6,speed:0,frame:0,colorFront:`#9fadbc`,colorBack:`#ffffff`,contrast:.3,roughness:.4,fiber:.3,fiberSize:.2,crumples:.3,crumpleSize:.35,folds:.65,foldCount:5,fade:0,drops:.2,seed:5.8}};({...N}),{...N},{...N};var Tt=(0,k.memo)(function({speed:e=L.params.speed,frame:t=L.params.frame,colorFront:n=L.params.colorFront,colorBack:r=L.params.colorBack,image:i=``,contrast:a=L.params.contrast,roughness:o=L.params.roughness,fiber:s=L.params.fiber,crumples:c=L.params.crumples,folds:l=L.params.folds,drops:u=L.params.drops,seed:d=L.params.seed,fiberScale:f,fiberSize:p=f===void 0?L.params.fiberSize:.2/f,crumplesScale:m,crumpleSize:h=m===void 0?L.params.crumpleSize:.2/m,blur:g,fade:_=g===void 0?L.params.fade:g,foldsNumber:v,foldCount:y=v===void 0?L.params.foldCount:v,fit:b=L.params.fit,scale:x=L.params.scale,rotation:S=L.params.rotation,originX:C=L.params.originX,originY:w=L.params.originY,offsetX:T=L.params.offsetX,offsetY:E=L.params.offsetY,worldWidth:ee=L.params.worldWidth,worldHeight:te=L.params.worldHeight,...D}){let ne=typeof window<`u`&&{u_noiseTexture:gt()},O={u_image:i,u_colorFront:P(n),u_colorBack:P(r),u_contrast:a,u_roughness:o,u_fiber:s,u_fiberSize:p,u_crumples:c,u_crumpleSize:h,u_foldCount:y,u_folds:l,u_fade:_,u_drops:u,u_seed:d,...ne,u_fit:He[b],u_scale:x,u_rotation:S,u_offsetX:T,u_offsetY:E,u_originX:C,u_originY:w,u_worldWidth:ee,u_worldHeight:te};return(0,A.jsx)(xt,{...D,speed:e,frame:t,fragmentShader:tt,mipmaps:[`u_image`],uniforms:O})},St),R={name:`Default`,params:{...N,fit:`cover`,speed:0,frame:0,colorBack:`#00000000`,colorShadow:`#000000`,colorHighlight:`#ffffff`,shadows:.25,size:.5,angle:0,distortionShape:`prism`,highlights:.1,shape:`lines`,distortion:.5,shift:0,blur:0,edges:.25,stretch:0,margin:0,marginLeft:0,marginRight:0,marginTop:0,marginBottom:0,grainMixer:0,grainOverlay:0}};({...N}),{...N},{...N};var Et=(0,k.memo)(function({speed:e=R.params.speed,frame:t=R.params.frame,colorBack:n=R.params.colorBack,colorShadow:r=R.params.colorShadow,colorHighlight:i=R.params.colorHighlight,image:a=``,shadows:o=R.params.shadows,angle:s=R.params.angle,distortion:c=R.params.distortion,distortionShape:l=R.params.distortionShape,highlights:u=R.params.highlights,shape:d=R.params.shape,shift:f=R.params.shift,blur:p=R.params.blur,edges:m=R.params.edges,margin:h,marginLeft:g=h??R.params.marginLeft,marginRight:_=h??R.params.marginRight,marginTop:v=h??R.params.marginTop,marginBottom:y=h??R.params.marginBottom,grainMixer:b=R.params.grainMixer,grainOverlay:x=R.params.grainOverlay,stretch:S=R.params.stretch,count:C,size:w=C===void 0?R.params.size:(1/(C*1.6))**(1/6)/.7-.5,fit:T=R.params.fit,scale:E=R.params.scale,rotation:ee=R.params.rotation,originX:te=R.params.originX,originY:D=R.params.originY,offsetX:ne=R.params.offsetX,offsetY:O=R.params.offsetY,worldWidth:re=R.params.worldWidth,worldHeight:ie=R.params.worldHeight,...ae}){let oe={u_image:a,u_colorBack:P(n),u_colorShadow:P(r),u_colorHighlight:P(i),u_shadows:o,u_size:w,u_angle:s,u_distortion:c,u_shift:f,u_blur:p,u_edges:m,u_stretch:S,u_distortionShape:it[l],u_highlights:u,u_shape:rt[d],u_marginLeft:g,u_marginRight:_,u_marginTop:v,u_marginBottom:y,u_grainMixer:b,u_grainOverlay:x,u_fit:He[T],u_scale:E,u_rotation:ee,u_offsetX:ne,u_offsetY:O,u_originX:te,u_originY:D,u_worldWidth:re,u_worldHeight:ie};return(0,A.jsx)(xt,{...ae,speed:e,frame:t,fragmentShader:nt,mipmaps:[`u_image`],uniforms:oe})}),z={name:`Default`,params:{...N,fit:`cover`,speed:0,frame:0,colorFront:`#94ffaf`,colorBack:`#000c38`,colorHighlight:`#eaff94`,type:`8x8`,size:2,colorSteps:2,originalColors:!1,inverted:!1}};({...N}),{...N},{...N};var Dt=(0,k.memo)(function({speed:e=z.params.speed,frame:t=z.params.frame,colorFront:n=z.params.colorFront,colorBack:r=z.params.colorBack,colorHighlight:i=z.params.colorHighlight,image:a=``,type:o=z.params.type,colorSteps:s=z.params.colorSteps,originalColors:c=z.params.originalColors,inverted:l=z.params.inverted,pxSize:u,size:d=u===void 0?z.params.size:u,fit:f=z.params.fit,scale:p=z.params.scale,rotation:m=z.params.rotation,originX:h=z.params.originX,originY:g=z.params.originY,offsetX:_=z.params.offsetX,offsetY:v=z.params.offsetY,worldWidth:y=z.params.worldWidth,worldHeight:b=z.params.worldHeight,...x}){let S={u_image:a,u_colorFront:P(n),u_colorBack:P(r),u_colorHighlight:P(i),u_type:et[o],u_pxSize:d,u_colorSteps:s,u_originalColors:c,u_inverted:l,u_fit:He[f],u_rotation:m,u_scale:p,u_offsetX:_,u_offsetY:v,u_originX:h,u_originY:g,u_worldWidth:y,u_worldHeight:b};return(0,A.jsx)(xt,{...x,speed:e,frame:t,fragmentShader:at,uniforms:S})},St),B={name:`Default`,params:{...N,scale:1,fit:`contain`,speed:0,frame:0,spread:.6,bias:1,angle:0,perspective:.1,count:35,dispersion:1,dispersionShift:0,dispersionColor:.6,focusCenter:.8,focusEdges:1,swirl:.35,noise:0,noiseFrequency:.25,noiseOffset:0,lensBulge:0,lensCircle:0,grainMixer:0,grainOverlay:0,imageX:0,imageY:0}};({...N}),{...N},{...N};var Ot=(0,k.memo)(function({speed:e=B.params.speed,frame:t=B.params.frame,image:n=``,spread:r=B.params.spread,bias:i=B.params.bias,angle:a=B.params.angle,perspective:o=B.params.perspective,count:s=B.params.count,dispersion:c=B.params.dispersion,dispersionShift:l=B.params.dispersionShift,dispersionColor:u=B.params.dispersionColor,focusCenter:d=B.params.focusCenter,focusEdges:f=B.params.focusEdges,swirl:p=B.params.swirl,noise:m=B.params.noise,noiseFrequency:h=B.params.noiseFrequency,noiseOffset:g=B.params.noiseOffset,lensBulge:_=B.params.lensBulge,lensCircle:v=B.params.lensCircle,grainMixer:y=B.params.grainMixer,grainOverlay:b=B.params.grainOverlay,imageX:x=B.params.imageX,imageY:S=B.params.imageY,fit:C=B.params.fit,scale:w=B.params.scale,rotation:T=B.params.rotation,originX:E=B.params.originX,originY:ee=B.params.originY,offsetX:te=B.params.offsetX,offsetY:D=B.params.offsetY,worldWidth:ne=B.params.worldWidth,worldHeight:O=B.params.worldHeight,...re}){let ie={u_image:n,u_spread:r,u_bias:i,u_angle:a,u_perspective:o,u_count:s,u_dispersion:c,u_dispersionShift:l,u_dispersionColor:u,u_focusCenter:d,u_focusEdges:f,u_swirl:p,u_noise:m,u_noiseFrequency:h,u_noiseOffset:g,u_lensBulge:_,u_lensCircle:v,u_grainMixer:y,u_grainOverlay:b,u_imageX:x,u_imageY:S,u_fit:He[C],u_rotation:T,u_scale:w,u_offsetX:te,u_offsetY:D,u_originX:E,u_originY:ee,u_worldWidth:ne,u_worldHeight:O};return(0,A.jsx)(xt,{...re,speed:e,frame:t,fragmentShader:ot,mipmaps:[`u_image`],uniforms:ie})},St),V={name:`Default`,params:{...N,fit:`cover`,speed:0,frame:0,colorBack:`#f2f1e8`,colorFront:`#2b2b2b`,size:.5,radius:1.25,contrast:.4,originalColors:!1,inverted:!1,grainMixer:.2,grainOverlay:.2,grainSize:.5,grid:`hex`,type:`gooey`}};({...N}),{...N},{...N};var kt=(0,k.memo)(function({speed:e=V.params.speed,frame:t=V.params.frame,colorFront:n=V.params.colorFront,colorBack:r=V.params.colorBack,image:i=``,size:a=V.params.size,radius:o=V.params.radius,contrast:s=V.params.contrast,originalColors:c=V.params.originalColors,inverted:l=V.params.inverted,grainMixer:u=V.params.grainMixer,grainOverlay:d=V.params.grainOverlay,grainSize:f=V.params.grainSize,grid:p=V.params.grid,type:m=V.params.type,fit:h=V.params.fit,scale:g=V.params.scale,rotation:_=V.params.rotation,originX:v=V.params.originX,originY:y=V.params.originY,offsetX:b=V.params.offsetX,offsetY:x=V.params.offsetY,worldWidth:S=V.params.worldWidth,worldHeight:C=V.params.worldHeight,...w}){let T={u_image:i,u_colorFront:P(n),u_colorBack:P(r),u_size:a,u_radius:o,u_contrast:s,u_originalColors:c,u_inverted:l,u_grainMixer:u,u_grainOverlay:d,u_grainSize:f,u_grid:lt[p],u_type:ct[m],u_fit:He[h],u_rotation:_,u_scale:g,u_offsetX:b,u_offsetY:x,u_originX:v,u_originY:y,u_worldWidth:S,u_worldHeight:C};return(0,A.jsx)(xt,{...w,speed:e,frame:t,fragmentShader:st,uniforms:T})},St),At=(e,t,n)=>{let r=e.setUniformValues;n&&typeof r==`function`?r(t):e.setUniforms(t)},jt=Object.freeze({antialias:!1,depth:!1}),Mt=e=>(t=>{if(e.current=t,t)return()=>{e.current=null;let n=t.paperShaderMount?.canvasElement;if(!n)return;let r=n.getContext(`webgl2`);queueMicrotask(()=>{!r||n.isConnected||r.isContextLost()||r.getExtension(`WEBGL_lose_context`)?.loseContext()})}}),Nt=921600,Pt=.12,H=e=>Math.min(1,Math.max(0,e/255)),Ft=e=>Math.min(2,Math.max(0,e)),It=e=>Math.min(1,Math.max(0,e)),Lt=(e,t,n)=>e+(t-e)*n,Rt=(e,t,n,r,i)=>(H(e)*.22+H(t)*.18+H(n)*.22+H(r)*.28+H(i)*.1)**.55,zt=(e,t,n)=>Math.max(n*.84,It((e-t)*7)),Bt=(e,t)=>It(e*.42+t*.85),Vt=(e,t,n)=>n?Bt(e,t):It(e),Ht=(e,t,n,r)=>Ft(r?e*Pt:Lt(e,t,n)),Ut=(e,t,n)=>{let r=e[0]??t.secondaryColor;if(n===`cover-only`){let t=e[1]??r,n=e[2]??t;return{ditheringBack:n,ditheringFront:r,mesh:[r,t,n,e[3]??r,e[4]??t,e[5]??n]}}let i=e[1]??t.primaryColor,a=e[2]??r,o=e[3]??i;return{ditheringBack:t.backgroundColor,ditheringFront:r,mesh:[r,i,a,o,t.backgroundColor,t.accentColor]}},Wt=k.memo(({theme:e,coverUrl:t,audioPower:n,audioBands:r,staticMode:i,paused:a,tuning:o})=>{let s=(0,k.useRef)(null),c=(0,k.useRef)(null),l=(0,k.useMemo)(()=>Mt(s),[]),u=(0,k.useMemo)(()=>Mt(c),[]),d=(0,k.useRef)(null),f=(0,k.useRef)(null),p=(0,k.useRef)(a),[m,h]=(0,k.useState)([]),g=o??ee,_=g.displayMode!==`mesh`,v=g.displayMode!==`dithering`;p.current=a,(0,k.useEffect)(()=>{let e=!0;return t?(S(t,6).then(t=>{e&&h(t)}),()=>{e=!1}):(h([]),()=>{e=!1})},[t]);let y=(0,k.useMemo)(()=>Ut(m,e,g.colorSource),[m,e,g.colorSource]);return(0,k.useEffect)(()=>{let e=s.current?.paperShaderMount,t=c.current?.paperShaderMount;if(i){e?.setSpeed(0),t?.setSpeed(0);return}let a=0,o=new WeakMap,l=(e,t,n)=>{let r=o.get(e);r||(r={},o.set(e,r)),r[t]!==n&&(r[t]=n,e.style[t]=n)},u=0,m=0,h=0,_=0,y=0,b=0,x=()=>{let e=p.current,t=e?0:H(n.get()),i=e?0:H(r.bass.get()),o=e?0:Rt(r.bass.get(),r.lowMid.get(),r.mid.get(),r.vocal.get(),r.treble.get()),S=e?0:H(Math.max(r.mid.get(),r.vocal.get()));u=Lt(u,t,.12),m=Lt(m,i,.16),h=Lt(h,S,.13),b=g.enhancedBeatResponse?zt(o,y,b):0,y=o;let C=Vt(o,b,g.enhancedBeatResponse);_=Lt(_,C,C>_?.42:.14);let w=s.current?.paperShaderMount,T=c.current?.paperShaderMount;if(w){let t=Ht(g.ditheringSpeed,g.ditheringAudioSpeed,_,e);w.setSpeed(t),At(w,{u_pxSize:Math.max(.5,g.ditheringSize-m*g.ditheringSize*.34)},t!==0)}if(T){let t=Ht(g.meshSpeed,g.meshAudioSpeed,_,e);T.setSpeed(t),At(T,{u_distortion:g.meshDistortion+u*.62,u_swirl:g.meshSwirl+h*.38},t!==0)}d.current&&(l(d.current,`opacity`,v?`${Math.min(1,g.ditheringOpacity+m*.25)}`:`1`),l(d.current,`transform`,`scale(${1.015+m*.025})`)),f.current&&(l(f.current,`filter`,`saturate(${1.04+h*.34}) brightness(${.94+u*.16})`),l(f.current,`transform`,`scale(${1.025+u*.018})`)),a=requestAnimationFrame(x)};return a=requestAnimationFrame(x),()=>cancelAnimationFrame(a)},[r,n,v,i,g]),(0,A.jsxs)(`div`,{className:`absolute inset-0 z-0 overflow-hidden`,style:{backgroundColor:e.backgroundColor,pointerEvents:`none`},children:[v&&(0,A.jsx)(`div`,{ref:f,className:`absolute inset-0`,style:{transform:`scale(1.025)`,transformOrigin:`center`},children:(0,A.jsx)(Ct,{ref:u,width:`100%`,height:`100%`,colors:y.mesh,distortion:g.meshDistortion,swirl:g.meshSwirl,grainMixer:0,grainOverlay:.01,speed:i?0:Ht(g.meshSpeed,g.meshAudioSpeed,0,a),minPixelRatio:1,maxPixelCount:Nt,webGlContextAttributes:jt,style:{width:`100%`,height:`100%`}})}),_&&(0,A.jsx)(`div`,{ref:d,className:`absolute inset-0`,style:{mixBlendMode:v?`soft-light`:`normal`,opacity:v?g.ditheringOpacity:1,transform:`scale(1.015)`,transformOrigin:`center`},children:(0,A.jsx)(wt,{ref:l,width:`100%`,height:`100%`,colorBack:y.ditheringBack,colorFront:y.ditheringFront,shape:`warp`,type:`4x4`,size:g.ditheringSize,speed:i?0:Ht(g.ditheringSpeed,g.ditheringAudioSpeed,0,a),minPixelRatio:1,maxPixelCount:Nt,webGlContextAttributes:jt,style:{width:`100%`,height:`100%`}})}),g.overlayEnabled&&g.overlayOpacity>0&&(0,A.jsx)(`div`,{className:`absolute inset-0`,style:{backgroundColor:e.backgroundColor,opacity:g.overlayOpacity}})]})}),U=({label:e,value:t,min:n,max:r,step:i,format:a=e=>e.toFixed(1),rangeInputClass:o,theme:s,onChange:c,onPointerDown:l,onPointerUp:u,disabled:d=!1})=>(0,A.jsxs)(`label`,{className:`block space-y-2`,children:[(0,A.jsxs)(`span`,{className:`flex justify-between gap-3 text-sm`,style:{color:s.primaryColor},children:[(0,A.jsx)(`span`,{children:e}),(0,A.jsx)(`span`,{className:`font-mono opacity-70`,children:a(t)})]}),(0,A.jsx)(`input`,{type:`range`,min:n,max:r,step:i,value:t,disabled:d,onChange:e=>c(Number(e.target.value)),onPointerDown:l,onPointerUp:u,className:o})]}),Gt=({t:e,isDaylight:t,theme:n,controlCardBg:r,rangeInputClass:i,tuning:a,onTuningChange:o,onSliderPointerDown:s,onSliderCommit:c})=>{let l=D(n.secondaryColor,t?.18:.16),u=D(n.accentColor,t?.1:.16),d=[[`dithering`,e(`options.latentDisplayDithering`)],[`mesh`,e(`options.latentDisplayMesh`)],[`both`,e(`options.latentDisplayBoth`)]],f=[[`cover-theme`,e(`options.latentColorSourceCoverTheme`)],[`cover-only`,e(`options.latentColorSourceCoverOnly`)]],p={rangeInputClass:i,theme:n,onPointerDown:s,onPointerUp:c};return(0,A.jsxs)(`div`,{className:`rounded-[24px] border p-4 space-y-5`,style:{backgroundColor:r,borderColor:l},children:[(0,A.jsxs)(`div`,{className:`space-y-1`,children:[(0,A.jsx)(`div`,{className:`text-sm font-medium`,style:{color:n.primaryColor},children:e(`options.latentBackgroundSettings`)}),(0,A.jsx)(`div`,{className:`text-xs opacity-70`,style:{color:n.secondaryColor},children:e(`options.latentBackgroundSettingsDesc`)})]}),(0,A.jsxs)(`div`,{className:`space-y-2`,children:[(0,A.jsx)(`div`,{className:`text-sm`,style:{color:n.primaryColor},children:e(`options.latentDisplayMode`)}),(0,A.jsx)(`div`,{className:`grid grid-cols-3 gap-2`,children:d.map(([e,t])=>(0,A.jsx)(`button`,{type:`button`,onClick:()=>o?.({displayMode:e}),className:`rounded-xl border px-2 py-2 text-xs`,style:{borderColor:a.displayMode===e?n.accentColor:l,backgroundColor:a.displayMode===e?u:`transparent`,color:n.primaryColor},children:t},e))})]}),(0,A.jsxs)(`div`,{className:`space-y-2`,children:[(0,A.jsx)(`div`,{className:`text-sm`,style:{color:n.primaryColor},children:e(`options.latentColorSource`)}),(0,A.jsx)(`div`,{className:`grid grid-cols-2 gap-2`,children:f.map(([e,t])=>(0,A.jsx)(`button`,{type:`button`,onClick:()=>o?.({colorSource:e}),className:`rounded-xl border px-2 py-2 text-xs`,style:{borderColor:a.colorSource===e?n.accentColor:l,backgroundColor:a.colorSource===e?u:`transparent`,color:n.primaryColor},children:t},e))})]}),(0,A.jsx)(j,{label:e(`options.latentDynamicOnlyInPlayer`),description:e(`options.latentDynamicOnlyInPlayerDesc`),checked:a.dynamicOnlyInPlayer,onChange:e=>o?.({dynamicOnlyInPlayer:e}),theme:n}),(0,A.jsx)(j,{label:e(`options.latentEnhancedBeatResponse`),description:e(`options.latentEnhancedBeatResponseDesc`),checked:a.enhancedBeatResponse,onChange:e=>o?.({enhancedBeatResponse:e}),theme:n}),(0,A.jsxs)(`div`,{className:`space-y-3 rounded-2xl border p-3`,style:{borderColor:l},children:[(0,A.jsx)(j,{label:e(`options.nomandBackgroundOverlay`),description:e(`options.nomandBackgroundOverlayDesc`),checked:a.overlayEnabled,onChange:e=>o?.({overlayEnabled:e}),theme:n}),(0,A.jsx)(`div`,{className:a.overlayEnabled?``:`opacity-45`,children:(0,A.jsx)(U,{...p,label:e(`options.nomandBackgroundOverlayOpacity`),value:a.overlayOpacity,disabled:!a.overlayEnabled,min:0,max:1,step:.05,format:e=>`${Math.round(e*100)}%`,onChange:e=>o?.({overlayOpacity:e})})})]}),(0,A.jsxs)(`div`,{className:`space-y-4 rounded-2xl border p-3`,style:{borderColor:l},children:[(0,A.jsx)(`div`,{className:`text-xs font-medium uppercase tracking-[0.2em]`,style:{color:n.secondaryColor},children:e(`options.latentDitheringGroup`)}),(0,A.jsx)(U,{...p,label:e(`options.latentBaseSpeed`),value:a.ditheringSpeed,min:0,max:2,step:.1,onChange:e=>o?.({ditheringSpeed:e})}),(0,A.jsx)(U,{...p,label:e(`options.latentAudioSpeed`),value:a.ditheringAudioSpeed,min:0,max:2,step:.1,onChange:e=>o?.({ditheringAudioSpeed:e})}),(0,A.jsx)(U,{...p,label:e(`options.latentDitheringSize`),value:a.ditheringSize,min:.5,max:8,step:.25,onChange:e=>o?.({ditheringSize:e})}),(0,A.jsx)(U,{...p,label:e(`options.latentDitheringOpacity`),value:a.ditheringOpacity,min:0,max:1,step:.05,format:e=>`${Math.round(e*100)}%`,onChange:e=>o?.({ditheringOpacity:e})})]}),(0,A.jsxs)(`div`,{className:`space-y-4 rounded-2xl border p-3`,style:{borderColor:l},children:[(0,A.jsx)(`div`,{className:`text-xs font-medium uppercase tracking-[0.2em]`,style:{color:n.secondaryColor},children:e(`options.latentMeshGroup`)}),(0,A.jsx)(U,{...p,label:e(`options.latentBaseSpeed`),value:a.meshSpeed,min:0,max:2,step:.1,onChange:e=>o?.({meshSpeed:e})}),(0,A.jsx)(U,{...p,label:e(`options.latentAudioSpeed`),value:a.meshAudioSpeed,min:0,max:2,step:.1,onChange:e=>o?.({meshAudioSpeed:e})}),(0,A.jsx)(U,{...p,label:e(`options.latentMeshDistortion`),value:a.meshDistortion,min:0,max:2,step:.05,onChange:e=>o?.({meshDistortion:e})}),(0,A.jsx)(U,{...p,label:e(`options.latentMeshSwirl`),value:a.meshSwirl,min:0,max:1,step:.05,onChange:e=>o?.({meshSwirl:e})})]})]})},Kt=e({default:()=>Yt}),qt=[`dithering`,`mesh`,`both`],Jt={dithering:`options.latentDisplayDithering`,mesh:`options.latentDisplayMesh`,both:`options.latentDisplayBoth`},Yt=de({mode:`latent`,order:35,labelKey:`options.visualizerBackgroundModeLatent`,labelFallback:`Latent`,render:({config:e,theme:t,coverUrl:n,audioPower:r,audioBands:i,staticMode:a,paused:o})=>(0,A.jsx)(Wt,{theme:t,coverUrl:n,audioPower:r,audioBands:i,staticMode:a,paused:o,tuning:e?.latent?.tuning}),renderSettingsPanel:({config:e,actions:t,...n})=>(0,A.jsx)(Gt,{...n,tuning:e?.latent?.tuning??ee,onTuningChange:t?.latent?.onTuningChange}),renderQuickControls:({config:e,actions:t,t:n,isDaylight:r,theme:i})=>{let a=e?.latent?.tuning??ee,s=n(Jt[a.displayMode]);return(0,A.jsxs)(A.Fragment,{children:[(0,A.jsx)(fe,{isDaylight:r,label:s,title:`${n(`options.latentDisplayMode`)}: ${s}`,onClick:()=>{let e=qt.indexOf(a.displayMode);t?.latent?.onTuningChange?.({displayMode:qt[(e+1)%qt.length]})}}),(0,A.jsx)(pe,{active:a.overlayEnabled,theme:i,label:n(`options.nomandBackgroundOverlay`),onToggle:()=>t?.latent?.onTuningChange?.({overlayEnabled:!a.overlayEnabled}),children:(0,A.jsx)(o,{size:14})})]})},resetSettings:e=>e?.latent?.onResetTuning?.()}),Xt=({children:e,theme:t})=>(0,A.jsx)(`div`,{className:`text-xs font-medium uppercase tracking-[0.24em] opacity-45`,style:{color:t.secondaryColor},children:e}),Zt=({label:e,value:t,options:n,onChange:r,isDaylight:i,theme:a})=>(0,A.jsxs)(`div`,{className:`space-y-2.5`,children:[(0,A.jsx)(Xt,{theme:a,children:e}),(0,A.jsx)(`div`,{className:`flex flex-wrap gap-2`,children:n.map(e=>{let n=e.value===t;return(0,A.jsx)(`button`,{type:`button`,onClick:()=>{e.disabled||r(e.value)},disabled:e.disabled,className:`rounded-full border px-3 py-2 text-sm transition-all disabled:cursor-not-allowed disabled:opacity-45`,style:{color:e.disabled?D(a.secondaryColor,.72):a.primaryColor,borderColor:n?a.accentColor:D(a.secondaryColor,i?.18:.14),backgroundColor:n?D(a.accentColor,i?.1:.16):D(a.backgroundColor,i?.24:.34),boxShadow:n?`inset 0 0 0 1px ${a.accentColor}`:`none`},children:e.label},String(e.value))})})]}),Qt=({label:e,valueLabel:t,value:n,min:r,max:i,step:a,onChange:o,rangeInputClass:s,onSliderPointerDown:c,onSliderCommit:l})=>(0,A.jsxs)(`div`,{className:`space-y-2`,children:[(0,A.jsxs)(`div`,{className:`flex items-center justify-between gap-3 text-sm`,style:{color:`var(--text-primary)`},children:[(0,A.jsx)(`span`,{children:e}),(0,A.jsx)(`span`,{className:`font-mono opacity-70`,style:{color:`var(--text-secondary)`},children:t})]}),(0,A.jsx)(`input`,{type:`range`,min:r,max:i,step:a,value:n,onChange:e=>o(parseFloat(e.target.value)),onPointerDown:c,onPointerUp:l,onPointerCancel:l,onBlur:l,className:s})]}),$t=(e,t,n,r)=>Number.isFinite(e)?Math.min(n,Math.max(t,e)):r,en=e=>{let t=e.trim().replace(/^#/,``);return/^[0-9a-fA-F]{6}$/.test(t)?`#${t.toLowerCase()}`:null},tn=({t:e,isDaylight:t,theme:n,controlCardBg:r,rangeInputClass:i,tuning:a=E,onTuningChange:o,monetBackgroundImage:c,onUploadMonetBackgroundImage:l,onClearMonetBackgroundImage:u,isLoadingMonetBackgroundImage:d=!1,onSliderPointerDown:p,onSliderCommit:m})=>{let h=(0,k.useRef)(null),[g,_]=(0,k.useState)(null),v={backgroundSource:a.backgroundSource??E.backgroundSource,backgroundLayout:a.backgroundLayout??E.backgroundLayout,backgroundBlurPx:$t(a.backgroundBlurPx??E.backgroundBlurPx,0,60,E.backgroundBlurPx),backgroundOverlayOpacity:$t(a.backgroundOverlayOpacity??E.backgroundOverlayOpacity,0,1,E.backgroundOverlayOpacity),backgroundGrayscale:$t(a.backgroundGrayscale??E.backgroundGrayscale,0,1,E.backgroundGrayscale),backgroundSaturation:$t(a.backgroundSaturation??E.backgroundSaturation,0,2,E.backgroundSaturation),backgroundWash:$t(a.backgroundWash??E.backgroundWash,0,1,E.backgroundWash),backgroundHalfPaneOffsetX:$t(a.backgroundHalfPaneOffsetX??E.backgroundHalfPaneOffsetX,-40,40,E.backgroundHalfPaneOffsetX),backgroundWashColorMode:a.backgroundWashColorMode??E.backgroundWashColorMode,backgroundWashCustomColor:en(a.backgroundWashCustomColor)??E.backgroundWashCustomColor,backgroundDriftEnabled:a.backgroundDriftEnabled??E.backgroundDriftEnabled,backgroundDriftStrength:$t(a.backgroundDriftStrength??E.backgroundDriftStrength,0,1,E.backgroundDriftStrength),backgroundStreaksEnabled:a.backgroundStreaksEnabled??E.backgroundStreaksEnabled},y=(0,k.useMemo)(()=>[{value:`cover-derived`,label:e(`options.monetBackgroundSourceCover`)},{value:`uploaded-global`,label:e(`options.monetBackgroundSourceUploaded`),disabled:!c&&!d}],[d,c,e]),b=(0,k.useMemo)(()=>[{value:`half-pane-gradient`,label:e(`options.monetLayoutHalfPane`)},{value:`full-overlay`,label:e(`options.monetLayoutFullOverlay`)}],[e]),x=(0,k.useMemo)(()=>[{value:`theme`,label:e(`options.monetBackgroundWashTheme`)},{value:`custom`,label:e(`options.monetBackgroundWashCustom`)}],[e]),S=async t=>{let n=Array.from(t.target.files??[]);if(t.target.value=``,_(null),!n.length||!l)return;let r=await l(n);r.ok?(o?.({backgroundSource:`uploaded-global`}),_(n[0].name)):_(r.error||e(`options.monetUploadBackground`))};return(0,A.jsxs)(`div`,{className:`rounded-[24px] border p-4 space-y-4`,style:{backgroundColor:r,borderColor:D(n.secondaryColor,.16)},children:[(0,A.jsxs)(`div`,{className:`space-y-1`,children:[(0,A.jsx)(`div`,{className:`text-sm font-medium`,style:{color:n.primaryColor},children:e(`options.monetBackgroundSettings`)}),(0,A.jsx)(`div`,{className:`text-xs opacity-70`,style:{color:n.secondaryColor},children:e(`options.monetBackgroundSettingsDesc`)})]}),(0,A.jsxs)(`div`,{className:`space-y-3.5 rounded-[18px] border border-white/5 p-3.5 bg-black/5 dark:bg-white/5`,children:[(0,A.jsx)(`div`,{className:`text-xs font-semibold uppercase tracking-wider opacity-65`,style:{color:n.accentColor},children:e(`options.monetGroupBackgroundSource`)}),(0,A.jsx)(Zt,{label:e(`options.monetBackgroundSource`),value:v.backgroundSource,options:y,onChange:e=>o?.({backgroundSource:e}),isDaylight:t,theme:n}),(0,A.jsxs)(`div`,{className:`space-y-2.5`,children:[(0,A.jsx)(Xt,{theme:n,children:e(`options.monetUploadBackground`)}),(0,A.jsxs)(`div`,{className:`flex flex-wrap items-center gap-2`,children:[(0,A.jsxs)(`button`,{type:`button`,onClick:()=>h.current?.click(),disabled:d||!l,className:`inline-flex items-center gap-2 rounded-full border px-3 py-2 text-sm transition-all disabled:cursor-not-allowed disabled:opacity-45`,style:{color:n.primaryColor,borderColor:D(n.secondaryColor,t?.18:.14),backgroundColor:D(n.backgroundColor,t?.24:.34)},children:[(0,A.jsx)(f,{size:15}),(0,A.jsx)(`span`,{children:e(`options.monetUploadBackground`)})]}),(0,A.jsxs)(`button`,{type:`button`,onClick:()=>void u?.(),disabled:!c||!u,className:`inline-flex items-center gap-2 rounded-full border px-3 py-2 text-sm transition-all disabled:cursor-not-allowed disabled:opacity-45`,style:{color:n.primaryColor,borderColor:D(n.secondaryColor,t?.18:.14),backgroundColor:D(n.backgroundColor,t?.24:.34)},children:[(0,A.jsx)(s,{size:15}),(0,A.jsx)(`span`,{children:e(`options.monetClearBackground`)})]})]}),(0,A.jsx)(`div`,{className:`text-xs opacity-60`,style:{color:`var(--text-secondary)`},children:g||c?.name||`-`}),(0,A.jsx)(`input`,{ref:h,type:`file`,accept:`.png,.jpg,.jpeg,.gif,.webp,.svg,image/*`,className:`hidden`,onChange:e=>void S(e)})]})]}),(0,A.jsxs)(`div`,{className:`space-y-3.5 rounded-[18px] border border-white/5 p-3.5 bg-black/5 dark:bg-white/5`,children:[(0,A.jsx)(`div`,{className:`text-xs font-semibold uppercase tracking-wider opacity-65`,style:{color:n.accentColor},children:e(`options.monetGroupLayoutPosition`)}),(0,A.jsx)(Zt,{label:e(`options.monetBackgroundLayout`),value:v.backgroundLayout,options:b,onChange:e=>o?.({backgroundLayout:e}),isDaylight:t,theme:n}),v.backgroundLayout===`half-pane-gradient`&&(0,A.jsx)(Qt,{label:e(`options.monetHalfPaneOffsetX`),valueLabel:`${Math.round(v.backgroundHalfPaneOffsetX)}%`,min:-40,max:40,step:2,value:v.backgroundHalfPaneOffsetX,onChange:e=>o?.({backgroundHalfPaneOffsetX:e}),rangeInputClass:i,onSliderPointerDown:p,onSliderCommit:m}),(0,A.jsx)(j,{label:e(`options.monetBackgroundDriftEnabled`),description:e(`options.monetBackgroundDriftEnabledDesc`),checked:v.backgroundDriftEnabled,onChange:e=>o?.({backgroundDriftEnabled:e}),theme:n}),v.backgroundDriftEnabled&&(0,A.jsx)(Qt,{label:e(`options.monetBackgroundDriftStrength`),valueLabel:`${Math.round(v.backgroundDriftStrength*100)}%`,min:0,max:1,step:.05,value:v.backgroundDriftStrength,onChange:e=>o?.({backgroundDriftStrength:e}),rangeInputClass:i,onSliderPointerDown:p,onSliderCommit:m})]}),(0,A.jsxs)(`div`,{className:`space-y-3.5 rounded-[18px] border border-white/5 p-3.5 bg-black/5 dark:bg-white/5`,children:[(0,A.jsx)(`div`,{className:`text-xs font-semibold uppercase tracking-wider opacity-65`,style:{color:n.accentColor},children:e(`options.monetGroupFiltersPostProcessing`)}),(0,A.jsx)(Qt,{label:e(`options.monetBackgroundBlur`),valueLabel:`${Math.round(v.backgroundBlurPx)}px`,min:0,max:60,step:2,value:v.backgroundBlurPx,onChange:e=>o?.({backgroundBlurPx:e}),rangeInputClass:i,onSliderPointerDown:p,onSliderCommit:m}),(0,A.jsx)(Qt,{label:e(`options.monetBackgroundSaturation`),valueLabel:`${Math.round(v.backgroundSaturation*100)}%`,min:0,max:2,step:.05,value:v.backgroundSaturation,onChange:e=>o?.({backgroundSaturation:e}),rangeInputClass:i,onSliderPointerDown:p,onSliderCommit:m}),(0,A.jsx)(Qt,{label:e(`options.monetBackgroundGrayscale`),valueLabel:`${Math.round(v.backgroundGrayscale*100)}%`,min:0,max:1,step:.02,value:v.backgroundGrayscale,onChange:e=>o?.({backgroundGrayscale:e}),rangeInputClass:i,onSliderPointerDown:p,onSliderCommit:m})]}),(0,A.jsxs)(`div`,{className:`space-y-3.5 rounded-[18px] border border-white/5 p-3.5 bg-black/5 dark:bg-white/5`,children:[(0,A.jsx)(`div`,{className:`text-xs font-semibold uppercase tracking-wider opacity-65`,style:{color:n.accentColor},children:e(`options.monetGroupColorTintWash`)}),(0,A.jsx)(Qt,{label:e(`options.monetBackgroundOverlayOpacity`),valueLabel:`${Math.round(v.backgroundOverlayOpacity*100)}%`,min:0,max:1,step:.02,value:v.backgroundOverlayOpacity,onChange:e=>o?.({backgroundOverlayOpacity:e}),rangeInputClass:i,onSliderPointerDown:p,onSliderCommit:m}),(0,A.jsx)(Qt,{label:e(`options.monetBackgroundWash`),valueLabel:`${Math.round(v.backgroundWash*100)}%`,min:0,max:1,step:.02,value:v.backgroundWash,onChange:e=>o?.({backgroundWash:e}),rangeInputClass:i,onSliderPointerDown:p,onSliderCommit:m}),(0,A.jsx)(j,{label:e(`options.monetBackgroundStreaksEnabled`),description:e(`options.monetBackgroundStreaksEnabledDesc`),checked:v.backgroundStreaksEnabled,onChange:e=>o?.({backgroundStreaksEnabled:e}),theme:n}),(0,A.jsx)(Zt,{label:e(`options.monetBackgroundWashColorMode`),value:v.backgroundWashColorMode,options:x,onChange:e=>o?.({backgroundWashColorMode:e}),isDaylight:t,theme:n}),v.backgroundWashColorMode===`custom`&&(0,A.jsxs)(`div`,{className:`space-y-3 rounded-[20px] border p-3`,style:{borderColor:D(n.secondaryColor,.14),backgroundColor:D(n.backgroundColor,.2)},children:[(0,A.jsxs)(`div`,{className:`flex items-center justify-between gap-3`,children:[(0,A.jsx)(`div`,{className:`text-sm`,style:{color:n.primaryColor},children:e(`options.monetBackgroundWashCustomColor`)}),(0,A.jsx)(`div`,{className:`rounded-full px-3 py-1 text-xs font-mono`,style:{color:n.backgroundColor,backgroundColor:v.backgroundWashCustomColor},children:v.backgroundWashCustomColor.toUpperCase()})]}),(0,A.jsx)(ue,{color:v.backgroundWashCustomColor,onChange:e=>o?.({backgroundWashCustomColor:e}),style:{width:`100%`,height:180}})]})]})]})},nn=1920,rn=1080,an=new Map,on={r:10,g:10,b:12},sn={r:245,g:245,b:245},W=(e,t,n)=>Math.min(n,Math.max(t,e)),G=(e,t,n)=>e+(t-e)*n,cn=(e,t,n)=>.2126*e+.7152*t+.0722*n,ln=(e,t)=>cn(e.r,e.g,e.b)<=cn(t.r,t.g,t.b)?{shadow:e,highlight:t}:{shadow:t,highlight:e},un=({coverUrl:e,monetBackgroundImage:t,tuning:n})=>n.backgroundSource===`uploaded-global`?t?.url??e??null:e??t?.url??null,dn=async e=>{let t=new Image;(e.startsWith(`http://`)||e.startsWith(`https://`))&&(t.crossOrigin=`anonymous`),t.decoding=`async`;let n=new Promise((n,r)=>{t.onload=()=>n(),t.onerror=()=>r(Error(`Failed to load image: ${e}`))});t.src=e;try{await t.decode()}catch{await n}return t},fn=(e,t,n)=>{let r=e[t];return typeof r==`number`&&Number.isFinite(r)?r:n},pn=(e,t,n,r)=>{let i=fn(t,`width`,n),a=fn(t,`height`,r);if(!i||!a)return;let o=Math.max(n/i,r/a),s=i*o,c=a*o,l=(n-s)/2,u=(r-c)/2;e.drawImage(t,l,u,s,c)},mn=(e,t)=>{let n=te(e);return n?{r:W(n.r,0,255),g:W(n.g,0,255),b:W(n.b,0,255)}:t},hn=(e,t,n,r)=>{let{shadow:i,highlight:a}=ln(t,r);if(e<=.55){let t=e/.55;return{r:G(i.r,n.r,t),g:G(i.g,n.g,t),b:G(i.b,n.b,t)}}let o=(e-.55)/.45;return{r:G(n.r,a.r,o),g:G(n.g,a.g,o),b:G(n.b,a.b,o)}},gn=(e,t,n,r,i)=>{let a=W(i.backgroundGrayscale,0,1),o=W(i.backgroundSaturation,0,2),s=W(i.backgroundWash,0,1);if(a<=0&&Math.abs(o-1)<.001&&s<=0)return;let c=e.getImageData(0,0,t,n),l=c.data,u=mn(r.backgroundColor,on),d=mn(r.accentColor,u),f=mn(r.primaryColor,sn),p=mn(i.backgroundWashCustomColor,d),m=i.backgroundWashColorMode===`custom`?p:d;for(let e=0;e<l.length;e+=4){let t=l[e],n=l[e+1],r=l[e+2];if(l[e+3]===0)continue;let i=cn(t,n,r);if(a>0&&(t=G(t,i,a),n=G(n,i,a),r=G(r,i,a)),Math.abs(o-1)>=.001){let e=cn(t,n,r);t=e+(t-e)*o,n=e+(n-e)*o,r=e+(r-e)*o}if(s>0){let e=hn(W(i/255,0,1),u,m,f);t=G(t,e.r,s),n=G(n,e.g,s),r=G(r,e.b,s)}l[e]=Math.round(W(t,0,255)),l[e+1]=Math.round(W(n,0,255)),l[e+2]=Math.round(W(r,0,255))}e.putImageData(c,0,0)},_n=(e,t,n,r,i)=>{let a=W(i.backgroundOverlayOpacity,0,1),o=e.createLinearGradient(0,0,t,n);o.addColorStop(0,D(r.accentColor,.08+a*.62)),o.addColorStop(.44,D(r.backgroundColor,.16+a*.58)),o.addColorStop(1,D(r.primaryColor,.06+a*.36)),e.fillStyle=o,e.fillRect(0,0,t,n);let s=e.createRadialGradient(t*.18,n*.34,0,t*.18,n*.34,t*.55);s.addColorStop(0,D(r.accentColor,a*.42)),s.addColorStop(1,D(r.backgroundColor,0)),e.fillStyle=s,e.fillRect(0,0,t,n);let c=e.createLinearGradient(t*.45,0,t,0);if(c.addColorStop(0,D(r.backgroundColor,0)),c.addColorStop(1,D(r.backgroundColor,.18+a*.38)),e.fillStyle=c,e.fillRect(0,0,t,n),i.backgroundStreaksEnabled!==!1){e.fillStyle=D(r.backgroundColor,.1+a*.08);for(let r=0;r<18;r+=1){let i=r*127%t,a=r*211%n-40;e.fillRect(i,a,1,n*.28)}}},vn=({coverUrl:e,monetBackgroundImage:t,theme:n,tuning:r})=>JSON.stringify({sourceUrl:un({coverUrl:e,monetBackgroundImage:t,tuning:r}),uploadedId:r.backgroundSource===`uploaded-global`?t?.id??null:null,theme:{backgroundColor:n.backgroundColor,primaryColor:n.primaryColor,accentColor:n.accentColor},tuning:{backgroundSource:r.backgroundSource,backgroundBlurPx:r.backgroundBlurPx,backgroundOverlayOpacity:r.backgroundOverlayOpacity,backgroundGrayscale:r.backgroundGrayscale,backgroundSaturation:r.backgroundSaturation,backgroundWash:r.backgroundWash,backgroundWashColorMode:r.backgroundWashColorMode,backgroundWashCustomColor:r.backgroundWashCustomColor,backgroundStreaksEnabled:r.backgroundStreaksEnabled}}),yn=null,bn=()=>{if(yn!==null)return yn;if(typeof document>`u`)return!1;try{let e=document.createElement(`canvas`);e.width=2,e.height=2;let t=e.getContext(`2d`);return!t||typeof t.filter!=`string`?(yn=!1,!1):(t.fillStyle=`#000000`,t.fillRect(0,0,2,2),t.filter=`blur(1px)`,t.fillStyle=`#ffffff`,t.fillRect(0,0,1,1),yn=t.getImageData(1,1,1,1).data[0]>0,yn)}catch{return yn=!1,!1}},xn=async({coverUrl:e,monetBackgroundImage:t,theme:n,tuning:r})=>{let i=un({coverUrl:e,monetBackgroundImage:t,tuning:r});if(!i)return null;let a=await dn(i),o=document.createElement(`canvas`);o.width=nn,o.height=rn;let s=o.getContext(`2d`);return s?(s.fillStyle=n.backgroundColor,s.fillRect(0,0,o.width,o.height),s.save(),bn()&&(s.filter=`blur(${W(r.backgroundBlurPx,0,60)}px)`),pn(s,a,o.width,o.height),s.restore(),gn(s,o.width,o.height,n,r),_n(s,o.width,o.height,n,r),o.toDataURL(`image/jpeg`,.92)):null},Sn=e=>{let t=vn(e),n=an.get(t);if(n)return n;let r=xn(e).catch(()=>null);return an.set(t,r),r},Cn=240,wn=76,Tn=156,En=3.4,Dn=.035,On=.01,kn=12.9898,An=78.233,jn=39.425,Mn=(e,t)=>(e%t+t)%t,Nn=(e,t)=>{let n=Math.sin(e*127.1+t*311.7)*43758.5453;return n-Math.floor(n)},Pn=e=>e*e*(3-2*e),Fn=(e,t,n)=>{let r=Math.floor(e),i=Nn(Mn(r,t),n);return i+(Nn(Mn(r+1,t),n)-i)*Pn(e-r)},In=(e,t)=>{let n=Fn(e,wn,t),r=Fn(e*2,152,t+17.31);return(n*.68+r*.32)*2-1},Ln=e=>{let t=e.reduce((e,t)=>Math.max(e,Math.abs(t)),0);return t>0?e.map(e=>e/t):e},Rn=e=>{let t=Math.min(1,Math.max(0,e)),n=En*t,r=1+n/100*2+On,i=Dn*t,a=[],o=[],s=[];for(let e=0;e<=Tn;e+=1){let t=wn*e/Tn;a.push(In(t,kn)),o.push(In(t,An)),s.push(In(t,jn))}let c=Ln(a),l=Ln(o),u=Ln(s);return{keyframes:c.map((e,t)=>({transform:`translate3d(${(e*n).toFixed(4)}%, ${(l[t]*n).toFixed(4)}%, 0) scale(${(r+i*((u[t]+1)/2)).toFixed(5)})`})),durationMs:Cn*1e3,maxTravelPercent:n,minScale:r}},zn=180,Bn=(e,t,n)=>Math.min(n,Math.max(t,e)),Vn=(e,t,n,r)=>{(0,k.useEffect)(()=>{let i=e.current;if(!i||!t||n<=0||typeof i.animate!=`function`||r)return;let a=Rn(n),o=i.animate(a.keyframes,{duration:a.durationMs,iterations:1/0,easing:`linear`});return()=>o.cancel()},[t,e,n,r])},Hn=(e,t,n)=>n.backgroundSource===`uploaded-global`?t?.url??e??null:e??t?.url??null,Un=({coverUrl:e,monetBackgroundImage:t,theme:n,isDaylight:r=!1,tuning:i=E,transparentBackground:a=!1,staticMode:o=!1})=>{let[s,c]=(0,k.useState)(null),l=Hn(e,t,i),u=(0,k.useMemo)(()=>`linear-gradient(135deg, ${D(n.accentColor,.22)}, ${D(n.backgroundColor,.96)} 50%, ${D(n.primaryColor,.18)})`,[n]),d=(0,k.useMemo)(()=>`linear-gradient(90deg, ${D(n.backgroundColor,.18)} 0%, ${D(n.backgroundColor,.32)} 34%, ${D(n.backgroundColor,.66)} 70%, ${D(n.backgroundColor,.82)} 100%)`,[n]),f=(0,k.useMemo)(()=>vn({coverUrl:e,monetBackgroundImage:t,theme:n,tuning:i}),[e,t,n,i]);(0,k.useEffect)(()=>{let r=!1,o;return!l||a?(c(null),()=>{r=!0}):(o=window.setTimeout(()=>{Sn({coverUrl:e,monetBackgroundImage:t,theme:n,tuning:i}).then(e=>{r||c(t=>t===e?t:e)})},zn),()=>{r=!0,o!==void 0&&window.clearTimeout(o)})},[f,l,a]);let p=(0,k.useRef)(null),m=Bn(i.backgroundDriftStrength??0,0,1),_=!!i.backgroundDriftEnabled&&!o&&m>0;Vn(p,_,m,v(`monetBackground`));let y=(0,k.useMemo)(()=>_?{willChange:`transform`}:void 0,[_]),b=(0,k.useMemo)(()=>bn(),[])?0:i.backgroundBlurPx,x=(0,k.useMemo)(()=>b<=0?{}:{filter:`blur(${b}px)`,WebkitFilter:`blur(${b}px)`,transform:`scale(1.1) translateZ(0)`},[b]);if(a)return null;let S=s?`url(${s})`:l?`linear-gradient(135deg, ${D(n.accentColor,.2)}, ${D(n.backgroundColor,.78)}), url(${l})`:u;if(i.backgroundLayout===`full-overlay`)return(0,A.jsxs)(`div`,{className:`absolute inset-0 z-0 overflow-hidden`,children:[(0,A.jsx)(`div`,{ref:p,className:`absolute inset-0`,style:y,children:(0,A.jsx)(h,{initial:!1,children:(0,A.jsx)(g.div,{initial:{opacity:0},animate:{opacity:1},exit:{opacity:0},transition:{duration:.8,ease:`easeInOut`},className:`absolute inset-0`,style:{backgroundColor:n.backgroundColor,backgroundImage:S,backgroundSize:`cover`,backgroundPosition:`center`,...x}},s||l||`fallback`)})}),(0,A.jsx)(`div`,{className:`absolute inset-0`,style:{background:d}})]});let C=(r?.7:.3)+Bn(i.backgroundOverlayOpacity,0,1)*.16,w=Bn(50+i.backgroundHalfPaneOffsetX,10,90);return(0,A.jsxs)(`div`,{className:`absolute inset-0 z-0 overflow-hidden`,children:[(0,A.jsx)(`div`,{className:`absolute inset-0`,style:{backgroundColor:n.backgroundColor,backgroundImage:u}}),(0,A.jsx)(h,{initial:!1,children:s||l?(0,A.jsx)(`div`,{className:`absolute inset-y-0 left-0 w-[72%] sm:w-[68%] lg:w-[60%] overflow-hidden`,style:{WebkitMaskImage:`linear-gradient(90deg, rgba(0,0,0,1) 0%, rgba(0,0,0,0.94) 48%, rgba(0,0,0,0.46) 74%, rgba(0,0,0,0) 100%)`,maskImage:`linear-gradient(90deg, rgba(0,0,0,1) 0%, rgba(0,0,0,0.94) 48%, rgba(0,0,0,0.46) 74%, rgba(0,0,0,0) 100%)`},children:(0,A.jsx)(`div`,{ref:p,className:`absolute inset-0`,style:y,children:(0,A.jsx)(g.div,{initial:{opacity:0},animate:{opacity:C},exit:{opacity:0},transition:{duration:.8,ease:`easeInOut`},className:`absolute inset-0`,style:{backgroundImage:S,backgroundRepeat:`no-repeat`,backgroundSize:`cover`,backgroundPosition:`${w}% center`,...x}},s||l||`fallback`)})}):null}),(0,A.jsx)(`div`,{className:`absolute inset-0`,style:{background:`linear-gradient(90deg, ${D(n.backgroundColor,.14)} 0%, ${D(n.backgroundColor,.28)} 28%, ${D(n.backgroundColor,.62)} 64%, ${D(n.backgroundColor,.86)} 100%)`}}),(0,A.jsx)(`div`,{className:`absolute inset-0`,style:{backgroundImage:`radial-gradient(circle at 18% 34%, ${D(n.accentColor,.18)}, transparent 36%)`,backgroundSize:`cover`,backgroundPosition:`center`}}),(0,A.jsx)(`div`,{className:`absolute inset-0`,style:{background:d}})]})},Wn=e({default:()=>Gn}),Gn=de({mode:`monet`,order:20,labelKey:`options.visualizerBackgroundModeMonet`,labelFallback:`Monet`,render:({config:e,coverUrl:t,theme:n,isDaylight:r,staticMode:i})=>(0,A.jsx)(Un,{coverUrl:t,monetBackgroundImage:e?.customImage,theme:n,isDaylight:r,tuning:e?.monet?.tuning,transparentBackground:e?.transparent,staticMode:i}),renderSettingsPanel:({config:e,actions:t,t:n,isDaylight:r,theme:i,controlCardBg:a,rangeInputClass:o,onSliderPointerDown:s,onSliderCommit:c})=>(0,A.jsx)(tn,{t:n,isDaylight:r,theme:i,controlCardBg:a,rangeInputClass:o,tuning:e?.monet?.tuning??E,onTuningChange:t?.monet?.onTuningChange,monetBackgroundImage:e?.customImage,onUploadMonetBackgroundImage:t?.customImage?.onUpload,onClearMonetBackgroundImage:t?.customImage?.onClear,isLoadingMonetBackgroundImage:t?.customImage?.isLoading,onSliderPointerDown:s,onSliderCommit:c}),renderQuickControls:({config:e,actions:t,t:n,isDaylight:r})=>{let i=(e?.monet?.tuning??E).backgroundLayout===`full-overlay`,a=n(i?`options.monetLayoutFullOverlay`:`options.monetLayoutHalfPane`);return(0,A.jsx)(fe,{isDaylight:r,label:a,title:`${n(`options.monetBackgroundLayout`)}: ${a}`,onClick:()=>t?.monet?.onTuningChange?.({backgroundLayout:i?`half-pane-gradient`:`full-overlay`})})},resetSettings:e=>e?.monet?.onResetTuning?.()}),Kn=1.8,qn=.01,Jn=16/9,Yn={fiberSize:.2,crumples:.35,crumpleSize:.35,folds:.65,foldCount:5,drops:.2,seed:5.8},Xn={perspective:.4,count:20,focusCenter:.55,focusEdges:.8,swirl:.08,lensCircle:.1},Zn=e=>Math.min(1,Math.max(0,e)),Qn=e=>Math.min(Kn,Math.max(1,e)),$n=e=>e<=1?1:Qn(e+qn),er=e=>$n(1/(1-2*Math.min(Math.max(e,0),.45))),tr=(e,t,n)=>n&&!t?!e:e,nr=(e,t,n)=>tr(!e,t,n),rr=(e,t)=>{let{folds:n,crumples:r,drops:i}=Yn;return er(.02*(2*n+1.5*r+.2*i+.75*Zn(e)+.1*Zn(t)))},ir=(e,t)=>{let n=.5*Math.hypot(Jn,1),r=Zn(t),i=.7*r**(1.3+2.7*r)*(1-Xn.focusEdges),a=Math.max(.35,1-i/n);if(e<=0)return $n(1/a);let o=Math.min(e,1)*1.4,s=e=>{let t=2*n/e;return Math.tan(t*o)/Math.tan(o)/t},c=Math.max(1,2*n*o/1.45);if(c>=Kn||s(Kn)>Kn*a)return Kn;if(c===1&&s(1)<=a)return $n(1/a);let l=Kn;for(let e=0;e<32;e+=1){let e=(c+l)/2;s(e)>e*a?c=e:l=e}return $n(l)},ar=k.memo(({coverUrl:e,monetBackgroundImage:t,tuning:n,theme:r,isDaylight:i})=>{let a={...w,...n},o=a.imageSource===`uploaded-global`?t?.url??e:e??t?.url;return o?(0,A.jsxs)(`div`,{className:`absolute inset-0 z-0 overflow-hidden`,style:{backgroundColor:r.backgroundColor,pointerEvents:`none`},children:[(()=>{let e={width:`100%`,height:`100%`,image:o,fit:`cover`,minPixelRatio:1,maxPixelCount:2073600,style:{width:`100%`,height:`100%`}};switch(a.effect){case`fluted-glass`:return(0,A.jsx)(Et,{...e,colorBack:r.backgroundColor,colorShadow:r.secondaryColor,colorHighlight:r.primaryColor,shadows:.25,size:a.flutedGlassSize,distortion:a.flutedGlassDistortion,blur:a.flutedGlassBlur,shape:`lines`,distortionShape:`prism`,highlights:.1,edges:.25},`${o}:fluted-glass`);case`paper-texture`:return(0,A.jsx)(Tt,{...e,...Yn,colorFront:r.accentColor,colorBack:r.backgroundColor,contrast:a.paperTextureContrast,roughness:a.paperTextureRoughness,fiber:a.paperTextureFiber,scale:rr(a.paperTextureRoughness,a.paperTextureFiber)},`${o}:paper-texture`);case`halftone-dots`:return(0,A.jsx)(kt,{...e,colorBack:r.backgroundColor,colorFront:r.accentColor,size:a.halftoneDotsSize,radius:a.halftoneDotsRadius,contrast:a.halftoneDotsContrast,originalColors:a.halftoneDotsOriginalColors,inverted:nr(a.halftoneDotsInverted,a.halftoneDotsOriginalColors,i),grid:`hex`,type:`gooey`,grainMixer:.12,grainOverlay:.06,grainSize:.5},`${o}:halftone-dots`);case`lens-distortion`:return(0,A.jsx)(Ot,{...e,...Xn,spread:a.lensDistortionSpread,dispersion:a.lensDistortionDispersion,lensBulge:a.lensDistortionBulge,scale:ir(a.lensDistortionBulge,a.lensDistortionSpread)},`${o}:lens-distortion`);default:return(0,A.jsx)(Dt,{...e,colorBack:r.backgroundColor,colorFront:r.accentColor,colorHighlight:r.primaryColor,originalColors:a.originalColors,inverted:tr(a.inverted,a.originalColors,i),type:a.ditheringType,size:a.size,colorSteps:a.colorSteps},`${o}:dithering`)}})(),a.overlayEnabled&&a.overlayOpacity>0&&(0,A.jsx)(`div`,{className:`absolute inset-0`,style:{backgroundColor:r.backgroundColor,opacity:a.overlayOpacity}})]}):(0,A.jsx)(`div`,{className:`absolute inset-0 z-0`,style:{backgroundColor:r.backgroundColor}})}),or=e=>e.toFixed(2),K=e=>`${Math.round(e*100)}%`,sr=(e,t)=>({borderColor:D(e.secondaryColor,t?.18:.16),selectedBg:D(e.accentColor,t?.1:.16)}),q=({label:e,value:t,min:n,max:r,step:i,rangeInputClass:a,theme:o,onChange:s,onPointerDown:c,onPointerUp:l,format:u=or})=>(0,A.jsxs)(`label`,{className:`block space-y-2`,children:[(0,A.jsxs)(`span`,{className:`flex justify-between gap-3 text-sm`,style:{color:o.primaryColor},children:[(0,A.jsx)(`span`,{children:e}),(0,A.jsx)(`span`,{className:`font-mono opacity-70`,children:u(t)})]}),(0,A.jsx)(`input`,{type:`range`,min:n,max:r,step:i,value:t,onChange:e=>s(Number(e.target.value)),onPointerDown:c,onPointerUp:l,onPointerCancel:l,className:a})]}),cr=[`2x2`,`4x4`,`8x8`],lr=({t:e,isDaylight:t,theme:n,rangeInputClass:r,tuning:i,onTuningChange:a,onSliderPointerDown:o,onSliderCommit:s})=>{let{borderColor:c,selectedBg:l}=sr(n,t),u={rangeInputClass:r,theme:n,onPointerDown:o,onPointerUp:s};return(0,A.jsxs)(`div`,{className:`space-y-4 rounded-2xl border p-3`,style:{borderColor:c},children:[(0,A.jsx)(`div`,{className:`text-xs font-medium uppercase tracking-[0.2em]`,style:{color:n.secondaryColor},children:e(`options.nomandBackgroundEffectDithering`)}),(0,A.jsxs)(`div`,{className:`space-y-2`,children:[(0,A.jsx)(`div`,{className:`text-sm`,style:{color:n.primaryColor},children:e(`options.nomandBackgroundDitheringType`)}),(0,A.jsx)(`div`,{className:`grid grid-cols-3 gap-2`,children:cr.map(e=>(0,A.jsx)(`button`,{type:`button`,onClick:()=>a?.({ditheringType:e}),className:`rounded-xl border px-2 py-2 text-xs`,style:{borderColor:i.ditheringType===e?n.accentColor:c,backgroundColor:i.ditheringType===e?l:`transparent`,color:n.primaryColor},children:e},e))})]}),(0,A.jsx)(q,{...u,label:e(`options.nomandBackgroundSize`),value:i.size,min:.5,max:20,step:.5,format:e=>e.toFixed(1),onChange:e=>a?.({size:e})}),(0,A.jsx)(q,{...u,label:e(`options.nomandBackgroundColorSteps`),value:i.colorSteps,min:1,max:7,step:1,format:e=>String(Math.round(e)),onChange:e=>a?.({colorSteps:e})}),(0,A.jsx)(j,{label:e(`options.nomandBackgroundOriginalColors`),checked:i.originalColors,onChange:e=>a?.({originalColors:e}),theme:n}),(0,A.jsx)(j,{label:e(`options.nomandBackgroundInverted`),checked:i.inverted,onChange:e=>a?.({inverted:e}),theme:n})]})},ur=({t:e,isDaylight:t,theme:n,rangeInputClass:r,tuning:i,onTuningChange:a,onSliderPointerDown:o,onSliderCommit:s})=>{let{borderColor:c}=sr(n,t),l={rangeInputClass:r,theme:n,onPointerDown:o,onPointerUp:s};return(0,A.jsxs)(`div`,{className:`space-y-4 rounded-2xl border p-3`,style:{borderColor:c},children:[(0,A.jsx)(`div`,{className:`text-xs font-medium uppercase tracking-[0.2em]`,style:{color:n.secondaryColor},children:e(`options.nomandBackgroundEffectFlutedGlass`)}),(0,A.jsx)(q,{...l,label:e(`options.nomandBackgroundFlutedGlassSize`),value:i.flutedGlassSize,min:.1,max:1,step:.05,onChange:e=>a?.({flutedGlassSize:e})}),(0,A.jsx)(q,{...l,label:e(`options.nomandBackgroundFlutedGlassDistortion`),value:i.flutedGlassDistortion,min:0,max:1,step:.05,format:K,onChange:e=>a?.({flutedGlassDistortion:e})}),(0,A.jsx)(q,{...l,label:e(`options.nomandBackgroundFlutedGlassBlur`),value:i.flutedGlassBlur,min:0,max:1,step:.05,format:K,onChange:e=>a?.({flutedGlassBlur:e})})]})},dr=({t:e,isDaylight:t,theme:n,rangeInputClass:r,tuning:i,onTuningChange:a,onSliderPointerDown:o,onSliderCommit:s})=>{let{borderColor:c}=sr(n,t),l={rangeInputClass:r,theme:n,onPointerDown:o,onPointerUp:s};return(0,A.jsxs)(`div`,{className:`space-y-4 rounded-2xl border p-3`,style:{borderColor:c},children:[(0,A.jsx)(`div`,{className:`text-xs font-medium uppercase tracking-[0.2em]`,style:{color:n.secondaryColor},children:e(`options.nomandBackgroundEffectHalftoneDots`)}),(0,A.jsx)(q,{...l,label:e(`options.nomandBackgroundHalftoneDotsSize`),value:i.halftoneDotsSize,min:.1,max:1,step:.05,onChange:e=>a?.({halftoneDotsSize:e})}),(0,A.jsx)(q,{...l,label:e(`options.nomandBackgroundHalftoneDotsRadius`),value:i.halftoneDotsRadius,min:.1,max:2,step:.05,onChange:e=>a?.({halftoneDotsRadius:e})}),(0,A.jsx)(q,{...l,label:e(`options.nomandBackgroundHalftoneDotsContrast`),value:i.halftoneDotsContrast,min:0,max:1,step:.05,format:K,onChange:e=>a?.({halftoneDotsContrast:e})}),(0,A.jsx)(j,{label:e(`options.nomandBackgroundOriginalColors`),checked:i.halftoneDotsOriginalColors,onChange:e=>a?.({halftoneDotsOriginalColors:e}),theme:n}),(0,A.jsx)(j,{label:e(`options.nomandBackgroundInverted`),checked:i.halftoneDotsInverted,onChange:e=>a?.({halftoneDotsInverted:e}),theme:n})]})},fr=({t:e,isDaylight:t,theme:n,rangeInputClass:r,tuning:i,onTuningChange:a,onSliderPointerDown:o,onSliderCommit:s})=>{let{borderColor:c}=sr(n,t),l={rangeInputClass:r,theme:n,onPointerDown:o,onPointerUp:s};return(0,A.jsxs)(`div`,{className:`space-y-4 rounded-2xl border p-3`,style:{borderColor:c},children:[(0,A.jsx)(`div`,{className:`text-xs font-medium uppercase tracking-[0.2em]`,style:{color:n.secondaryColor},children:e(`options.nomandBackgroundEffectLensDistortion`)}),(0,A.jsx)(q,{...l,label:e(`options.nomandBackgroundLensDistortionSpread`),value:i.lensDistortionSpread,min:0,max:1,step:.05,format:K,onChange:e=>a?.({lensDistortionSpread:e})}),(0,A.jsx)(q,{...l,label:e(`options.nomandBackgroundLensDistortionBulge`),value:i.lensDistortionBulge,min:-1,max:1,step:.05,onChange:e=>a?.({lensDistortionBulge:e})}),(0,A.jsx)(q,{...l,label:e(`options.nomandBackgroundLensDistortionDispersion`),value:i.lensDistortionDispersion,min:0,max:1,step:.05,format:K,onChange:e=>a?.({lensDistortionDispersion:e})})]})},pr=({t:e,isDaylight:t,theme:n,rangeInputClass:r,tuning:i,onTuningChange:a,onSliderPointerDown:o,onSliderCommit:s})=>{let{borderColor:c}=sr(n,t),l={rangeInputClass:r,theme:n,onPointerDown:o,onPointerUp:s};return(0,A.jsxs)(`div`,{className:`space-y-4 rounded-2xl border p-3`,style:{borderColor:c},children:[(0,A.jsx)(`div`,{className:`text-xs font-medium uppercase tracking-[0.2em]`,style:{color:n.secondaryColor},children:e(`options.nomandBackgroundEffectPaperTexture`)}),(0,A.jsx)(q,{...l,label:e(`options.nomandBackgroundPaperTextureContrast`),value:i.paperTextureContrast,min:0,max:1,step:.05,format:K,onChange:e=>a?.({paperTextureContrast:e})}),(0,A.jsx)(q,{...l,label:e(`options.nomandBackgroundPaperTextureRoughness`),value:i.paperTextureRoughness,min:0,max:1,step:.05,format:K,onChange:e=>a?.({paperTextureRoughness:e})}),(0,A.jsx)(q,{...l,label:e(`options.nomandBackgroundPaperTextureFiber`),value:i.paperTextureFiber,min:0,max:1,step:.05,format:K,onChange:e=>a?.({paperTextureFiber:e})})]})},mr=[`dithering`,`fluted-glass`,`paper-texture`,`halftone-dots`,`lens-distortion`],hr={dithering:`options.nomandBackgroundEffectDithering`,"fluted-glass":`options.nomandBackgroundEffectFlutedGlass`,"paper-texture":`options.nomandBackgroundEffectPaperTexture`,"halftone-dots":`options.nomandBackgroundEffectHalftoneDots`,"lens-distortion":`options.nomandBackgroundEffectLensDistortion`},gr=e=>{let{t,isDaylight:n,theme:r,tuning:i}=e,{borderColor:a,selectedBg:o}=sr(r,n);return(0,A.jsxs)(`div`,{className:`space-y-4`,children:[(0,A.jsxs)(`div`,{className:`space-y-2`,children:[(0,A.jsx)(`div`,{className:`text-sm`,style:{color:r.primaryColor},children:t(`options.nomandBackgroundEffect`)}),(0,A.jsx)(`div`,{className:`grid grid-cols-2 gap-2 sm:grid-cols-3`,children:mr.map(n=>(0,A.jsx)(`button`,{type:`button`,onClick:()=>e.onTuningChange?.({effect:n}),className:`rounded-xl border px-2 py-2 text-xs`,style:{borderColor:i.effect===n?r.accentColor:a,backgroundColor:i.effect===n?o:`transparent`,color:r.primaryColor},children:t(hr[n])},n))})]}),i.effect===`dithering`&&(0,A.jsx)(lr,{...e}),i.effect===`fluted-glass`&&(0,A.jsx)(ur,{...e}),i.effect===`paper-texture`&&(0,A.jsx)(pr,{...e}),i.effect===`halftone-dots`&&(0,A.jsx)(dr,{...e}),i.effect===`lens-distortion`&&(0,A.jsx)(fr,{...e})]})},_r=({t:e,isDaylight:t,theme:n,controlCardBg:r,rangeInputClass:i,tuning:a,onTuningChange:o,monetBackgroundImage:c,onUploadMonetBackgroundImage:l,onClearMonetBackgroundImage:u,isLoadingMonetBackgroundImage:f=!1,onSliderPointerDown:p,onSliderCommit:m})=>{let h={...w,...a},g=(0,k.useRef)(null),[_,v]=(0,k.useState)(``),y=D(n.secondaryColor,t?.18:.16),b=D(n.accentColor,t?.1:.16),x=e=>{o?.({imageSource:e})},S=async t=>{if(!t.length||!l)return;let n=await l(t);v(n.ok?e(`options.nomandBackgroundUploadSuccess`):n.error??e(`options.nomandBackgroundUploadFailed`)),n.ok&&x(`uploaded-global`)};return(0,A.jsxs)(`div`,{className:`rounded-[24px] border p-4 space-y-4`,style:{backgroundColor:r,borderColor:y},children:[(0,A.jsxs)(`div`,{className:`space-y-1`,children:[(0,A.jsx)(`div`,{className:`text-sm font-medium`,style:{color:n.primaryColor},children:e(`options.nomandBackgroundSettings`)}),(0,A.jsx)(`div`,{className:`text-xs opacity-70`,style:{color:n.secondaryColor},children:e(`options.nomandBackgroundSettingsDesc`)})]}),(0,A.jsxs)(`div`,{className:`space-y-2`,children:[(0,A.jsx)(`div`,{className:`text-sm`,style:{color:n.primaryColor},children:e(`options.nomandBackgroundSource`)}),(0,A.jsx)(`div`,{className:`grid grid-cols-2 gap-2`,children:[[`cover-derived`,e(`options.monetBackgroundSourceCover`)],[`uploaded-global`,e(`options.monetBackgroundSourceUploaded`)]].map(([e,t])=>(0,A.jsx)(`button`,{type:`button`,disabled:e===`uploaded-global`&&!c&&!f,onClick:()=>x(e),className:`rounded-2xl border px-3 py-2 text-sm disabled:opacity-40`,style:{borderColor:h.imageSource===e?n.accentColor:y,backgroundColor:h.imageSource===e?b:`transparent`,color:n.primaryColor},children:t},e))}),(0,A.jsxs)(`div`,{className:`flex flex-wrap gap-2`,children:[(0,A.jsx)(`input`,{ref:g,type:`file`,accept:`image/png,image/jpeg,image/webp,image/gif`,className:`hidden`,onChange:e=>{S(Array.from(e.target.files??[])),e.target.value=``}}),(0,A.jsxs)(`button`,{type:`button`,disabled:f||!l,onClick:()=>g.current?.click(),className:`inline-flex items-center gap-2 rounded-full border px-3 py-2 text-xs disabled:opacity-40`,style:{borderColor:y,color:n.primaryColor},children:[(0,A.jsx)(d,{size:14}),e(`options.monetUploadBackground`)]}),(0,A.jsxs)(`button`,{type:`button`,disabled:!c||!u,onClick:()=>void u?.(),className:`inline-flex items-center gap-2 rounded-full border px-3 py-2 text-xs disabled:opacity-40`,style:{borderColor:y,color:n.secondaryColor},children:[(0,A.jsx)(s,{size:14}),e(`options.monetClearBackground`)]})]}),(0,A.jsx)(`div`,{className:`truncate text-xs opacity-60`,style:{color:n.secondaryColor},children:_||c?.name||`-`})]}),(0,A.jsx)(gr,{t:e,isDaylight:t,theme:n,rangeInputClass:i,tuning:h,onTuningChange:o,onSliderPointerDown:p,onSliderCommit:m}),(0,A.jsxs)(`div`,{className:`space-y-3 rounded-2xl border p-3`,style:{borderColor:y},children:[(0,A.jsx)(j,{label:e(`options.nomandBackgroundOverlay`),description:e(`options.nomandBackgroundOverlayDesc`),checked:h.overlayEnabled,onChange:e=>o?.({overlayEnabled:e}),theme:n}),(0,A.jsxs)(`label`,{className:`block space-y-2 ${h.overlayEnabled?``:`opacity-45`}`,children:[(0,A.jsxs)(`span`,{className:`flex justify-between text-sm`,style:{color:n.primaryColor},children:[(0,A.jsx)(`span`,{children:e(`options.nomandBackgroundOverlayOpacity`)}),(0,A.jsxs)(`span`,{className:`font-mono opacity-70`,children:[Math.round(h.overlayOpacity*100),`%`]})]}),(0,A.jsx)(`input`,{type:`range`,min:`0`,max:`1`,step:`0.05`,value:h.overlayOpacity,disabled:!h.overlayEnabled,onChange:e=>o?.({overlayOpacity:Number(e.target.value)}),onPointerDown:p,onPointerUp:m,className:i})]})]})]})},vr=e({default:()=>yr}),yr=de({mode:`nomand`,order:30,labelKey:`options.visualizerBackgroundModeNomand`,labelFallback:`Nomand`,render:({config:e,coverUrl:t,theme:n,isDaylight:r})=>(0,A.jsx)(ar,{coverUrl:t,monetBackgroundImage:e?.customImage,tuning:e?.nomand?.tuning,theme:n,isDaylight:r}),renderSettingsPanel:({config:e,actions:t,...n})=>(0,A.jsx)(_r,{...n,tuning:e?.nomand?.tuning??w,onTuningChange:t?.nomand?.onTuningChange,monetBackgroundImage:e?.customImage,onUploadMonetBackgroundImage:t?.customImage?.onUpload,onClearMonetBackgroundImage:t?.customImage?.onClear,isLoadingMonetBackgroundImage:t?.customImage?.isLoading}),renderQuickControls:({config:e,actions:t,t:n,theme:r})=>{let i=e?.nomand?.tuning??w;return(0,A.jsx)(pe,{active:i.overlayEnabled,theme:r,label:n(`options.nomandBackgroundOverlay`),onToggle:()=>t?.nomand?.onTuningChange?.({overlayEnabled:!i.overlayEnabled}),children:(0,A.jsx)(o,{size:14})})},resetSettings:e=>e?.nomand?.onResetTuning?.()}),br=5120,xr=5121,Sr=5122,Cr=5123,wr=5124,Tr=5125,Er=5126,Dr=32819,Or=32820,kr=33635,Ar=5131,jr=33640,Mr=35899,Nr=35902,Pr=36269,Fr=34042,Ir={};{let e=Ir;e[br]=Int8Array,e[xr]=Uint8Array,e[Sr]=Int16Array,e[Cr]=Uint16Array,e[wr]=Int32Array,e[Tr]=Uint32Array,e[Er]=Float32Array,e[Dr]=Uint16Array,e[Or]=Uint16Array,e[kr]=Uint16Array,e[Ar]=Uint16Array,e[jr]=Uint32Array,e[Mr]=Uint32Array,e[Nr]=Uint32Array,e[Pr]=Uint32Array,e[Fr]=Uint32Array}function Lr(e){if(e instanceof Int8Array)return br;if(e instanceof Uint8Array||e instanceof Uint8ClampedArray)return xr;if(e instanceof Int16Array)return Sr;if(e instanceof Uint16Array)return Cr;if(e instanceof Int32Array)return wr;if(e instanceof Uint32Array)return Tr;if(e instanceof Float32Array)return Er;throw Error(`unsupported typed array type`)}function Rr(e){if(e===Int8Array)return br;if(e===Uint8Array||e===Uint8ClampedArray)return xr;if(e===Int16Array)return Sr;if(e===Uint16Array)return Cr;if(e===Int32Array)return wr;if(e===Uint32Array)return Tr;if(e===Float32Array)return Er;throw Error(`unsupported typed array type`)}function zr(e){let t=Ir[e];if(!t)throw Error(`unknown gl type`);return t}var Br=typeof SharedArrayBuffer<`u`?function(e){return e&&e.buffer&&(e.buffer instanceof ArrayBuffer||e.buffer instanceof SharedArrayBuffer)}:function(e){return e&&e.buffer&&e.buffer instanceof ArrayBuffer};function Vr(...e){console.error(...e)}function Hr(...e){console.warn(...e)}var Ur=new Map;function Wr(e,t){if(!e||typeof e!=`object`)return!1;let n=Ur.get(t);n||(n=new WeakMap,Ur.set(t,n));let r=n.get(e);if(r===void 0){let i=Object.prototype.toString.call(e);r=i.substring(8,i.length-1)===t,n.set(e,r)}return r}function Gr(e,t){return typeof WebGLBuffer<`u`&&Wr(t,`WebGLBuffer`)}function Kr(e,t){return typeof WebGLTexture<`u`&&Wr(t,`WebGLTexture`)}var qr=35044,Jr=34962,Yr=34963,Xr=34660,Zr=5120,Qr=5121,$r=5122,ei=5123,ti=5124,ni=5125,ri=5126,ii={attribPrefix:``};function ai(e,t,n,r,i){e.bindBuffer(t,n),e.bufferData(t,r,i||qr)}function oi(e,t,n,r){if(Gr(e,t))return t;n||=Jr;let i=e.createBuffer();return ai(e,n,i,t,r),i}function si(e){return e===`indices`}function ci(e){return e===Int8Array||e===Uint8Array}function li(e){return e.length?e:e.data}var ui=/coord|texture/i,di=/color|colour/i;function fi(e,t){let n;if(n=ui.test(e)?2:di.test(e)?4:3,t%n>0)throw Error(`Can not guess numComponents for attribute '${e}'. Tried ${n} but ${t} values is not evenly divisible by ${n}. You should specify it.`);return n}function pi(e,t,n){return e.numComponents||e.size||fi(t,n||li(e).length)}function mi(e,t){if(Br(e))return e;if(Br(e.data))return e.data;Array.isArray(e)&&(e={data:e});let n=e.type?gi(e.type):void 0;return n||=si(t)?Uint16Array:Float32Array,new n(e.data)}function hi(e){return typeof e==`number`?e:e?Rr(e):ri}function gi(e){return typeof e==`number`?zr(e):e||Float32Array}function _i(e,t){return{buffer:t.buffer,numValues:24,type:hi(t.type),arrayType:gi(t.type)}}function vi(e,t){let n=t.data||t,r=gi(t.type),i=n*r.BYTES_PER_ELEMENT,a=e.createBuffer();return e.bindBuffer(Jr,a),e.bufferData(Jr,i,t.drawType||qr),{buffer:a,numValues:n,type:Rr(r),arrayType:r}}function yi(e,t,n){let r=mi(t,n);return{arrayType:r.constructor,buffer:oi(e,r,void 0,t.drawType),type:Lr(r),numValues:0}}function bi(e,t){let n={};return Object.keys(t).forEach(function(r){if(!si(r)){let i=t[r],a=i.attrib||i.name||i.attribName||ii.attribPrefix+r;if(i.value){if(!Array.isArray(i.value)&&!Br(i.value))throw Error(`array.value is not array or typedarray`);n[a]={value:i.value}}else{let t;t=i.buffer&&i.buffer instanceof WebGLBuffer?_i:typeof i==`number`||typeof i.data==`number`?vi:yi;let{buffer:o,type:s,numValues:c,arrayType:l}=t(e,i,r),u=i.normalize===void 0?ci(l):i.normalize,d=pi(i,r,c);n[a]={buffer:o,numComponents:d,type:s,normalize:u,stride:i.stride||0,offset:i.offset||0,divisor:i.divisor===void 0?void 0:i.divisor,drawType:i.drawType}}}}),e.bindBuffer(Jr,null),n}function xi(e,t){return t===Zr||t===Qr?1:t===$r||t===ei?2:t===ti||t===ni||t===ri?4:0}var Si=[`position`,`positions`,`a_position`];function Ci(e,t){let n,r=0;for(;r<Si.length&&(n=Si[r],!(n in t||(n=ii.attribPrefix+n,n in t)));++r);r===Si.length&&(n=Object.keys(t)[0]);let i=t[n];if(!i.buffer)return 1;e.bindBuffer(Jr,i.buffer);let a=e.getBufferParameter(Jr,Xr);e.bindBuffer(Jr,null);let o=a/xi(e,i.type),s=i.numComponents||i.size,c=o/s;if(c%1!=0)throw Error(`numComponents ${s} not correct for length ${length}`);return c}function wi(e,t,n){let r=bi(e,t),i=Object.assign({},n||{});i.attribs=Object.assign({},n?n.attribs:{},r);let a=t.indices;if(a){let t=mi(a,`indices`);i.indices=oi(e,t,Yr),i.numElements=t.length,i.elementType=Lr(t)}else i.numElements||=Ci(e,i.attribs);return i}function Ti(e){return!!e.texStorage2D}var Ei=function(){let e={},t={};function n(n){let r=n.constructor.name;if(!e[r]){for(let e in n)if(typeof n[e]==`number`){let r=t[n[e]];t[n[e]]=r?`${r} | ${e}`:e}e[r]=!0}}return function(e,r){return n(e),t[r]||(typeof r==`number`?`0x${r.toString(16)}`:r)}}();new Uint8Array([128,192,255,255]);var Di=6406,Oi=6407,ki=6408,Ai=6409,ji=6410,Mi=6402,Ni=34041,Pi=33319,Fi=33320,Ii=6403,Li=36244,Ri=36248,zi=36249,Bi={};{let e=Bi;e[Di]={numColorComponents:1},e[Ai]={numColorComponents:1},e[ji]={numColorComponents:2},e[Oi]={numColorComponents:3},e[ki]={numColorComponents:4},e[Ii]={numColorComponents:1},e[Li]={numColorComponents:1},e[Pi]={numColorComponents:2},e[Fi]={numColorComponents:2},e[Oi]={numColorComponents:3},e[Ri]={numColorComponents:3},e[ki]={numColorComponents:4},e[zi]={numColorComponents:4},e[Mi]={numColorComponents:1},e[Ni]={numColorComponents:2}}var Vi=Vr;function Hi(e){return typeof document<`u`&&document.getElementById?document.getElementById(e):null}var Ui=33984,Wi=34962,Gi=34963,Ki=35713,qi=35714,Ji=35632,Yi=35633,Xi=35981,Zi=35718,Qi=35721,$i=35971,ea=35382,ta=35396,na=35398,ra=35392,ia=35395,aa=5126,oa=35664,sa=35665,ca=35666,la=5124,ua=35667,da=35668,fa=35669,pa=35670,ma=35671,ha=35672,ga=35673,_a=35674,va=35675,ya=35676,ba=35678,xa=35680,Sa=35679,Ca=35682,wa=35685,Ta=35686,Ea=35687,Da=35688,Oa=35689,ka=35690,Aa=36289,ja=36292,Ma=36293,Na=5125,Pa=36294,Fa=36295,Ia=36296,La=36298,Ra=36299,za=36300,Ba=36303,Va=36306,Ha=36307,Ua=36308,Wa=36311,Ga=3553,Ka=34067,qa=32879,Ja=35866,J={};function Ya(e,t){return J[t].bindPoint}function Xa(e,t){return function(n){e.uniform1f(t,n)}}function Za(e,t){return function(n){e.uniform1fv(t,n)}}function Qa(e,t){return function(n){e.uniform2fv(t,n)}}function $a(e,t){return function(n){e.uniform3fv(t,n)}}function eo(e,t){return function(n){e.uniform4fv(t,n)}}function to(e,t){return function(n){e.uniform1i(t,n)}}function no(e,t){return function(n){e.uniform1iv(t,n)}}function ro(e,t){return function(n){e.uniform2iv(t,n)}}function io(e,t){return function(n){e.uniform3iv(t,n)}}function ao(e,t){return function(n){e.uniform4iv(t,n)}}function oo(e,t){return function(n){e.uniform1ui(t,n)}}function so(e,t){return function(n){e.uniform1uiv(t,n)}}function co(e,t){return function(n){e.uniform2uiv(t,n)}}function lo(e,t){return function(n){e.uniform3uiv(t,n)}}function uo(e,t){return function(n){e.uniform4uiv(t,n)}}function fo(e,t){return function(n){e.uniformMatrix2fv(t,!1,n)}}function po(e,t){return function(n){e.uniformMatrix3fv(t,!1,n)}}function mo(e,t){return function(n){e.uniformMatrix4fv(t,!1,n)}}function ho(e,t){return function(n){e.uniformMatrix2x3fv(t,!1,n)}}function go(e,t){return function(n){e.uniformMatrix3x2fv(t,!1,n)}}function _o(e,t){return function(n){e.uniformMatrix2x4fv(t,!1,n)}}function vo(e,t){return function(n){e.uniformMatrix4x2fv(t,!1,n)}}function yo(e,t){return function(n){e.uniformMatrix3x4fv(t,!1,n)}}function bo(e,t){return function(n){e.uniformMatrix4x3fv(t,!1,n)}}function Y(e,t,n,r){let i=Ya(e,t);return Ti(e)?function(t){let a,o;!t||Kr(e,t)?(a=t,o=null):(a=t.texture,o=t.sampler),e.uniform1i(r,n),e.activeTexture(Ui+n),e.bindTexture(i,a),e.bindSampler(n,o)}:function(t){e.uniform1i(r,n),e.activeTexture(Ui+n),e.bindTexture(i,t)}}function X(e,t,n,r,i){let a=Ya(e,t),o=new Int32Array(i);for(let e=0;e<i;++e)o[e]=n+e;return Ti(e)?function(t){e.uniform1iv(r,o),t.forEach(function(t,r){e.activeTexture(Ui+o[r]);let i,s;!t||Kr(e,t)?(i=t,s=null):(i=t.texture,s=t.sampler),e.bindSampler(n,s),e.bindTexture(a,i)})}:function(t){e.uniform1iv(r,o),t.forEach(function(t,n){e.activeTexture(Ui+o[n]),e.bindTexture(a,t)})}}J[aa]={Type:Float32Array,size:4,setter:Xa,arraySetter:Za},J[oa]={Type:Float32Array,size:8,setter:Qa,cols:2},J[sa]={Type:Float32Array,size:12,setter:$a,cols:3},J[ca]={Type:Float32Array,size:16,setter:eo,cols:4},J[la]={Type:Int32Array,size:4,setter:to,arraySetter:no},J[ua]={Type:Int32Array,size:8,setter:ro,cols:2},J[da]={Type:Int32Array,size:12,setter:io,cols:3},J[fa]={Type:Int32Array,size:16,setter:ao,cols:4},J[Na]={Type:Uint32Array,size:4,setter:oo,arraySetter:so},J[Pa]={Type:Uint32Array,size:8,setter:co,cols:2},J[Fa]={Type:Uint32Array,size:12,setter:lo,cols:3},J[Ia]={Type:Uint32Array,size:16,setter:uo,cols:4},J[pa]={Type:Uint32Array,size:4,setter:to,arraySetter:no},J[ma]={Type:Uint32Array,size:8,setter:ro,cols:2},J[ha]={Type:Uint32Array,size:12,setter:io,cols:3},J[ga]={Type:Uint32Array,size:16,setter:ao,cols:4},J[_a]={Type:Float32Array,size:32,setter:fo,rows:2,cols:2},J[va]={Type:Float32Array,size:48,setter:po,rows:3,cols:3},J[ya]={Type:Float32Array,size:64,setter:mo,rows:4,cols:4},J[wa]={Type:Float32Array,size:32,setter:ho,rows:2,cols:3},J[Ta]={Type:Float32Array,size:32,setter:_o,rows:2,cols:4},J[Ea]={Type:Float32Array,size:48,setter:go,rows:3,cols:2},J[Da]={Type:Float32Array,size:48,setter:yo,rows:3,cols:4},J[Oa]={Type:Float32Array,size:64,setter:vo,rows:4,cols:2},J[ka]={Type:Float32Array,size:64,setter:bo,rows:4,cols:3},J[ba]={Type:null,size:0,setter:Y,arraySetter:X,bindPoint:Ga},J[xa]={Type:null,size:0,setter:Y,arraySetter:X,bindPoint:Ka},J[Sa]={Type:null,size:0,setter:Y,arraySetter:X,bindPoint:qa},J[Ca]={Type:null,size:0,setter:Y,arraySetter:X,bindPoint:Ga},J[Aa]={Type:null,size:0,setter:Y,arraySetter:X,bindPoint:Ja},J[ja]={Type:null,size:0,setter:Y,arraySetter:X,bindPoint:Ja},J[Ma]={Type:null,size:0,setter:Y,arraySetter:X,bindPoint:Ka},J[La]={Type:null,size:0,setter:Y,arraySetter:X,bindPoint:Ga},J[Ra]={Type:null,size:0,setter:Y,arraySetter:X,bindPoint:qa},J[za]={Type:null,size:0,setter:Y,arraySetter:X,bindPoint:Ka},J[Ba]={Type:null,size:0,setter:Y,arraySetter:X,bindPoint:Ja},J[Va]={Type:null,size:0,setter:Y,arraySetter:X,bindPoint:Ga},J[Ha]={Type:null,size:0,setter:Y,arraySetter:X,bindPoint:qa},J[Ua]={Type:null,size:0,setter:Y,arraySetter:X,bindPoint:Ka},J[Wa]={Type:null,size:0,setter:Y,arraySetter:X,bindPoint:Ja};function xo(e,t){return function(n){if(n.value)switch(e.disableVertexAttribArray(t),n.value.length){case 4:e.vertexAttrib4fv(t,n.value);break;case 3:e.vertexAttrib3fv(t,n.value);break;case 2:e.vertexAttrib2fv(t,n.value);break;case 1:e.vertexAttrib1fv(t,n.value);break;default:throw Error(`the length of a float constant value must be between 1 and 4!`)}else e.bindBuffer(Wi,n.buffer),e.enableVertexAttribArray(t),e.vertexAttribPointer(t,n.numComponents||n.size,n.type||aa,n.normalize||!1,n.stride||0,n.offset||0),e.vertexAttribDivisor&&e.vertexAttribDivisor(t,n.divisor||0)}}function Z(e,t){return function(n){if(n.value){if(e.disableVertexAttribArray(t),n.value.length===4)e.vertexAttrib4iv(t,n.value);else throw Error(`The length of an integer constant value must be 4!`)}else e.bindBuffer(Wi,n.buffer),e.enableVertexAttribArray(t),e.vertexAttribIPointer(t,n.numComponents||n.size,n.type||la,n.stride||0,n.offset||0),e.vertexAttribDivisor&&e.vertexAttribDivisor(t,n.divisor||0)}}function So(e,t){return function(n){if(n.value){if(e.disableVertexAttribArray(t),n.value.length===4)e.vertexAttrib4uiv(t,n.value);else throw Error(`The length of an unsigned integer constant value must be 4!`)}else e.bindBuffer(Wi,n.buffer),e.enableVertexAttribArray(t),e.vertexAttribIPointer(t,n.numComponents||n.size,n.type||Na,n.stride||0,n.offset||0),e.vertexAttribDivisor&&e.vertexAttribDivisor(t,n.divisor||0)}}function Co(e,t,n){let r=n.size,i=n.count;return function(n){e.bindBuffer(Wi,n.buffer);let a=n.size||n.numComponents||r,o=a/i,s=n.type||aa,c=J[s].size*a,l=n.normalize||!1,u=n.offset||0,d=c/i;for(let r=0;r<i;++r)e.enableVertexAttribArray(t+r),e.vertexAttribPointer(t+r,o,s,l,c,u+d*r),e.vertexAttribDivisor&&e.vertexAttribDivisor(t+r,n.divisor||0)}}var Q={};Q[aa]={size:4,setter:xo},Q[oa]={size:8,setter:xo},Q[sa]={size:12,setter:xo},Q[ca]={size:16,setter:xo},Q[la]={size:4,setter:Z},Q[ua]={size:8,setter:Z},Q[da]={size:12,setter:Z},Q[fa]={size:16,setter:Z},Q[Na]={size:4,setter:So},Q[Pa]={size:8,setter:So},Q[Fa]={size:12,setter:So},Q[Ia]={size:16,setter:So},Q[pa]={size:4,setter:Z},Q[ma]={size:8,setter:Z},Q[ha]={size:12,setter:Z},Q[ga]={size:16,setter:Z},Q[_a]={size:4,setter:Co,count:2},Q[va]={size:9,setter:Co,count:3},Q[ya]={size:16,setter:Co,count:4};var wo=/ERROR:\s*\d+:(\d+)/gi;function To(e,t=``,n=0){let r=[...t.matchAll(wo)],i=new Map(r.map((e,n)=>{let i=parseInt(e[1]),a=r[n+1],o=a?a.index:t.length,s=t.substring(e.index,o);return[i-1,s]}));return e.split(`
`).map((e,t)=>{let r=i.get(t);return`${t+1+n}: ${e}${r?`\n\n^^^ ${r}`:``}`}).join(`
`)}var Eo=/^[ \t]*\n/;function Do(e){let t=0;return Eo.test(e)&&(t=1,e=e.replace(Eo,``)),{lineOffset:t,shaderSource:e}}function Oo(e,t){return e.errorCallback(t),e.callback&&setTimeout(()=>{e.callback(`${t}\n${e.errors.join(`
`)}`)}),null}function ko(e,t,n,r){if(r||=Vi,!e.getShaderParameter(n,Ki)){let i=e.getShaderInfoLog(n),{lineOffset:a,shaderSource:o}=Do(e.getShaderSource(n)),s=`${To(o,i,a)}\nError compiling ${Ei(e,t)}: ${i}`;return r(s),s}return``}function Ao(e,t,n){let r,i,a;if(typeof t==`function`&&(n=t,t=void 0),typeof e==`function`)n=e,e=void 0;else if(e&&!Array.isArray(e)){let t=e;n=t.errorCallback,e=t.attribLocations,r=t.transformFeedbackVaryings,i=t.transformFeedbackMode,a=t.callback}let o=n||Vi,s=[],c={errorCallback(e,...t){s.push(e),o(e,...t)},transformFeedbackVaryings:r,transformFeedbackMode:i,callback:a,errors:s};{let n={};Array.isArray(e)?e.forEach(function(e,r){n[e]=t?t[r]:r}):n=e||{},c.attribLocations=n}return c}var jo=[`VERTEX_SHADER`,`FRAGMENT_SHADER`];function Mo(e,t){if(t.indexOf(`frag`)>=0)return Ji;if(t.indexOf(`vert`)>=0)return Yi}function No(e,t,n){let r=e.getAttachedShaders(t);for(let t of r)n.has(t)||e.deleteShader(t);e.deleteProgram(t)}var Po=(e=0)=>new Promise(t=>setTimeout(t,e));function Fo(e,t,n){let r=e.createProgram(),{attribLocations:i,transformFeedbackVaryings:a,transformFeedbackMode:o}=Ao(n);for(let n=0;n<t.length;++n){let i=t[n];if(typeof i==`string`){let t=Hi(i),r=t?t.text:i,a=e[jo[n]];t&&t.type&&(a=Mo(e,t.type)||a),i=e.createShader(a),e.shaderSource(i,Do(r).shaderSource),e.compileShader(i)}e.attachShader(r,i)}Object.entries(i).forEach(([t,n])=>e.bindAttribLocation(r,n,t));{let t=a;t&&(t.attribs&&(t=t.attribs),Array.isArray(t)||(t=Object.keys(t)),e.transformFeedbackVaryings(r,t,o||Xi))}return e.linkProgram(r),r}function Io(e,t,n,r,i){let a=Ao(n,r,i),o=new Set(t),s=Fo(e,t,a);function c(e,t){let n=Ro(e,t,a.errorCallback);return n&&No(e,t,o),n}if(a.callback)Lo(e,s).then(()=>{let t=c(e,s);a.callback(t,t?void 0:s)});else return c(e,s)?void 0:s}async function Lo(e,t){let n=e.getExtension(`KHR_parallel_shader_compile`),r=n?(e,t)=>e.getProgramParameter(t,n.COMPLETION_STATUS_KHR):()=>!0,i=0;do await Po(i),i=1e3/60;while(!r(e,t))}function Ro(e,t,n){if(n||=Vi,!e.getProgramParameter(t,qi)){let r=e.getProgramInfoLog(t);return n(`Error in program linking: ${r}`),`${r}\n${e.getAttachedShaders(t).map(t=>ko(e,e.getShaderParameter(t,e.SHADER_TYPE),t,n)).filter(e=>e).join(`
`)}`}}function zo(e,t,n,r,i){return Io(e,t,n,r,i)}function Bo(e){let t=e.name;return t.startsWith(`gl_`)||t.startsWith(`webgl_`)}var Vo=/(\.|\[|]|\w+)/g,Ho=e=>e>=`0`&&e<=`9`;function Uo(e,t,n,r){let i=e.split(Vo).filter(e=>e!==``),a=0,o=``;for(;;){let e=i[a++];o+=e;let s=Ho(e[0]),c=s?parseInt(e):e;if(s&&(o+=i[a++]),a===i.length){n[c]=t;break}{let e=i[a++],t=e===`[`,s=n[c]||(t?[]:{});n[c]=s,n=s,r[o]=r[o]||function(e){return function(t){qo(e,t)}}(s),o+=e}}}function Wo(e,t){let n=0;function r(t,r,i){let a=r.name.endsWith(`[0]`),o=r.type,s=J[o];if(!s)throw Error(`unknown type: 0x${o.toString(16)}`);let c;if(s.bindPoint){let t=n;n+=r.size,c=a?s.arraySetter(e,o,t,i,r.size):s.setter(e,o,t,i,r.size)}else c=s.arraySetter&&a?s.arraySetter(e,i):s.setter(e,i);return c.location=i,c}let i={},a={},o=e.getProgramParameter(t,Zi);for(let n=0;n<o;++n){let o=e.getActiveUniform(t,n);if(Bo(o))continue;let s=o.name;s.endsWith(`[0]`)&&(s=s.substr(0,s.length-3));let c=e.getUniformLocation(t,o.name);if(c){let e=r(t,o,c);i[s]=e,Uo(s,e,a,i)}}return i}function Go(e,t){let n={},r=e.getProgramParameter(t,$i);for(let i=0;i<r;++i){let r=e.getTransformFeedbackVarying(t,i);n[r.name]={index:i,type:r.type,size:r.size}}return n}function Ko(e,t){let n=e.getProgramParameter(t,Zi),r=[],i=[];for(let a=0;a<n;++a){i.push(a),r.push({});let n=e.getActiveUniform(t,a);r[a].name=n.name}[[`UNIFORM_TYPE`,`type`],[`UNIFORM_SIZE`,`size`],[`UNIFORM_BLOCK_INDEX`,`blockNdx`],[`UNIFORM_OFFSET`,`offset`]].forEach(function(n){let a=n[0],o=n[1];e.getActiveUniforms(t,i,e[a]).forEach(function(e,t){r[t][o]=e})});let a={},o=e.getProgramParameter(t,ea);for(let n=0;n<o;++n){let r=e.getActiveUniformBlockName(t,n),i={index:e.getUniformBlockIndex(t,r),usedByVertexShader:e.getActiveUniformBlockParameter(t,n,ta),usedByFragmentShader:e.getActiveUniformBlockParameter(t,n,na),size:e.getActiveUniformBlockParameter(t,n,ra),uniformIndices:e.getActiveUniformBlockParameter(t,n,ia)};i.used=i.usedByVertexShader||i.usedByFragmentShader,a[r]=i}return{blockSpecs:a,uniformData:r}}function qo(e,t){for(let n in t){let r=e[n];typeof r==`function`?r(t[n]):qo(e[n],t[n])}}function Jo(e,...t){let n=e.uniformSetters||e,r=t.length;for(let e=0;e<r;++e){let r=t[e];if(Array.isArray(r)){let e=r.length;for(let t=0;t<e;++t)Jo(n,r[t])}else for(let e in r){let t=n[e];t&&t(r[e])}}}function Yo(e,t){let n={},r=e.getProgramParameter(t,Qi);for(let i=0;i<r;++i){let r=e.getActiveAttrib(t,i);if(Bo(r))continue;let a=e.getAttribLocation(t,r.name),o=Q[r.type],s=o.setter(e,a,o);s.location=a,n[r.name]=s}return n}function Xo(e,t){for(let n in t){let r=e[n];r&&r(t[n])}}function Zo(e,t,n){n.vertexArrayObject?e.bindVertexArray(n.vertexArrayObject):(Xo(t.attribSetters||t,n.attribs),n.indices&&e.bindBuffer(Gi,n.indices))}function Qo(e,t){let n=Wo(e,t),r=Yo(e,t),i={program:t,uniformSetters:n,attribSetters:r,uniformLocations:Object.fromEntries(Object.entries(n).map(([e,t])=>[e,t.location])),attribLocations:Object.fromEntries(Object.entries(r).map(([e,t])=>[e,t.location]))};return Ti(e)&&(i.uniformBlockSpec=Ko(e,t),i.transformFeedbackInfo=Go(e,t)),i}var $o=/\s|{|}|;/;function es(e,t,n,r,i){let a=Ao(n,r,i),o=[];if(t=t.map(function(e){if(!$o.test(e)){let t=Hi(e);if(t)e=t.text;else{let t=`no element with id: ${e}`;a.errorCallback(t),o.push(t)}}return e}),o.length)return Oo(a,``);let s=a.callback;s&&(a.callback=(t,n)=>{s(t,t?void 0:Qo(e,n))});let c=zo(e,t,a);return c?Qo(e,c):null}var ts=4,ns=5123;function rs(e,t,n,r,i,a){n=n===void 0?ts:n;let o=t.indices,s=t.elementType,c=r===void 0?t.numElements:r;i=i===void 0?0:i,s||o?a===void 0?e.drawElements(n,c,s===void 0?ns:t.elementType,i):e.drawElementsInstanced(n,c,s===void 0?ns:t.elementType,i,a):a===void 0?e.drawArrays(n,i,c):e.drawArraysInstanced(n,i,c,a)}var is=6402,as=33190,os=36012,ss=35056,cs=36013,ls=32854,us=32855,ds=36194,fs=33189,ps=6401,ms=36168,hs=34041,gs=36096,_s=36128,vs=33306,$={};$[hs]=vs,$[ps]=_s,$[ms]=_s,$[is]=gs,$[fs]=gs,$[as]=gs,$[os]=gs,$[ss]=vs,$[cs]=vs;var ys={};ys[ls]=!0,ys[us]=!0,ys[ds]=!0,ys[hs]=!0,ys[fs]=!0,ys[ps]=!0,ys[ms]=!0;var bs={addExtensionsToContext:!0},xs=/^(.*?)_/;function Ss(e,t){Ei(e,0);let n=e.getExtension(t);if(n){let r={},i=xs.exec(t)[1],a=`_`+i;for(let t in n){let o=n[t],s=typeof o==`function`,c=s?i:a,l=t;t.endsWith(c)&&(l=t.substring(0,t.length-c.length)),e[l]===void 0?s?e[l]=function(e){return function(){return e.apply(n,arguments)}}(o):(e[l]=o,r[l]=o):!s&&e[l]!==o&&Hr(l,e[l],o,t)}r.constructor={name:n.constructor.name},Ei(r,0)}return n}var Cs=`ANGLE_instanced_arrays.EXT_blend_minmax.EXT_color_buffer_float.EXT_color_buffer_half_float.EXT_disjoint_timer_query.EXT_disjoint_timer_query_webgl2.EXT_frag_depth.EXT_sRGB.EXT_shader_texture_lod.EXT_texture_compression_bptc.EXT_texture_compression_rgtc.EXT_texture_filter_anisotropic.OES_element_index_uint.OES_standard_derivatives.OES_texture_float.OES_texture_float_linear.OES_texture_half_float.OES_texture_half_float_linear.OES_vertex_array_object.WEBGL_color_buffer_float.WEBGL_compressed_texture_atc.WEBGL_compressed_texture_etc1.WEBGL_compressed_texture_etc.WEBGL_compressed_texture_pvrtc.WEBGL_compressed_texture_s3tc.WEBGL_compressed_texture_s3tc_srgb.WEBGL_depth_texture.WEBGL_draw_buffers`.split(`.`);function ws(e){for(let t=0;t<Cs.length;++t)Ss(e,Cs[t])}function Ts(e,t){let n=[`webgl2`,`webgl`,`experimental-webgl`],r=null;for(let i=0;i<n.length;++i)if(r=e.getContext(n[i],t),r){bs.addExtensionsToContext&&ws(r);break}return r}function Es(e,t){return Ts(e,t)}function Ds(e,t){t||=1,t=Math.max(0,t);let n=e.clientWidth*t|0,r=e.clientHeight*t|0;return e.width!==n||e.height!==r?(e.width=n,e.height=r,!0):!1}var Os=150,ks=`
attribute float a_index;
uniform vec2 u_resolution;
uniform float u_time;
varying float v_color_type;
varying float v_intensity_base;

float hash2(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
}

void main() {
  float seed = a_index * 123.456;
  
  float speed_rand = hash2(vec2(seed, 1.1));
  float size_rand = hash2(vec2(seed, 2.2));
  float y_rand = hash2(vec2(seed, 3.3));
  float x_rand = hash2(vec2(seed, 4.4));
  float blink_rand = hash2(vec2(seed, 5.5));
  float color_type_rand = hash2(vec2(seed, 6.6));

  float aspect = u_resolution.x / u_resolution.y;
  float speed = 0.008 + speed_rand * 0.024;
  float size = 0.0006 + 0.0032 * pow(size_rand, 3.8);
  
  float y = -0.45 + y_rand * 0.9;
  
  float margin = 0.05;
  float width = aspect + margin * 2.0;
  float x = fract(x_rand + u_time * speed);
  x = x * width - (aspect * 0.5 + margin);
  
  float wave = sin(u_time * 0.3 + y_rand * 6.283) * 0.005;
  
  float ndc_x = x / (aspect * 0.5);
  float ndc_y = (y + wave) / 0.5;
  
  gl_Position = vec4(ndc_x, ndc_y, 0.0, 1.0);
  
  // Point size in pixels. 
  float pointSize = size * u_resolution.y * 3.5;
  gl_PointSize = max(2.0, pointSize);
  
  float blink = 0.3 + 0.7 * sin(u_time * (1.0 + blink_rand * 2.5) + x_rand * 6.283);
  v_intensity_base = blink;
  v_color_type = color_type_rand;
}
`,As=`
precision mediump float;
uniform vec3 u_particle_color;
uniform vec3 u_particle_accent_color;

varying float v_color_type;
varying float v_intensity_base;

void main() {
  vec2 pc = gl_PointCoord - 0.5;
  float dist = length(pc);
  
  float alpha = smoothstep(0.5, 0.1, dist) * v_intensity_base;
  if (alpha < 0.01) discard;
  
  vec3 baseColor = v_color_type > 0.90 ? u_particle_accent_color : u_particle_color;
  
  // Pre-multiplied alpha blending
  gl_FragColor = vec4(baseColor * alpha, alpha);
}
`,js=({theme:e,isDaylight:t,paused:n=!1})=>{let r=(0,k.useRef)(null),i=(0,k.useRef)(null),a=(0,k.useRef)(0),o=(0,k.useRef)(null),s=te(e.primaryColor)||(t?{r:0,g:0,b:0}:{r:255,g:255,b:255}),c=[s.r/255,s.g/255,s.b/255],l=te(e.accentColor)||s,u=[l.r/255,l.g/255,l.b/255],d=t?[1,1,1]:[0,0,0],f=(0,k.useRef)(n),p=(0,k.useRef)(c),m=(0,k.useRef)(u),h=(0,k.useRef)(d);return f.current=n,p.current=c,m.current=u,h.current=d,(0,k.useEffect)(()=>{let e=r.current;if(!e)return;let t=Es(e,{alpha:!1,depth:!1,antialias:!1});if(!t)return;let n=es(t,[ks,As],e=>{console.error(`SoraBackground twgl program error:`,e)});if(!n)return;let s=new Float32Array(Os);for(let e=0;e<Os;e++)s[e]=e;let c=wi(t,{a_index:{numComponents:1,data:s}}),l=null,u=()=>{i.current===null&&(i.current=requestAnimationFrame(d))},d=r=>{if(i.current=null,!f.current&&l!==null){let e=(r-l)/1e3;a.current+=e}l=f.current?null:r,Ds(e),t.viewport(0,0,t.canvas.width,t.canvas.height);let o=h.current;t.clearColor(o[0],o[1],o[2],1),t.clear(t.COLOR_BUFFER_BIT),t.enable(t.BLEND),t.blendFunc(t.ONE,t.ONE_MINUS_SRC_ALPHA);let s={u_resolution:[t.canvas.width,t.canvas.height],u_time:a.current,u_particle_color:p.current,u_particle_accent_color:m.current};t.useProgram(n.program),Zo(t,n,c),Jo(n,s),rs(t,c,t.POINTS),f.current||u()},g=new ResizeObserver(u);return g.observe(e),o.current=u,u(),()=>{o.current=null,g.disconnect(),i.current!==null&&(cancelAnimationFrame(i.current),i.current=null),t.deleteProgram(n.program),c.attribs&&c.attribs.a_index&&c.attribs.a_index.buffer&&t.deleteBuffer(c.attribs.a_index.buffer)}},[]),(0,k.useEffect)(()=>{o.current?.()},[n,t,e.primaryColor,e.accentColor]),(0,A.jsx)(`canvas`,{ref:r,className:`absolute inset-0 w-full h-full block pointer-events-none`,style:{width:`100%`,height:`100%`,willChange:`transform`,transform:`translateZ(0)`}})},Ms=({t:e,isDaylight:t,theme:n,controlCardBg:r,tuning:i,onTuningChange:a})=>{let o=D(n.secondaryColor,t?.18:.16);return(0,A.jsxs)(`div`,{className:`rounded-[24px] border p-4 space-y-5`,style:{backgroundColor:r,borderColor:o},children:[(0,A.jsx)(`div`,{className:`space-y-1`,children:(0,A.jsx)(`div`,{className:`text-sm font-medium`,style:{color:n.primaryColor},children:e(`options.soraBackgroundSettings`)})}),(0,A.jsx)(j,{label:e(`options.soraBlank`),description:e(`options.soraBlankDesc`),checked:i.blank,onChange:e=>a?.({blank:e}),theme:n})]})},Ns=e({default:()=>Ps}),Ps=de({mode:`sora`,order:50,labelKey:`options.visualizerBackgroundModeSora`,labelFallback:`Sora`,render:({config:e,theme:t,isDaylight:n,paused:r,staticMode:i})=>(0,A.jsx)(`div`,{className:`absolute inset-0 z-0`,style:{backgroundColor:n?`#ffffff`:`#000000`},children:!e?.sora?.tuning?.blank&&(0,A.jsx)(js,{theme:t,isDaylight:n,paused:r||i})}),renderSettingsPanel:({config:e,actions:t,t:n,isDaylight:r,theme:i,controlCardBg:a})=>(0,A.jsx)(Ms,{t:n,isDaylight:r,theme:i,controlCardBg:a,tuning:e?.sora?.tuning??T,onTuningChange:t?.sora?.onTuningChange}),renderQuickControls:({config:e,actions:t,t:n,theme:r})=>{let a=e?.sora?.tuning??T;return(0,A.jsx)(pe,{active:a.blank,theme:r,label:n(`options.soraBlank`),onToggle:()=>t?.sora?.onTuningChange?.({blank:!a.blank}),children:(0,A.jsx)(i,{size:14})})},resetSettings:e=>e?.sora?.onResetTuning?.()}),Fs=({urlBackgroundList:e=[],urlBackgroundSelectedId:t=null})=>{let n=(0,k.useMemo)(()=>re(e.find(e=>e.id===t)),[e,t]),r=(0,k.useRef)(null),[i,a]=(0,k.useState)(!1);return(0,k.useEffect)(()=>{a(!1);let e=r.current;if(!e)return;let t=e.getBoundingClientRect();if(t.width>0&&t.height>0){a(!0);return}let n=new ResizeObserver(e=>{for(let t of e){let{width:e,height:r}=t.contentRect;e>0&&r>0&&(a(!0),n.disconnect())}});return n.observe(e),()=>{n.disconnect()}},[n]),n?.url?(0,A.jsxs)(`div`,{ref:r,className:`absolute inset-0 z-0 overflow-hidden`,children:[i&&(0,A.jsx)(`iframe`,{src:n.url,title:n.note||n.url,className:`w-full h-full border-0`,style:{pointerEvents:`none`},sandbox:`allow-scripts`,allowFullScreen:!0},n.url),(0,A.jsx)(`div`,{className:`absolute inset-0`,style:{background:`linear-gradient(to bottom, rgba(0,0,0,0.15), rgba(0,0,0,0.35))`,pointerEvents:`none`}})]}):null},Is=()=>`url-bg-${Date.now()}-${Math.random().toString(36).slice(2,8)}`,Ls=({t:e,isDaylight:t,theme:r,controlCardBg:i,urlBackgroundList:o=[],urlBackgroundSelectedId:l=null,onAddUrlBackgroundItem:d,onUpdateUrlBackgroundItem:f,onDeleteUrlBackgroundItem:m,onSetUrlBackgroundSelectedId:h})=>{let[g,_]=(0,k.useState)(!1),[v,y]=(0,k.useState)(null),[b,x]=(0,k.useState)(``),[S,C]=(0,k.useState)(``),w=(0,k.useCallback)(()=>{x(``),C(``),_(!1),y(null)},[]),T=(0,k.useCallback)(()=>{let e=ie(b);if(!e)return;let t={id:Is(),url:e,note:S.trim()||e};d?.(t),h?.(t.id),w()},[b,S,d,h,w]),E=(0,k.useCallback)(e=>{y(e.id),x(e.url),C(e.note)},[]),ee=(0,k.useCallback)(()=>{if(!v)return;let e=ie(b);e&&(f?.(v,{url:e,note:S.trim()||e}),w())},[v,b,S,f,w]),te=(0,k.useCallback)(e=>{m?.(e)},[m]),ne=(0,k.useCallback)(e=>{h?.(e)},[h]),O=D(r.secondaryColor,t?.18:.16),re=D(r.backgroundColor,t?.24:.34),ae=D(r.backgroundColor,t?.42:.52);return(0,A.jsxs)(`div`,{className:`rounded-[24px] border p-4 space-y-4`,style:{backgroundColor:i,borderColor:O},children:[(0,A.jsxs)(`div`,{className:`space-y-1`,children:[(0,A.jsx)(`div`,{className:`text-sm font-medium`,style:{color:r.primaryColor},children:e(`options.urlBackgroundSettings`)}),(0,A.jsx)(`div`,{className:`text-xs opacity-70`,style:{color:r.secondaryColor},children:e(`options.urlBackgroundSettingsDesc`)})]}),o.length>0&&(0,A.jsx)(`div`,{className:`space-y-2`,children:o.map(n=>(0,A.jsx)(`div`,{className:`rounded-2xl border p-3 transition-all`,style:{borderColor:n.id===l?r.accentColor:O,backgroundColor:n.id===l?D(r.accentColor,t?.1:.16):re},children:v===n.id?(0,A.jsxs)(`div`,{className:`space-y-2`,children:[(0,A.jsx)(`input`,{type:`url`,value:b,onChange:e=>x(e.target.value),placeholder:`https://example.com`,className:`w-full rounded-xl border px-3 py-2 text-sm outline-none`,style:{backgroundColor:ae,borderColor:O,color:r.primaryColor}}),(0,A.jsx)(`input`,{type:`text`,value:S,onChange:e=>C(e.target.value),placeholder:e(`options.urlBackgroundNotePlaceholder`),className:`w-full rounded-xl border px-3 py-2 text-sm outline-none`,style:{backgroundColor:ae,borderColor:O,color:r.primaryColor}}),(0,A.jsxs)(`div`,{className:`flex gap-2 justify-end`,children:[(0,A.jsx)(`button`,{type:`button`,onClick:w,className:`h-8 w-8 rounded-full border flex items-center justify-center transition-colors hover:bg-white/10`,style:{borderColor:O,color:r.secondaryColor},children:(0,A.jsx)(u,{size:14})}),(0,A.jsx)(`button`,{type:`button`,onClick:ee,disabled:!b.trim(),className:`h-8 w-8 rounded-full border flex items-center justify-center transition-colors hover:bg-white/10 disabled:opacity-40`,style:{borderColor:r.accentColor,color:r.accentColor},children:(0,A.jsx)(a,{size:14})})]})]}):(0,A.jsxs)(`div`,{className:`flex items-center gap-3`,children:[(0,A.jsxs)(`button`,{type:`button`,onClick:()=>ne(n.id),className:`flex-1 text-left min-w-0`,children:[(0,A.jsx)(`div`,{className:`text-sm font-medium truncate`,style:{color:r.primaryColor},children:n.note}),(0,A.jsx)(`div`,{className:`text-xs opacity-60 truncate mt-0.5`,style:{color:r.secondaryColor},children:n.url})]}),(0,A.jsxs)(`div`,{className:`flex items-center gap-1 shrink-0`,children:[(0,A.jsx)(`button`,{type:`button`,onClick:()=>E(n),className:`h-7 w-7 rounded-full border flex items-center justify-center transition-colors hover:bg-white/10`,style:{borderColor:O,color:r.secondaryColor},children:(0,A.jsx)(c,{size:12})}),(0,A.jsx)(`button`,{type:`button`,onClick:()=>te(n.id),className:`h-7 w-7 rounded-full border flex items-center justify-center transition-colors hover:bg-red-500/10`,style:{borderColor:O,color:r.secondaryColor},children:(0,A.jsx)(s,{size:12})})]})]})},n.id))}),g?(0,A.jsxs)(`div`,{className:`space-y-2 rounded-2xl border p-3`,style:{borderColor:O,backgroundColor:re},children:[(0,A.jsx)(`input`,{type:`url`,value:b,onChange:e=>x(e.target.value),placeholder:`https://example.com`,autoFocus:!0,className:`w-full rounded-xl border px-3 py-2 text-sm outline-none`,style:{backgroundColor:ae,borderColor:O,color:r.primaryColor}}),(0,A.jsx)(`input`,{type:`text`,value:S,onChange:e=>C(e.target.value),placeholder:e(`options.urlBackgroundNotePlaceholder`),className:`w-full rounded-xl border px-3 py-2 text-sm outline-none`,style:{backgroundColor:ae,borderColor:O,color:r.primaryColor}}),(0,A.jsxs)(`div`,{className:`flex gap-2 justify-end`,children:[(0,A.jsx)(`button`,{type:`button`,onClick:w,className:`h-8 w-8 rounded-full border flex items-center justify-center transition-colors hover:bg-white/10`,style:{borderColor:O,color:r.secondaryColor},children:(0,A.jsx)(u,{size:14})}),(0,A.jsx)(`button`,{type:`button`,onClick:T,disabled:!b.trim(),className:`h-8 w-8 rounded-full border flex items-center justify-center transition-colors hover:bg-white/10 disabled:opacity-40`,style:{borderColor:r.accentColor,color:r.accentColor},children:(0,A.jsx)(a,{size:14})})]})]}):(0,A.jsxs)(`button`,{type:`button`,onClick:()=>{x(``),C(``),_(!0)},className:`flex h-10 w-full items-center justify-center gap-2 rounded-2xl border px-4 text-sm font-medium transition-colors hover:bg-white/5`,style:{borderColor:O,color:r.primaryColor},children:[(0,A.jsx)(p,{size:16}),e(`options.urlBackgroundAdd`)]}),o.length===0&&!g&&(0,A.jsxs)(`div`,{className:`flex flex-col items-center gap-2 py-3 opacity-50`,children:[(0,A.jsx)(n,{size:24,style:{color:r.secondaryColor}}),(0,A.jsx)(`div`,{className:`text-xs`,style:{color:r.secondaryColor},children:e(`options.urlBackgroundEmpty`)})]})]})},Rs=e({default:()=>zs}),zs=de({mode:`url`,order:40,labelKey:`options.visualizerBackgroundModeUrl`,labelFallback:`Embed`,render:({config:e})=>(0,A.jsx)(Fs,{urlBackgroundList:e?.url?.items,urlBackgroundSelectedId:e?.url?.selectedId}),renderSettingsPanel:({config:e,actions:t,...n})=>(0,A.jsx)(Ls,{...n,urlBackgroundList:e?.url?.items,urlBackgroundSelectedId:e?.url?.selectedId,onAddUrlBackgroundItem:t?.url?.onAdd,onUpdateUrlBackgroundItem:t?.url?.onUpdate,onDeleteUrlBackgroundItem:t?.url?.onDelete,onSetUrlBackgroundSelectedId:t?.url?.onSelect})}),{entries:Bs,byMode:Vs}=(e=>{let t=Object.entries(e).map(([e,t])=>{if(!t.default)throw Error(`[VisualizerBackgroundRegistry] Missing default export in ${e}`);return t.default}),n={};return t.forEach(e=>{if(n[e.mode])throw Error(`[VisualizerBackgroundRegistry] Duplicate background mode "${e.mode}"`);n[e.mode]=e}),{entries:[...t].sort((e,t)=>e.order-t.order),byMode:n}})(Object.assign({"./common/entry.tsx":je,"./latent/entry.tsx":Kt,"./monet/entry.tsx":Wn,"./nomand/entry.tsx":vr,"./sora/entry.tsx":Ns,"./url/entry.tsx":Rs}));ne(`VisualizerBackgroundRegistry`,Bs.map(e=>e.mode),O);var Hs=e=>typeof e==`string`&&!!Vs[e],Us=e=>Vs[e]??Vs.latent,Ws=e=>!Vs[e.mode]&&(Vs[e.mode]=e,Bs.push(e),Bs.sort((e,t)=>e.order-t.order),!0),Gs=e=>{if(!Vs[e])return!1;delete Vs[e];let t=Bs.findIndex(t=>t.mode===e);return t>=0&&Bs.splice(t,1),!0};export{Gs as a,pe as c,Hs as i,Ws as n,Se as o,Us as r,fe as s,Bs as t};