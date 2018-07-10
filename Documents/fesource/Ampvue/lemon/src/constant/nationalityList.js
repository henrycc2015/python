let part1 = [{'name':'阿富汗','value':'004'},{'name':'阿尔巴尼亚','value':'008'},{'name':'南极洲','value':'010'},{'name':'阿尔及利亚','value':'012'},{'name':'美属萨摩亚','value':'016'},{'name':'安道尔','value':'020'},{'name':'安哥拉','value':'024'},{'name':'安提瓜和巴布拉','value':'028'},{'name':'阿塞拜疆共和国','value':'031'},{'name':'阿根廷','value':'032'},{'name':'澳大利亚','value':'036'},{'name':'奥地利','value':'040'},{'name':'巴哈马','value':'044'},{'name':'巴林','value':'048'},{'name':'孟加拉国','value':'050'},{'name':'亚美尼亚共和国','value':'051'},{'name':'巴巴多斯','value':'052'},{'name':'比利时','value':'056'},{'name':'百慕大','value':'060'},{'name':'布丹','value':'064'},{'name':'玻利维亚','value':'068'},{'name':'波斯尼亚和黑塞哥维那共和国','value':'070'},{'name':'博茨瓦纳','value':'072'},{'name':'布维岛','value':'074'},{'name':'巴西','value':'076'},{'name':'伯利兹','value':'084'},{'name':'英属印度洋领土','value':'086'},{'name':'所罗门群岛','value':'090'},{'name':'英属维尔克群岛','value':'092'},{'name':'文莱','value':'096'},{'name':'保加利亚','value':'100'},{'name':'缅甸','value':'104'},{'name':'布隆迪','value':'108'},{'name':'白俄罗斯','value':'112'},{'name':'柬埔寨','value':'116'},{'name':'喀麦隆','value':'120'},{'name':'加拿大','value':'124'},{'name':'佛得角','value':'132'},{'name':'开曼群岛','value':'136'},{'name':'中非','value':'140'},{'name':'斯里兰卡','value':'144'},{'name':'乍得','value':'148'},{'name':'智利','value':'152'}];
let part2 = [{'name':'中国','value':'156'},{'name':'中国台湾','value':'158'}];
let part3 = [{'name':'圣诞岛','value':'162'},{'name':'可可(基林)群岛','value':'166'},{'name':'哥伦比亚','value':'170'},{'name':'科摩罗','value':'174'},{'name':'刚果','value':'178'},{'name':'扎伊尔','value':'180'},{'name':'库克群岛','value':'184'},{'name':'哥斯达黎加','value':'188'},{'name':'克罗地亚共和国','value':'191'},{'name':'古巴','value':'192'},{'name':'塞蒲路斯','value':'196'},{'name':'多米尼克联邦','value':'202'},{'name':'捷克共和国','value':'203'},{'name':'贝宁 ','value':'204'},{'name':'丹麦','value':'208'},{'name':'多米尼加共和国','value':'214'},{'name':'厄瓜多尔','value':'218'},{'name':'萨尔瓦多','value':'222'},{'name':'赤道几内亚','value':'226'},{'name':'埃塞俄比亚','value':'231'},{'name':'厄立特里亚国','value':'232'},{'name':'爱沙尼亚共和国','value':'233'},{'name':'法罗群岛','value':'234'},{'name':'马尔维纳斯群岛','value':'238'},{'name':'斐济','value':'242'},{'name':'芬兰','value':'246'},{'name':'法国','value':'250'},{'name':'法属圭亚那','value':'254'},{'name':'法属波利尼西亚','value':'258'},{'name':'法属南部领土','value':'260'},{'name':'吉布提共和国','value':'262'},{'name':'加篷','value':'266'},{'name':'格鲁吉亚','value':'268'},{'name':'冈比亚','value':'270'},{'name':'德国','value':'276'},{'name':'加纳','value':'288'},{'name':'直布罗陀','value':'292'},{'name':'基里巴斯','value':'296'},{'name':'希腊','value':'300'},{'name':'格陵兰','value':'304'},{'name':'格林纳达','value':'308'},{'name':'瓜德罗普','value':'312'},{'name':'关岛','value':'316'},{'name':'危地马拉','value':'320'},{'name':'几内亚','value':'324'},{'name':'圭亚那','value':'328'},{'name':'海地','value':'332'},{'name':'赫德岛和麦克唐纳岛','value':'334'},{'name':'梵帝冈','value':'336'},{'name':'洪都拉斯','value':'340'}]
let part4 = [{'name':'香港','value':'344'}];
let part5 = [{'name':'匈牙利','value':'348'},{'name':'冰岛','value':'352'},{'name':'印度','value':'356'},{'name':'印度尼西亚','value':'360'},{'name':'伊朗','value':'364'},{'name':'伊拉克','value':'368'},{'name':'爱尔兰','value':'372'},{'name':'巴勒斯坦 ','value':'374'},{'name':'以色列','value':'376'},{'name':'意大利','value':'380'},{'name':'科特迪瓦','value':'384'},{'name':'牙买加','value':'388'},{'name':'日本','value':'392'},{'name':'哈萨克斯坦共和国','value':'398'},{'name':'约旦','value':'400'},{'name':'肯尼亚','value':'404'},{'name':'朝鲜','value':'408'},{'name':'韩国','value':'410'},{'name':'科威特','value':'414'},{'name':'吉尔吉斯共和国','value':'417'},{'name':'老挝','value':'418'},{'name':'卢森堡','value':'422'},{'name':'莱索托','value':'426'},{'name':'拉脱维亚共和国','value':'428'},{'name':'利比里亚','value':'430'},{'name':'利比亚','value':'434'},{'name':'列支敦土登','value':'438'},{'name':'立陶宛共和国','value':'440'},{'name':'黎巴嫩','value':'442'}]
let part6 = [{'name':'澳门','value':'446'}];
let part7 = [{'name':'马达加斯加','value':'450'},{'name':'马拉维','value':'454'},{'name':'马来西亚','value':'458'},{'name':'马尔代夫','value':'462'},{'name':'马里','value':'466'},{'name':'马耳他','value':'470'},{'name':'马提尼克','value':'474'},{'name':'毛里塔尼亞','value':'478'},{'name':'马里求斯','value':'480'},{'name':'墨西哥','value':'484'},{'name':'摩纳哥','value':'492'},{'name':'蒙古','value':'496'},{'name':'摩尔多瓦共和国','value':'498'},{'name':'蒙特塞拉特','value':'500'},{'name':'摩洛哥','value':'504'},{'name':'莫桑比克','value':'508'},{'name':'阿曼','value':'512'},{'name':'纳米比亚','value':'516'},{'name':'瑙鲁','value':'520'},{'name':'尼伯尔','value':'524'},{'name':'荷兰','value':'528'},{'name':'荷属安的列斯','value':'530'},{'name':'阿鲁巴','value':'533'},{'name':'新喀里多尼亚','value':'540'},{'name':'瓦努阿图','value':'548'},{'name':'新西兰','value':'554'},{'name':'尼加拉瓜','value':'558'},{'name':'尼日尔','value':'562'},{'name':'尼日利亚','value':'566'},{'name':'钮埃','value':'570'},{'name':'诺福克岛','value':'574'},{'name':'挪威','value':'578'},{'name':'美属太平洋各群岛','value':'581'},{'name':'密克罗尼西亚共和国','value':'583'},{'name':'马绍尔群岛共和国','value':'584'},{'name':'巴基斯坦','value':'586'},{'name':'巴拿马','value':'591'},{'name':'巴布亚新几内亚','value':'598'},{'name':'巴拉圭','value':'600'},{'name':'秘鲁','value':'604'},{'name':'菲律宾','value':'608'},{'name':'皮特凯恩群岛','value':'612'},{'name':'波兰','value':'616'},{'name':'葡萄牙','value':'620'},{'name':'几内亚比绍','value':'624'},{'name':'东帝汶','value':'626'},{'name':'波多黎各','value':'630'},{'name':'卡塔尔','value':'634'},{'name':'留尼汪','value':'638'},{'name':'罗马尼亚','value':'642'},{'name':'俄罗斯','value':'643'},{'name':'卢旺达','value':'646'},{'name':'圣赫勒拿','value':'654'},{'name':'圣基茨和尼维斯联邦','value':'659'},{'name':'安圭拉','value':'660'},{'name':'圣卢西亚','value':'662'},{'name':'圣皮埃尔和密克隆','value':'666'},{'name':'圣文森特和林纳丁斯','value':'670'},{'name':'圣马力诺','value':'674'},{'name':'圣多美和普林西比','value':'678'},{'name':'沙特阿拉伯','value':'682'},{'name':'塞内加尔','value':'686'},{'name':'塞舌尔','value':'690'},{'name':'塞拉利昂','value':'694'},{'name':'新加坡','value':'702'},{'name':'斯洛伐克共和国','value':'703'},{'name':'越南','value':'704'},{'name':'斯洛文尼亚共和国','value':'705'},{'name':'索马里','value':'706'},{'name':'南非','value':'710'},{'name':'津巴布韦','value':'716'},{'name':'西班牙','value':'724'},{'name':'西撒哈拉','value':'732'},{'name':'苏丹','value':'736'},{'name':'苏里南','value':'740'},{'name':'斯瓦尔巴群岛','value':'744'},{'name':'斯威士兰','value':'748'},{'name':'瑞典','value':'752'},{'name':'瑞士 ','value':'756'},{'name':'叙利亚','value':'760'},{'name':'塔吉克斯坦共和国','value':'762'},{'name':'泰国','value':'764'},{'name':'多哥','value':'768'},{'name':'土克劳','value':'772'},{'name':'汤加','value':'776'},{'name':'特立达和多巴哥','value':'780'},{'name':'阿拉伯联合酋长国','value':'784'},{'name':'突尼斯','value':'788'},{'name':'土耳其','value':'792'},{'name':'土库曼斯坦','value':'795'},{'name':'特克斯和凯科斯群岛','value':'796'},{'name':'图瓦卢','value':'798'},{'name':'乌干达','value':'800'},{'name':'乌克兰','value':'804'},{'name':'马其顿共和国','value':'807'},{'name':'埃及','value':'818'},{'name':'英国','value':'826'},{'name':'坦桑尼亚','value':'834'},{'name':'美国','value':'840'},{'name':'美属維尔京群岛','value':'850'},{'name':'布基纳法索','value':'854'},{'name':'乌拉圭','value':'858'},{'name':'乌兹别克斯坦共和国','value':'860'},{'name':'委内瑞拉共和国','value':'862'},{'name':'瓦利斯和富图纳群','value':'876'},{'name':'西萨摩亚','value':'882'},{'name':'也门民主人民共和国','value':'887'},{'name':'南斯拉夫','value':'891'},{'name':'赞比亚','value':'894'}]
const completeNationality = part1.concat(part2,part3,part4,part5,part6,part7);
export const hzNationality = part1.concat(part3,part5,part7);  //护照能选的国籍
export const nationality = completeNationality;