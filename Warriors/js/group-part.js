/*球队分区切换板块*/

function $(id){return document.getElementById(id);}/*获取元素*/
function changeImage(){
	var o=$("group");
	var index=o.selectedIndex;//获取下拉框中的选择项
	$("show").src=$("group").options[index].value;  //更改图片
}