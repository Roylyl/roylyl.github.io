import{n as e,r as t}from"./rolldown-runtime-hePW80VL.js";import{Hn as n,Jt as r,T as i,_ as a,at as o,en as s,i as c,jr as l,lt as u,or as d,p as f,sn as p}from"./icons-z9cp8dbu.js";import{d as m,h,l as g,s as _}from"./types-CXc8a1ne.js";import{t as v}from"./jsx-runtime-NZYk81nU.js";import{t as y}from"./proxy-DnGlqlWh.js";import{n as b,t as x}from"./use-spring-D8XQYCOc.js";import{t as S}from"./AnimatePresence-BflPVWWS.js";import{t as C}from"./useReducedMotionFor-DkawjheC.js";import{r as w,t as T}from"./colorMix-CnH_WQSI.js";import{c as ee,i as te,n as ne,t as re}from"./urlBackground-Vw3fAM0W.js";import{a as ie,i as ae,n as E,s as oe,t as D}from"./lucideIconResolver-CVprYew-.js";import{c as se,d as ce,g as le,h as O,i as k,l as ue,m as de,n as fe,o as pe,p as me,r as he,s as ge,t as _e,u as ve}from"./paperShaderUniforms-D-2gGWcm.js";import{n as ye}from"./colorExtractor-kRP0U58y.js";import{t as be}from"./dist-Bx5B9EDc.js";var A=t(l(),1),j=v(),xe=e=>e,Se=({onClick:e,label:t,title:n,isDaylight:r})=>(0,j.jsx)(`button`,{type:`button`,onClick:e,className:`h-6 rounded-md px-1.5 text-[10px] font-bold transition-all ${r?`bg-white shadow-sm hover:bg-white/90`:`bg-white/20 shadow-sm hover:bg-white/30`}`,title:n,"aria-label":n,children:t}),Ce=({active:e,onToggle:t,label:n,theme:r,children:i})=>(0,j.jsx)(`button`,{type:`button`,onClick:t,className:`flex h-6 w-6 items-center justify-center rounded-md transition-all ${e?``:`opacity-40 hover:opacity-100`}`,style:e?{color:r.accentColor}:void 0,title:n,"aria-label":n,"aria-pressed":e,children:i}),M=({label:e,description:t,checked:n,onChange:r,theme:i})=>(0,j.jsxs)(`div`,{className:`flex items-center justify-between gap-4`,children:[(0,j.jsxs)(`div`,{className:`space-y-1`,children:[(0,j.jsx)(`div`,{className:`text-sm font-medium`,style:{color:i.primaryColor},children:e}),t&&(0,j.jsx)(`div`,{className:`max-w-[320px] text-xs opacity-70`,style:{color:i.secondaryColor},children:t})]}),(0,j.jsx)(`button`,{type:`button`,"aria-pressed":n,disabled:!r,onClick:()=>r?.(!n),className:`h-6 w-12 shrink-0 rounded-full p-1 transition-colors disabled:opacity-45`,style:{backgroundColor:n?i.secondaryColor:T(i.secondaryColor,.18)},children:(0,j.jsx)(`div`,{className:`h-4 w-4 rounded-full shadow-sm transition-transform ${n?`translate-x-6`:`translate-x-0`}`,style:{backgroundColor:i.backgroundColor}})})]}),we=({config:e,actions:t,t:n,theme:r,controlCardBg:i,rangeInputClass:a,onSliderPointerDown:o,onSliderCommit:s})=>{let c=e?.common,l=t?.common,u=T(r.secondaryColor,.16),d=c?.opacity??.75;return(0,j.jsxs)(j.Fragment,{children:[(0,j.jsxs)(`div`,{className:`rounded-[24px] border p-4 space-y-4`,style:{backgroundColor:i,borderColor:u},children:[(0,j.jsx)(M,{label:n(`options.disableVisualizerVignette`),description:n(`options.disableVisualizerVignetteDesc`),checked:c?.disableVignette??!1,onChange:l?.onDisableVignetteChange,theme:r}),(0,j.jsx)(M,{label:n(`options.disableVisualizerGeometricBackground`),description:n(`options.disableVisualizerGeometricBackgroundDesc`),checked:c?.disableGeometricBackground??!1,onChange:l?.onDisableGeometricChange,theme:r})]}),(0,j.jsx)(`div`,{className:`rounded-[24px] border p-4 space-y-4`,style:{backgroundColor:i,borderColor:u},children:(0,j.jsxs)(`div`,{className:`space-y-2`,children:[(0,j.jsx)(`div`,{className:`text-sm font-medium`,style:{color:r.primaryColor},children:n(`options.previewCoverBackgroundSettings`)}),(0,j.jsx)(`div`,{className:`text-xs opacity-70`,style:{color:r.secondaryColor},children:n(`options.previewCoverBackgroundSettingsDesc`)}),(0,j.jsx)(M,{label:n(`theme.addCoverColor`),description:n(`options.coverColorBackgroundDesc`),checked:c?.useCoverColorBg??!1,onChange:l?.onCoverColorChange,theme:r}),(0,j.jsxs)(`div`,{className:`flex items-center justify-between text-sm`,style:{color:r.primaryColor},children:[(0,j.jsx)(`span`,{children:n(`options.previewCoverBackgroundOpacity`)}),(0,j.jsxs)(`span`,{className:`font-mono opacity-70`,style:{color:r.secondaryColor},children:[Math.round(d*100),`%`]})]}),(0,j.jsx)(`input`,{type:`range`,min:`0`,max:`1`,step:`0.05`,value:d,onChange:e=>l?.onOpacityChange?.(Number(e.target.value)),onPointerDown:o,onPointerUp:s,className:a})]})})]})},N=24,Te=96,Ee=()=>{if(typeof navigator>`u`)return!1;let e=navigator.userAgent,t=/iPad|iPhone|iPod/i.test(e)||navigator.platform===`MacIntel`&&navigator.maxTouchPoints>1,n=/WebKit/i.test(e),r=/CriOS|FxiOS|EdgiOS|OPiOS|DuckDuckGo|YaBrowser|GSA/i.test(e);return t&&n&&!r},De=e=>new Promise(t=>{if(typeof document>`u`){t(null);return}let n=new Image;n.crossOrigin=`anonymous`,n.decoding=`async`,n.onload=()=>{try{let e=document.createElement(`canvas`),r=document.createElement(`canvas`);e.width=N,e.height=N,r.width=Te,r.height=Te;let i=e.getContext(`2d`),a=r.getContext(`2d`);if(!i||!a){t(null);return}let o=n.naturalWidth||n.width,s=n.naturalHeight||n.height,c=Math.min(o,s),l=Math.max(0,(o-c)/2),u=Math.max(0,(s-c)/2);i.imageSmoothingEnabled=!0,i.imageSmoothingQuality=`high`,i.drawImage(n,l,u,c,c,0,0,N,N),a.imageSmoothingEnabled=!0,a.imageSmoothingQuality=`high`,a.globalAlpha=1,a.drawImage(e,0,0,N,N,0,0,Te,Te),[{x:-8,y:-8,size:112,alpha:.22},{x:6,y:0,size:Te,alpha:.14},{x:0,y:6,size:Te,alpha:.14}].forEach(({x:t,y:n,size:r,alpha:i})=>{a.globalAlpha=i,a.drawImage(e,0,0,N,N,t,n,r,r)}),a.globalAlpha=1,t(r.toDataURL(`image/jpeg`,.72))}catch(e){console.warn(`[FluidBackground] Failed to build soft focus cover`,e),t(null)}},n.onerror=()=>t(null),n.src=e}),Oe=384,ke=(e,t)=>new Promise(n=>{if(typeof document>`u`){n(null);return}let r=new Image;r.crossOrigin=`anonymous`,r.decoding=`async`,r.onload=()=>{try{let e=r.naturalWidth||r.width,i=r.naturalHeight||r.height;if(!e||!i){n(null);return}let a=Math.min(1,t/Math.max(e,i)),o=Math.max(1,Math.round(e*a)),s=Math.max(1,Math.round(i*a)),c=document.createElement(`canvas`);c.width=o,c.height=s;let l=c.getContext(`2d`);if(!l){n(null);return}l.imageSmoothingEnabled=!0,l.imageSmoothingQuality=`high`,l.drawImage(r,0,0,o,s),n(c.toDataURL(`image/jpeg`,.82))}catch(e){console.warn(`[FluidBackground] Failed to downscale cover`,e),n(null)}},r.onerror=()=>n(null),r.src=e}),Ae=(0,A.memo)(({coverUrl:e,theme:t})=>{let n=(0,A.useMemo)(Ee,[]),[r,i]=(0,A.useState)(null);(0,A.useEffect)(()=>{let t=!1;return!n||!e?(i(null),()=>{t=!0}):(i(null),De(e).then(e=>{t||i(e)}),()=>{t=!0})},[e,n]);let a=(0,A.useRef)(0),[o,s]=(0,A.useState)([]),[c,l]=(0,A.useState)(()=>new Set);(0,A.useEffect)(()=>{if(n)return;if(!e){s([]);return}let t=!1;return ke(e,Oe).then(n=>{if(t)return;let r=n??e;s(t=>{let n=t[t.length-1];return n&&n.sourceCover===e?t:(a.current+=1,[...n?[n]:[],{url:r,sourceCover:e,key:a.current}])})}),()=>{t=!0}},[e,n]);let u=(0,A.useCallback)(e=>{l(t=>t.has(e)?t:new Set(t).add(e))},[]),d=n?r??e??null:null,f=n&&!!r,p=(0,A.useMemo)(()=>n?{transform:`scale(${f?1.28:1.2}) translateZ(0)`,opacity:f?.94:.3,willChange:`transform, opacity`,backfaceVisibility:`hidden`,WebkitBackfaceVisibility:`hidden`}:{filter:`blur(40px)`,transform:`scale(1.5) translateZ(0)`,opacity:1,willChange:`transform, opacity, filter`,backfaceVisibility:`hidden`,WebkitBackfaceVisibility:`hidden`},[n,f]);return(0,j.jsxs)(`div`,{className:`absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0`,style:{isolation:`isolate`,contain:`paint`,transform:`translateZ(0)`},children:[e?(0,j.jsxs)(j.Fragment,{children:[n?(0,j.jsx)(`img`,{src:d??e,alt:``,"aria-hidden":`true`,draggable:!1,decoding:`async`,className:`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-out`,style:p}):o.map((e,t)=>{let n=t===o.length-1,r=c.has(e.key);return(0,j.jsx)(y.div,{className:`absolute inset-0 w-full h-full`,style:{willChange:`opacity`},initial:{opacity:+!n},animate:{opacity:n&&!r?0:1},transition:{duration:1.5,ease:`easeInOut`},onAnimationComplete:()=>{n&&r&&(s(t=>t.filter(t=>t.key===e.key)),l(t=>t.has(e.key)?new Set([e.key]):t))},children:(0,j.jsx)(`img`,{src:e.url,alt:``,"aria-hidden":`true`,draggable:!1,decoding:`async`,className:`absolute inset-0 w-full h-full object-cover`,style:p,ref:t=>{t&&!c.has(e.key)&&t.decode().then(()=>requestAnimationFrame(()=>u(e.key))).catch(()=>u(e.key))},onError:()=>{s(t=>t.length>1?t.filter(t=>t.key!==e.key):t)}})},e.key)}),n&&(0,j.jsxs)(j.Fragment,{children:[!f&&(0,j.jsx)(`img`,{src:e,alt:``,"aria-hidden":`true`,draggable:!1,decoding:`async`,className:`absolute inset-0 w-full h-full object-cover`,style:{transform:`scale(1.36) translateZ(0)`,opacity:.12,willChange:`transform, opacity`,backfaceVisibility:`hidden`,WebkitBackfaceVisibility:`hidden`}}),(0,j.jsx)(`div`,{className:`absolute inset-0 w-full h-full`,style:{backgroundColor:t.backgroundColor,opacity:.28}}),(0,j.jsx)(`div`,{className:`absolute inset-0 w-full h-full`,style:{background:`radial-gradient(circle at 20% 20%, ${t.accentColor}55 0%, transparent 42%), radial-gradient(circle at 80% 28%, ${t.secondaryColor}50 0%, transparent 44%), radial-gradient(circle at 50% 78%, ${t.primaryColor}28 0%, transparent 52%)`,opacity:f?.52:.7}})]})]}):(0,j.jsx)(`div`,{className:`absolute inset-0 w-full h-full transition-colors duration-1000`,style:{backgroundColor:t.backgroundColor,opacity:.8}}),(0,j.jsx)(`div`,{className:`absolute inset-0 w-full h-full`,style:{background:`linear-gradient(to bottom right, ${t.primaryColor}, transparent, ${t.secondaryColor})`,opacity:n?.2:.4,mixBlendMode:n?`normal`:`overlay`}})]})},(e,t)=>{if(e.coverUrl!==t.coverUrl)return!1;let n=e.theme,r=t.theme;return n.backgroundColor===r.backgroundColor&&n.primaryColor===r.primaryColor&&n.secondaryColor===r.secondaryColor}),je=e=>{let t=e?.join(`
`)??``;return(0,A.useEffect)(()=>{t&&ae(t.split(`
`))},[t]),(0,A.useSyncExternalStore)(oe,D,D)},Me=e=>{switch(e.type){case`circle`:return`bass`;case`square`:return`lowMid`;case`triangle`:return`mid`;case`cross`:return`treble`;case`icon`:return`vocal`;default:return`default`}},Ne=e=>e===`triangle`?`polygon(50% 0%, 0% 100%, 100% 100%)`:e===`cross`?`polygon(20% 0%, 0% 20%, 30% 50%, 0% 80%, 20% 100%, 50% 70%, 80% 100%, 100% 80%, 70% 50%, 100% 20%, 80% 0%, 50% 30%)`:`none`,Pe=(e,t)=>{let n=(e.type===`circle`||e.type===`square`)&&!e.filled;return{left:`${e.initialX}%`,top:`${e.initialY}%`,width:e.size,height:e.size,border:n?`1px solid ${t.secondaryColor}`:`none`,backgroundColor:n?`transparent`:t.secondaryColor,borderRadius:e.type===`circle`?`50%`:`0%`,opacity:e.opacity,clipPath:Ne(e.type)}},Fe=({disabled:e=!1})=>e?null:(0,j.jsx)(`div`,{className:`absolute inset-0 pointer-events-none`,style:{background:`radial-gradient(circle, transparent 40%, rgba(0,0,0,0.6) 100%)`}}),Ie=({theme:e,shapes:t,particles:n,hideShapes:r,disableVignette:i})=>(0,j.jsxs)(`div`,{className:`absolute inset-0`,children:[!r&&(0,j.jsxs)(j.Fragment,{children:[t.map(t=>{if(t.type===`icon`&&t.iconName){if(E(t.iconName)===`loading`)return null;let n=ie(t.iconName);if(n)return(0,j.jsx)(`div`,{className:`absolute flex items-center justify-center`,style:{left:`${t.initialX}%`,top:`${t.initialY}%`,width:t.size,height:t.size,color:e.secondaryColor,opacity:t.opacity,transform:`rotate(${t.initialRotation}deg)`},children:(0,j.jsx)(n,{size:t.size,strokeWidth:1,absoluteStrokeWidth:!0})},t.id)}return(0,j.jsx)(`div`,{className:`absolute`,style:{...Pe(t,e),transform:`rotate(${t.initialRotation}deg)`}},t.id)}),n.map(t=>(0,j.jsx)(`div`,{className:`absolute rounded-full`,style:{backgroundColor:e.accentColor,width:t.size,height:t.size,left:`${t.left}%`,top:`${t.top}%`,opacity:t.opacity}},`p-${t.id}`))]}),(0,j.jsx)(Fe,{disabled:i})]}),Le=({theme:e,audioPower:t,audioBands:n,shapes:r,particles:i,hideShapes:a,disableVignette:o})=>{let s=e=>{let n=x(e||t,{stiffness:300,damping:30});return b(n,[10,200],[.95,1.45])},c={bass:s(n?.bass),lowMid:s(n?.lowMid),mid:s(n?.mid),vocal:s(n?.vocal),treble:s(n?.treble),default:s(t)};return(0,j.jsxs)(`div`,{className:`absolute inset-0`,children:[!a&&(0,j.jsxs)(j.Fragment,{children:[r.map(t=>{if(t.type===`icon`&&t.iconName){if(E(t.iconName)===`loading`)return null;let n=ie(t.iconName);if(n)return(0,j.jsx)(y.div,{className:`absolute flex items-center justify-center`,style:{left:`${t.initialX}%`,top:`${t.initialY}%`,width:t.size,height:t.size,color:e.secondaryColor,scale:c.vocal},animate:{y:t.reverse?[-30,30,-30]:[30,-30,30],x:t.reverse?[15,-15,15]:[-15,15,-15],rotate:[t.initialRotation,t.initialRotation+360],opacity:[0,t.opacity*3,0]},transition:{duration:t.duration,repeat:1/0,ease:`linear`,delay:t.delay,opacity:{duration:t.duration*.5,repeat:1/0,ease:`easeInOut`,delay:t.delay}},children:(0,j.jsx)(n,{size:t.size,strokeWidth:1,absoluteStrokeWidth:!0})},t.id)}return(0,j.jsx)(y.div,{className:`absolute`,style:{...Pe(t,e),scale:c[Me(t)]},animate:{y:t.reverse?[-30,30,-30]:[30,-30,30],x:t.reverse?[15,-15,15]:[-15,15,-15],rotate:[t.initialRotation,t.initialRotation+360]},transition:{duration:t.duration,repeat:1/0,ease:`linear`,delay:t.delay}},t.id)}),i.map(t=>(0,j.jsx)(y.div,{className:`absolute rounded-full`,style:{backgroundColor:e.accentColor,width:t.size,height:t.size,left:`${t.left}%`,top:`${t.top}%`,opacity:t.opacity},animate:{y:[0,-100],opacity:[0,t.opacity,0]},transition:{duration:t.duration,repeat:1/0,ease:`linear`,delay:t.delay}},`p-${t.id}`))]}),(0,j.jsx)(Fe,{disabled:o})]})},Re=({theme:e,audioPower:t,audioBands:n,seed:r,hideShapes:i=!1,disableVignette:a=!1,paused:o=!1})=>{je(e.lyricsIcons);let s=(0,A.useMemo)(()=>{let t=[`circle`,`square`,`triangle`,`cross`],n=e.lyricsIcons||[],r=0;return Array.from({length:15}).map((e,i)=>{let a=n.length>0&&Math.random()>.7&&r<6;a&&(r+=1);let o=a?n[Math.floor(Math.random()*n.length)]:null;return{id:i,type:a?`icon`:t[Math.floor(Math.random()*t.length)],iconName:o,initialX:Math.random()*100,initialY:Math.random()*100,size:40+Math.random()*100,duration:a?20+Math.random()*20:30+Math.random()*30,delay:Math.random()*5,opacity:.11+Math.random()*.08,reverse:Math.random()>.5,filled:Math.random()<.3,initialRotation:Math.random()*360}})},[e.lyricsIcons,r]),c=(0,A.useMemo)(()=>Array.from({length:20}).map((e,t)=>({id:t,size:Math.random()*4+1,left:Math.random()*100,top:Math.random()*100,opacity:Math.random()*.3,duration:15+Math.random()*20,delay:Math.random()*10})),[r]);return(0,j.jsx)(y.div,{className:`absolute inset-0`,initial:{opacity:0},animate:{opacity:1},exit:{opacity:0},transition:{duration:.6,ease:`easeInOut`},children:o?(0,j.jsx)(Ie,{theme:e,shapes:s,particles:c,hideShapes:i,disableVignette:a}):(0,j.jsx)(Le,{theme:e,audioPower:t,audioBands:n,shapes:s,particles:c,hideShapes:i,disableVignette:a})})},ze=A.memo(e=>{let t=String(e.seed??`default`);return(0,j.jsx)(`div`,{className:`absolute inset-0 overflow-hidden pointer-events-none`,children:(0,j.jsx)(S,{mode:`sync`,children:(0,j.jsx)(Re,{...e},t)})})},(e,t)=>{if(e.seed!==t.seed||e.audioPower!==t.audioPower||e.hideShapes!==t.hideShapes||e.disableVignette!==t.disableVignette||e.paused!==t.paused)return!1;let n=e.audioBands,r=t.audioBands;if(!n!=!r)return!1;let i=!0;if(n&&r&&(i=n.bass===r.bass&&n.lowMid===r.lowMid&&n.mid===r.mid&&n.vocal===r.vocal&&n.treble===r.treble),!i)return!1;let a=e.theme,o=t.theme,s=a.backgroundColor===o.backgroundColor&&a.primaryColor===o.primaryColor&&a.secondaryColor===o.secondaryColor&&a.accentColor===o.accentColor,c=!!(a.lyricsIcons===o.lyricsIcons||a.lyricsIcons?.length===o.lyricsIcons?.length&&a.lyricsIcons?.every((e,t)=>e===o.lyricsIcons?.[t]));return s&&c}),Be=e({default:()=>Ve}),Ve=xe({mode:`common`,order:10,labelKey:`options.visualizerBackgroundModeCommon`,labelFallback:`Common`,render:({config:e,theme:t,coverUrl:n,audioPower:r,audioBands:i,seed:a,staticMode:o,paused:s})=>{let c=e?.common,l=c?.useCoverColorBg??!1;return(0,j.jsxs)(j.Fragment,{children:[l&&(0,j.jsx)(y.div,{initial:{opacity:0},animate:{opacity:1},exit:{opacity:0},transition:{duration:1},className:`absolute inset-0 z-0`,children:(0,j.jsx)(Ae,{coverUrl:n,theme:t})},`fluid-bg`),(0,j.jsx)(`div`,{className:`absolute inset-0 z-0 transition-all duration-1000`,style:{backgroundColor:t.backgroundColor,opacity:l?c?.opacity??.75:1}}),!o&&(0,j.jsx)(`div`,{className:`absolute inset-0 z-0`,children:(0,j.jsx)(ze,{theme:t,audioPower:r,audioBands:i,seed:a,hideShapes:c?.disableGeometricBackground??!1,disableVignette:c?.disableVignette??!1,paused:s})})]})},renderSettingsPanel:e=>(0,j.jsx)(we,{...e}),renderQuickControls:({config:e,actions:t,t:r,theme:i})=>{let a=e?.common?.useCoverColorBg??!1;return(0,j.jsx)(Ce,{active:a,theme:i,label:r(a?`theme.addCoverColor`:`theme.useDefaultColor`),onToggle:()=>t?.common?.onCoverColorChange?.(!a),children:(0,j.jsx)(n,{size:14})})},resetSettings:e=>{e?.common?.onOpacityChange?.(.75),e?.common?.onCoverColorChange?.(!1),e?.common?.onDisableVignetteChange?.(!1),e?.common?.onDisableGeometricChange?.(!1)}}),He={maxColorCount:10},Ue=`#version 300 es
precision mediump float;

uniform float u_time;

uniform vec4 u_colors[${He.maxColorCount}];
uniform float u_colorsCount;

uniform float u_distortion;
uniform float u_swirl;
uniform float u_grainMixer;
uniform float u_grainOverlay;

in vec2 v_objectUV;
out vec4 fragColor;

${pe}
${ve}
${ue}

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

  for (int i = 0; i < ${He.maxColorCount}; i++) {
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
`,We=`#version 300 es
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

${ce}
${pe}
${se}
${ue}

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
`,Ge={simplex:1,warp:2,dots:3,wave:4,ripple:5,swirl:6,sphere:7},Ke={random:1,"2x2":2,"4x4":3,"8x8":4},qe=`#version 300 es
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

${pe}
${ve}
${me}
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

${ge}

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
`,Je=`#version 300 es
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

${pe}
${ve}
${ue}

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
`,Ye={lines:1,linesIrregular:2,wave:3,zigzag:4,pattern:5},Xe={prism:1,lens:2,contour:3,cascade:4,flat:5},Ze=`#version 300 es
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


${ue}
${pe}

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
`,Qe=`#version 300 es
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

${pe}
${ue}
${ve}

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
`,$e=`#version 300 es
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

${pe}
${ve}
${ue}

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
`,et={classic:0,gooey:1,holes:2,soft:3},tt={square:0,hex:1};function nt(e,t){if(Object.keys(e).length!==Object.keys(t).length)return!1;for(let n in e)if(n===`colors`){let n=Array.isArray(e.colors),r=Array.isArray(t.colors);if(!n||!r){if(Object.is(e.colors,t.colors)===!1)return!1;continue}if(e.colors?.length!==t.colors?.length||!e.colors?.every((e,n)=>e===t.colors?.[n]))return!1}else if(Object.is(e[n],t[n])===!1)return!1;return!0}var P={name:`Default`,params:{...O,speed:1,frame:0,colors:[`#e0eaff`,`#241d9a`,`#f75092`,`#9f50d3`],distortion:.8,swirl:.1,grainMixer:0,grainOverlay:0}};({...O}),{...O},{...O};var rt=(0,A.memo)(function({speed:e=P.params.speed,frame:t=P.params.frame,colors:n=P.params.colors,distortion:r=P.params.distortion,swirl:i=P.params.swirl,grainMixer:a=P.params.grainMixer,grainOverlay:o=P.params.grainOverlay,fit:s=P.params.fit,rotation:c=P.params.rotation,scale:l=P.params.scale,originX:u=P.params.originX,originY:d=P.params.originY,offsetX:f=P.params.offsetX,offsetY:p=P.params.offsetY,worldWidth:m=P.params.worldWidth,worldHeight:h=P.params.worldHeight,...g}){let _={u_colors:n.map(k),u_colorsCount:n.length,u_distortion:r,u_swirl:i,u_grainMixer:a,u_grainOverlay:o,u_fit:de[s],u_rotation:c,u_scale:l,u_offsetX:f,u_offsetY:p,u_originX:u,u_originY:d,u_worldWidth:m,u_worldHeight:h};return(0,j.jsx)(fe,{...g,speed:e,frame:t,fragmentShader:Ue,uniforms:_})},nt),F={name:`Default`,params:{...le,speed:1,frame:0,scale:.6,colorBack:`#000000`,colorFront:`#00b2ff`,shape:`sphere`,type:`4x4`,size:2}};({...le}),{...le},{...O},{...O},{...O};var it=(0,A.memo)(function({speed:e=F.params.speed,frame:t=F.params.frame,colorBack:n=F.params.colorBack,colorFront:r=F.params.colorFront,shape:i=F.params.shape,type:a=F.params.type,pxSize:o,size:s=o===void 0?F.params.size:o,fit:c=F.params.fit,scale:l=F.params.scale,rotation:u=F.params.rotation,originX:d=F.params.originX,originY:f=F.params.originY,offsetX:p=F.params.offsetX,offsetY:m=F.params.offsetY,worldWidth:h=F.params.worldWidth,worldHeight:g=F.params.worldHeight,..._}){let v={u_colorBack:k(n),u_colorFront:k(r),u_shape:Ge[i],u_type:Ke[a],u_pxSize:s,u_fit:de[c],u_scale:l,u_rotation:u,u_offsetX:p,u_offsetY:m,u_originX:d,u_originY:f,u_worldWidth:h,u_worldHeight:g};return(0,j.jsx)(fe,{..._,speed:e,frame:t,fragmentShader:We,uniforms:v})}),I={name:`Default`,params:{...O,fit:`cover`,scale:.6,speed:0,frame:0,colorFront:`#9fadbc`,colorBack:`#ffffff`,contrast:.3,roughness:.4,fiber:.3,fiberSize:.2,crumples:.3,crumpleSize:.35,folds:.65,foldCount:5,fade:0,drops:.2,seed:5.8}};({...O}),{...O},{...O};var at=(0,A.memo)(function({speed:e=I.params.speed,frame:t=I.params.frame,colorFront:n=I.params.colorFront,colorBack:r=I.params.colorBack,image:i=``,contrast:a=I.params.contrast,roughness:o=I.params.roughness,fiber:s=I.params.fiber,crumples:c=I.params.crumples,folds:l=I.params.folds,drops:u=I.params.drops,seed:d=I.params.seed,fiberScale:f,fiberSize:p=f===void 0?I.params.fiberSize:.2/f,crumplesScale:m,crumpleSize:h=m===void 0?I.params.crumpleSize:.2/m,blur:g,fade:_=g===void 0?I.params.fade:g,foldsNumber:v,foldCount:y=v===void 0?I.params.foldCount:v,fit:b=I.params.fit,scale:x=I.params.scale,rotation:S=I.params.rotation,originX:C=I.params.originX,originY:w=I.params.originY,offsetX:T=I.params.offsetX,offsetY:ee=I.params.offsetY,worldWidth:te=I.params.worldWidth,worldHeight:ne=I.params.worldHeight,...re}){let ie=typeof window<`u`&&{u_noiseTexture:he()},ae={u_image:i,u_colorFront:k(n),u_colorBack:k(r),u_contrast:a,u_roughness:o,u_fiber:s,u_fiberSize:p,u_crumples:c,u_crumpleSize:h,u_foldCount:y,u_folds:l,u_fade:_,u_drops:u,u_seed:d,...ie,u_fit:de[b],u_scale:x,u_rotation:S,u_offsetX:T,u_offsetY:ee,u_originX:C,u_originY:w,u_worldWidth:te,u_worldHeight:ne};return(0,j.jsx)(fe,{...re,speed:e,frame:t,fragmentShader:qe,mipmaps:[`u_image`],uniforms:ae})},nt),L={name:`Default`,params:{...O,fit:`cover`,speed:0,frame:0,colorBack:`#00000000`,colorShadow:`#000000`,colorHighlight:`#ffffff`,shadows:.25,size:.5,angle:0,distortionShape:`prism`,highlights:.1,shape:`lines`,distortion:.5,shift:0,blur:0,edges:.25,stretch:0,margin:0,marginLeft:0,marginRight:0,marginTop:0,marginBottom:0,grainMixer:0,grainOverlay:0}};({...O}),{...O},{...O};var ot=(0,A.memo)(function({speed:e=L.params.speed,frame:t=L.params.frame,colorBack:n=L.params.colorBack,colorShadow:r=L.params.colorShadow,colorHighlight:i=L.params.colorHighlight,image:a=``,shadows:o=L.params.shadows,angle:s=L.params.angle,distortion:c=L.params.distortion,distortionShape:l=L.params.distortionShape,highlights:u=L.params.highlights,shape:d=L.params.shape,shift:f=L.params.shift,blur:p=L.params.blur,edges:m=L.params.edges,margin:h,marginLeft:g=h??L.params.marginLeft,marginRight:_=h??L.params.marginRight,marginTop:v=h??L.params.marginTop,marginBottom:y=h??L.params.marginBottom,grainMixer:b=L.params.grainMixer,grainOverlay:x=L.params.grainOverlay,stretch:S=L.params.stretch,count:C,size:w=C===void 0?L.params.size:(1/(C*1.6))**(1/6)/.7-.5,fit:T=L.params.fit,scale:ee=L.params.scale,rotation:te=L.params.rotation,originX:ne=L.params.originX,originY:re=L.params.originY,offsetX:ie=L.params.offsetX,offsetY:ae=L.params.offsetY,worldWidth:E=L.params.worldWidth,worldHeight:oe=L.params.worldHeight,...D}){let se={u_image:a,u_colorBack:k(n),u_colorShadow:k(r),u_colorHighlight:k(i),u_shadows:o,u_size:w,u_angle:s,u_distortion:c,u_shift:f,u_blur:p,u_edges:m,u_stretch:S,u_distortionShape:Xe[l],u_highlights:u,u_shape:Ye[d],u_marginLeft:g,u_marginRight:_,u_marginTop:v,u_marginBottom:y,u_grainMixer:b,u_grainOverlay:x,u_fit:de[T],u_scale:ee,u_rotation:te,u_offsetX:ie,u_offsetY:ae,u_originX:ne,u_originY:re,u_worldWidth:E,u_worldHeight:oe};return(0,j.jsx)(fe,{...D,speed:e,frame:t,fragmentShader:Je,mipmaps:[`u_image`],uniforms:se})}),R={name:`Default`,params:{...O,fit:`cover`,speed:0,frame:0,colorFront:`#94ffaf`,colorBack:`#000c38`,colorHighlight:`#eaff94`,type:`8x8`,size:2,colorSteps:2,originalColors:!1,inverted:!1}};({...O}),{...O},{...O};var st=(0,A.memo)(function({speed:e=R.params.speed,frame:t=R.params.frame,colorFront:n=R.params.colorFront,colorBack:r=R.params.colorBack,colorHighlight:i=R.params.colorHighlight,image:a=``,type:o=R.params.type,colorSteps:s=R.params.colorSteps,originalColors:c=R.params.originalColors,inverted:l=R.params.inverted,pxSize:u,size:d=u===void 0?R.params.size:u,fit:f=R.params.fit,scale:p=R.params.scale,rotation:m=R.params.rotation,originX:h=R.params.originX,originY:g=R.params.originY,offsetX:_=R.params.offsetX,offsetY:v=R.params.offsetY,worldWidth:y=R.params.worldWidth,worldHeight:b=R.params.worldHeight,...x}){let S={u_image:a,u_colorFront:k(n),u_colorBack:k(r),u_colorHighlight:k(i),u_type:Ke[o],u_pxSize:d,u_colorSteps:s,u_originalColors:c,u_inverted:l,u_fit:de[f],u_rotation:m,u_scale:p,u_offsetX:_,u_offsetY:v,u_originX:h,u_originY:g,u_worldWidth:y,u_worldHeight:b};return(0,j.jsx)(fe,{...x,speed:e,frame:t,fragmentShader:Ze,uniforms:S})},nt),z={name:`Default`,params:{...O,scale:1,fit:`contain`,speed:0,frame:0,spread:.6,bias:1,angle:0,perspective:.1,count:35,dispersion:1,dispersionShift:0,dispersionColor:.6,focusCenter:.8,focusEdges:1,swirl:.35,noise:0,noiseFrequency:.25,noiseOffset:0,lensBulge:0,lensCircle:0,grainMixer:0,grainOverlay:0,imageX:0,imageY:0}};({...O}),{...O},{...O};var ct=(0,A.memo)(function({speed:e=z.params.speed,frame:t=z.params.frame,image:n=``,spread:r=z.params.spread,bias:i=z.params.bias,angle:a=z.params.angle,perspective:o=z.params.perspective,count:s=z.params.count,dispersion:c=z.params.dispersion,dispersionShift:l=z.params.dispersionShift,dispersionColor:u=z.params.dispersionColor,focusCenter:d=z.params.focusCenter,focusEdges:f=z.params.focusEdges,swirl:p=z.params.swirl,noise:m=z.params.noise,noiseFrequency:h=z.params.noiseFrequency,noiseOffset:g=z.params.noiseOffset,lensBulge:_=z.params.lensBulge,lensCircle:v=z.params.lensCircle,grainMixer:y=z.params.grainMixer,grainOverlay:b=z.params.grainOverlay,imageX:x=z.params.imageX,imageY:S=z.params.imageY,fit:C=z.params.fit,scale:w=z.params.scale,rotation:T=z.params.rotation,originX:ee=z.params.originX,originY:te=z.params.originY,offsetX:ne=z.params.offsetX,offsetY:re=z.params.offsetY,worldWidth:ie=z.params.worldWidth,worldHeight:ae=z.params.worldHeight,...E}){let oe={u_image:n,u_spread:r,u_bias:i,u_angle:a,u_perspective:o,u_count:s,u_dispersion:c,u_dispersionShift:l,u_dispersionColor:u,u_focusCenter:d,u_focusEdges:f,u_swirl:p,u_noise:m,u_noiseFrequency:h,u_noiseOffset:g,u_lensBulge:_,u_lensCircle:v,u_grainMixer:y,u_grainOverlay:b,u_imageX:x,u_imageY:S,u_fit:de[C],u_rotation:T,u_scale:w,u_offsetX:ne,u_offsetY:re,u_originX:ee,u_originY:te,u_worldWidth:ie,u_worldHeight:ae};return(0,j.jsx)(fe,{...E,speed:e,frame:t,fragmentShader:Qe,mipmaps:[`u_image`],uniforms:oe})},nt),B={name:`Default`,params:{...O,fit:`cover`,speed:0,frame:0,colorBack:`#f2f1e8`,colorFront:`#2b2b2b`,size:.5,radius:1.25,contrast:.4,originalColors:!1,inverted:!1,grainMixer:.2,grainOverlay:.2,grainSize:.5,grid:`hex`,type:`gooey`}};({...O}),{...O},{...O};var lt=(0,A.memo)(function({speed:e=B.params.speed,frame:t=B.params.frame,colorFront:n=B.params.colorFront,colorBack:r=B.params.colorBack,image:i=``,size:a=B.params.size,radius:o=B.params.radius,contrast:s=B.params.contrast,originalColors:c=B.params.originalColors,inverted:l=B.params.inverted,grainMixer:u=B.params.grainMixer,grainOverlay:d=B.params.grainOverlay,grainSize:f=B.params.grainSize,grid:p=B.params.grid,type:m=B.params.type,fit:h=B.params.fit,scale:g=B.params.scale,rotation:_=B.params.rotation,originX:v=B.params.originX,originY:y=B.params.originY,offsetX:b=B.params.offsetX,offsetY:x=B.params.offsetY,worldWidth:S=B.params.worldWidth,worldHeight:C=B.params.worldHeight,...w}){let T={u_image:i,u_colorFront:k(n),u_colorBack:k(r),u_size:a,u_radius:o,u_contrast:s,u_originalColors:c,u_inverted:l,u_grainMixer:u,u_grainOverlay:d,u_grainSize:f,u_grid:tt[p],u_type:et[m],u_fit:de[h],u_rotation:_,u_scale:g,u_offsetX:b,u_offsetY:x,u_originX:v,u_originY:y,u_worldWidth:S,u_worldHeight:C};return(0,j.jsx)(fe,{...w,speed:e,frame:t,fragmentShader:$e,uniforms:T})},nt),ut=Object.freeze({antialias:!1,depth:!1}),dt=e=>(t=>{if(e.current=t,t)return()=>{e.current=null;let n=t.paperShaderMount?.canvasElement;if(!n)return;let r=n.getContext(`webgl2`);queueMicrotask(()=>{!r||n.isConnected||r.isContextLost()||r.getExtension(`WEBGL_lose_context`)?.loseContext()})}}),ft=921600,pt=.12,V=e=>Math.min(1,Math.max(0,e/255)),mt=e=>Math.min(2,Math.max(0,e)),ht=e=>Math.min(1,Math.max(0,e)),gt=(e,t,n)=>e+(t-e)*n,_t=(e,t,n,r,i)=>(V(e)*.22+V(t)*.18+V(n)*.22+V(r)*.28+V(i)*.1)**.55,vt=(e,t,n)=>Math.max(n*.84,ht((e-t)*7)),yt=(e,t)=>ht(e*.42+t*.85),bt=(e,t,n)=>n?yt(e,t):ht(e),xt=(e,t,n,r)=>mt(r?e*pt:gt(e,t,n)),St=(e,t,n)=>{let r=e[0]??t.secondaryColor;if(n===`cover-only`){let t=e[1]??r,n=e[2]??t;return{ditheringBack:n,ditheringFront:r,mesh:[r,t,n,e[3]??r,e[4]??t,e[5]??n]}}let i=e[1]??t.primaryColor,a=e[2]??r,o=e[3]??i;return{ditheringBack:t.backgroundColor,ditheringFront:r,mesh:[r,i,a,o,t.backgroundColor,t.accentColor]}},Ct=A.memo(({theme:e,coverUrl:t,audioPower:n,audioBands:r,staticMode:i,paused:a,tuning:o})=>{let s=(0,A.useRef)(null),c=(0,A.useRef)(null),l=(0,A.useMemo)(()=>dt(s),[]),u=(0,A.useMemo)(()=>dt(c),[]),d=(0,A.useRef)(null),f=(0,A.useRef)(null),p=(0,A.useRef)(a),[m,h]=(0,A.useState)([]),g=o??_,v=g.displayMode!==`mesh`,y=g.displayMode!==`dithering`;p.current=a,(0,A.useEffect)(()=>{let e=!0;return t?(ye(t,6).then(t=>{e&&h(t)}),()=>{e=!1}):(h([]),()=>{e=!1})},[t]);let b=(0,A.useMemo)(()=>St(m,e,g.colorSource),[m,e,g.colorSource]);return(0,A.useEffect)(()=>{let e=s.current?.paperShaderMount,t=c.current?.paperShaderMount;if(i){e?.setSpeed(0),t?.setSpeed(0);return}let a=0,o=new WeakMap,l=(e,t,n)=>{let r=o.get(e);r||(r={},o.set(e,r)),r[t]!==n&&(r[t]=n,e.style[t]=n)},u=0,m=0,h=0,_=0,v=0,b=0,x=()=>{let e=p.current,t=e?0:V(n.get()),i=e?0:V(r.bass.get()),o=e?0:_t(r.bass.get(),r.lowMid.get(),r.mid.get(),r.vocal.get(),r.treble.get()),S=e?0:V(Math.max(r.mid.get(),r.vocal.get()));u=gt(u,t,.12),m=gt(m,i,.16),h=gt(h,S,.13),b=g.enhancedBeatResponse?vt(o,v,b):0,v=o;let C=bt(o,b,g.enhancedBeatResponse);_=gt(_,C,C>_?.42:.14);let w=s.current?.paperShaderMount,T=c.current?.paperShaderMount;if(w){let t=xt(g.ditheringSpeed,g.ditheringAudioSpeed,_,e);w.setSpeed(t),_e(w,{u_pxSize:Math.max(.5,g.ditheringSize-m*g.ditheringSize*.34)},t!==0)}if(T){let t=xt(g.meshSpeed,g.meshAudioSpeed,_,e);T.setSpeed(t),_e(T,{u_distortion:g.meshDistortion+u*.62,u_swirl:g.meshSwirl+h*.38},t!==0)}d.current&&(l(d.current,`opacity`,y?`${Math.min(1,g.ditheringOpacity+m*.25)}`:`1`),l(d.current,`transform`,`scale(${1.015+m*.025})`)),f.current&&(l(f.current,`filter`,`saturate(${1.04+h*.34}) brightness(${.94+u*.16})`),l(f.current,`transform`,`scale(${1.025+u*.018})`)),a=requestAnimationFrame(x)};return a=requestAnimationFrame(x),()=>cancelAnimationFrame(a)},[r,n,y,i,g]),(0,j.jsxs)(`div`,{className:`absolute inset-0 z-0 overflow-hidden`,style:{backgroundColor:e.backgroundColor,pointerEvents:`none`},children:[y&&(0,j.jsx)(`div`,{ref:f,className:`absolute inset-0`,style:{transform:`scale(1.025)`,transformOrigin:`center`},children:(0,j.jsx)(rt,{ref:u,width:`100%`,height:`100%`,colors:b.mesh,distortion:g.meshDistortion,swirl:g.meshSwirl,grainMixer:0,grainOverlay:.01,speed:i?0:xt(g.meshSpeed,g.meshAudioSpeed,0,a),minPixelRatio:1,maxPixelCount:ft,webGlContextAttributes:ut,style:{width:`100%`,height:`100%`}})}),v&&(0,j.jsx)(`div`,{ref:d,className:`absolute inset-0`,style:{mixBlendMode:y?`soft-light`:`normal`,opacity:y?g.ditheringOpacity:1,transform:`scale(1.015)`,transformOrigin:`center`},children:(0,j.jsx)(it,{ref:l,width:`100%`,height:`100%`,colorBack:b.ditheringBack,colorFront:b.ditheringFront,shape:`warp`,type:`4x4`,size:g.ditheringSize,speed:i?0:xt(g.ditheringSpeed,g.ditheringAudioSpeed,0,a),minPixelRatio:1,maxPixelCount:ft,webGlContextAttributes:ut,style:{width:`100%`,height:`100%`}})}),g.overlayEnabled&&g.overlayOpacity>0&&(0,j.jsx)(`div`,{className:`absolute inset-0`,style:{backgroundColor:e.backgroundColor,opacity:g.overlayOpacity}})]})}),H=({label:e,value:t,min:n,max:r,step:i,format:a=e=>e.toFixed(1),rangeInputClass:o,theme:s,onChange:c,onPointerDown:l,onPointerUp:u,disabled:d=!1})=>(0,j.jsxs)(`label`,{className:`block space-y-2`,children:[(0,j.jsxs)(`span`,{className:`flex justify-between gap-3 text-sm`,style:{color:s.primaryColor},children:[(0,j.jsx)(`span`,{children:e}),(0,j.jsx)(`span`,{className:`font-mono opacity-70`,children:a(t)})]}),(0,j.jsx)(`input`,{type:`range`,min:n,max:r,step:i,value:t,disabled:d,onChange:e=>c(Number(e.target.value)),onPointerDown:l,onPointerUp:u,className:o})]}),wt=({t:e,isDaylight:t,theme:n,controlCardBg:r,rangeInputClass:i,tuning:a,onTuningChange:o,onSliderPointerDown:s,onSliderCommit:c})=>{let l=T(n.secondaryColor,t?.18:.16),u=T(n.accentColor,t?.1:.16),d=[[`dithering`,e(`options.latentDisplayDithering`)],[`mesh`,e(`options.latentDisplayMesh`)],[`both`,e(`options.latentDisplayBoth`)]],f=[[`cover-theme`,e(`options.latentColorSourceCoverTheme`)],[`cover-only`,e(`options.latentColorSourceCoverOnly`)]],p={rangeInputClass:i,theme:n,onPointerDown:s,onPointerUp:c};return(0,j.jsxs)(`div`,{className:`rounded-[24px] border p-4 space-y-5`,style:{backgroundColor:r,borderColor:l},children:[(0,j.jsxs)(`div`,{className:`space-y-1`,children:[(0,j.jsx)(`div`,{className:`text-sm font-medium`,style:{color:n.primaryColor},children:e(`options.latentBackgroundSettings`)}),(0,j.jsx)(`div`,{className:`text-xs opacity-70`,style:{color:n.secondaryColor},children:e(`options.latentBackgroundSettingsDesc`)})]}),(0,j.jsxs)(`div`,{className:`space-y-2`,children:[(0,j.jsx)(`div`,{className:`text-sm`,style:{color:n.primaryColor},children:e(`options.latentDisplayMode`)}),(0,j.jsx)(`div`,{className:`grid grid-cols-3 gap-2`,children:d.map(([e,t])=>(0,j.jsx)(`button`,{type:`button`,onClick:()=>o?.({displayMode:e}),className:`rounded-xl border px-2 py-2 text-xs`,style:{borderColor:a.displayMode===e?n.accentColor:l,backgroundColor:a.displayMode===e?u:`transparent`,color:n.primaryColor},children:t},e))})]}),(0,j.jsxs)(`div`,{className:`space-y-2`,children:[(0,j.jsx)(`div`,{className:`text-sm`,style:{color:n.primaryColor},children:e(`options.latentColorSource`)}),(0,j.jsx)(`div`,{className:`grid grid-cols-2 gap-2`,children:f.map(([e,t])=>(0,j.jsx)(`button`,{type:`button`,onClick:()=>o?.({colorSource:e}),className:`rounded-xl border px-2 py-2 text-xs`,style:{borderColor:a.colorSource===e?n.accentColor:l,backgroundColor:a.colorSource===e?u:`transparent`,color:n.primaryColor},children:t},e))})]}),(0,j.jsx)(M,{label:e(`options.latentDynamicOnlyInPlayer`),description:e(`options.latentDynamicOnlyInPlayerDesc`),checked:a.dynamicOnlyInPlayer,onChange:e=>o?.({dynamicOnlyInPlayer:e}),theme:n}),(0,j.jsx)(M,{label:e(`options.latentEnhancedBeatResponse`),description:e(`options.latentEnhancedBeatResponseDesc`),checked:a.enhancedBeatResponse,onChange:e=>o?.({enhancedBeatResponse:e}),theme:n}),(0,j.jsxs)(`div`,{className:`space-y-3 rounded-2xl border p-3`,style:{borderColor:l},children:[(0,j.jsx)(M,{label:e(`options.nomandBackgroundOverlay`),description:e(`options.nomandBackgroundOverlayDesc`),checked:a.overlayEnabled,onChange:e=>o?.({overlayEnabled:e}),theme:n}),(0,j.jsx)(`div`,{className:a.overlayEnabled?``:`opacity-45`,children:(0,j.jsx)(H,{...p,label:e(`options.nomandBackgroundOverlayOpacity`),value:a.overlayOpacity,disabled:!a.overlayEnabled,min:0,max:1,step:.05,format:e=>`${Math.round(e*100)}%`,onChange:e=>o?.({overlayOpacity:e})})})]}),(0,j.jsxs)(`div`,{className:`space-y-4 rounded-2xl border p-3`,style:{borderColor:l},children:[(0,j.jsx)(`div`,{className:`text-xs font-medium uppercase tracking-[0.2em]`,style:{color:n.secondaryColor},children:e(`options.latentDitheringGroup`)}),(0,j.jsx)(H,{...p,label:e(`options.latentBaseSpeed`),value:a.ditheringSpeed,min:0,max:2,step:.1,onChange:e=>o?.({ditheringSpeed:e})}),(0,j.jsx)(H,{...p,label:e(`options.latentAudioSpeed`),value:a.ditheringAudioSpeed,min:0,max:2,step:.1,onChange:e=>o?.({ditheringAudioSpeed:e})}),(0,j.jsx)(H,{...p,label:e(`options.latentDitheringSize`),value:a.ditheringSize,min:.5,max:8,step:.25,onChange:e=>o?.({ditheringSize:e})}),(0,j.jsx)(H,{...p,label:e(`options.latentDitheringOpacity`),value:a.ditheringOpacity,min:0,max:1,step:.05,format:e=>`${Math.round(e*100)}%`,onChange:e=>o?.({ditheringOpacity:e})})]}),(0,j.jsxs)(`div`,{className:`space-y-4 rounded-2xl border p-3`,style:{borderColor:l},children:[(0,j.jsx)(`div`,{className:`text-xs font-medium uppercase tracking-[0.2em]`,style:{color:n.secondaryColor},children:e(`options.latentMeshGroup`)}),(0,j.jsx)(H,{...p,label:e(`options.latentBaseSpeed`),value:a.meshSpeed,min:0,max:2,step:.1,onChange:e=>o?.({meshSpeed:e})}),(0,j.jsx)(H,{...p,label:e(`options.latentAudioSpeed`),value:a.meshAudioSpeed,min:0,max:2,step:.1,onChange:e=>o?.({meshAudioSpeed:e})}),(0,j.jsx)(H,{...p,label:e(`options.latentMeshDistortion`),value:a.meshDistortion,min:0,max:2,step:.05,onChange:e=>o?.({meshDistortion:e})}),(0,j.jsx)(H,{...p,label:e(`options.latentMeshSwirl`),value:a.meshSwirl,min:0,max:1,step:.05,onChange:e=>o?.({meshSwirl:e})})]})]})},Tt=e({default:()=>Ot}),Et=[`dithering`,`mesh`,`both`],Dt={dithering:`options.latentDisplayDithering`,mesh:`options.latentDisplayMesh`,both:`options.latentDisplayBoth`},Ot=xe({mode:`latent`,order:35,labelKey:`options.visualizerBackgroundModeLatent`,labelFallback:`Latent`,render:({config:e,theme:t,coverUrl:n,audioPower:r,audioBands:i,staticMode:a,paused:o})=>(0,j.jsx)(Ct,{theme:t,coverUrl:n,audioPower:r,audioBands:i,staticMode:a,paused:o,tuning:e?.latent?.tuning}),renderSettingsPanel:({config:e,actions:t,...n})=>(0,j.jsx)(wt,{...n,tuning:e?.latent?.tuning??_,onTuningChange:t?.latent?.onTuningChange}),renderQuickControls:({config:e,actions:t,t:n,isDaylight:i,theme:a})=>{let o=e?.latent?.tuning??_,s=n(Dt[o.displayMode]);return(0,j.jsxs)(j.Fragment,{children:[(0,j.jsx)(Se,{isDaylight:i,label:s,title:`${n(`options.latentDisplayMode`)}: ${s}`,onClick:()=>{let e=Et.indexOf(o.displayMode);t?.latent?.onTuningChange?.({displayMode:Et[(e+1)%Et.length]})}}),(0,j.jsx)(Ce,{active:o.overlayEnabled,theme:a,label:n(`options.nomandBackgroundOverlay`),onToggle:()=>t?.latent?.onTuningChange?.({overlayEnabled:!o.overlayEnabled}),children:(0,j.jsx)(r,{size:14})})]})},resetSettings:e=>e?.latent?.onResetTuning?.()}),kt=({children:e,theme:t})=>(0,j.jsx)(`div`,{className:`text-xs font-medium uppercase tracking-[0.24em] opacity-45`,style:{color:t.secondaryColor},children:e}),At=({label:e,value:t,options:n,onChange:r,isDaylight:i,theme:a})=>(0,j.jsxs)(`div`,{className:`space-y-2.5`,children:[(0,j.jsx)(kt,{theme:a,children:e}),(0,j.jsx)(`div`,{className:`flex flex-wrap gap-2`,children:n.map(e=>{let n=e.value===t;return(0,j.jsx)(`button`,{type:`button`,onClick:()=>{e.disabled||r(e.value)},disabled:e.disabled,className:`rounded-full border px-3 py-2 text-sm transition-all disabled:cursor-not-allowed disabled:opacity-45`,style:{color:e.disabled?T(a.secondaryColor,.72):a.primaryColor,borderColor:n?a.accentColor:T(a.secondaryColor,i?.18:.14),backgroundColor:n?T(a.accentColor,i?.1:.16):T(a.backgroundColor,i?.24:.34),boxShadow:n?`inset 0 0 0 1px ${a.accentColor}`:`none`},children:e.label},String(e.value))})})]}),U=({label:e,valueLabel:t,value:n,min:r,max:i,step:a,onChange:o,rangeInputClass:s,onSliderPointerDown:c,onSliderCommit:l})=>(0,j.jsxs)(`div`,{className:`space-y-2`,children:[(0,j.jsxs)(`div`,{className:`flex items-center justify-between gap-3 text-sm`,style:{color:`var(--text-primary)`},children:[(0,j.jsx)(`span`,{children:e}),(0,j.jsx)(`span`,{className:`font-mono opacity-70`,style:{color:`var(--text-secondary)`},children:t})]}),(0,j.jsx)(`input`,{type:`range`,min:r,max:i,step:a,value:n,onChange:e=>o(parseFloat(e.target.value)),onPointerDown:c,onPointerUp:l,onPointerCancel:l,onBlur:l,className:s})]}),jt=(e,t,n,r)=>Number.isFinite(e)?Math.min(n,Math.max(t,e)):r,Mt=e=>{let t=e.trim().replace(/^#/,``);return/^[0-9a-fA-F]{6}$/.test(t)?`#${t.toLowerCase()}`:null},Nt=({t:e,isDaylight:t,theme:n,controlCardBg:r,rangeInputClass:i,tuning:o=g,onTuningChange:c,monetBackgroundImage:l,onUploadMonetBackgroundImage:u,onClearMonetBackgroundImage:d,isLoadingMonetBackgroundImage:f=!1,onSliderPointerDown:p,onSliderCommit:m})=>{let h=(0,A.useRef)(null),[_,v]=(0,A.useState)(null),y={backgroundSource:o.backgroundSource??g.backgroundSource,backgroundLayout:o.backgroundLayout??g.backgroundLayout,backgroundBlurPx:jt(o.backgroundBlurPx??g.backgroundBlurPx,0,60,g.backgroundBlurPx),backgroundOverlayOpacity:jt(o.backgroundOverlayOpacity??g.backgroundOverlayOpacity,0,1,g.backgroundOverlayOpacity),backgroundGrayscale:jt(o.backgroundGrayscale??g.backgroundGrayscale,0,1,g.backgroundGrayscale),backgroundSaturation:jt(o.backgroundSaturation??g.backgroundSaturation,0,2,g.backgroundSaturation),backgroundWash:jt(o.backgroundWash??g.backgroundWash,0,1,g.backgroundWash),backgroundHalfPaneOffsetX:jt(o.backgroundHalfPaneOffsetX??g.backgroundHalfPaneOffsetX,-40,40,g.backgroundHalfPaneOffsetX),backgroundWashColorMode:o.backgroundWashColorMode??g.backgroundWashColorMode,backgroundWashCustomColor:Mt(o.backgroundWashCustomColor)??g.backgroundWashCustomColor,backgroundDriftEnabled:o.backgroundDriftEnabled??g.backgroundDriftEnabled,backgroundDriftStrength:jt(o.backgroundDriftStrength??g.backgroundDriftStrength,0,1,g.backgroundDriftStrength),backgroundStreaksEnabled:o.backgroundStreaksEnabled??g.backgroundStreaksEnabled},b=(0,A.useMemo)(()=>[{value:`cover-derived`,label:e(`options.monetBackgroundSourceCover`)},{value:`uploaded-global`,label:e(`options.monetBackgroundSourceUploaded`),disabled:!l&&!f}],[f,l,e]),x=(0,A.useMemo)(()=>[{value:`half-pane-gradient`,label:e(`options.monetLayoutHalfPane`)},{value:`full-overlay`,label:e(`options.monetLayoutFullOverlay`)}],[e]),S=(0,A.useMemo)(()=>[{value:`theme`,label:e(`options.monetBackgroundWashTheme`)},{value:`custom`,label:e(`options.monetBackgroundWashCustom`)}],[e]),C=async t=>{let n=Array.from(t.target.files??[]);if(t.target.value=``,v(null),!n.length||!u)return;let r=await u(n);r.ok?(c?.({backgroundSource:`uploaded-global`}),v(n[0].name)):v(r.error||e(`options.monetUploadBackground`))};return(0,j.jsxs)(`div`,{className:`rounded-[24px] border p-4 space-y-4`,style:{backgroundColor:r,borderColor:T(n.secondaryColor,.16)},children:[(0,j.jsxs)(`div`,{className:`space-y-1`,children:[(0,j.jsx)(`div`,{className:`text-sm font-medium`,style:{color:n.primaryColor},children:e(`options.monetBackgroundSettings`)}),(0,j.jsx)(`div`,{className:`text-xs opacity-70`,style:{color:n.secondaryColor},children:e(`options.monetBackgroundSettingsDesc`)})]}),(0,j.jsxs)(`div`,{className:`space-y-3.5 rounded-[18px] border border-white/5 p-3.5 bg-black/5 dark:bg-white/5`,children:[(0,j.jsx)(`div`,{className:`text-xs font-semibold uppercase tracking-wider opacity-65`,style:{color:n.accentColor},children:e(`options.monetGroupBackgroundSource`)}),(0,j.jsx)(At,{label:e(`options.monetBackgroundSource`),value:y.backgroundSource,options:b,onChange:e=>c?.({backgroundSource:e}),isDaylight:t,theme:n}),(0,j.jsxs)(`div`,{className:`space-y-2.5`,children:[(0,j.jsx)(kt,{theme:n,children:e(`options.monetUploadBackground`)}),(0,j.jsxs)(`div`,{className:`flex flex-wrap items-center gap-2`,children:[(0,j.jsxs)(`button`,{type:`button`,onClick:()=>h.current?.click(),disabled:f||!u,className:`inline-flex items-center gap-2 rounded-full border px-3 py-2 text-sm transition-all disabled:cursor-not-allowed disabled:opacity-45`,style:{color:n.primaryColor,borderColor:T(n.secondaryColor,t?.18:.14),backgroundColor:T(n.backgroundColor,t?.24:.34)},children:[(0,j.jsx)(s,{size:15}),(0,j.jsx)(`span`,{children:e(`options.monetUploadBackground`)})]}),(0,j.jsxs)(`button`,{type:`button`,onClick:()=>void d?.(),disabled:!l||!d,className:`inline-flex items-center gap-2 rounded-full border px-3 py-2 text-sm transition-all disabled:cursor-not-allowed disabled:opacity-45`,style:{color:n.primaryColor,borderColor:T(n.secondaryColor,t?.18:.14),backgroundColor:T(n.backgroundColor,t?.24:.34)},children:[(0,j.jsx)(a,{size:15}),(0,j.jsx)(`span`,{children:e(`options.monetClearBackground`)})]})]}),(0,j.jsx)(`div`,{className:`text-xs opacity-60`,style:{color:`var(--text-secondary)`},children:_||l?.name||`-`}),(0,j.jsx)(`input`,{ref:h,type:`file`,accept:`.png,.jpg,.jpeg,.gif,.webp,.svg,image/*`,className:`hidden`,onChange:e=>void C(e)})]})]}),(0,j.jsxs)(`div`,{className:`space-y-3.5 rounded-[18px] border border-white/5 p-3.5 bg-black/5 dark:bg-white/5`,children:[(0,j.jsx)(`div`,{className:`text-xs font-semibold uppercase tracking-wider opacity-65`,style:{color:n.accentColor},children:e(`options.monetGroupLayoutPosition`)}),(0,j.jsx)(At,{label:e(`options.monetBackgroundLayout`),value:y.backgroundLayout,options:x,onChange:e=>c?.({backgroundLayout:e}),isDaylight:t,theme:n}),y.backgroundLayout===`half-pane-gradient`&&(0,j.jsx)(U,{label:e(`options.monetHalfPaneOffsetX`),valueLabel:`${Math.round(y.backgroundHalfPaneOffsetX)}%`,min:-40,max:40,step:2,value:y.backgroundHalfPaneOffsetX,onChange:e=>c?.({backgroundHalfPaneOffsetX:e}),rangeInputClass:i,onSliderPointerDown:p,onSliderCommit:m}),(0,j.jsx)(M,{label:e(`options.monetBackgroundDriftEnabled`),description:e(`options.monetBackgroundDriftEnabledDesc`),checked:y.backgroundDriftEnabled,onChange:e=>c?.({backgroundDriftEnabled:e}),theme:n}),y.backgroundDriftEnabled&&(0,j.jsx)(U,{label:e(`options.monetBackgroundDriftStrength`),valueLabel:`${Math.round(y.backgroundDriftStrength*100)}%`,min:0,max:1,step:.05,value:y.backgroundDriftStrength,onChange:e=>c?.({backgroundDriftStrength:e}),rangeInputClass:i,onSliderPointerDown:p,onSliderCommit:m})]}),(0,j.jsxs)(`div`,{className:`space-y-3.5 rounded-[18px] border border-white/5 p-3.5 bg-black/5 dark:bg-white/5`,children:[(0,j.jsx)(`div`,{className:`text-xs font-semibold uppercase tracking-wider opacity-65`,style:{color:n.accentColor},children:e(`options.monetGroupFiltersPostProcessing`)}),(0,j.jsx)(U,{label:e(`options.monetBackgroundBlur`),valueLabel:`${Math.round(y.backgroundBlurPx)}px`,min:0,max:60,step:2,value:y.backgroundBlurPx,onChange:e=>c?.({backgroundBlurPx:e}),rangeInputClass:i,onSliderPointerDown:p,onSliderCommit:m}),(0,j.jsx)(U,{label:e(`options.monetBackgroundSaturation`),valueLabel:`${Math.round(y.backgroundSaturation*100)}%`,min:0,max:2,step:.05,value:y.backgroundSaturation,onChange:e=>c?.({backgroundSaturation:e}),rangeInputClass:i,onSliderPointerDown:p,onSliderCommit:m}),(0,j.jsx)(U,{label:e(`options.monetBackgroundGrayscale`),valueLabel:`${Math.round(y.backgroundGrayscale*100)}%`,min:0,max:1,step:.02,value:y.backgroundGrayscale,onChange:e=>c?.({backgroundGrayscale:e}),rangeInputClass:i,onSliderPointerDown:p,onSliderCommit:m})]}),(0,j.jsxs)(`div`,{className:`space-y-3.5 rounded-[18px] border border-white/5 p-3.5 bg-black/5 dark:bg-white/5`,children:[(0,j.jsx)(`div`,{className:`text-xs font-semibold uppercase tracking-wider opacity-65`,style:{color:n.accentColor},children:e(`options.monetGroupColorTintWash`)}),(0,j.jsx)(U,{label:e(`options.monetBackgroundOverlayOpacity`),valueLabel:`${Math.round(y.backgroundOverlayOpacity*100)}%`,min:0,max:1,step:.02,value:y.backgroundOverlayOpacity,onChange:e=>c?.({backgroundOverlayOpacity:e}),rangeInputClass:i,onSliderPointerDown:p,onSliderCommit:m}),(0,j.jsx)(U,{label:e(`options.monetBackgroundWash`),valueLabel:`${Math.round(y.backgroundWash*100)}%`,min:0,max:1,step:.02,value:y.backgroundWash,onChange:e=>c?.({backgroundWash:e}),rangeInputClass:i,onSliderPointerDown:p,onSliderCommit:m}),(0,j.jsx)(M,{label:e(`options.monetBackgroundStreaksEnabled`),description:e(`options.monetBackgroundStreaksEnabledDesc`),checked:y.backgroundStreaksEnabled,onChange:e=>c?.({backgroundStreaksEnabled:e}),theme:n}),(0,j.jsx)(At,{label:e(`options.monetBackgroundWashColorMode`),value:y.backgroundWashColorMode,options:S,onChange:e=>c?.({backgroundWashColorMode:e}),isDaylight:t,theme:n}),y.backgroundWashColorMode===`custom`&&(0,j.jsxs)(`div`,{className:`space-y-3 rounded-[20px] border p-3`,style:{borderColor:T(n.secondaryColor,.14),backgroundColor:T(n.backgroundColor,.2)},children:[(0,j.jsxs)(`div`,{className:`flex items-center justify-between gap-3`,children:[(0,j.jsx)(`div`,{className:`text-sm`,style:{color:n.primaryColor},children:e(`options.monetBackgroundWashCustomColor`)}),(0,j.jsx)(`div`,{className:`rounded-full px-3 py-1 text-xs font-mono`,style:{color:n.backgroundColor,backgroundColor:y.backgroundWashCustomColor},children:y.backgroundWashCustomColor.toUpperCase()})]}),(0,j.jsx)(be,{color:y.backgroundWashCustomColor,onChange:e=>c?.({backgroundWashCustomColor:e}),style:{width:`100%`,height:180}})]})]})]})},Pt=1920,Ft=1080,It=new Map,Lt={r:10,g:10,b:12},Rt={r:245,g:245,b:245},W=(e,t,n)=>Math.min(n,Math.max(t,e)),G=(e,t,n)=>e+(t-e)*n,zt=(e,t,n)=>.2126*e+.7152*t+.0722*n,Bt=(e,t)=>zt(e.r,e.g,e.b)<=zt(t.r,t.g,t.b)?{shadow:e,highlight:t}:{shadow:t,highlight:e},Vt=({coverUrl:e,monetBackgroundImage:t,tuning:n})=>n.backgroundSource===`uploaded-global`?t?.url??e??null:e??t?.url??null,Ht=async e=>{let t=new Image;(e.startsWith(`http://`)||e.startsWith(`https://`))&&(t.crossOrigin=`anonymous`),t.decoding=`async`;let n=new Promise((n,r)=>{t.onload=()=>n(),t.onerror=()=>r(Error(`Failed to load image: ${e}`))});t.src=e;try{await t.decode()}catch{await n}return t},Ut=(e,t,n)=>{let r=e[t];return typeof r==`number`&&Number.isFinite(r)?r:n},Wt=(e,t,n,r)=>{let i=Ut(t,`width`,n),a=Ut(t,`height`,r);if(!i||!a)return;let o=Math.max(n/i,r/a),s=i*o,c=a*o,l=(n-s)/2,u=(r-c)/2;e.drawImage(t,l,u,s,c)},Gt=(e,t)=>{let n=w(e);return n?{r:W(n.r,0,255),g:W(n.g,0,255),b:W(n.b,0,255)}:t},Kt=(e,t,n,r)=>{let{shadow:i,highlight:a}=Bt(t,r);if(e<=.55){let t=e/.55;return{r:G(i.r,n.r,t),g:G(i.g,n.g,t),b:G(i.b,n.b,t)}}let o=(e-.55)/.45;return{r:G(n.r,a.r,o),g:G(n.g,a.g,o),b:G(n.b,a.b,o)}},qt=(e,t,n,r,i)=>{let a=W(i.backgroundGrayscale,0,1),o=W(i.backgroundSaturation,0,2),s=W(i.backgroundWash,0,1);if(a<=0&&Math.abs(o-1)<.001&&s<=0)return;let c=e.getImageData(0,0,t,n),l=c.data,u=Gt(r.backgroundColor,Lt),d=Gt(r.accentColor,u),f=Gt(r.primaryColor,Rt),p=Gt(i.backgroundWashCustomColor,d),m=i.backgroundWashColorMode===`custom`?p:d;for(let e=0;e<l.length;e+=4){let t=l[e],n=l[e+1],r=l[e+2];if(l[e+3]===0)continue;let i=zt(t,n,r);if(a>0&&(t=G(t,i,a),n=G(n,i,a),r=G(r,i,a)),Math.abs(o-1)>=.001){let e=zt(t,n,r);t=e+(t-e)*o,n=e+(n-e)*o,r=e+(r-e)*o}if(s>0){let e=Kt(W(i/255,0,1),u,m,f);t=G(t,e.r,s),n=G(n,e.g,s),r=G(r,e.b,s)}l[e]=Math.round(W(t,0,255)),l[e+1]=Math.round(W(n,0,255)),l[e+2]=Math.round(W(r,0,255))}e.putImageData(c,0,0)},Jt=(e,t,n,r,i)=>{let a=W(i.backgroundOverlayOpacity,0,1),o=e.createLinearGradient(0,0,t,n);o.addColorStop(0,T(r.accentColor,.08+a*.62)),o.addColorStop(.44,T(r.backgroundColor,.16+a*.58)),o.addColorStop(1,T(r.primaryColor,.06+a*.36)),e.fillStyle=o,e.fillRect(0,0,t,n);let s=e.createRadialGradient(t*.18,n*.34,0,t*.18,n*.34,t*.55);s.addColorStop(0,T(r.accentColor,a*.42)),s.addColorStop(1,T(r.backgroundColor,0)),e.fillStyle=s,e.fillRect(0,0,t,n);let c=e.createLinearGradient(t*.45,0,t,0);if(c.addColorStop(0,T(r.backgroundColor,0)),c.addColorStop(1,T(r.backgroundColor,.18+a*.38)),e.fillStyle=c,e.fillRect(0,0,t,n),i.backgroundStreaksEnabled!==!1){e.fillStyle=T(r.backgroundColor,.1+a*.08);for(let r=0;r<18;r+=1){let i=r*127%t,a=r*211%n-40;e.fillRect(i,a,1,n*.28)}}},Yt=({coverUrl:e,monetBackgroundImage:t,theme:n,tuning:r})=>JSON.stringify({sourceUrl:Vt({coverUrl:e,monetBackgroundImage:t,tuning:r}),uploadedId:r.backgroundSource===`uploaded-global`?t?.id??null:null,theme:{backgroundColor:n.backgroundColor,primaryColor:n.primaryColor,accentColor:n.accentColor},tuning:{backgroundSource:r.backgroundSource,backgroundBlurPx:r.backgroundBlurPx,backgroundOverlayOpacity:r.backgroundOverlayOpacity,backgroundGrayscale:r.backgroundGrayscale,backgroundSaturation:r.backgroundSaturation,backgroundWash:r.backgroundWash,backgroundWashColorMode:r.backgroundWashColorMode,backgroundWashCustomColor:r.backgroundWashCustomColor,backgroundStreaksEnabled:r.backgroundStreaksEnabled}}),Xt=null,Zt=()=>{if(Xt!==null)return Xt;if(typeof document>`u`)return!1;try{let e=document.createElement(`canvas`);e.width=2,e.height=2;let t=e.getContext(`2d`);return!t||typeof t.filter!=`string`?(Xt=!1,!1):(t.fillStyle=`#000000`,t.fillRect(0,0,2,2),t.filter=`blur(1px)`,t.fillStyle=`#ffffff`,t.fillRect(0,0,1,1),Xt=t.getImageData(1,1,1,1).data[0]>0,Xt)}catch{return Xt=!1,!1}},Qt=async({coverUrl:e,monetBackgroundImage:t,theme:n,tuning:r})=>{let i=Vt({coverUrl:e,monetBackgroundImage:t,tuning:r});if(!i)return null;let a=await Ht(i),o=document.createElement(`canvas`);o.width=Pt,o.height=Ft;let s=o.getContext(`2d`);return s?(s.fillStyle=n.backgroundColor,s.fillRect(0,0,o.width,o.height),s.save(),Zt()&&(s.filter=`blur(${W(r.backgroundBlurPx,0,60)}px)`),Wt(s,a,o.width,o.height),s.restore(),qt(s,o.width,o.height,n,r),Jt(s,o.width,o.height,n,r),o.toDataURL(`image/jpeg`,.92)):null},$t=e=>{let t=Yt(e),n=It.get(t);if(n)return n;let r=Qt(e).catch(()=>null);return It.set(t,r),r},en=240,tn=76,nn=156,rn=3.4,an=.035,on=.01,sn=12.9898,cn=78.233,ln=39.425,un=(e,t)=>(e%t+t)%t,dn=(e,t)=>{let n=Math.sin(e*127.1+t*311.7)*43758.5453;return n-Math.floor(n)},fn=e=>e*e*(3-2*e),pn=(e,t,n)=>{let r=Math.floor(e),i=dn(un(r,t),n);return i+(dn(un(r+1,t),n)-i)*fn(e-r)},mn=(e,t)=>{let n=pn(e,tn,t),r=pn(e*2,152,t+17.31);return(n*.68+r*.32)*2-1},hn=e=>{let t=e.reduce((e,t)=>Math.max(e,Math.abs(t)),0);return t>0?e.map(e=>e/t):e},gn=e=>{let t=Math.min(1,Math.max(0,e)),n=rn*t,r=1+n/100*2+on,i=an*t,a=[],o=[],s=[];for(let e=0;e<=nn;e+=1){let t=tn*e/nn;a.push(mn(t,sn)),o.push(mn(t,cn)),s.push(mn(t,ln))}let c=hn(a),l=hn(o),u=hn(s);return{keyframes:c.map((e,t)=>({transform:`translate3d(${(e*n).toFixed(4)}%, ${(l[t]*n).toFixed(4)}%, 0) scale(${(r+i*((u[t]+1)/2)).toFixed(5)})`})),durationMs:en*1e3,maxTravelPercent:n,minScale:r}},_n=180,vn=(e,t,n)=>Math.min(n,Math.max(t,e)),yn=(e,t,n,r)=>{(0,A.useEffect)(()=>{let i=e.current;if(!i||!t||n<=0||typeof i.animate!=`function`||r)return;let a=gn(n),o=i.animate(a.keyframes,{duration:a.durationMs,iterations:1/0,easing:`linear`});return()=>o.cancel()},[t,e,n,r])},bn=(e,t,n)=>n.backgroundSource===`uploaded-global`?t?.url??e??null:e??t?.url??null,xn=({coverUrl:e,monetBackgroundImage:t,theme:n,isDaylight:r=!1,tuning:i=g,transparentBackground:a=!1,staticMode:o=!1})=>{let[s,c]=(0,A.useState)(null),l=bn(e,t,i),u=(0,A.useMemo)(()=>`linear-gradient(135deg, ${T(n.accentColor,.22)}, ${T(n.backgroundColor,.96)} 50%, ${T(n.primaryColor,.18)})`,[n]),d=(0,A.useMemo)(()=>`linear-gradient(90deg, ${T(n.backgroundColor,.18)} 0%, ${T(n.backgroundColor,.32)} 34%, ${T(n.backgroundColor,.66)} 70%, ${T(n.backgroundColor,.82)} 100%)`,[n]),f=(0,A.useMemo)(()=>Yt({coverUrl:e,monetBackgroundImage:t,theme:n,tuning:i}),[e,t,n,i]);(0,A.useEffect)(()=>{let r=!1,o;return!l||a?(c(null),()=>{r=!0}):(o=window.setTimeout(()=>{$t({coverUrl:e,monetBackgroundImage:t,theme:n,tuning:i}).then(e=>{r||c(t=>t===e?t:e)})},_n),()=>{r=!0,o!==void 0&&window.clearTimeout(o)})},[f,l,a]);let p=(0,A.useRef)(null),m=vn(i.backgroundDriftStrength??0,0,1),h=!!i.backgroundDriftEnabled&&!o&&m>0;yn(p,h,m,C(`monetBackground`));let _=(0,A.useMemo)(()=>h?{willChange:`transform`}:void 0,[h]),v=(0,A.useMemo)(()=>Zt(),[])?0:i.backgroundBlurPx,b=(0,A.useMemo)(()=>v<=0?{}:{filter:`blur(${v}px)`,WebkitFilter:`blur(${v}px)`,transform:`scale(1.1) translateZ(0)`},[v]);if(a)return null;let x=s?`url(${s})`:l?`linear-gradient(135deg, ${T(n.accentColor,.2)}, ${T(n.backgroundColor,.78)}), url(${l})`:u;if(i.backgroundLayout===`full-overlay`)return(0,j.jsxs)(`div`,{className:`absolute inset-0 z-0 overflow-hidden`,children:[(0,j.jsx)(`div`,{ref:p,className:`absolute inset-0`,style:_,children:(0,j.jsx)(S,{initial:!1,children:(0,j.jsx)(y.div,{initial:{opacity:0},animate:{opacity:1},exit:{opacity:0},transition:{duration:.8,ease:`easeInOut`},className:`absolute inset-0`,style:{backgroundColor:n.backgroundColor,backgroundImage:x,backgroundSize:`cover`,backgroundPosition:`center`,...b}},s||l||`fallback`)})}),(0,j.jsx)(`div`,{className:`absolute inset-0`,style:{background:d}})]});let w=(r?.7:.3)+vn(i.backgroundOverlayOpacity,0,1)*.16,ee=vn(50+i.backgroundHalfPaneOffsetX,10,90);return(0,j.jsxs)(`div`,{className:`absolute inset-0 z-0 overflow-hidden`,children:[(0,j.jsx)(`div`,{className:`absolute inset-0`,style:{backgroundColor:n.backgroundColor,backgroundImage:u}}),(0,j.jsx)(S,{initial:!1,children:s||l?(0,j.jsx)(`div`,{className:`absolute inset-y-0 left-0 w-[72%] sm:w-[68%] lg:w-[60%] overflow-hidden`,style:{WebkitMaskImage:`linear-gradient(90deg, rgba(0,0,0,1) 0%, rgba(0,0,0,0.94) 48%, rgba(0,0,0,0.46) 74%, rgba(0,0,0,0) 100%)`,maskImage:`linear-gradient(90deg, rgba(0,0,0,1) 0%, rgba(0,0,0,0.94) 48%, rgba(0,0,0,0.46) 74%, rgba(0,0,0,0) 100%)`},children:(0,j.jsx)(`div`,{ref:p,className:`absolute inset-0`,style:_,children:(0,j.jsx)(y.div,{initial:{opacity:0},animate:{opacity:w},exit:{opacity:0},transition:{duration:.8,ease:`easeInOut`},className:`absolute inset-0`,style:{backgroundImage:x,backgroundRepeat:`no-repeat`,backgroundSize:`cover`,backgroundPosition:`${ee}% center`,...b}},s||l||`fallback`)})}):null}),(0,j.jsx)(`div`,{className:`absolute inset-0`,style:{background:`linear-gradient(90deg, ${T(n.backgroundColor,.14)} 0%, ${T(n.backgroundColor,.28)} 28%, ${T(n.backgroundColor,.62)} 64%, ${T(n.backgroundColor,.86)} 100%)`}}),(0,j.jsx)(`div`,{className:`absolute inset-0`,style:{backgroundImage:`radial-gradient(circle at 18% 34%, ${T(n.accentColor,.18)}, transparent 36%)`,backgroundSize:`cover`,backgroundPosition:`center`}}),(0,j.jsx)(`div`,{className:`absolute inset-0`,style:{background:d}})]})},Sn=e({default:()=>Cn}),Cn=xe({mode:`monet`,order:20,labelKey:`options.visualizerBackgroundModeMonet`,labelFallback:`Monet`,render:({config:e,coverUrl:t,theme:n,isDaylight:r,staticMode:i})=>(0,j.jsx)(xn,{coverUrl:t,monetBackgroundImage:e?.customImage,theme:n,isDaylight:r,tuning:e?.monet?.tuning,transparentBackground:e?.transparent,staticMode:i}),renderSettingsPanel:({config:e,actions:t,t:n,isDaylight:r,theme:i,controlCardBg:a,rangeInputClass:o,onSliderPointerDown:s,onSliderCommit:c})=>(0,j.jsx)(Nt,{t:n,isDaylight:r,theme:i,controlCardBg:a,rangeInputClass:o,tuning:e?.monet?.tuning??g,onTuningChange:t?.monet?.onTuningChange,monetBackgroundImage:e?.customImage,onUploadMonetBackgroundImage:t?.customImage?.onUpload,onClearMonetBackgroundImage:t?.customImage?.onClear,isLoadingMonetBackgroundImage:t?.customImage?.isLoading,onSliderPointerDown:s,onSliderCommit:c}),renderQuickControls:({config:e,actions:t,t:n,isDaylight:r})=>{let i=(e?.monet?.tuning??g).backgroundLayout===`full-overlay`,a=n(i?`options.monetLayoutFullOverlay`:`options.monetLayoutHalfPane`);return(0,j.jsx)(Se,{isDaylight:r,label:a,title:`${n(`options.monetBackgroundLayout`)}: ${a}`,onClick:()=>t?.monet?.onTuningChange?.({backgroundLayout:i?`half-pane-gradient`:`full-overlay`})})},resetSettings:e=>e?.monet?.onResetTuning?.()}),wn=1.8,Tn=.01,En=16/9,Dn={fiberSize:.2,crumples:.35,crumpleSize:.35,folds:.65,foldCount:5,drops:.2,seed:5.8},On={perspective:.4,count:20,focusCenter:.55,focusEdges:.8,swirl:.08,lensCircle:.1},kn=e=>Math.min(1,Math.max(0,e)),An=e=>Math.min(wn,Math.max(1,e)),jn=e=>e<=1?1:An(e+Tn),Mn=e=>jn(1/(1-2*Math.min(Math.max(e,0),.45))),Nn=(e,t,n)=>n&&!t?!e:e,Pn=(e,t,n)=>Nn(!e,t,n),Fn=(e,t)=>{let{folds:n,crumples:r,drops:i}=Dn;return Mn(.02*(2*n+1.5*r+.2*i+.75*kn(e)+.1*kn(t)))},In=(e,t)=>{let n=.5*Math.hypot(En,1),r=kn(t),i=.7*r**(1.3+2.7*r)*(1-On.focusEdges),a=Math.max(.35,1-i/n);if(e<=0)return jn(1/a);let o=Math.min(e,1)*1.4,s=e=>{let t=2*n/e;return Math.tan(t*o)/Math.tan(o)/t},c=Math.max(1,2*n*o/1.45);if(c>=wn||s(wn)>wn*a)return wn;if(c===1&&s(1)<=a)return jn(1/a);let l=wn;for(let e=0;e<32;e+=1){let e=(c+l)/2;s(e)>e*a?c=e:l=e}return jn(l)},Ln=A.memo(({coverUrl:e,monetBackgroundImage:t,tuning:n,theme:r,isDaylight:i})=>{let a={...m,...n},o=a.imageSource===`uploaded-global`?t?.url??e:e??t?.url;return o?(0,j.jsxs)(`div`,{className:`absolute inset-0 z-0 overflow-hidden`,style:{backgroundColor:r.backgroundColor,pointerEvents:`none`},children:[(()=>{let e={width:`100%`,height:`100%`,image:o,fit:`cover`,minPixelRatio:1,maxPixelCount:2073600,style:{width:`100%`,height:`100%`}};switch(a.effect){case`fluted-glass`:return(0,j.jsx)(ot,{...e,colorBack:r.backgroundColor,colorShadow:r.secondaryColor,colorHighlight:r.primaryColor,shadows:.25,size:a.flutedGlassSize,distortion:a.flutedGlassDistortion,blur:a.flutedGlassBlur,shape:`lines`,distortionShape:`prism`,highlights:.1,edges:.25},`${o}:fluted-glass`);case`paper-texture`:return(0,j.jsx)(at,{...e,...Dn,colorFront:r.accentColor,colorBack:r.backgroundColor,contrast:a.paperTextureContrast,roughness:a.paperTextureRoughness,fiber:a.paperTextureFiber,scale:Fn(a.paperTextureRoughness,a.paperTextureFiber)},`${o}:paper-texture`);case`halftone-dots`:return(0,j.jsx)(lt,{...e,colorBack:r.backgroundColor,colorFront:r.accentColor,size:a.halftoneDotsSize,radius:a.halftoneDotsRadius,contrast:a.halftoneDotsContrast,originalColors:a.halftoneDotsOriginalColors,inverted:Pn(a.halftoneDotsInverted,a.halftoneDotsOriginalColors,i),grid:`hex`,type:`gooey`,grainMixer:.12,grainOverlay:.06,grainSize:.5},`${o}:halftone-dots`);case`lens-distortion`:return(0,j.jsx)(ct,{...e,...On,spread:a.lensDistortionSpread,dispersion:a.lensDistortionDispersion,lensBulge:a.lensDistortionBulge,scale:In(a.lensDistortionBulge,a.lensDistortionSpread)},`${o}:lens-distortion`);default:return(0,j.jsx)(st,{...e,colorBack:r.backgroundColor,colorFront:r.accentColor,colorHighlight:r.primaryColor,originalColors:a.originalColors,inverted:Nn(a.inverted,a.originalColors,i),type:a.ditheringType,size:a.size,colorSteps:a.colorSteps},`${o}:dithering`)}})(),a.overlayEnabled&&a.overlayOpacity>0&&(0,j.jsx)(`div`,{className:`absolute inset-0`,style:{backgroundColor:r.backgroundColor,opacity:a.overlayOpacity}})]}):(0,j.jsx)(`div`,{className:`absolute inset-0 z-0`,style:{backgroundColor:r.backgroundColor}})}),Rn=e=>e.toFixed(2),K=e=>`${Math.round(e*100)}%`,zn=(e,t)=>({borderColor:T(e.secondaryColor,t?.18:.16),selectedBg:T(e.accentColor,t?.1:.16)}),q=({label:e,value:t,min:n,max:r,step:i,rangeInputClass:a,theme:o,onChange:s,onPointerDown:c,onPointerUp:l,format:u=Rn})=>(0,j.jsxs)(`label`,{className:`block space-y-2`,children:[(0,j.jsxs)(`span`,{className:`flex justify-between gap-3 text-sm`,style:{color:o.primaryColor},children:[(0,j.jsx)(`span`,{children:e}),(0,j.jsx)(`span`,{className:`font-mono opacity-70`,children:u(t)})]}),(0,j.jsx)(`input`,{type:`range`,min:n,max:r,step:i,value:t,onChange:e=>s(Number(e.target.value)),onPointerDown:c,onPointerUp:l,onPointerCancel:l,className:a})]}),Bn=[`2x2`,`4x4`,`8x8`],Vn=({t:e,isDaylight:t,theme:n,rangeInputClass:r,tuning:i,onTuningChange:a,onSliderPointerDown:o,onSliderCommit:s})=>{let{borderColor:c,selectedBg:l}=zn(n,t),u={rangeInputClass:r,theme:n,onPointerDown:o,onPointerUp:s};return(0,j.jsxs)(`div`,{className:`space-y-4 rounded-2xl border p-3`,style:{borderColor:c},children:[(0,j.jsx)(`div`,{className:`text-xs font-medium uppercase tracking-[0.2em]`,style:{color:n.secondaryColor},children:e(`options.nomandBackgroundEffectDithering`)}),(0,j.jsxs)(`div`,{className:`space-y-2`,children:[(0,j.jsx)(`div`,{className:`text-sm`,style:{color:n.primaryColor},children:e(`options.nomandBackgroundDitheringType`)}),(0,j.jsx)(`div`,{className:`grid grid-cols-3 gap-2`,children:Bn.map(e=>(0,j.jsx)(`button`,{type:`button`,onClick:()=>a?.({ditheringType:e}),className:`rounded-xl border px-2 py-2 text-xs`,style:{borderColor:i.ditheringType===e?n.accentColor:c,backgroundColor:i.ditheringType===e?l:`transparent`,color:n.primaryColor},children:e},e))})]}),(0,j.jsx)(q,{...u,label:e(`options.nomandBackgroundSize`),value:i.size,min:.5,max:20,step:.5,format:e=>e.toFixed(1),onChange:e=>a?.({size:e})}),(0,j.jsx)(q,{...u,label:e(`options.nomandBackgroundColorSteps`),value:i.colorSteps,min:1,max:7,step:1,format:e=>String(Math.round(e)),onChange:e=>a?.({colorSteps:e})}),(0,j.jsx)(M,{label:e(`options.nomandBackgroundOriginalColors`),checked:i.originalColors,onChange:e=>a?.({originalColors:e}),theme:n}),(0,j.jsx)(M,{label:e(`options.nomandBackgroundInverted`),checked:i.inverted,onChange:e=>a?.({inverted:e}),theme:n})]})},Hn=({t:e,isDaylight:t,theme:n,rangeInputClass:r,tuning:i,onTuningChange:a,onSliderPointerDown:o,onSliderCommit:s})=>{let{borderColor:c}=zn(n,t),l={rangeInputClass:r,theme:n,onPointerDown:o,onPointerUp:s};return(0,j.jsxs)(`div`,{className:`space-y-4 rounded-2xl border p-3`,style:{borderColor:c},children:[(0,j.jsx)(`div`,{className:`text-xs font-medium uppercase tracking-[0.2em]`,style:{color:n.secondaryColor},children:e(`options.nomandBackgroundEffectFlutedGlass`)}),(0,j.jsx)(q,{...l,label:e(`options.nomandBackgroundFlutedGlassSize`),value:i.flutedGlassSize,min:.1,max:1,step:.05,onChange:e=>a?.({flutedGlassSize:e})}),(0,j.jsx)(q,{...l,label:e(`options.nomandBackgroundFlutedGlassDistortion`),value:i.flutedGlassDistortion,min:0,max:1,step:.05,format:K,onChange:e=>a?.({flutedGlassDistortion:e})}),(0,j.jsx)(q,{...l,label:e(`options.nomandBackgroundFlutedGlassBlur`),value:i.flutedGlassBlur,min:0,max:1,step:.05,format:K,onChange:e=>a?.({flutedGlassBlur:e})})]})},Un=({t:e,isDaylight:t,theme:n,rangeInputClass:r,tuning:i,onTuningChange:a,onSliderPointerDown:o,onSliderCommit:s})=>{let{borderColor:c}=zn(n,t),l={rangeInputClass:r,theme:n,onPointerDown:o,onPointerUp:s};return(0,j.jsxs)(`div`,{className:`space-y-4 rounded-2xl border p-3`,style:{borderColor:c},children:[(0,j.jsx)(`div`,{className:`text-xs font-medium uppercase tracking-[0.2em]`,style:{color:n.secondaryColor},children:e(`options.nomandBackgroundEffectHalftoneDots`)}),(0,j.jsx)(q,{...l,label:e(`options.nomandBackgroundHalftoneDotsSize`),value:i.halftoneDotsSize,min:.1,max:1,step:.05,onChange:e=>a?.({halftoneDotsSize:e})}),(0,j.jsx)(q,{...l,label:e(`options.nomandBackgroundHalftoneDotsRadius`),value:i.halftoneDotsRadius,min:.1,max:2,step:.05,onChange:e=>a?.({halftoneDotsRadius:e})}),(0,j.jsx)(q,{...l,label:e(`options.nomandBackgroundHalftoneDotsContrast`),value:i.halftoneDotsContrast,min:0,max:1,step:.05,format:K,onChange:e=>a?.({halftoneDotsContrast:e})}),(0,j.jsx)(M,{label:e(`options.nomandBackgroundOriginalColors`),checked:i.halftoneDotsOriginalColors,onChange:e=>a?.({halftoneDotsOriginalColors:e}),theme:n}),(0,j.jsx)(M,{label:e(`options.nomandBackgroundInverted`),checked:i.halftoneDotsInverted,onChange:e=>a?.({halftoneDotsInverted:e}),theme:n})]})},Wn=({t:e,isDaylight:t,theme:n,rangeInputClass:r,tuning:i,onTuningChange:a,onSliderPointerDown:o,onSliderCommit:s})=>{let{borderColor:c}=zn(n,t),l={rangeInputClass:r,theme:n,onPointerDown:o,onPointerUp:s};return(0,j.jsxs)(`div`,{className:`space-y-4 rounded-2xl border p-3`,style:{borderColor:c},children:[(0,j.jsx)(`div`,{className:`text-xs font-medium uppercase tracking-[0.2em]`,style:{color:n.secondaryColor},children:e(`options.nomandBackgroundEffectLensDistortion`)}),(0,j.jsx)(q,{...l,label:e(`options.nomandBackgroundLensDistortionSpread`),value:i.lensDistortionSpread,min:0,max:1,step:.05,format:K,onChange:e=>a?.({lensDistortionSpread:e})}),(0,j.jsx)(q,{...l,label:e(`options.nomandBackgroundLensDistortionBulge`),value:i.lensDistortionBulge,min:-1,max:1,step:.05,onChange:e=>a?.({lensDistortionBulge:e})}),(0,j.jsx)(q,{...l,label:e(`options.nomandBackgroundLensDistortionDispersion`),value:i.lensDistortionDispersion,min:0,max:1,step:.05,format:K,onChange:e=>a?.({lensDistortionDispersion:e})})]})},Gn=({t:e,isDaylight:t,theme:n,rangeInputClass:r,tuning:i,onTuningChange:a,onSliderPointerDown:o,onSliderCommit:s})=>{let{borderColor:c}=zn(n,t),l={rangeInputClass:r,theme:n,onPointerDown:o,onPointerUp:s};return(0,j.jsxs)(`div`,{className:`space-y-4 rounded-2xl border p-3`,style:{borderColor:c},children:[(0,j.jsx)(`div`,{className:`text-xs font-medium uppercase tracking-[0.2em]`,style:{color:n.secondaryColor},children:e(`options.nomandBackgroundEffectPaperTexture`)}),(0,j.jsx)(q,{...l,label:e(`options.nomandBackgroundPaperTextureContrast`),value:i.paperTextureContrast,min:0,max:1,step:.05,format:K,onChange:e=>a?.({paperTextureContrast:e})}),(0,j.jsx)(q,{...l,label:e(`options.nomandBackgroundPaperTextureRoughness`),value:i.paperTextureRoughness,min:0,max:1,step:.05,format:K,onChange:e=>a?.({paperTextureRoughness:e})}),(0,j.jsx)(q,{...l,label:e(`options.nomandBackgroundPaperTextureFiber`),value:i.paperTextureFiber,min:0,max:1,step:.05,format:K,onChange:e=>a?.({paperTextureFiber:e})})]})},Kn=[`dithering`,`fluted-glass`,`paper-texture`,`halftone-dots`,`lens-distortion`],qn={dithering:`options.nomandBackgroundEffectDithering`,"fluted-glass":`options.nomandBackgroundEffectFlutedGlass`,"paper-texture":`options.nomandBackgroundEffectPaperTexture`,"halftone-dots":`options.nomandBackgroundEffectHalftoneDots`,"lens-distortion":`options.nomandBackgroundEffectLensDistortion`},Jn=e=>{let{t,isDaylight:n,theme:r,tuning:i}=e,{borderColor:a,selectedBg:o}=zn(r,n);return(0,j.jsxs)(`div`,{className:`space-y-4`,children:[(0,j.jsxs)(`div`,{className:`space-y-2`,children:[(0,j.jsx)(`div`,{className:`text-sm`,style:{color:r.primaryColor},children:t(`options.nomandBackgroundEffect`)}),(0,j.jsx)(`div`,{className:`grid grid-cols-2 gap-2 sm:grid-cols-3`,children:Kn.map(n=>(0,j.jsx)(`button`,{type:`button`,onClick:()=>e.onTuningChange?.({effect:n}),className:`rounded-xl border px-2 py-2 text-xs`,style:{borderColor:i.effect===n?r.accentColor:a,backgroundColor:i.effect===n?o:`transparent`,color:r.primaryColor},children:t(qn[n])},n))})]}),i.effect===`dithering`&&(0,j.jsx)(Vn,{...e}),i.effect===`fluted-glass`&&(0,j.jsx)(Hn,{...e}),i.effect===`paper-texture`&&(0,j.jsx)(Gn,{...e}),i.effect===`halftone-dots`&&(0,j.jsx)(Un,{...e}),i.effect===`lens-distortion`&&(0,j.jsx)(Wn,{...e})]})},Yn=({t:e,isDaylight:t,theme:n,controlCardBg:r,rangeInputClass:i,tuning:o,onTuningChange:s,monetBackgroundImage:c,onUploadMonetBackgroundImage:l,onClearMonetBackgroundImage:u,isLoadingMonetBackgroundImage:d=!1,onSliderPointerDown:p,onSliderCommit:h})=>{let g={...m,...o},_=(0,A.useRef)(null),[v,y]=(0,A.useState)(``),b=T(n.secondaryColor,t?.18:.16),x=T(n.accentColor,t?.1:.16),S=e=>{s?.({imageSource:e})},C=async t=>{if(!t.length||!l)return;let n=await l(t);y(n.ok?e(`options.nomandBackgroundUploadSuccess`):n.error??e(`options.nomandBackgroundUploadFailed`)),n.ok&&S(`uploaded-global`)};return(0,j.jsxs)(`div`,{className:`rounded-[24px] border p-4 space-y-4`,style:{backgroundColor:r,borderColor:b},children:[(0,j.jsxs)(`div`,{className:`space-y-1`,children:[(0,j.jsx)(`div`,{className:`text-sm font-medium`,style:{color:n.primaryColor},children:e(`options.nomandBackgroundSettings`)}),(0,j.jsx)(`div`,{className:`text-xs opacity-70`,style:{color:n.secondaryColor},children:e(`options.nomandBackgroundSettingsDesc`)})]}),(0,j.jsxs)(`div`,{className:`space-y-2`,children:[(0,j.jsx)(`div`,{className:`text-sm`,style:{color:n.primaryColor},children:e(`options.nomandBackgroundSource`)}),(0,j.jsx)(`div`,{className:`grid grid-cols-2 gap-2`,children:[[`cover-derived`,e(`options.monetBackgroundSourceCover`)],[`uploaded-global`,e(`options.monetBackgroundSourceUploaded`)]].map(([e,t])=>(0,j.jsx)(`button`,{type:`button`,disabled:e===`uploaded-global`&&!c&&!d,onClick:()=>S(e),className:`rounded-2xl border px-3 py-2 text-sm disabled:opacity-40`,style:{borderColor:g.imageSource===e?n.accentColor:b,backgroundColor:g.imageSource===e?x:`transparent`,color:n.primaryColor},children:t},e))}),(0,j.jsxs)(`div`,{className:`flex flex-wrap gap-2`,children:[(0,j.jsx)(`input`,{ref:_,type:`file`,accept:`image/png,image/jpeg,image/webp,image/gif`,className:`hidden`,onChange:e=>{C(Array.from(e.target.files??[])),e.target.value=``}}),(0,j.jsxs)(`button`,{type:`button`,disabled:d||!l,onClick:()=>_.current?.click(),className:`inline-flex items-center gap-2 rounded-full border px-3 py-2 text-xs disabled:opacity-40`,style:{borderColor:b,color:n.primaryColor},children:[(0,j.jsx)(f,{size:14}),e(`options.monetUploadBackground`)]}),(0,j.jsxs)(`button`,{type:`button`,disabled:!c||!u,onClick:()=>void u?.(),className:`inline-flex items-center gap-2 rounded-full border px-3 py-2 text-xs disabled:opacity-40`,style:{borderColor:b,color:n.secondaryColor},children:[(0,j.jsx)(a,{size:14}),e(`options.monetClearBackground`)]})]}),(0,j.jsx)(`div`,{className:`truncate text-xs opacity-60`,style:{color:n.secondaryColor},children:v||c?.name||`-`})]}),(0,j.jsx)(Jn,{t:e,isDaylight:t,theme:n,rangeInputClass:i,tuning:g,onTuningChange:s,onSliderPointerDown:p,onSliderCommit:h}),(0,j.jsxs)(`div`,{className:`space-y-3 rounded-2xl border p-3`,style:{borderColor:b},children:[(0,j.jsx)(M,{label:e(`options.nomandBackgroundOverlay`),description:e(`options.nomandBackgroundOverlayDesc`),checked:g.overlayEnabled,onChange:e=>s?.({overlayEnabled:e}),theme:n}),(0,j.jsxs)(`label`,{className:`block space-y-2 ${g.overlayEnabled?``:`opacity-45`}`,children:[(0,j.jsxs)(`span`,{className:`flex justify-between text-sm`,style:{color:n.primaryColor},children:[(0,j.jsx)(`span`,{children:e(`options.nomandBackgroundOverlayOpacity`)}),(0,j.jsxs)(`span`,{className:`font-mono opacity-70`,children:[Math.round(g.overlayOpacity*100),`%`]})]}),(0,j.jsx)(`input`,{type:`range`,min:`0`,max:`1`,step:`0.05`,value:g.overlayOpacity,disabled:!g.overlayEnabled,onChange:e=>s?.({overlayOpacity:Number(e.target.value)}),onPointerDown:p,onPointerUp:h,className:i})]})]})]})},Xn=e({default:()=>Zn}),Zn=xe({mode:`nomand`,order:30,labelKey:`options.visualizerBackgroundModeNomand`,labelFallback:`Nomand`,render:({config:e,coverUrl:t,theme:n,isDaylight:r})=>(0,j.jsx)(Ln,{coverUrl:t,monetBackgroundImage:e?.customImage,tuning:e?.nomand?.tuning,theme:n,isDaylight:r}),renderSettingsPanel:({config:e,actions:t,...n})=>(0,j.jsx)(Yn,{...n,tuning:e?.nomand?.tuning??m,onTuningChange:t?.nomand?.onTuningChange,monetBackgroundImage:e?.customImage,onUploadMonetBackgroundImage:t?.customImage?.onUpload,onClearMonetBackgroundImage:t?.customImage?.onClear,isLoadingMonetBackgroundImage:t?.customImage?.isLoading}),renderQuickControls:({config:e,actions:t,t:n,theme:i})=>{let a=e?.nomand?.tuning??m;return(0,j.jsx)(Ce,{active:a.overlayEnabled,theme:i,label:n(`options.nomandBackgroundOverlay`),onToggle:()=>t?.nomand?.onTuningChange?.({overlayEnabled:!a.overlayEnabled}),children:(0,j.jsx)(r,{size:14})})},resetSettings:e=>e?.nomand?.onResetTuning?.()}),Qn=5120,$n=5121,er=5122,tr=5123,nr=5124,rr=5125,ir=5126,ar=32819,or=32820,sr=33635,cr=5131,lr=33640,ur=35899,dr=35902,fr=36269,pr=34042,mr={};{let e=mr;e[Qn]=Int8Array,e[$n]=Uint8Array,e[er]=Int16Array,e[tr]=Uint16Array,e[nr]=Int32Array,e[rr]=Uint32Array,e[ir]=Float32Array,e[ar]=Uint16Array,e[or]=Uint16Array,e[sr]=Uint16Array,e[cr]=Uint16Array,e[lr]=Uint32Array,e[ur]=Uint32Array,e[dr]=Uint32Array,e[fr]=Uint32Array,e[pr]=Uint32Array}function hr(e){if(e instanceof Int8Array)return Qn;if(e instanceof Uint8Array||e instanceof Uint8ClampedArray)return $n;if(e instanceof Int16Array)return er;if(e instanceof Uint16Array)return tr;if(e instanceof Int32Array)return nr;if(e instanceof Uint32Array)return rr;if(e instanceof Float32Array)return ir;throw Error(`unsupported typed array type`)}function gr(e){if(e===Int8Array)return Qn;if(e===Uint8Array||e===Uint8ClampedArray)return $n;if(e===Int16Array)return er;if(e===Uint16Array)return tr;if(e===Int32Array)return nr;if(e===Uint32Array)return rr;if(e===Float32Array)return ir;throw Error(`unsupported typed array type`)}function _r(e){let t=mr[e];if(!t)throw Error(`unknown gl type`);return t}var vr=typeof SharedArrayBuffer<`u`?function(e){return e&&e.buffer&&(e.buffer instanceof ArrayBuffer||e.buffer instanceof SharedArrayBuffer)}:function(e){return e&&e.buffer&&e.buffer instanceof ArrayBuffer};function yr(...e){console.error(...e)}function br(...e){console.warn(...e)}var xr=new Map;function Sr(e,t){if(!e||typeof e!=`object`)return!1;let n=xr.get(t);n||(n=new WeakMap,xr.set(t,n));let r=n.get(e);if(r===void 0){let i=Object.prototype.toString.call(e);r=i.substring(8,i.length-1)===t,n.set(e,r)}return r}function Cr(e,t){return typeof WebGLBuffer<`u`&&Sr(t,`WebGLBuffer`)}function wr(e,t){return typeof WebGLTexture<`u`&&Sr(t,`WebGLTexture`)}var Tr=35044,Er=34962,Dr=34963,Or=34660,kr=5120,Ar=5121,jr=5122,Mr=5123,Nr=5124,Pr=5125,Fr=5126,Ir={attribPrefix:``};function Lr(e,t,n,r,i){e.bindBuffer(t,n),e.bufferData(t,r,i||Tr)}function Rr(e,t,n,r){if(Cr(e,t))return t;n||=Er;let i=e.createBuffer();return Lr(e,n,i,t,r),i}function zr(e){return e===`indices`}function Br(e){return e===Int8Array||e===Uint8Array}function Vr(e){return e.length?e:e.data}var Hr=/coord|texture/i,Ur=/color|colour/i;function Wr(e,t){let n;if(n=Hr.test(e)?2:Ur.test(e)?4:3,t%n>0)throw Error(`Can not guess numComponents for attribute '${e}'. Tried ${n} but ${t} values is not evenly divisible by ${n}. You should specify it.`);return n}function Gr(e,t,n){return e.numComponents||e.size||Wr(t,n||Vr(e).length)}function Kr(e,t){if(vr(e))return e;if(vr(e.data))return e.data;Array.isArray(e)&&(e={data:e});let n=e.type?Jr(e.type):void 0;return n||=zr(t)?Uint16Array:Float32Array,new n(e.data)}function qr(e){return typeof e==`number`?e:e?gr(e):Fr}function Jr(e){return typeof e==`number`?_r(e):e||Float32Array}function Yr(e,t){return{buffer:t.buffer,numValues:24,type:qr(t.type),arrayType:Jr(t.type)}}function Xr(e,t){let n=t.data||t,r=Jr(t.type),i=n*r.BYTES_PER_ELEMENT,a=e.createBuffer();return e.bindBuffer(Er,a),e.bufferData(Er,i,t.drawType||Tr),{buffer:a,numValues:n,type:gr(r),arrayType:r}}function Zr(e,t,n){let r=Kr(t,n);return{arrayType:r.constructor,buffer:Rr(e,r,void 0,t.drawType),type:hr(r),numValues:0}}function Qr(e,t){let n={};return Object.keys(t).forEach(function(r){if(!zr(r)){let i=t[r],a=i.attrib||i.name||i.attribName||Ir.attribPrefix+r;if(i.value){if(!Array.isArray(i.value)&&!vr(i.value))throw Error(`array.value is not array or typedarray`);n[a]={value:i.value}}else{let t;t=i.buffer&&i.buffer instanceof WebGLBuffer?Yr:typeof i==`number`||typeof i.data==`number`?Xr:Zr;let{buffer:o,type:s,numValues:c,arrayType:l}=t(e,i,r),u=i.normalize===void 0?Br(l):i.normalize,d=Gr(i,r,c);n[a]={buffer:o,numComponents:d,type:s,normalize:u,stride:i.stride||0,offset:i.offset||0,divisor:i.divisor===void 0?void 0:i.divisor,drawType:i.drawType}}}}),e.bindBuffer(Er,null),n}function $r(e,t){return t===kr||t===Ar?1:t===jr||t===Mr?2:t===Nr||t===Pr||t===Fr?4:0}var ei=[`position`,`positions`,`a_position`];function ti(e,t){let n,r=0;for(;r<ei.length&&(n=ei[r],!(n in t||(n=Ir.attribPrefix+n,n in t)));++r);r===ei.length&&(n=Object.keys(t)[0]);let i=t[n];if(!i.buffer)return 1;e.bindBuffer(Er,i.buffer);let a=e.getBufferParameter(Er,Or);e.bindBuffer(Er,null);let o=a/$r(e,i.type),s=i.numComponents||i.size,c=o/s;if(c%1!=0)throw Error(`numComponents ${s} not correct for length ${length}`);return c}function ni(e,t,n){let r=Qr(e,t),i=Object.assign({},n||{});i.attribs=Object.assign({},n?n.attribs:{},r);let a=t.indices;if(a){let t=Kr(a,`indices`);i.indices=Rr(e,t,Dr),i.numElements=t.length,i.elementType=hr(t)}else i.numElements||=ti(e,i.attribs);return i}function ri(e){return!!e.texStorage2D}var ii=function(){let e={},t={};function n(n){let r=n.constructor.name;if(!e[r]){for(let e in n)if(typeof n[e]==`number`){let r=t[n[e]];t[n[e]]=r?`${r} | ${e}`:e}e[r]=!0}}return function(e,r){return n(e),t[r]||(typeof r==`number`?`0x${r.toString(16)}`:r)}}();new Uint8Array([128,192,255,255]);var ai=6406,oi=6407,si=6408,ci=6409,li=6410,ui=6402,di=34041,fi=33319,pi=33320,mi=6403,hi=36244,gi=36248,_i=36249,vi={};{let e=vi;e[ai]={numColorComponents:1},e[ci]={numColorComponents:1},e[li]={numColorComponents:2},e[oi]={numColorComponents:3},e[si]={numColorComponents:4},e[mi]={numColorComponents:1},e[hi]={numColorComponents:1},e[fi]={numColorComponents:2},e[pi]={numColorComponents:2},e[oi]={numColorComponents:3},e[gi]={numColorComponents:3},e[si]={numColorComponents:4},e[_i]={numColorComponents:4},e[ui]={numColorComponents:1},e[di]={numColorComponents:2}}var yi=yr;function bi(e){return typeof document<`u`&&document.getElementById?document.getElementById(e):null}var xi=33984,Si=34962,Ci=34963,wi=35713,Ti=35714,Ei=35632,Di=35633,Oi=35981,ki=35718,Ai=35721,ji=35971,Mi=35382,Ni=35396,Pi=35398,Fi=35392,Ii=35395,Li=5126,Ri=35664,zi=35665,Bi=35666,Vi=5124,Hi=35667,Ui=35668,Wi=35669,Gi=35670,Ki=35671,qi=35672,Ji=35673,Yi=35674,Xi=35675,Zi=35676,Qi=35678,$i=35680,ea=35679,ta=35682,na=35685,ra=35686,ia=35687,aa=35688,oa=35689,sa=35690,ca=36289,la=36292,ua=36293,da=5125,fa=36294,pa=36295,ma=36296,ha=36298,ga=36299,_a=36300,va=36303,ya=36306,ba=36307,xa=36308,Sa=36311,Ca=3553,wa=34067,Ta=32879,Ea=35866,J={};function Da(e,t){return J[t].bindPoint}function Oa(e,t){return function(n){e.uniform1f(t,n)}}function ka(e,t){return function(n){e.uniform1fv(t,n)}}function Aa(e,t){return function(n){e.uniform2fv(t,n)}}function ja(e,t){return function(n){e.uniform3fv(t,n)}}function Ma(e,t){return function(n){e.uniform4fv(t,n)}}function Na(e,t){return function(n){e.uniform1i(t,n)}}function Pa(e,t){return function(n){e.uniform1iv(t,n)}}function Fa(e,t){return function(n){e.uniform2iv(t,n)}}function Ia(e,t){return function(n){e.uniform3iv(t,n)}}function La(e,t){return function(n){e.uniform4iv(t,n)}}function Ra(e,t){return function(n){e.uniform1ui(t,n)}}function za(e,t){return function(n){e.uniform1uiv(t,n)}}function Ba(e,t){return function(n){e.uniform2uiv(t,n)}}function Va(e,t){return function(n){e.uniform3uiv(t,n)}}function Ha(e,t){return function(n){e.uniform4uiv(t,n)}}function Ua(e,t){return function(n){e.uniformMatrix2fv(t,!1,n)}}function Wa(e,t){return function(n){e.uniformMatrix3fv(t,!1,n)}}function Ga(e,t){return function(n){e.uniformMatrix4fv(t,!1,n)}}function Ka(e,t){return function(n){e.uniformMatrix2x3fv(t,!1,n)}}function qa(e,t){return function(n){e.uniformMatrix3x2fv(t,!1,n)}}function Ja(e,t){return function(n){e.uniformMatrix2x4fv(t,!1,n)}}function Ya(e,t){return function(n){e.uniformMatrix4x2fv(t,!1,n)}}function Xa(e,t){return function(n){e.uniformMatrix3x4fv(t,!1,n)}}function Za(e,t){return function(n){e.uniformMatrix4x3fv(t,!1,n)}}function Y(e,t,n,r){let i=Da(e,t);return ri(e)?function(t){let a,o;!t||wr(e,t)?(a=t,o=null):(a=t.texture,o=t.sampler),e.uniform1i(r,n),e.activeTexture(xi+n),e.bindTexture(i,a),e.bindSampler(n,o)}:function(t){e.uniform1i(r,n),e.activeTexture(xi+n),e.bindTexture(i,t)}}function X(e,t,n,r,i){let a=Da(e,t),o=new Int32Array(i);for(let e=0;e<i;++e)o[e]=n+e;return ri(e)?function(t){e.uniform1iv(r,o),t.forEach(function(t,r){e.activeTexture(xi+o[r]);let i,s;!t||wr(e,t)?(i=t,s=null):(i=t.texture,s=t.sampler),e.bindSampler(n,s),e.bindTexture(a,i)})}:function(t){e.uniform1iv(r,o),t.forEach(function(t,n){e.activeTexture(xi+o[n]),e.bindTexture(a,t)})}}J[Li]={Type:Float32Array,size:4,setter:Oa,arraySetter:ka},J[Ri]={Type:Float32Array,size:8,setter:Aa,cols:2},J[zi]={Type:Float32Array,size:12,setter:ja,cols:3},J[Bi]={Type:Float32Array,size:16,setter:Ma,cols:4},J[Vi]={Type:Int32Array,size:4,setter:Na,arraySetter:Pa},J[Hi]={Type:Int32Array,size:8,setter:Fa,cols:2},J[Ui]={Type:Int32Array,size:12,setter:Ia,cols:3},J[Wi]={Type:Int32Array,size:16,setter:La,cols:4},J[da]={Type:Uint32Array,size:4,setter:Ra,arraySetter:za},J[fa]={Type:Uint32Array,size:8,setter:Ba,cols:2},J[pa]={Type:Uint32Array,size:12,setter:Va,cols:3},J[ma]={Type:Uint32Array,size:16,setter:Ha,cols:4},J[Gi]={Type:Uint32Array,size:4,setter:Na,arraySetter:Pa},J[Ki]={Type:Uint32Array,size:8,setter:Fa,cols:2},J[qi]={Type:Uint32Array,size:12,setter:Ia,cols:3},J[Ji]={Type:Uint32Array,size:16,setter:La,cols:4},J[Yi]={Type:Float32Array,size:32,setter:Ua,rows:2,cols:2},J[Xi]={Type:Float32Array,size:48,setter:Wa,rows:3,cols:3},J[Zi]={Type:Float32Array,size:64,setter:Ga,rows:4,cols:4},J[na]={Type:Float32Array,size:32,setter:Ka,rows:2,cols:3},J[ra]={Type:Float32Array,size:32,setter:Ja,rows:2,cols:4},J[ia]={Type:Float32Array,size:48,setter:qa,rows:3,cols:2},J[aa]={Type:Float32Array,size:48,setter:Xa,rows:3,cols:4},J[oa]={Type:Float32Array,size:64,setter:Ya,rows:4,cols:2},J[sa]={Type:Float32Array,size:64,setter:Za,rows:4,cols:3},J[Qi]={Type:null,size:0,setter:Y,arraySetter:X,bindPoint:Ca},J[$i]={Type:null,size:0,setter:Y,arraySetter:X,bindPoint:wa},J[ea]={Type:null,size:0,setter:Y,arraySetter:X,bindPoint:Ta},J[ta]={Type:null,size:0,setter:Y,arraySetter:X,bindPoint:Ca},J[ca]={Type:null,size:0,setter:Y,arraySetter:X,bindPoint:Ea},J[la]={Type:null,size:0,setter:Y,arraySetter:X,bindPoint:Ea},J[ua]={Type:null,size:0,setter:Y,arraySetter:X,bindPoint:wa},J[ha]={Type:null,size:0,setter:Y,arraySetter:X,bindPoint:Ca},J[ga]={Type:null,size:0,setter:Y,arraySetter:X,bindPoint:Ta},J[_a]={Type:null,size:0,setter:Y,arraySetter:X,bindPoint:wa},J[va]={Type:null,size:0,setter:Y,arraySetter:X,bindPoint:Ea},J[ya]={Type:null,size:0,setter:Y,arraySetter:X,bindPoint:Ca},J[ba]={Type:null,size:0,setter:Y,arraySetter:X,bindPoint:Ta},J[xa]={Type:null,size:0,setter:Y,arraySetter:X,bindPoint:wa},J[Sa]={Type:null,size:0,setter:Y,arraySetter:X,bindPoint:Ea};function Qa(e,t){return function(n){if(n.value)switch(e.disableVertexAttribArray(t),n.value.length){case 4:e.vertexAttrib4fv(t,n.value);break;case 3:e.vertexAttrib3fv(t,n.value);break;case 2:e.vertexAttrib2fv(t,n.value);break;case 1:e.vertexAttrib1fv(t,n.value);break;default:throw Error(`the length of a float constant value must be between 1 and 4!`)}else e.bindBuffer(Si,n.buffer),e.enableVertexAttribArray(t),e.vertexAttribPointer(t,n.numComponents||n.size,n.type||Li,n.normalize||!1,n.stride||0,n.offset||0),e.vertexAttribDivisor&&e.vertexAttribDivisor(t,n.divisor||0)}}function Z(e,t){return function(n){if(n.value){if(e.disableVertexAttribArray(t),n.value.length===4)e.vertexAttrib4iv(t,n.value);else throw Error(`The length of an integer constant value must be 4!`)}else e.bindBuffer(Si,n.buffer),e.enableVertexAttribArray(t),e.vertexAttribIPointer(t,n.numComponents||n.size,n.type||Vi,n.stride||0,n.offset||0),e.vertexAttribDivisor&&e.vertexAttribDivisor(t,n.divisor||0)}}function $a(e,t){return function(n){if(n.value){if(e.disableVertexAttribArray(t),n.value.length===4)e.vertexAttrib4uiv(t,n.value);else throw Error(`The length of an unsigned integer constant value must be 4!`)}else e.bindBuffer(Si,n.buffer),e.enableVertexAttribArray(t),e.vertexAttribIPointer(t,n.numComponents||n.size,n.type||da,n.stride||0,n.offset||0),e.vertexAttribDivisor&&e.vertexAttribDivisor(t,n.divisor||0)}}function eo(e,t,n){let r=n.size,i=n.count;return function(n){e.bindBuffer(Si,n.buffer);let a=n.size||n.numComponents||r,o=a/i,s=n.type||Li,c=J[s].size*a,l=n.normalize||!1,u=n.offset||0,d=c/i;for(let r=0;r<i;++r)e.enableVertexAttribArray(t+r),e.vertexAttribPointer(t+r,o,s,l,c,u+d*r),e.vertexAttribDivisor&&e.vertexAttribDivisor(t+r,n.divisor||0)}}var Q={};Q[Li]={size:4,setter:Qa},Q[Ri]={size:8,setter:Qa},Q[zi]={size:12,setter:Qa},Q[Bi]={size:16,setter:Qa},Q[Vi]={size:4,setter:Z},Q[Hi]={size:8,setter:Z},Q[Ui]={size:12,setter:Z},Q[Wi]={size:16,setter:Z},Q[da]={size:4,setter:$a},Q[fa]={size:8,setter:$a},Q[pa]={size:12,setter:$a},Q[ma]={size:16,setter:$a},Q[Gi]={size:4,setter:Z},Q[Ki]={size:8,setter:Z},Q[qi]={size:12,setter:Z},Q[Ji]={size:16,setter:Z},Q[Yi]={size:4,setter:eo,count:2},Q[Xi]={size:9,setter:eo,count:3},Q[Zi]={size:16,setter:eo,count:4};var to=/ERROR:\s*\d+:(\d+)/gi;function no(e,t=``,n=0){let r=[...t.matchAll(to)],i=new Map(r.map((e,n)=>{let i=parseInt(e[1]),a=r[n+1],o=a?a.index:t.length,s=t.substring(e.index,o);return[i-1,s]}));return e.split(`
`).map((e,t)=>{let r=i.get(t);return`${t+1+n}: ${e}${r?`\n\n^^^ ${r}`:``}`}).join(`
`)}var ro=/^[ \t]*\n/;function io(e){let t=0;return ro.test(e)&&(t=1,e=e.replace(ro,``)),{lineOffset:t,shaderSource:e}}function ao(e,t){return e.errorCallback(t),e.callback&&setTimeout(()=>{e.callback(`${t}\n${e.errors.join(`
`)}`)}),null}function oo(e,t,n,r){if(r||=yi,!e.getShaderParameter(n,wi)){let i=e.getShaderInfoLog(n),{lineOffset:a,shaderSource:o}=io(e.getShaderSource(n)),s=`${no(o,i,a)}\nError compiling ${ii(e,t)}: ${i}`;return r(s),s}return``}function so(e,t,n){let r,i,a;if(typeof t==`function`&&(n=t,t=void 0),typeof e==`function`)n=e,e=void 0;else if(e&&!Array.isArray(e)){let t=e;n=t.errorCallback,e=t.attribLocations,r=t.transformFeedbackVaryings,i=t.transformFeedbackMode,a=t.callback}let o=n||yi,s=[],c={errorCallback(e,...t){s.push(e),o(e,...t)},transformFeedbackVaryings:r,transformFeedbackMode:i,callback:a,errors:s};{let n={};Array.isArray(e)?e.forEach(function(e,r){n[e]=t?t[r]:r}):n=e||{},c.attribLocations=n}return c}var co=[`VERTEX_SHADER`,`FRAGMENT_SHADER`];function lo(e,t){if(t.indexOf(`frag`)>=0)return Ei;if(t.indexOf(`vert`)>=0)return Di}function uo(e,t,n){let r=e.getAttachedShaders(t);for(let t of r)n.has(t)||e.deleteShader(t);e.deleteProgram(t)}var fo=(e=0)=>new Promise(t=>setTimeout(t,e));function po(e,t,n){let r=e.createProgram(),{attribLocations:i,transformFeedbackVaryings:a,transformFeedbackMode:o}=so(n);for(let n=0;n<t.length;++n){let i=t[n];if(typeof i==`string`){let t=bi(i),r=t?t.text:i,a=e[co[n]];t&&t.type&&(a=lo(e,t.type)||a),i=e.createShader(a),e.shaderSource(i,io(r).shaderSource),e.compileShader(i)}e.attachShader(r,i)}Object.entries(i).forEach(([t,n])=>e.bindAttribLocation(r,n,t));{let t=a;t&&(t.attribs&&(t=t.attribs),Array.isArray(t)||(t=Object.keys(t)),e.transformFeedbackVaryings(r,t,o||Oi))}return e.linkProgram(r),r}function mo(e,t,n,r,i){let a=so(n,r,i),o=new Set(t),s=po(e,t,a);function c(e,t){let n=go(e,t,a.errorCallback);return n&&uo(e,t,o),n}if(a.callback)ho(e,s).then(()=>{let t=c(e,s);a.callback(t,t?void 0:s)});else return c(e,s)?void 0:s}async function ho(e,t){let n=e.getExtension(`KHR_parallel_shader_compile`),r=n?(e,t)=>e.getProgramParameter(t,n.COMPLETION_STATUS_KHR):()=>!0,i=0;do await fo(i),i=1e3/60;while(!r(e,t))}function go(e,t,n){if(n||=yi,!e.getProgramParameter(t,Ti)){let r=e.getProgramInfoLog(t);return n(`Error in program linking: ${r}`),`${r}\n${e.getAttachedShaders(t).map(t=>oo(e,e.getShaderParameter(t,e.SHADER_TYPE),t,n)).filter(e=>e).join(`
`)}`}}function _o(e,t,n,r,i){return mo(e,t,n,r,i)}function vo(e){let t=e.name;return t.startsWith(`gl_`)||t.startsWith(`webgl_`)}var yo=/(\.|\[|]|\w+)/g,bo=e=>e>=`0`&&e<=`9`;function xo(e,t,n,r){let i=e.split(yo).filter(e=>e!==``),a=0,o=``;for(;;){let e=i[a++];o+=e;let s=bo(e[0]),c=s?parseInt(e):e;if(s&&(o+=i[a++]),a===i.length){n[c]=t;break}{let e=i[a++],t=e===`[`,s=n[c]||(t?[]:{});n[c]=s,n=s,r[o]=r[o]||function(e){return function(t){To(e,t)}}(s),o+=e}}}function So(e,t){let n=0;function r(t,r,i){let a=r.name.endsWith(`[0]`),o=r.type,s=J[o];if(!s)throw Error(`unknown type: 0x${o.toString(16)}`);let c;if(s.bindPoint){let t=n;n+=r.size,c=a?s.arraySetter(e,o,t,i,r.size):s.setter(e,o,t,i,r.size)}else c=s.arraySetter&&a?s.arraySetter(e,i):s.setter(e,i);return c.location=i,c}let i={},a={},o=e.getProgramParameter(t,ki);for(let n=0;n<o;++n){let o=e.getActiveUniform(t,n);if(vo(o))continue;let s=o.name;s.endsWith(`[0]`)&&(s=s.substr(0,s.length-3));let c=e.getUniformLocation(t,o.name);if(c){let e=r(t,o,c);i[s]=e,xo(s,e,a,i)}}return i}function Co(e,t){let n={},r=e.getProgramParameter(t,ji);for(let i=0;i<r;++i){let r=e.getTransformFeedbackVarying(t,i);n[r.name]={index:i,type:r.type,size:r.size}}return n}function wo(e,t){let n=e.getProgramParameter(t,ki),r=[],i=[];for(let a=0;a<n;++a){i.push(a),r.push({});let n=e.getActiveUniform(t,a);r[a].name=n.name}[[`UNIFORM_TYPE`,`type`],[`UNIFORM_SIZE`,`size`],[`UNIFORM_BLOCK_INDEX`,`blockNdx`],[`UNIFORM_OFFSET`,`offset`]].forEach(function(n){let a=n[0],o=n[1];e.getActiveUniforms(t,i,e[a]).forEach(function(e,t){r[t][o]=e})});let a={},o=e.getProgramParameter(t,Mi);for(let n=0;n<o;++n){let r=e.getActiveUniformBlockName(t,n),i={index:e.getUniformBlockIndex(t,r),usedByVertexShader:e.getActiveUniformBlockParameter(t,n,Ni),usedByFragmentShader:e.getActiveUniformBlockParameter(t,n,Pi),size:e.getActiveUniformBlockParameter(t,n,Fi),uniformIndices:e.getActiveUniformBlockParameter(t,n,Ii)};i.used=i.usedByVertexShader||i.usedByFragmentShader,a[r]=i}return{blockSpecs:a,uniformData:r}}function To(e,t){for(let n in t){let r=e[n];typeof r==`function`?r(t[n]):To(e[n],t[n])}}function Eo(e,...t){let n=e.uniformSetters||e,r=t.length;for(let e=0;e<r;++e){let r=t[e];if(Array.isArray(r)){let e=r.length;for(let t=0;t<e;++t)Eo(n,r[t])}else for(let e in r){let t=n[e];t&&t(r[e])}}}function Do(e,t){let n={},r=e.getProgramParameter(t,Ai);for(let i=0;i<r;++i){let r=e.getActiveAttrib(t,i);if(vo(r))continue;let a=e.getAttribLocation(t,r.name),o=Q[r.type],s=o.setter(e,a,o);s.location=a,n[r.name]=s}return n}function Oo(e,t){for(let n in t){let r=e[n];r&&r(t[n])}}function ko(e,t,n){n.vertexArrayObject?e.bindVertexArray(n.vertexArrayObject):(Oo(t.attribSetters||t,n.attribs),n.indices&&e.bindBuffer(Ci,n.indices))}function Ao(e,t){let n=So(e,t),r=Do(e,t),i={program:t,uniformSetters:n,attribSetters:r,uniformLocations:Object.fromEntries(Object.entries(n).map(([e,t])=>[e,t.location])),attribLocations:Object.fromEntries(Object.entries(r).map(([e,t])=>[e,t.location]))};return ri(e)&&(i.uniformBlockSpec=wo(e,t),i.transformFeedbackInfo=Co(e,t)),i}var jo=/\s|{|}|;/;function Mo(e,t,n,r,i){let a=so(n,r,i),o=[];if(t=t.map(function(e){if(!jo.test(e)){let t=bi(e);if(t)e=t.text;else{let t=`no element with id: ${e}`;a.errorCallback(t),o.push(t)}}return e}),o.length)return ao(a,``);let s=a.callback;s&&(a.callback=(t,n)=>{s(t,t?void 0:Ao(e,n))});let c=_o(e,t,a);return c?Ao(e,c):null}var No=4,Po=5123;function Fo(e,t,n,r,i,a){n=n===void 0?No:n;let o=t.indices,s=t.elementType,c=r===void 0?t.numElements:r;i=i===void 0?0:i,s||o?a===void 0?e.drawElements(n,c,s===void 0?Po:t.elementType,i):e.drawElementsInstanced(n,c,s===void 0?Po:t.elementType,i,a):a===void 0?e.drawArrays(n,i,c):e.drawArraysInstanced(n,i,c,a)}var Io=6402,Lo=33190,Ro=36012,zo=35056,Bo=36013,Vo=32854,Ho=32855,Uo=36194,Wo=33189,Go=6401,Ko=36168,qo=34041,Jo=36096,Yo=36128,Xo=33306,$={};$[qo]=Xo,$[Go]=Yo,$[Ko]=Yo,$[Io]=Jo,$[Wo]=Jo,$[Lo]=Jo,$[Ro]=Jo,$[zo]=Xo,$[Bo]=Xo;var Zo={};Zo[Vo]=!0,Zo[Ho]=!0,Zo[Uo]=!0,Zo[qo]=!0,Zo[Wo]=!0,Zo[Go]=!0,Zo[Ko]=!0;var Qo={addExtensionsToContext:!0},$o=/^(.*?)_/;function es(e,t){ii(e,0);let n=e.getExtension(t);if(n){let r={},i=$o.exec(t)[1],a=`_`+i;for(let t in n){let o=n[t],s=typeof o==`function`,c=s?i:a,l=t;t.endsWith(c)&&(l=t.substring(0,t.length-c.length)),e[l]===void 0?s?e[l]=function(e){return function(){return e.apply(n,arguments)}}(o):(e[l]=o,r[l]=o):!s&&e[l]!==o&&br(l,e[l],o,t)}r.constructor={name:n.constructor.name},ii(r,0)}return n}var ts=`ANGLE_instanced_arrays.EXT_blend_minmax.EXT_color_buffer_float.EXT_color_buffer_half_float.EXT_disjoint_timer_query.EXT_disjoint_timer_query_webgl2.EXT_frag_depth.EXT_sRGB.EXT_shader_texture_lod.EXT_texture_compression_bptc.EXT_texture_compression_rgtc.EXT_texture_filter_anisotropic.OES_element_index_uint.OES_standard_derivatives.OES_texture_float.OES_texture_float_linear.OES_texture_half_float.OES_texture_half_float_linear.OES_vertex_array_object.WEBGL_color_buffer_float.WEBGL_compressed_texture_atc.WEBGL_compressed_texture_etc1.WEBGL_compressed_texture_etc.WEBGL_compressed_texture_pvrtc.WEBGL_compressed_texture_s3tc.WEBGL_compressed_texture_s3tc_srgb.WEBGL_depth_texture.WEBGL_draw_buffers`.split(`.`);function ns(e){for(let t=0;t<ts.length;++t)es(e,ts[t])}function rs(e,t){let n=[`webgl2`,`webgl`,`experimental-webgl`],r=null;for(let i=0;i<n.length;++i)if(r=e.getContext(n[i],t),r){Qo.addExtensionsToContext&&ns(r);break}return r}function is(e,t){return rs(e,t)}function as(e,t){t||=1,t=Math.max(0,t);let n=e.clientWidth*t|0,r=e.clientHeight*t|0;return e.width!==n||e.height!==r?(e.width=n,e.height=r,!0):!1}var os=150,ss=`
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
`,cs=`
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
`,ls=({theme:e,isDaylight:t,paused:n=!1})=>{let r=(0,A.useRef)(null),i=(0,A.useRef)(null),a=(0,A.useRef)(0),o=(0,A.useRef)(null),s=w(e.primaryColor)||(t?{r:0,g:0,b:0}:{r:255,g:255,b:255}),c=[s.r/255,s.g/255,s.b/255],l=w(e.accentColor)||s,u=[l.r/255,l.g/255,l.b/255],d=t?[1,1,1]:[0,0,0],f=(0,A.useRef)(n),p=(0,A.useRef)(c),m=(0,A.useRef)(u),h=(0,A.useRef)(d);return f.current=n,p.current=c,m.current=u,h.current=d,(0,A.useEffect)(()=>{let e=r.current;if(!e)return;let t=is(e,{alpha:!1,depth:!1,antialias:!1});if(!t)return;let n=Mo(t,[ss,cs],e=>{console.error(`SoraBackground twgl program error:`,e)});if(!n)return;let s=new Float32Array(os);for(let e=0;e<os;e++)s[e]=e;let c=ni(t,{a_index:{numComponents:1,data:s}}),l=null,u=()=>{i.current===null&&(i.current=requestAnimationFrame(d))},d=r=>{if(i.current=null,!f.current&&l!==null){let e=(r-l)/1e3;a.current+=e}l=f.current?null:r,as(e),t.viewport(0,0,t.canvas.width,t.canvas.height);let o=h.current;t.clearColor(o[0],o[1],o[2],1),t.clear(t.COLOR_BUFFER_BIT),t.enable(t.BLEND),t.blendFunc(t.ONE,t.ONE_MINUS_SRC_ALPHA);let s={u_resolution:[t.canvas.width,t.canvas.height],u_time:a.current,u_particle_color:p.current,u_particle_accent_color:m.current};t.useProgram(n.program),ko(t,n,c),Eo(n,s),Fo(t,c,t.POINTS),f.current||u()},g=new ResizeObserver(u);return g.observe(e),o.current=u,u(),()=>{o.current=null,g.disconnect(),i.current!==null&&(cancelAnimationFrame(i.current),i.current=null),t.deleteProgram(n.program),c.attribs&&c.attribs.a_index&&c.attribs.a_index.buffer&&t.deleteBuffer(c.attribs.a_index.buffer)}},[]),(0,A.useEffect)(()=>{o.current?.()},[n,t,e.primaryColor,e.accentColor]),(0,j.jsx)(`canvas`,{ref:r,className:`absolute inset-0 w-full h-full block pointer-events-none`,style:{width:`100%`,height:`100%`,willChange:`transform`,transform:`translateZ(0)`}})},us=({t:e,isDaylight:t,theme:n,controlCardBg:r,tuning:i,onTuningChange:a})=>{let o=T(n.secondaryColor,t?.18:.16);return(0,j.jsxs)(`div`,{className:`rounded-[24px] border p-4 space-y-5`,style:{backgroundColor:r,borderColor:o},children:[(0,j.jsx)(`div`,{className:`space-y-1`,children:(0,j.jsx)(`div`,{className:`text-sm font-medium`,style:{color:n.primaryColor},children:e(`options.soraBackgroundSettings`)})}),(0,j.jsx)(M,{label:e(`options.soraBlank`),description:e(`options.soraBlankDesc`),checked:i.blank,onChange:e=>a?.({blank:e}),theme:n})]})},ds=e({default:()=>fs}),fs=xe({mode:`sora`,order:50,labelKey:`options.visualizerBackgroundModeSora`,labelFallback:`Sora`,render:({config:e,theme:t,isDaylight:n,paused:r,staticMode:i})=>(0,j.jsx)(`div`,{className:`absolute inset-0 z-0`,style:{backgroundColor:n?`#ffffff`:`#000000`},children:!e?.sora?.tuning?.blank&&(0,j.jsx)(ls,{theme:t,isDaylight:n,paused:r||i})}),renderSettingsPanel:({config:e,actions:t,t:n,isDaylight:r,theme:i,controlCardBg:a})=>(0,j.jsx)(us,{t:n,isDaylight:r,theme:i,controlCardBg:a,tuning:e?.sora?.tuning??h,onTuningChange:t?.sora?.onTuningChange}),renderQuickControls:({config:e,actions:t,t:n,theme:r})=>{let a=e?.sora?.tuning??h;return(0,j.jsx)(Ce,{active:a.blank,theme:r,label:n(`options.soraBlank`),onToggle:()=>t?.sora?.onTuningChange?.({blank:!a.blank}),children:(0,j.jsx)(i,{size:14})})},resetSettings:e=>e?.sora?.onResetTuning?.()}),ps=({urlBackgroundList:e=[],urlBackgroundSelectedId:t=null})=>{let n=(0,A.useMemo)(()=>ne(e.find(e=>e.id===t)),[e,t]),r=(0,A.useRef)(null),[i,a]=(0,A.useState)(!1);return(0,A.useEffect)(()=>{a(!1);let e=r.current;if(!e)return;let t=e.getBoundingClientRect();if(t.width>0&&t.height>0){a(!0);return}let n=new ResizeObserver(e=>{for(let t of e){let{width:e,height:r}=t.contentRect;e>0&&r>0&&(a(!0),n.disconnect())}});return n.observe(e),()=>{n.disconnect()}},[n]),n?.url?(0,j.jsxs)(`div`,{ref:r,className:`absolute inset-0 z-0 overflow-hidden`,children:[i&&(0,j.jsx)(`iframe`,{src:n.url,title:n.note||n.url,className:`w-full h-full border-0`,style:{pointerEvents:`none`},sandbox:`allow-scripts`,allowFullScreen:!0},n.url),(0,j.jsx)(`div`,{className:`absolute inset-0`,style:{background:`linear-gradient(to bottom, rgba(0,0,0,0.15), rgba(0,0,0,0.35))`,pointerEvents:`none`}})]}):null},ms=()=>`url-bg-${Date.now()}-${Math.random().toString(36).slice(2,8)}`,hs=({t:e,isDaylight:t,theme:n,controlCardBg:r,urlBackgroundList:i=[],urlBackgroundSelectedId:s=null,onAddUrlBackgroundItem:l,onUpdateUrlBackgroundItem:f,onDeleteUrlBackgroundItem:m,onSetUrlBackgroundSelectedId:h})=>{let[g,_]=(0,A.useState)(!1),[v,y]=(0,A.useState)(null),[b,x]=(0,A.useState)(``),[S,C]=(0,A.useState)(``),w=(0,A.useCallback)(()=>{x(``),C(``),_(!1),y(null)},[]),ee=(0,A.useCallback)(()=>{let e=re(b);if(!e)return;let t={id:ms(),url:e,note:S.trim()||e};l?.(t),h?.(t.id),w()},[b,S,l,h,w]),te=(0,A.useCallback)(e=>{y(e.id),x(e.url),C(e.note)},[]),ne=(0,A.useCallback)(()=>{if(!v)return;let e=re(b);e&&(f?.(v,{url:e,note:S.trim()||e}),w())},[v,b,S,f,w]),ie=(0,A.useCallback)(e=>{m?.(e)},[m]),ae=(0,A.useCallback)(e=>{h?.(e)},[h]),E=T(n.secondaryColor,t?.18:.16),oe=T(n.backgroundColor,t?.24:.34),D=T(n.backgroundColor,t?.42:.52);return(0,j.jsxs)(`div`,{className:`rounded-[24px] border p-4 space-y-4`,style:{backgroundColor:r,borderColor:E},children:[(0,j.jsxs)(`div`,{className:`space-y-1`,children:[(0,j.jsx)(`div`,{className:`text-sm font-medium`,style:{color:n.primaryColor},children:e(`options.urlBackgroundSettings`)}),(0,j.jsx)(`div`,{className:`text-xs opacity-70`,style:{color:n.secondaryColor},children:e(`options.urlBackgroundSettingsDesc`)})]}),i.length>0&&(0,j.jsx)(`div`,{className:`space-y-2`,children:i.map(r=>(0,j.jsx)(`div`,{className:`rounded-2xl border p-3 transition-all`,style:{borderColor:r.id===s?n.accentColor:E,backgroundColor:r.id===s?T(n.accentColor,t?.1:.16):oe},children:v===r.id?(0,j.jsxs)(`div`,{className:`space-y-2`,children:[(0,j.jsx)(`input`,{type:`url`,value:b,onChange:e=>x(e.target.value),placeholder:`https://example.com`,className:`w-full rounded-xl border px-3 py-2 text-sm outline-none`,style:{backgroundColor:D,borderColor:E,color:n.primaryColor}}),(0,j.jsx)(`input`,{type:`text`,value:S,onChange:e=>C(e.target.value),placeholder:e(`options.urlBackgroundNotePlaceholder`),className:`w-full rounded-xl border px-3 py-2 text-sm outline-none`,style:{backgroundColor:D,borderColor:E,color:n.primaryColor}}),(0,j.jsxs)(`div`,{className:`flex gap-2 justify-end`,children:[(0,j.jsx)(`button`,{type:`button`,onClick:w,className:`h-8 w-8 rounded-full border flex items-center justify-center transition-colors hover:bg-white/10`,style:{borderColor:E,color:n.secondaryColor},children:(0,j.jsx)(c,{size:14})}),(0,j.jsx)(`button`,{type:`button`,onClick:ne,disabled:!b.trim(),className:`h-8 w-8 rounded-full border flex items-center justify-center transition-colors hover:bg-white/10 disabled:opacity-40`,style:{borderColor:n.accentColor,color:n.accentColor},children:(0,j.jsx)(d,{size:14})})]})]}):(0,j.jsxs)(`div`,{className:`flex items-center gap-3`,children:[(0,j.jsxs)(`button`,{type:`button`,onClick:()=>ae(r.id),className:`flex-1 text-left min-w-0`,children:[(0,j.jsx)(`div`,{className:`text-sm font-medium truncate`,style:{color:n.primaryColor},children:r.note}),(0,j.jsx)(`div`,{className:`text-xs opacity-60 truncate mt-0.5`,style:{color:n.secondaryColor},children:r.url})]}),(0,j.jsxs)(`div`,{className:`flex items-center gap-1 shrink-0`,children:[(0,j.jsx)(`button`,{type:`button`,onClick:()=>te(r),className:`h-7 w-7 rounded-full border flex items-center justify-center transition-colors hover:bg-white/10`,style:{borderColor:E,color:n.secondaryColor},children:(0,j.jsx)(u,{size:12})}),(0,j.jsx)(`button`,{type:`button`,onClick:()=>ie(r.id),className:`h-7 w-7 rounded-full border flex items-center justify-center transition-colors hover:bg-red-500/10`,style:{borderColor:E,color:n.secondaryColor},children:(0,j.jsx)(a,{size:12})})]})]})},r.id))}),g?(0,j.jsxs)(`div`,{className:`space-y-2 rounded-2xl border p-3`,style:{borderColor:E,backgroundColor:oe},children:[(0,j.jsx)(`input`,{type:`url`,value:b,onChange:e=>x(e.target.value),placeholder:`https://example.com`,autoFocus:!0,className:`w-full rounded-xl border px-3 py-2 text-sm outline-none`,style:{backgroundColor:D,borderColor:E,color:n.primaryColor}}),(0,j.jsx)(`input`,{type:`text`,value:S,onChange:e=>C(e.target.value),placeholder:e(`options.urlBackgroundNotePlaceholder`),className:`w-full rounded-xl border px-3 py-2 text-sm outline-none`,style:{backgroundColor:D,borderColor:E,color:n.primaryColor}}),(0,j.jsxs)(`div`,{className:`flex gap-2 justify-end`,children:[(0,j.jsx)(`button`,{type:`button`,onClick:w,className:`h-8 w-8 rounded-full border flex items-center justify-center transition-colors hover:bg-white/10`,style:{borderColor:E,color:n.secondaryColor},children:(0,j.jsx)(c,{size:14})}),(0,j.jsx)(`button`,{type:`button`,onClick:ee,disabled:!b.trim(),className:`h-8 w-8 rounded-full border flex items-center justify-center transition-colors hover:bg-white/10 disabled:opacity-40`,style:{borderColor:n.accentColor,color:n.accentColor},children:(0,j.jsx)(d,{size:14})})]})]}):(0,j.jsxs)(`button`,{type:`button`,onClick:()=>{x(``),C(``),_(!0)},className:`flex h-10 w-full items-center justify-center gap-2 rounded-2xl border px-4 text-sm font-medium transition-colors hover:bg-white/5`,style:{borderColor:E,color:n.primaryColor},children:[(0,j.jsx)(o,{size:16}),e(`options.urlBackgroundAdd`)]}),i.length===0&&!g&&(0,j.jsxs)(`div`,{className:`flex flex-col items-center gap-2 py-3 opacity-50`,children:[(0,j.jsx)(p,{size:24,style:{color:n.secondaryColor}}),(0,j.jsx)(`div`,{className:`text-xs`,style:{color:n.secondaryColor},children:e(`options.urlBackgroundEmpty`)})]})]})},gs=e({default:()=>_s}),_s=xe({mode:`url`,order:40,labelKey:`options.visualizerBackgroundModeUrl`,labelFallback:`Embed`,render:({config:e})=>(0,j.jsx)(ps,{urlBackgroundList:e?.url?.items,urlBackgroundSelectedId:e?.url?.selectedId}),renderSettingsPanel:({config:e,actions:t,...n})=>(0,j.jsx)(hs,{...n,urlBackgroundList:e?.url?.items,urlBackgroundSelectedId:e?.url?.selectedId,onAddUrlBackgroundItem:t?.url?.onAdd,onUpdateUrlBackgroundItem:t?.url?.onUpdate,onDeleteUrlBackgroundItem:t?.url?.onDelete,onSetUrlBackgroundSelectedId:t?.url?.onSelect})}),{entries:vs,byMode:ys}=(e=>{let t=Object.entries(e).map(([e,t])=>{if(!t.default)throw Error(`[VisualizerBackgroundRegistry] Missing default export in ${e}`);return t.default}),n={};return t.forEach(e=>{if(n[e.mode])throw Error(`[VisualizerBackgroundRegistry] Duplicate background mode "${e.mode}"`);n[e.mode]=e}),{entries:[...t].sort((e,t)=>e.order-t.order),byMode:n}})(Object.assign({"./common/entry.tsx":Be,"./latent/entry.tsx":Tt,"./monet/entry.tsx":Sn,"./nomand/entry.tsx":Xn,"./sora/entry.tsx":ds,"./url/entry.tsx":gs}));ee(`VisualizerBackgroundRegistry`,vs.map(e=>e.mode),te);var bs=e=>typeof e==`string`&&!!ys[e],xs=e=>ys[e]??ys.latent,Ss=(e,t)=>{let n=xs(e),r=t(n.labelKey);return!r||r===n.labelKey?n.labelFallback:r},Cs=e=>!ys[e.mode]&&(ys[e.mode]=e,vs.push(e),vs.sort((e,t)=>e.order-t.order),!0),ws=e=>{if(!ys[e])return!1;delete ys[e];let t=vs.findIndex(t=>t.mode===e);return t>=0&&vs.splice(t,1),!0};export{bs as a,Se as c,xs as i,Ce as l,Cs as n,ws as o,Ss as r,je as s,vs as t};