const provinces = [
	{ key: '110000', value: '北京市' },
	{ key: '120000', value: '天津市' },
	{ key: '130000', value: '河北省' },
	{ key: '140000', value: '山西省' },
	{ key: '150000', value: '内蒙古自治区' },
	{ key: '210000', value: '辽宁省' },
	{ key: '220000', value: '吉林省' },
	{ key: '230000', value: '黑龙江' },
	{ key: '310000', value: '上海市' },
	{ key: '320000', value: '江苏省' },
	{ key: '330000', value: '浙江省' },
	{ key: '340000', value: '安徽省' },
	{ key: '350000', value: '福建省' },
	{ key: '360000', value: '江西省' },
	{ key: '370000', value: '山东省' },
	{ key: '410000', value: '河南省' },
	{ key: '420000', value: '湖北省' },
	{ key: '430000', value: '湖南省' },
	{ key: '440000', value: '广东省' },
	{ key: '450000', value: '广西壮族自治区' },
	{ key: '460000', value: '海南省' },
	{ key: '500000', value: '重庆市' },
	{ key: '510000', value: '四川省' },
	{ key: '520000', value: '贵州省' },
	{ key: '530000', value: '云南省' },
	{ key: '540000', value: '西藏自治区' },
	{ key: '610000', value: '陕西省' },
	{ key: '620000', value: '甘肃省' },
	{ key: '630000', value: '青海省' },
	{ key: '640000', value: '宁夏回族自治区' },
	{ key: '650000', value: '新疆维吾尔自治区' }
];

