(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[0],{28:function(e,t,n){},29:function(e,t,n){},30:function(e,t,n){},32:function(e,t,n){},33:function(e,t,n){},39:function(e,t,n){},40:function(e,t,n){},41:function(e,t,n){},43:function(e,t,n){},44:function(e,t,n){},45:function(e,t,n){},46:function(e,t,n){},47:function(e,t,n){},48:function(e,t,n){},49:function(e,t,n){},50:function(e,t,n){},52:function(e,t,n){"use strict";n.r(t);var r=n(0),i=n(10),c=n.n(i),a=(n(28),n(29),n(30),n.p+"static/media/stop.aea36ecb.svg"),o=n.p+"static/media/play.353c4e28.svg",s=n(1);function u(){return Object(s.jsx)("div",{className:"Transport",children:Object(s.jsxs)("div",{className:"Transport__grid",children:[Object(s.jsxs)("div",{className:"Transport__grid__left",children:[Object(s.jsx)("input",{type:"range",min:"0",max:"100",step:"1"}),Object(s.jsx)("div",{className:"volume-feedback"})]}),Object(s.jsxs)("div",{className:"Transport__grid__center",children:[Object(s.jsx)("button",{className:"button__track-forwards"}),Object(s.jsx)("button",{className:"button__stop",children:Object(s.jsx)("img",{src:a,alt:"stop icon"})}),Object(s.jsx)("button",{className:"button__play-pause",children:Object(s.jsx)("img",{src:o,alt:"play icon"})}),Object(s.jsx)("button",{className:"button__track-backwards"})]}),Object(s.jsx)("div",{className:"Transport__grid__right",children:Object(s.jsx)("input",{value:"120"})})]})})}var l=n(4),f=n(2);n(32),n(33);function d(){return Object(s.jsxs)("div",{className:"TrackControl",children:[Object(s.jsxs)("div",{className:"TrackControl__solo-mute",children:[Object(s.jsx)("button",{className:"button__mute",children:"M"}),Object(s.jsx)("button",{className:"button__solo",children:"S"})]}),Object(s.jsxs)("div",{className:"TrackControl__controls",children:[Object(s.jsxs)("div",{className:"track-name-and-volume-slider-container",children:[Object(s.jsx)("div",{className:"track-name",children:"Track 1"}),Object(s.jsx)("input",{className:"slider__volume",type:"range",min:"0",max:"100",step:"1"})]}),Object(s.jsx)("div",{className:"button__automation__container",children:Object(s.jsx)("button",{className:"button__automation",children:"A"})})]})]})}var h=n(9),v=function(){return Object(h.b)()},j=h.c,m=n(3),b=Object(m.b)({name:"Waveform States",initialState:{},reducers:{addWaveform:function(e,t){e[t.payload.id]={position:t.payload.startPosition,startOffset:0,gain:1,mouseDown:!1}},setPosition:function(e,t){e[t.payload.id].position=t.payload.value},setStartOffset:function(e,t){e[t.payload.id].startOffset=t.payload.value},setGain:function(e,t){e[t.payload.id].gain=t.payload.value},setMouseDown:function(e,t){e[t.payload.id].mouseDown=t.payload.value}}}),O=b.actions,g=O.addWaveform,x=O.setPosition,p=(O.setStartOffset,O.setGain),w=O.setMouseDown,_=b.reducer,y=Object(m.b)({name:"Waveform IDs",initialState:{},reducers:{addId:function(e,t){e[t.payload.id]=!0},removeId:function(e,t){delete e[t.payload.id]}}}),L=y.actions,N=L.addId,k=(L.removeId,y.reducer),S=n(16);n(39);function D(e){return e*parseFloat(getComputedStyle(document.documentElement).fontSize)}function R(e){return e/parseFloat(getComputedStyle(document.documentElement).fontSize)}function T(e){return getComputedStyle(document.body).getPropertyValue(e)}function P(e,t,n){if("exp"===n){e=1-e;var r=Math.pow(1-t,3);return 1-(r=e*r/(e*r-e+1))}var i=Math.pow(1-t,3);return i=e*i/(e*i-e+1)}function E(e,t,n,r,i){return(e-t)*(i-r)/(n-t)+r}function C(e,t,n){return e.addEventListener(t,n),function(){e.removeEventListener(t,n)}}var A="$1rem serif",z=T("--light-main"),B="#ffffff";D(1);function W(e,t){for(var n=Object.keys(t),r=0;r<n.length;r+=1){if("string"===typeof t[n[r]])e[n[r]]=t[n[r]];else e[n[r]]=t[n[r]]}}function M(e){return e>=2?M(e*=.5):e}function q(e,t,n,r){var i=t+.5;e.moveTo(i,n),e.lineTo(i,r)}function I(e,t,n,r){var i=t+.5;e.fillText(r,i,n)}function V(e,t){var n=e;return n<D(t)?V(n*=2,t):n}function Z(e,t,n){var r,i=arguments.length>4&&void 0!==arguments[4]?arguments[4]:1,c=arguments.length>5&&void 0!==arguments[5]?arguments[5]:0,a=arguments.length>6&&void 0!==arguments[6]?arguments[6]:1e4;e.height=null===(r=t.current)||void 0===r?void 0:r.offsetHeight,e.width=a,c+a>n.length&&(e.width=n.length-c);var o=e.getContext("2d");o.strokeStyle="white",o.lineWidth=1,o.fillStyle="white";var s=n.channel(0);o.beginPath();var u=a+c;u>n.length&&(u=n.length);for(var l=c;l<u;l++){var f=s.max_sample(l);o.lineTo(l-c+.5,X(f,e.height,i)+.5)}for(var d=u-1;d>=c;d--){var h=s.min_sample(d);o.lineTo(d-c+.5,X(h,e.height,i)+.5)}o.closePath(),o.stroke(),o.fill()}function X(e,t,n){return t-(e*n+128)*t/256}function F(e,t){return function(e){return 44100/e}(t)/function(e){return e/60/4}(e)}function H(e,t,n){return e*F(t,n)}function Y(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:0,r=arguments.length>3&&void 0!==arguments[3]?arguments[3]:"canvas";"number"!==typeof t&&(t=t.length);var i=[],c=n/1e4,a=n,o=function(){var t="_"+c,n=Object(s.jsx)("canvas",{ref:function(n){return e.current[t]=n},className:r},t);i.push(n),c+=1,a+=1e4};do{o()}while(a<t);return i}function U(e,t,n,r){for(var i=V(F(174,r),4)/4,c=0;c<n.length;c+=1){var a=e.current["_"+c];if(a){a.width=1e4,a.height=t.offsetHeight,a.style.left=1e4*c+"px";var o=a.getContext("2d");W(o,{font:A,lineWidth:1,strokeStyle:z,fillStyle:B}),o.clearRect(0,0,a.width,a.height),o.beginPath();for(var s=0;s<n[c].length;s+=1)q(o,n[c][s].currentPos+.5,0,a.height),I(o,n[c][s].currentPos+.5+3,a.height/3,n[c][s].count+""),q(o,n[c][s].currentPos+i+.5,a.height,a.height/1.5),q(o,n[c][s].currentPos+2*i+.5,a.height,a.height/1.5),q(o,n[c][s].currentPos+3*i+.5,a.height,a.height/1.5);o.closePath(),o.stroke()}}}function G(e,t,n,r){for(var i=V(F(174,r),4)/4,c=0;c<n.length;c+=1){var a=e.current["_"+c];if(a){a.width=1e4,a.height=t.offsetHeight,a.style.left=1e4*c+"px";var o=a.getContext("2d");W(o,{font:A,lineWidth:1,strokeStyle:z,fillStyle:B}),o.clearRect(0,0,a.width,a.height),o.beginPath();for(var s=0;s<n[c].length;s+=1)q(o,n[c][s].currentPos+.5,0,a.height),q(o,n[c][s].currentPos+i+.5,a.height,0),q(o,n[c][s].currentPos+2*i+.5,a.height,0),q(o,n[c][s].currentPos+3*i+.5,a.height,0);o.closePath(),o.stroke()}}}function J(e){var t=e.componentClassName,n=e.canvasClassName,i=e.drawToCanvas,c=Object(r.useState)([]),a=Object(f.a)(c,2),o=a[0],u=a[1],l=Object(r.useRef)(null),d=Object(r.useRef)({}),h=j((function(e){return e.zoomLevel})),v=h.zoomLevel,m=h.mouseDown,b=j((function(e){return e.sequencerLength.requiredLengthBars})),O=j((function(e){return e.barNumberData})),g=H(b,174,v);return Object(r.useEffect)((function(){u(Y(d,g,0,n))}),[]),Object(r.useEffect)((function(){var e=Math.ceil(g/1e4);e>o.length&&u((function(t){var r=Y(d,1e4*e,1e4*t.length,n);return[].concat(Object(S.a)(t),Object(S.a)(r))})),l.current&&(l.current.style.width=g+"px",l.current.style.overflow="hidden")}),[g]),Object(r.useEffect)((function(){var e=l.current;e&&i(d,e,O.value,v)}),[v,o,m,O]),Object(s.jsx)("div",{className:t,ref:l,children:o})}n(40),n(41);var $=n(15),K=n.n($),Q=n(19),ee=n(20),te=n.p+"static/media/audio1.08952bdd.mp3",ne=128,re=new AudioContext;function ie(){return(ie=Object(Q.a)(K.a.mark((function e(t){return K.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:fetch(te).then((function(e){return e.arrayBuffer()})).then((function(e){var t={audio_context:re,array_buffer:e,scale:ne};return new Promise((function(e,n){ee.a.createFromAudio(t,(function(t,r){t?n(t):e(r)}))}))})).then((function(e){t(e)}));case 1:case"end":return e.stop()}}),e)})))).apply(this,arguments)}var ce=function(e,t){var n=1/t,r=Math.floor(e*n+.5);return r<0?0:r/n},ae={isDown:!1,y:{start:0,end:0,distanceTravelled:0},x:{start:0,end:0,distanceTravelled:0}};function oe(e){var t=e.parentRef,n=Object(r.useState)({currentPosition:0,lastPosition:0,mouseDown:!1}),i=Object(f.a)(n,2),c=i[0],a=i[1],o=Object(r.useState)(Object(l.a)({},ae)),s=Object(f.a)(o,2),u=s[0],d=s[1],h=Object(r.useRef)(u),m=j((function(e){return e.zoomLevel})).zoomLevel,b=Object(r.useRef)(m),O=v();return Object(r.useEffect)((function(){C(t.current,"mousedown",(function(e){!function(e,t){t((function(t){var n=Object(l.a)({},t);return n.isDown=!0,n.x.start=e.clientX,n.y.start=e.clientY,n}))}(e,d),function(e){e.preventDefault()}(e)})),C(window,"mousemove",(function(e){h.current.isDown&&(function(e,t){t((function(t){var n=Object(l.a)({},t);return n.x.distanceTravelled=e.clientX-n.x.start,n.y.distanceTravelled=n.y.start-e.clientY,n}))}(e,d),function(e,t,n){e((function(e){var r=Object(l.a)({},e),i=F(174,null===t||void 0===t?void 0:t.current),c=null===n||void 0===n?void 0:n.current.x.distanceTravelled,a=(e.lastPosition*i+c)/i;return r.currentPosition=ce(a,1),r}))}(a,b,h))})),C(window,"mouseup",(function(e){h.current.isDown&&(function(e,t){t((function(t){var n=Object(l.a)({},t);return n.x.end=e.clientX,n.y.end=e.clientY,n.isDown=!1,n}))}(e,d),function(e){e((function(e){var t=Object(l.a)({},e);return t.lastPosition=t.currentPosition,t}))}(a))}))}),[t.current]),Object(r.useEffect)((function(){var e=c.currentPosition;O(x({id:"1",value:e}))}),[c.currentPosition]),Object(r.useEffect)((function(){b.current=m,h.current=u}),[m,u]),null}n(43),n(44);function se(e){var t=e.waveform,n=Object(r.useState)([]),i=Object(f.a)(n,2),c=i[0],a=i[1],o=Object(r.useRef)(null),u=Object(r.useRef)({});return Object(r.useEffect)((function(){a(Y(u,t));var e=o.current,n=o.current;n.style.width=t.length+"px",n.style.height=e.offsetHeight+"px"}),[]),Object(r.useEffect)((function(){!function(e){for(var n=Object.keys(e.current).length,r=0,i=0;i<n;i+=1){var c=e.current["_"+i];Z(c,o,t,0,1,r,1e4),c.style.left=r+"px",r+=1e4}}(u)}),[c]),Object(s.jsxs)("div",{className:"Canvas",ref:o,children:[c,";"]})}function ue(e){var t=e.waveform,n=e.parentRef,i=e.trackId,c=Object(r.useState)(128),a=Object(f.a)(c,2),o=a[0],u=a[1],l=j((function(e){return e.zoomLevel})).zoomLevel,d=j((function(e){return e.waveformStates[i]})).gain,h=Object(r.useState)([]),v=Object(f.a)(h,2),m=v[0],b=v[1],O=Object(r.useRef)(null),g=Object(r.useRef)({});return Object(r.useEffect)((function(){var e;O.current.style.height=(null===(e=n.current)||void 0===e?void 0:e.offsetHeight)+"px",b(function(e,t){var n=[],r=ne,i=function(){var i=e.resample({scale:r}),c="_"+r,a=Object(s.jsx)("div",{ref:function(e){return t.current[c]=e},className:"div__zoom-level",children:Object(s.jsx)(se,{waveform:i})},c);n.push(a),r*=2};do{i()}while(r<35e3);return n}(t,g))}),[]),Object(r.useEffect)((function(){if(g.current._128){var e=M(l),t=l/e,n=g.current["_".concat(t)];if(n.style.opacity="1",o!==t)g.current["_".concat(o)].style.opacity="0",u(t);i=e,(r=n).style.transformOrigin="0 0",r.style.transform="scaleX(".concat(1/i,")")}var r,i}),[l]),Object(r.useEffect)((function(){O.current.style.transform="scaleY(".concat(d,")")}),[d]),Object(s.jsx)("div",{className:"HandleZoom",ref:O,children:m})}function le(e){var t=e.id,n=Object(r.useRef)(null),i=Object(r.useRef)(null),c=Object(r.useState)(null),a=Object(f.a)(c,2),o=a[0],u=a[1],l=j((function(e){return e.waveformStates[t]})),d=l.position,h=l.startOffset,v=j((function(e){return e.zoomLevel})).zoomLevel,m=Object(r.useRef)(v),b=F(174,v);return Object(r.useEffect)((function(){!function(e){ie.apply(this,arguments)}(u)}),[]),Object(r.useEffect)((function(){if(o){var e=o.resample({scale:v}).length;i.current.style.width=e+"px"}}),[v]),Object(r.useEffect)((function(){i.current.style.left=d*b+"px"}),[d,v]),Object(r.useEffect)((function(){n.current.style.left=h*b+"px"}),[v,h]),Object(r.useEffect)((function(){m.current=v}),[v]),Object(s.jsx)("div",{className:"Waveform",ref:i,children:Object(s.jsxs)("div",{className:"Waveform__content-container",ref:n,children:[o?Object(s.jsx)(ue,{waveform:o,parentRef:i,trackId:"1"}):null,Object(s.jsx)(oe,{parentRef:i})]})})}function fe(){var e=Object(r.useRef)(null),t=j((function(e){return e.waveformIds})),n=j((function(e){return e.zoomLevel.zoomLevel})),i=j((function(e){return e.sequencerLength.requiredLengthBars}));return Object(r.useEffect)((function(){var t=H(i,174,n),r=e.current;r&&(r.style.width=t+"px")}),[n,i]),Object(s.jsxs)("div",{className:"TrackLane",ref:e,children:[Object(s.jsx)(J,{drawToCanvas:G,canvasClassName:"bar-lines__canvas",componentClassName:"bar-lines"}),Object(s.jsx)("div",{className:"TrackLane__waveform__container",children:t[1]?Object(s.jsx)(le,{id:"1"}):Object(s.jsx)("div",{})})]})}var de=Object(m.b)({name:"Scroll Position",initialState:{barsLeft:0,barsRight:0,pxLeft:0,pxRight:0},reducers:{setScrollPosition:function(e,t){e.barsLeft=t.payload.barsLeft,e.barsRight=t.payload.barsRight,e.pxLeft=t.payload.pxLeft,e.pxRight=t.payload.pxRight}}}),he=de.actions.setScrollPosition,ve=de.reducer;function je(){var e=Object(r.useState)(""),t=Object(f.a)(e,2),n=(t[0],t[1]),i=v(),c=Object(r.useRef)(null),a=j((function(e){return e.zoomLevel})),o=a.zoomLevel,u=a.mouseDown,h=j((function(e){return e.scrollPosition})),m=F(174,o);return Object(r.useEffect)((function(){var e=c.current;if(e){var t=h.barsLeft*m+16;h.barsLeft<0&&(t=h.pxLeft),e.scrollLeft=t;var n=Object(l.a)({},h);n.pxLeft=t,n.pxRight=t+e.offsetWidth,i(he(n))}}),[o]),Object(r.useEffect)((function(){i(g({id:"1",startPosition:0})),i(N({id:"1"}))}),[]),Object(s.jsxs)("div",{className:"Main",children:[Object(s.jsxs)("div",{className:"sidebar",children:[Object(s.jsx)("button",{className:"sidebar__add-track",children:"+ Add Track"}),Object(s.jsx)(d,{})]}),Object(s.jsxs)("div",{className:"sequencer",ref:c,onScroll:function(){var e=c.current;if(n("re-redener"),e&&!u){var t=(e.scrollLeft-16)/m,r=(e.scrollLeft+e.offsetWidth-16)/m,a=e.scrollLeft,o=a+e.offsetWidth;i(he({barsLeft:t,barsRight:r,pxLeft:a,pxRight:o}))}},children:[Object(s.jsx)("div",{}),Object(s.jsxs)("div",{children:[Object(s.jsx)(J,{drawToCanvas:U,canvasClassName:"BarNumbers__canvas",componentClassName:"BarNumbers"}),Object(s.jsx)("div",{className:"track-container",id:"track-1",children:Object(s.jsx)(fe,{})})]})]})]})}n(45),n(46);var me=Object(m.b)({name:"Zoom Level",initialState:{zoomLevel:3e4,mouseDown:!1},reducers:{setZoomLevel:function(e,t){e.zoomLevel=t.payload},setMouseDown:function(e,t){e.mouseDown=t.payload}}}),be=me.actions,Oe=be.setZoomLevel,ge=be.setMouseDown,xe=me.reducer;n(47);function pe(e,t,n,r,i,c,a){var o=E(t,n,r,0+c,i);e.style.transform="translateX(".concat(-(i-o)+a,"rem)")}function we(e,t,n,r,i,c){i.mouse.isDown&&c((function(c){var a=E(c.lastValue,e,t,0+r,n)+R(i.mouse.x.distanceTravelled);a>n&&(a=n),a<0+r&&(a=0+r),a=E(a,0+r,n,e,t);var o=Object(l.a)({},c);return o.value=a,o}))}function _e(e,t,n){e.mouse.isDown&&n((function(e){var t=Object(l.a)({},e);return t.lastValue=t.value,t}))}var ye=n(13),Le=function(e,t,n){e.preventDefault(),this.mouse.isDown=!0,this.mouse.y.start=e.clientY,this.mouse.x.start=e.clientX,n&&n(this.mouse,t)},Ne=function(e,t,n){this.mouse.isDown&&(this.mouse.x.distanceTravelled=e.clientX-this.mouse.x.start,this.mouse.y.distanceTravelled=this.mouse.y.start-e.clientY,n&&n(this.mouse,t))},ke=function(e,t,n){this.mouse.isDown&&(this.mouse.x.end=e.clientX,this.mouse.y.end=e.clientY,n&&n(this.mouse,t),this.mouse.isDown=!1)},Se=function e(){Object(ye.a)(this,e),this.mouse=void 0,this.handleDown=void 0,this.handleMove=void 0,this.handleUp=void 0,this.mouse={isDown:!1,y:{start:0,end:0,distanceTravelled:0},x:{start:0,end:0,distanceTravelled:0}},this.handleDown=Le.bind(this),this.handleMove=Ne.bind(this),this.handleUp=ke.bind(this)};function De(e){var t=e.min,n=e.max,i=e.init,c=e.style,a=e.onChange,o=Object(r.useRef)(null),u=Object(r.useRef)(null),l=Object(r.useRef)(null),d=Object(r.useRef)(null),h=Object(r.useRef)(null),j=Object(r.useState)({value:i,lastValue:i}),m=Object(f.a)(j,2),b=m[0],O=m[1],g=new Se,x=T("--accent-color"),p=T("--dark-alt"),w=v();Object(r.useEffect)((function(){var e=o.current,r=u.current,a=l.current,s=d.current,f=h.current;!function(e,t,n,r,i,a,o){e.style.padding=o+"rem",e.style.width=c.mainAxisLength+"rem",e.style.height="100%",t.style.height=c.crossAxisLength*a*1.5+"rem",t.style.width=c.crossAxisLength*a+"rem",r.style.height="100%",r.style.width="100%",n.width=r.offsetWidth,n.height=r.offsetHeight,i.style.width=c.crossAxisLength*a+"rem",i.style.fill=x,i.style.stroke=p,i.style.strokeWidth="1"}(e,r,a,s,f,.4,.5),function(e,t){var n=e.getContext("2d");n.lineWidth=1,n.strokeStyle="white";for(var r=0;r<=1;r+=t){var i=P(r,.4,"exp")*e.width;n.moveTo(i+.5,.6*e.height),n.lineTo(i+.5,.8*e.height)}n.moveTo(0,.2*e.height),n.lineTo(e.width,.2*e.height),n.stroke()}(a,.04),pe(r,i,t,n,R(a.width),0,.4),C(r,"mousedown",g.handleDown),C(window,"mousemove",(function(e){return g.handleMove(e,r,(function(){w(ge(!0)),we(t,n,c.mainAxisLength,c.crossAxisLength,g,O)}))})),C(window,"mouseup",(function(e){return g.handleUp(e,r,(function(){w(ge(!1)),_e(g,b.lastValue,O)}))}))}),[]),Object(r.useEffect)((function(){var e=u.current,r=l.current;pe(e,b.value,t,n,R(r.width),0,.4),a(b.value)}),[b.value]);return Object(s.jsx)("div",{className:"ZoomSlider",ref:o,children:Object(s.jsxs)("div",{className:"ZoomSlider__container",ref:d,children:[Object(s.jsx)("canvas",{className:"ZoomSlider__container__canvas",ref:l}),Object(s.jsx)("div",{className:"ZoomSlider__container__knub",ref:u,children:Object(s.jsx)("svg",{className:"ZoomSlider__container__knub__svg",viewBox:"0 0 7 12",ref:h,children:Object(s.jsx)("path",{d:"M 0 0 L 7 0 L 7 6 L 4 12 L 3 12 L 0 6 L 0 0"})})})]})})}function Re(){var e=v();return Object(s.jsx)("div",{className:"ZoomControl",children:Object(s.jsx)(De,{init:1,max:1,min:0,style:{mainAxisLength:15,crossAxisLength:2},onChange:function(t){var n=P(t,.7,"log");n=E(n,0,1,ne,4e4),e(Oe(n))}})})}n(48),n(49);var Te=function e(t){Object(ye.a)(this,e),this.start=void 0,this.value=void 0,this.value=t,this.start=t};function Pe(e){var t=e.min,n=e.max,i=(e.step,e.init),c=(e.log,e.logType,e.dbType,e.waveformId,v(),Object(r.useRef)(null)),a=Object(r.useState)(0),o=Object(f.a)(a,2),u=o[0],l=o[1],d=new Se,h=function(e,t,n){return E(e,t,n,-130,130)}(i,t,n),j=new Te(h);function m(e,t){e.isDown&&l((function(t){return t,function(e){var t=2*e.x.distanceTravelled,n=j.start+t;return n>130&&(n=130),n<-130&&(n=-130),n}(e)}))}function b(e,t){e.isDown&&l((function(e){return j.start=e,e}))}return Object(r.useEffect)((function(){l(j.value);var e=c.current;e&&(C(e,"mousedown",(function(t){return d.handleDown(t,e)})),C(window,"mousemove",(function(t){d.handleMove(t,e,m)})),C(window,"mouseup",(function(t){return d.handleUp(t,e,b)})))}),[]),Object(r.useEffect)((function(){c.current&&(c.current.style.transform="rotate(".concat(u,"deg)"))}),[u]),Object(s.jsx)("div",{className:"Dial",children:Object(s.jsxs)("div",{className:"Dial__knob",children:[Object(s.jsx)("div",{className:"Dial__knob__background"}),Object(s.jsx)("div",{className:"Dial__knob__highlight"}),Object(s.jsx)("div",{className:"Dial__knob__line__container",ref:c,children:Object(s.jsx)("div",{className:"Dial__knob__line"})})]})})}n(50);function Ee(e){var t=e.min,n=e.max,i=e.init,c=e.onChange,a=e.style,o=e.id,u=Object(r.useRef)(null),l=Object(r.useRef)(null),d=Object(r.useRef)(null),h=Object(r.useState)({value:i,lastValue:i}),j=Object(f.a)(h,2),m=j[0],b=j[1],O=Object(r.useState)(!1),g=Object(f.a)(O,2),x=g[0],p=g[1],_=new Se,y=v();return Object(r.useEffect)((function(){var e=u.current,r=l.current,c=d.current;!function(e,t){e.style.width=a.mainAxisLength+"rem",e.style.height=a.crossAxisLength+"rem",t.style.width=a.crossAxisLength+"rem",t.style.height=a.crossAxisLength+"rem"}(e,c),pe(r,i,t,n,a.mainAxisLength,a.crossAxisLength,0),C(c,"mousedown",(function(e){p(!0),_.handleDown(e)})),C(window,"mousemove",(function(e){_.handleMove(e,c,(function(){we(t,n,a.mainAxisLength,a.crossAxisLength,_,b)}))})),C(window,"mouseup",(function(e){p(!1),_.handleUp(e,r,(function(){return _e(_,m.lastValue,b)}))}))}),[]),Object(r.useEffect)((function(){pe(l.current,m.value,t,n,a.mainAxisLength,a.crossAxisLength,0),c(m.value)}),[m.value]),Object(r.useEffect)((function(){y(w({id:o,value:x}))}),[x]),Object(s.jsx)("div",{className:"VolumeSlider",ref:u,children:Object(s.jsx)("div",{className:"VolumeSlider__handle",ref:l,children:Object(s.jsx)("div",{className:"VolumeSlider__handle__knub",ref:d})})})}function Ce(){var e=v();return Object(s.jsxs)("div",{className:"WaveformControl",children:[Object(s.jsx)(Pe,{min:0,max:100,step:1,init:50,log:0,logType:"log",dbType:"linear",waveformId:"1"}),Object(s.jsx)(Ee,{style:{mainAxisLength:10,crossAxisLength:1},min:0,max:2,init:1,onChange:function(t){e(p({id:"1",value:t}))},id:"1"})]})}function Ae(){return Object(s.jsxs)("div",{className:"BottomSection",children:[Object(s.jsx)(Re,{}),Object(s.jsx)(Ce,{})]})}var ze=Object(m.b)({name:"Bar Number Data",initialState:{value:[],loaded:!1},reducers:{setBarNumberData:function(e,t){e.value=t.payload},setLoaded:function(e){e.loaded=!0}}}),Be=ze.actions,We=Be.setBarNumberData,Me=Be.setLoaded,qe=ze.reducer;function Ie(){var e=j((function(e){return e.zoomLevel})).zoomLevel,t=j((function(e){return e.sequencerLength.requiredLengthBars})),n=v();return Object(r.useEffect)((function(){var r=function(e,t){for(var n=F(174,t),r=V(n,4),i=r/n,c=[[]],a=0,o=1,s=0,u=0;u<e;u+=r){var l=Math.floor(u/1e4);l!==a&&(a=l,c.push([]),s-=1e4),c[a].push({count:o,currentPos:u+s}),o+=i}return c}(H(t,174,e),e);n(We(r)),n(Me())}),[e,t]),null}var Ve,Ze,Xe,Fe,He,Ye,Ue=n(5),Ge=n(6),Je="".concat(.25,"rem solid var(--light-main)"),$e=Ge.a.div(Ve||(Ve=Object(Ue.a)(["\n  width: ","rem;\n  background: white;\n  height: 100vh;\n  background: var(--dark-main);\n  display: grid;\n  grid-template-rows: auto 1fr;\n  border-left: ",";\n  font-size: 1rem;\n"])),(function(e){return e.theme.width}),Je),Ke=Ge.a.div(Ze||(Ze=Object(Ue.a)([""]))),Qe=Ge.a.div(Xe||(Xe=Object(Ue.a)(["\n  height: 2em;\n  color: white;\n  font-size: 1em;\n  font-weight: 800;\n  text-align: center;\n  line-height: 2em;\n  background: ",";\n  position: relative;\n"])),(function(e){return e.theme.background})),et=Ge.a.button(Fe||(Fe=Object(Ue.a)(["\n  background: none;\n  border: none;\n  padding: 0;\n  font: inherit;\n  cursor: pointer;\n  outline: inherit;\n  background: var(--dark-main-faded);\n  height: ","em;\n  width: ","em;\n  border-radius: 50%;\n  position: absolute;\n  left: ","em;\n  top: 0.4em;\n  text-align: center;\n  font-size: 1em;\n  display: grid;\n  grid-template-rows: 1fr 1fr;\n  grid-template-columns: 1fr 1fr;\n  grid-gap: 0.15rem;\n  overflow: hidden;\n  border: 0.05rem solid white;\n  transform: rotate(","deg);\n"])),1.2,1.2,.275,(function(e){return e.theme.rotation})),tt=Ge.a.div(He||(He=Object(Ue.a)(["\n  background: white;\n  width: 100%;\n  height: 100%;\n"]))),nt=function(e){var t=e.rotation,n=e.onClick;return Object(s.jsxs)(et,{theme:{rotation:t},onClick:n,children:[Object(s.jsx)(tt,{}),Object(s.jsx)(tt,{}),Object(s.jsx)(tt,{}),Object(s.jsx)(tt,{})]})},rt=Ge.a.div(Ye||(Ye=Object(Ue.a)(["\n  transform: rotate(90deg);\n  transform-origin: top left;\n  width: 0px;\n  margin-top: 3rem;\n  margin-left: 0.8rem;\n  height: 0;\n  line-height: 0;\n"])));function it(e){var t=Object(s.jsx)("div",{children:"BROWSER"});return e||(t=Object(s.jsx)(rt,{children:"BROWSER"})),t}function ct(){var e=Object(r.useState)(!0),t=Object(f.a)(e,2),n=t[0],i=t[1];return Object(s.jsxs)($e,{theme:{width:n?30:2},children:[Object(s.jsxs)(Qe,{theme:{background:n?"var(--light-main)":"inherit"},children:[Object(s.jsx)(nt,{rotation:n?45:0,onClick:function(){n&&i(!1),n||i(!0)}}),it(n)]}),Object(s.jsx)(Ke,{})]})}var at=Object(m.b)({name:"Sequencer length",initialState:{lengthBars:250,requiredLengthBars:250},reducers:{setLength:function(e,t){e.lengthBars=t.payload.value},setRequiredLength:function(e,t){e.requiredLengthBars=t.payload.value}}}),ot=at.actions,st=(ot.setLength,ot.setRequiredLength),ut=at.reducer;function lt(){var e=j((function(e){return e.scrollPosition})),t=e.pxLeft,n=e.pxRight,i=j((function(e){return e.zoomLevel})).zoomLevel,c=j((function(e){return e.sequencerLength.lengthBars})),a=v();return Object(r.useEffect)((function(){var e=(n-t)/F(174,i);c<e&&(c=e),a(st({value:c}))}),[i,c]),null}var ft=function(){return Object(s.jsxs)("div",{className:"App",children:[Object(s.jsxs)("div",{className:"App__wrapper",children:[Object(s.jsx)(u,{}),Object(s.jsx)(je,{}),Object(s.jsx)(Ae,{})]}),Object(s.jsx)(ct,{}),Object(s.jsxs)("div",{className:"utilities",children:[Object(s.jsx)(Ie,{}),Object(s.jsx)(lt,{})]})]})},dt=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,53)).then((function(t){var n=t.getCLS,r=t.getFID,i=t.getFCP,c=t.getLCP,a=t.getTTFB;n(e),r(e),i(e),c(e),a(e)}))},ht=Object(m.a)({reducer:{waveformStates:_,waveformIds:k,zoomLevel:xe,sequencerLength:ut,scrollPosition:ve,barNumberData:qe}});c.a.render(Object(s.jsx)(h.a,{store:ht,children:Object(s.jsx)(ft,{})}),document.getElementById("root")),dt()}},[[52,1,2]]]);
//# sourceMappingURL=main.25c04290.chunk.js.map