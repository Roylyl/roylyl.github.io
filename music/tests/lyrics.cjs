'use strict';
const assert=require('node:assert/strict');
const {parseLrc,currentLyricGroup}=require('../lyric-parser.js');
let result=parseLrc('\uFEFF[offset:+1000]\n[00:01.2]原文\n[00:01.20]译文\n[100:00.00]尾声');
assert.deepEqual(result.groups[0].lines,['原文','译文']);
assert.equal(result.groups[0].time,.2);
assert.equal(result.groups[1].time,5999);
assert.equal(currentLyricGroup(result.groups,.19),-1);
assert.equal(currentLyricGroup(result.groups,.2),0);
assert.equal(currentLyricGroup(result.groups,5999),1);
result=parseLrc('[offset:-1000]\n[00:02.003][00:04.03]正文[旁白]\n[00:06.1]结束');
assert.deepEqual(result.groups.map(g=>g.time),[3.003,5.03,7.1]);
assert.equal(result.groups[0].lines[0],'正文[旁白]');
assert.equal(parseLrc('[offset:0]\n[00:01.0]零偏移').groups[0].time,1);
assert.equal(parseLrc('没有时间的歌词').diagnostic,'plain');
assert.equal(parseLrc(' \uFEFF ').diagnostic,'empty');
assert.equal(parseLrc('[broken]文本').diagnostic,'plain');
assert.equal(parseLrc('[00:01.00]有时间\n纯文本').groups[1].time,null);
assert.equal(parseLrc('[00:00.00]大象 (Elephant) - 李志\n[00:05.00]第一句','大象','李志').groups[0].lines[0],'第一句');
console.log('通过：offset正负与零值、三位分钟、时间精度、多时间标签、同时间组、方括号及无时间轴输入。');

// An unsigned positive offset follows the same convention; whitespace is valid.
assert.equal(parseLrc('[offset:1000]\n[00:04.00]正文').groups[0].time,3);
assert.equal(parseLrc('[offset: -1000 ]\n[00:04.00]正文').groups[0].time,5);
// Do not clamp distinct negative timestamps into an artificial simultaneous group.
result=parseLrc('[offset:+3000]\n[00:01.0]一\n[00:02.0]二');
assert.deepEqual(result.groups.map(g=>g.time),[-2,-1]);
assert.equal(currentLyricGroup(result.groups,0),1);
// Square brackets containing ordinary punctuation are visible text, not ID tags.
assert.equal(parseLrc('[旁白:风声]继续').groups[0].lines[0],'[旁白:风声]继续');
assert.equal(parseLrc('[00:99.00]错误时间仍保留文本').diagnostic,'plain');
assert.equal(parseLrc('[au:作者]\n[tool:工具]\n[00:01]正文').groups.length,1);
assert.equal(parseLrc('[offset:0]\n[1000:00.001]长录音').groups[0].time,60000.001);
console.log('通过：标准LRC偏移方向、负时间不合并、普通方括号正文、元数据标签及异常时间降级。');

result=parseLrc('音乐总监：甲\n管弦乐编写：乙\n管弦乐：丙乐团\nProgram工程操作：丁\nProgram制作：戊\nProgram录音：某录音棚\n混音/母带工作室：某工作室\n[00:12.345]测试正文');
assert.equal(result.metadata.length,7);
assert.equal(result.groups.length,1);
assert.equal(result.groups[0].time,12.345);
console.log('通过：新增职务在署名区展示，不占用歌词时间轴。');
