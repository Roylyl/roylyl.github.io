import{i as e,n as t,t as n}from"./rolldown-runtime-8BhlS34s.js";import{n as r,t as i}from"./app-core-Cuk4mU0H.js";import{r as a}from"./app-core-CXv2zSRo.js";import{c as o,f as s,h as c,u as l}from"./app-core-CRQwSvNF.js";var u=n((e=>{function t(e,t,n){if(n===void 0&&(n=Array.prototype),e&&typeof n.find==`function`)return n.find.call(e,t);for(var i=0;i<e.length;i++)if(r(e,i)){var a=e[i];if(t.call(void 0,a,i,e))return a}}function n(e,t){return t===void 0&&(t=Object),t&&typeof t.getOwnPropertyDescriptors==`function`&&(e=t.create(null,t.getOwnPropertyDescriptors(e))),t&&typeof t.freeze==`function`?t.freeze(e):e}function r(e,t){return Object.prototype.hasOwnProperty.call(e,t)}function i(e,t){if(typeof e!=`object`||!e)throw TypeError(`target is not an object`);for(var n in t)r(t,n)&&(e[n]=t[n]);return e}var a=n({allowfullscreen:!0,async:!0,autofocus:!0,autoplay:!0,checked:!0,controls:!0,default:!0,defer:!0,disabled:!0,formnovalidate:!0,hidden:!0,ismap:!0,itemscope:!0,loop:!0,multiple:!0,muted:!0,nomodule:!0,novalidate:!0,open:!0,playsinline:!0,readonly:!0,required:!0,reversed:!0,selected:!0});function o(e){return r(a,e.toLowerCase())}var s=n({area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0});function c(e){return r(s,e.toLowerCase())}var l=n({script:!1,style:!1,textarea:!0,title:!0});function u(e){var t=e.toLowerCase();return r(l,t)&&!l[t]}function d(e){var t=e.toLowerCase();return r(l,t)&&l[t]}function f(e){return e===m.HTML}function p(e){return f(e)||e===m.XML_XHTML_APPLICATION}var m=n({HTML:`text/html`,XML_APPLICATION:`application/xml`,XML_TEXT:`text/xml`,XML_XHTML_APPLICATION:`application/xhtml+xml`,XML_SVG_IMAGE:`image/svg+xml`}),h=Object.keys(m).map(function(e){return m[e]});function g(e){return h.indexOf(e)>-1}var _=n({HTML:`http://www.w3.org/1999/xhtml`,SVG:`http://www.w3.org/2000/svg`,XML:`http://www.w3.org/XML/1998/namespace`,XMLNS:`http://www.w3.org/2000/xmlns/`});e.assign=i,e.find=t,e.freeze=n,e.HTML_BOOLEAN_ATTRIBUTES=a,e.HTML_RAW_TEXT_ELEMENTS=l,e.HTML_VOID_ELEMENTS=s,e.hasDefaultHTMLNamespace=p,e.hasOwn=r,e.isHTMLBooleanAttribute=o,e.isHTMLRawTextElement=u,e.isHTMLEscapableRawTextElement=d,e.isHTMLMimeType=f,e.isHTMLVoidElement=c,e.isValidMimeType=g,e.MIME_TYPE=m,e.NAMESPACE=_})),d=n((e=>{var t=u();function n(e,t){e.prototype=Object.create(Error.prototype,{constructor:{value:e},name:{value:e.name,enumerable:!0,writable:t}})}var r=t.freeze({Error:`Error`,IndexSizeError:`IndexSizeError`,DomstringSizeError:`DomstringSizeError`,HierarchyRequestError:`HierarchyRequestError`,WrongDocumentError:`WrongDocumentError`,InvalidCharacterError:`InvalidCharacterError`,NoDataAllowedError:`NoDataAllowedError`,NoModificationAllowedError:`NoModificationAllowedError`,NotFoundError:`NotFoundError`,NotSupportedError:`NotSupportedError`,InUseAttributeError:`InUseAttributeError`,InvalidStateError:`InvalidStateError`,SyntaxError:`SyntaxError`,InvalidModificationError:`InvalidModificationError`,NamespaceError:`NamespaceError`,InvalidAccessError:`InvalidAccessError`,ValidationError:`ValidationError`,TypeMismatchError:`TypeMismatchError`,SecurityError:`SecurityError`,NetworkError:`NetworkError`,AbortError:`AbortError`,URLMismatchError:`URLMismatchError`,QuotaExceededError:`QuotaExceededError`,TimeoutError:`TimeoutError`,InvalidNodeTypeError:`InvalidNodeTypeError`,DataCloneError:`DataCloneError`,EncodingError:`EncodingError`,NotReadableError:`NotReadableError`,UnknownError:`UnknownError`,ConstraintError:`ConstraintError`,DataError:`DataError`,TransactionInactiveError:`TransactionInactiveError`,ReadOnlyError:`ReadOnlyError`,VersionError:`VersionError`,OperationError:`OperationError`,NotAllowedError:`NotAllowedError`,OptOutError:`OptOutError`}),i=Object.keys(r);function a(e){return typeof e==`number`&&e>=1&&e<=25}function o(e){return typeof e==`string`&&e.substring(e.length-r.Error.length)===r.Error}function s(e,t){a(e)?(this.name=i[e],this.message=t||``):(this.message=e,this.name=o(t)?t:r.Error),Error.captureStackTrace&&Error.captureStackTrace(this,s)}n(s,!0),Object.defineProperties(s.prototype,{code:{enumerable:!0,get:function(){var e=i.indexOf(this.name);return a(e)?e:0}}});for(var c={INDEX_SIZE_ERR:1,DOMSTRING_SIZE_ERR:2,HIERARCHY_REQUEST_ERR:3,WRONG_DOCUMENT_ERR:4,INVALID_CHARACTER_ERR:5,NO_DATA_ALLOWED_ERR:6,NO_MODIFICATION_ALLOWED_ERR:7,NOT_FOUND_ERR:8,NOT_SUPPORTED_ERR:9,INUSE_ATTRIBUTE_ERR:10,INVALID_STATE_ERR:11,SYNTAX_ERR:12,INVALID_MODIFICATION_ERR:13,NAMESPACE_ERR:14,INVALID_ACCESS_ERR:15,VALIDATION_ERR:16,TYPE_MISMATCH_ERR:17,SECURITY_ERR:18,NETWORK_ERR:19,ABORT_ERR:20,URL_MISMATCH_ERR:21,QUOTA_EXCEEDED_ERR:22,TIMEOUT_ERR:23,INVALID_NODE_TYPE_ERR:24,DATA_CLONE_ERR:25},l=Object.entries(c),d=0;d<l.length;d++){var f=l[d][0];s[f]=l[d][1]}function p(e,t,n){this.message=e,this.locator=t,this.cause=n,Error.captureStackTrace&&Error.captureStackTrace(this,p)}n(p),e.DOMException=s,e.DOMExceptionName=r,e.ExceptionCode=c,e.ParseError=p})),f=n((e=>{function t(e){try{typeof e!=`function`&&(e=RegExp);var t=new e(`𝌆`,`u`).exec(`𝌆`);return!!t&&t[0].length===2}catch{}return!1}var n=t();function r(e){if(e.source[0]!==`[`)throw Error(e+` can not be used with chars`);return e.source.slice(1,e.source.lastIndexOf(`]`))}function i(e,t){if(e.source[0]!==`[`)throw Error(`/`+e.source+`/ can not be used with chars_without`);if(!t||typeof t!=`string`)throw Error(JSON.stringify(t)+` is not a valid search`);if(e.source.indexOf(t)===-1)throw Error(`"`+t+`" is not is /`+e.source+`/`);if(t===`-`&&e.source.indexOf(t)!==1)throw Error(`"`+t+`" is not at the first postion of /`+e.source+`/`);return new RegExp(e.source.replace(t,``),n?`u`:``)}function a(e){var t=this;return new RegExp(Array.prototype.slice.call(arguments).map(function(e){var n=typeof e==`string`;if(n&&t===void 0&&e===`|`)throw Error("use regg instead of reg to wrap expressions with `|`!");return n?e:e.source}).join(``),n?`u`:``)}function o(e){if(arguments.length===0)throw Error(`no parameters provided`);return a.apply(o,[`(?:`].concat(Array.prototype.slice.call(arguments),[`)`]))}var s=`�`,c=/[-\x09\x0A\x0D\x20-\x2C\x2E-\uD7FF\uE000-\uFFFD]/;n&&(c=a(`[`,r(c),`\\u{10000}-\\u{10FFFF}`,`]`));var l=RegExp(`[^`+r(c)+`]`,n?`u`:``),u=/[\x20\x09\x0D\x0A]/,d=r(u),f=a(u,`+`),p=a(u,`*`),m=/[:_a-zA-Z\xC0-\xD6\xD8-\xF6\xF8-\u02FF\u0370-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD]/;n&&(m=a(`[`,r(m),`\\u{10000}-\\u{10FFFF}`,`]`));var h=a(`[`,r(m),r(/[-.0-9\xB7]/),r(/[\u0300-\u036F\u203F-\u2040]/),`]`),g=a(m,h,`*`),_=a(`^`,g,`$`),v=a(h,`+`),y=o(a(`&`,g,`;`),`|`,o(/&#[0-9]+;|&#x[0-9a-fA-F]+;/)),b=a(`%`,g,`;`),x=o(a(`"`,o(/[^%&"]/,`|`,b,`|`,y),`*`,`"`),`|`,a(`'`,o(/[^%&']/,`|`,b,`|`,y),`*`,`'`)),S=o(`"`,o(/[^<&"]/,`|`,y),`*`,`"`,`|`,`'`,o(/[^<&']/,`|`,y),`*`,`'`),C=a(i(m,`:`),i(h,`:`),`*`),w=a(`^`,C,`$`),T=a(C,o(`:`,C),`?`),E=a(`^`,T,`$`),D=a(`(`,T,`)`),O=o(/"[^"]*"|'[^']*'/),k=a(/^<\?/,`(`,g,`)`,o(f,`(?!`,u,`)(`,c,`*?)`),`?`,/\?>/),A=/[\x20\x0D\x0Aa-zA-Z0-9-'()+,./:=?;!*#@$_%]/,j=o(`"`,A,`*"`,`|`,`'`,i(A,`'`),`*'`),M=`<!--`,N=`-->`,P=a(M,o(i(c,`-`),`|`,a(`-`,i(c,`-`))),`*`,N),F=`#PCDATA`,I=o(`EMPTY`,`|`,`ANY`,`|`,o(a(/\(/,p,F,o(p,/\|/,p,T),`*`,p,/\)\*/),`|`,a(/\(/,p,F,p,/\)/)),`|`,a(/\([^>]+\)/,/[?*+]?/)),ee=a(`<!ELEMENT`,f,o(T,`|`,b),f,o(I,`|`,b),p,`>`),te=a(`<!ATTLIST`,f,g,o(f,g,f,o(/CDATA|ID|IDREF|IDREFS|ENTITY|ENTITIES|NMTOKEN|NMTOKENS/,`|`,o(a(`NOTATION`,f,/\(/,p,g,o(p,/\|/,p,g),`*`,p,/\)/),`|`,a(/\(/,p,v,o(p,/\|/,p,v),`*`,p,/\)/))),f,o(/#REQUIRED|#IMPLIED/,`|`,o(o(`#FIXED`,f),`?`,S))),`*`,p,`>`),L=`about:legacy-compat`,R=o(`"`+L+`"`,`|`,`'`+L+`'`),z=`SYSTEM`,ne=`PUBLIC`,B=o(o(z,f,O),`|`,o(ne,f,j,f,O)),V=a(`^`,o(o(z,f,`(?<SystemLiteralOnly>`,O,`)`),`|`,o(ne,f,`(?<PubidLiteral>`,j,`)`,f,`(?<SystemLiteral>`,O,`)`))),H=a(`^`,j,`$`),re=a(`^`,O,`$`),ie=o(x,`|`,o(B,o(f,`NDATA`,f,g),`?`)),ae=`<!ENTITY`,oe=o(a(ae,f,g,f,ie,p,`>`),`|`,a(ae,f,`%`,f,g,f,o(x,`|`,B),p,`>`)),se=a(`<!NOTATION`,f,g,f,o(B,`|`,a(ne,f,j)),p,`>`),ce=a(p,`=`,p),le=/1[.]\d+/,ue=a(f,`version`,ce,o(`'`,le,`'`,`|`,`"`,le,`"`)),de=/[A-Za-z][-A-Za-z0-9._]*/,fe=a(/^<\?xml/,ue,o(f,`encoding`,ce,o(`"`,de,`"`,`|`,`'`,de,`'`)),`?`,o(f,`standalone`,ce,o(`'`,o(`yes`,`|`,`no`),`'`,`|`,`"`,o(`yes`,`|`,`no`),`"`)),`?`,p,/\?>/),U=`<!DOCTYPE`,pe=`<![CDATA[`,me=`]]>`,W=a(/<!\[CDATA\[/,a(c,`*?`,/\]\]>/));e.chars=r,e.chars_without=i,e.detectUnicodeSupport=t,e.reg=a,e.regg=o,e.ABOUT_LEGACY_COMPAT=L,e.ABOUT_LEGACY_COMPAT_SystemLiteral=R,e.AttlistDecl=te,e.CDATA_START=pe,e.CDATA_END=me,e.CDSect=W,e.Char=c,e.Comment=P,e.COMMENT_START=M,e.COMMENT_END=N,e.DOCTYPE_DECL_START=U,e.elementdecl=ee,e.EntityDecl=oe,e.EntityValue=x,e.ExternalID=B,e.ExternalID_match=V,e.Name=g,e.Name_exact=_,e.NCName_exact=w,e.NotationDecl=se,e.Reference=y,e.PEReference=b,e.PI=k,e.PUBLIC=ne,e.PubidLiteral=j,e.PubidLiteral_match=H,e.QName=T,e.QName_exact=E,e.QName_group=D,e.S=f,e.SChar_s=d,e.S_OPT=p,e.SYSTEM=z,e.SystemLiteral=O,e.SystemLiteral_match=re,e.InvalidChar=l,e.UNICODE_REPLACEMENT_CHARACTER=s,e.UNICODE_SUPPORT=n,e.XMLDecl=fe})),p=n((e=>{var t=u(),n=t.find,r=t.hasDefaultHTMLNamespace,i=t.hasOwn,a=t.isHTMLMimeType,o=t.isHTMLRawTextElement,s=t.isHTMLVoidElement,c=t.MIME_TYPE,l=t.NAMESPACE,p=Symbol(),m=d(),h=m.DOMException,g=m.DOMExceptionName,_=f();function v(e){if(e!==p)throw TypeError(`Illegal constructor`)}function y(e){return e!==``}function b(e){return e?e.split(/[\t\n\f\r ]+/).filter(y):[]}function x(e,t){return i(e,t)||(e[t]=!0),e}function S(e){if(!e)return[];var t=b(e);return Object.keys(t.reduce(x,{}))}function C(e){return function(t){return e&&e.indexOf(t)!==-1}}function w(e){if(!_.QName_exact.test(e))throw new h(h.INVALID_CHARACTER_ERR,`invalid character in qualified name "`+e+`"`)}function T(e,n){w(n),e||=null;var r=null,i=n;if(n.indexOf(`:`)>=0){var a=n.split(`:`);r=a[0],i=a[1]}if(r!==null&&e===null)throw new h(h.NAMESPACE_ERR,`prefix is non-null and namespace is null`);if(r===`xml`&&e!==t.NAMESPACE.XML)throw new h(h.NAMESPACE_ERR,`prefix is "xml" and namespace is not the XML namespace`);if((r===`xmlns`||n===`xmlns`)&&e!==t.NAMESPACE.XMLNS)throw new h(h.NAMESPACE_ERR,`either qualifiedName or prefix is "xmlns" and namespace is not the XMLNS namespace`);if(e===t.NAMESPACE.XMLNS&&r!==`xmlns`&&n!==`xmlns`)throw new h(h.NAMESPACE_ERR,`namespace is the XMLNS namespace and neither qualifiedName nor prefix is "xmlns"`);return[e,r,i]}function E(e,t){for(var n in e)i(e,n)&&(t[n]=e[n])}function D(e,t){var n=e.prototype;if(!(n instanceof t)){function r(){}r.prototype=t.prototype,r=new r,E(n,r),e.prototype=n=r}n.constructor!=e&&(typeof e!=`function`&&console.error(`unknown Class:`+e),n.constructor=e)}var O={},k=O.ELEMENT_NODE=1,A=O.ATTRIBUTE_NODE=2,j=O.TEXT_NODE=3,M=O.CDATA_SECTION_NODE=4,N=O.ENTITY_REFERENCE_NODE=5,P=O.ENTITY_NODE=6,F=O.PROCESSING_INSTRUCTION_NODE=7,I=O.COMMENT_NODE=8,ee=O.DOCUMENT_NODE=9,te=O.DOCUMENT_TYPE_NODE=10,L=O.DOCUMENT_FRAGMENT_NODE=11,R=O.NOTATION_NODE=12,z=t.freeze({DOCUMENT_POSITION_DISCONNECTED:1,DOCUMENT_POSITION_PRECEDING:2,DOCUMENT_POSITION_FOLLOWING:4,DOCUMENT_POSITION_CONTAINS:8,DOCUMENT_POSITION_CONTAINED_BY:16,DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC:32});function ne(e,t){if(t.length<e.length)return ne(t,e);var n=null;for(var r in e){if(e[r]!==t[r])return n;n=e[r]}return n}function B(e){return e.guid||=Math.random(),e.guid}function V(){}V.prototype={length:0,item:function(e){return e>=0&&e<this.length?this[e]:null},toString:function(e){for(var t=typeof e==`function`?{requireWellFormed:!1,splitCDATASections:!0,nodeFilter:e}:e?{requireWellFormed:!!e.requireWellFormed,splitCDATASections:e.splitCDATASections!==!1,nodeFilter:e.nodeFilter||null}:{requireWellFormed:!1,splitCDATASections:!0,nodeFilter:null},n=[],r=0;r<this.length;r++)J(this[r],n,null,t);return n.join(``)},filter:function(e){return Array.prototype.filter.call(this,e)},indexOf:function(e){return Array.prototype.indexOf.call(this,e)}},V.prototype[Symbol.iterator]=function(){var e=this,t=0;return{next:function(){return t<e.length?{value:e[t++],done:!1}:{done:!0}},return:function(){return{done:!0}}}};function H(e,t){this._node=e,this._refresh=t,re(this)}function re(e){var t=e._node._inc||e._node.ownerDocument._inc;if(e._inc!==t){var n=e._refresh(e._node);if(Ke(e,`length`,n.length),!e.$$length||n.length<e.$$length)for(var r=n.length;r in e;r++)i(e,r)&&delete e[r];E(n,e),e._inc=t}}H.prototype.item=function(e){return re(this),this[e]||null},D(H,V);function ie(){this._nsIndex=Object.create(null),this._noNsIndex=Object.create(null)}function ae(e,t){for(var n=0;n<e.length;){if(e[n]===t)return n;n++}}function oe(e,t,n){if(!t)return e._noNsIndex;var r=e._nsIndex[t];return!r&&n&&(r=e._nsIndex[t]=Object.create(null)),r}function se(e,t,n){var r=oe(e,t,!1);return r&&r[n]||null}function ce(e,t){oe(e,t.namespaceURI,!0)[t.localName]=t}function le(e,t){var n=oe(e,t.namespaceURI,!1);n&&delete n[t.localName]}function ue(e,t,n,r){if(r?t[ae(t,r)]=n:(t[t.length]=n,t.length++),ce(t,n),e){n.ownerElement=e;var i=e.ownerDocument;i&&(r&&_e(i,e,r),ge(i,e,n))}}function de(e,t,n){var r=ae(t,n);if(r>=0){for(var i=t.length-1;r<=i;)t[r]=t[++r];if(t.length=i,le(t,n),e){var a=e.ownerDocument;a&&_e(a,e,n),n.ownerElement=null}}}ie.prototype={length:0,item:V.prototype.item,getNamedItem:function(e){this._ownerElement&&this._ownerElement._isInHTMLDocumentAndNamespace()&&(e=e.toLowerCase());for(var t=0;t<this.length;){var n=this[t];if(n.nodeName===e)return n;t++}return null},setNamedItem:function(e){var t=e.ownerElement;if(t&&t!==this._ownerElement)throw new h(h.INUSE_ATTRIBUTE_ERR);var n=se(this,e.namespaceURI,e.localName);return n===e?e:(ue(this._ownerElement,this,e,n),n)},setNamedItemNS:function(e){return this.setNamedItem(e)},removeNamedItem:function(e){var t=this.getNamedItem(e);if(!t)throw new h(h.NOT_FOUND_ERR,e);return de(this._ownerElement,this,t),t},removeNamedItemNS:function(e,t){var n=this.getNamedItemNS(e,t);if(!n)throw new h(h.NOT_FOUND_ERR,e?e+` : `+t:t);return de(this._ownerElement,this,n),n},getNamedItemNS:function(e,t){e||=null;for(var n=0;n<this.length;){var r=this[n];if(r.localName===t&&r.namespaceURI===e)return r;n++}return null}},ie.prototype[Symbol.iterator]=function(){var e=this,t=0;return{next:function(){return t<e.length?{value:e[t++],done:!1}:{done:!0}},return:function(){return{done:!0}}}};function fe(){}fe.prototype={hasFeature:function(e,t){return!0},createDocument:function(e,t,n){var r=c.XML_APPLICATION;e===l.HTML?r=c.XML_XHTML_APPLICATION:e===l.SVG&&(r=c.XML_SVG_IMAGE);var i=new he(p,{contentType:r});if(i.implementation=this,i.childNodes=new V,i.doctype=n||null,n&&i.appendChild(n),t){var a=i.createElementNS(e,t);i.appendChild(a)}return i},createDocumentType:function(e,t,n,r){w(e);var i=new Fe(p);return i.name=e,i.nodeName=e,i.publicId=t||``,i.systemId=n||``,i.internalSubset=r||``,i.childNodes=new V,i},createHTMLDocument:function(e){var t=new he(p,{contentType:c.HTML});if(t.implementation=this,t.childNodes=new V,e!==!1){t.doctype=this.createDocumentType(`html`),t.doctype.ownerDocument=t,t.appendChild(t.doctype);var n=t.createElement(`html`);t.appendChild(n);var r=t.createElement(`head`);if(n.appendChild(r),typeof e==`string`){var i=t.createElement(`title`);i.appendChild(t.createTextNode(e)),r.appendChild(i)}n.appendChild(t.createElement(`body`))}return t}};function U(e){v(e)}U.prototype={firstChild:null,lastChild:null,previousSibling:null,nextSibling:null,parentNode:null,get parentElement(){return this.parentNode&&this.parentNode.nodeType===this.ELEMENT_NODE?this.parentNode:null},childNodes:null,ownerDocument:null,nodeValue:null,namespaceURI:null,prefix:null,localName:null,baseURI:`about:blank`,get isConnected(){var e=this.getRootNode();return e&&e.nodeType===e.DOCUMENT_NODE},contains:function(e){if(!e)return!1;var t=e;do{if(this===t)return!0;t=t.parentNode}while(t);return!1},getRootNode:function(e){var t=this;do{if(!t.parentNode)return t;t=t.parentNode}while(t)},isEqualNode:function(e){if(!e)return!1;for(var t=[{node:this,other:e}];t.length>0;){var n=t.pop(),r=n.node,i=n.other;if(r.nodeType!==i.nodeType)return!1;switch(r.nodeType){case r.DOCUMENT_TYPE_NODE:if(r.name!==i.name||r.publicId!==i.publicId||r.systemId!==i.systemId)return!1;break;case r.ELEMENT_NODE:if(r.namespaceURI!==i.namespaceURI||r.prefix!==i.prefix||r.localName!==i.localName||r.attributes.length!==i.attributes.length)return!1;for(var a=0;a<r.attributes.length;a++){var o=r.attributes.item(a),s=i.getAttributeNodeNS(o.namespaceURI,o.localName);if(!s)return!1;t.push({node:o,other:s})}break;case r.ATTRIBUTE_NODE:if(r.namespaceURI!==i.namespaceURI||r.localName!==i.localName||r.value!==i.value)return!1;break;case r.PROCESSING_INSTRUCTION_NODE:if(r.target!==i.target||r.data!==i.data)return!1;break;case r.TEXT_NODE:case r.CDATA_SECTION_NODE:case r.COMMENT_NODE:if(r.data!==i.data)return!1}if(r.childNodes.length!==i.childNodes.length)return!1;for(var a=r.childNodes.length-1;a>=0;a--)t.push({node:r.childNodes[a],other:i.childNodes[a]})}return!0},isSameNode:function(e){return this===e},insertBefore:function(e,t){return ke(this,e,t)},replaceChild:function(e,t){ke(this,e,t,Oe),t&&this.removeChild(t)},removeChild:function(e){return ve(this,e)},appendChild:function(e){return this.insertBefore(e,null)},hasChildNodes:function(){return this.firstChild!=null},cloneNode:function(e){return Ge(this.ownerDocument||this,this,e)},normalize:function(){W(this,null,{enter:function(e){for(var t=e.firstChild;t;){var n=t.nextSibling;if(n!==null&&n.nodeType===j&&t.nodeType===j){for(var r=[],i=n;i!==null&&i.nodeType===j;)r.push(i.data),i=i.nextSibling;for(var a=t.nextSibling;a!==i;){var o=a.nextSibling;a.parentNode=null,a.previousSibling=null,a.nextSibling=null,a=o}t.nextSibling=i,i===null?e.lastChild=t:i.previousSibling=t,t.appendData(r.join(``)),G(e.ownerDocument,e),t=i}else t=n}return!0}})},isSupported:function(e,t){return this.ownerDocument.implementation.hasFeature(e,t)},lookupPrefix:function(e){for(var t=this;t;){var n=t._nsMap;if(n){for(var r in n)if(i(n,r)&&n[r]===e)return r}t=t.nodeType==A?t.ownerDocument:t.parentNode}return null},lookupNamespaceURI:function(e){for(var t=this;t;){var n=t._nsMap;if(n&&i(n,e))return n[e];t=t.nodeType==A?t.ownerDocument:t.parentNode}return null},isDefaultNamespace:function(e){return this.lookupPrefix(e)==null},compareDocumentPosition:function(e){if(this===e)return 0;var t=e,n=this,r=null,i=null;if(t instanceof je&&(r=t,t=r.ownerElement),n instanceof je&&(i=n,n=i.ownerElement,r&&t&&n===t))for(var a=0,o;o=n.attributes[a];a++){if(o===r)return z.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC+z.DOCUMENT_POSITION_PRECEDING;if(o===i)return z.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC+z.DOCUMENT_POSITION_FOLLOWING}if(!t||!n||n.ownerDocument!==t.ownerDocument)return z.DOCUMENT_POSITION_DISCONNECTED+z.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC+(B(n.ownerDocument)>B(t.ownerDocument)?z.DOCUMENT_POSITION_FOLLOWING:z.DOCUMENT_POSITION_PRECEDING);if(i&&t===n)return z.DOCUMENT_POSITION_CONTAINS+z.DOCUMENT_POSITION_PRECEDING;if(r&&t===n)return z.DOCUMENT_POSITION_CONTAINED_BY+z.DOCUMENT_POSITION_FOLLOWING;for(var s=[],c=t.parentNode;c;){if(!i&&c===n)return z.DOCUMENT_POSITION_CONTAINED_BY+z.DOCUMENT_POSITION_FOLLOWING;s.push(c),c=c.parentNode}s.reverse();for(var l=[],u=n.parentNode;u;){if(!r&&u===t)return z.DOCUMENT_POSITION_CONTAINS+z.DOCUMENT_POSITION_PRECEDING;l.push(u),u=u.parentNode}l.reverse();var d=ne(s,l);for(var f in d.childNodes){var p=d.childNodes[f];if(p===n)return z.DOCUMENT_POSITION_FOLLOWING;if(p===t)return z.DOCUMENT_POSITION_PRECEDING;if(l.indexOf(p)>=0)return z.DOCUMENT_POSITION_FOLLOWING;if(s.indexOf(p)>=0)return z.DOCUMENT_POSITION_PRECEDING}return 0}};function pe(e){return e==`<`&&`&lt;`||e==`>`&&`&gt;`||e==`&`&&`&amp;`||e==`"`&&`&quot;`||`&#`+e.charCodeAt()+`;`}E(O,U),E(O,U.prototype),E(z,U),E(z,U.prototype);function me(e,t){W(e,null,{enter:function(e){return!t(e)||W.STOP}})}function W(e,t,n){for(var r=[{node:e,context:t,phase:W.ENTER}];r.length>0;){var i=r.pop();if(i.phase===W.ENTER){var a=n.enter(i.node,i.context);if(a===W.STOP)return W.STOP;if(r.push({node:i.node,context:a,phase:W.EXIT}),a==null)continue;for(var o=i.node.lastChild;o;)r.push({node:o,context:a,phase:W.ENTER}),o=o.previousSibling}else n.exit&&n.exit(i.node,i.context)}}W.STOP=Symbol(`walkDOM.STOP`),W.ENTER=0,W.EXIT=1;function he(e,t){v(e);var n=t||{};this.ownerDocument=this,this.contentType=n.contentType||c.XML_APPLICATION,this.type=a(this.contentType)?`html`:`xml`}function ge(e,t,n){e&&e._inc++,n.namespaceURI===l.XMLNS&&(t._nsMap[n.prefix?n.localName:``]=n.value)}function _e(e,t,n,r){e&&e._inc++,n.namespaceURI===l.XMLNS&&delete t._nsMap[n.prefix?n.localName:``]}function G(e,t,n){if(e&&e._inc){e._inc++;var r=t.childNodes;if(n&&!n.nextSibling)r[r.length++]=n;else{for(var i=t.firstChild,a=0;i;)r[a++]=i,i=i.nextSibling;r.length=a,delete r[r.length]}}}function ve(e,t){if(e!==t.parentNode)throw new h(h.NOT_FOUND_ERR,`child's parent is not parent`);var n=t.previousSibling,r=t.nextSibling;return n?n.nextSibling=r:e.firstChild=r,r?r.previousSibling=n:e.lastChild=n,G(e.ownerDocument,e),t.parentNode=null,t.previousSibling=null,t.nextSibling=null,t}function ye(e){return e&&(e.nodeType===U.DOCUMENT_NODE||e.nodeType===U.DOCUMENT_FRAGMENT_NODE||e.nodeType===U.ELEMENT_NODE)}function be(e){return e&&(e.nodeType===U.CDATA_SECTION_NODE||e.nodeType===U.COMMENT_NODE||e.nodeType===U.DOCUMENT_FRAGMENT_NODE||e.nodeType===U.DOCUMENT_TYPE_NODE||e.nodeType===U.ELEMENT_NODE||e.nodeType===U.PROCESSING_INSTRUCTION_NODE||e.nodeType===U.TEXT_NODE)}function xe(e){return e&&e.nodeType===U.DOCUMENT_TYPE_NODE}function Se(e){return e&&e.nodeType===U.ELEMENT_NODE}function Ce(e){return e&&e.nodeType===U.TEXT_NODE}function we(e,t){var r=e.childNodes||[];if(n(r,Se)||xe(t))return!1;var i=n(r,xe);return!(t&&i&&r.indexOf(i)>r.indexOf(t))}function Te(e,t){var r=e.childNodes||[];function i(e){return Se(e)&&e!==t}if(n(r,i))return!1;var a=n(r,xe);return!(t&&a&&r.indexOf(a)>r.indexOf(t))}function Ee(e,t,n){if(!ye(e))throw new h(h.HIERARCHY_REQUEST_ERR,`Unexpected parent node type `+e.nodeType);if(n&&n.parentNode!==e)throw new h(h.NOT_FOUND_ERR,`child not in parent`);if(!be(t)||xe(t)&&e.nodeType!==U.DOCUMENT_NODE)throw new h(h.HIERARCHY_REQUEST_ERR,`Unexpected node type `+t.nodeType+` for parent node type `+e.nodeType)}function De(e,t,r){var i=e.childNodes||[],a=t.childNodes||[];if(t.nodeType===U.DOCUMENT_FRAGMENT_NODE){var o=a.filter(Se);if(o.length>1||n(a,Ce))throw new h(h.HIERARCHY_REQUEST_ERR,`More than one element or text in fragment`);if(o.length===1&&!we(e,r))throw new h(h.HIERARCHY_REQUEST_ERR,`Element in fragment can not be inserted before doctype`)}if(Se(t)&&!we(e,r))throw new h(h.HIERARCHY_REQUEST_ERR,`Only one element can be added and only after doctype`);if(xe(t)){if(n(i,xe))throw new h(h.HIERARCHY_REQUEST_ERR,`Only one doctype is allowed`);var s=n(i,Se);if(r&&i.indexOf(s)<i.indexOf(r))throw new h(h.HIERARCHY_REQUEST_ERR,`Doctype can only be inserted before an element`);if(!r&&s)throw new h(h.HIERARCHY_REQUEST_ERR,`Doctype can not be appended since element is present`)}}function Oe(e,t,r){var i=e.childNodes||[],a=t.childNodes||[];if(t.nodeType===U.DOCUMENT_FRAGMENT_NODE){var o=a.filter(Se);if(o.length>1||n(a,Ce))throw new h(h.HIERARCHY_REQUEST_ERR,`More than one element or text in fragment`);if(o.length===1&&!Te(e,r))throw new h(h.HIERARCHY_REQUEST_ERR,`Element in fragment can not be inserted before doctype`)}if(Se(t)&&!Te(e,r))throw new h(h.HIERARCHY_REQUEST_ERR,`Only one element can be added and only after doctype`);if(xe(t)){function e(e){return xe(e)&&e!==r}if(n(i,e))throw new h(h.HIERARCHY_REQUEST_ERR,`Only one doctype is allowed`);var s=n(i,Se);if(r&&i.indexOf(s)<i.indexOf(r))throw new h(h.HIERARCHY_REQUEST_ERR,`Doctype can only be inserted before an element`)}}function ke(e,t,n,r){Ee(e,t,n),e.nodeType===U.DOCUMENT_NODE&&(r||De)(e,t,n);var i=t.parentNode;if(i&&i.removeChild(t),t.nodeType===L){var a=t.firstChild;if(a==null)return t;var o=t.lastChild}else a=o=t;var s=n?n.previousSibling:e.lastChild;a.previousSibling=s,o.nextSibling=n,s?s.nextSibling=a:e.firstChild=a,n==null?e.lastChild=o:n.previousSibling=o;do a.parentNode=e;while(a!==o&&(a=a.nextSibling));return G(e.ownerDocument||e,e,t),t.nodeType==L&&(t.firstChild=t.lastChild=null),t}he.prototype={implementation:null,nodeName:`#document`,nodeType:ee,doctype:null,documentElement:null,_inc:1,insertBefore:function(e,t){if(e.nodeType===L){for(var n=e.firstChild;n;){var r=n.nextSibling;this.insertBefore(n,t),n=r}return e}return ke(this,e,t),e.ownerDocument=this,this.documentElement===null&&e.nodeType===k&&(this.documentElement=e),e},removeChild:function(e){var t=ve(this,e);return t===this.documentElement&&(this.documentElement=null),t},replaceChild:function(e,t){ke(this,e,t,Oe),e.ownerDocument=this,t&&this.removeChild(t),Se(e)&&(this.documentElement=e)},importNode:function(e,t){return We(this,e,t)},getElementById:function(e){var t=null;return me(this.documentElement,function(n){if(n.nodeType==k&&n.getAttribute(`id`)==e)return t=n,!0}),t},createElement:function(e){var t=new Ae(p);t.ownerDocument=this,this.type===`html`&&(e=e.toLowerCase()),r(this.contentType)&&(t.namespaceURI=l.HTML),t.nodeName=e,t.tagName=e,t.localName=e,t.childNodes=new V;var n=t.attributes=new ie;return n._ownerElement=t,t},createDocumentFragment:function(){var e=new ze(p);return e.ownerDocument=this,e.childNodes=new V,e},createTextNode:function(e){var t=new Ne(p);return t.ownerDocument=this,t.childNodes=new V,t.appendData(e),t},createComment:function(e){var t=new K(p);return t.ownerDocument=this,t.childNodes=new V,t.appendData(e),t},createCDATASection:function(e){if(e.indexOf(`]]>`)!==-1)throw new h(h.INVALID_CHARACTER_ERR,`data contains "]]>"`);var t=new Pe(p);return t.ownerDocument=this,t.childNodes=new V,t.appendData(e),t},createProcessingInstruction:function(e,t){var n=new q(p);return n.ownerDocument=this,n.childNodes=new V,n.nodeName=n.target=e,n.nodeValue=n.data=t,n},createAttribute:function(e){if(!_.QName_exact.test(e))throw new h(h.INVALID_CHARACTER_ERR,`invalid character in name "`+e+`"`);return this.type===`html`&&(e=e.toLowerCase()),this._createAttribute(e)},_createAttribute:function(e){var t=new je(p);return t.ownerDocument=this,t.childNodes=new V,t.name=e,t.nodeName=e,t.localName=e,t.specified=!0,t},createEntityReference:function(e){if(!_.Name_exact.test(e))throw new h(h.INVALID_CHARACTER_ERR,`not a valid xml name "`+e+`"`);if(this.type===`html`)throw new h(`document is an html document`,g.NotSupportedError);var t=new Re(p);return t.ownerDocument=this,t.childNodes=new V,t.nodeName=e,t},createElementNS:function(e,t){var n=T(e,t),r=new Ae(p),i=r.attributes=new ie;return r.childNodes=new V,r.ownerDocument=this,r.nodeName=t,r.tagName=t,r.namespaceURI=n[0],r.prefix=n[1],r.localName=n[2],i._ownerElement=r,r},createAttributeNS:function(e,t){var n=T(e,t),r=new je(p);return r.ownerDocument=this,r.childNodes=new V,r.nodeName=t,r.name=t,r.specified=!0,r.namespaceURI=n[0],r.prefix=n[1],r.localName=n[2],r}},D(he,U);function Ae(e){v(e),this._nsMap=Object.create(null)}Ae.prototype={nodeType:k,attributes:null,getQualifiedName:function(){return this.prefix?this.prefix+`:`+this.localName:this.localName},_isInHTMLDocumentAndNamespace:function(){return this.ownerDocument.type===`html`&&this.namespaceURI===l.HTML},hasAttributes:function(){return!!(this.attributes&&this.attributes.length)},hasAttribute:function(e){return!!this.getAttributeNode(e)},getAttribute:function(e){var t=this.getAttributeNode(e);return t?t.value:null},getAttributeNode:function(e){return this._isInHTMLDocumentAndNamespace()&&(e=e.toLowerCase()),this.attributes.getNamedItem(e)},setAttribute:function(e,t){this._isInHTMLDocumentAndNamespace()&&(e=e.toLowerCase());var n=this.getAttributeNode(e);n?n.value=n.nodeValue=``+t:(n=this.ownerDocument._createAttribute(e),n.value=n.nodeValue=``+t,this.setAttributeNode(n))},removeAttribute:function(e){var t=this.getAttributeNode(e);t&&this.removeAttributeNode(t)},setAttributeNode:function(e){return this.attributes.setNamedItem(e)},setAttributeNodeNS:function(e){return this.attributes.setNamedItemNS(e)},removeAttributeNode:function(e){return this.attributes.removeNamedItem(e.nodeName)},removeAttributeNS:function(e,t){var n=this.getAttributeNodeNS(e,t);n&&this.removeAttributeNode(n)},hasAttributeNS:function(e,t){return this.getAttributeNodeNS(e,t)!=null},getAttributeNS:function(e,t){var n=this.getAttributeNodeNS(e,t);return n?n.value:null},setAttributeNS:function(e,t,n){var r=T(e,t)[2],i=this.getAttributeNodeNS(e,r);i?i.value=i.nodeValue=``+n:(i=this.ownerDocument.createAttributeNS(e,t),i.value=i.nodeValue=``+n,this.setAttributeNode(i))},getAttributeNodeNS:function(e,t){return this.attributes.getNamedItemNS(e,t)},getElementsByClassName:function(e){var t=S(e);return new H(this,function(n){var r=[];return t.length>0&&me(n,function(i){if(i!==n&&i.nodeType===k){var a=i.getAttribute(`class`);if(a){var o=e===a;if(!o){var s=S(a);o=t.every(C(s))}o&&r.push(i)}}}),r})},getElementsByTagName:function(e){var t=(this.nodeType===ee?this:this.ownerDocument).type===`html`,n=e.toLowerCase();return new H(this,function(r){var i=[];return me(r,function(a){a!==r&&a.nodeType===k&&(e===`*`||a.getQualifiedName()===(t&&a.namespaceURI===l.HTML?n:e))&&i.push(a)}),i})},getElementsByTagNameNS:function(e,t){return new H(this,function(n){var r=[];return me(n,function(i){i!==n&&i.nodeType===k&&(e===`*`||i.namespaceURI===e)&&(t===`*`||i.localName==t)&&r.push(i)}),r})}},he.prototype.getElementsByClassName=Ae.prototype.getElementsByClassName,he.prototype.getElementsByTagName=Ae.prototype.getElementsByTagName,he.prototype.getElementsByTagNameNS=Ae.prototype.getElementsByTagNameNS,D(Ae,U);function je(e){v(e),this.namespaceURI=null,this.prefix=null,this.ownerElement=null}je.prototype.nodeType=A,D(je,U);function Me(e){v(e)}Me.prototype={data:``,substringData:function(e,t){return this.data.substring(e,e+t)},appendData:function(e){e=this.data+e,this.nodeValue=this.data=e,this.length=e.length},insertData:function(e,t){this.replaceData(e,0,t)},deleteData:function(e,t){this.replaceData(e,t,``)},replaceData:function(e,t,n){var r=this.data.substring(0,e),i=this.data.substring(e+t);n=r+n+i,this.nodeValue=this.data=n,this.length=n.length}},D(Me,U);function Ne(e){v(e)}Ne.prototype={nodeName:`#text`,nodeType:j,splitText:function(e){var t=this.data,n=t.substring(e);t=t.substring(0,e),this.data=this.nodeValue=t,this.length=t.length;var r=this.ownerDocument.createTextNode(n);return this.parentNode&&this.parentNode.insertBefore(r,this.nextSibling),r}},D(Ne,Me);function K(e){v(e)}K.prototype={nodeName:`#comment`,nodeType:I},D(K,Me);function Pe(e){v(e)}Pe.prototype={nodeName:`#cdata-section`,nodeType:M},D(Pe,Ne);function Fe(e){v(e)}Fe.prototype.nodeType=te,D(Fe,U);function Ie(e){v(e)}Ie.prototype.nodeType=R,D(Ie,U);function Le(e){v(e)}Le.prototype.nodeType=P,D(Le,U);function Re(e){v(e)}Re.prototype.nodeType=N,D(Re,U);function ze(e){v(e)}ze.prototype.nodeName=`#document-fragment`,ze.prototype.nodeType=L,D(ze,U);function q(e){v(e)}q.prototype.nodeType=F,D(q,Me);function Be(){}Be.prototype.serializeToString=function(e,t){return Ve.call(e,t)},U.prototype.toString=Ve;function Ve(e){var t=typeof e==`function`?{requireWellFormed:!1,splitCDATASections:!0,nodeFilter:e}:e==null?{requireWellFormed:!1,splitCDATASections:!0,nodeFilter:null}:{requireWellFormed:!!e.requireWellFormed,splitCDATASections:e.splitCDATASections!==!1,nodeFilter:e.nodeFilter||null},n=[],r=this.nodeType===ee&&this.documentElement||this,i=r.prefix,a=r.namespaceURI;if(a&&i==null){var i=r.lookupPrefix(a);if(i==null)var o=[{namespace:a,prefix:null}]}return J(this,n,o,t),n.join(``)}function He(e,t,n){var r=e.prefix||``,i=e.namespaceURI;if(!i||r===`xml`&&i===l.XML||i===l.XMLNS)return!1;for(var a=n.length;a--;){var o=n[a];if(o.prefix===r)return o.namespace!==i}return!0}function Ue(e,t,n,r){if(r&&!_.QName_exact.test(t))throw new h(`The attribute name "`+t+`" is not a valid XML QName`,g.InvalidStateError);e.push(` `,t,`="`,n.replace(/[<>&"\t\n\r]/g,pe),`"`)}function J(e,t,n,r){n||=[];var i=r.nodeFilter,a=r.requireWellFormed,c=r.splitCDATASections,u=(e.nodeType===ee?e:e.ownerDocument).type===`html`;W(e,{ns:n},{enter:function(e,n){var d=n.ns;if(i){if(e=i(e),e){if(typeof e==`string`)return t.push(e),null}else return null}switch(e.nodeType){case k:var f=e.attributes,p=f.length,m=e.tagName,v=m;if(!u&&!e.prefix&&e.namespaceURI){for(var y,b=0;b<f.length;b++)if(f.item(b).name===`xmlns`){y=f.item(b).value;break}if(!y)for(var x=d.length-1;x>=0;x--){var S=d[x];if(S.prefix===``&&S.namespace===e.namespaceURI){y=S.namespace;break}}if(y!==e.namespaceURI)for(var x=d.length-1;x>=0;x--){var S=d[x];if(S.namespace===e.namespaceURI){S.prefix&&(v=S.prefix+`:`+m);break}}}if(a&&!_.QName_exact.test(v))throw new h(`The element name "`+v+`" is not a valid XML QName`,g.InvalidStateError);t.push(`<`,v);for(var C=d.slice(),w=0;w<p;w++){var T=f.item(w);T.prefix==`xmlns`?C.push({prefix:T.localName,namespace:T.value}):T.nodeName==`xmlns`&&C.push({prefix:``,namespace:T.value})}for(var w=0;w<p;w++){var T=f.item(w);if(He(T,u,C)){var E=T.prefix||``,D=T.namespaceURI;Ue(t,E?`xmlns:`+E:`xmlns`,D,a),C.push({prefix:E,namespace:D})}var O=i?i(T):T;O&&(typeof O==`string`?t.push(O):Ue(t,O.name,O.value,a))}if(m===v&&He(e,u,C)){var P=e.prefix||``,D=e.namespaceURI;Ue(t,P?`xmlns:`+P:`xmlns`,D,a),C.push({prefix:P,namespace:D})}var R=!e.firstChild;if(R&&(u||e.namespaceURI===l.HTML)&&(R=s(m)),R)return t.push(`/>`),null;if(t.push(`>`),u&&o(m)){for(var z=e.firstChild;z;)z.data?t.push(z.data):J(z,t,C.slice(),r),z=z.nextSibling;return t.push(`</`,v,`>`),null}return{ns:C,tag:v};case ee:case L:if(a&&e.nodeType===ee&&e.documentElement==null)throw new h(`The Document has no documentElement`,g.InvalidStateError);return{ns:d};case A:return Ue(t,e.name,e.value,a),null;case j:if(a&&_.InvalidChar.test(e.data))throw new h(`The Text node data contains characters outside the XML Char production`,g.InvalidStateError);return t.push(e.data.replace(/[<&>]/g,pe)),null;case M:if(a&&e.data.indexOf(`]]>`)!==-1)throw new h(`The CDATASection data contains "]]>"`,g.InvalidStateError);return c?t.push(_.CDATA_START,e.data.replace(/]]>/g,`]]]]><![CDATA[>`),_.CDATA_END):t.push(_.CDATA_START,e.data,_.CDATA_END),null;case I:if(a){if(_.InvalidChar.test(e.data))throw new h(`The comment node data contains characters outside the XML Char production`,g.InvalidStateError);if(e.data.indexOf(`--`)!==-1||e.data[e.data.length-1]===`-`)throw new h(`The comment node data contains "--" or ends with "-"`,g.InvalidStateError)}return t.push(_.COMMENT_START,e.data,_.COMMENT_END),null;case te:var ne=e.publicId,B=e.systemId;if(a){if(!_.Name_exact.test(e.name))throw new h(`The doctype name "`+e.name+`" is not a valid XML Name`,g.InvalidStateError);if(ne&&!_.PubidLiteral_match.test(ne))throw new h(`DocumentType publicId is not a valid PubidLiteral`,g.InvalidStateError);if(B&&B!==`.`&&!_.SystemLiteral_match.test(B))throw new h(`DocumentType systemId is not a valid SystemLiteral`,g.InvalidStateError);if(e.internalSubset&&e.internalSubset.indexOf(`]>`)!==-1)throw new h(`DocumentType internalSubset contains "]>"`,g.InvalidStateError)}return t.push(_.DOCTYPE_DECL_START,` `,e.name),ne?(t.push(` `,_.PUBLIC,` `,ne),B&&B!==`.`&&t.push(` `,B)):B&&B!==`.`&&t.push(` `,_.SYSTEM,` `,B),e.internalSubset&&t.push(` [`,e.internalSubset,`]`),t.push(`>`),null;case F:if(a){if(!_.NCName_exact.test(e.target)||e.target.toLowerCase()===`xml`)throw new h(`The processing instruction target "`+e.target+`" is not a valid XML NCName or is reserved`,g.InvalidStateError);if(_.InvalidChar.test(e.data))throw new h(`The ProcessingInstruction data contains characters outside the XML Char production`,g.InvalidStateError);if(e.data.indexOf(`?>`)!==-1)throw new h(`The ProcessingInstruction data contains "?>"`,g.InvalidStateError)}return t.push(`<?`,e.target,` `,e.data,`?>`),null;case N:if(a&&!_.Name_exact.test(e.nodeName))throw new h(`The entity reference name "`+e.nodeName+`" is not a valid XML Name`,g.InvalidStateError);return t.push(`&`,e.nodeName,`;`),null;default:return t.push(`??`,e.nodeName),null}},exit:function(e,n){n&&n.tag&&t.push(`</`,n.tag,`>`)}})}function We(e,t,n){var r;return W(t,null,{enter:function(t,i){var a=t.cloneNode(!1);return a.ownerDocument=e,a.parentNode=null,i===null?r=a:i.appendChild(a),t.nodeType===A||n?a:null}}),r}function Ge(e,t,n){var r;return W(t,null,{enter:function(t,a){var o=new t.constructor(p);for(var s in t)if(i(t,s)){var c=t[s];typeof c!=`object`&&c!=o[s]&&(o[s]=c)}t.childNodes&&(o.childNodes=new V),o.ownerDocument=e;var l=n;switch(o.nodeType){case k:var u=t.attributes,d=o.attributes=new ie,f=u.length;d._ownerElement=o;for(var m=0;m<f;m++)o.setAttributeNode(Ge(e,u.item(m),!0));break;case A:l=!0}return a===null?r=o:a.appendChild(o),l?o:null}}),r}function Ke(e,t,n){e[t]=n}function qe(e){for(var t=[],n=e.firstChild;n;)n.nodeType===k&&t.push(n),n=n.nextSibling;return t}try{Object.defineProperty&&(Object.defineProperty(H.prototype,"length",{get:function(){return re(this),this.$$length}}),Object.defineProperty(U.prototype,"textContent",{get:function(){if(this.nodeType===k||this.nodeType===L){var e=[];return W(this,null,{enter:function(t){if(t.nodeType===k||t.nodeType===L)return!0;if(t.nodeType===F||t.nodeType===I)return null;e.push(t.nodeValue)}}),e.join(``)}return this.nodeValue},set:function(e){switch(this.nodeType){case k:case L:for(;this.firstChild;)this.removeChild(this.firstChild);(e||String(e))&&this.appendChild(this.ownerDocument.createTextNode(e));break;default:this.data=e,this.value=e,this.nodeValue=e}}}),Object.defineProperty(Me.prototype,"data",{get:function(){return this._data==null?``:this._data},set:function(e){this._data=e,this.length=typeof e==`string`?e.length:0}}),Object.defineProperty(Me.prototype,"nodeValue",{get:function(){return this.data},set:function(e){this.data=e},enumerable:!0,configurable:!0}),Object.defineProperty(Ae.prototype,"children",{get:function(){return new H(this,qe)}}),Object.defineProperty(he.prototype,"children",{get:function(){return new H(this,qe)}}),Object.defineProperty(ze.prototype,"children",{get:function(){return new H(this,qe)}}),Ke=function(e,t,n){e[`$$`+t]=n})}catch{}e._updateLiveList=re,e.Attr=je,e.CDATASection=Pe,e.CharacterData=Me,e.Comment=K,e.Document=he,e.DocumentFragment=ze,e.DocumentType=Fe,e.DOMImplementation=fe,e.Element=Ae,e.Entity=Le,e.EntityReference=Re,e.LiveNodeList=H,e.NamedNodeMap=ie,e.Node=U,e.NodeList=V,e.Notation=Ie,e.Text=Ne,e.ProcessingInstruction=q,e.walkDOM=W,e.XMLSerializer=Be})),m=n((e=>{var t=u().freeze;e.XML_ENTITIES=t({amp:`&`,apos:`'`,gt:`>`,lt:`<`,quot:`"`}),e.HTML_ENTITIES=t({Aacute:`Á`,aacute:`á`,Abreve:`Ă`,abreve:`ă`,ac:`∾`,acd:`∿`,acE:`∾̳`,Acirc:`Â`,acirc:`â`,acute:`´`,Acy:`А`,acy:`а`,AElig:`Æ`,aelig:`æ`,af:`⁡`,Afr:`𝔄`,afr:`𝔞`,Agrave:`À`,agrave:`à`,alefsym:`ℵ`,aleph:`ℵ`,Alpha:`Α`,alpha:`α`,Amacr:`Ā`,amacr:`ā`,amalg:`⨿`,AMP:`&`,amp:`&`,And:`⩓`,and:`∧`,andand:`⩕`,andd:`⩜`,andslope:`⩘`,andv:`⩚`,ang:`∠`,ange:`⦤`,angle:`∠`,angmsd:`∡`,angmsdaa:`⦨`,angmsdab:`⦩`,angmsdac:`⦪`,angmsdad:`⦫`,angmsdae:`⦬`,angmsdaf:`⦭`,angmsdag:`⦮`,angmsdah:`⦯`,angrt:`∟`,angrtvb:`⊾`,angrtvbd:`⦝`,angsph:`∢`,angst:`Å`,angzarr:`⍼`,Aogon:`Ą`,aogon:`ą`,Aopf:`𝔸`,aopf:`𝕒`,ap:`≈`,apacir:`⩯`,apE:`⩰`,ape:`≊`,apid:`≋`,apos:`'`,ApplyFunction:`⁡`,approx:`≈`,approxeq:`≊`,Aring:`Å`,aring:`å`,Ascr:`𝒜`,ascr:`𝒶`,Assign:`≔`,ast:`*`,asymp:`≈`,asympeq:`≍`,Atilde:`Ã`,atilde:`ã`,Auml:`Ä`,auml:`ä`,awconint:`∳`,awint:`⨑`,backcong:`≌`,backepsilon:`϶`,backprime:`‵`,backsim:`∽`,backsimeq:`⋍`,Backslash:`∖`,Barv:`⫧`,barvee:`⊽`,Barwed:`⌆`,barwed:`⌅`,barwedge:`⌅`,bbrk:`⎵`,bbrktbrk:`⎶`,bcong:`≌`,Bcy:`Б`,bcy:`б`,bdquo:`„`,becaus:`∵`,Because:`∵`,because:`∵`,bemptyv:`⦰`,bepsi:`϶`,bernou:`ℬ`,Bernoullis:`ℬ`,Beta:`Β`,beta:`β`,beth:`ℶ`,between:`≬`,Bfr:`𝔅`,bfr:`𝔟`,bigcap:`⋂`,bigcirc:`◯`,bigcup:`⋃`,bigodot:`⨀`,bigoplus:`⨁`,bigotimes:`⨂`,bigsqcup:`⨆`,bigstar:`★`,bigtriangledown:`▽`,bigtriangleup:`△`,biguplus:`⨄`,bigvee:`⋁`,bigwedge:`⋀`,bkarow:`⤍`,blacklozenge:`⧫`,blacksquare:`▪`,blacktriangle:`▴`,blacktriangledown:`▾`,blacktriangleleft:`◂`,blacktriangleright:`▸`,blank:`␣`,blk12:`▒`,blk14:`░`,blk34:`▓`,block:`█`,bne:`=⃥`,bnequiv:`≡⃥`,bNot:`⫭`,bnot:`⌐`,Bopf:`𝔹`,bopf:`𝕓`,bot:`⊥`,bottom:`⊥`,bowtie:`⋈`,boxbox:`⧉`,boxDL:`╗`,boxDl:`╖`,boxdL:`╕`,boxdl:`┐`,boxDR:`╔`,boxDr:`╓`,boxdR:`╒`,boxdr:`┌`,boxH:`═`,boxh:`─`,boxHD:`╦`,boxHd:`╤`,boxhD:`╥`,boxhd:`┬`,boxHU:`╩`,boxHu:`╧`,boxhU:`╨`,boxhu:`┴`,boxminus:`⊟`,boxplus:`⊞`,boxtimes:`⊠`,boxUL:`╝`,boxUl:`╜`,boxuL:`╛`,boxul:`┘`,boxUR:`╚`,boxUr:`╙`,boxuR:`╘`,boxur:`└`,boxV:`║`,boxv:`│`,boxVH:`╬`,boxVh:`╫`,boxvH:`╪`,boxvh:`┼`,boxVL:`╣`,boxVl:`╢`,boxvL:`╡`,boxvl:`┤`,boxVR:`╠`,boxVr:`╟`,boxvR:`╞`,boxvr:`├`,bprime:`‵`,Breve:`˘`,breve:`˘`,brvbar:`¦`,Bscr:`ℬ`,bscr:`𝒷`,bsemi:`⁏`,bsim:`∽`,bsime:`⋍`,bsol:`\\`,bsolb:`⧅`,bsolhsub:`⟈`,bull:`•`,bullet:`•`,bump:`≎`,bumpE:`⪮`,bumpe:`≏`,Bumpeq:`≎`,bumpeq:`≏`,Cacute:`Ć`,cacute:`ć`,Cap:`⋒`,cap:`∩`,capand:`⩄`,capbrcup:`⩉`,capcap:`⩋`,capcup:`⩇`,capdot:`⩀`,CapitalDifferentialD:`ⅅ`,caps:`∩︀`,caret:`⁁`,caron:`ˇ`,Cayleys:`ℭ`,ccaps:`⩍`,Ccaron:`Č`,ccaron:`č`,Ccedil:`Ç`,ccedil:`ç`,Ccirc:`Ĉ`,ccirc:`ĉ`,Cconint:`∰`,ccups:`⩌`,ccupssm:`⩐`,Cdot:`Ċ`,cdot:`ċ`,cedil:`¸`,Cedilla:`¸`,cemptyv:`⦲`,cent:`¢`,CenterDot:`·`,centerdot:`·`,Cfr:`ℭ`,cfr:`𝔠`,CHcy:`Ч`,chcy:`ч`,check:`✓`,checkmark:`✓`,Chi:`Χ`,chi:`χ`,cir:`○`,circ:`ˆ`,circeq:`≗`,circlearrowleft:`↺`,circlearrowright:`↻`,circledast:`⊛`,circledcirc:`⊚`,circleddash:`⊝`,CircleDot:`⊙`,circledR:`®`,circledS:`Ⓢ`,CircleMinus:`⊖`,CirclePlus:`⊕`,CircleTimes:`⊗`,cirE:`⧃`,cire:`≗`,cirfnint:`⨐`,cirmid:`⫯`,cirscir:`⧂`,ClockwiseContourIntegral:`∲`,CloseCurlyDoubleQuote:`”`,CloseCurlyQuote:`’`,clubs:`♣`,clubsuit:`♣`,Colon:`∷`,colon:`:`,Colone:`⩴`,colone:`≔`,coloneq:`≔`,comma:`,`,commat:`@`,comp:`∁`,compfn:`∘`,complement:`∁`,complexes:`ℂ`,cong:`≅`,congdot:`⩭`,Congruent:`≡`,Conint:`∯`,conint:`∮`,ContourIntegral:`∮`,Copf:`ℂ`,copf:`𝕔`,coprod:`∐`,Coproduct:`∐`,COPY:`©`,copy:`©`,copysr:`℗`,CounterClockwiseContourIntegral:`∳`,crarr:`↵`,Cross:`⨯`,cross:`✗`,Cscr:`𝒞`,cscr:`𝒸`,csub:`⫏`,csube:`⫑`,csup:`⫐`,csupe:`⫒`,ctdot:`⋯`,cudarrl:`⤸`,cudarrr:`⤵`,cuepr:`⋞`,cuesc:`⋟`,cularr:`↶`,cularrp:`⤽`,Cup:`⋓`,cup:`∪`,cupbrcap:`⩈`,CupCap:`≍`,cupcap:`⩆`,cupcup:`⩊`,cupdot:`⊍`,cupor:`⩅`,cups:`∪︀`,curarr:`↷`,curarrm:`⤼`,curlyeqprec:`⋞`,curlyeqsucc:`⋟`,curlyvee:`⋎`,curlywedge:`⋏`,curren:`¤`,curvearrowleft:`↶`,curvearrowright:`↷`,cuvee:`⋎`,cuwed:`⋏`,cwconint:`∲`,cwint:`∱`,cylcty:`⌭`,Dagger:`‡`,dagger:`†`,daleth:`ℸ`,Darr:`↡`,dArr:`⇓`,darr:`↓`,dash:`‐`,Dashv:`⫤`,dashv:`⊣`,dbkarow:`⤏`,dblac:`˝`,Dcaron:`Ď`,dcaron:`ď`,Dcy:`Д`,dcy:`д`,DD:`ⅅ`,dd:`ⅆ`,ddagger:`‡`,ddarr:`⇊`,DDotrahd:`⤑`,ddotseq:`⩷`,deg:`°`,Del:`∇`,Delta:`Δ`,delta:`δ`,demptyv:`⦱`,dfisht:`⥿`,Dfr:`𝔇`,dfr:`𝔡`,dHar:`⥥`,dharl:`⇃`,dharr:`⇂`,DiacriticalAcute:`´`,DiacriticalDot:`˙`,DiacriticalDoubleAcute:`˝`,DiacriticalGrave:"`",DiacriticalTilde:`˜`,diam:`⋄`,Diamond:`⋄`,diamond:`⋄`,diamondsuit:`♦`,diams:`♦`,die:`¨`,DifferentialD:`ⅆ`,digamma:`ϝ`,disin:`⋲`,div:`÷`,divide:`÷`,divideontimes:`⋇`,divonx:`⋇`,DJcy:`Ђ`,djcy:`ђ`,dlcorn:`⌞`,dlcrop:`⌍`,dollar:`$`,Dopf:`𝔻`,dopf:`𝕕`,Dot:`¨`,dot:`˙`,DotDot:`⃜`,doteq:`≐`,doteqdot:`≑`,DotEqual:`≐`,dotminus:`∸`,dotplus:`∔`,dotsquare:`⊡`,doublebarwedge:`⌆`,DoubleContourIntegral:`∯`,DoubleDot:`¨`,DoubleDownArrow:`⇓`,DoubleLeftArrow:`⇐`,DoubleLeftRightArrow:`⇔`,DoubleLeftTee:`⫤`,DoubleLongLeftArrow:`⟸`,DoubleLongLeftRightArrow:`⟺`,DoubleLongRightArrow:`⟹`,DoubleRightArrow:`⇒`,DoubleRightTee:`⊨`,DoubleUpArrow:`⇑`,DoubleUpDownArrow:`⇕`,DoubleVerticalBar:`∥`,DownArrow:`↓`,Downarrow:`⇓`,downarrow:`↓`,DownArrowBar:`⤓`,DownArrowUpArrow:`⇵`,DownBreve:`̑`,downdownarrows:`⇊`,downharpoonleft:`⇃`,downharpoonright:`⇂`,DownLeftRightVector:`⥐`,DownLeftTeeVector:`⥞`,DownLeftVector:`↽`,DownLeftVectorBar:`⥖`,DownRightTeeVector:`⥟`,DownRightVector:`⇁`,DownRightVectorBar:`⥗`,DownTee:`⊤`,DownTeeArrow:`↧`,drbkarow:`⤐`,drcorn:`⌟`,drcrop:`⌌`,Dscr:`𝒟`,dscr:`𝒹`,DScy:`Ѕ`,dscy:`ѕ`,dsol:`⧶`,Dstrok:`Đ`,dstrok:`đ`,dtdot:`⋱`,dtri:`▿`,dtrif:`▾`,duarr:`⇵`,duhar:`⥯`,dwangle:`⦦`,DZcy:`Џ`,dzcy:`џ`,dzigrarr:`⟿`,Eacute:`É`,eacute:`é`,easter:`⩮`,Ecaron:`Ě`,ecaron:`ě`,ecir:`≖`,Ecirc:`Ê`,ecirc:`ê`,ecolon:`≕`,Ecy:`Э`,ecy:`э`,eDDot:`⩷`,Edot:`Ė`,eDot:`≑`,edot:`ė`,ee:`ⅇ`,efDot:`≒`,Efr:`𝔈`,efr:`𝔢`,eg:`⪚`,Egrave:`È`,egrave:`è`,egs:`⪖`,egsdot:`⪘`,el:`⪙`,Element:`∈`,elinters:`⏧`,ell:`ℓ`,els:`⪕`,elsdot:`⪗`,Emacr:`Ē`,emacr:`ē`,empty:`∅`,emptyset:`∅`,EmptySmallSquare:`◻`,emptyv:`∅`,EmptyVerySmallSquare:`▫`,emsp:` `,emsp13:` `,emsp14:` `,ENG:`Ŋ`,eng:`ŋ`,ensp:` `,Eogon:`Ę`,eogon:`ę`,Eopf:`𝔼`,eopf:`𝕖`,epar:`⋕`,eparsl:`⧣`,eplus:`⩱`,epsi:`ε`,Epsilon:`Ε`,epsilon:`ε`,epsiv:`ϵ`,eqcirc:`≖`,eqcolon:`≕`,eqsim:`≂`,eqslantgtr:`⪖`,eqslantless:`⪕`,Equal:`⩵`,equals:`=`,EqualTilde:`≂`,equest:`≟`,Equilibrium:`⇌`,equiv:`≡`,equivDD:`⩸`,eqvparsl:`⧥`,erarr:`⥱`,erDot:`≓`,Escr:`ℰ`,escr:`ℯ`,esdot:`≐`,Esim:`⩳`,esim:`≂`,Eta:`Η`,eta:`η`,ETH:`Ð`,eth:`ð`,Euml:`Ë`,euml:`ë`,euro:`€`,excl:`!`,exist:`∃`,Exists:`∃`,expectation:`ℰ`,ExponentialE:`ⅇ`,exponentiale:`ⅇ`,fallingdotseq:`≒`,Fcy:`Ф`,fcy:`ф`,female:`♀`,ffilig:`ﬃ`,fflig:`ﬀ`,ffllig:`ﬄ`,Ffr:`𝔉`,ffr:`𝔣`,filig:`ﬁ`,FilledSmallSquare:`◼`,FilledVerySmallSquare:`▪`,fjlig:`fj`,flat:`♭`,fllig:`ﬂ`,fltns:`▱`,fnof:`ƒ`,Fopf:`𝔽`,fopf:`𝕗`,ForAll:`∀`,forall:`∀`,fork:`⋔`,forkv:`⫙`,Fouriertrf:`ℱ`,fpartint:`⨍`,frac12:`½`,frac13:`⅓`,frac14:`¼`,frac15:`⅕`,frac16:`⅙`,frac18:`⅛`,frac23:`⅔`,frac25:`⅖`,frac34:`¾`,frac35:`⅗`,frac38:`⅜`,frac45:`⅘`,frac56:`⅚`,frac58:`⅝`,frac78:`⅞`,frasl:`⁄`,frown:`⌢`,Fscr:`ℱ`,fscr:`𝒻`,gacute:`ǵ`,Gamma:`Γ`,gamma:`γ`,Gammad:`Ϝ`,gammad:`ϝ`,gap:`⪆`,Gbreve:`Ğ`,gbreve:`ğ`,Gcedil:`Ģ`,Gcirc:`Ĝ`,gcirc:`ĝ`,Gcy:`Г`,gcy:`г`,Gdot:`Ġ`,gdot:`ġ`,gE:`≧`,ge:`≥`,gEl:`⪌`,gel:`⋛`,geq:`≥`,geqq:`≧`,geqslant:`⩾`,ges:`⩾`,gescc:`⪩`,gesdot:`⪀`,gesdoto:`⪂`,gesdotol:`⪄`,gesl:`⋛︀`,gesles:`⪔`,Gfr:`𝔊`,gfr:`𝔤`,Gg:`⋙`,gg:`≫`,ggg:`⋙`,gimel:`ℷ`,GJcy:`Ѓ`,gjcy:`ѓ`,gl:`≷`,gla:`⪥`,glE:`⪒`,glj:`⪤`,gnap:`⪊`,gnapprox:`⪊`,gnE:`≩`,gne:`⪈`,gneq:`⪈`,gneqq:`≩`,gnsim:`⋧`,Gopf:`𝔾`,gopf:`𝕘`,grave:"`",GreaterEqual:`≥`,GreaterEqualLess:`⋛`,GreaterFullEqual:`≧`,GreaterGreater:`⪢`,GreaterLess:`≷`,GreaterSlantEqual:`⩾`,GreaterTilde:`≳`,Gscr:`𝒢`,gscr:`ℊ`,gsim:`≳`,gsime:`⪎`,gsiml:`⪐`,Gt:`≫`,GT:`>`,gt:`>`,gtcc:`⪧`,gtcir:`⩺`,gtdot:`⋗`,gtlPar:`⦕`,gtquest:`⩼`,gtrapprox:`⪆`,gtrarr:`⥸`,gtrdot:`⋗`,gtreqless:`⋛`,gtreqqless:`⪌`,gtrless:`≷`,gtrsim:`≳`,gvertneqq:`≩︀`,gvnE:`≩︀`,Hacek:`ˇ`,hairsp:` `,half:`½`,hamilt:`ℋ`,HARDcy:`Ъ`,hardcy:`ъ`,hArr:`⇔`,harr:`↔`,harrcir:`⥈`,harrw:`↭`,Hat:`^`,hbar:`ℏ`,Hcirc:`Ĥ`,hcirc:`ĥ`,hearts:`♥`,heartsuit:`♥`,hellip:`…`,hercon:`⊹`,Hfr:`ℌ`,hfr:`𝔥`,HilbertSpace:`ℋ`,hksearow:`⤥`,hkswarow:`⤦`,hoarr:`⇿`,homtht:`∻`,hookleftarrow:`↩`,hookrightarrow:`↪`,Hopf:`ℍ`,hopf:`𝕙`,horbar:`―`,HorizontalLine:`─`,Hscr:`ℋ`,hscr:`𝒽`,hslash:`ℏ`,Hstrok:`Ħ`,hstrok:`ħ`,HumpDownHump:`≎`,HumpEqual:`≏`,hybull:`⁃`,hyphen:`‐`,Iacute:`Í`,iacute:`í`,ic:`⁣`,Icirc:`Î`,icirc:`î`,Icy:`И`,icy:`и`,Idot:`İ`,IEcy:`Е`,iecy:`е`,iexcl:`¡`,iff:`⇔`,Ifr:`ℑ`,ifr:`𝔦`,Igrave:`Ì`,igrave:`ì`,ii:`ⅈ`,iiiint:`⨌`,iiint:`∭`,iinfin:`⧜`,iiota:`℩`,IJlig:`Ĳ`,ijlig:`ĳ`,Im:`ℑ`,Imacr:`Ī`,imacr:`ī`,image:`ℑ`,ImaginaryI:`ⅈ`,imagline:`ℐ`,imagpart:`ℑ`,imath:`ı`,imof:`⊷`,imped:`Ƶ`,Implies:`⇒`,in:`∈`,incare:`℅`,infin:`∞`,infintie:`⧝`,inodot:`ı`,Int:`∬`,int:`∫`,intcal:`⊺`,integers:`ℤ`,Integral:`∫`,intercal:`⊺`,Intersection:`⋂`,intlarhk:`⨗`,intprod:`⨼`,InvisibleComma:`⁣`,InvisibleTimes:`⁢`,IOcy:`Ё`,iocy:`ё`,Iogon:`Į`,iogon:`į`,Iopf:`𝕀`,iopf:`𝕚`,Iota:`Ι`,iota:`ι`,iprod:`⨼`,iquest:`¿`,Iscr:`ℐ`,iscr:`𝒾`,isin:`∈`,isindot:`⋵`,isinE:`⋹`,isins:`⋴`,isinsv:`⋳`,isinv:`∈`,it:`⁢`,Itilde:`Ĩ`,itilde:`ĩ`,Iukcy:`І`,iukcy:`і`,Iuml:`Ï`,iuml:`ï`,Jcirc:`Ĵ`,jcirc:`ĵ`,Jcy:`Й`,jcy:`й`,Jfr:`𝔍`,jfr:`𝔧`,jmath:`ȷ`,Jopf:`𝕁`,jopf:`𝕛`,Jscr:`𝒥`,jscr:`𝒿`,Jsercy:`Ј`,jsercy:`ј`,Jukcy:`Є`,jukcy:`є`,Kappa:`Κ`,kappa:`κ`,kappav:`ϰ`,Kcedil:`Ķ`,kcedil:`ķ`,Kcy:`К`,kcy:`к`,Kfr:`𝔎`,kfr:`𝔨`,kgreen:`ĸ`,KHcy:`Х`,khcy:`х`,KJcy:`Ќ`,kjcy:`ќ`,Kopf:`𝕂`,kopf:`𝕜`,Kscr:`𝒦`,kscr:`𝓀`,lAarr:`⇚`,Lacute:`Ĺ`,lacute:`ĺ`,laemptyv:`⦴`,lagran:`ℒ`,Lambda:`Λ`,lambda:`λ`,Lang:`⟪`,lang:`⟨`,langd:`⦑`,langle:`⟨`,lap:`⪅`,Laplacetrf:`ℒ`,laquo:`«`,Larr:`↞`,lArr:`⇐`,larr:`←`,larrb:`⇤`,larrbfs:`⤟`,larrfs:`⤝`,larrhk:`↩`,larrlp:`↫`,larrpl:`⤹`,larrsim:`⥳`,larrtl:`↢`,lat:`⪫`,lAtail:`⤛`,latail:`⤙`,late:`⪭`,lates:`⪭︀`,lBarr:`⤎`,lbarr:`⤌`,lbbrk:`❲`,lbrace:`{`,lbrack:`[`,lbrke:`⦋`,lbrksld:`⦏`,lbrkslu:`⦍`,Lcaron:`Ľ`,lcaron:`ľ`,Lcedil:`Ļ`,lcedil:`ļ`,lceil:`⌈`,lcub:`{`,Lcy:`Л`,lcy:`л`,ldca:`⤶`,ldquo:`“`,ldquor:`„`,ldrdhar:`⥧`,ldrushar:`⥋`,ldsh:`↲`,lE:`≦`,le:`≤`,LeftAngleBracket:`⟨`,LeftArrow:`←`,Leftarrow:`⇐`,leftarrow:`←`,LeftArrowBar:`⇤`,LeftArrowRightArrow:`⇆`,leftarrowtail:`↢`,LeftCeiling:`⌈`,LeftDoubleBracket:`⟦`,LeftDownTeeVector:`⥡`,LeftDownVector:`⇃`,LeftDownVectorBar:`⥙`,LeftFloor:`⌊`,leftharpoondown:`↽`,leftharpoonup:`↼`,leftleftarrows:`⇇`,LeftRightArrow:`↔`,Leftrightarrow:`⇔`,leftrightarrow:`↔`,leftrightarrows:`⇆`,leftrightharpoons:`⇋`,leftrightsquigarrow:`↭`,LeftRightVector:`⥎`,LeftTee:`⊣`,LeftTeeArrow:`↤`,LeftTeeVector:`⥚`,leftthreetimes:`⋋`,LeftTriangle:`⊲`,LeftTriangleBar:`⧏`,LeftTriangleEqual:`⊴`,LeftUpDownVector:`⥑`,LeftUpTeeVector:`⥠`,LeftUpVector:`↿`,LeftUpVectorBar:`⥘`,LeftVector:`↼`,LeftVectorBar:`⥒`,lEg:`⪋`,leg:`⋚`,leq:`≤`,leqq:`≦`,leqslant:`⩽`,les:`⩽`,lescc:`⪨`,lesdot:`⩿`,lesdoto:`⪁`,lesdotor:`⪃`,lesg:`⋚︀`,lesges:`⪓`,lessapprox:`⪅`,lessdot:`⋖`,lesseqgtr:`⋚`,lesseqqgtr:`⪋`,LessEqualGreater:`⋚`,LessFullEqual:`≦`,LessGreater:`≶`,lessgtr:`≶`,LessLess:`⪡`,lesssim:`≲`,LessSlantEqual:`⩽`,LessTilde:`≲`,lfisht:`⥼`,lfloor:`⌊`,Lfr:`𝔏`,lfr:`𝔩`,lg:`≶`,lgE:`⪑`,lHar:`⥢`,lhard:`↽`,lharu:`↼`,lharul:`⥪`,lhblk:`▄`,LJcy:`Љ`,ljcy:`љ`,Ll:`⋘`,ll:`≪`,llarr:`⇇`,llcorner:`⌞`,Lleftarrow:`⇚`,llhard:`⥫`,lltri:`◺`,Lmidot:`Ŀ`,lmidot:`ŀ`,lmoust:`⎰`,lmoustache:`⎰`,lnap:`⪉`,lnapprox:`⪉`,lnE:`≨`,lne:`⪇`,lneq:`⪇`,lneqq:`≨`,lnsim:`⋦`,loang:`⟬`,loarr:`⇽`,lobrk:`⟦`,LongLeftArrow:`⟵`,Longleftarrow:`⟸`,longleftarrow:`⟵`,LongLeftRightArrow:`⟷`,Longleftrightarrow:`⟺`,longleftrightarrow:`⟷`,longmapsto:`⟼`,LongRightArrow:`⟶`,Longrightarrow:`⟹`,longrightarrow:`⟶`,looparrowleft:`↫`,looparrowright:`↬`,lopar:`⦅`,Lopf:`𝕃`,lopf:`𝕝`,loplus:`⨭`,lotimes:`⨴`,lowast:`∗`,lowbar:`_`,LowerLeftArrow:`↙`,LowerRightArrow:`↘`,loz:`◊`,lozenge:`◊`,lozf:`⧫`,lpar:`(`,lparlt:`⦓`,lrarr:`⇆`,lrcorner:`⌟`,lrhar:`⇋`,lrhard:`⥭`,lrm:`‎`,lrtri:`⊿`,lsaquo:`‹`,Lscr:`ℒ`,lscr:`𝓁`,Lsh:`↰`,lsh:`↰`,lsim:`≲`,lsime:`⪍`,lsimg:`⪏`,lsqb:`[`,lsquo:`‘`,lsquor:`‚`,Lstrok:`Ł`,lstrok:`ł`,Lt:`≪`,LT:`<`,lt:`<`,ltcc:`⪦`,ltcir:`⩹`,ltdot:`⋖`,lthree:`⋋`,ltimes:`⋉`,ltlarr:`⥶`,ltquest:`⩻`,ltri:`◃`,ltrie:`⊴`,ltrif:`◂`,ltrPar:`⦖`,lurdshar:`⥊`,luruhar:`⥦`,lvertneqq:`≨︀`,lvnE:`≨︀`,macr:`¯`,male:`♂`,malt:`✠`,maltese:`✠`,Map:`⤅`,map:`↦`,mapsto:`↦`,mapstodown:`↧`,mapstoleft:`↤`,mapstoup:`↥`,marker:`▮`,mcomma:`⨩`,Mcy:`М`,mcy:`м`,mdash:`—`,mDDot:`∺`,measuredangle:`∡`,MediumSpace:` `,Mellintrf:`ℳ`,Mfr:`𝔐`,mfr:`𝔪`,mho:`℧`,micro:`µ`,mid:`∣`,midast:`*`,midcir:`⫰`,middot:`·`,minus:`−`,minusb:`⊟`,minusd:`∸`,minusdu:`⨪`,MinusPlus:`∓`,mlcp:`⫛`,mldr:`…`,mnplus:`∓`,models:`⊧`,Mopf:`𝕄`,mopf:`𝕞`,mp:`∓`,Mscr:`ℳ`,mscr:`𝓂`,mstpos:`∾`,Mu:`Μ`,mu:`μ`,multimap:`⊸`,mumap:`⊸`,nabla:`∇`,Nacute:`Ń`,nacute:`ń`,nang:`∠⃒`,nap:`≉`,napE:`⩰̸`,napid:`≋̸`,napos:`ŉ`,napprox:`≉`,natur:`♮`,natural:`♮`,naturals:`ℕ`,nbsp:`\xA0`,nbump:`≎̸`,nbumpe:`≏̸`,ncap:`⩃`,Ncaron:`Ň`,ncaron:`ň`,Ncedil:`Ņ`,ncedil:`ņ`,ncong:`≇`,ncongdot:`⩭̸`,ncup:`⩂`,Ncy:`Н`,ncy:`н`,ndash:`–`,ne:`≠`,nearhk:`⤤`,neArr:`⇗`,nearr:`↗`,nearrow:`↗`,nedot:`≐̸`,NegativeMediumSpace:`​`,NegativeThickSpace:`​`,NegativeThinSpace:`​`,NegativeVeryThinSpace:`​`,nequiv:`≢`,nesear:`⤨`,nesim:`≂̸`,NestedGreaterGreater:`≫`,NestedLessLess:`≪`,NewLine:`
`,nexist:`∄`,nexists:`∄`,Nfr:`𝔑`,nfr:`𝔫`,ngE:`≧̸`,nge:`≱`,ngeq:`≱`,ngeqq:`≧̸`,ngeqslant:`⩾̸`,nges:`⩾̸`,nGg:`⋙̸`,ngsim:`≵`,nGt:`≫⃒`,ngt:`≯`,ngtr:`≯`,nGtv:`≫̸`,nhArr:`⇎`,nharr:`↮`,nhpar:`⫲`,ni:`∋`,nis:`⋼`,nisd:`⋺`,niv:`∋`,NJcy:`Њ`,njcy:`њ`,nlArr:`⇍`,nlarr:`↚`,nldr:`‥`,nlE:`≦̸`,nle:`≰`,nLeftarrow:`⇍`,nleftarrow:`↚`,nLeftrightarrow:`⇎`,nleftrightarrow:`↮`,nleq:`≰`,nleqq:`≦̸`,nleqslant:`⩽̸`,nles:`⩽̸`,nless:`≮`,nLl:`⋘̸`,nlsim:`≴`,nLt:`≪⃒`,nlt:`≮`,nltri:`⋪`,nltrie:`⋬`,nLtv:`≪̸`,nmid:`∤`,NoBreak:`⁠`,NonBreakingSpace:`\xA0`,Nopf:`ℕ`,nopf:`𝕟`,Not:`⫬`,not:`¬`,NotCongruent:`≢`,NotCupCap:`≭`,NotDoubleVerticalBar:`∦`,NotElement:`∉`,NotEqual:`≠`,NotEqualTilde:`≂̸`,NotExists:`∄`,NotGreater:`≯`,NotGreaterEqual:`≱`,NotGreaterFullEqual:`≧̸`,NotGreaterGreater:`≫̸`,NotGreaterLess:`≹`,NotGreaterSlantEqual:`⩾̸`,NotGreaterTilde:`≵`,NotHumpDownHump:`≎̸`,NotHumpEqual:`≏̸`,notin:`∉`,notindot:`⋵̸`,notinE:`⋹̸`,notinva:`∉`,notinvb:`⋷`,notinvc:`⋶`,NotLeftTriangle:`⋪`,NotLeftTriangleBar:`⧏̸`,NotLeftTriangleEqual:`⋬`,NotLess:`≮`,NotLessEqual:`≰`,NotLessGreater:`≸`,NotLessLess:`≪̸`,NotLessSlantEqual:`⩽̸`,NotLessTilde:`≴`,NotNestedGreaterGreater:`⪢̸`,NotNestedLessLess:`⪡̸`,notni:`∌`,notniva:`∌`,notnivb:`⋾`,notnivc:`⋽`,NotPrecedes:`⊀`,NotPrecedesEqual:`⪯̸`,NotPrecedesSlantEqual:`⋠`,NotReverseElement:`∌`,NotRightTriangle:`⋫`,NotRightTriangleBar:`⧐̸`,NotRightTriangleEqual:`⋭`,NotSquareSubset:`⊏̸`,NotSquareSubsetEqual:`⋢`,NotSquareSuperset:`⊐̸`,NotSquareSupersetEqual:`⋣`,NotSubset:`⊂⃒`,NotSubsetEqual:`⊈`,NotSucceeds:`⊁`,NotSucceedsEqual:`⪰̸`,NotSucceedsSlantEqual:`⋡`,NotSucceedsTilde:`≿̸`,NotSuperset:`⊃⃒`,NotSupersetEqual:`⊉`,NotTilde:`≁`,NotTildeEqual:`≄`,NotTildeFullEqual:`≇`,NotTildeTilde:`≉`,NotVerticalBar:`∤`,npar:`∦`,nparallel:`∦`,nparsl:`⫽⃥`,npart:`∂̸`,npolint:`⨔`,npr:`⊀`,nprcue:`⋠`,npre:`⪯̸`,nprec:`⊀`,npreceq:`⪯̸`,nrArr:`⇏`,nrarr:`↛`,nrarrc:`⤳̸`,nrarrw:`↝̸`,nRightarrow:`⇏`,nrightarrow:`↛`,nrtri:`⋫`,nrtrie:`⋭`,nsc:`⊁`,nsccue:`⋡`,nsce:`⪰̸`,Nscr:`𝒩`,nscr:`𝓃`,nshortmid:`∤`,nshortparallel:`∦`,nsim:`≁`,nsime:`≄`,nsimeq:`≄`,nsmid:`∤`,nspar:`∦`,nsqsube:`⋢`,nsqsupe:`⋣`,nsub:`⊄`,nsubE:`⫅̸`,nsube:`⊈`,nsubset:`⊂⃒`,nsubseteq:`⊈`,nsubseteqq:`⫅̸`,nsucc:`⊁`,nsucceq:`⪰̸`,nsup:`⊅`,nsupE:`⫆̸`,nsupe:`⊉`,nsupset:`⊃⃒`,nsupseteq:`⊉`,nsupseteqq:`⫆̸`,ntgl:`≹`,Ntilde:`Ñ`,ntilde:`ñ`,ntlg:`≸`,ntriangleleft:`⋪`,ntrianglelefteq:`⋬`,ntriangleright:`⋫`,ntrianglerighteq:`⋭`,Nu:`Ν`,nu:`ν`,num:`#`,numero:`№`,numsp:` `,nvap:`≍⃒`,nVDash:`⊯`,nVdash:`⊮`,nvDash:`⊭`,nvdash:`⊬`,nvge:`≥⃒`,nvgt:`>⃒`,nvHarr:`⤄`,nvinfin:`⧞`,nvlArr:`⤂`,nvle:`≤⃒`,nvlt:`<⃒`,nvltrie:`⊴⃒`,nvrArr:`⤃`,nvrtrie:`⊵⃒`,nvsim:`∼⃒`,nwarhk:`⤣`,nwArr:`⇖`,nwarr:`↖`,nwarrow:`↖`,nwnear:`⤧`,Oacute:`Ó`,oacute:`ó`,oast:`⊛`,ocir:`⊚`,Ocirc:`Ô`,ocirc:`ô`,Ocy:`О`,ocy:`о`,odash:`⊝`,Odblac:`Ő`,odblac:`ő`,odiv:`⨸`,odot:`⊙`,odsold:`⦼`,OElig:`Œ`,oelig:`œ`,ofcir:`⦿`,Ofr:`𝔒`,ofr:`𝔬`,ogon:`˛`,Ograve:`Ò`,ograve:`ò`,ogt:`⧁`,ohbar:`⦵`,ohm:`Ω`,oint:`∮`,olarr:`↺`,olcir:`⦾`,olcross:`⦻`,oline:`‾`,olt:`⧀`,Omacr:`Ō`,omacr:`ō`,Omega:`Ω`,omega:`ω`,Omicron:`Ο`,omicron:`ο`,omid:`⦶`,ominus:`⊖`,Oopf:`𝕆`,oopf:`𝕠`,opar:`⦷`,OpenCurlyDoubleQuote:`“`,OpenCurlyQuote:`‘`,operp:`⦹`,oplus:`⊕`,Or:`⩔`,or:`∨`,orarr:`↻`,ord:`⩝`,order:`ℴ`,orderof:`ℴ`,ordf:`ª`,ordm:`º`,origof:`⊶`,oror:`⩖`,orslope:`⩗`,orv:`⩛`,oS:`Ⓢ`,Oscr:`𝒪`,oscr:`ℴ`,Oslash:`Ø`,oslash:`ø`,osol:`⊘`,Otilde:`Õ`,otilde:`õ`,Otimes:`⨷`,otimes:`⊗`,otimesas:`⨶`,Ouml:`Ö`,ouml:`ö`,ovbar:`⌽`,OverBar:`‾`,OverBrace:`⏞`,OverBracket:`⎴`,OverParenthesis:`⏜`,par:`∥`,para:`¶`,parallel:`∥`,parsim:`⫳`,parsl:`⫽`,part:`∂`,PartialD:`∂`,Pcy:`П`,pcy:`п`,percnt:`%`,period:`.`,permil:`‰`,perp:`⊥`,pertenk:`‱`,Pfr:`𝔓`,pfr:`𝔭`,Phi:`Φ`,phi:`φ`,phiv:`ϕ`,phmmat:`ℳ`,phone:`☎`,Pi:`Π`,pi:`π`,pitchfork:`⋔`,piv:`ϖ`,planck:`ℏ`,planckh:`ℎ`,plankv:`ℏ`,plus:`+`,plusacir:`⨣`,plusb:`⊞`,pluscir:`⨢`,plusdo:`∔`,plusdu:`⨥`,pluse:`⩲`,PlusMinus:`±`,plusmn:`±`,plussim:`⨦`,plustwo:`⨧`,pm:`±`,Poincareplane:`ℌ`,pointint:`⨕`,Popf:`ℙ`,popf:`𝕡`,pound:`£`,Pr:`⪻`,pr:`≺`,prap:`⪷`,prcue:`≼`,prE:`⪳`,pre:`⪯`,prec:`≺`,precapprox:`⪷`,preccurlyeq:`≼`,Precedes:`≺`,PrecedesEqual:`⪯`,PrecedesSlantEqual:`≼`,PrecedesTilde:`≾`,preceq:`⪯`,precnapprox:`⪹`,precneqq:`⪵`,precnsim:`⋨`,precsim:`≾`,Prime:`″`,prime:`′`,primes:`ℙ`,prnap:`⪹`,prnE:`⪵`,prnsim:`⋨`,prod:`∏`,Product:`∏`,profalar:`⌮`,profline:`⌒`,profsurf:`⌓`,prop:`∝`,Proportion:`∷`,Proportional:`∝`,propto:`∝`,prsim:`≾`,prurel:`⊰`,Pscr:`𝒫`,pscr:`𝓅`,Psi:`Ψ`,psi:`ψ`,puncsp:` `,Qfr:`𝔔`,qfr:`𝔮`,qint:`⨌`,Qopf:`ℚ`,qopf:`𝕢`,qprime:`⁗`,Qscr:`𝒬`,qscr:`𝓆`,quaternions:`ℍ`,quatint:`⨖`,quest:`?`,questeq:`≟`,QUOT:`"`,quot:`"`,rAarr:`⇛`,race:`∽̱`,Racute:`Ŕ`,racute:`ŕ`,radic:`√`,raemptyv:`⦳`,Rang:`⟫`,rang:`⟩`,rangd:`⦒`,range:`⦥`,rangle:`⟩`,raquo:`»`,Rarr:`↠`,rArr:`⇒`,rarr:`→`,rarrap:`⥵`,rarrb:`⇥`,rarrbfs:`⤠`,rarrc:`⤳`,rarrfs:`⤞`,rarrhk:`↪`,rarrlp:`↬`,rarrpl:`⥅`,rarrsim:`⥴`,Rarrtl:`⤖`,rarrtl:`↣`,rarrw:`↝`,rAtail:`⤜`,ratail:`⤚`,ratio:`∶`,rationals:`ℚ`,RBarr:`⤐`,rBarr:`⤏`,rbarr:`⤍`,rbbrk:`❳`,rbrace:`}`,rbrack:`]`,rbrke:`⦌`,rbrksld:`⦎`,rbrkslu:`⦐`,Rcaron:`Ř`,rcaron:`ř`,Rcedil:`Ŗ`,rcedil:`ŗ`,rceil:`⌉`,rcub:`}`,Rcy:`Р`,rcy:`р`,rdca:`⤷`,rdldhar:`⥩`,rdquo:`”`,rdquor:`”`,rdsh:`↳`,Re:`ℜ`,real:`ℜ`,realine:`ℛ`,realpart:`ℜ`,reals:`ℝ`,rect:`▭`,REG:`®`,reg:`®`,ReverseElement:`∋`,ReverseEquilibrium:`⇋`,ReverseUpEquilibrium:`⥯`,rfisht:`⥽`,rfloor:`⌋`,Rfr:`ℜ`,rfr:`𝔯`,rHar:`⥤`,rhard:`⇁`,rharu:`⇀`,rharul:`⥬`,Rho:`Ρ`,rho:`ρ`,rhov:`ϱ`,RightAngleBracket:`⟩`,RightArrow:`→`,Rightarrow:`⇒`,rightarrow:`→`,RightArrowBar:`⇥`,RightArrowLeftArrow:`⇄`,rightarrowtail:`↣`,RightCeiling:`⌉`,RightDoubleBracket:`⟧`,RightDownTeeVector:`⥝`,RightDownVector:`⇂`,RightDownVectorBar:`⥕`,RightFloor:`⌋`,rightharpoondown:`⇁`,rightharpoonup:`⇀`,rightleftarrows:`⇄`,rightleftharpoons:`⇌`,rightrightarrows:`⇉`,rightsquigarrow:`↝`,RightTee:`⊢`,RightTeeArrow:`↦`,RightTeeVector:`⥛`,rightthreetimes:`⋌`,RightTriangle:`⊳`,RightTriangleBar:`⧐`,RightTriangleEqual:`⊵`,RightUpDownVector:`⥏`,RightUpTeeVector:`⥜`,RightUpVector:`↾`,RightUpVectorBar:`⥔`,RightVector:`⇀`,RightVectorBar:`⥓`,ring:`˚`,risingdotseq:`≓`,rlarr:`⇄`,rlhar:`⇌`,rlm:`‏`,rmoust:`⎱`,rmoustache:`⎱`,rnmid:`⫮`,roang:`⟭`,roarr:`⇾`,robrk:`⟧`,ropar:`⦆`,Ropf:`ℝ`,ropf:`𝕣`,roplus:`⨮`,rotimes:`⨵`,RoundImplies:`⥰`,rpar:`)`,rpargt:`⦔`,rppolint:`⨒`,rrarr:`⇉`,Rrightarrow:`⇛`,rsaquo:`›`,Rscr:`ℛ`,rscr:`𝓇`,Rsh:`↱`,rsh:`↱`,rsqb:`]`,rsquo:`’`,rsquor:`’`,rthree:`⋌`,rtimes:`⋊`,rtri:`▹`,rtrie:`⊵`,rtrif:`▸`,rtriltri:`⧎`,RuleDelayed:`⧴`,ruluhar:`⥨`,rx:`℞`,Sacute:`Ś`,sacute:`ś`,sbquo:`‚`,Sc:`⪼`,sc:`≻`,scap:`⪸`,Scaron:`Š`,scaron:`š`,sccue:`≽`,scE:`⪴`,sce:`⪰`,Scedil:`Ş`,scedil:`ş`,Scirc:`Ŝ`,scirc:`ŝ`,scnap:`⪺`,scnE:`⪶`,scnsim:`⋩`,scpolint:`⨓`,scsim:`≿`,Scy:`С`,scy:`с`,sdot:`⋅`,sdotb:`⊡`,sdote:`⩦`,searhk:`⤥`,seArr:`⇘`,searr:`↘`,searrow:`↘`,sect:`§`,semi:`;`,seswar:`⤩`,setminus:`∖`,setmn:`∖`,sext:`✶`,Sfr:`𝔖`,sfr:`𝔰`,sfrown:`⌢`,sharp:`♯`,SHCHcy:`Щ`,shchcy:`щ`,SHcy:`Ш`,shcy:`ш`,ShortDownArrow:`↓`,ShortLeftArrow:`←`,shortmid:`∣`,shortparallel:`∥`,ShortRightArrow:`→`,ShortUpArrow:`↑`,shy:`­`,Sigma:`Σ`,sigma:`σ`,sigmaf:`ς`,sigmav:`ς`,sim:`∼`,simdot:`⩪`,sime:`≃`,simeq:`≃`,simg:`⪞`,simgE:`⪠`,siml:`⪝`,simlE:`⪟`,simne:`≆`,simplus:`⨤`,simrarr:`⥲`,slarr:`←`,SmallCircle:`∘`,smallsetminus:`∖`,smashp:`⨳`,smeparsl:`⧤`,smid:`∣`,smile:`⌣`,smt:`⪪`,smte:`⪬`,smtes:`⪬︀`,SOFTcy:`Ь`,softcy:`ь`,sol:`/`,solb:`⧄`,solbar:`⌿`,Sopf:`𝕊`,sopf:`𝕤`,spades:`♠`,spadesuit:`♠`,spar:`∥`,sqcap:`⊓`,sqcaps:`⊓︀`,sqcup:`⊔`,sqcups:`⊔︀`,Sqrt:`√`,sqsub:`⊏`,sqsube:`⊑`,sqsubset:`⊏`,sqsubseteq:`⊑`,sqsup:`⊐`,sqsupe:`⊒`,sqsupset:`⊐`,sqsupseteq:`⊒`,squ:`□`,Square:`□`,square:`□`,SquareIntersection:`⊓`,SquareSubset:`⊏`,SquareSubsetEqual:`⊑`,SquareSuperset:`⊐`,SquareSupersetEqual:`⊒`,SquareUnion:`⊔`,squarf:`▪`,squf:`▪`,srarr:`→`,Sscr:`𝒮`,sscr:`𝓈`,ssetmn:`∖`,ssmile:`⌣`,sstarf:`⋆`,Star:`⋆`,star:`☆`,starf:`★`,straightepsilon:`ϵ`,straightphi:`ϕ`,strns:`¯`,Sub:`⋐`,sub:`⊂`,subdot:`⪽`,subE:`⫅`,sube:`⊆`,subedot:`⫃`,submult:`⫁`,subnE:`⫋`,subne:`⊊`,subplus:`⪿`,subrarr:`⥹`,Subset:`⋐`,subset:`⊂`,subseteq:`⊆`,subseteqq:`⫅`,SubsetEqual:`⊆`,subsetneq:`⊊`,subsetneqq:`⫋`,subsim:`⫇`,subsub:`⫕`,subsup:`⫓`,succ:`≻`,succapprox:`⪸`,succcurlyeq:`≽`,Succeeds:`≻`,SucceedsEqual:`⪰`,SucceedsSlantEqual:`≽`,SucceedsTilde:`≿`,succeq:`⪰`,succnapprox:`⪺`,succneqq:`⪶`,succnsim:`⋩`,succsim:`≿`,SuchThat:`∋`,Sum:`∑`,sum:`∑`,sung:`♪`,Sup:`⋑`,sup:`⊃`,sup1:`¹`,sup2:`²`,sup3:`³`,supdot:`⪾`,supdsub:`⫘`,supE:`⫆`,supe:`⊇`,supedot:`⫄`,Superset:`⊃`,SupersetEqual:`⊇`,suphsol:`⟉`,suphsub:`⫗`,suplarr:`⥻`,supmult:`⫂`,supnE:`⫌`,supne:`⊋`,supplus:`⫀`,Supset:`⋑`,supset:`⊃`,supseteq:`⊇`,supseteqq:`⫆`,supsetneq:`⊋`,supsetneqq:`⫌`,supsim:`⫈`,supsub:`⫔`,supsup:`⫖`,swarhk:`⤦`,swArr:`⇙`,swarr:`↙`,swarrow:`↙`,swnwar:`⤪`,szlig:`ß`,Tab:`	`,target:`⌖`,Tau:`Τ`,tau:`τ`,tbrk:`⎴`,Tcaron:`Ť`,tcaron:`ť`,Tcedil:`Ţ`,tcedil:`ţ`,Tcy:`Т`,tcy:`т`,tdot:`⃛`,telrec:`⌕`,Tfr:`𝔗`,tfr:`𝔱`,there4:`∴`,Therefore:`∴`,therefore:`∴`,Theta:`Θ`,theta:`θ`,thetasym:`ϑ`,thetav:`ϑ`,thickapprox:`≈`,thicksim:`∼`,ThickSpace:`  `,thinsp:` `,ThinSpace:` `,thkap:`≈`,thksim:`∼`,THORN:`Þ`,thorn:`þ`,Tilde:`∼`,tilde:`˜`,TildeEqual:`≃`,TildeFullEqual:`≅`,TildeTilde:`≈`,times:`×`,timesb:`⊠`,timesbar:`⨱`,timesd:`⨰`,tint:`∭`,toea:`⤨`,top:`⊤`,topbot:`⌶`,topcir:`⫱`,Topf:`𝕋`,topf:`𝕥`,topfork:`⫚`,tosa:`⤩`,tprime:`‴`,TRADE:`™`,trade:`™`,triangle:`▵`,triangledown:`▿`,triangleleft:`◃`,trianglelefteq:`⊴`,triangleq:`≜`,triangleright:`▹`,trianglerighteq:`⊵`,tridot:`◬`,trie:`≜`,triminus:`⨺`,TripleDot:`⃛`,triplus:`⨹`,trisb:`⧍`,tritime:`⨻`,trpezium:`⏢`,Tscr:`𝒯`,tscr:`𝓉`,TScy:`Ц`,tscy:`ц`,TSHcy:`Ћ`,tshcy:`ћ`,Tstrok:`Ŧ`,tstrok:`ŧ`,twixt:`≬`,twoheadleftarrow:`↞`,twoheadrightarrow:`↠`,Uacute:`Ú`,uacute:`ú`,Uarr:`↟`,uArr:`⇑`,uarr:`↑`,Uarrocir:`⥉`,Ubrcy:`Ў`,ubrcy:`ў`,Ubreve:`Ŭ`,ubreve:`ŭ`,Ucirc:`Û`,ucirc:`û`,Ucy:`У`,ucy:`у`,udarr:`⇅`,Udblac:`Ű`,udblac:`ű`,udhar:`⥮`,ufisht:`⥾`,Ufr:`𝔘`,ufr:`𝔲`,Ugrave:`Ù`,ugrave:`ù`,uHar:`⥣`,uharl:`↿`,uharr:`↾`,uhblk:`▀`,ulcorn:`⌜`,ulcorner:`⌜`,ulcrop:`⌏`,ultri:`◸`,Umacr:`Ū`,umacr:`ū`,uml:`¨`,UnderBar:`_`,UnderBrace:`⏟`,UnderBracket:`⎵`,UnderParenthesis:`⏝`,Union:`⋃`,UnionPlus:`⊎`,Uogon:`Ų`,uogon:`ų`,Uopf:`𝕌`,uopf:`𝕦`,UpArrow:`↑`,Uparrow:`⇑`,uparrow:`↑`,UpArrowBar:`⤒`,UpArrowDownArrow:`⇅`,UpDownArrow:`↕`,Updownarrow:`⇕`,updownarrow:`↕`,UpEquilibrium:`⥮`,upharpoonleft:`↿`,upharpoonright:`↾`,uplus:`⊎`,UpperLeftArrow:`↖`,UpperRightArrow:`↗`,Upsi:`ϒ`,upsi:`υ`,upsih:`ϒ`,Upsilon:`Υ`,upsilon:`υ`,UpTee:`⊥`,UpTeeArrow:`↥`,upuparrows:`⇈`,urcorn:`⌝`,urcorner:`⌝`,urcrop:`⌎`,Uring:`Ů`,uring:`ů`,urtri:`◹`,Uscr:`𝒰`,uscr:`𝓊`,utdot:`⋰`,Utilde:`Ũ`,utilde:`ũ`,utri:`▵`,utrif:`▴`,uuarr:`⇈`,Uuml:`Ü`,uuml:`ü`,uwangle:`⦧`,vangrt:`⦜`,varepsilon:`ϵ`,varkappa:`ϰ`,varnothing:`∅`,varphi:`ϕ`,varpi:`ϖ`,varpropto:`∝`,vArr:`⇕`,varr:`↕`,varrho:`ϱ`,varsigma:`ς`,varsubsetneq:`⊊︀`,varsubsetneqq:`⫋︀`,varsupsetneq:`⊋︀`,varsupsetneqq:`⫌︀`,vartheta:`ϑ`,vartriangleleft:`⊲`,vartriangleright:`⊳`,Vbar:`⫫`,vBar:`⫨`,vBarv:`⫩`,Vcy:`В`,vcy:`в`,VDash:`⊫`,Vdash:`⊩`,vDash:`⊨`,vdash:`⊢`,Vdashl:`⫦`,Vee:`⋁`,vee:`∨`,veebar:`⊻`,veeeq:`≚`,vellip:`⋮`,Verbar:`‖`,verbar:`|`,Vert:`‖`,vert:`|`,VerticalBar:`∣`,VerticalLine:`|`,VerticalSeparator:`❘`,VerticalTilde:`≀`,VeryThinSpace:` `,Vfr:`𝔙`,vfr:`𝔳`,vltri:`⊲`,vnsub:`⊂⃒`,vnsup:`⊃⃒`,Vopf:`𝕍`,vopf:`𝕧`,vprop:`∝`,vrtri:`⊳`,Vscr:`𝒱`,vscr:`𝓋`,vsubnE:`⫋︀`,vsubne:`⊊︀`,vsupnE:`⫌︀`,vsupne:`⊋︀`,Vvdash:`⊪`,vzigzag:`⦚`,Wcirc:`Ŵ`,wcirc:`ŵ`,wedbar:`⩟`,Wedge:`⋀`,wedge:`∧`,wedgeq:`≙`,weierp:`℘`,Wfr:`𝔚`,wfr:`𝔴`,Wopf:`𝕎`,wopf:`𝕨`,wp:`℘`,wr:`≀`,wreath:`≀`,Wscr:`𝒲`,wscr:`𝓌`,xcap:`⋂`,xcirc:`◯`,xcup:`⋃`,xdtri:`▽`,Xfr:`𝔛`,xfr:`𝔵`,xhArr:`⟺`,xharr:`⟷`,Xi:`Ξ`,xi:`ξ`,xlArr:`⟸`,xlarr:`⟵`,xmap:`⟼`,xnis:`⋻`,xodot:`⨀`,Xopf:`𝕏`,xopf:`𝕩`,xoplus:`⨁`,xotime:`⨂`,xrArr:`⟹`,xrarr:`⟶`,Xscr:`𝒳`,xscr:`𝓍`,xsqcup:`⨆`,xuplus:`⨄`,xutri:`△`,xvee:`⋁`,xwedge:`⋀`,Yacute:`Ý`,yacute:`ý`,YAcy:`Я`,yacy:`я`,Ycirc:`Ŷ`,ycirc:`ŷ`,Ycy:`Ы`,ycy:`ы`,yen:`¥`,Yfr:`𝔜`,yfr:`𝔶`,YIcy:`Ї`,yicy:`ї`,Yopf:`𝕐`,yopf:`𝕪`,Yscr:`𝒴`,yscr:`𝓎`,YUcy:`Ю`,yucy:`ю`,Yuml:`Ÿ`,yuml:`ÿ`,Zacute:`Ź`,zacute:`ź`,Zcaron:`Ž`,zcaron:`ž`,Zcy:`З`,zcy:`з`,Zdot:`Ż`,zdot:`ż`,zeetrf:`ℨ`,ZeroWidthSpace:`​`,Zeta:`Ζ`,zeta:`ζ`,Zfr:`ℨ`,zfr:`𝔷`,ZHcy:`Ж`,zhcy:`ж`,zigrarr:`⇝`,Zopf:`ℤ`,zopf:`𝕫`,Zscr:`𝒵`,zscr:`𝓏`,zwj:`‍`,zwnj:`‌`}),e.entityMap=e.HTML_ENTITIES})),h=n((e=>{var t=u(),n=f(),r=d(),i=t.isHTMLEscapableRawTextElement,a=t.isHTMLMimeType,o=t.isHTMLRawTextElement,s=t.hasOwn,c=t.NAMESPACE,l=r.ParseError,p=r.DOMException,m=0,h=1,g=2,_=3,v=4,y=5,b=6,x=7;function S(){}S.prototype={parse:function(e,t,n){var r=this.domBuilder;r.startDocument(),k(t,t=Object.create(null)),w(e,t,n,r,this.errorHandler),r.endDocument()}};var C=/&#?\w+;?/g;function w(e,r,i,o,c){var u=a(o.mimeType);e.indexOf(n.UNICODE_REPLACEMENT_CHARACTER)>=0&&c.warning(`Unicode replacement character detected, source encoding issues?`);function d(e){if(e>65535){e-=65536;var t=55296+(e>>10),n=56320+(e&1023);return String.fromCharCode(t,n)}return String.fromCharCode(e)}function f(e){var t=e[e.length-1]===`;`?e:e+`;`;if(!u&&t!==e)return c.error(`EntityRef: expecting ;`),e;var r=n.Reference.exec(t);if(!r||r[0].length!==t.length)return c.error(`entity not matching Reference production: `+e),e;var a=t.slice(1,-1);return s(i,a)?i[a]:a.charAt(0)===`#`?d(parseInt(a.substring(1).replace(`x`,`0x`))):(c.error(`entity not found:`+e),e)}function m(t){if(t>S){var n=e.substring(S,t).replace(C,f);v&&y(S),o.characters(n,0,t-S),S=t}}var h=0,g=0,_=/\r\n?|\n|$/g,v=o.locator;function y(t,n){for(;t>=g&&(n=_.exec(e));)h=g,g=n.index+n[0].length,v.lineNumber++;v.columnNumber=t-h+1}for(var b=[{currentNSMap:r}],x=[],S=0;;){try{var w=e.indexOf(`<`,S);if(w<0){if(!u&&x.length>0)return c.fatalError(`unclosed xml tag(s): `+x.join(`, `));if(!e.substring(S).match(/^\s*$/)){var k=o.doc,A=k.createTextNode(e.substring(S));if(k.documentElement)return c.error(`Extra content at the end of the document`);k.appendChild(A),o.currentElement=A}return}if(w>S){var j=e.substring(S,w);!u&&x.length===0&&(j=j.replace(new RegExp(n.S_OPT.source,`g`),``),j&&c.error(`Unexpected content outside root element: '`+j+`'`)),m(w)}switch(e.charAt(w+1)){case`/`:var F=e.indexOf(`>`,w+2),I=e.substring(w+2,F>0?F:void 0);if(!I)return c.fatalError(`end tag name missing`);var ee=n.reg(`^`,n.QName_group,n.S_OPT,`$`),te=F>0&&ee.exec(I);if(!te){var L=F>0&&n.reg(`^`,n.QName_group).exec(I);if(u&&L)c.warning(`end tag name contains invalid trailing characters: "`+I+`"`),te=L;else if(L&&new RegExp(ee.source,ee.flags+`m`).test(I))c.error(`end tag name is followed by a line break and trailing content: "`+I+`"`),te=L;else return c.fatalError(`end tag name contains invalid characters: "`+I+`"`)}if(!o.currentElement&&!o.doc.documentElement)return;var R=x[x.length-1]||o.currentElement.tagName||o.doc.documentElement.tagName||``;if(R!==te[1]){var z=te[1].toLowerCase();if(!u||R.toLowerCase()!==z)return c.fatalError(`Opening and ending tag mismatch: "`+R+`" != "`+I+`"`)}var ne=b.pop();x.pop();var B=ne.localNSMap;if(o.endElement(ne.uri,ne.localName,R),B)for(var V in B)s(B,V)&&o.endPrefixMapping(V);F++;break;case`?`:v&&y(w),F=N(e,w,o,c);break;case`!`:v&&y(w),F=M(e,w,o,c,u);break;default:v&&y(w);var H=new P,re=b[b.length-1].currentNSMap,F=E(e,w,H,re,f,c,u),ie=H.length;if(H.closed||(u&&t.isHTMLVoidElement(H.tagName)?H.closed=!0:x.push(H.tagName)),v&&ie){for(var ae=T(v,{}),oe=0;oe<ie;oe++){var se=H[oe];y(se.offset),se.locator=T(v,{})}o.locator=ae,D(H,o,re)&&b.push(H),o.locator=v}else D(H,o,re)&&b.push(H);u&&!H.closed?F=O(e,F,H.tagName,f,o):F++}}catch(e){if(e instanceof l)throw e;if(e instanceof p)return c.fatalError(`Error constructing the DOM: `+e.name+`: `+e.message,e);c.error(`element parse error: `+e),F=-1}F>S?S=F:m(Math.max(w,S)+1)}}function T(e,t){return t.lineNumber=e.lineNumber,t.columnNumber=e.columnNumber,t}function E(e,t,n,r,i,a,o){function c(e,t,r){if(s(n.attributeNames,e))return a.fatalError(`Attribute `+e+` redefined`);if(!o&&t.indexOf(`<`)>=0)return a.fatalError(`Unescaped '<' not allowed in attributes values`);n.addValue(e,t.replace(/[\t\n\r]/g,` `).replace(C,i),r)}for(var l,u,d=++t,f=m;;){var p=e.charAt(d);if(f===m&&p===`<`)throw Error(`unexpected < in tag name: `+e.slice(t,d));switch(p){case`=`:if(f===h)l=e.slice(t,d),f=_;else if(f===g)f=_;else throw Error(`attribute equal must after attrName`);break;case`'`:case`"`:if(f===_||f===h){if(f===h&&(a.warning(`attribute value must after "="`),l=e.slice(t,d)),t=d+1,d=e.indexOf(p,t),d>0)u=e.slice(t,d),c(l,u,t-1),f=y;else throw Error(`attribute value no end '`+p+`' match`)}else if(f==v)u=e.slice(t,d),c(l,u,t),a.warning(`attribute "`+l+`" missed start quot(`+p+`)!!`),t=d+1,f=y;else throw Error(`attribute value must after "="`);break;case`/`:switch(f){case m:n.setTagName(e.slice(t,d));case y:case b:case x:f=x,n.closed=!0;case v:case h:break;case g:n.closed=!0;break;default:throw Error(`attribute invalid close char('/')`)}break;case``:return a.error(`unexpected end of input`),f==m&&n.setTagName(e.slice(t,d)),d;case`>`:switch(f){case m:n.setTagName(e.slice(t,d));case y:case b:case x:break;case v:case h:u=e.slice(t,d),u.slice(-1)===`/`&&(n.closed=!0,u=u.slice(0,-1));case g:f===g&&(u=l),f==v?(a.warning(`attribute "`+u+`" missed quot(")!`),c(l,u,t)):(o||a.warning(`attribute "`+u+`" missed value!! "`+u+`" instead!!`),c(u,u,t));break;case _:if(!o)return a.fatalError(`AttValue: ' or " expected`)}return d;case``:p=` `;default:if(p<=` `)switch(f){case m:n.setTagName(e.slice(t,d)),f=b;break;case h:l=e.slice(t,d),f=g;break;case v:var u=e.slice(t,d);a.warning(`attribute "`+u+`" missed quot(")!!`),c(l,u,t);case y:f=b}else switch(f){case g:o||a.warning(`attribute "`+l+`" missed value!! "`+l+`" instead2!!`),c(l,l,t),t=d,f=h;break;case y:a.warning(`attribute space is required"`+l+`"!!`);case b:f=h,t=d;break;case _:f=v,t=d;break;case x:throw Error(`elements closed character '/' and '>' must be connected to`)}}d++}}function D(e,t,n){for(var r=e.tagName,i=null,a=e.length;a--;){var o=e[a],l=o.qName,u=o.value,d=l.indexOf(`:`);if(d>0)var f=o.prefix=l.slice(0,d),p=l.slice(d+1),m=f===`xmlns`&&p;else p=l,f=null,m=l===`xmlns`&&``;o.localName=p,m!==!1&&(i??(i=Object.create(null),n=Object.create(n)),n[m]=i[m]=u,o.uri=c.XMLNS,t.startPrefixMapping(m,u))}for(var a=e.length;a--;)o=e[a],o.prefix&&(o.prefix===`xml`&&(o.uri=c.XML),o.prefix!==`xmlns`&&(o.uri=n[o.prefix]));var d=r.indexOf(`:`);d>0?(f=e.prefix=r.slice(0,d),p=e.localName=r.slice(d+1)):(f=null,p=e.localName=r);var h=e.uri=n[f||``];if(t.startElement(h,p,r,e),e.closed){if(t.endElement(h,p,r),i)for(f in i)s(i,f)&&t.endPrefixMapping(f)}else return e.currentNSMap=n,e.localNSMap=i,!0}function O(e,t,n,r,a){var s=i(n);if(s||o(n)){var c=RegExp(`</`+n.replace(/[.*+?^${}()|[\]\\]/g,`\\$&`)+`>`,`ig`);c.lastIndex=t;var l=c.exec(e),u=l?l.index:-1;if(u<0)return t+1;var d=e.substring(t+1,u);return s&&(d=d.replace(C,r)),a.characters(d,0,d.length),u}return t+1}function k(e,t){for(var n in e)s(e,n)&&(t[n]=e[n])}function A(e,t){var r=t;function i(t){return t||=0,e.charAt(r+t)}function a(e){e||=1,r+=e}function o(){for(var t=0;r<e.length;){var n=i();if(n!==` `&&n!==`
`&&n!==`	`&&n!==`\r`)return t;t++,a()}return-1}function s(){return e.substring(r)}function c(t){return e.substring(r,r+t.length)===t}function l(t){return e.substring(r,r+t.length).toUpperCase()===t.toUpperCase()}function u(e){var t=n.reg(`^`,e).exec(s());return t?(a(t[0].length),t[0]):null}return{char:i,getIndex:function(){return r},getMatch:u,getSource:function(){return e},skip:a,skipBlanks:o,substringFromIndex:s,substringStartsWith:c,substringStartsWithCaseInsensitive:l}}function j(e,t){function r(e,t){var r=n.PI.exec(e.substringFromIndex());return r?r[1].toLowerCase()===`xml`?t.fatalError(`xml declaration is only allowed at the start of the document, but found at position `+e.getIndex()):(e.skip(r[0].length),r[0]):t.fatalError(`processing instruction is not well-formed at position `+e.getIndex())}var i=e.getSource();if(e.char()===`[`){e.skip(1);for(var a=e.getIndex();e.getIndex()<i.length;){if(e.skipBlanks(),e.char()===`]`){var o=i.substring(a,e.getIndex());return e.skip(1),o}var s=null;if(e.char()===`<`&&e.char(1)===`!`)switch(e.char(2)){case`E`:e.char(3)===`L`?s=e.getMatch(n.elementdecl):e.char(3)===`N`&&(s=e.getMatch(n.EntityDecl));break;case`A`:s=e.getMatch(n.AttlistDecl);break;case`N`:s=e.getMatch(n.NotationDecl);break;case`-`:s=e.getMatch(n.Comment)}else if(e.char()===`<`&&e.char(1)===`?`)s=r(e,t);else if(e.char()===`%`)s=e.getMatch(n.PEReference);else return t.fatalError(`Error detected in Markup declaration`);if(!s)return t.fatalError(`Error in internal subset at position `+e.getIndex())}return t.fatalError(`doctype internal subset is not well-formed, missing ]`)}}function M(e,t,r,i,a){var o=A(e,t);switch(a?o.char(2).toUpperCase():o.char(2)){case`-`:var s=o.getMatch(n.Comment);return s?(r.comment(s,n.COMMENT_START.length,s.length-n.COMMENT_START.length-n.COMMENT_END.length),o.getIndex()):i.fatalError(`comment is not well-formed at position `+o.getIndex());case`[`:var c=o.getMatch(n.CDSect);return c?!a&&!r.currentElement?i.fatalError(`CDATA outside of element`):(r.startCDATA(),r.characters(c,n.CDATA_START.length,c.length-n.CDATA_START.length-n.CDATA_END.length),r.endCDATA(),o.getIndex()):i.fatalError(`Invalid CDATA starting at position `+t);case`D`:if(r.doc&&r.doc.documentElement)return i.fatalError(`Doctype not allowed inside or after documentElement at position `+o.getIndex());if(a?!o.substringStartsWithCaseInsensitive(n.DOCTYPE_DECL_START):!o.substringStartsWith(n.DOCTYPE_DECL_START))return i.fatalError(`Expected `+n.DOCTYPE_DECL_START+` at position `+o.getIndex());if(o.skip(n.DOCTYPE_DECL_START.length),o.skipBlanks()<1)return i.fatalError(`Expected whitespace after `+n.DOCTYPE_DECL_START+` at position `+o.getIndex());var l={name:void 0,publicId:void 0,systemId:void 0,internalSubset:void 0};if(l.name=o.getMatch(n.Name),!l.name)return i.fatalError(`doctype name missing or contains unexpected characters at position `+o.getIndex());if(a&&l.name.toLowerCase()!==`html`&&i.warning(`Unexpected DOCTYPE in HTML document at position `+o.getIndex()),o.skipBlanks(),o.substringStartsWith(n.PUBLIC)||o.substringStartsWith(n.SYSTEM)){var u=n.ExternalID_match.exec(o.substringFromIndex());if(!u)return i.fatalError(`doctype external id is not well-formed at position `+o.getIndex());u.groups.SystemLiteralOnly===void 0?(l.systemId=u.groups.SystemLiteral,l.publicId=u.groups.PubidLiteral):l.systemId=u.groups.SystemLiteralOnly,o.skip(u[0].length)}else if(a&&o.substringStartsWithCaseInsensitive(n.SYSTEM)){if(o.skip(n.SYSTEM.length),o.skipBlanks()<1)return i.fatalError(`Expected whitespace after `+n.SYSTEM+` at position `+o.getIndex());if(l.systemId=o.getMatch(n.ABOUT_LEGACY_COMPAT_SystemLiteral),!l.systemId)return i.fatalError(`Expected `+n.ABOUT_LEGACY_COMPAT+` in single or double quotes after `+n.SYSTEM+` at position `+o.getIndex())}return a&&l.systemId&&!n.ABOUT_LEGACY_COMPAT_SystemLiteral.test(l.systemId)&&i.warning(`Unexpected doctype.systemId in HTML document at position `+o.getIndex()),a||(o.skipBlanks(),l.internalSubset=j(o,i)),o.skipBlanks(),o.char()===`>`?(o.skip(1),r.startDTD(l.name,l.publicId,l.systemId,l.internalSubset),r.endDTD(),o.getIndex()):i.fatalError(`doctype not terminated with > at position `+o.getIndex());default:return i.fatalError(`Not well-formed XML starting with "<!" at position `+t)}}function N(e,t,r,i){var a=e.substring(t).match(n.PI);if(!a)return i.fatalError(`Invalid processing instruction starting at position `+t);if(a[1].toLowerCase()===`xml`){if(t>0)return i.fatalError(`processing instruction at position `+t+` is an xml declaration which is only at the start of the document`);if(!n.XMLDecl.test(e.substring(t)))return i.fatalError(`xml declaration is not well-formed`)}return r.processingInstruction(a[1],a[2]),t+a[0].length}function P(){this.attributeNames=Object.create(null)}P.prototype={setTagName:function(e){if(!n.QName_exact.test(e))throw Error(`invalid tagName:`+e);this.tagName=e},addValue:function(e,t,r){if(!n.QName_exact.test(e))throw Error(`invalid attribute:`+e);this.attributeNames[e]=this.length,this[this.length++]={qName:e,value:t,offset:r}},length:0,getLocalName:function(e){return this[e].localName},getLocator:function(e){return this[e].locator},getQName:function(e){return this[e].qName},getURI:function(e){return this[e].uri},getValue:function(e){return this[e].value}},e.XMLReader=S,e.parseUtils=A,e.parseDoctypeCommentOrCData=M})),g=n((e=>{var t=u(),n=p(),r=d(),i=m(),a=h(),o=n.DOMImplementation,s=t.hasDefaultHTMLNamespace,c=t.isHTMLMimeType,l=t.isValidMimeType,f=t.MIME_TYPE,g=t.NAMESPACE,_=r.ParseError,v=a.XMLReader;function y(e){return e.replace(/\r[\n\u0085]/g,`
`).replace(/[\r\u0085\u2028\u2029]/g,`
`)}function b(e){if(e||={},e.locator===void 0&&(e.locator=!0),this.assign=e.assign||t.assign,this.domHandler=e.domHandler||x,this.onError=e.onError||e.errorHandler,e.errorHandler&&typeof e.errorHandler!=`function`)throw TypeError(`errorHandler object is no longer supported, switch to onError!`);e.errorHandler&&e.errorHandler(`warning`,"The `errorHandler` option has been deprecated, use `onError` instead!",this),this.normalizeLineEndings=e.normalizeLineEndings||y,this.locator=!!e.locator,this.xmlns=this.assign(Object.create(null),e.xmlns)}b.prototype.parseFromString=function(e,n){if(!l(n))throw TypeError(`DOMParser.parseFromString: the provided mimeType "`+n+`" is not valid.`);var r=this.assign(Object.create(null),this.xmlns),a=i.XML_ENTITIES,o=r[``]||null;s(n)?(a=i.HTML_ENTITIES,o=g.HTML):n===f.XML_SVG_IMAGE&&(o=g.SVG),r[``]=o,r.xml=r.xml||g.XML;var c=new this.domHandler({mimeType:n,defaultNamespace:o,onError:this.onError}),u=this.locator?{}:void 0;this.locator&&c.setDocumentLocator(u);var d=new v;return d.errorHandler=c,d.domBuilder=c,!t.isHTMLMimeType(n)&&typeof e!=`string`&&d.errorHandler.fatalError(`source is not a string`),d.parse(this.normalizeLineEndings(String(e)),r,a),c.doc.documentElement||d.errorHandler.fatalError(`missing root element`),c.doc};function x(e){var t=e||{};this.mimeType=t.mimeType||f.XML_APPLICATION,this.defaultNamespace=t.defaultNamespace||null,this.cdata=!1,this.currentElement=void 0,this.doc=void 0,this.locator=void 0,this.onError=t.onError}function S(e,t){t.lineNumber=e.lineNumber,t.columnNumber=e.columnNumber}x.prototype={startDocument:function(){var e=new o;this.doc=c(this.mimeType)?e.createHTMLDocument(!1):e.createDocument(this.defaultNamespace,``)},startElement:function(e,t,n,r){var i=this.doc,a=i.createElementNS(e,n||t),o=r.length;T(this,a),this.currentElement=a,this.locator&&S(this.locator,a);for(var s=0;s<o;s++){var e=r.getURI(s),c=r.getValue(s),n=r.getQName(s),l=i.createAttributeNS(e,n);this.locator&&S(r.getLocator(s),l),l.value=l.nodeValue=c,a.setAttributeNode(l)}},endElement:function(e,t,n){this.currentElement=this.currentElement.parentNode},startPrefixMapping:function(e,t){},endPrefixMapping:function(e){},processingInstruction:function(e,t){var n=this.doc.createProcessingInstruction(e,t);this.locator&&S(this.locator,n),T(this,n)},ignorableWhitespace:function(e,t,n){},characters:function(e,t,n){if(e=w.apply(this,arguments),e){if(this.cdata)var r=this.doc.createCDATASection(e);else var r=this.doc.createTextNode(e);this.currentElement?this.currentElement.appendChild(r):/^\s*$/.test(e)&&this.doc.appendChild(r),this.locator&&S(this.locator,r)}},skippedEntity:function(e){},endDocument:function(){this.doc.normalize()},setDocumentLocator:function(e){e&&(e.lineNumber=0),this.locator=e},comment:function(e,t,n){e=w.apply(this,arguments);var r=this.doc.createComment(e);this.locator&&S(this.locator,r),T(this,r)},startCDATA:function(){this.cdata=!0},endCDATA:function(){this.cdata=!1},startDTD:function(e,t,n,r){var i=this.doc.implementation;if(i&&i.createDocumentType){var a=i.createDocumentType(e,t,n,r);this.locator&&S(this.locator,a),T(this,a),this.doc.doctype=a}},reportError:function(e,t){if(typeof this.onError==`function`)try{this.onError(e,t,this)}catch(n){throw new _(`Reporting `+e+` "`+t+`" caused `+n,this.locator)}else console.error(`[xmldom `+e+`]	`+t,C(this.locator))},warning:function(e){this.reportError(`warning`,e)},error:function(e){this.reportError(`error`,e)},fatalError:function(e,t){throw this.reportError(`fatalError`,e),new _(e,this.locator,t)}};function C(e){if(e)return`
@#[line:`+e.lineNumber+`,col:`+e.columnNumber+`]`}function w(e,t,n){return typeof e==`string`?e.substr(t,n):e.length>=t+n||t?new java.lang.String(e,t,n)+``:e}`endDTD,startEntity,endEntity,attributeDecl,elementDecl,externalEntityDecl,internalEntityDecl,resolveEntity,getExternalSubset,notationDecl,unparsedEntityDecl`.replace(/\w+/g,function(e){x.prototype[e]=function(){return null}});function T(e,t){e.currentElement?e.currentElement.appendChild(t):e.doc.appendChild(t)}function E(e){if(e===`error`)throw`onErrorStopParsing`}function D(){throw`onWarningStopParsing`}e.__DOMHandler=x,e.DOMParser=b,e.normalizeLineEndings=y,e.onErrorStopParsing=E,e.onWarningStopParsing=D})),_=n((e=>{var t=u();e.assign=t.assign,e.hasDefaultHTMLNamespace=t.hasDefaultHTMLNamespace,e.isHTMLMimeType=t.isHTMLMimeType,e.isValidMimeType=t.isValidMimeType,e.MIME_TYPE=t.MIME_TYPE,e.NAMESPACE=t.NAMESPACE;var n=d();e.DOMException=n.DOMException,e.DOMExceptionName=n.DOMExceptionName,e.ExceptionCode=n.ExceptionCode,e.ParseError=n.ParseError;var r=p();e.Attr=r.Attr,e.CDATASection=r.CDATASection,e.CharacterData=r.CharacterData,e.Comment=r.Comment,e.Document=r.Document,e.DocumentFragment=r.DocumentFragment,e.DocumentType=r.DocumentType,e.DOMImplementation=r.DOMImplementation,e.Element=r.Element,e.Entity=r.Entity,e.EntityReference=r.EntityReference,e.LiveNodeList=r.LiveNodeList,e.NamedNodeMap=r.NamedNodeMap,e.Node=r.Node,e.NodeList=r.NodeList,e.Notation=r.Notation,e.ProcessingInstruction=r.ProcessingInstruction,e.Text=r.Text,e.XMLSerializer=r.XMLSerializer;var i=g();e.DOMParser=i.DOMParser,e.normalizeLineEndings=i.normalizeLineEndings,e.onErrorStopParsing=i.onErrorStopParsing,e.onWarningStopParsing=i.onWarningStopParsing})),v=n(((e,t)=>{(function(e){function n(e,t){var n=(e&65535)+(t&65535);return(e>>16)+(t>>16)+(n>>16)<<16|n&65535}function r(e,t){return e<<t|e>>>32-t}function i(e,t,i,a,o,s){return n(r(n(n(t,e),n(a,s)),o),i)}function a(e,t,n,r,a,o,s){return i(t&n|~t&r,e,t,a,o,s)}function o(e,t,n,r,a,o,s){return i(t&r|n&~r,e,t,a,o,s)}function s(e,t,n,r,a,o,s){return i(t^n^r,e,t,a,o,s)}function c(e,t,n,r,a,o,s){return i(n^(t|~r),e,t,a,o,s)}function l(e,t){e[t>>5]|=128<<t%32,e[(t+64>>>9<<4)+14]=t;var r,i,l,u,d,f=1732584193,p=-271733879,m=-1732584194,h=271733878;for(r=0;r<e.length;r+=16)i=f,l=p,u=m,d=h,f=a(f,p,m,h,e[r],7,-680876936),h=a(h,f,p,m,e[r+1],12,-389564586),m=a(m,h,f,p,e[r+2],17,606105819),p=a(p,m,h,f,e[r+3],22,-1044525330),f=a(f,p,m,h,e[r+4],7,-176418897),h=a(h,f,p,m,e[r+5],12,1200080426),m=a(m,h,f,p,e[r+6],17,-1473231341),p=a(p,m,h,f,e[r+7],22,-45705983),f=a(f,p,m,h,e[r+8],7,1770035416),h=a(h,f,p,m,e[r+9],12,-1958414417),m=a(m,h,f,p,e[r+10],17,-42063),p=a(p,m,h,f,e[r+11],22,-1990404162),f=a(f,p,m,h,e[r+12],7,1804603682),h=a(h,f,p,m,e[r+13],12,-40341101),m=a(m,h,f,p,e[r+14],17,-1502002290),p=a(p,m,h,f,e[r+15],22,1236535329),f=o(f,p,m,h,e[r+1],5,-165796510),h=o(h,f,p,m,e[r+6],9,-1069501632),m=o(m,h,f,p,e[r+11],14,643717713),p=o(p,m,h,f,e[r],20,-373897302),f=o(f,p,m,h,e[r+5],5,-701558691),h=o(h,f,p,m,e[r+10],9,38016083),m=o(m,h,f,p,e[r+15],14,-660478335),p=o(p,m,h,f,e[r+4],20,-405537848),f=o(f,p,m,h,e[r+9],5,568446438),h=o(h,f,p,m,e[r+14],9,-1019803690),m=o(m,h,f,p,e[r+3],14,-187363961),p=o(p,m,h,f,e[r+8],20,1163531501),f=o(f,p,m,h,e[r+13],5,-1444681467),h=o(h,f,p,m,e[r+2],9,-51403784),m=o(m,h,f,p,e[r+7],14,1735328473),p=o(p,m,h,f,e[r+12],20,-1926607734),f=s(f,p,m,h,e[r+5],4,-378558),h=s(h,f,p,m,e[r+8],11,-2022574463),m=s(m,h,f,p,e[r+11],16,1839030562),p=s(p,m,h,f,e[r+14],23,-35309556),f=s(f,p,m,h,e[r+1],4,-1530992060),h=s(h,f,p,m,e[r+4],11,1272893353),m=s(m,h,f,p,e[r+7],16,-155497632),p=s(p,m,h,f,e[r+10],23,-1094730640),f=s(f,p,m,h,e[r+13],4,681279174),h=s(h,f,p,m,e[r],11,-358537222),m=s(m,h,f,p,e[r+3],16,-722521979),p=s(p,m,h,f,e[r+6],23,76029189),f=s(f,p,m,h,e[r+9],4,-640364487),h=s(h,f,p,m,e[r+12],11,-421815835),m=s(m,h,f,p,e[r+15],16,530742520),p=s(p,m,h,f,e[r+2],23,-995338651),f=c(f,p,m,h,e[r],6,-198630844),h=c(h,f,p,m,e[r+7],10,1126891415),m=c(m,h,f,p,e[r+14],15,-1416354905),p=c(p,m,h,f,e[r+5],21,-57434055),f=c(f,p,m,h,e[r+12],6,1700485571),h=c(h,f,p,m,e[r+3],10,-1894986606),m=c(m,h,f,p,e[r+10],15,-1051523),p=c(p,m,h,f,e[r+1],21,-2054922799),f=c(f,p,m,h,e[r+8],6,1873313359),h=c(h,f,p,m,e[r+15],10,-30611744),m=c(m,h,f,p,e[r+6],15,-1560198380),p=c(p,m,h,f,e[r+13],21,1309151649),f=c(f,p,m,h,e[r+4],6,-145523070),h=c(h,f,p,m,e[r+11],10,-1120210379),m=c(m,h,f,p,e[r+2],15,718787259),p=c(p,m,h,f,e[r+9],21,-343485551),f=n(f,i),p=n(p,l),m=n(m,u),h=n(h,d);return[f,p,m,h]}function u(e){var t,n=``,r=e.length*32;for(t=0;t<r;t+=8)n+=String.fromCharCode(e[t>>5]>>>t%32&255);return n}function d(e){var t,n=[];for(n[(e.length>>2)-1]=void 0,t=0;t<n.length;t+=1)n[t]=0;var r=e.length*8;for(t=0;t<r;t+=8)n[t>>5]|=(e.charCodeAt(t/8)&255)<<t%32;return n}function f(e){return u(l(d(e),e.length*8))}function p(e,t){var n,r=d(e),i=[],a=[],o;for(i[15]=a[15]=void 0,r.length>16&&(r=l(r,e.length*8)),n=0;n<16;n+=1)i[n]=r[n]^909522486,a[n]=r[n]^1549556828;return o=l(i.concat(d(t)),512+t.length*8),u(l(a.concat(o),640))}function m(e){for(var t=`0123456789abcdef`,n=``,r,i=0;i<e.length;i+=1)r=e.charCodeAt(i),n+=t.charAt(r>>>4&15)+t.charAt(r&15);return n}function h(e){return unescape(encodeURIComponent(e))}function g(e){return f(h(e))}function _(e){return m(g(e))}function v(e,t){return p(h(e),h(t))}function y(e,t){return m(v(e,t))}function b(e,t,n){return t?n?v(t,e):y(t,e):n?g(e):_(e)}typeof define==`function`&&define.amd?define(function(){return b}):typeof t==`object`&&t.exports?t.exports=b:e.md5=b})(e)})),y;function b(){return(b=t((()=>{y=`#version 300 es
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
}`})))()}function x(e,t,n){let r=e.createShader(t);return r?(e.shaderSource(r,n),e.compileShader(r),e.getShaderParameter(r,e.COMPILE_STATUS)?r:(console.error(`An error occurred compiling the shaders: `+e.getShaderInfoLog(r)),e.deleteShader(r),null)):null}function S(e,t,n){let r=e.getShaderPrecisionFormat(e.FRAGMENT_SHADER,e.MEDIUM_FLOAT),i=r?r.precision:null;i&&i<23&&(t=t.replace(/precision\s+(lowp|mediump)\s+float;/g,`precision highp float;`),n=n.replace(/precision\s+(lowp|mediump)\s+float/g,`precision highp float`).replace(/\b(uniform|varying|attribute)\s+(lowp|mediump)\s+(\w+)/g,`$1 highp $3`));let a=x(e,e.VERTEX_SHADER,t),o=x(e,e.FRAGMENT_SHADER,n);if(!a||!o)return null;let s=e.createProgram();return s?(e.attachShader(s,a),e.attachShader(s,o),e.linkProgram(s),e.getProgramParameter(s,e.LINK_STATUS)?(e.detachShader(s,a),e.detachShader(s,o),e.deleteShader(a),e.deleteShader(o),s):(console.error(`Unable to initialize the shader program: `+e.getProgramInfoLog(s)),e.deleteProgram(s),e.deleteShader(a),e.deleteShader(o),null)):null}function C(){let e=navigator.userAgent.toLowerCase();return e.includes(`safari`)&&!e.includes(`chrome`)&&!e.includes(`android`)}function w(e){let t=visualViewport?.scale??1,n=visualViewport?.width??window.innerWidth,r=window.innerWidth-e.documentElement.clientWidth,i=t*n+r,a=outerWidth/i,o=Math.round(100*a);return o%5==0?o/100:o===33?1/3:o===67?2/3:o===133?4/3:a}var T,E,D;function O(){return(O=t((()=>{b(),T=8294400,E=class{parentElement;canvasElement;gl;program=null;uniformLocations={};fragmentShader;rafId=null;lastRenderTime=0;currentFrame=0;speed=0;currentSpeed=0;providedUniforms;mipmaps=[];hasBeenDisposed=!1;resolutionChanged=!0;textures=new Map;minPixelRatio;maxPixelCount;isSafari=C();uniformCache={};textureUnitMap=new Map;ownerDocument;constructor(e,t,n,r,i=0,a=0,o=2,s=T,c=[]){if(e?.nodeType===1)this.parentElement=e;else throw Error(`Paper Shaders: parent element must be an HTMLElement`);if(this.ownerDocument=e.ownerDocument,!this.ownerDocument.querySelector(`style[data-paper-shader]`)){let e=this.ownerDocument.createElement(`style`);e.innerHTML=D,e.setAttribute(`data-paper-shader`,``),this.ownerDocument.head.prepend(e)}let l=this.ownerDocument.createElement(`canvas`);this.canvasElement=l,this.parentElement.prepend(l),this.fragmentShader=t,this.providedUniforms=n,this.mipmaps=c,this.currentFrame=a,this.minPixelRatio=o,this.maxPixelCount=s;let u=l.getContext(`webgl2`,r);if(!u)throw Error(`Paper Shaders: WebGL is not supported in this browser`);this.gl=u,this.initProgram(),this.setupPositionAttribute(),this.setupUniforms(),this.setUniformValues(this.providedUniforms),this.setupResizeObserver(),visualViewport?.addEventListener(`resize`,this.handleVisualViewportChange),this.setupIntersectionObserver(),this.setSpeed(i),this.parentElement.setAttribute(`data-paper-shader`,``),this.parentElement.paperShaderMount=this,this.ownerDocument.addEventListener(`visibilitychange`,this.handleDocumentVisibilityChange)}initProgram=()=>{let e=S(this.gl,y,this.fragmentShader);e&&(this.program=e)};setupPositionAttribute=()=>{let e=this.gl.getAttribLocation(this.program,`a_position`),t=this.gl.createBuffer();this.gl.bindBuffer(this.gl.ARRAY_BUFFER,t),this.gl.bufferData(this.gl.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,-1,1,1,-1,1,1]),this.gl.STATIC_DRAW),this.gl.enableVertexAttribArray(e),this.gl.vertexAttribPointer(e,2,this.gl.FLOAT,!1,0,0)};setupUniforms=()=>{let e={u_time:this.gl.getUniformLocation(this.program,`u_time`),u_pixelRatio:this.gl.getUniformLocation(this.program,`u_pixelRatio`),u_resolution:this.gl.getUniformLocation(this.program,`u_resolution`)};Object.entries(this.providedUniforms).forEach(([t,n])=>{if(e[t]=this.gl.getUniformLocation(this.program,t),n instanceof HTMLImageElement){let n=`${t}AspectRatio`;e[n]=this.gl.getUniformLocation(this.program,n)}}),this.uniformLocations=e};renderScale=1;parentWidth=0;parentHeight=0;parentDevicePixelWidth=0;parentDevicePixelHeight=0;devicePixelsSupported=!1;intersectionObserver=null;isInViewport=!0;resizeObserver=null;setupResizeObserver=()=>{this.resizeObserver=new ResizeObserver(([e])=>{if(e?.borderBoxSize[0]){let t=e.devicePixelContentBoxSize?.[0];t!==void 0&&(this.devicePixelsSupported=!0,this.parentDevicePixelWidth=t.inlineSize,this.parentDevicePixelHeight=t.blockSize),this.parentWidth=e.borderBoxSize[0].inlineSize,this.parentHeight=e.borderBoxSize[0].blockSize}this.handleResize()}),this.resizeObserver.observe(this.parentElement)};setupIntersectionObserver=()=>{let e=this.ownerDocument.defaultView;e?.IntersectionObserver&&(this.intersectionObserver=new e.IntersectionObserver(([e])=>{this.isInViewport=e?.isIntersecting??!0,this.updateCurrentSpeed()}),this.intersectionObserver.observe(this.parentElement))};handleVisualViewportChange=()=>{this.resizeObserver?.disconnect(),this.setupResizeObserver()};handleResize=()=>{let e=0,t=0,n=Math.max(1,window.devicePixelRatio),r=visualViewport?.scale??1;if(this.devicePixelsSupported){let i=Math.max(1,this.minPixelRatio/n);e=this.parentDevicePixelWidth*i*r,t=this.parentDevicePixelHeight*i*r}else{let i=Math.max(n,this.minPixelRatio)*r;if(this.isSafari){let e=w(this.ownerDocument);i*=Math.max(1,e)}e=Math.round(this.parentWidth)*i,t=Math.round(this.parentHeight)*i}let i=Math.sqrt(this.maxPixelCount)/Math.sqrt(e*t),a=Math.min(1,i),o=Math.round(e*a),s=Math.round(t*a),c=o/Math.round(this.parentWidth);(this.canvasElement.width!==o||this.canvasElement.height!==s||this.renderScale!==c)&&(this.renderScale=c,this.canvasElement.width=o,this.canvasElement.height=s,this.resolutionChanged=!0,this.gl.viewport(0,0,this.gl.canvas.width,this.gl.canvas.height),this.render(performance.now()))};render=e=>{if(this.hasBeenDisposed)return;if(this.program===null){console.warn(`Tried to render before program or gl was initialized`);return}let t=e-this.lastRenderTime;this.lastRenderTime=e,this.currentSpeed!==0&&(this.currentFrame+=t*this.currentSpeed),this.gl.clear(this.gl.COLOR_BUFFER_BIT),this.gl.useProgram(this.program),this.gl.uniform1f(this.uniformLocations.u_time,this.currentFrame*.001),this.resolutionChanged&&=(this.gl.uniform2f(this.uniformLocations.u_resolution,this.gl.canvas.width,this.gl.canvas.height),this.gl.uniform1f(this.uniformLocations.u_pixelRatio,this.renderScale),!1),this.gl.drawArrays(this.gl.TRIANGLES,0,6),this.currentSpeed===0?this.rafId=null:this.requestRender()};requestRender=()=>{this.rafId!==null&&cancelAnimationFrame(this.rafId),this.rafId=requestAnimationFrame(this.render)};setTextureUniform=(e,t)=>{if(!t.complete||t.naturalWidth===0)throw Error(`Paper Shaders: image for uniform ${e} must be fully loaded`);let n=this.textures.get(e);n&&this.gl.deleteTexture(n),this.textureUnitMap.has(e)||this.textureUnitMap.set(e,this.textureUnitMap.size);let r=this.textureUnitMap.get(e);this.gl.activeTexture(this.gl.TEXTURE0+r);let i=this.gl.createTexture();this.gl.bindTexture(this.gl.TEXTURE_2D,i),this.gl.texParameteri(this.gl.TEXTURE_2D,this.gl.TEXTURE_WRAP_S,this.gl.CLAMP_TO_EDGE),this.gl.texParameteri(this.gl.TEXTURE_2D,this.gl.TEXTURE_WRAP_T,this.gl.CLAMP_TO_EDGE),this.gl.texParameteri(this.gl.TEXTURE_2D,this.gl.TEXTURE_MIN_FILTER,this.gl.LINEAR),this.gl.texParameteri(this.gl.TEXTURE_2D,this.gl.TEXTURE_MAG_FILTER,this.gl.LINEAR),this.gl.texImage2D(this.gl.TEXTURE_2D,0,this.gl.RGBA,this.gl.RGBA,this.gl.UNSIGNED_BYTE,t),this.mipmaps.includes(e)&&(this.gl.generateMipmap(this.gl.TEXTURE_2D),this.gl.texParameteri(this.gl.TEXTURE_2D,this.gl.TEXTURE_MIN_FILTER,this.gl.LINEAR_MIPMAP_LINEAR));let a=this.gl.getError();if(a!==this.gl.NO_ERROR||i===null){console.error(`Paper Shaders: WebGL error when uploading texture:`,a);return}this.textures.set(e,i);let o=this.uniformLocations[e];if(o){this.gl.uniform1i(o,r);let n=`${e}AspectRatio`,i=this.uniformLocations[n];if(i){let e=t.naturalWidth/t.naturalHeight;this.gl.uniform1f(i,e)}}};areUniformValuesEqual=(e,t)=>e===t?!0:Array.isArray(e)&&Array.isArray(t)&&e.length===t.length?e.every((e,n)=>this.areUniformValuesEqual(e,t[n])):!1;setUniformValues=e=>{this.gl.useProgram(this.program),Object.entries(e).forEach(([e,t])=>{let n=t;if(t instanceof HTMLImageElement&&(n=`${t.src.slice(0,200)}|${t.naturalWidth}x${t.naturalHeight}`),this.areUniformValuesEqual(this.uniformCache[e],n))return;this.uniformCache[e]=n;let r=this.uniformLocations[e];if(!r)console.warn(`Uniform location for ${e} not found`);else if(t instanceof HTMLImageElement)this.setTextureUniform(e,t);else if(Array.isArray(t)){let n=null,i=null;if(t[0]!==void 0&&Array.isArray(t[0])){let r=t[0].length;if(t.every(e=>e.length===r))n=t.flat(),i=r;else{console.warn(`All child arrays must be the same length for ${e}`);return}}else n=t,i=n.length;switch(i){case 2:this.gl.uniform2fv(r,n);break;case 3:this.gl.uniform3fv(r,n);break;case 4:this.gl.uniform4fv(r,n);break;case 9:this.gl.uniformMatrix3fv(r,!1,n);break;case 16:this.gl.uniformMatrix4fv(r,!1,n);break;default:console.warn(`Unsupported uniform array length: ${i}`)}}else typeof t==`number`?this.gl.uniform1f(r,t):typeof t==`boolean`?this.gl.uniform1i(r,+!!t):console.warn(`Unsupported uniform type for ${e}: ${typeof t}`)})};getCurrentFrame=()=>this.currentFrame;setFrame=e=>{this.currentFrame=e,this.lastRenderTime=performance.now(),this.render(performance.now())};setSpeed=(e=1)=>{this.speed=e,this.updateCurrentSpeed()};updateCurrentSpeed=()=>{this.setCurrentSpeed(this.ownerDocument.hidden||!this.isInViewport?0:this.speed)};setCurrentSpeed=e=>{this.currentSpeed=e,this.rafId===null&&e!==0&&(this.lastRenderTime=performance.now(),this.rafId=requestAnimationFrame(this.render)),this.rafId!==null&&e===0&&(cancelAnimationFrame(this.rafId),this.rafId=null)};setMaxPixelCount=(e=T)=>{this.maxPixelCount=e,this.handleResize()};setMinPixelRatio=(e=2)=>{this.minPixelRatio=e,this.handleResize()};setUniforms=e=>{this.setUniformValues(e),this.providedUniforms={...this.providedUniforms,...e},this.render(performance.now())};handleDocumentVisibilityChange=()=>{this.updateCurrentSpeed()};dispose=()=>{this.hasBeenDisposed=!0,this.rafId!==null&&(cancelAnimationFrame(this.rafId),this.rafId=null),this.gl&&this.program&&(this.textures.forEach(e=>{this.gl.deleteTexture(e)}),this.textures.clear(),this.gl.deleteProgram(this.program),this.program=null,this.gl.bindBuffer(this.gl.ARRAY_BUFFER,null),this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER,null),this.gl.bindRenderbuffer(this.gl.RENDERBUFFER,null),this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,null),this.gl.getError()),this.resizeObserver&&=(this.resizeObserver.disconnect(),null),this.intersectionObserver&&=(this.intersectionObserver.disconnect(),null),visualViewport?.removeEventListener(`resize`,this.handleVisualViewportChange),this.ownerDocument.removeEventListener(`visibilitychange`,this.handleDocumentVisibilityChange),this.uniformLocations={},this.canvasElement.remove(),delete this.parentElement.paperShaderMount}},D=`@layer paper-shaders {
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
}`})))()}var k,A,j;function M(){return(M=t((()=>{k={fit:`contain`,scale:1,rotation:0,offsetX:0,offsetY:0,originX:.5,originY:.5,worldWidth:0,worldHeight:0},A={fit:`none`,scale:1,rotation:0,offsetX:0,offsetY:0,originX:.5,originY:.5,worldWidth:0,worldHeight:0},j={none:0,contain:1,cover:2}})))()}var N,P,F,I,ee,te,L;function R(){return(R=t((()=>{N=`
#define TWO_PI 6.28318530718
#define PI 3.14159265358979323846
`,P=`
vec2 rotate(vec2 uv, float th) {
  return mat2(cos(th), sin(th), -sin(th), cos(th)) * uv;
}
`,F=`
  float hash11(float p) {
    p = fract(p * 0.3183099) + 0.1;
    p *= p + 19.19;
    return fract(p * p);
  }
`,I=`
  float hash21(vec2 p) {
    p = fract(p * vec2(0.3183099, 0.3678794)) + 0.1;
    p += dot(p, p + 19.19);
    return fract(p.x * p.y);
  }
`,ee=`
  float randomR(vec2 p) {
    vec2 uv = floor(p) / 100. + .5;
    return texture(u_noiseTexture, fract(uv)).r;
  }
`,te=`
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
`,L=`
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
`})))()}var z,ne;function B(){return(B=t((()=>{R(),z={maxColorCount:10},ne=`#version 300 es
precision mediump float;

uniform float u_time;

uniform vec4 u_colors[${z.maxColorCount}];
uniform float u_colorsCount;

uniform float u_distortion;
uniform float u_swirl;
uniform float u_grainMixer;
uniform float u_grainOverlay;

in vec2 v_objectUV;
out vec4 fragColor;

${N}
${P}
${I}

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

  for (int i = 0; i < ${z.maxColorCount}; i++) {
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
`})))()}var V,H,re;function ie(){return(ie=t((()=>{R(),V=`#version 300 es
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

${te}
${N}
${F}
${I}

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
`,H={simplex:1,warp:2,dots:3,wave:4,ripple:5,swirl:6,sphere:7},re={random:1,"2x2":2,"4x4":3,"8x8":4}})))()}var ae;function oe(){return(oe=t((()=>{R(),ae=`#version 300 es
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

${N}
${P}
${ee}
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

${L}

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
`})))()}var se,ce,le;function ue(){return(ue=t((()=>{R(),se=`#version 300 es
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

${N}
${P}
${I}

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
`,ce={lines:1,linesIrregular:2,wave:3,zigzag:4,pattern:5},le={prism:1,lens:2,contour:3,cascade:4,flat:5}})))()}var de;function fe(){return(fe=t((()=>{R(),de=`#version 300 es
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


${I}
${N}

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
`})))()}var U,pe;function me(){return(me=t((()=>{R(),U={maxSamples:50},pe=`#version 300 es
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

${N}
${I}
${P}

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

  for (int i = 0; i < ${U.maxSamples}; i++) {
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
`})))()}var W,he,ge;function _e(){return(_e=t((()=>{R(),W=`#version 300 es
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

${N}
${P}
${I}

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
`,he={classic:0,gooey:1,holes:2,soft:3},ge={square:0,hex:1}})))()}function G(e){if(Array.isArray(e))return e.length===4?e:e.length===3?[...e,1]:Ce;if(typeof e!=`string`)return Ce;let t,n,r,i=1;if(e.startsWith(`#`))[t,n,r,i]=ve(e);else if(e.startsWith(`rgb`)){let a=ye(e);if(a===null)return Ce;[t,n,r,i]=a}else if(e.startsWith(`hsl`)){let a=be(e);if(a===null)return Ce;[t,n,r,i]=xe(a)}else return console.error(`Unsupported color format`,e),Ce;return[Se(t,0,1),Se(n,0,1),Se(r,0,1),Se(i,0,1)]}function ve(e){return e=e.replace(/^#/,``),(e.length===3||e.length===4)&&(e=e.split(``).map(e=>e+e).join(``)),e.length===6&&(e+=`ff`),/^[0-9a-f]{8}$/i.test(e)?[parseInt(e.slice(0,2),16)/255,parseInt(e.slice(2,4),16)/255,parseInt(e.slice(4,6),16)/255,parseInt(e.slice(6,8),16)/255]:(console.warn(`Invalid hex color`),Ce)}function ye(e){let t=e.match(/^rgba?\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*([0-9.]+))?\s*\)$/i);return t?[parseInt(t[1]??`0`)/255,parseInt(t[2]??`0`)/255,parseInt(t[3]??`0`)/255,t[4]===void 0?1:parseFloat(t[4])]:null}function be(e){let t=e.match(/^hsla?\s*\(\s*(\d+)\s*,\s*(\d+)%\s*,\s*(\d+)%\s*(?:,\s*([0-9.]+))?\s*\)$/i);return t?[parseInt(t[1]??`0`),parseInt(t[2]??`0`),parseInt(t[3]??`0`),t[4]===void 0?1:parseFloat(t[4])]:null}function xe(e){let[t,n,r,i]=e,a=t/360,o=n/100,s=r/100,c,l,u;if(n===0)c=l=u=s;else{let e=(e,t,n)=>(n<0&&(n+=1),n>1&&--n,n<1/6?e+(t-e)*6*n:n<1/2?t:n<2/3?e+(t-e)*(2/3-n)*6:e),t=s<.5?s*(1+o):s+o-s*o,n=2*s-t;c=e(n,t,a+1/3),l=e(n,t,a),u=e(n,t,a-1/3)}return[c,l,u,i]}var Se,Ce;function we(){return(we=t((()=>{Se=(e,t,n)=>Math.min(Math.max(e,t),n),Ce=[.5,.5,.5,1]})))()}function Te(){if(typeof window>`u`)return;let e=new Image;return e.src=Ee,e}var Ee;function De(){return(De=t((()=>{Ee=`data:image/png;base64,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`})))()}function Oe(){return(Oe=t((()=>{})))()}function ke(e){let t=Ae.useRef(void 0),n=Ae.useCallback(t=>{let n=e.map(e=>{if(e!=null){if(typeof e==`function`){let n=e,r=n(t);return typeof r==`function`?r:()=>{n(null)}}return e.current=t,()=>{e.current=null}}});return()=>{n.forEach(e=>e?.())}},e);return Ae.useMemo(()=>e.every(e=>e==null)?null:e=>{t.current&&=(t.current(),void 0),e!=null&&(t.current=n(e))},e)}var Ae;function je(){return(je=t((()=>{Ae=e(r(),1)})))()}function Me(e){if(e.naturalWidth<1024&&e.naturalHeight<1024){if(e.naturalWidth<1||e.naturalHeight<1)return;let t=e.naturalWidth/e.naturalHeight;e.width=Math.round(t>1?1024*t:1024),e.height=Math.round(t>1?1024:1024/t)}}async function Ne(e){let t={},n=[],r=e=>{try{return e.startsWith(`/`)||new URL(e),!0}catch{return!1}},i=e=>{try{return!e.startsWith(`/`)&&new URL(e,window.location.origin).origin!==window.location.origin}catch{return!1}};return Object.entries(e).forEach(([e,a])=>{if(typeof a==`string`){let o=a||`data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==`;if(!r(o)){console.warn(`Uniform "${e}" has invalid URL "${o}". Skipping image loading.`);return}let s=new Promise((n,r)=>{let a=new Image;i(o)&&(a.crossOrigin=`anonymous`),a.onload=()=>{Me(a),t[e]=a,n()},a.onerror=()=>{console.error(`Could not set uniforms. Failed to load image at ${o}`),r()},a.src=o});n.push(s)}else if(a instanceof HTMLImageElement){let r=a.decode().then(()=>{Me(a),t[e]=a});n.push(r)}else t[e]=a}),await Promise.all(n),t}var K,Pe,Fe;function Ie(){return(Ie=t((()=>{K=r(),O(),Oe(),je(),Pe=i(),Fe=(0,K.forwardRef)(function({fragmentShader:e,uniforms:t,webGlContextAttributes:n,speed:r=0,frame:i=0,width:a,height:o,minPixelRatio:s,maxPixelCount:c,mipmaps:l,style:u,...d},f){let[p,m]=(0,K.useState)(!1),h=(0,K.useRef)(null),g=(0,K.useRef)(null),_=(0,K.useRef)(n);(0,K.useEffect)(()=>((async()=>{let n=await Ne(t);h.current&&!g.current&&(g.current=new E(h.current,e,n,_.current,r,i,s,c,l),m(!0))})(),()=>{g.current?.dispose(),g.current=null}),[e]),(0,K.useEffect)(()=>{let e=!1;return(async()=>{let n=await Ne(t);e||g.current?.setUniforms(n)})(),()=>{e=!0}},[t,p]),(0,K.useEffect)(()=>{g.current?.setSpeed(r)},[r,p]),(0,K.useEffect)(()=>{g.current?.setMaxPixelCount(c)},[c,p]),(0,K.useEffect)(()=>{g.current?.setMinPixelRatio(s)},[s,p]),(0,K.useEffect)(()=>{g.current?.setFrame(i)},[i,p]);let v=ke([h,f]);return(0,Pe.jsx)(`div`,{ref:v,style:a!==void 0||o!==void 0?{width:typeof a==`string`&&isNaN(+a)===!1?+a:a,height:typeof o==`string`&&isNaN(+o)===!1?+o:o,...u}:u,...d})}),Fe.displayName=`ShaderMount`})))()}function Le(e,t){if(Object.keys(e).length!==Object.keys(t).length)return!1;for(let n in e)if(n===`colors`){let n=Array.isArray(e.colors),r=Array.isArray(t.colors);if(!n||!r){if(Object.is(e.colors,t.colors)===!1)return!1;continue}if(e.colors?.length!==t.colors?.length||!e.colors?.every((e,n)=>e===t.colors?.[n]))return!1}else if(Object.is(e[n],t[n])===!1)return!1;return!0}var Re,ze,q,Be;function Ve(){return(Ve=t((()=>{Re=r(),Ie(),M(),we(),B(),ze=i(),q={name:`Default`,params:{...k,speed:1,frame:0,colors:[`#e0eaff`,`#241d9a`,`#f75092`,`#9f50d3`],distortion:.8,swirl:.1,grainMixer:0,grainOverlay:0}},{...k},{...k},{...k},Be=(0,Re.memo)(function({speed:e=q.params.speed,frame:t=q.params.frame,colors:n=q.params.colors,distortion:r=q.params.distortion,swirl:i=q.params.swirl,grainMixer:a=q.params.grainMixer,grainOverlay:o=q.params.grainOverlay,fit:s=q.params.fit,rotation:c=q.params.rotation,scale:l=q.params.scale,originX:u=q.params.originX,originY:d=q.params.originY,offsetX:f=q.params.offsetX,offsetY:p=q.params.offsetY,worldWidth:m=q.params.worldWidth,worldHeight:h=q.params.worldHeight,...g}){let _={u_colors:n.map(G),u_colorsCount:n.length,u_distortion:r,u_swirl:i,u_grainMixer:a,u_grainOverlay:o,u_fit:j[s],u_rotation:c,u_scale:l,u_offsetX:f,u_offsetY:p,u_originX:u,u_originY:d,u_worldWidth:m,u_worldHeight:h};return(0,ze.jsx)(Fe,{...g,speed:e,frame:t,fragmentShader:ne,uniforms:_})},Le)})))()}var He,Ue,J,We;function Ge(){return(Ge=t((()=>{He=r(),Ie(),we(),ie(),M(),Ue=i(),J={name:`Default`,params:{...A,speed:1,frame:0,scale:.6,colorBack:`#000000`,colorFront:`#00b2ff`,shape:`sphere`,type:`4x4`,size:2}},{...A},{...A},{...k},{...k},{...k},We=(0,He.memo)(function({speed:e=J.params.speed,frame:t=J.params.frame,colorBack:n=J.params.colorBack,colorFront:r=J.params.colorFront,shape:i=J.params.shape,type:a=J.params.type,pxSize:o,size:s=o===void 0?J.params.size:o,fit:c=J.params.fit,scale:l=J.params.scale,rotation:u=J.params.rotation,originX:d=J.params.originX,originY:f=J.params.originY,offsetX:p=J.params.offsetX,offsetY:m=J.params.offsetY,worldWidth:h=J.params.worldWidth,worldHeight:g=J.params.worldHeight,..._}){let v={u_colorBack:G(n),u_colorFront:G(r),u_shape:H[i],u_type:re[a],u_pxSize:s,u_fit:j[c],u_scale:l,u_rotation:u,u_offsetX:p,u_offsetY:m,u_originX:d,u_originY:f,u_worldWidth:h,u_worldHeight:g};return(0,Ue.jsx)(Fe,{..._,speed:e,frame:t,fragmentShader:V,uniforms:v})})})))()}var Ke,qe,Y,Je;function Ye(){return(Ye=t((()=>{Ke=r(),Ie(),M(),we(),De(),oe(),qe=i(),Y={name:`Default`,params:{...k,fit:`cover`,scale:.6,speed:0,frame:0,colorFront:`#9fadbc`,colorBack:`#ffffff`,contrast:.3,roughness:.4,fiber:.3,fiberSize:.2,crumples:.3,crumpleSize:.35,folds:.65,foldCount:5,fade:0,drops:.2,seed:5.8}},{...k},{...k},{...k},Je=(0,Ke.memo)(function({speed:e=Y.params.speed,frame:t=Y.params.frame,colorFront:n=Y.params.colorFront,colorBack:r=Y.params.colorBack,image:i=``,contrast:a=Y.params.contrast,roughness:o=Y.params.roughness,fiber:s=Y.params.fiber,crumples:c=Y.params.crumples,folds:l=Y.params.folds,drops:u=Y.params.drops,seed:d=Y.params.seed,fiberScale:f,fiberSize:p=f===void 0?Y.params.fiberSize:.2/f,crumplesScale:m,crumpleSize:h=m===void 0?Y.params.crumpleSize:.2/m,blur:g,fade:_=g===void 0?Y.params.fade:g,foldsNumber:v,foldCount:y=v===void 0?Y.params.foldCount:v,fit:b=Y.params.fit,scale:x=Y.params.scale,rotation:S=Y.params.rotation,originX:C=Y.params.originX,originY:w=Y.params.originY,offsetX:T=Y.params.offsetX,offsetY:E=Y.params.offsetY,worldWidth:D=Y.params.worldWidth,worldHeight:O=Y.params.worldHeight,...k}){let A=typeof window<`u`&&{u_noiseTexture:Te()},M={u_image:i,u_colorFront:G(n),u_colorBack:G(r),u_contrast:a,u_roughness:o,u_fiber:s,u_fiberSize:p,u_crumples:c,u_crumpleSize:h,u_foldCount:y,u_folds:l,u_fade:_,u_drops:u,u_seed:d,...A,u_fit:j[b],u_scale:x,u_rotation:S,u_offsetX:T,u_offsetY:E,u_originX:C,u_originY:w,u_worldWidth:D,u_worldHeight:O};return(0,qe.jsx)(Fe,{...k,speed:e,frame:t,fragmentShader:ae,mipmaps:[`u_image`],uniforms:M})},Le)})))()}var Xe,Ze,X,Qe;function $e(){return($e=t((()=>{Xe=r(),Ie(),ue(),M(),we(),Ze=i(),X={name:`Default`,params:{...k,fit:`cover`,speed:0,frame:0,colorBack:`#00000000`,colorShadow:`#000000`,colorHighlight:`#ffffff`,shadows:.25,size:.5,angle:0,distortionShape:`prism`,highlights:.1,shape:`lines`,distortion:.5,shift:0,blur:0,edges:.25,stretch:0,margin:0,marginLeft:0,marginRight:0,marginTop:0,marginBottom:0,grainMixer:0,grainOverlay:0}},{...k},{...k},{...k},Qe=(0,Xe.memo)(function({speed:e=X.params.speed,frame:t=X.params.frame,colorBack:n=X.params.colorBack,colorShadow:r=X.params.colorShadow,colorHighlight:i=X.params.colorHighlight,image:a=``,shadows:o=X.params.shadows,angle:s=X.params.angle,distortion:c=X.params.distortion,distortionShape:l=X.params.distortionShape,highlights:u=X.params.highlights,shape:d=X.params.shape,shift:f=X.params.shift,blur:p=X.params.blur,edges:m=X.params.edges,margin:h,marginLeft:g=h??X.params.marginLeft,marginRight:_=h??X.params.marginRight,marginTop:v=h??X.params.marginTop,marginBottom:y=h??X.params.marginBottom,grainMixer:b=X.params.grainMixer,grainOverlay:x=X.params.grainOverlay,stretch:S=X.params.stretch,count:C,size:w=C===void 0?X.params.size:(1/(C*1.6))**(1/6)/.7-.5,fit:T=X.params.fit,scale:E=X.params.scale,rotation:D=X.params.rotation,originX:O=X.params.originX,originY:k=X.params.originY,offsetX:A=X.params.offsetX,offsetY:M=X.params.offsetY,worldWidth:N=X.params.worldWidth,worldHeight:P=X.params.worldHeight,...F}){let I={u_image:a,u_colorBack:G(n),u_colorShadow:G(r),u_colorHighlight:G(i),u_shadows:o,u_size:w,u_angle:s,u_distortion:c,u_shift:f,u_blur:p,u_edges:m,u_stretch:S,u_distortionShape:le[l],u_highlights:u,u_shape:ce[d],u_marginLeft:g,u_marginRight:_,u_marginTop:v,u_marginBottom:y,u_grainMixer:b,u_grainOverlay:x,u_fit:j[T],u_scale:E,u_rotation:D,u_offsetX:A,u_offsetY:M,u_originX:O,u_originY:k,u_worldWidth:N,u_worldHeight:P};return(0,Ze.jsx)(Fe,{...F,speed:e,frame:t,fragmentShader:se,mipmaps:[`u_image`],uniforms:I})})})))()}var et,tt,Z,nt;function rt(){return(rt=t((()=>{et=r(),Ie(),fe(),we(),M(),ie(),tt=i(),Z={name:`Default`,params:{...k,fit:`cover`,speed:0,frame:0,colorFront:`#94ffaf`,colorBack:`#000c38`,colorHighlight:`#eaff94`,type:`8x8`,size:2,colorSteps:2,originalColors:!1,inverted:!1}},{...k},{...k},{...k},nt=(0,et.memo)(function({speed:e=Z.params.speed,frame:t=Z.params.frame,colorFront:n=Z.params.colorFront,colorBack:r=Z.params.colorBack,colorHighlight:i=Z.params.colorHighlight,image:a=``,type:o=Z.params.type,colorSteps:s=Z.params.colorSteps,originalColors:c=Z.params.originalColors,inverted:l=Z.params.inverted,pxSize:u,size:d=u===void 0?Z.params.size:u,fit:f=Z.params.fit,scale:p=Z.params.scale,rotation:m=Z.params.rotation,originX:h=Z.params.originX,originY:g=Z.params.originY,offsetX:_=Z.params.offsetX,offsetY:v=Z.params.offsetY,worldWidth:y=Z.params.worldWidth,worldHeight:b=Z.params.worldHeight,...x}){let S={u_image:a,u_colorFront:G(n),u_colorBack:G(r),u_colorHighlight:G(i),u_type:re[o],u_pxSize:d,u_colorSteps:s,u_originalColors:c,u_inverted:l,u_fit:j[f],u_rotation:m,u_scale:p,u_offsetX:_,u_offsetY:v,u_originX:h,u_originY:g,u_worldWidth:y,u_worldHeight:b};return(0,tt.jsx)(Fe,{...x,speed:e,frame:t,fragmentShader:de,uniforms:S})},Le)})))()}var it,at,Q,ot;function st(){return(st=t((()=>{it=r(),Ie(),me(),M(),at=i(),Q={name:`Default`,params:{...k,scale:1,fit:`contain`,speed:0,frame:0,spread:.6,bias:1,angle:0,perspective:.1,count:35,dispersion:1,dispersionShift:0,dispersionColor:.6,focusCenter:.8,focusEdges:1,swirl:.35,noise:0,noiseFrequency:.25,noiseOffset:0,lensBulge:0,lensCircle:0,grainMixer:0,grainOverlay:0,imageX:0,imageY:0}},{...k},{...k},{...k},ot=(0,it.memo)(function({speed:e=Q.params.speed,frame:t=Q.params.frame,image:n=``,spread:r=Q.params.spread,bias:i=Q.params.bias,angle:a=Q.params.angle,perspective:o=Q.params.perspective,count:s=Q.params.count,dispersion:c=Q.params.dispersion,dispersionShift:l=Q.params.dispersionShift,dispersionColor:u=Q.params.dispersionColor,focusCenter:d=Q.params.focusCenter,focusEdges:f=Q.params.focusEdges,swirl:p=Q.params.swirl,noise:m=Q.params.noise,noiseFrequency:h=Q.params.noiseFrequency,noiseOffset:g=Q.params.noiseOffset,lensBulge:_=Q.params.lensBulge,lensCircle:v=Q.params.lensCircle,grainMixer:y=Q.params.grainMixer,grainOverlay:b=Q.params.grainOverlay,imageX:x=Q.params.imageX,imageY:S=Q.params.imageY,fit:C=Q.params.fit,scale:w=Q.params.scale,rotation:T=Q.params.rotation,originX:E=Q.params.originX,originY:D=Q.params.originY,offsetX:O=Q.params.offsetX,offsetY:k=Q.params.offsetY,worldWidth:A=Q.params.worldWidth,worldHeight:M=Q.params.worldHeight,...N}){let P={u_image:n,u_spread:r,u_bias:i,u_angle:a,u_perspective:o,u_count:s,u_dispersion:c,u_dispersionShift:l,u_dispersionColor:u,u_focusCenter:d,u_focusEdges:f,u_swirl:p,u_noise:m,u_noiseFrequency:h,u_noiseOffset:g,u_lensBulge:_,u_lensCircle:v,u_grainMixer:y,u_grainOverlay:b,u_imageX:x,u_imageY:S,u_fit:j[C],u_rotation:T,u_scale:w,u_offsetX:O,u_offsetY:k,u_originX:E,u_originY:D,u_worldWidth:A,u_worldHeight:M};return(0,at.jsx)(Fe,{...N,speed:e,frame:t,fragmentShader:pe,mipmaps:[`u_image`],uniforms:P})},Le)})))()}var ct,lt,$,ut;function dt(){return(dt=t((()=>{ct=r(),Ie(),_e(),we(),M(),lt=i(),$={name:`Default`,params:{...k,fit:`cover`,speed:0,frame:0,colorBack:`#f2f1e8`,colorFront:`#2b2b2b`,size:.5,radius:1.25,contrast:.4,originalColors:!1,inverted:!1,grainMixer:.2,grainOverlay:.2,grainSize:.5,grid:`hex`,type:`gooey`}},{...k},{...k},{...k},ut=(0,ct.memo)(function({speed:e=$.params.speed,frame:t=$.params.frame,colorFront:n=$.params.colorFront,colorBack:r=$.params.colorBack,image:i=``,size:a=$.params.size,radius:o=$.params.radius,contrast:s=$.params.contrast,originalColors:c=$.params.originalColors,inverted:l=$.params.inverted,grainMixer:u=$.params.grainMixer,grainOverlay:d=$.params.grainOverlay,grainSize:f=$.params.grainSize,grid:p=$.params.grid,type:m=$.params.type,fit:h=$.params.fit,scale:g=$.params.scale,rotation:_=$.params.rotation,originX:v=$.params.originX,originY:y=$.params.originY,offsetX:b=$.params.offsetX,offsetY:x=$.params.offsetY,worldWidth:S=$.params.worldWidth,worldHeight:C=$.params.worldHeight,...w}){let T={u_image:i,u_colorFront:G(n),u_colorBack:G(r),u_size:a,u_radius:o,u_contrast:s,u_originalColors:c,u_inverted:l,u_grainMixer:u,u_grainOverlay:d,u_grainSize:f,u_grid:ge[p],u_type:he[m],u_fit:j[h],u_rotation:_,u_scale:g,u_offsetX:b,u_offsetY:x,u_originX:v,u_originY:y,u_worldWidth:S,u_worldHeight:C};return(0,lt.jsx)(Fe,{...w,speed:e,frame:t,fragmentShader:W,uniforms:T})},Le)})))()}var ft,pt,mt,ht,gt;function _t(){return(_t=t((()=>{c(),ft={LocalFileHeader:67324752,DataDescriptor:134695760,CentralFileHeader:33639248,EndOfCentralDirectory:101010256},pt={get(e){return{signature:s.get(e,0),compressedSize:s.get(e,8),uncompressedSize:s.get(e,12)}},len:16},mt={get(e){let t=l.get(e,6);return{signature:s.get(e,0),minVersion:l.get(e,4),dataDescriptor:!!(t&8),compressedMethod:l.get(e,8),compressedSize:s.get(e,18),uncompressedSize:s.get(e,22),filenameLength:l.get(e,26),extraFieldLength:l.get(e,28),filename:null}},len:30},ht={get(e){return{signature:s.get(e,0),nrOfThisDisk:l.get(e,4),nrOfThisDiskWithTheStart:l.get(e,6),nrOfEntriesOnThisDisk:l.get(e,8),nrOfEntriesOfSize:l.get(e,10),sizeOfCd:s.get(e,12),offsetOfStartOfCd:s.get(e,16),zipFileCommentLength:l.get(e,20)}},len:22},gt={get(e){let t=l.get(e,8);return{signature:s.get(e,0),minVersion:l.get(e,6),dataDescriptor:!!(t&8),compressedMethod:l.get(e,10),compressedSize:s.get(e,20),uncompressedSize:s.get(e,24),filenameLength:l.get(e,28),extraFieldLength:l.get(e,30),fileCommentLength:l.get(e,32),relativeOffsetOfLocalHeader:s.get(e,42),filename:null}},len:46}})))()}function vt(e){let t=new Uint8Array(s.len);return s.put(t,0,e),t}function yt(e,t){let n=e.length,r=t.length;if(r>n)return-1;for(let i=0;i<=n-r;i++){let n=!0;for(let a=0;a<r;a++)if(e[i+a]!==t[a]){n=!1;break}if(n)return i}return-1}function bt(e){let t=e.reduce((e,t)=>e+t.length,0),n=new Uint8Array(t),r=0;for(let t of e)n.set(t,r),r+=t.length;return n}var xt,St,Ct,wt,Tt,Et;function Dt(){return(Dt=t((()=>{c(),xt=e(a(),1),_t(),St=(0,xt.default)(`tokenizer:inflate`),Ct=262144,wt=vt(ft.DataDescriptor),Tt=vt(ft.EndOfCentralDirectory),Et=class e{constructor(e){this.tokenizer=e,this.syncBuffer=new Uint8Array(Ct)}async isZip(){return await this.peekSignature()===ft.LocalFileHeader}peekSignature(){return this.tokenizer.peekToken(s)}async findEndOfCentralDirectoryLocator(){let e=this.tokenizer,t=Math.min(16384,e.fileInfo.size),n=this.syncBuffer.subarray(0,t);await this.tokenizer.readBuffer(n,{position:e.fileInfo.size-t});for(let r=n.length-4;r>=0;r--)if(n[r]===Tt[0]&&n[r+1]===Tt[1]&&n[r+2]===Tt[2]&&n[r+3]===Tt[3])return e.fileInfo.size-t+r;return-1}async readCentralDirectory(){if(!this.tokenizer.supportsRandomAccess()){St(`Cannot reading central-directory without random-read support`);return}St(`Reading central-directory...`);let e=this.tokenizer.position,t=await this.findEndOfCentralDirectoryLocator();if(t>0){St(`Central-directory 32-bit signature found`);let n=await this.tokenizer.readToken(ht,t),r=[];this.tokenizer.setPosition(n.offsetOfStartOfCd);for(let e=0;e<n.nrOfEntriesOfSize;++e){let t=await this.tokenizer.readToken(gt);if(t.signature!==ft.CentralFileHeader)throw Error(`Expected Central-File-Header signature`);t.filename=await this.tokenizer.readToken(new o(t.filenameLength,`utf-8`)),await this.tokenizer.ignore(t.extraFieldLength),await this.tokenizer.ignore(t.fileCommentLength),r.push(t),St(`Add central-directory file-entry: n=${e+1}/${r.length}: filename=${r[e].filename}`)}return this.tokenizer.setPosition(e),r}this.tokenizer.setPosition(e)}async unzip(e){let t=await this.readCentralDirectory();if(t)return this.iterateOverCentralDirectory(t,e);let n=!1;do{let t=await this.readLocalFileHeader();if(!t)break;let r=e(t);n=!!r.stop;let i;if(await this.tokenizer.ignore(t.extraFieldLength),t.dataDescriptor&&t.compressedSize===0){let e=[],n=Ct;St(`Compressed-file-size unknown, scanning for next data-descriptor-signature....`);let i=-1;for(;i<0&&n===Ct;){n=await this.tokenizer.peekBuffer(this.syncBuffer,{mayBeLess:!0}),i=yt(this.syncBuffer.subarray(0,n),wt);let t=i>=0?i:n;if(r.handler){let n=new Uint8Array(t);await this.tokenizer.readBuffer(n),e.push(n)}else await this.tokenizer.ignore(t)}St(`Found data-descriptor-signature at pos=${this.tokenizer.position}`),r.handler&&await this.inflate(t,bt(e),r.handler)}else r.handler?(St(`Reading compressed-file-data: ${t.compressedSize} bytes`),i=new Uint8Array(t.compressedSize),await this.tokenizer.readBuffer(i),await this.inflate(t,i,r.handler)):(St(`Ignoring compressed-file-data: ${t.compressedSize} bytes`),await this.tokenizer.ignore(t.compressedSize));if(St(`Reading data-descriptor at pos=${this.tokenizer.position}`),t.dataDescriptor&&(await this.tokenizer.readToken(pt)).signature!==134695760)throw Error(`Expected data-descriptor-signature at position ${this.tokenizer.position-pt.len}`)}while(!n)}async iterateOverCentralDirectory(e,t){for(let n of e){let e=t(n);if(e.handler){this.tokenizer.setPosition(n.relativeOffsetOfLocalHeader);let t=await this.readLocalFileHeader();if(t){await this.tokenizer.ignore(t.extraFieldLength);let r=new Uint8Array(n.compressedSize);await this.tokenizer.readBuffer(r),await this.inflate(t,r,e.handler)}}if(e.stop)break}}async inflate(t,n,r){if(t.compressedMethod===0)return r(n);if(t.compressedMethod!==8)throw Error(`Unsupported ZIP compression method: ${t.compressedMethod}`);return St(`Decompress filename=${t.filename}, compressed-size=${n.length}`),r(await e.decompressDeflateRaw(n))}static async decompressDeflateRaw(e){let t=new ReadableStream({start(t){t.enqueue(e),t.close()}}),n=new DecompressionStream(`deflate-raw`),r=t.pipeThrough(n);try{let e=await new Response(r).arrayBuffer();return new Uint8Array(e)}catch(e){let t=e instanceof Error?`Failed to deflate ZIP entry: ${e.message}`:`Unknown decompression error in ZIP entry`;throw TypeError(t)}}async readLocalFileHeader(){let e=await this.tokenizer.peekToken(s);if(e===ft.LocalFileHeader){let e=await this.tokenizer.readToken(mt);return e.filename=await this.tokenizer.readToken(new o(e.filenameLength,`utf-8`)),e}if(e===ft.CentralFileHeader)return!1;throw Error(e===3759263696?`Encrypted ZIP`:`Unexpected signature`)}}})))()}var Ot;function kt(){return(kt=t((()=>{Ot=class{constructor(e){this.tokenizer=e}inflate(){let e=this.tokenizer;return new ReadableStream({async pull(t){let n=new Uint8Array(1024),r=await e.readBuffer(n,{mayBeLess:!0});r===0?t.close():t.enqueue(n.subarray(0,r))}}).pipeThrough(new DecompressionStream(`gzip`))}}})))()}function At(){return(At=t((()=>{Dt(),kt()})))()}export{Ge as _,Dt as a,v as b,ot as c,rt as d,Qe as f,We as g,Ye as h,Et as i,st as l,Je as m,Ot as n,ut as o,$e as p,kt as r,dt as s,At as t,nt as u,Be as v,_ as x,Ve as y};