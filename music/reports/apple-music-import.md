# Apple Music歌单导入结果

来源：Music.app导出的资料库XML。保留两个原歌单的全部条目及导出曲序。“mq”只在网页上改为“我🩷深圳”。

|歌单|总曲目|已匹配音源|待补音源|
|---|---:|---:|---:|
|鹿|233|47|186|
|我🩷深圳|49|27|22|
|我喜欢|163|35|128|

## 核对结果

- 歌单与喜欢列表合计涉及240首独立曲目；已匹配49首。
- 检索了103组艺人/专辑目录，查询地址和结果保存在网站仓库的`music/reports/source-search.json`。
- 来源状态：available=49，purchasable=174，missing=16，streaming-only=1。
- 本轮新增完整音频文件：0。现有可播放曲目连接原音频仓库；购买入口和流媒体入口不表示已经取得MP3。
- 已导出的Apple Music音频下载带有播放保护，未作为网页音源复制。
- “我喜欢”163首，与Music.app显示数量一致；排除已标记喜欢的1支音乐视频。成员完全来自Apple Music，排列采用资料库导出顺序。
- 本次为快照更新，不是实时同步。重新导出XML并运行导入脚本即可更新；没有后台同步服务。
- 两个固定歌单原始曲目数及顺序均保留。未匹配音源仍显示，播放时跳过。
- 全部MP3资源路径沿用仓库相对路径；原始XML含本地路径，仅保存在仓库外。

## 待补曲目

