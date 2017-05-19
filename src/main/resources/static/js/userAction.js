var username, password, $elementEdit;

$(function(){

    $("#btnRegister").attr('disabled' , true);
    $("#registerUsername").keyup(function () {
        var username = $('#registerUsername').val();
        var params = ({username:username});
        if(username.length == 0){
            $('#notExist').hide();
            $('#exist').hide();
            $("#btnRegister").attr('disabled' , true);
            return;
        }
        $.ajax({
            type:"post",
            url:"check-username",
            data:params,
            success: function(data){
                console.log(data);
                if(data =="no") {
                    $('#notExist').hide();
                    $('#exist').show();
                    $("#btnRegister").attr('disabled' , true);
                } else {
                    $('#exist').hide();
                    $('#notExist').show();
                    $("#btnRegister").attr('disabled' , false);
                }

            }
        });
    });

    //注册时发送数据到服务器
    $("#btnRegister").click(function(){
        if($('#registerUsername').val() == "")
        {
            alert("用户名不能为空！！");
            return;
        }
        if($('#registerPassword').val() == "")
        {
            alert("密码不能为空！！");
            return;
        }

        //序列化表单元素，返回json数据
        var params = $("#userForm").serializeArray();
        console.log(params);
        //也可以把表单之外的元素按照name value的格式存进来
        //params.push({name:"hello",value:"man"});
        $.ajax({
            type:"post",
            url:"create",
            data:params,
            success: function(data){
                if(data === "no")
                    alert("用户名已存在！！");
            }
        });
    });
    $("#btnSignIn").click(function(){
        //序列化表单元素，返回json数据

        var params = $("#signInBlock").serializeArray();
        console.log(params);
        //也可以把表单之外的元素按照name value的格式存进来
        //params.push({name:"hello",value:"man"});
        $.ajax({
            type:"post",
            url:"login",
            data:params,
            success: function(data){
                console.log(data);

                if (data =="normal")
                    window.location.href="/m";
                else if (data =="super"){
                    window.location.href="/s";
                }
                else
                    alert("用户名或密码错误！！");
            }
        });
    });
    var html1 = $("#user_table").html();
    function getUserList(){
        //序列化表单元素，返回json数据


        //也可以把表单之外的元素按照name value的格式存进来
        //params.push({name:"hello",value:"man"});
        $.ajax({
            type:"post",
            url:"findall",

            success: function(data){
                var html = html1;


                for (var i=0; i<data.length;i++) {
                    if (data[i].priority == 0) {
                        html += "<tr><td>" + data[i].id + "</td><td>" + data[i].username + "</td><td>" + data[i].password + "</td>";
                    }
                    else {
                        html += "<tr class='danger'><td>" + data[i].id + "</td><td>" + data[i].username + "</td><td>" + "<kbd>超级用户</kbd>";
                    }
                    html +=
                        "<td>" +
                        "<div class=\"btn-group btn-group-sm\" >" +
                        "<button type=\"button\" class=\"btn btn-default edit-btns\" onclick='editbtnClick("+data[i].id+")'>" +
                        "<span class=\"glyphicon glyphicon-edit\">升级</span>" +
                        "<button type=\"button\" class=\"btn btn-danger remove-btns\" onclick='removebtnClick("+data[i].id+")'>" +
                        "<span class=\"glyphicon glyphicon-remove\"></span>" +
                        "</button>" +
                        "</div>" + "</td>" + "</tr>";

                }

                $("#user_table").html(html);

                $(".danger button").each(functi1on(){
                    $(this).attr("disabled", true);
                });

            }

        });

    };
    getUserList();

    $('#aRegister').click(function(){
        $('#registerUsername').val("");
        $('#registerPassword').val("");
    });


    //登录的验证
    // $('#btnSignIn').click(function () {
    //     username = $('#signInUsername').val();
    //     password = $('#signInPassword').val();
    //     var usrInfo = {username: username, password: password};
    //     $.post('/api/users/userAuthentication', usrInfo, function(data, status){
    //         if(data.length > 0){
    //             $('#signInUsername').val("");
    //             $('#signInPassword').val("");
    //             $('#signInBlock').hide(600);
    //             $('#mytab').show(600);
    //             $('.tab-content').show();
    //             $('.tab-pane.fade').show(600);
    //             $('.dropdown-toggle').fadeIn(200);
    //
    //             //登录后获得该用户的ToDoList列表
    //             $.get('/api/users/todolist?username=' + data[0].username, function(data, status){
    //                 for(var i in data){
    //                     var deadline = data[i].deadline;
    //                     var type = getType(deadline);
    //
    //                     if(data[i].state == 'doing' && type == 'outDate') {
    //                         updateList(data[i], '#outDate');
    //                     } else if(data[i].state == 'doing') {
    //                         updateList(data[i], '#doingList');
    //                     } else if(data[i].state == 'done') {
    //                         updateList(data[i], '#doneList');
    //                     }
    //                 }
    //                 $('#doingList tbody tr').each(function () {
    //                     var deadline = $(this).children().first().next().text();
    //                     var type = getType(deadline);
    //                     $(this).addClass(type);
    //                 });
    //
    //                 $('#doneList tbody tr').each(function () {
    //                     $(this).addClass('success');
    //                 });
    //                 $('.tab-pane').each(function(){
    //                     $(this).removeAttr('style');
    //                 });
    //             });
    //         } else{
    //             alert('登录失败，请检查用户名以及密码！');
    //         }
    //     });
    // });

    //退出按钮
    $('#signout').click(function(){
        history.back();
    });

});

//编辑按钮的逻辑
function editbtnClick(id){
    var params;
    var update_id = id;
    params=({id:update_id});

    $.ajax({
        type: 'POST',
        url: "update",
        data: params,
        success: function (data) {
            window.location.href="/s";

        }
    });
}

function removebtnClick(id){
    var params;
    var delete_id = id;
    params=({id:delete_id});

    $.ajax({
        type: 'POST',
        url: "delete",
        data: params,
        success: function (data) {
            window.location.href="/s";

        }
    });
}


