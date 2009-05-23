//  Copyright (c) 2000-2009 ZEDO Inc. All Rights Reserved.
function B2(){
var v1=navigator.userAgent.toLowerCase();var y6=(v1.indexOf('mac')!=-1);var p9=parseInt(navigator.appVersion);
var o6=(!y6&&(v1.indexOf('opera')==-1)&&(v1.indexOf('msie')!=-1)&&(p9>=4)&&(v1.indexOf('webtv')==-1)&&(v1.indexOf('msie 4')==-1));
if(o6){
document.writeln('<scr'+'ipt language=VBS'+'cript>');
document.writeln('on error resume next');
document.writeln('a0=IsObject(CreateObject("ShockwaveFlash.ShockwaveFlash.5"))');
document.writeln('if(a0<=0)then a0=IsObject(CreateObject("ShockwaveFlash.ShockwaveFlash.4"))');
document.writeln('</scr'+'ipt>');
}
else if(navigator.mimeTypes&&
navigator.mimeTypes["application/x-shockwave-flash"]&&
navigator.mimeTypes["application/x-shockwave-flash"].enabledPlugin){
if(navigator.plugins&&navigator.plugins["Shockwave Flash"]){
var y3=navigator.plugins["Shockwave Flash"].description;
if(parseInt(y3.substring(y3.indexOf(".")-1))>=4){
a0=1;
}}}
var i4=navigator.javaEnabled();
p0=1;
if(i4){p0 |=4;}
if(a0){p0 |=8;}
if(o6){
if(document.body){
document.body.style.behavior='url(#default#clientCaps)';
if(document.body.connectionType=='lan'){
p0 |=16;
}}}
return p0;
}
var n0=0;var v0=0;var z0='0';var e0=0;var v4='';var a0=0;var p5='';var e3='';var t4='';var e4="";var i8='';var v8='';
if(typeof zflag_nid!='undefined'){
n0=zflag_nid;
zflag_nid=0;
}
if(typeof zflag_sid!='undefined'){
v0=zflag_sid;
zflag_sid=0;
}
if(typeof zflag_cid!='undefined'){
z0=zflag_cid;
if(z0<0||z0>999999){
z0=0;
}
zflag_cid=0;
}
if(typeof zflag_sz!='undefined'){
e0=zflag_sz;
if(e0<0||e0>95){
e0=0;
}
zflag_sz=0;
}
if(typeof zflag_kw!='undefined'){
zflag_kw=zflag_kw.replace(/&/g,'zzazz');
v4=escape(zflag_kw);
zflag_kw="";
}
if(typeof zflag_geo!='undefined'){
if(!isNaN(zflag_geo)){
e3="&g="+zflag_geo;
zflag_geo=0;
}}
if(typeof zflag_param!='undefined'){
e4="&p="+zflag_param;
zflag_param="";
}
if(typeof zflag_click!='undefined'){
zzTrd=escape(zflag_click);
t4='&l='+zzTrd;
zflag_click="";
}
if(typeof zflag_hasAd!='undefined'){
i8='&y='+zflag_hasAd;
}
if(typeof zflag_num!='undefined'){
v8=zflag_num;
zflag_num=0;
}
var zzStr='';
if(typeof zzCountry=='undefined'){
var zzCountry=255;}
if(typeof zzMetro=='undefined'){
var zzMetro=0;}
if(typeof zzState=='undefined'){
var zzState=0;}var zzSection=v0;var zzD=window.document;var zzRand=(Math.floor(Math.random()* 1000000)% 10000);var zzCustom='';var zzPat='';var zzSkip='';var zzExp='';var zzTrd='';var zzPos=0;
var zzNw=0;var zzCh=0;var zzDm1=0;var zzDm2=0;var zzDm3=0;var zzDm4=0;var zzDm5=0;var zzDm6=0;var zzDm7=0;var zzDm8=0;var zzDm9=0;var zzDm10=0;var zzAGrp=0;var zzAct=new Array();
var zzActVal=new Array();
p5=B2();
if(p5<0||p5>31){
p5=1;
}
c0='<scr'+'ipt language="JavaScript" src="http://d7.zedo.com/bar/v15-101/d3/jsc/fm.js?c='+z0+'&f='+v8+'&n='+n0+'&r='+p5+'&d='+e0+'&q='+v4+'&s='+v0+e3+e4+t4+i8+'&z='+Math.random()+'"></scr'+'ipt>';
document.write(c0);
