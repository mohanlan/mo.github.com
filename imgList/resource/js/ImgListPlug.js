/**
 * 
 * @authors mohanlan (mohanlan2014@sina.com)
 * @date    2014-08-19 09:17:07
 * @version 1.0
 *面向对象的ImgList
 */
var imgListObject = function(setting){
	this.defaultOpts = {
		containsSize:{width:1000,height:600}, //容器大小
		renderTo: $(document.body), 	//imgList的承载容器，默认为document.body
		enablePaging:false,			    //可否分页
		listTitle:"图片列表标题",		//图片列表标题
		enableShowDetails:false,		//可否显示详情
	};
	this.opts = $.extend({},this.defaultOpts,setting);
	
}
imgListObject.prototype ={
	//初始化页面
	init:function(){
		var containsHtml = "<div class='container' style='width:"+this.opts.containsSize.width+"px;height:"+this.opts.containsSize.height+"px;'>";	
		containsHtml+="<div class='listTitle'>"+this.opts.listTitle+"</div>";	
		containsHtml+="<div class='imglist'><div class='showDiv'></div></div>"									
		containsHtml+="</div>"
		//console.log(this.opts.renderTo);
		$(containsHtml).appendTo(this.opts.renderTo);
	},
	//加载数据 & 数据显示格式
	loadJson:function(url,data){
		this.getJson(url,data,this);
	},
	//设置详细内容显示格式
	setDetailsView:function(detailcontent){
		/*<div class='imgDetail'><p>这是这个会议室的详细描述信息！</p></div>*/
		this.matchDetailsClass(this);

	},
	//设置操作函数
	setFunction:function(operation){
		var operationHtml;
		for(var i in operation){
			/*alert(operation[i]);*/
			switch (operation[i]){
				case("add"):
					//alert("add");
					operationHtml="<a id='add' class='add'>删除</a>";
				break;
				case("update"):
					//alert("message")
					operationHtml="<a id='add' class='add'>修改</a>";
				break;
				case("checkDate"):
					//alert("message")
					operationHtml="<a id='checkDate' class='checkDate'>查看日程</a>";
				break;
			}
			$(operationHtml).appendTo($(".imgFunction"));
		}
		this.matchFunctionClass();
		//var functionHtml ="<div class='imgFunction'></div>";
		//$(".imgContent").append(functionHt

	},
	//获取Json数据
	getJson:function(url,data,parentThis){
		var ele=parentThis;
		var dataFormat=data;
		$.ajaxSettings.async = false;
		//console.log(data);
		$.getJSON(url,{},function(json){
			ele.jsonSuccessFunction(json,dataFormat);		//防止异步传输 无法return值问题
		});
	},
	//添加分页功能
	paging:function(){
	},
	jsonSuccessFunction:function(json,dataFormat){
		for(var i in json){
			var ImgContent="<div class='img'><div class='imgContent'><div class='logo'><img src="+json[i].imgurl+"><span></span></div><div class='imgRight'><div class='imgInfo'><span>【"+json[i][dataFormat.title]+"】</span><i>"+json[i][dataFormat.i1]+"</i><i>可容纳人数："+json[i][dataFormat.i2]+"</i><i>"+json[i][dataFormat.i3]+"</i></div></div><div class='imgFunction'></div></div><div class='imgDetail'><span class='span1'></span><span class='span2'></span>这是这个会议室的详细描述信息</div></div>";
        	$(ImgContent).appendTo($(".container .imglist")); 	
		}
	},
	//匹配函数的class
	matchFunctionClass:function(data){
		//alert("beginMatch");
		$(".img").hover(function() {
			//console.log("hover");
			//alert("hover");

			$(this).find($(".imgFunction")).css("display","block");
		}, function() {
			//console.log("unhover");
			$(this).find($(".imgFunction")).css("display","none");
		});
	},
	//详细信息的class
	matchDetailsClass:function(parentThis){
		var ob=$(".showDiv")
		$(".img").hover(function() {
			var content = $(this).find($(".imgDetail")).html();
			console.log(content);
			ob.empty();
    		ob.append(content);
    		ob.addClass("showDivShow");
    		parentThis.setDetailsPosition($(this));
		}, function() {
			ob.empty();
    		ob.removeClass("showDivShow");
		});

	},setDetailsPosition:function(ob){
		//alert("setPosition");
		var Container=$(".container");
		var obx1=ob.position().left;
		var oby1=ob.position().top;
		var xContent=Container.width();
		var yContent=Container.height();
		var obx2=xContent-obx1-206;
		var oby2=yContent-oby1-116;
		console.log(obx1+"："+obx2+","+oby1+":"+oby2);
		var x=0;
		var y=0;
		var span1=$(".span1");
		var span2=$(".span2");
		if(obx1>obx2){
			x=obx1-254;
			span1.addClass('span3');
			span2.addClass('span4');
		}else{
			x=obx1+208;
			span1.removeClass('span3');
			span2.removeClass('span4');
		}
		if(oby1>oby2){
			y=oby1+3;
		}else{
			y=oby1+3;
		}
		$(".showDiv").css({
			"margin-left": x+'px',
			"margin-top": y+'px'
		});
		//alert(x+":"+y);
		//if()
		//alert(xContent);

	},
	hideTitle:function(){
		//alert("beginHide");
		$(".listTitle").css('display', 'none');
	}
}


