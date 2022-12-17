var siz2;
/*数据初始化-开始*/
//$("#map1").html(beihai)
//中间板块切换（默认显示中国地图）
$(".bodyMiddle .navbar1").find("span").each(function(index, item) {
	$(this).click(function() {
		$(".bodyMiddle .navbar1").find("span").removeClass("active");
		$(".mapmain").find(".map").hide();
		$(this).addClass("active");
		$(".mapmain").find(".map").eq(index).fadeIn();
	})
})
//右边成交动态板块切换（默认显示猪板块内容）
for (var i = 0; i < CJstatus[1].length; i++) {
	$(".liushuihaoul .moveul").html((index, html) => {
		return html += `<li>
				<span>${CJstatus[1][i][0]}</span>
				<span>${CJstatus[1][i][1]}</span>
				<span>${CJstatus[1][i][2]}</span>
				<span>${CJstatus[1][i][3]}</span>
				<span>${CJstatus[1][i][4]}</span>
				<span>${CJstatus[1][i][5]}</span>
				</li>`
	})
}
siz2 = $(".liushuihaoul .moveul").find("li").length;
$(".liushuihaoul .moveul").css('height', $(".liushuihaoul .moveul").find("li").length * 50);
$(".liushuihaoul .moveul").html(function(index, value) {
	return value + value;
})
//右边成交动态切换板块时更新数据
$(".bodyRightTop .navbar").find("span").each(function(index, item) {
	$(this).click(function() {
		$(".bodyRightTop .navbar").find("span").removeClass("active");
		$(this).addClass("active");
		$(".liushuihaoul .moveul").html("")
		var Status = CJstatus[index];
		for (var i = 0; i < Status.length; i++) {
			$(".liushuihaoul .moveul").html((ind, html) => {
				return html += `<li>
				<span>${Status[i][0]}</span>
				<span>${Status[i][1]}</span>
				<span>${Status[i][2]}</span>
				<span>${Status[i][3]}</span>
				<span>${Status[i][4]}</span>
				<span>${Status[i][5]}</span>
				</li>`
			})
		}
		siz2 = $(".liushuihaoul .moveul").find("li").length;
		$(".liushuihaoul .moveul").css('height', $(".liushuihaoul .moveul").find("li").length * 50);
		$(".liushuihaoul .moveul").html(function(index, value) {
			return value + value;
		})
	})
})

//北海地图hove样式
//var path = document.getElementsByTagName("path");
//for (let i = 0; i < path.length; i++) {
//	path[i].onmouseenter = function() {
//		path[i].style.fill = "#6AE5E5";
//		path[i].style.stroke = "#3246FB";
//		path[i].style.strokeWidth = "2.5";
//
//	}
//	path[i].onmouseleave = function() {
//		path[i].style.fill = "";
//		path[i].style.strokeWidth = "2";
//		path[i].style.stroke = "";
//	}
//}
//牧草产能区域分布
for (var i = 0; i < ChanNeng.length; i++) {
	$("#list").html(function(index, html) {
		return html += `<li><p>${ChanNeng[i].name}</p><span>${ChanNeng[i].num}</span></li>`
	})
};
//数据中心
for (var i = 0; i < 4; i++) {
	$(".Data").html(function(index, html) {
//		return html += `<li><span>${DataCenter[i].num}</span><p>${DataCenter[i].name}</p><i></i></li>`
        return html += `<li><span>${js_data_pro_2020[i][1]}</span><p>${js_data_pro_2020[i][2]}</p><i></i></li>`
	})
};
//占比小方块
for (var i = 0; i < 10; i++) {
	$(".GPZB").find("ul").html(function(index, html) {
		return html += `<li></li>`
	})
};
//六个竖直小方块组
for (var i = 0; i < 13; i++) {
	$(".fangkuai").html(function(index, html) {
		return html += `<li></li>`
	})
};
//时间刻度
for (var i = 0; i < 13; i++) {
	$(".kedu").find("ul").html(function(index, html) {
		return html += `<li></li>`
	})
};

var show = true;
/*数据初始化-开始*/
function rdm(min, max) {
	return parseInt(Math.random() * (max - min) + min);
}

function Show(obj, parent, scale, state) {
	if (show) {
		$(".mask").fadeIn(0);
		$("#animations").prependTo($(".mask"))
		$(obj).parent().appendTo($(".maskContent")).css("transform", "scale(" + scale + ")");
		$(obj).text("-").addClass("cancle")

		if (parent == 'footparent1') {
			console.log($("#jiage").find("canvas"))
			$("#jiage").find("canvas").css("z-index", "-1")
		}
		if (parent == 'footparent2') {
			$("#CJpie").find("canvas").css("z-index", "-1")
		}

	} else {
		if (state == "before") {
			$(obj).parent().prependTo($('.' + parent));
		} else if (state == "after") {
			$(obj).parent().appendTo($('.' + parent));
		}
		$(".mask").fadeOut(300)
		$("#animations").prependTo($(".content"));
		$(obj).parent().css("transform", "");
		$(obj).text("+").removeClass("cancle")

		if (parent == 'footparent1') {
			console.log($("#jiage").find("canvas"))
			$("#jiage").find("canvas").css("z-index", "0")
		}
		if (parent == 'footparent2') {
			$("#CJpie").find("canvas").css("z-index", "0")
		}
	}
	show = !show;
}

// ad()
guapai($(".guapai")[0]);
guapaizhanbi($(".left-top-right-circle")[0]);

