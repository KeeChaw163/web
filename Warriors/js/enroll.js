window.onload = function(){
    document.getElementById("form").onsubmit = function(){
        return checkUsername() && checkPassword() && checkTel();
    };
    document.getElementById("username").onblur = checkUsername;
    document.getElementById("password").onblur = checkPassword;
	document.getElementById("tel").onblur = checkTel;
};
        
function checkUsername(){
    var username = document.getElementById("username").value;
    var reg_username = /^[a-zA-Z][a-zA-Z0-9_]{5,14}$/; //(字母开头，允许6-15字节，允许字母数字下划线)
    var flag = reg_username.test(username);
    var s_username = document.getElementById("s_username");
    if(flag){
        s_username.innerHTML = "<img width='35' height='25' src='img/true.png'/>";
    }else{
        s_username.innerHTML = "用户名格式有误";
    }
     return flag;
}
        
function checkPassword(){
    var password = document.getElementById("password").value;
    var reg_password = /^[a-zA-Z]\w{5,17}$/; //(以字母开头，长度在6~18之间，只能包含字母、数字和下划线)
    var flag = reg_password.test(password);
    var s_password = document.getElementById("s_password");
    if(flag){
        s_password.innerHTML = "<img width='35' height='25' src='img/true.png'/>";
    }else{
        s_password.innerHTML = "密码格式有误";
    }
    return flag;
}

function checkTel(){
    var tel = document.getElementById("tel").value;
    var reg_tel = /^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/; 
    var flag = reg_tel.test(tel);
    var s_tel = document.getElementById("s_tel");
    if(flag){
        s_tel.innerHTML = "<img width='35' height='25' src='img/true.png'/>";
    }else{
        s_tel.innerHTML = "手机号格式有误";
    }
    return flag;
}