|艺人|曲名|专辑|状态|来源|
|---|---|---|---|---|
|Omnipotent Youth Society|在这颗行星所有的酒馆|万能青年旅店|purchasable|https://music.apple.com/in/album/%E5%9C%A8%E8%BF%99%E9%A2%97%E8%A1%8C%E6%98%9F%E6%89%80%E6%9C%89%E7%9A%84%E9%85%92%E9%A6%86/1538548871?i=1538548892&uo=4|
|Song Dongye|Guo Yuan Chao (2026 Version)|Take Another Moment|purchasable|https://music.apple.com/in/album/guo-yuan-chao-2026-version/6777959168?i=6777959319&uo=4|
|五条人|梦幻丽莎发廊|梦幻丽莎发廊|missing||
|五条人|晚上好 春天小姐|广东姑娘|purchasable|https://badhead1.bandcamp.com/album/canton-girl|
|五条人|广东姑娘|广东姑娘|purchasable|https://badhead1.bandcamp.com/album/canton-girl|
|Paul Wong|某日|黃貫中|purchasable|https://music.apple.com/in/album/%E6%9F%90%E6%97%A5/1443351904?i=1443351978&uo=4|
|Paul Wong|睡火山|黃貫中|purchasable|https://music.apple.com/in/album/%E7%9D%A1%E7%81%AB%E5%B1%B1/1443351904?i=1443351982&uo=4|
|Paul Wong|無得比|黃貫中|purchasable|https://music.apple.com/in/album/%E7%84%A1%E5%BE%97%E6%AF%94/1443351904?i=1443351971&uo=4|
|Bowie Lam, Moses Chan & 黄德斌|年少無知(剧集《天與地》片尾曲)|年少無知(剧集《天與地》片尾曲) - Single|purchasable|https://music.apple.com/in/album/%E5%B9%B4%E5%B0%91%E7%84%A1%E7%9F%A5-%E5%89%A7%E9%9B%86-%E5%A4%A9%E8%88%87%E5%9C%B0-%E7%89%87%E5%B0%BE%E6%9B%B2/1882650650?i=1882650656&uo=4|
|THE DADA|Nan Fang|Huang Jin Shi Dai|purchasable|https://music.apple.com/in/album/nan-fang/369655111?i=369655123&uo=4|
|THE DADA|Song F|Huang Jin Shi Dai|purchasable|https://music.apple.com/in/album/song-f/369655111?i=369655115&uo=4|
|梅卡德尔|迷恋|梅卡德尔|missing||
|何大河|有做无爱 (2020 Live)|日出 (2020Live节选)|purchasable|https://music.apple.com/in/album/%E6%9C%89%E5%81%9A%E6%97%A0%E7%88%B1-2020-live/1577923568?i=1577924320&uo=4|
|Eason Chan|新曲+精選|我的快樂時代|missing||
|Eason Chan|天下無雙|我的快樂時代|missing||
|Eason Chan|我的快樂時代|我的快樂時代|missing||
|Eason Chan|不再讓你孤單 (陳奕迅我的快樂時代現場)|我的快樂時代|purchasable|https://music.apple.com/in/album/%E4%B8%8D%E5%86%8D%E8%AE%93%E4%BD%A0%E5%AD%A4%E5%96%AE-%E9%99%B3%E5%A5%95%E8%BF%85%E6%88%91%E7%9A%84%E5%BF%AB%E6%A8%82%E6%99%82%E4%BB%A3%E7%8F%BE%E5%A0%B4/1575742728?i=1575743810&uo=4|
|Eason Chan|與我常在|與我常在|purchasable|https://music.apple.com/in/album/%E8%88%87%E6%88%91%E5%B8%B8%E5%9C%A8/892735096?i=892735125&uo=4|
|Eason Chan|愛沒有左右|與我常在|purchasable|https://music.apple.com/in/album/%E6%84%9B%E6%B2%92%E6%9C%89%E5%B7%A6%E5%8F%B3/892735096?i=892735127&uo=4|
|Eason Chan|抱擁這分鐘|與我常在|purchasable|https://music.apple.com/in/album/%E6%8A%B1%E6%93%81%E9%80%99%E5%88%86%E9%90%98/892735096?i=892735129&uo=4|
|Eason Chan|完|...3mm|purchasable|https://music.apple.com/in/album/%E5%AE%8C/1445753233?i=1445753767&uo=4|
|Bobby Chen|Don't Leave Me Alone Anymore|Still Crazy After All These Years|purchasable|https://music.apple.com/in/album/dont-leave-me-alone-anymore/151369503?i=151369506&uo=4|
|Omnipotent Youth Society|秦皇岛|万能青年旅店|purchasable|https://music.apple.com/in/album/%E7%A7%A6%E7%9A%87%E5%B2%9B/1538548871?i=1538548884&uo=4|
|Omnipotent Youth Society|山雀|冀西南林路行|purchasable|https://music.apple.com/in/album/%E5%B1%B1%E9%9B%80/1545534900?i=1545535009&uo=4|
|Lo Ta-You|未來的主人翁|未來的主人翁|purchasable|https://music.apple.com/in/album/%E6%9C%AA%E4%BE%86%E7%9A%84%E4%B8%BB%E4%BA%BA%E7%BF%81/1720704718?i=1720705254&uo=4|
|Soundtoy|你的城市|劳动之余|purchasable|https://music.apple.com/in/album/%E4%BD%A0%E7%9A%84%E5%9F%8E%E5%B8%82/1597320706?i=1597320855&uo=4|
|Soundtoy|没有人能够比我们更接近对方|劳动之余|purchasable|https://music.apple.com/in/album/%E6%B2%A1%E6%9C%89%E4%BA%BA%E8%83%BD%E5%A4%9F%E6%AF%94%E6%88%91%E4%BB%AC%E6%9B%B4%E6%8E%A5%E8%BF%91%E5%AF%B9%E6%96%B9/1597320706?i=1597320861&uo=4|
|Huang Ya Li|蝴蝶泉边|崽崽|purchasable|https://music.apple.com/in/album/%E8%9D%B4%E8%9D%B6%E6%B3%89%E8%BE%B9/1631520389?i=1631520390&uo=4|
|刘森|深海|华北浪革|purchasable|https://music.apple.com/in/album/%E6%B7%B1%E6%B5%B7/1861765849?i=1861765851&uo=4|
|刘森|过去来的人|过去来的人 - Single|purchasable|https://music.apple.com/in/album/%E8%BF%87%E5%8E%BB%E6%9D%A5%E7%9A%84%E4%BA%BA/1866332047?i=1866332048&uo=4|
|刘森|夜枕青山|夜枕青山 - Single|purchasable|https://music.apple.com/in/album/%E5%A4%9C%E6%9E%95%E9%9D%92%E5%B1%B1/1864361099?i=1864361102&uo=4|
|Narcissus fighting living Buddha|Get Married|Get Married - Single|purchasable|https://music.apple.com/in/album/get-married/1766191941?i=1766191943&uo=4|
|Prism|One day you'll be by my side|A premeditated first encounter - Single|purchasable|https://music.apple.com/in/album/one-day-youll-be-by-my-side/1761961239?i=1761961240&uo=4|
|Paul Wong|離開我吧|黑白|purchasable|https://music.apple.com/in/album/%E9%9B%A2%E9%96%8B%E6%88%91%E5%90%A7/1443304795?i=1443305245&uo=4|
|Paul Wong|妳懂不懂?|黑白|purchasable|https://music.apple.com/in/album/%E5%A6%B3%E6%87%82%E4%B8%8D%E6%87%82/1443304795?i=1443305260&uo=4|
|Paul Wong|初哥|黑白|purchasable|https://music.apple.com/in/album/%E5%88%9D%E5%93%A5/1443304795?i=1443305004&uo=4|
|Paul Wong|憂書|黑白|purchasable|https://music.apple.com/in/album/%E6%86%82%E6%9B%B8/1443304795?i=1443305251&uo=4|
|Beyond|Eighteen|Good Time|missing||
|Beyond|Ridiculous|Good Time|missing||
|Beyond|Sunday|Until You Are Here|purchasable|https://music.apple.com/in/album/sunday/821468934?i=821468952&uo=4|
|Beyond|Devotion|Until You Are Here|purchasable|https://music.apple.com/in/album/devotion/821468934?i=821468966&uo=4|
|Beyond|Homecoming|Surprise|purchasable|https://music.apple.com/in/album/homecoming/164785800?i=164785816&uo=4|
|Beyond|Mist|Surprise|purchasable|https://music.apple.com/in/album/mist/164785800?i=164786350&uo=4|
|Beyond|I Remember|Surprise|missing||
|Beyond|Tsing Ma Bridge|Surprise|purchasable|https://music.apple.com/in/album/tsing-ma-bridge/164785800?i=164789173&uo=4|
|Beyond|An Immortal Tale|Surprise|purchasable|https://music.apple.com/in/album/an-immortal-tale/164785800?i=164790137&uo=4|
|Beyond|想你|HERE & THERE|purchasable|https://music.apple.com/in/album/%E6%83%B3%E4%BD%A0/1855462168?i=1855462171&uo=4|
|Beyond|舊曆 (Instrumental Version)|請將手放開|purchasable|https://music.apple.com/in/album/%E8%88%8A%E6%9B%86-instrumental-version/1070689266?i=1070689460&uo=4|
|Beyond|我的知己|請將手放開|purchasable|https://music.apple.com/in/album/%E6%88%91%E7%9A%84%E7%9F%A5%E5%B7%B1/1070689266?i=1070689458&uo=4|
|Beyond|我的知己在街頭 (Instrumental Version)|請將手放開|purchasable|https://music.apple.com/in/album/%E6%88%91%E7%9A%84%E7%9F%A5%E5%B7%B1%E5%9C%A8%E8%A1%97%E9%A0%AD-instrumental-version/1070689266?i=1070689457&uo=4|
|Beyond|麻醉|請將手放開|purchasable|https://music.apple.com/in/album/%E9%BA%BB%E9%86%89/1070689266?i=1070689455&uo=4|
|Beyond|誰命我名字|請將手放開|purchasable|https://music.apple.com/in/album/%E8%AA%B0%E5%91%BD%E6%88%91%E5%90%8D%E5%AD%97/1070689266?i=1070689453&uo=4|
|Beyond|回響|請將手放開|purchasable|https://music.apple.com/in/album/%E5%9B%9E%E9%9F%BF/1070689266?i=1070689452&uo=4|
|Beyond|預備|請將手放開|purchasable|https://music.apple.com/in/album/%E9%A0%90%E5%82%99/1070689266?i=1070689270&uo=4|
|Beyond|抗戰二十年 (Live)|Live Must Go On Series : Beyond 超越 Beyond Live 03 - Since 1983 (Live)|purchasable|https://music.apple.com/in/album/%E6%8A%97%E6%88%B0%E4%BA%8C%E5%8D%81%E5%B9%B4-live/1792344993?i=1792345286&uo=4|
|Eason Chan|遙遠的她 (Live)|Eason & Friends 903 ID Club 拉闊音樂會|purchasable|https://music.apple.com/in/album/%E9%81%99%E9%81%A0%E7%9A%84%E5%A5%B9-live/892458133?i=892458218&uo=4|
|Jacky Cheung|遙遠的她|Amour / 遙遠的她|purchasable|https://music.apple.com/in/album/%E9%81%99%E9%81%A0%E7%9A%84%E5%A5%B9/1443314619?i=1443314728&uo=4|
|Joanna Wang|親密愛人|The Things We Do for Love|purchasable|https://music.apple.com/in/album/%E8%A6%AA%E5%AF%86%E6%84%9B%E4%BA%BA/461736079?i=461736107&uo=4|
|Joanna Wang|迷宮|Start from Here|missing||
|Joanna Wang|有你的快樂|Start from Here|missing||
|Joanna Wang|因為你愛我|Start from Here|missing||
|Lo Ta-You & Ram Chiang|皇后大道東|蔣志光與他的朋友|purchasable|https://music.apple.com/in/album/%E7%9A%87%E5%90%8E%E5%A4%A7%E9%81%93%E6%9D%B1/1466039258?i=1466039271&uo=4|
|Reflector|釋你|釋你 - EP|purchasable|https://music.apple.com/in/album/%E9%87%8B%E4%BD%A0/1859587377?i=1859587383&uo=4|
|Tianxiao Xie|The Best it Can Be|Laugh out Loud|purchasable|https://music.apple.com/in/album/the-best-it-can-be/1563668455?i=1563668460&uo=4|
|Tianxiao Xie|向陽花|謝天笑 X.T.X|purchasable|https://music.apple.com/in/album/%E5%90%91%E9%99%BD%E8%8A%B1/1613715067?i=1613715074&uo=4|
|d4vd|Here With Me|Here With Me - Single|missing||
|wachi|河流|wachi 2020-2021|missing||
|Young Dan|Flower|Flower - Single|purchasable|https://music.apple.com/in/album/flower/1718158528?i=1718158529&uo=4|
|Leslie Cheung|春夏秋冬|陪你倒數|purchasable|https://music.apple.com/in/album/%E6%98%A5%E5%A4%8F%E7%A7%8B%E5%86%AC/1442991229?i=1442991241&uo=4|
|David Tao|Season of Loneliness|Ultrasound|purchasable|https://music.apple.com/in/album/season-of-loneliness/1372031877?i=1372032069&uo=4|
|Eason Chan|歲月如歌|Live for Today|purchasable|https://music.apple.com/in/album/%E6%AD%B2%E6%9C%88%E5%A6%82%E6%AD%8C/542676848?i=542677437&uo=4|
|Eason Chan|Bitter Gourd|Stranger Under My Skin|purchasable|https://music.apple.com/in/album/bitter-gourd/1443711302?i=1443711694&uo=4|
|Eason Chan|不要說話|Don't Want to Let Go|purchasable|https://music.apple.com/in/album/%E4%B8%8D%E8%A6%81%E8%AA%AA%E8%A9%B1/1443493887?i=1443494467&uo=4|
|Eason Chan|人來人往|2013 陳奕迅 Music Life 精選|purchasable|https://music.apple.com/in/album/%E4%BA%BA%E4%BE%86%E4%BA%BA%E5%BE%80/667921627?i=667921842&uo=4|
|Eason Chan|幸福摩天輪|幸福|purchasable|https://music.apple.com/in/album/%E5%B9%B8%E7%A6%8F%E6%91%A9%E5%A4%A9%E8%BC%AA/892514705?i=892514706&uo=4|
|Eason Chan|綿綿|Eason Chan (Cantonese Collection)|purchasable|https://music.apple.com/in/album/%E7%B6%BF%E7%B6%BF/651449675?i=651449688&uo=4|
|Eason Chan|打回原形|2013 陳奕迅 Music Life 精選|purchasable|https://music.apple.com/in/album/%E6%89%93%E5%9B%9E%E5%8E%9F%E5%BD%A2/667921627?i=667921835&uo=4|
|Eason Chan & eason and the duo band|我們萬歲|L.O.V.E.|purchasable|https://music.apple.com/in/album/%E6%88%91%E5%80%91%E8%90%AC%E6%AD%B2/1441543918?i=1441544204&uo=4|
|Eason Chan|Katrina|Live for Today|purchasable|https://music.apple.com/in/album/katrina/542676848?i=542677236&uo=4|
|Eason Chan|猜情尋|Eason Chan (Cantonese Collection)|purchasable|https://music.apple.com/in/album/%E7%8C%9C%E6%83%85%E5%B0%8B/651449675?i=651449913&uo=4|
|Eason Chan|信心花舍|Shall We Dance? Shall We Talk!|purchasable|https://music.apple.com/in/album/%E4%BF%A1%E5%BF%83%E8%8A%B1%E8%88%8D/542593700?i=542593735&uo=4|
|Eason Chan|黃金時代|我的快樂時代|missing||
|Eason Chan|約定 (Live)|陳奕迅2010 Duo演唱會|purchasable|https://music.apple.com/in/album/%E7%B4%84%E5%AE%9A-live/1442966677?i=1442967094&uo=4|
|Eason Chan|反高潮|我的快樂時代|missing||
|Eason Chan|寂寞夜晚 (Live)|陳奕迅2010 Duo演唱會|purchasable|https://music.apple.com/in/album/%E5%AF%82%E5%AF%9E%E5%A4%9C%E6%99%9A-live/1442966677?i=1442967095&uo=4|
|Eason Chan & eason and the duo band|瘋狂的朋友|L.O.V.E.|purchasable|https://music.apple.com/in/album/%E7%98%8B%E7%8B%82%E7%9A%84%E6%9C%8B%E5%8F%8B/1441543918?i=1441543928&uo=4|
|Eason Chan & eason and the duo band|龍舌蘭|L.O.V.E.|purchasable|https://music.apple.com/in/album/%E9%BE%8D%E8%88%8C%E8%98%AD/1441543918?i=1441544203&uo=4|
|Eason Chan & eason and the duo band|與你常在|L.O.V.E.|purchasable|https://music.apple.com/in/album/%E8%88%87%E4%BD%A0%E5%B8%B8%E5%9C%A8/1441543918?i=1441544206&uo=4|
|Eason Chan|Unconditional|Getting Ready|purchasable|https://music.apple.com/in/album/unconditional/1422674966?i=1422674971&uo=4|
|Eason Chan|內疚|?|purchasable|https://music.apple.com/in/album/%E5%85%A7%E7%96%9A/1443783500?i=1443783991&uo=4|
|Eason Chan|陀飛輪|Time Flies|missing||
|Eason Chan|今天只做一件事|H3M (Remastered 2019)|purchasable|https://music.apple.com/in/album/%E4%BB%8A%E5%A4%A9%E5%8F%AA%E5%81%9A%E4%B8%80%E4%BB%B6%E4%BA%8B/1490822198?i=1490822204&uo=4|
|Eason Chan|七百年後|H3M (Remastered 2019)|purchasable|https://music.apple.com/in/album/%E4%B8%83%E7%99%BE%E5%B9%B4%E5%BE%8C/1490822198?i=1490822208&uo=4|
|Eason Chan|太陽照常升起|H3M (Remastered 2019)|purchasable|https://music.apple.com/in/album/%E5%A4%AA%E9%99%BD%E7%85%A7%E5%B8%B8%E5%8D%87%E8%B5%B7/1490822198?i=1490822211&uo=4|
|Eason Chan|多少|上五樓的快活|purchasable|https://music.apple.com/in/album/%E5%A4%9A%E5%B0%91/1442260565?i=1442260925&uo=4|
|Eason Chan|心的距離|上五樓的快活|purchasable|https://music.apple.com/in/album/%E5%BF%83%E7%9A%84%E8%B7%9D%E9%9B%A2/1442260565?i=1442261385&uo=4|
|Eason Chan|淘汰|認了吧 (台灣版)|purchasable|https://music.apple.com/in/album/%E6%B7%98%E6%B1%B0/1443352354?i=1443352455&uo=4|
|Eason Chan|煙味|認了吧 (台灣版)|purchasable|https://music.apple.com/in/album/%E7%85%99%E5%91%B3/1443352354?i=1443352452&uo=4|
|Eason Chan|好久不見|認了吧 (台灣版)|purchasable|https://music.apple.com/in/album/%E5%A5%BD%E4%B9%85%E4%B8%8D%E8%A6%8B/1443352354?i=1443352467&uo=4|
|Eason Chan|最佳損友|Life Continues|purchasable|https://music.apple.com/in/album/%E6%9C%80%E4%BD%B3%E6%90%8D%E5%8F%8B/1442912707?i=1442913348&uo=4|
|Eason Chan|阿牛|U 87|purchasable|https://music.apple.com/in/album/%E9%98%BF%E7%89%9B/1443374875?i=1443375157&uo=4|
|Eason Chan|夕陽無限好|U 87|purchasable|https://music.apple.com/in/album/%E5%A4%95%E9%99%BD%E7%84%A1%E9%99%90%E5%A5%BD/1443374875?i=1443375265&uo=4|
|Eason Chan|葡萄成熟時|U 87|purchasable|https://music.apple.com/in/album/%E8%91%A1%E8%90%84%E6%88%90%E7%86%9F%E6%99%82/1443374875?i=1443375474&uo=4|
|Eason Chan|十面埋伏|Live for Today|purchasable|https://music.apple.com/in/album/%E5%8D%81%E9%9D%A2%E5%9F%8B%E4%BC%8F/542676848?i=542677237&uo=4|
|Eason Chan|猜情尋|Live for Today|purchasable|https://music.apple.com/in/album/%E7%8C%9C%E6%83%85%E5%B0%8B/542676848?i=542677432&uo=4|
|Eason Chan|大開眼戒|The Easy Ride|purchasable|https://music.apple.com/in/album/%E5%A4%A7%E9%96%8B%E7%9C%BC%E6%88%92/542634698?i=542634703&uo=4|
|Eason Chan|不知所謂|The Easy Ride|purchasable|https://music.apple.com/in/album/%E4%B8%8D%E7%9F%A5%E6%89%80%E8%AC%82/542634698?i=542634730&uo=4|
|Eason Chan|全世界失眠|反正是我 (國)|purchasable|https://music.apple.com/in/album/%E5%85%A8%E4%B8%96%E7%95%8C%E5%A4%B1%E7%9C%A0/542592136?i=542592490&uo=4|
|Eason Chan|Shall We Talk|Shall We Dance? Shall We Talk!|purchasable|https://music.apple.com/in/album/shall-we-talk/542593700?i=542593703&uo=4|
|Eason Chan|單車|Shall We Dance? Shall We Talk!|purchasable|https://music.apple.com/in/album/%E5%96%AE%E8%BB%8A/542593700?i=542593707&uo=4|
|Eason Chan|綿綿|打得火熱|purchasable|https://music.apple.com/in/album/%E7%B6%BF%E7%B6%BF/542594340?i=542594352&uo=4|
|Eason Chan|時光倒流二十年|幸福|purchasable|https://music.apple.com/in/album/%E6%99%82%E5%85%89%E5%80%92%E6%B5%81%E4%BA%8C%E5%8D%81%E5%B9%B4/892514705?i=892514708&uo=4|
|Eason Chan|婚禮的祝福|婚禮的祝福|purchasable|https://music.apple.com/in/album/%E5%A9%9A%E7%A6%AE%E7%9A%84%E7%A5%9D%E7%A6%8F/1694525826?i=1694526046&uo=4|
|Eason Chan|生命有幾好|與我常在|purchasable|https://music.apple.com/in/album/%E7%94%9F%E5%91%BD%E6%9C%89%E5%B9%BE%E5%A5%BD/892735096?i=892735128&uo=4|
|Eason Chan|當心中有戀愛感覺|時代曲 (華星40 復刻系列)|purchasable|https://music.apple.com/in/album/%E7%95%B6%E5%BF%83%E4%B8%AD%E6%9C%89%E6%88%80%E6%84%9B%E6%84%9F%E8%A6%BA/892852443?i=892852455&uo=4|
|Miriam Yeung|少女的祈禱|Play It Loud Kiss Me Soft|purchasable|https://music.apple.com/in/album/%E5%B0%91%E5%A5%B3%E7%9A%84%E7%A5%88%E7%A6%B1/892604183?i=892604185&uo=4|
|Miriam Yeung|野孩子|千嬅盛放|purchasable|https://music.apple.com/in/album/%E9%87%8E%E5%AD%A9%E5%AD%90/1442767266?i=1442767636&uo=4|
|Li Ronghao|Model|Model|purchasable|https://music.apple.com/in/album/model/1743353783?i=1743353794&uo=4|
|Li Ronghao|Two of Us|Model|purchasable|https://music.apple.com/in/album/two-of-us/1743353783?i=1743353798&uo=4|
|Li Ronghao|Frankly|Model|purchasable|https://music.apple.com/in/album/frankly/1743353783?i=1743353800&uo=4|
|Li Ronghao|Old Married Couple|Model|purchasable|https://music.apple.com/in/album/old-married-couple/1743353783?i=1743353807&uo=4|
|Li Ronghao|Both the Same|Model|purchasable|https://music.apple.com/in/album/both-the-same/1743353783?i=1743353961&uo=4|
|Li Ronghao|Blue & Green|Model|purchasable|https://music.apple.com/in/album/blue-green/1743353783?i=1743353965&uo=4|
|Li Ronghao|喜劇之王|李榮浩|purchasable|https://music.apple.com/in/album/%E5%96%9C%E5%8A%87%E4%B9%8B%E7%8E%8B/935650862?i=935654980&uo=4|
|Li Ronghao|落俗|李榮浩|purchasable|https://music.apple.com/in/album/%E8%90%BD%E4%BF%97/935650862?i=935654982&uo=4|
|Li Ronghao|不搭|李榮浩|purchasable|https://music.apple.com/in/album/%E4%B8%8D%E6%90%AD/935650862?i=935654984&uo=4|
|Li Ronghao|自拍|李榮浩|purchasable|https://music.apple.com/in/album/%E8%87%AA%E6%8B%8D/935650862?i=935654985&uo=4|
|Li Ronghao|哎呀|李榮浩|purchasable|https://music.apple.com/in/album/%E5%93%8E%E5%91%80/935650862?i=935654986&uo=4|
|Li Ronghao|天生|李榮浩|purchasable|https://music.apple.com/in/album/%E5%A4%A9%E7%94%9F/935650862?i=935654989&uo=4|
|Li Ronghao|二三十|李榮浩|purchasable|https://music.apple.com/in/album/%E4%BA%8C%E4%B8%89%E5%8D%81/935650862?i=935654990&uo=4|
|Li Ronghao|Popular Songs|An Ideal|purchasable|https://music.apple.com/in/album/popular-songs/1072339647?i=1072339994&uo=4|
|Li Ronghao|Full House|An Ideal|purchasable|https://music.apple.com/in/album/full-house/1072339647?i=1072339991&uo=4|
|Li Ronghao|Wild Animals|An Ideal|purchasable|https://music.apple.com/in/album/wild-animals/1072339647?i=1072339990&uo=4|
|Li Ronghao|Can't Bear It (Ending Credit Theme Song of ''You Are My Sunshine'')|An Ideal|purchasable|https://music.apple.com/in/album/cant-bear-it-ending-credit-theme-song-of-you-are-my-sunshine/1072339647?i=1072339996&uo=4|
|Li Ronghao|When I Look At You|En|purchasable|https://music.apple.com/in/album/when-i-look-at-you/1308479642?i=1308479647&uo=4|
|Li Ronghao|Quit Smoking|En|purchasable|https://music.apple.com/in/album/quit-smoking/1308479642?i=1308479650&uo=4|
|Li Ronghao|Tacit (The Theme Song of "I Belonged to You")|En|purchasable|https://music.apple.com/in/album/tacit-the-theme-song-of-i-belonged-to-you/1308479642?i=1308481272&uo=4|
|Li Ronghao|If I Were Young|Ear|purchasable|https://music.apple.com/in/album/if-i-were-young/1438536431?i=1438536444&uo=4|
|Li Ronghao|The Weight of Life (The Theme Song of ''Animal World'' )|Ear|purchasable|https://music.apple.com/in/album/the-weight-of-life-the-theme-song-of-animal-world/1438536431?i=1438536445&uo=4|
|Li Ronghao|In the Mood For Love|Sparrow|purchasable|https://music.apple.com/in/album/in-the-mood-for-love/1828890886?i=1828890969&uo=4|
|Li Ronghao|Together|Sparrow|purchasable|https://music.apple.com/in/album/together/1828890886?i=1828890971&uo=4|
|Li Ronghao|We suppose to relish it|Free Soul|purchasable|https://music.apple.com/in/album/we-suppose-to-relish-it/1655820982?i=1655820989&uo=4|
|Li Ronghao|Lover|Free Soul|purchasable|https://music.apple.com/in/album/lover/1655820982?i=1655821000&uo=4|
|Li Ronghao|Equivalence Relation (feat. aMEI)|Free Soul|purchasable|https://music.apple.com/in/album/equivalence-relation-feat-amei/1655820982?i=1655821308&uo=4|
|Li Ronghao|The Other Side|The Dark Horse|purchasable|https://music.apple.com/in/album/the-other-side/1773340386?i=1773340389&uo=4|
|Joker Xue|苏黎世的从前|你过得好吗|purchasable|https://music.apple.com/in/album/%E8%8B%8F%E9%BB%8E%E4%B8%96%E7%9A%84%E4%BB%8E%E5%89%8D/1789061268?i=1789061539&uo=4|
|Joker Xue|几个你|几个薛之谦|purchasable|https://music.apple.com/in/album/%E5%87%A0%E4%B8%AA%E4%BD%A0/1789061342?i=1789061348&uo=4|
|Joker Xue|我想起你了|意外|purchasable|https://music.apple.com/in/album/%E6%88%91%E6%83%B3%E8%B5%B7%E4%BD%A0%E4%BA%86/1788255148?i=1788255155&uo=4|
|Joker Xue|Stay Here|初学者|purchasable|https://music.apple.com/in/album/stay-here/1787929894?i=1787930571&uo=4|
|Joker Xue|小孩|初学者|purchasable|https://music.apple.com/in/album/%E5%B0%8F%E5%AD%A9/1787929894?i=1787930263&uo=4|
|Joker Xue|一半|初学者|purchasable|https://music.apple.com/in/album/%E4%B8%80%E5%8D%8A/1787929894?i=1787930257&uo=4|
|Joker Xue|下雨了|初学者|purchasable|https://music.apple.com/in/album/%E4%B8%8B%E9%9B%A8%E4%BA%86/1787929894?i=1787930588&uo=4|
|Joker Xue|别|渡 The Crossing|purchasable|https://music.apple.com/in/album/%E5%88%AB/1787509715?i=1787509724&uo=4|
|Joker Xue|摩天大楼|怪咖|purchasable|https://music.apple.com/in/album/%E6%91%A9%E5%A4%A9%E5%A4%A7%E6%A5%BC/1787448185?i=1787448186&uo=4|
|Joker Xue|最好|怪咖|purchasable|https://music.apple.com/in/album/%E6%9C%80%E5%A5%BD/1787448185?i=1787448411&uo=4|
|Joker Xue|那是你离开了北京的生活|怪咖|purchasable|https://music.apple.com/in/album/%E9%82%A3%E6%98%AF%E4%BD%A0%E7%A6%BB%E5%BC%80%E4%BA%86%E5%8C%97%E4%BA%AC%E7%9A%84%E7%94%9F%E6%B4%BB/1787448185?i=1787448424&uo=4|
|Joker Xue|违背的青春|怪咖|purchasable|https://music.apple.com/in/album/%E8%BF%9D%E8%83%8C%E7%9A%84%E9%9D%92%E6%98%A5/1787448185?i=1787448425&uo=4|
|Joker Xue|木偶人|尘|purchasable|https://music.apple.com/in/album/%E6%9C%A8%E5%81%B6%E4%BA%BA/1787447756?i=1787447771&uo=4|
|Joker Xue|笑场|尘|purchasable|https://music.apple.com/in/album/%E7%AC%91%E5%9C%BA/1787447756?i=1787447851&uo=4|
|Joker Xue|病态|尘|purchasable|https://music.apple.com/in/album/%E7%97%85%E6%80%81/1787447756?i=1787447853&uo=4|
|Joker Xue|尘|尘|purchasable|https://music.apple.com/in/album/%E5%B0%98/1787447756?i=1787447862&uo=4|
|Joker Xue|陪你去流浪|尘|purchasable|https://music.apple.com/in/album/%E9%99%AA%E4%BD%A0%E5%8E%BB%E6%B5%81%E6%B5%AA/1787447756?i=1787447868&uo=4|
|Sara Liu & Joker Xue|聊表心意|尘|purchasable|https://music.apple.com/in/album/%E8%81%8A%E8%A1%A8%E5%BF%83%E6%84%8F/1787447756?i=1787447980&uo=4|
|Joker Xue|这么久没见|尘|purchasable|https://music.apple.com/in/album/%E8%BF%99%E4%B9%88%E4%B9%85%E6%B2%A1%E8%A7%81/1787447756?i=1787447850&uo=4|
|Joker Xue|把你揉碎捏成苹果|天外来物|purchasable|https://music.apple.com/in/album/%E6%8A%8A%E4%BD%A0%E6%8F%89%E7%A2%8E%E6%8D%8F%E6%88%90%E8%8B%B9%E6%9E%9C/1787447447?i=1787447720&uo=4|
|Joker Xue|迟迟|天外来物|purchasable|https://music.apple.com/in/album/%E8%BF%9F%E8%BF%9F/1787447447?i=1787447719&uo=4|
|Joker Xue|彩券|天外来物|purchasable|https://music.apple.com/in/album/%E5%BD%A9%E5%88%B8/1787447447?i=1787447722&uo=4|
|JJ Lin|Roll On (電影《破風》主題曲)|From M.E. To Myself|purchasable|https://music.apple.com/in/album/roll-on-%E9%9B%BB%E5%BD%B1-%E7%A0%B4%E9%A2%A8-%E4%B8%BB%E9%A1%8C%E6%9B%B2/1871400633?i=1871400838&uo=4|
|Jackson Wang & JJ Lin|Should've Let Go|Should've Let Go - Single|purchasable|https://music.apple.com/in/album/shouldve-let-go/1544425146?i=1544425149&uo=4|
|JJ Lin|So Be It|Drifter - EP|purchasable|https://music.apple.com/in/album/so-be-it/1535791945?i=1535791952&uo=4|
|JJ Lin|No Filter (feat. Hiroshi Fujiwara)|No Filter (feat. Hiroshi Fujiwara) - Single|purchasable|https://music.apple.com/in/album/no-filter-feat-hiroshi-fujiwara/1668772093?i=1668772095&uo=4|
|JJ Lin|The Story of Us|The Story of Us - Single|purchasable|https://music.apple.com/in/album/the-story-of-us/1664063656?i=1664063686&uo=4|
|JJ Lin|Wonderland|Wonderland - Single|purchasable|https://music.apple.com/in/album/wonderland/1664062631?i=1664062727&uo=4|
|JJ Lin|The Right Time|The Right Time - Single|purchasable|https://music.apple.com/in/album/the-right-time/1664064677?i=1664064680&uo=4|
|Song Dongye|Speak With Me|Take Another Moment|purchasable|https://music.apple.com/in/album/speak-with-me/6777959168?i=6777959172&uo=4|
|Song Dongye|Take Another Moment|Take Another Moment|purchasable|https://music.apple.com/in/album/take-another-moment/6777959168?i=6777959322&uo=4|
|鲍家街43号|晚安,北京|摇滚北京 3|purchasable|https://music.apple.com/in/album/%E6%99%9A%E5%AE%89-%E5%8C%97%E4%BA%AC/1889799703?i=1889800006&uo=4|
|Sir Deer|Chunfeng Shili|All the Wine, Not as You|purchasable|https://music.apple.com/in/album/chunfeng-shili/1444739299?i=1444739309&uo=4|
|Lo Ta-You|Literary Jarogons (feat. Li Zhi) [Live]|The Next Big Thing: Tayu Lo (2017 Version)|purchasable|https://music.apple.com/in/album/literary-jarogons-feat-li-zhi-live/1599239228?i=1599239235&uo=4|
|Vae Xu|九月清晨|尋寶遊戲|purchasable|https://music.apple.com/in/album/%E4%B9%9D%E6%9C%88%E6%B8%85%E6%99%A8/1410129609?i=1410130710&uo=4|
|贰佰|的青春|嘿,抬头!|purchasable|https://music.apple.com/in/album/%E7%9A%84%E9%9D%92%E6%98%A5/1808450002?i=1808450184&uo=4|
|Sound Fragment|送流水|没有鸟鸣,关上窗吧|purchasable|https://music.apple.com/in/album/%E9%80%81%E6%B5%81%E6%B0%B4/1808449937?i=1808450132&uo=4|
|赞诗|赞美诗|跳金水 - EP|streaming-only|https://music.apple.com/us/album/1817376115|
|Jonathan Lee|山丘|山丘 - Single|purchasable|https://music.apple.com/in/album/%E5%B1%B1%E4%B8%98/1087283784?i=1087283788&uo=4|
|島嶼心情|玩具|纷纭|purchasable|https://music.apple.com/in/album/%E7%8E%A9%E5%85%B7/1840555146?i=1840555159&uo=4|
|Escape Plan|海鸥|回到海洋|purchasable|https://music.apple.com/in/album/%E6%B5%B7%E9%B8%A5/1858515737?i=1858515742&uo=4|
|Deserts Chang|關於我愛你|A City|purchasable|https://music.apple.com/in/album/%E9%97%9C%E6%96%BC%E6%88%91%E6%84%9B%E4%BD%A0/317557859?i=317557860&uo=4|
|Deserts Chang|城市|A City|purchasable|https://music.apple.com/in/album/%E5%9F%8E%E5%B8%82/317557859?i=317557867&uo=4|
|Miriam Yeung|飛女正傳|千嬅盛放|purchasable|https://music.apple.com/in/album/%E9%A3%9B%E5%A5%B3%E6%AD%A3%E5%82%B3/1442767266?i=1442768327&uo=4|
|Huang Pinyuan|留下來陪你生活|面對品源|purchasable|https://music.apple.com/in/album/%E7%95%99%E4%B8%8B%E4%BE%86%E9%99%AA%E4%BD%A0%E7%94%9F%E6%B4%BB/153430234?i=153430874&uo=4|
|anpu|a flash and how it lasts|9522|purchasable|https://music.apple.com/in/album/a-flash-and-how-it-lasts/1643653309?i=1643653875&uo=4|