const cities = {
	'000000': [],
	'110000': [{ '110000': '北京市' }],
	'120000': [{ '120000': '天津市' }],
	'130000': [{ '130100': '石家庄市' }, { '130200': '唐山市' }, { '130300': '秦皇岛市' }, { '130400': '邯郸市' },
	{ '130500': '邢台市' }, { '130600': '保定市' }, { '130700': '张家口市' }, { '130800': '承德市' },
	{ '130900': '沧州市' }, { '131000': '廊坊市' }, { '131100': '衡水市' }],
	'140000': [{ '140100': '太原市' }, { '140200': '大同市' }, { '140300': '阳泉市' }, { '140400': '长治市' },
	{ '140500': '晋城市' }, { '140600': '朔州市' }, { '140700': '晋中市' }, { '140800': '运城市' },
	{ '140900': '忻州市' }, { '141000': '临汾市' }, { '141100': '吕梁市' }],
	'150000': [{ '150100': '呼和浩特市' }, { '150200': '包头市' }, { '150300': '乌海市' }, { '150400': '赤峰市' },
	{ '150500': '通辽市' }, { '150600': '鄂尔多斯市' }, { '150700': '呼伦贝尔市' }, { '150800': '巴彦淖尔市' },
	{ '150900': '乌兰察布市' }, { '152200': '兴安盟' }, { '152500': '锡林郭勒盟' }, { '152900': '阿拉善盟' }],
	'210000': [{ '210100': '沈阳市' }, { '210200': '大连市' }, { '210300': '鞍山市' }, { '210400': '抚顺市' },
	{ '210500': '本溪市' }, { '210600': '丹东市' }, { '210700': '锦州市' }, { '210800': '营口市' },
	{ '210900': '阜新市' }, { '211000': '辽阳市' }, { '211100': '盘锦市' }, { '211200': '铁岭市' },
	{ '211300': '朝阳市' }, { '211400': '葫芦岛市' }],
	'220000': [{ '220100': '长春市' }, { '220200': '吉林市' }, { '220300': '四平市' }, { '220400': '辽源市' },
	{ '220500': '通化市' }, { '220600': '白山市' }, { '220700': '松原市' }, { '220800': '白城市' },
	{ '222400': '延边朝鲜族自治州' }],
	'230000': [{ '230100': '哈尔滨市' }, { '230200': '齐齐哈尔市' }, { '230300': '鸡西市' }, { '230400': '鹤岗市' },
	{ '230500': '双鸭山市' }, { '230600': '大庆市' }, { '230700': '伊春市' }, { '230800': '佳木斯市' },
	{ '230900': '七台河市' }, { '231000': '牡丹江市' }, { '231100': '黑河市' }, { '231200': '绥化市' },
	{ '232700': '大兴安岭地区' }],
	'310000': [{ '310000': '上海市' }],
	'320000': [{ '320100': '南京市' }, { '320200': '无锡市' }, { '320300': '徐州市' }, { '320400': '常州市' },
	{ '320500': '苏州市' }, { '320600': '南通市' }, { '320700': '连云港市' }, { '320800': '淮安市' },
	{ '320900': '盐城市' }, { '321000': '扬州市' }, { '321100': '镇江市' }, { '321200': '泰州市' },
	{ '321300': '宿迁市' }],
	'330000': [
		{ '330100': '杭州市' }, { '330200': '宁波市' }, { '330300': '温州市' }, { '330400': '嘉兴市' },
		{ '330500': '湖州市' }, { '330600': '绍兴市' }, { '330700': '金华市' }, { '330800': '衢州市' },
		{ '330900': '舟山市' }, { '331000': '台州市' }, { '331100': '丽水市' }],
	'340000': [{ '340100': '合肥市' }, { '340200': '芜湖市' }, { '340300': '蚌埠市' }, { '340400': '淮南市' },
	{ '340500': '马鞍山市' }, { '340600': '淮北市' }, { '340700': '铜陵市' }, { '340800': '安庆市' },
	{ '341000': '黄山市' }, { '341100': '滁州市' }, { '341200': '阜阳市' }, { '341300': '宿州市' },
	{ '341400': '巢湖市' }, { '341500': '六安市' }, { '341600': '亳州市' }, { '341700': '池州市' },
	{ '341800': '宣城市' }],
	'350000': [{ '350100': '福州市' }, { '350200': '厦门市' }, { '350300': '莆田市' }, { '350400': '三明市' },
	{ '350500': '泉州市' }, { '350600': '漳州市' }, { '350700': '南平市' }, { '350800': '龙岩市' },
	{ '350900': '宁德市' }],
	'360000': [{ '360100': '南昌市' }, { '360200': '景德镇市' }, { '360300': '萍乡市' }, { '360400': '九江市' },
	{ '360500': '新余市' }, { '360600': '鹰潭市' }, { '360700': '赣州市' }, { '360800': '吉安市' },
	{ '360900': '宜春市' }, { '361000': '抚州市' }, { '361100': '上饶市' }],
	'370000': [{ '370100': '济南市' }, { '370200': '青岛市' }, { '370300': '淄博市' }, { '370400': '枣庄市' },
	{ '370500': '东营市' }, { '370600': '烟台市' }, { '370700': '潍坊市' }, { '370800': '济宁市' },
	{ '370900': '泰安市' }, { '371000': '威海市' }, { '371100': '日照市' }, { '371200': '莱芜市' },
	{ '371300': '临沂市' }, { '371400': '德州市' }, { '371500': '聊城市' }, { '371600': '滨州市' },
	{ '371700': '菏泽市' }],
	'410000': [{ '410100': '郑州市' }, { '410200': '开封市' }, { '410300': '洛阳市' }, { '410400': '平顶山市' },
	{ '410500': '安阳市' }, { '410600': '鹤壁市' }, { '410700': '新乡市' }, { '410800': '焦作市' },
	{ '410900': '濮阳市' }, { '411000': '许昌市' }, { '411100': '漯河市' }, { '411200': '三门峡市' },
	{ '411300': '南阳市' }, { '411400': '商丘市' }, { '411500': '信阳市' }, { '411600': '周口市' },
	{ '411700': '驻马店市' }
	],
	'420000': [
		{ '420100': '武汉市' }, { '420200': '黄石市' }, { '420300': '十堰市' }, { '420500': '宜昌市' },
		{ '420600': '襄阳市' }, { '420700': '鄂州市' }, { '420800': '荆门市' }, { '420900': '孝感市' },
		{ '421000': '荆州市' }, { '421100': '黄冈市' }, { '421200': '咸宁市' }, { '421300': '随州市' },
		{ '422800': '恩施土家族苗族自治州' }
	],
	'430000': [
		{ '430100': '长沙市' }, { '430200': '株洲市' }, { '430300': '湘潭市' }, { '430400': '衡阳市' },
		{ '430500': '邵阳市' }, { '430600': '岳阳市' }, { '430700': '常德市' }, { '430800': '张家界市' },
		{ '430900': '益阳市' }, { '431000': '郴州市' }, { '431100': '永州市' }, { '431200': '怀化市' },
		{ '431300': '娄底市' }, { '433100': '湘西土家族苗族自治州' }
	],
	'440000': [
		{ '440100': '广州市' }, { '440200': '韶关市' }, { '440300': '深圳市' }, { '440400': '珠海市' }, { '440500': '汕头市' },
		{ '440600': '佛山市' },
		{ '440700': '江门市' },
		{ '440800': '湛江市' },
		{ '440900': '茂名市' },
		{ '441200': '肇庆市' },
		{ '441300': '惠州市' },
		{ '441400': '梅州市' },
		{ '441500': '汕尾市' },
		{ '441600': '河源市' },
		{ '441700': '阳江市' },
		{ '441800': '清远市' },
		{ '441900': '东莞市' },
		{ '442000': '中山市' },
		{ '445100': '潮州市' },
		{ '445200': '揭阳市' },
		{ '445300': '云浮市' }
	],
	'450000': [
		{ '450100': '南宁市' },
		{ '450200': '柳州市' },
		{ '450300': '桂林市' },
		{ '450400': '梧州市' },
		{ '450500': '北海市' },
		{ '450600': '防城港市' },
		{ '450700': '钦州市' },
		{ '450800': '贵港市' },
		{ '450900': '玉林市' },
		{ '451000': '百色市' },
		{ '451100': '贺州市' },
		{ '451200': '河池市' },
		{ '451300': '来宾市' },
		{ '451400': '崇左市' }
	],
	'460000': [
		{ '460100': '海口市' },
		{ '460200': '三亚市' }
	],
	'500000': [
		{ '500000': '重庆市' }
	],
	'510000': [
		{ '510100': '成都市' },
		{ '510300': '自贡市' },
		{ '510400': '攀枝花市' },
		{ '510500': '泸州市' },
		{ '510600': '德阳市' },
		{ '510700': '绵阳市' },
		{ '510800': '广元市' },
		{ '510900': '遂宁市' },
		{ '511000': '内江市' },
		{ '511100': '乐山市' },
		{ '511300': '南充市' },
		{ '511400': '眉山市' },
		{ '511500': '宜宾市' },
		{ '511600': '广安市' },
		{ '511700': '达州市' },
		{ '511800': '雅安市' },
		{ '511900': '巴中市' },
		{ '512000': '资阳市' },
		{ '513200': '阿坝藏族羌族自治州' },
		{ '513300': '甘孜藏族自治州' },
		{ '513400': '凉山彝族自治州' }
	],
	'520000': [
		{ '520100': '贵阳市' },
		{ '520200': '六盘水市' },
		{ '520300': '遵义市' },
		{ '520400': '安顺市' },
		{ '522200': '铜仁地市' },
		{ '522300': '黔西南布依族苗族自治州' },
		{ '522400': '毕节地市' },
		{ '522600': '黔东南自治州' },
		{ '522700': '黔南布依族苗族自治州' }
	],
	'530000': [
		{ '530100': '昆明市' },
		{ '530300': '曲靖市' },
		{ '530400': '玉溪市' },
		{ '530500': '保山市' },
		{ '530600': '昭通市' },
		{ '530700': '丽江市' },
		{ '530900': '临沧市' },
		{ '532300': '楚雄彝族自治州' },
		{ '532500': '红河哈尼族彝族自治州' },
		{ '532600': '文山壮族苗族自治州' },
		{ '532700': '思茅市' },
		{ '532800': '西双版纳傣族自治州' },
		{ '532900': '大理白族自治州' },
		{ '533100': '德宏傣族景颇族自治州' },
		{ '533300': '怒江傈僳族自治州' },
		{ '533400': '迪庆藏族自治州' }
	],
	'540000': [
		{ '540100': '拉萨市' },
		{ '542100': '昌都地区' },
		{ '542200': '山南地区' },
		{ '542300': '日喀则地区' },
		{ '542400': '那曲地区' },
		{ '542500': '阿里地区' },
		{ '542600': '林芝地区' }
	],
	'610000': [
		{ '610100': '西安市' },
		{ '610200': '铜川市' },
		{ '610300': '宝鸡市' },
		{ '610400': '咸阳市' },
		{ '610500': '渭南市' },
		{ '610600': '延安市' },
		{ '610700': '汉中市' },
		{ '610800': '榆林市' },
		{ '610900': '安康市' },
		{ '611000': '商洛市' }
	],
	'620000': [
		{ '620100': '兰州市' }, { '620200': '嘉峪关市' }, { '620300': '金昌市' },
		{ '620400': '白银市' }, { '620500': '天水市' }, { '620600': '武威市' },
		{ '620700': '张掖市' }, { '620800': '平凉市' },
		{ '620900': '酒泉市' }, { '621000': '庆阳市' }, { '621100': '定西市' },
		{ '622600': '陇南地区' }, { '622900': '临夏回族自治州' }, { '623000': '甘南藏族自治州' }
	],
	'630000': [
		{ '630100': '西宁市' }, { '632100': '海东地区' }, { '632200': '海北藏族自治州' }, { '632300': '黄南藏族自治州' },
		{ '632500': '海南藏族自治州' }, { '632600': '果洛藏族自治州' }, { '632700': '玉树藏族自治州' }, { '632800': '海西蒙古族藏族自治州' }
	],
	'640000': [
		{ '640100': '银川市' }, { '640200': '石嘴山市' }, { '640300': '吴忠市' },
		{ '640400': '固原市' }, { '640500': '中卫市' }
	],
	'650000': [
		{ '650100': '乌鲁木齐市' }, { '650200': '克拉玛依市' },
		{ '652100': '吐鲁番地区' }, { '652200': '哈密地区' },
		{ '652300': '昌吉回族自治州' }, { '652700': '博尔塔拉蒙古自治州' },
		{ '652800': '巴音郭楞蒙古自治州' }, { '652900': '阿克苏地区' },
		{ '653000': '克孜勒苏柯尔克孜自治州' }, { '653100': '喀什地区' },
		{ '653200': '和田地区' }, { '654000': '伊犁哈萨克自治州' }, { '654200': '塔城地区' }, { '654300': '阿勒泰地区' }
	]
};

export {
	provinces,
	cities
}