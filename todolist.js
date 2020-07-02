$(function(){

	var todoData = [];

	load();

    //1 text文本框中输入数据，需要将输入的数据添加到页面中去
	$("#title").on("keydown",function(ev){

		if (ev.keyCode === 13) {

		    if($(this).val() === ""){

			    alter("请输入内容！");
		    }else{

			    todoData = getData();



			    todoData.push({title:$(this).val(),done:false});


			    saveData(todoData);

			    load();


			$(this).val("");
		}
	}
});




    /*	function getData(){

		var data = localStorage.getItem("todolist");
		
	    }*/
    //2 点击a，删除对应的数据
    $("#todolist,#donelist").on("click","a",function(){

	var data = getData();
	var index = $(this).attr("id");

	data.splice(index,1);

	saveData(data);

	load();

    });




    //3 点击checkbox，完成正在进行和已经完成的事项的切换
    $("#todolist,#donelist").on("click","input[type=checkbox]",function(){


	// 先读取本地存储数组
	var data = getData();

	var index = $(this).siblings("a").attr("id");



	data[index].done = $(this).prop("checked")


	//保存数据
	saveData(data);

	// 渲染页面
	load();
    });


    //4 点击clear，删除页面所有元素
    $("#clear").click(function(){
    	var data = getData();
    	data.splice(0);
    	saveData(data);
    	load();
    });

//以下为程序执行的支持逻辑

    function getData(){

    	var data = localStorage.getItem("todolist");

    	if(data !==null){
    		return JSON.parse(data);
    	}else {
    		return [];
    	}
    }


    function saveData(data){
    	localStorage.setItem("todolist",JSON.stringify(data));
    }


    function load(){

    	$("#todolist,#donelist").empty();
    	var todoCount = 0;
    	var doneCount = 0;

    	var data = getData();


    	$(data).each(function(index,element){
    		if(element.done == true){
    			doneCount ++;
    		    $("<li><input type=checkbox checked='checked'><p>" + element.title + "</p><a href ='javascript:;' id="+ index +" ></a></li>").prependTo($("#donelist"));
            }else{
            	todoCount ++;
            	$("<li><input type=checkbox><p>" + element.title + "</p><a href ='javascript:;' id="+ index +" ></a></li>").prependTo($("#todolist"));
            }
    	});


        $("#todocount").text(todoCount);
        $("#donecount").text(doneCount);
    }
})
