/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var FLOWER_COUNT = 432;

//注意每行放10个，便于统计个数
var flowerNames = Array("风信子","紫罗兰","梅花","茉莉花","栀子花","桃花","桔梗","桂花","杜鹃花","月季",    //1
"曼陀罗","迷迭香","马蹄莲","康乃馨","山茶花","长寿花","迎春花","鸡蛋花","含笑","睡莲",                      //2
"米兰花","牡丹","向日葵","菊花","六月雪","虎刺梅","郁金香","羊蹄甲","金花茶","一品红",                      //3
"荷花","仙人指","紫薇花","木芙蓉","鹿角海棠","石榴花","水仙","荷兰菊","铁兰","石蒜",                        //4
"荷包花","红花羊蹄甲","腊梅","花烟草","东京樱花","鹤望兰","大花蕙兰","番红花","百合","勿忘我",              //5
"君子兰","金银花","兰花","罂粟花","玫瑰","蝴蝶兰","彼岸花","藏红花","三色堇","红掌",                        //6
"昙花","紫藤","木兰花","葛根","美女樱","苹婆","矢车菊","木棉","仙客来","含羞草",                            //7
"蟹爪兰","紫荆","木槿","蔷薇花","夹竹桃","玉兰","合欢","天竺葵","白掌","绣球花",                            //8
"蓝花楹","油菜花","建兰","茼蒿","虞美人","铃兰","藿香","春兰","蓟","九里香",                                //9
"半枝莲","扶桑","梨花","紫花地丁","凌霄","萱草","垂丝海棠","西府海棠","蕙兰","地黄",                        //10
"榆叶梅","金盏花","美人蕉","月见草","铁线莲","沙漠玫瑰","令箭荷花","雏菊","桃金娘","金樱子",                //11
"长春花","红瑞木","刺儿菜","西番莲","八仙花","蝴蝶花","白芨","杏花","刺槐","贴梗海棠",                      //12
"接骨木","飞燕草","炮仗花","含笑花","紫玉兰","珍珠梅","棣棠","丽格海棠","佛甲草","倒挂金钟",                //13
"玉簪花","芍药","金银木","石楠花","黄刺玫","凤凰木","球兰","金缕梅","日本晚樱","莪术",                      //14
"金边瑞香","十大功劳","茶梅","刺桐","毛地黄","假昙花","报春花","垂笑君子兰","文冠果","五爪金龙",            //15
"禾雀花","鸳鸯茉莉","凤尾兰","火炬树","福禄考","石竹","梓树","锦带花","小檗","红花檵木",                    //16
"红千层","火焰木","络石","龙船花","金丝桃","花毛茛","五色梅","金鸡菊","结香","牵牛",                        //17
"六倍利","琉璃苣","蓝雪花","洛神花","接骨草","龙吐珠","吊钟花","凤仙花","金鱼草","姜花",                    //18
"鸡冠刺桐","黄花风铃木","朱顶红","使君子","黄槐","木荷","梭鱼草","金钟花","猫尾草","稠李",                  //19
"琴叶珊瑚","野牡丹","凤眼莲","天人菊","郁李","百子莲","巴西鸢尾","叶子花","白晶菊","水鬼蕉",                //20
"大丽花","假连翘","德国鸢尾","串钱柳","醉鱼草","夏堇","毛鹃","锦鸡儿","非洲凤仙","红蓼",                    //21
"孔雀草","蓝目菊","黑心菊","狗牙花","荷花玉兰","假苹婆","活血丹","射干","非洲菊","矮牵牛",                  //22
"头花蓼","尖叶杜英","金凤花","蓝花鼠尾草","夜合花","蕺菜","云实","甘菊","半枝莲","黄槿",                    //23
"月光花","飘香藤","红花醡浆草","紫娇花","金焰绣线菊","帝王花","四季秋海棠","大花金鸡菊","费菜","鸡矢藤",     //24
"万寿菊","藿香蓟","美丽月见草","大花紫薇","黄蝉","水石榕","羽叶薰衣草","金盏菊","金光菊","檵木",            //25
"点地梅","万代兰","大花六道木","臭牡丹","白车轴草","麦李","葱兰","麻叶绣线菊","硫华菊","一串红",            //26
"蜀葵","蜡菊","香水草","麝香百合","百日草","贝壳花","松红梅","萍逢草","美国薄荷","阿拉伯婆婆纳",            //27
"鸡冠花","火绒草","花毛茛","四海波","大花马齿苋","千日红","荷包牡丹","时钟花","大滨菊","海仙花",            //28
"悬铃花","旱金莲","金苞花","海石竹","紫萼","石仙桃","午时花","假酸浆","钓钟柳","萼距花",                    //29
"软枝黄蝉","粉花绣线菊","大花葱","灰莉","猬实","彩色马蹄莲","风铃草","蔓花生","新几内亚凤仙","黄兰",        //30
"锦绣杜鹃","洋桔梗","串叶松香草","银合欢","蒜香藤","珊瑚藤","瓜叶菊","海州常山","白三叶草","韩信草",        //31
"松叶菊","球花石斛","金露梅","茑萝","金玲花","卷丹百合","杠柳","黄花鸢尾","兜唇石斛","金丝梅",              //32
"芙蓉菊","小冠花","鬼罂粟","大岩桐","大花美人蕉","芙蓉葵","黄花夹竹桃","海芒果","白睡莲","山丹花",          //33
"花菱草","香雪球","湖北海棠","繁星花","唐菖蒲","风兰","翠雀","小苍兰","矮雪轮","假龙头花",                  //34
"瞿麦","黄水仙","凤丹","红花银桦","翅荚决明","文殊兰","山指甲","非洲紫罗兰","韭莲","羽扇豆",                //35
"翠菊","韭兰","松果菊","红丁香","锦葵","地涌金莲","勋章菊","肥皂草","文心兰","角蒿",                        //36
"大花萱草","马利筋","华北珍珠梅","黄堇","卡特兰","光叶子花","火烧花","还亮草","风毛菊","花木蓝",            //37
"红蕉","华北耧斗菜","葱莲","二乔木兰","狗娃花","狗舌草","黄槐决明","多花紫藤","剪秋罗","荷兰花",            //38
"红鸡蛋花","火焰兰","红花锦鸡儿","垂枝红千层","冬红","吊灯扶桑","白花夹竹桃","闭鞘姜","多花野牡丹","鹅掌草",    //39
"红睡莲","红花龙胆","碧玉兰","侧金盏花","粉花月见草","大花威灵仙","带叶兜兰","红花文殊兰","粉苞酸脚杆","滇山茶",    //40
"大白杜鹃","单瓣黄刺玫","瓣蕊唐松草","黑心金光菊","多被银莲花","东北百合","独占春","红花石斛","黄钟木","短毛独活",  //41
"半钟铁线莲","北黄花菜","多叶羽扇豆","白马蹄莲","海杧果","斑叶堇菜","爆仗竹","齿缘吊钟花","厚萼凌霄","广布红门兰",  //42
"非洲凌霄属","粉紫重瓣木槿","多花指甲兰","垂枝大叶早樱","达乌里黄耆","达乌里秦艽","大花蓝盆花","橙红茑萝","桉叶藤","东野菰",    //43
"黄绿贝母兰","碧冬茄属",
"美女","有钱花","眼花","如花","花痴","花脸猫","开心麻花","校花","烟花","葱花",
"花仙子","花千骨","花心公主","花甲"
);