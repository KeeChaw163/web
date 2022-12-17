	var js_data = document.getElementById('head').getAttribute('data');
	var js_data_2020 = document.getElementById('head').getAttribute('data_2020');
    var js_data_gs = document.getElementById('head').getAttribute('data_gs');
    var js_data_china = document.getElementById('head').getAttribute('data_china');
    var js_data_news = document.getElementById('head').getAttribute('data_news');
    var js_data_pro = JSON.parse(js_data);
    var js_data_pro_2020 = JSON.parse(js_data_2020);
    var js_data_pro_gs = JSON.parse(js_data_gs);
    var js_data_pro_china = JSON.parse(js_data_china);
    var js_data_pro_news = JSON.parse(js_data_news);
	/*各区域产品挂牌数-开始*/
	//牧草产能区域分布数据
//	var DataCenter = [{
//		name: js_data1[0][1],
//		num: js_data1[0][2]
//	}, {
//		name: js_data1[1][1],
//		num: js_data1[1][2]
//	}];

	/*各区域产品挂牌数-结束*/
	//牧草
	var ChanNeng = [{
		name: js_data_pro[0*33+27][0]+js_data_pro[0*33+27][1]+"人口",
		num: js_data_pro[0*33+27][2]+"万"
	}, {
		name: js_data_pro[4*33+27][0]+js_data_pro[4*33+27][1]+"人口",
		num: js_data_pro[4*33+27][2]+"万"
	}, {
		name: js_data_pro[7*33+27][0]+js_data_pro[7*33+27][1]+"人口",
		num: js_data_pro[7*33+27][2]+"万"
	}];
	//入驻会员实时动态滚动数据
	var RZstatus = [];
    for(i=0;i<12;i++){
    	RZstatus[i] = js_data_pro_news[483+i];
    }
//	var RZstatus = ["绿邦创景成功挂牌入驻南方草交所", "晨光金品百花园成功挂牌入驻南方草交所", "绿邦创景成功挂牌入驻南方草交所", "晨光金品百花园成功挂牌入", "绿邦创景成功挂牌入驻南方草交所", "晨光金品百花园成功挂牌入驻南方草交所", "绿邦创景成功挂牌入驻南方草交所", "晨光金品百花园成功挂牌入", "绿邦创景成功挂牌入驻南方草交所", "晨光金品百花园成功挂牌入驻南方草交所", "绿邦创景成功挂牌入驻南方草交所", "晨光金品百花园成功挂牌入"];
	var callMsg = ["欢乐干饭人小组——但行前路，不负韶华 !","欢乐干饭人小组——初心不改，持恒渐进 !"];
	var data1 = [];
	var data2 = [];
	var data3 = [];
	var data4 = [];
	for(i=0;i<8;i++){
	    data1[i] = js_data_pro_china[i];
	    data2[i] = js_data_pro_china[i+8];
	    data3[i] = js_data_pro_china[i+16];
	    data4[i] = js_data_pro_china[i+24];
	}
	var CJstatus = [
		data1,
		data2,
		data3,
		data4,
	];