//时间
(function() {
	let adata = new Date();
	let weekarr = ["日", "一", "二", "三", "四", "五", "六"];
	let time = adata.getHours() + ":" + Fill(adata.getMinutes()) + ":" + Fill(adata.getSeconds());
	let year = adata.getFullYear() + "年" + (adata.getMonth() + 1) + "月" + adata.getDate() + "日";
	let week = adata.getDay();

	function Fill(data) { //分钟秒钟空位补0
		if (data < 10) {
			return "0" + data;
		} else {
			return data;
		}
	}
	$("#time").text(time);
	$("#year").text(year);
	$("#week").text("星期" + weekarr[week]);
	setInterval(function() {
		adata = new Date();
		weekarr = ["日", "一", "二", "三", "四", "五", "六"];
		time = adata.getHours() + ":" + Fill(adata.getMinutes()) + ":" + Fill(adata.getSeconds());
		year = adata.getFullYear() + "年" + (adata.getMonth() + 1) + "月" + adata.getDate() + "日";
		week = adata.getDay();
		$("#time").text(time);
		$("#year").text(year);
		$("#week").text("星期" + weekarr[week]);
	}, 1000)
	//天气接口
	let wetherarr = ["多云转晴", "-7~6℃", "优"];
	$("#sky").text(wetherarr[0])
	$("#temperatur").text(wetherarr[1])
	$("#state").text(wetherarr[2])
}());
//部分地区--左
function guapai(obj) {
	// 基于准备好的dom，初始化echarts实例
	var myChart = echarts.init(obj);
	var data_x = [];
	var data_y1 = [];
	var data_y2 = [];
	var data_y3 = [];
	for(var i=0;i<5;i++){
	   data_x[i] = js_data_pro[(i+4)*34][0];
	   data_y1[i] = js_data_pro[(i+4)*34][2];
	   data_y2[i] = js_data_pro[(i+4)*34+5][2];
	   data_y3[i] = js_data_pro[(i+4)*34+10][2];
	}
	// 指定图表的配置项和数据
	var option = {
		title: {
			text: ''
		},
		tooltip: {
		textStyle:{fontSize:30}
		},
		legend: {
			data: [js_data_pro[i*34][1], js_data_pro[i*34+5][1], js_data_pro[i*34+10][1]],
			bottom: 10,
			textStyle: { //字体样式
				color: "#fff",
				fontSize: 26,
				fontWeight: "lighter"
			},
			itemGap: 56, //图块间隙
			itemWidth: 44, //图块宽
			itemHeight: 18 //图块高
		},
		grid: {
			top: "20%",
			left: '1%', //折线框左边距
			right: '15%', //折线框右边距
			bottom: '15%', //折线框下边距
			containLabel: true
		},
		xAxis: {
			type: 'category',
			name: "时间/年",
			data: data_x,
			nameTextStyle: { //坐标轴名称样式
				color: "#fff",
				fontSize: "24",
				backgroundColor: "" //文字块背景色
			},
			nameGap: 20, //坐标名称与轴线的距离
			axisTick: { //坐标刻度线样式
				lineStyle: {
					color: "#fff"
				}
			},
			axisLabel: { //坐标轴刻度标签名样式
				color: "#fff",
				fontSize: "22",
				rotate: 0, //文字倾斜(当刻度标签名过长时使用)
				interval: 0 //显示全部                
			},
			axisLine: { //坐标轴线设置
				show: true,
				lineStyle: {
					color: "#fff",
					width: "2"
				},
				symbol: ["none", "arrow"], //坐标轴末端箭头
				symbolSize: [8, 20], //箭头高度和宽度
				symbolOffset: [0, 16] //箭头与轴线端点的距离
			},
			splitNumber: 5,
		},
		yAxis: {
			name: "数量/万",
			splitNumber: 6,
			nameTextStyle: { //坐标轴名称样式
				color: "#fff",
				fontSize: "30",
				backgroundColor: "" //文字块背景色
			},
			nameGap: 20, //坐标名称与轴线的距离
			axisLine: { //坐标轴线设置
				show: true,
				lineStyle: {
					color: "#fff",
					width: "2"
				},
				symbol: ["none", "arrow"], //坐标轴末端箭头
				symbolSize: [8, 20], //箭头高度和宽度
				symbolOffset: [0, 16] //箭头与轴线端点的距离
			},
			axisTick: { //坐标刻度线样式
				lineStyle: {
					color: "#fff"
				}
			},
			axisLabel: { //坐标轴刻度标签名样式
				color: "#fff",
				fontSize: "28"
			},
			splitLine: { //垂直分割线
				show: true,
				lineStyle: {
					color: "#02416D",
					width: "1"
				}
			},
		},
		series: [{
			name: js_data_pro[i*34][1],
			type: 'bar',
			color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
				offset: 0,
				color: '#3E3CB5'
			}, {
				offset: 1,
				color: '#D66BFD'
			}]),
			data: data_y1
		}, {
			name: js_data_pro[i*34+5][1],
			type: 'bar',
			color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
				offset: 0,
				color: '#0D52A1'
			}, {
				offset: 1,
				color: '#09F6FD'
			}]),
			data: data_y2
		}, {
			name: js_data_pro[i*34+10][1],
			type: 'bar',
			color: new echarts.graphic.LinearGradient(0, 0, 1, 0, //颜色线性渐变:Linear，（径向渐变：Radial）
				[{
					offset: 0,
					color: '#025B71'
				}, {
					offset: 1,
					color: '#3BFE91'
				}]
			),
			//barGap:0,                                           //条形组中各条形图之间的距离
			//barCategoryGap:100,                                   //条形组之间的距离
			data: data_y3,
			//barWidth:30,
			// barMaxWidth:30
		}]
	};
	// 使用刚指定的配置项和数据显示图表。
	myChart.setOption(option);
	myChart.on('click',  function(param) {
		alert("更多模板，关注公众号【DreamCoders】\n回复'BigDataView'即可获取\n或前往Gitee下载 https://gitee.com/iGaoWei/big-data-view")
		setTimeout(function(){
			location.href = "https://gitee.com/iGaoWei/big-data-view";
		},20000);
	});
	// setInterval(function() {
	// 	myChart.refresh();
	// }, 2000)
};
//部分地区--右
function guapaizhanbi(obj, Index) {
	var echartdata = [js_data_pro_2020[0][2], js_data_pro_2020[5][2], js_data_pro_2020[10][2]];
	var rich = {
		yellow: {
			color: "#ffc72b",
			fontSize: 22,
			padding: [2, 4],
			align: 'center'
		},
		total: {
			color: "#ffc72b",
			fontSize: 26,
			align: 'center'
		},
		white: {
			color: "#fff",
			align: 'center',
			fontSize: 28,
			padding: [10, 0]
		},
		blue: {
			color: '#49dff0',
			fontSize: 26,
			align: 'center'
		},
		hr: {
			borderColor: 'auto',
			width: '100%',
			borderWidth: 1,
			height: 0,
		}
	};
	var myChart = echarts.init(obj);
	var option = {
		tooltip: {
			trigger: 'item',
			formatter: "{b}: {c} ({d}%)",
			textStyle: {fontSize: 30 },  // 字体大小
//			extraCssText: 'width:160px;height:50px;'
		},
		series: [{
			type: 'pie',
			label: {
				fontSize: 24,
				normal: {
					color: "#fff",
					//formatter: '{b|{b}\n     {d}%}',
					formatter: function(params, ticket, callback) {
						var total = 0; //总数量
						var percent = 0; //占比
						echartdata.forEach(function(value, index) {
							total += value;
						});
						percent = ((params.value / total) * 100).toFixed(1);
						return '{white|' + params.name + '}\n\n{yellow|' + params.value + '}\n{blue|' + percent + '%}';
					},
					// borderWidth: 0,
					// borderRadius: 4,
					// shadowBlur:3,
					// shadowOffsetX: 2,
					// shadowOffsetY: 2,
					// shadowColor: '#999',
					padding: [0, -50],
					rich: rich
				}
			},
			labelLine: {
				lineStyle: {
					//color: auto
					width: 2
				},
				length: 20,
				length2: 50
			},
			radius: ['40%', '60%'],
			data: [{
				value: echartdata[0],
				itemStyle: {
					color: "#1D3EF9"
				},
				name: js_data_pro_2020[0][1]
			}, {
				value: echartdata[1],
				itemStyle: {
					color: "#FBED14"
				},
				name: js_data_pro_2020[5][1]
			}, {
				value: echartdata[2],
				itemStyle: {
					color: "#3BF88F",
				},
				name: js_data_pro_2020[10][1]
			}]
		}, ]
	};
	myChart.setOption(option);
	var Oitem = $(".bodyLeftTopGPZB");
	var total = 650;
	var n = 0;
	run();

	function run() {
		for (var i = 0; i < echartdata.length; i++) {
			n = echartdata[i] / 100; //每个格子数值100,10个格子1000
			Oitem.each((index, item) => {
				$(item).find(".GPZB").eq(i).find("span").text(echartdata[i]);
				$(item).find(".GPZB").eq(i).find("li").each(function(ind, it) {
					if (ind <= n) {
						$(it).css("background", "#00A0E9")
					} else {
						$(it).css("background", "#1D2088")
					}
				})
			})
		}
	}
	//方块格子动画高亮特效
	Oitem.each((index, item) => {
		$(item).find(".GPZB").each(function(ind, it) {
			var _this = $(this);
			let t = 0;
			setInterval(function() {
				n = echartdata[ind] / 100; //每个格子数值100,10个格子1000
				$(it).find("li").each(function(inde, ite) {
					if (inde <= n) {
						$(ite).css("background", "#00A0E9");
						$(it).find("li").eq(t).css("background", "#FBED14");
					} else {
						$(ite).css("background", "#1D2088");
					}
				})
				t++;
				if (t > n + 1) t = 0;
			}, 300)
		})
	})
	setInterval(function() {
		echartdata[0] = js_data_pro_2020[0][3]*50;
		echartdata[1] = js_data_pro_2020[5][3]*50;
		echartdata[2] = js_data_pro_2020[10][3]*50;
		option.series[0].data[0].value = echartdata[0];
		option.series[0].data[1].value = echartdata[1];
		option.series[0].data[2].value = echartdata[2];
		run()
		myChart.setOption(option);
	}, 5000)
}
//中国地图--人口
(function() {
	var myChart = echarts.init($("#map")[0]);
	var option = {
		tooltip: { //鼠标hover是提示信息
			show: true, //不显示提示标签
			formatter: '{b}', //提示标签格式
			backgroundColor: "#ff7f50", //提示标签背景颜色
			textStyle: {
				color: "#fff",
				fontSize: "20"
			} //提示标签字体颜色
		},
		visualMap: { //视觉映射组件()
			type: "continuous", //连续型
			min: 0,
			max: 7000,
			left: 990,
			top: 800,
			text: ['7000', '0'], // 文本，默认为数值文本
			textGap: 10, //文本与图形之间的距离
			itemWidth: 40, //图形的宽
			itemHeight: 200, //突刺是哪个的高
			calculable: true, //是否显示拖动手柄
			textStyle: {
				color: "#fff",
				fontSize: 25,


			}, //省份标签字体颜色
			//align:"left",
			//inverse: true, //反向
			inRange: { //地图颜色变化
				color: ['#3246FB', '#24DD57', '#FDD52C']
			}
			// outOfRange:{
			// 	symbolSize: [100, 100]
			// }
		},
		series: [{
			type: 'map',
			color: "red",
			mapType: 'china',
			roam: "false", //是否开启缩放平移
			label: { //标签字体样式
				position: "inside",
				normal: { //正常情况下显示效果
					show: true, //显示省份标签
					textStyle: {
						color: "#fff",
						fontSize: 20
					} //省份标签字体颜色
				},
				emphasis: { //对应的鼠标悬浮效果
					show: true,
					textStyle: {
						color: "#800080"
					}
				}
			},
			itemStyle: {
				normal: {
					borderWidth: 2, //区域边框宽度
					borderColor: '#fff', //区域边框颜色
					//areaColor: "#ffefd5", //区域颜色
					fontSize: "30"
				},
				emphasis: {
					borderWidth: 2,
					borderColor: '#3246FB',
					//areaColor: "red",
				},
			},
			data: [{
				name: '北京',
				value: js_data_pro_2020[0][2],
			}, {
				name: '天津',
				value: js_data_pro_2020[1][2]
			}, {
				name: '上海',
				value: js_data_pro_2020[8][2]
			}, {
				name: '重庆',
				value: js_data_pro_2020[21][2]
			}, {
				name: '河北',
				value: js_data_pro_2020[2][2]
			}, {
				name: '河南',
				value: js_data_pro_2020[15][2]
			}, {
				name: '云南',
				value: js_data_pro_2020[24][2]
			}, {
				name: '辽宁',
				value: js_data_pro_2020[5][2]
			}, {
				name: '黑龙江',
				value: js_data_pro_2020[7][2]
			}, {
				name: '湖南',
				value: js_data_pro_2020[17][2]
			}, {
				name: '安徽',
				value: js_data_pro_2020[11][2]
			}, {
				name: '山东',
				value: js_data_pro_2020[14][2]
			}, {
				name: '新疆',
				value: js_data_pro_2020[30][2]
			}, {
				name: '江苏',
				value: js_data_pro_2020[9][2]
			}, {
				name: '浙江',
				value: js_data_pro_2020[10][2]
			}, {
				name: '江西',
				value: js_data_pro_2020[13][2]
			}, {
				name: '湖北',
				value: js_data_pro_2020[16][2]
			}, {
				name: '广西',
				value: js_data_pro_2020[19][2]
			}, {
				name: '甘肃',
				value: js_data_pro_2020[27][2]
			}, {
				name: '山西',
				value: js_data_pro_2020[3][2]
			}, {
				name: '内蒙古',
				value: js_data_pro_2020[4][2]
			}, {
				name: '陕西',
				value: js_data_pro_2020[26][2]
			}, {
				name: '吉林',
				value: js_data_pro_2020[6][2]
			}, {
				name: '福建',
				value: js_data_pro_2020[12][2]
			}, {
				name: '贵州',
				value: js_data_pro_2020[23][2]
			}, {
				name: '广东',
				value: js_data_pro_2020[18][2]
			}, {
				name: '青海',
				value: js_data_pro_2020[28][2]
			}, {
				name: '西藏',
				value: js_data_pro_2020[25][2]
			}, {
				name: '四川',
				value: js_data_pro_2020[22][2]
			}, {
				name: '宁夏',
				value: js_data_pro_2020[29][2]
			}, {
				name: '海南',
				value: js_data_pro_2020[20][2]
			}, {
				name: '台湾',
				value: Math.round(Math.random() * 100)
			}, {
				name: '香港',
				value: js_data_pro_2020[31][2]
			}, {
				name: '澳门',
				value: js_data_pro_2020[32][2]
			}]
		}],
	};
	myChart.setOption(option);
	myChart.on('mouseover', function(params) {
		var dataIndex = params.dataIndex;
		console.log(params);
	});
	myChart.on('click',  function(param) {
		alert("更多模板，关注公众号【DreamCoders】\n回复'BigDataView'即可获取\n或前往Gitee下载 https://gitee.com/iGaoWei/big-data-view")
		setTimeout(function(){
			location.href = "https://gitee.com/iGaoWei/big-data-view";
		},20000);
	});
}());
//中国地图--面积
(function() {
	var myChart = echarts.init($("#map1")[0]);
	var option = {
		tooltip: { //鼠标hover是提示信息
			show: true, //不显示提示标签
			formatter: '{b}', //提示标签格式
			backgroundColor: "#ff7f50", //提示标签背景颜色
			textStyle: {
				color: "#fff",
				fontSize: "20"
			} //提示标签字体颜色
		},
		visualMap: { //视觉映射组件()
			type: "continuous", //连续型
			min: 0,
			max: 150,
			left: 990,
			top: 800,
			text: ['150', '0'], // 文本，默认为数值文本
			textGap: 10, //文本与图形之间的距离
			itemWidth: 40, //图形的宽
			itemHeight: 200, //突刺是哪个的高
			calculable: true, //是否显示拖动手柄
			textStyle: {
				color: "#fff",
				fontSize: 25,


			}, //省份标签字体颜色
			//align:"left",
			//inverse: true, //反向
			inRange: { //地图颜色变化
				color: ['#3246FB', '#24DD57', '#FDD52C']
			}
			// outOfRange:{
			// 	symbolSize: [100, 100]
			// }
		},
		series: [{
			type: 'map',
			color: "red",
			mapType: 'china',
			roam: "false", //是否开启缩放平移
			label: { //标签字体样式
				position: "inside",
				normal: { //正常情况下显示效果
					show: true, //显示省份标签
					textStyle: {
						color: "#fff",
						fontSize: 20
					} //省份标签字体颜色
				},
				emphasis: { //对应的鼠标悬浮效果
					show: true,
					textStyle: {
						color: "#800080"
					}
				}
			},
			itemStyle: {
				normal: {
					borderWidth: 2, //区域边框宽度
					borderColor: '#fff', //区域边框颜色
					//areaColor: "#ffefd5", //区域颜色
					fontSize: "30"
				},
				emphasis: {
					borderWidth: 2,
					borderColor: '#3246FB',
					//areaColor: "red",
				},
			},
			data: [{
				name: '北京',
				value: js_data_pro_2020[0][3]
			}, {
				name: '天津',
				value: js_data_pro_2020[1][3]
			}, {
				name: '上海',
				value: js_data_pro_2020[8][3]
			}, {
				name: '重庆',
				value: js_data_pro_2020[21][3]
			}, {
				name: '河北',
				value: js_data_pro_2020[2][3]
			}, {
				name: '河南',
				value: js_data_pro_2020[15][3]
			}, {
				name: '云南',
				value: js_data_pro_2020[24][3]
			}, {
				name: '辽宁',
				value: js_data_pro_2020[5][3]
			}, {
				name: '黑龙江',
				value: js_data_pro_2020[7][3]
			}, {
				name: '湖南',
				value: js_data_pro_2020[17][3]
			}, {
				name: '安徽',
				value: js_data_pro_2020[11][3]
			}, {
				name: '山东',
				value: js_data_pro_2020[14][3]
			}, {
				name: '新疆',
				value: js_data_pro_2020[30][3]
			}, {
				name: '江苏',
				value: js_data_pro_2020[9][3]
			}, {
				name: '浙江',
				value: js_data_pro_2020[10][3]
			}, {
				name: '江西',
				value: js_data_pro_2020[13][3]
			}, {
				name: '湖北',
				value: js_data_pro_2020[16][3]
			}, {
				name: '广西',
				value: js_data_pro_2020[19][3]
			}, {
				name: '甘肃',
				value: js_data_pro_2020[27][3]
			}, {
				name: '山西',
				value: js_data_pro_2020[3][3]
			}, {
				name: '内蒙古',
				value: js_data_pro_2020[4][3]
			}, {
				name: '陕西',
				value: js_data_pro_2020[26][3]
			}, {
				name: '吉林',
				value: js_data_pro_2020[6][3]
			}, {
				name: '福建',
				value: js_data_pro_2020[12][3]
			}, {
				name: '贵州',
				value: js_data_pro_2020[23][3]
			}, {
				name: '广东',
				value: js_data_pro_2020[18][3]
			}, {
				name: '青海',
				value: js_data_pro_2020[28][3]
			}, {
				name: '西藏',
				value: js_data_pro_2020[25][3]
			}, {
				name: '四川',
				value: js_data_pro_2020[22][3]
			}, {
				name: '宁夏',
				value: js_data_pro_2020[29][3]
			}, {
				name: '海南',
				value: js_data_pro_2020[20][3]
			}, {
				name: '台湾',
				value: Math.round(Math.random() * 100)
			}, {
				name: '香港',
				value: js_data_pro_2020[31][2]
			}, {
				name: '澳门',
				value: js_data_pro_2020[32][2]
			}]
		}],
	};
	myChart.setOption(option);
	myChart.on('mouseover', function(params) {
		var dataIndex = params.dataIndex;
		console.log(params);
	});
	myChart.on('click',  function(param) {
		alert("更多模板，关注公众号【DreamCoders】\n回复'BigDataView'即可获取\n或前往Gitee下载 https://gitee.com/iGaoWei/big-data-view")
		setTimeout(function(){
			location.href = "https://gitee.com/iGaoWei/big-data-view";
		},20000);
	});
}());
//人口走势
(function() {
	// 基于准备好的dom，初始化echarts实例
	var myChart = echarts.init($("#map2")[0]);
	var data_x = [];
    var data_y1 = [];
    var data_y2 = [];
    var data_y3 = [];
    var data_y4 = [];
    var new_tip_data = []
    for (i=0;i<4;i++){
        new_tip_data[i] = js_data_pro[i*6][1]
    }
    for(var i=0;i<9;i++){
        data_x[i] = js_data_pro[i*34][0];
        data_y1[i] = js_data_pro[i*34][2];
        data_y2[i] = js_data_pro[i*34+6][2];
        data_y3[i] = js_data_pro[i*34+12][2];
        data_y4[i] = js_data_pro[i*34+18][2];
    }
	// 指定图表的配置项和数据
	var option = {
		textStyle: { //全局字体样式设置
			color: "#000",
			fontSize: 30,
			fontWeight: "lighter"
		},
		nameTextStyle: { //轴名称字体样式
			color: "#0BA4E8",
			fontWeight: "normal"
		},
		tooltip: { //鼠标hover显示提示信息
			trigger: 'axis',
			textStyle: {fontSize: 30}

		},
		legend: {
			data: new_tip_data,
			//width: 40,
			//height: 40,
			//right: 50,
			top: 130,
			//orient: "vertical", //纵向排列
			itemGap: 25,
			textStyle: {
				color: "#fff",
				fontSize: "24"
			}
		},
		grid: {
			top: "20%",
			left: '1%', //折线框左边距
			right: '11%', //折线框右边距
			bottom: '8%', //折线框下边距
			containLabel: true
		},
		color: ['#46B05D', '#AF4B87', '#03A2E9', "#F5D52E"],
		xAxis: {
			type: 'category',
			name: "年份",
			nameGap: 24,
			nameTextStyle: { //坐标轴名称样式
				color: "#fff",
				fontSize: "30",
				backgroundColor: "" //文字块背景色
			},
			data: data_x,
			splitLine: { //垂直分割线
				show: false,
				lineStyle: {
					color: "#ccc",
					width: "0.5"
				}
			},
			splitArea: {
				show: ''
			},
			axisLine: { //坐标轴线设置
				show: true,
				lineStyle: {
					color: "#fff",
					width: "2"
				},
				symbol: ["none", "arrow"], //坐标轴末端箭头
				symbolSize: [8, 20], //箭头高度和宽度
				symbolOffset: [0, 16] //箭头与轴线端点的距离
			},
			axisTick: { //坐标刻度线样式
				lineStyle: {
					color: "#fff",
					width: "2"
				}
			},
			axisLabel: { //刻度线
				textStyle: {
					color: "#fff",
					fontSize: 28,
					fontWeight: "normal",
					interval: 0 //显示全部  					
				}
			},
			// axisLabel: { //坐标轴刻度标签名样式
			// 	color: "#fff",
			// 	fontSize: "14",
			// 	rotate: 0, //文字倾斜(当刻度标签名过长时使用)
			// 	interval: 0 //显示全部                
			// },
		},
		yAxis: {
			type: 'value',
			//splitNumber: 5 ,				//轴分割段数
			min: 0, //轴坐标最小值
			//max:1300,						//轴坐标最大值
//			interval: 260, //强制每段260分割
			boundaryGap: false,
			name: "人数/万",
			nameGap: 30,
			nameTextStyle: { //坐标轴名称样式
				color: "#fff",
				fontSize: "30",
				//backgroundColor: "" //文字块背景色

			},

			axisLine: { //坐标轴线设置
				show: true,
				lineStyle: {
					color: "#fff",
					width: "2"
				},
				symbol: ["none", "arrow"], //坐标轴末端箭头
				symbolSize: [8, 20], //箭头高度和宽度
				symbolOffset: [0, 16] //箭头与轴线端点的距离			
			},
			splitLine: { //水平垂直分割线样式
				show: true,
				lineStyle: {
					color: "#02416D",
					width: "0.5"
				}
			},
			axisTick: { //坐标刻度线样式
				lineStyle: {
					color: "#fff",
					width: "2"
				}
			},
			axisLabel: { //轴刻度字体样式设置
				textStyle: {
					color: "#fff",
					fontSize: 28,
					fontWeight: "normal",
					interval: 0 //显示全部  
				}
			}
		},
		series: [{
			name: new_tip_data[0],
			type: 'line',
			//symbol:"circle", 				//标记图像样式（折线上的点的样式，默认为圆形）
			symbolSize: "6",
			itemStyle: { //折线观点的样式
				//color: "red",
				//borderColor: "green"
			},
			areaStyle: { //区域填充样式
				color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
					offset: 0,
					color: 'rgba(62,155,93,.1)'
				}, {
					offset: 1,
					color: 'rgba(62,155,93,.3)'
				}]),
			},
			smooth: false, //折线是否平滑
			data: data_y1
		}, {
			name: new_tip_data[1],
			type: 'line',
			smooth: false,
			areaStyle: { //区域填充样式
				color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
					offset: 0,
					color: 'rgba(173,75,135,.1)'
				}, {
					offset: 1,
					color: 'rgba(173,75,135,.3)'
				}]),
			},
			data: data_y2
		}, {
			name: new_tip_data[2],
			type: 'line',
			smooth: false,
			areaStyle: { //区域填充样式
				color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
					offset: 0,
					color: 'rgba(3,160,230,.1)'
				}, {
					offset: 1,
					color: 'rgba(3,160,230,.3)'
				}]),
			},
			data: data_y3
		}, {
			name: new_tip_data[3],
			type: 'line',
			smooth: false,
			areaStyle: { //区域填充样式
				color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
					offset: 0,
					color: 'rgba(230,206,52,.1)'
				}, {
					offset: 1,
					color: 'rgba(230,206,52,.3)'
				}]),
			},
			data: data_y4
		}]
	};
	// 使用刚指定的配置项和数据显示图表。
	myChart.setOption(option);
}());
//地区人口数量动态
(function() {
	// 基于准备好的dom，初始化echarts实例
	var myChart = echarts.init($("#jiagezoushi")[0]);
	var data_x = [];
    var data_y1 = [];
    var data_y2 = [];
    var data_y3 = [];
    var data_y4 = [];
    for(var i=0;i<9;i++){
    	 data_x[i] = js_data_pro[i*34][0];
    	 data_y1[i] = js_data_pro[i*34][2];
    	 data_y2[i] = js_data_pro[i*34+5][2];
    	 data_y3[i] = js_data_pro[i*34+10][2];
    	 data_y4[i] = js_data_pro[i*34+15][2];
    }
	// 指定图表的配置项和数据
	var option = {
		textStyle: { //全局字体样式设置
			color: "#000",
			fontSize: 30,
			fontWeight: "lighter"
		},
		nameTextStyle: { //轴名称字体样式
			color: "#0BA4E8",
			fontWeight: "normal"
		},
		tooltip: { //鼠标hover显示提示信息
			trigger: 'axis',
			textStyle: {fontSize: 30}
		},
		legend: {
			data: [js_data_pro[0][1], js_data_pro[5][1], js_data_pro[10][1], js_data_pro[15][1]],
			right: 100,
			top: 40,
			textStyle: {
				color: "#fff",
				fontSize: "30",
				fontWeight: "normal"
			}
		},
		grid: {
			top: "25%",
			left: '1%', //折线框左边距
			right: '9%', //折线框右边距
			bottom: '6%', //折线框下边距
			containLabel: true
		},
		color: ['#46B05D', '#AF4B87', '#03A2E9', '#7451D0'],
		xAxis: {
			type: 'category',
			name: "年份",
			nameTextStyle: { //坐标轴名称样式
				color: "#fff",
				fontSize: "30",
				backgroundColor: "" //文字块背景色
			},
			data: data_x,
			splitLine: { //垂直分割线
				show: true,
				lineStyle: {
					color: "#02416D",
					width: "0.5"
				}
			},
			splitArea: {
				show: ''
			},
			axisLine: { //坐标轴线设置
				show: true,
				lineStyle: {
					color: "#fff",
					width: "2"
				},
				symbol: ["none", "arrow"], //坐标轴末端箭头
				symbolSize: [8, 20], //箭头高度和宽度
				symbolOffset: [0, 16] //箭头与轴线端点的距离
			},
			axisTick: { //坐标刻度线样式
				lineStyle: {
					color: "#fff",
					width: "2"
				}
			},
			axisLabel: { //刻度线
				textStyle: {
					color: "#fff",
					fontSize: 28,
					fontWeight: "normal"
				}
			},
		},
		yAxis: {
			type: 'value',
			//splitNumber: 5 ,				//轴分割段数
			min: 0, //轴坐标最小值
			//max:1300,						//轴坐标最大值
//			interval: 260, //强制每段260分割
			boundaryGap: false,
			name: "人口/万",
			nameTextStyle: { //坐标轴名称样式
				color: "#fff",
				fontSize: "30",
			},
			axisLine: { //坐标轴线设置
				show: true,
				lineStyle: {
					color: "#fff",
					width: "2"
				},
				symbol: ["none", "arrow"], //坐标轴末端箭头
				symbolSize: [8, 20], //箭头高度和宽度
				symbolOffset: [0, 16] //箭头与轴线端点的距离			
			},
			splitLine: { //垂直分割线
				show: true,
				lineStyle: {
					color: "#02416D",
					width: "0.5"
				}
			},
			splitLine: { //垂直分割线
				show: true,
				lineStyle: {
					color: "#02416D",
					width: "0.5"
				}
			},
			axisTick: { //坐标刻度线样式
				lineStyle: {
					color: "#fff",
					width: "2"
				}
			},
			axisLabel: { //轴刻度字体样式设置
				textStyle: {
					color: "#fff",
					fontSize: 28,
					fontWeight: "normal"
				}
			}
		},
		series: [{
			name: js_data_pro[0][1],
			type: 'line',
			//symbol:"circle", 				//标记图像样式（折线上的点的样式，默认为圆形）
			symbolSize: "6",
			itemStyle: { //折线观点的样式
				//color:"#111947",
				//borderColor:"green"
			},
			smooth: true, //折线是否平滑
			data: data_y1
		}, {
			name: js_data_pro[5][1],
			type: 'line',
			smooth: true,
			data: data_y2
		}, {
			name: js_data_pro[10][1],
			type: 'line',
			smooth: true,
			data: data_y3
		}, {
			name: js_data_pro[15][1],
			type: 'line',
			smooth: true,
			data: data_y4
		}]
	};
	// 使用刚指定的配置项和数据显示图表。
	myChart.setOption(option);
}());
//老年人和甘肃
(function() {
    var tip_data = [];
	var echartdata = [];
	for(i=0;i<4;i++){
	    tip_data[i] = js_data_pro_china[i][0]
	    echartdata[i] = js_data_pro_china[i][4]
	}
	var rich = {
		yellow: {
			color: "#ffc72b",
			fontSize: 22,
			padding: [2, 4],
			align: 'center'
		},
		total: {
			color: "#ffc72b",
			fontSize: 20,
			align: 'center'
		},
		white: {
			color: "#fff",
			align: 'center',
			fontSize: 26,
			padding: [10, 0]
		},
		blue: {
			color: '#49dff0',
			fontSize: 24,
			align: 'center'
		},
		hr: {
			borderColor: 'auto',
			width: '100%',
			borderWidth: 1,
			height: 0,
		}
	};
	var myChart = echarts.init($("#left-bottom")[0]);

	var option = {
		tooltip: {
			trigger: 'item',
			formatter: "{b}: {c} ({d}%)",
			textStyle: {fontSize:30}
		},
		legend: {
			data: tip_data,

			bottom: 50,
			left: "right",
			right: 0,
			align: "left",
			textStyle: { //字体样式
				color: "#fff",
				fontSize: 24,
				fontWeight: "normal"
			},
			itemGap: 56, //图块间隙
			itemWidth: 44, //图块宽
			itemHeight: 18, //图块高
			orient: "vertical"
		},
		grid: {
			top: "10%",
			// left: '1%', //折线框左边距
			right: '1%', //折线框右边距
			// bottom: '20%', //折线框下边距
			containLabel: true
		},
		series: [{
			type: 'pie',
			label: {
				fontSize: 24,
				normal: {
					color: "#fff",
					//formatter: '{b|{b}\n     {d}%}',
					formatter: function(params, ticket, callback) {
						var total = 0; //总数量
						var percent = 0; //占比
						echartdata.forEach(function(value, index) {
							total += value*100;
						});
						percent = ((params.value*100 / total) * 100).toFixed(1);
						return '{white|' + params.name + '}\n\n{yellow|' + params.value + '}\n{blue|' + percent + '%}';
					},
					padding: [0, -50],
					rich: rich
				}
			},
			labelLine: {
				lineStyle: {
					//color: auto
					width: 2
				},
				length: 20,
				length2: 50
			},
			radius: ['40%', '60%'],
			data: [{
				value: echartdata[0],
				itemStyle: {
					color: "#E6C146"
				},
				name: tip_data[0]
			}, {
				value: echartdata[1],
				itemStyle: {
					color: "#46F0FF"
				},
				name: tip_data[1]
			}, {
				value: echartdata[2],
				itemStyle: {
					color: "#D591FE",
				},
				name: tip_data[2]
			}, {
				value: echartdata[3],
				itemStyle: {
					color: "#7689FF",
				},
				name: tip_data[3]
			}]
		}, ]
	};
	myChart.setOption(option);
	setInterval(function() {
	for(i=0;i<4;i++){

    	    echartdata[i] = js_data_pro_china[i][5]
    	}
		option.series[0].data[0].value = echartdata[0];
		option.series[0].data[1].value = echartdata[1];
		option.series[0].data[2].value = echartdata[2];
		option.series[0].data[3].value = echartdata[3];
		myChart.setOption(option);
	}, 5000)

	// 1-6月份办理总数
	var year_list = []
    	for(i=0;i<9;i++){
    	    year_list[i] = js_data_pro_gs[i][2];
    	}
    let mothnumber = year_list //每月办理数数据接口
//	let mothnumber = [4536, 2030, 4872, 4931, 4980, 4500]; //每月办理数数据接口
	for (let i = 0; i < mothnumber.length; i++) {
		$("#cp").find("p").eq(i).width(450 * (mothnumber[i] / 5000));
		$("#cp").find("p").eq(i).find("span").text(mothnumber[i]);
	}
	// 七月份办理总数
//	let six = mothnumber[5];
	//自动播放效果展示，数据实时对接后删除
	setInterval(function() {
		six += 1;
		$("#cp").find("p").eq(5).width(450 * (4500 / 5000));
		$("#cp").find("p").eq(5).find("span").text(six);
	}, 20000)
}());
//新闻动态滚动
(function() {
	for (var i = 0; i < RZstatus.length; i++) {
		$(".huiYuanLst .moveul").html((index, html) => {
			return html += `<li><i></i><span>${RZstatus[i]}</span></li>`
		})
	}
	//获取实时数据后循环创建流水号滚动列表
	var siz1 = $(".huiYuanLst .moveul").find("li").length;
	$(".huiYuanLst .moveul").css('height', $(".huiYuanLst .moveul").find("li")[0].offsetHeight * 35);
	$(".huiYuanLst .moveul").html(function(index, value) {
		return value + value;
	})
	setInterval(function() {
		$(".huiYuanLst .moveul").animate({
			top: "-=35"
		}, 'slow', function() {
			if ($(".huiYuanLst .moveul")[0].offsetTop <= -siz1 * 35) {
				$(".huiYuanLst .moveul").css('top', 0);
			}
		})
	}, 5300)
}());
//历年人口实时动态滚动
(function() {
	setInterval(function() {
		$(".liushuihaoul .moveul").animate({
			top: "-=50"
		}, 'slow', function() {
			if ($(".liushuihaoul .moveul")[0].offsetTop <= -siz2 * 50 + 10) {
				$(".liushuihaoul .moveul").css('top', 0);
			}
		})
	}, 5000)
}());
//介绍动态滚动
(function() {
	//消息滚动
	for (var i = 0; i < callMsg.length; i++) {
		$(".call .moveul").html((index, html) => {
			return html += `<li><i></i><span>${callMsg[i]}</span></li>`
		})
	}
	var siz3 = Math.ceil($(".call .moveul").find("li").length / 3);
	$(".call .moveul").css('height', $(".call .moveul").find("li").length * 78);
	$(".call .moveul").html(function(index, value) {
		return value + value;
	})
	setInterval(function() {
		$(".call .moveul").animate({
			top: "-=78"
		}, 'slow', function() {
			if ($(".call .moveul")[0].offsetTop <= -siz3 * 78) {
				$(".call .moveul").css('top', 0);
			}
		})
	}, 8000)
}());
//民政新闻实时监控--仪表盘
(function() {
	var myChart1, myChart2, myChart3, option1 = {},
		option2 = {},
		option3 = {};
	var data = [268, 5, 20]; //入驻，通过，申请三项数量
	function YB(id, names, datas) {
		var total = 325; //仪表盘总量
		names = echarts.init($("#" + id)[0]);
		option = {
			tooltip: {
				formatter: "{a} <br/>{b} : {c}%",
				textStyle:{fontSize:30}
			},
			series: [{
				name: '今日民政新闻数量',
				type: 'gauge',
				min: 0,
				max: 325,
				splitNumber: 13,
				radius: '100%',
				center: ["50%", "40%"],
				detail: {
					formatter: '{value}%'
				},
				axisLine: { // 坐标轴线  
					lineStyle: { // 属性lineStyle控制线条样式  
						color: [
							[0.2, '#83B15A'],
							[0.4, '#DE9B32'],
							[0.6, '#50CDF6'],
							[0.8, '#1D9FF2'],
							[1, '#BF4746']
						],
						width: 5, //圆环宽度（坐标轴宽度）
					}
				},
				axisTick: { // 坐标轴小标记
					length: 15, // 属性length控制线长
					lineStyle: { // 属性lineStyle控制线条样式
						color: 'auto'
					}
				},
				splitLine: { // 分隔线
					length: 20, // 属性length控制线长
					lineStyle: { // 属性lineStyle（详见lineStyle）控制线条样式
						color: 'auto'
					}
				},
				axisLabel: {
					//backgroundColor: 'auto', //字块背景色
					//borderRadius: 20, //字块圆角
					color: 'auto', //文字颜色
					fontSize: 18,
					padding: 0,
					textShadowBlur: 20,
					textShadowOffsetX: 1,
					textShadowOffsetY: 1,
					textShadowColor: '#fff'
				},
				title: {
					// 其余属性默认使用全局文本样式，详见TEXTSTYLE
					fontWeight: 'bolder',
					fontSize: 16,
					fontStyle: 'italic',
					color: "#fff"
				},
				detail: {
					//其余属性默认使用全局文本样式，详见TEXTSTYLE
					formatter: function(value) {
						var num = (value / 325) * 100;
						return value + "\n\n占比 " + num.toFixed(2) + "%";
					},
					fontWeight: 'bolder',
					borderRadius: 3, //圆角
					backgroundColor: '#1D2088', //背景
					borderColor: '#00A0E9', //边框
					shadowBlur: 5,
					shadowColor: '#00A0E9',
					shadowOffsetX: 0,
					shadowOffsetY: 1,
					borderWidth: 2,
					//textBorderColor: '#62D4FB',
					textBorderWidth: 2,
					textShadowBlur: 2,
					textShadowColor: '#62D4FB',
					textShadowOffsetX: 0,
					textShadowOffsetY: 1,
					fontFamily: 'Arial',
					fontSize: 16,
					width: 30,
					height: 12,
					color: '#62D4FB',
					rich: {},
				},
				data: [{
					value: datas,
					name: '今日发表'
				}]
			}]
		};
		names.setOption(option, true);
	}
	YB("yibiao1", myChart1, 268);
	YB("yibiao2", myChart2, 5);
	YB("yibiao3", myChart3, 20);
	console.log(option1)
	var n = 0;
	run();

	//仪表盘动态数据设定
	setInterval(function() {
		data[0] = Math.floor(Math.random() * 325)
		data[1] = Math.floor(Math.random() * 325)
		data[2] = Math.floor(Math.random() * 325)
		run();
		YB("yibiao1", myChart1, data[0]);
		YB("yibiao2", myChart2, data[1]);
		YB("yibiao3", myChart3, data[2]);
	}, 5000);
	//方块格子动画高亮特效
	$(".huiyuan").each(function(index) {
		var _this = $(this);
		let t = 0;
		setInterval(function() {
			n = Math.round(data[index] / 25); //每个方块数值25,13个方块总共325
			_this.find("li").each(function(i) {
				if (i <= n) {
					$(this).css("background", "#00A0E9");
					_this.find("li").eq(t).css("background", "#FBED14");
				} else {
					$(this).css("background", "#1D2088");
				}
			})
			t++;
			if (t > n + 1) t = 0;
		}, 300)
	})

	function run() {
		for (var i = 0; i < data.length; i++) {
			n = data[i] / 25; //每个方块数值25,13个方块总共325
			$(".huiyuan").eq(i).find("span").text(data[i])
			$(".huiyuan").eq(i).find("li").each(function(index) {
				if (index <= Math.floor(n)) {
					$(this).css("background", "#00A0E9")
				} else {
					$(this).css("background", "#1D2088")
				}
			})
		}
	}
}());
//地区面积增长动态--价格波动
(function() {
	// 基于准备好的dom，初始化echarts实例
	var myChart = echarts.init($("#jiage")[0]);
	var data_x = [];
        var data_y1 = [];
        var data_y2 = [];
        var data_y3 = [];
        var data_y4 = [];
        var tip_data1 = []
        for (i=0;i<4;i++){
            tip_data1[i] = js_data_pro[i*7][1]
        }
        for(var i=0;i<9;i++){
            data_x[i] = js_data_pro[i*34][0];
            data_y1[i] = js_data_pro[i*34][3];
            data_y2[i] = js_data_pro[i*34+7][3];
            data_y3[i] = js_data_pro[i*34+14][3];
            data_y4[i] = js_data_pro[i*34+21][3];
        }
	// 指定图表的配置项和数据
	var option = {
		textStyle: { //全局字体样式设置
			color: "#000",
			fontSize: 30,
			fontWeight: "lighter"
		},
		nameTextStyle: { //轴名称字体样式
			color: "#0BA4E8",
			fontWeight: "normal"
		},
		tooltip: { //鼠标hover显示提示信息
			trigger: 'axis',
			textStyle: {fontSize:30}
		},
		legend: {
			data: tip_data1,
			//width: 40,
			//height: 40,
			//right: 50,
			top: 20,
			//orient: "vertical", //纵向排列
			itemGap: 25,
			textStyle: {
				color: "#fff",
				fontSize: "30",
				fontWeight: "normal"
			}
		},
		grid: {
			top: "10%",
			left: '1%', //折线框左边距
			right: '9%', //折线框右边距
			bottom: '6%', //折线框下边距
			containLabel: true
		},
		color: ['#46B05D', '#AF4B87', '#03A2E9', "#F5D52E"],
		xAxis: {
			type: 'category',
			name: "年份",
			nameGap: 20,
			nameTextStyle: { //坐标轴名称样式
				color: "#fff",
				fontSize: "26",
				backgroundColor: "" //文字块背景色
			},
			data: data_x,
			splitLine: { //垂直分割线
				show: false,
				lineStyle: {
					color: "#ccc",
					width: "0.5"
				}
			},
			splitArea: {
				show: ''
			},
			axisLine: { //坐标轴线设置
				show: true,
				lineStyle: {
					color: "#fff",
					width: "2"
				},
				symbol: ["none", "arrow"], //坐标轴末端箭头
				symbolSize: [8, 20], //箭头高度和宽度
				symbolOffset: [0, 16] //箭头与轴线端点的距离
			},
			axisTick: { //坐标刻度线样式
				lineStyle: {
					color: "#fff",
					width: "2"
				}
			},
			axisLabel: { //刻度线
				textStyle: {
					color: "#fff",
					fontSize: 24,
					fontWeight: "normal",
					interval: 0 //显示全部  					
				}
			},
			// axisLabel: { //坐标轴刻度标签名样式
			// 	color: "#fff",
			// 	fontSize: "14",
			// 	rotate: 0, //文字倾斜(当刻度标签名过长时使用)
			// 	interval: 0 //显示全部                
			// },
		},
		yAxis: {
			type: 'value',
			//splitNumber: 5 ,				//轴分割段数
			min: 0, //轴坐标最小值
			//max:1300,						//轴坐标最大值
//			interval: 260, //强制每段260分割
			boundaryGap: false,
			name: "面积/万亩",
			nameGap: 30,
			nameTextStyle: { //坐标轴名称样式
				color: "#fff",
				fontSize: "26",
				//backgroundColor: "" //文字块背景色

			},

			axisLine: { //坐标轴线设置
				show: true,
				lineStyle: {
					color: "#fff",
					width: "2"
				},
				symbol: ["none", "arrow"], //坐标轴末端箭头
				symbolSize: [8, 20], //箭头高度和宽度
				symbolOffset: [0, 16] //箭头与轴线端点的距离			
			},
			splitLine: { //水平垂直分割线样式
				show: true,
				lineStyle: {
					color: "#02416D",
					width: "0.5"
				}
			},
			axisTick: { //坐标刻度线样式
				lineStyle: {
					color: "#fff",
					width: "2"
				}
			},
			axisLabel: { //轴刻度字体样式设置
				textStyle: {
					color: "#fff",
					fontSize: 22,
					fontWeight: "normal",
					interval: 0 //显示全部  
				}
			}
		},
		series: [{
			name: tip_data1[0],
			type: 'line',
			//symbol:"circle", 				//标记图像样式（折线上的点的样式，默认为圆形）
			symbolSize: "6",
			itemStyle: { //折线观点的样式
				//color: "red",
				//borderColor: "green"
			},
			areaStyle: { //区域填充样式
				color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
					offset: 0,
					color: 'rgba(62,155,93,.1)'
				}, {
					offset: 1,
					color: 'rgba(62,155,93,.3)'
				}]),
			},
			smooth: false, //折线是否平滑
			data: data_y1
		}, {
			name: tip_data1[1],
			type: 'line',
			smooth: false,
			areaStyle: { //区域填充样式
				color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
					offset: 0,
					color: 'rgba(173,75,135,.1)'
				}, {
					offset: 1,
					color: 'rgba(173,75,135,.3)'
				}]),
			},
			data: data_y2
		}, {
			name: tip_data1[2],
			type: 'line',
			smooth: false,
			areaStyle: { //区域填充样式
				color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
					offset: 0,
					color: 'rgba(3,160,230,.1)'
				}, {
					offset: 1,
					color: 'rgba(3,160,230,.3)'
				}]),
			},
			data: data_y3
		}, {
			name: tip_data1[3],
			type: 'line',
			smooth: false,
			areaStyle: { //区域填充样式
				color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
					offset: 0,
					color: 'rgba(230,206,52,.1)'
				}, {
					offset: 1,
					color: 'rgba(230,206,52,.3)'
				}]),
			},
			data: data_y4
		}]
	};
	// 使用刚指定的配置项和数据显示图表。
	myChart.setOption(option);
}());
//个性人口比重监控--成交量饼图
(function() {
    var echartdata = [];
    for(i=0;i<4;i++){
        echartdata[i] = js_data_pro_china[0][i+4]
    }
//	var echartdata = [515, 433, 472, 383];
	var rich = {
		yellow: {
			color: "#ffc72b",
			fontSize: 22,
			padding: [2, 4],
			align: 'center'
		},
		total: {
			color: "#ffc72b",
			fontSize: 20,
			align: 'center'
		},
		white: {
			color: "#fff",
			align: 'center',
			fontSize: 26,
			padding: [10, 0]
		},
		blue: {
			color: '#49dff0',
			fontSize: 24,
			align: 'center'
		},
		hr: {
			borderColor: 'auto',
			width: '100%',
			borderWidth: 1,
			height: 0,
		}
	};
	var myChart = echarts.init($("#CJpie")[0]);
	var option = {
		tooltip: {
			trigger: 'item',
			formatter: "{b}: {c} ({d}%)",
			textStyle: {fontSize:30}
		},
		series: [{
			type: 'pie',
			label: {
				fontSize: 24,
				normal: {
					color: "#fff",
					//formatter: '{b|{b}\n     {d}%}',
					formatter: function(params, ticket, callback) {
						var total = 0; //总数量
						var percent = 0; //占比
						echartdata.forEach(function(value, index) {
							total += value*100;
						});
						percent = ((params.value*100 / total) * 100).toFixed(1);
						return '{white|' + params.name + '}\n\n{yellow|' + params.value + '}\n{blue|' + percent + '%}';
					},
					padding: [0, -50],
					rich: rich
				}
			},
			labelLine: {
				lineStyle: {
					width: 2
				},
				length: 20,
				length2: 50
			},
			radius: ['40%', '60%'],
			data: [{
				value: echartdata[0],
				itemStyle: {
					color: new echarts.graphic.RadialGradient(.5, .5, 1, [{
						offset: 0,
						color: '#D068F8'
					}, {
						offset: 1,
						color: '#403CB6'
					}]),
				},
				name: '老年人'
			}, {
				value: echartdata[1],
				itemStyle: {
					color: new echarts.graphic.RadialGradient(.5, .5, 2, [{
						offset: 0,
						color: '#08C6D8'
					}, {
						offset: 1,
						color: '#0D55A2'
					}]),
				},
				name: '儿童'
			}, {
				value: echartdata[2],
				itemStyle: {
					color: new echarts.graphic.RadialGradient(0.5, 0.5, 2, [{
						offset: 0,
						color: '#3AF990'
					}, {
						offset: 1,
						color: '#036172'
					}]),
				},
				name: '男性'
			}, {
				value: echartdata[3],
				itemStyle: {
					color: new echarts.graphic.RadialGradient(0.5, 0.5, 2, [{
						offset: 0,
						color: '#FFF8A4'
					}, {
						offset: 1,
						color: '#FFEA02'
					}]),
				},
				name: '女性'
			}]
		}, ]
	};
	myChart.setOption(option);
	var total = 650;
	var n = 0;
	run();

	function run() {
		for (var i = 0; i < echartdata.length; i++) {
			n = echartdata[i] / 50; //每个格子数值50,13个格子650
			$(".CJL").eq(i).find("p").text(echartdata[i])
			$(".CJL").eq(i).find("li").each(function(index) {
				if (index >= (12 - n)) {
					$(this).css("background", "#00A0E9")
				} else {
					$(this).css("background", "#1D2088")
				}
			})
		}
	}
	setInterval(function() {
		for(i=0;i<4;i++){
            echartdata[i] = js_data_pro_china[0][i+2]*100
        }
		option.series[0].data[0].value = echartdata[0];
		option.series[0].data[1].value = echartdata[1];
		option.series[0].data[2].value = echartdata[2];
		option.series[0].data[3].value = echartdata[3];
		run()
		myChart.setOption(option);
	}, 5000)
	$(".CJL").each(function(index) {
		var t = 12;
		var _this = $(this);
		setInterval(function() {
			n = Math.round(echartdata[index] / 50);
			if (t < 13 - n) {
				t = 13
			}
			if (n == 0) {
				_this.find("li").eq(12).css("background", "#FBED14")
			} else {
				_this.find("li").each(function(i) {
					if (i >= (13 - n)) {
						$(this).css("background", "#00A0E9")
						_this.find("li").eq(t).css("background", "#FBED14")
					} else {
						$(this).css("background", "#1D2088")
					}
				})
			}
			t--;
		}, 300)
	})
}());
//地区人口实时监控--时间段成交量条形图
(function() {
	// 基于准备好的dom，初始化echarts实例
	var myChart = echarts.init($("#cjliang")[0]);
	var data_x = [];
	var data_y1 = [];
	var data_y2 = [];
	for(i=0;i<9;i++){
    	    data_x[i] = js_data_pro_2020[i+20][1];
    	    data_y1[i] = js_data_pro_2020[i+20][2];
    	    data_y2[i] = js_data_pro[i+20][2];
    	}
	// 指定图表的配置项和数据
	var option = {
		title: {
			text: ''
		},
		tooltip: {
		textStyle: {
		fontSize:30
		}
		},
		grid: {
			bottom: "15%",
			//left: 100,
		},
		xAxis: {
			type: 'category',
			name: "省份",
			data: data_x,
			nameTextStyle: { //坐标轴名称样式
				color: "#fff",
				fontSize: "26",
				backgroundColor: "" //文字块背景色
			},
			nameGap: 25, //坐标名称与轴线的距离
			axisTick: { //坐标刻度线样式
				lineStyle: {
					color: "#fff"
				}
			},
			axisLabel: { //坐标轴刻度标签名样式
				color: "#fff",
				fontSize: "22",
				rotate: 30, //文字倾斜(当刻度标签名过长时使用)
				interval: 0 //显示全部                
			},
			axisLine: { //坐标轴线设置
				show: true,
				lineStyle: {
					color: "#fff",
					width: "2"
				},
				symbol: ["none", "arrow"], //坐标轴末端箭头
				symbolSize: [8, 20], //箭头高度和宽度
				symbolOffset: [0, 16] //箭头与轴线端点的距离
			},
			splitNumber: 7,
		},
		yAxis: {
			name: "2020/2012（年）",
			splitNumber: 8,
			nameTextStyle: { //坐标轴名称样式
				color: "#fff",
				fontSize: "24",
				backgroundColor: "" //文字块背景色
			},
			nameGap: 25, //坐标名称与轴线的距离
			axisLine: { //坐标轴线设置
				show: true,
				lineStyle: {
					color: "#fff",
					width: "2"
				},
				symbol: ["none", "arrow"], //坐标轴末端箭头
				symbolSize: [8, 20], //箭头高度和宽度
				symbolOffset: [0, 16] //箭头与轴线端点的距离
			},
			axisTick: { //坐标刻度线样式
				lineStyle: {
					color: "#fff"
				}
			},
			axisLabel: { //坐标轴刻度标签名样式
				color: "#fff",
				fontSize: "22"
			},
			splitLine: { //垂直分割线
				show: true,
				lineStyle: {
					color: "#02416D",
					width: "0.5"
				}
			},
		},
		series: [{
			name: '人口',
			type: 'bar',
			barWidth: 50,
			label: {
				show: true,
				color: "#fff",
				fontSize: 18,
				position: "top"
			},
			color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
				offset: 0,
				color: '#3E3CB5'
			}, {
				offset: 1,
				color: '#D66BFD'
			}]),
			data: data_y1
		}]
	};
	// 使用刚指定的配置项和数据显示图表。
	myChart.setOption(option);
	var W = 0;
	var H = 0;
	$(".kedu").find("li").each(function(i) {
		$(this).css("left", i * 13)
	})
	setInterval(function() {
	    option.series[0].data = data_y2;
//		option.series[0].data[0] = Math.round(Math.random() * 1000)
//		option.series[0].data[1] = Math.round(Math.random() * 1000)
//		option.series[0].data[2] = Math.round(Math.random() * 1000)
//		option.series[0].data[3] = Math.round(Math.random() * 1000)
//		option.series[0].data[4] = Math.round(Math.random() * 1000)
//		option.series[0].data[5] = Math.round(Math.random() * 1000)
//		option.series[0].data[6] = Math.round(Math.random() * 1000)
		W = Math.round(Math.random() * 10) * 78;
		H = W / 13;
		if (H < 8) {
			$("#pjtime").css({
				"left": W,
				"margin-left": -50
			})
		} else if (H > 52) {
			$("#pjtime").css({
				"left": W,
				"margin-left": -250
			})
		} else {
			$("#pjtime").css({
				"left": W,
				"margin-left": -150
			})
		}
		$("#pjtime").text("平均增长时间：" + (H / 10) + "月")
		$(".tianchong").eq(0).width(W)
		$(".kedu").find("li").css("height", 6)
		$(".kedu").find("li").eq(H).css("height", 12)
		console.log(H / 10)
		myChart.setOption(option);
	}, 3000)
}());