//ZHTEASYUtil
var zfesUtil ={
		 _serializeObject : function(params){
			var o ={};
			$.each(params,function(){
				if(o[this.name]){
					if(!o[this.name].push){
						o[this.name] = [o[this.name]];
					}
					o[this.name].push(this.value||'');
				}else{
					o[this.name] = this.value||'';
				}
			});
			return o;
		},
		 formToJson:function(form){
			 	if(zfesUtil.isStrNull(form)){
			 		return {};
			 	}
				  var serializeObj={}; 
				  var array=form.serializeArray();  
				   $(array).each(function(){
					   var valuex=this.value;
					   if(zfesUtil.isStrNull(valuex)){
					  	 valuex=form.find("[name='"+this.name+"']").val();
					   }
					   if(!zfesUtil.isStrNull(valuex)){
						   if(serializeObj[this.name]){  
				        	   serializeObj[this.name]=serializeObj[this.name]+","+valuex;   
				              /*  if($.isArray(serializeObj[this.name])){  
				                   serializeObj[this.name].push(this.value);  
				                   console.log("-------------1-------------");
				                   console.log(this.value);
				               }else{  
				                   serializeObj[this.name]=[serializeObj[this.name],this.value];  
				                   console.log("-------------2-------------");
				                   console.log([serializeObj[this.name],this.value]);
				               }   */
				              
				           }else{  
				               serializeObj[this.name]=valuex;   
				           }  
					   }
			        
			       });
				   return serializeObj;
			},
		
			parseJson:function (data){
				if(data){
					var result = $.parseJSON(data);
					return result;
				}
				return null;
			},
			//evel漏洞
//			parseEval:function (data){
//				try{
//					if ($.type(data) == 'string'){
//						return eval('(' + data + ')');	
//					}
//					else{
//						return data;
//					}
//				} catch (e){
//					return {};
//				}
//			},
			rowsIdToArray:function (rows,idkey){
				var idArray = [];
				$.each(rows, function(index, item){
					idArray.push(item[idkey]);
				}); 
				return idArray;
			},
			 isCardNo:function(card){
				   // 身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，最后一位是校验位，可能为数字或字符X
				   var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
				   if(reg.test(card) === false)
				   {
				       return  false;
				   }
				},
			isSpecialCharacter:function(value){
				var reg = new RegExp("[`~!@#$^&*=|{}':;',\\[\\].<>/?~！@#￥……&*——|{}【】‘；：”“'。，、？]");  
				if(reg.test(value)){
					return true;
				}else{
					return false;
				}
			},
			isStrHavaValue:function(valuex){
				if(valuex&&typeof (valuex) != "undefined"&&""!=valuex&&null!=valuex&&"null"!=valuex&&"undefined"!=valuex&&undefined!=valuex&&""!=$.trim(valuex)){
					return true;
				}
				return false;
			},
			isStrNull:function(valuex){
				if(!valuex||typeof (valuex) == "undefined"||""==valuex||null==valuex||"null"==valuex||"undefined"==valuex||undefined==valuex||""==$.trim(valuex)){
					return true;
				}
				return false;
			},
			isEmpty:function(valuex){
				if(!valuex||valuex === "[]"||valuex === "{}"||typeof (valuex) == "undefined"||""==valuex||null==valuex||"null"==valuex||"undefined"==valuex||undefined==valuex||""==$.trim(valuex)){
					return true;
				}
				return false;
			},
			locationWithParams:function(url,param){
				var paramArray=[];
				if(param){
					$.each(param, function(key, val) { 
						paramArray.push($('<input>', {name: key, value: val}));     
					 });
					paramArray.push($('<input type=submit id=zfesxxx_submit_xxxxxxx>',{}));
				}
				/*$('<form>', {  
				    method: 'post',  
				    action: url 
				}).append(paramArray).submit();*/
				
				/*$('<form >', {  
					method: 'post',  
					action: url 
				}).append(paramArray).submit();*/
			
			/*	$('<form>', {  
				    method: 'post',  
				    action: url 
				}).append(paramArray).find("input[id$='zfesxxx_submit_xxxxxxx']").click();*/	
				var form=	$('<form>', {  
				    method: 'post',  
				    action: url 
				})
				$(document.body).append(form);
				form.append(paramArray).find("input[id$='zfesxxx_submit_xxxxxxx']").click();
			},
			//---------------------------------------------------------------------------------
			formatBool:function(value,row,index){
				if(true==value||"true"==value||"1"==value||1==value){
					return '<span class="label label-success">启用</span>';
				}else if(false==value||"false"==value||"0"==value||0==value){
					return '<span class="label label-danger">禁用</span>';
				}else{
					return value;
				}
				
			},
			formatYesNo:function(value,row,index){
				if(true==value||"true"==value||"1"==value||1==value){
					return '<span class="label label-success">是</span>';
				}else if(false==value||"false"==value||"0"==value||0==value){
					return '<span class="label label-danger">否</span>';
				}else{
					return value;
				}
				
			},
			formatNoYes:function(value,row,index){
				if(true==value||"true"==value||"1"==value||1==value){
					return '<span class="label label-danger">是</span>';
				}else if(false==value||"false"==value||"0"==value||0==value){
					return '<span class="label label-success ">否</span>';
				}else{
					return value;
				}
				
			},
			formateStatus:function(value,row,index){
				if("1"==value || 1==value){
					return '<span class="label label-success ">通过</span>';
				}else if("0"==value || 0==value){
					return '<span class="label label-danger">不通过</span>';
				}else{
					return '<span class="label label-danger">未审核</span>';
				}
			},
			formateProcess:function(value,row,index,col,jqTableDom){
				if(zfesUtil.isStrNull(value)){//没有流程--迁移数据
					var verifyStatus=row.verifyStatus;
					if(zfesUtil.isStrNull(verifyStatus)){
						verifyStatus=row.checkResult;
					}
					//alertSwal.warningText("formateProcess=="+row.verifyStatus);
					if(!zfesUtil.isStrNull(verifyStatus)){
						if("2"==verifyStatus || 2==verifyStatus||"3"==verifyStatus || 3==verifyStatus){
//							return '<span class="label label-default">审核结束</span>';
						/*	return '<span class="label label-default">确定培养计划</span>';*/
							return '<span >审核结束</span>';
						}
					}
				//	return "<span class='label label-danger'>未提交</span>";
					return "<span>未提交</span>";
					
					
				}
				//alertSwal.warningText("formateProcess=="+row.verifyStatus);
				
				 var businessCode=row.businessCode;
				 if(zfesUtil.isStrNull(businessCode)){//还没有启动流程
				//	 return '<span class="label label-danger">未提交</span>';
					 return '<span>未提交</span>';
				 }
			
				 var url=host_auth+"bizConfig/bizConfigProcessCode/loadBizConfigProcessCodeListNoPage?businessCode="+businessCode;
				   zfesAjax.ajax(url,{},function(data){
					   if (!zfesUtil.isStrNull(data)){
						   process=data;
						   zfesUtil.formatByCallBack(value,index,col,jqTableDom,process,false,false);
					   }
				   });	
			},
			
			formateProcessResult:function(value,row,index,col,jqTableDom){
				
				//优先读取结果
				var verifyStatus=row.verifyStatus;
				if(zfesUtil.isStrNull(verifyStatus)){
					verifyStatus=row.checkResult;
				}
				
				
				if(!zfesUtil.isStrNull(verifyStatus)&&verifyStatus!="0"&&verifyStatus!="1"){//有结果且结果不为审核中和未提交状态的，取结果
					if("2"==verifyStatus || 2==verifyStatus){
						return '<span class="label label-success ">通过</span>';
					}else if("3"==verifyStatus || 3==verifyStatus){
						return '<span class="label label-danger">不通过</span>';
					}
				}
				
				if("1"==verifyStatus || 1==verifyStatus){//20170612加上 成果
					return '<span class="label label-success ">已提交</span>';
				}
				
				
				
				//业务结果没有，读取流程结果
				 var processCode=row.pressCode;
				 var businessCode=row.businessCode;
				 if(zfesUtil.isStrNull(processCode)||zfesUtil.isStrNull(businessCode)){//还没有启动流程
					 return '<span class="label label-danger">未提交</span>';
				 }
				 
				 var url=host_auth+"/bizConfig/bizConfigProcessCodeResult/loadProcessCodeResultJointListNoPage?processCodeCode="+processCode+"&businessCode="+businessCode+"";
				 zfesAjax.ajax(url,{},function(data){
				   if (!zfesUtil.isStrNull(data)){
					   process=data;
					   zfesUtil.formatByCallBack(value,index,col,jqTableDom,process,false,false);
				   }
				});
				 
			},
			/*--------------------------------------修改开题状态和审核结果为开题状态-fcp-20171024--start-----------------------------------------*/
			renderCurrentProcessCode:function(businessCode,currentCode,verifyStatus,object){
				var currentCodeName;
				if(zfesUtil.isStrNull(currentCode)){//没有流程--迁移数据
					if(!zfesUtil.isStrNull(verifyStatus)){						
						if("6"==verifyStatus || 6==verifyStatus||"7"==verifyStatus || 7==verifyStatus){
							if("6"==verifyStatus || 6==verifyStatus){
								$(object).val('学校审核通过');
								 return;
							}else{
								$(object).val('学校审核未通过');
								 return;
							}
						}else if("4"==verifyStatus ||4==verifyStatus||"5"==verifyStatus || 5==verifyStatus){
							if("4"==verifyStatus || 4==verifyStatus){
								$(object).val('院系审核通过');
								 return;
							}else{
								$(object).val('院系审核未通过');
								 return;
							}
						}else if("2"==verifyStatus ||2==verifyStatus||"3"==verifyStatus || 3==verifyStatus){
							if("2"==verifyStatus || 2==verifyStatus){
								$(object).val('导师审核通过');
								 return;
							}else{
								$(object).val('导师审核未通过');
								 return;
							}
						}
					}
					 $(object).val("未提交");
					 return;
				}
				 if(zfesUtil.isStrNull(businessCode)){//还没有启动流程
					 $(object).val('未提交');
					 return;
				 }
				 
				 var url=host_auth+"bizConfig/bizConfigProcessCode/loadBizConfigProcessCodeListNoPage?businessCode="+businessCode;
				   zfesAjax.ajax(url,{},function(data){
					   if (!zfesUtil.isStrNull(data)){
						   process=data;
						   $(object).val(zfesUtil.formatProcessForNews(currentCode,process,false,verifyStatus));						   
					   }
				   });
				  
			},
			formatProcessForNews:function(value,arr,isClass,status){
				var flag=false;
				for (var i = 0; i < arr.length; i++) {
					if (value == arr[i].code) {
						if(typeof(isClass)=="undefined"||isClass==null||isClass==""||isClass=="null"){
							if(arr[i].name=="确定培养计划"){
								return '学校审核通过';
							}else{
								//alertSwal.warningText("2222==="+arr[i].code);
								if("2"==arr[i].code || arr[i].code==2){//导师审核中
									return '已提交';
								}else if("3"==arr[i].code || arr[i].code==3 || "4"==arr[i].code || arr[i].code==4){//3-导师审核 4-秘书审核中
									//alertSwal.warningText("22sd22==="+status);
									if("2"==status || status==2 || "1"==status || status==1){
										return '导师审核通过';
									}else if("3"==status || status==3){
										return '导师审核未通过';
									}
								}else if("5"==arr[i].code || arr[i].code==5 || "6"==arr[i].code || arr[i].code==6){//5-秘书审核 6-管理员审核中
									if("2"==status || status==2 || "1"==status || status==1||"4"==status || status==4){
										return '院系审核通过';
									}else if("5"==status || status==5){
										return '院系审核未通过';
									}
								}else if("7"==arr[i].code || arr[i].code==7){//管理员审核
									if("2"==status || status==2 || "1"==status || status==1||"6"==status || status==6 ){
										return '学校审核通过';
									}else if("7"==status || status==7){
										return '学校审核未通过';
									}
								}else if("99"==arr[i].code || arr[i].code==99){//确定开题申请结果
									if("3"==status || status==3){
										return '导师审核未通过';
									}else if("4"==status || status==4){
										return '院系审核通过';
									}else if("5"==status || status==5){
										return '院系审核未通过';
									}else if("6"==status || status==6){
										return '学校审核通过';
									}else if("7"==status || status==7){
										return '学校审核未通过';
									}
								}
							}
						}else{
							if(arr[i].name=="确定培养计划"){
								return '<span >学校审核通过</span>';
							}else{
								//alertSwal.warningText("2222==="+arr[i].code);
								if("2"==arr[i].code || arr[i].code==2){//导师审核中
									return '已提交';
								}else if("3"==arr[i].code || arr[i].code==3 || "4"==arr[i].code || arr[i].code==4){//3-导师审核 4-秘书审核中
									if("2"==status || status==2){
										return '导师审核通过';
									}else if("3"==status || status==3){
										return '导师审核未通过';
									}
								}else if("5"==arr[i].code || arr[i].code==5 || "6"==arr[i].code || arr[i].code==6){//5-秘书审核 6-管理员审核中
									if("2"==status || status==2 || "1"==status || status==1||"4"==status || status==4){
										return '院系审核通过';
									}else if("5"==status || status==5){
										return '院系审核未通过';
									}
								}else if("7"==arr[i].code || arr[i].code==7){//管理员审核
									if("2"==status || status==2 || "1"==status || status==1||"6"==status || status==6 ){
										return '学校审核通过';
									}else if("7"==status || status==7){
										return '学校审核未通过';
									}
								}else if("99"==arr[i].code || arr[i].code==99){//确定开题申请结果
									if("3"==status || status==3){
										return '导师审核未通过';
									}else if("4"==status || status==4){
										return '院系审核通过';
									}else if("5"==status || status==5){
										return '院系审核未通过';
									}else if("6"==status || status==6){
										return '学校审核通过';
									}else if("7"==status || status==7){
										return '学校审核未通过';
									}
								}
							}
						}
						flag=true;
					}
				}
				if(!flag){
					return value;
				}
			},
			renderIsPass:function(isPass,object){
				$(object).val(zfesUtil.isPassNew(isPass));
			},
			isPassNew:function(value){
				if("1"==value || 1==value){
					return '通过';
				}else if("0"==value){
					return '不通过';
				}else{
					return '未录入';
				}
			},
			
			formateVerifyStatus:function(value,row,index,col,jqTableDom){				
				if(!zfesUtil.isStrNull(value)){					
						if("6"==value || 6==value||"7"==value || 7==value){
							if("6"==value || 6==value){
								return '<span class="label label-success ">学校审核通过</span>';
							}else{
								return '<span class="label label-default">学校审核未通过</span>';
							}
						}else if("4"==value ||4==value||"5"==value || 5==value){
							if("4"==value || 4==value){
								return '<span class="label label-success ">院系审核通过</span>';
							}else{
								return '<span class="label label-default">院系审核未通过</span>';
							}
						}else if("2"==value ||2==value||"3"==value || 3==value){
							if("2"==value || 2==value){
								return '<span class="label label-success ">导师审核通过</span>';
							}else{
								return '<span class="label label-default">导师审核未通过</span>';
							}
						}else if("1"==value||1==value){
							return '<span class="label label-success ">已提交</span>';
						}else if("0"==value||0==value){
							return '<span class="label label-default">未提交</span>';
						}
				}else{
					return "<span class='label label-default'>未提交</span>";
				}
				 
			},
			renderVerifyStatus:function(verifyStatus,object){				
					if(!zfesUtil.isStrNull(verifyStatus)){						
						if("6"==verifyStatus || 6==verifyStatus||"7"==verifyStatus || 7==verifyStatus){
							if("6"==verifyStatus || 6==verifyStatus){
								$(object).val('学校审核通过');
								 return;
							}else{
								$(object).val('学校审核未通过');
								 return;
							}
						}else if("4"==verifyStatus ||4==verifyStatus||"5"==verifyStatus || 5==verifyStatus){
							if("4"==verifyStatus || 4==verifyStatus){
								$(object).val('院系审核通过');
								 return;
							}else{
								$(object).val('院系审核未通过');
								 return;
							}
						}else if("2"==verifyStatus ||2==verifyStatus||"3"==verifyStatus || 3==verifyStatus){
							if("2"==verifyStatus || 2==verifyStatus){
								$(object).val('导师审核通过');
								 return;
							}else{
								$(object).val('导师审核未通过');
								 return;
							}
						}
					}
					 $(object).val("未提交");
					 return;
			},
			/*--------------------------------------学位审核状态-WX-20180131 begin-----------------------------------------*/
			formateDegreeVerifyStatus :function(value,row,index,col,jqTableDom){			
				if(!zfesUtil.isStrNull(value)){					
						if("6"==value || 6==value||"7"==value || 7==value){
							if("6"==value || 6==value){
								return '<span class="label label-success ">同意授予学位</span>';
							}else{
								return '<span class="label label-default">不同意授予学位</span>';
							}
						}else if("4"==value ||4==value||"5"==value || 5==value){
							if("4"==value || 4==value){
								return '<span class="label label-success ">院系审核通过</span>';
							}else{
								return '<span class="label label-default">院系审核未通过</span>';
							}
						}else if("2"==value ||2==value||"3"==value || 3==value){
							if("2"==value || 2==value){
								return '<span class="label label-success ">导师审核通过</span>';
							}else{
								return '<span class="label label-default">导师审核未通过</span>';
							}
						}else if("1"==value||1==value){
							return '<span class="label label-success ">已提交</span>';
						}else if("0"==value||0==value){
							return '<span class="label label-default">未提交</span>';
						}
				}else{
					return "<span class='label label-default'>未提交</span>";
				}
				 
			},
					/*--------------------------------------学位审核状态-WX-20180131 end-----------------------------------------*/
			isPassGraduation:function(value,row,index){
				if("1"==value || 1==value){
					return '<span class="label label-success ">同意毕业</span>';
				}else if("0"==value){
					return '<span class="label label-danger">不同意毕业</span>';
				}else{
					return '<span class="label label-danger">未审核</span>';
				}
			},
			renderGradIsPass:function(isPass,object){
				$(object).val(zfesUtil.isPassGraduationNew(isPass));
			},
			isPassGraduationNew:function(value){
				if("1"==value || 1==value){
					return '同意毕业';
				}else if("0"==value){
					return '不同意毕业';
				}else{
					return '未审核';
				}
			},
			/*--------------------------------------修改开题状态和审核结果为开题状态--fcp-20171024-end-----------------------------------------*/
			
			
			/*---------------------------------------修改开题状态和审核结果为开题状态----start-----------------------------------------*/
			
			formateProcessPropose:function(value,row,index,col,jqTableDom){
				var verifyStatus=row.verifyStatus;
				if(zfesUtil.isStrNull(verifyStatus)){
					verifyStatus=row.checkResult;
				}
				if(zfesUtil.isStrNull(value)){//没有流程--迁移数据
					if(!zfesUtil.isStrNull(verifyStatus)){
						if("6"==verifyStatus || 6==verifyStatus||"7"==verifyStatus || 7==verifyStatus){
							if("6"==verifyStatus || 6==verifyStatus){
								return '<span class="label label-default">学校审核通过</span>';
							}else{
								return '<span class="label label-default">学校审核未通过</span>';
							}
						}else if("4"==verifyStatus ||4==verifyStatus||"5"==verifyStatus || 5==verifyStatus){
							if("4"==verifyStatus || 4==verifyStatus){
								return '<span class="label label-default">院系审核通过</span>';
							}else{
								return '<span class="label label-default">院系审核未通过</span>';
							}
						}else if("2"==verifyStatus ||2==verifyStatus||"3"==verifyStatus || 3==verifyStatus){
							if("2"==verifyStatus || 2==verifyStatus){
								return '<span class="label label-default">导师审核通过</span>';
							}else{
								return '<span class="label label-default">导师审核未通过</span>';
							}
						}
					}
					return "<span class='label label-default'>未提交</span>";
				}
				 var businessCode=row.businessCode;
				 if(zfesUtil.isStrNull(businessCode)){//还没有启动流程
					 return '<span class="label label-default">未提交</span>';
				 }
				 var url=host_auth+"bizConfig/bizConfigProcessCode/loadBizConfigProcessCodeListNoPage?businessCode="+businessCode;
				   zfesAjax.ajax(url,{},function(data){
					   if (!zfesUtil.isStrNull(data)){
						   process=data;
						   zfesUtil.formatByCallBackForNews(value,index,col,jqTableDom,process,false,false,verifyStatus);
					   }
				   });
			},
			
			
			/**
			 * 函数描述：ajax异步请求回调时使用，适用于非字典，需要编号和显示结果不一样的渲染情况
			 * 参数：value:数据值；index：索引；tableDom：所渲染的表格dom对象；arrData：格式化数组数据，isClass：是否做样式渲染，指定不同值渲染格式，请在格式化数组中指定className属性,col:所渲染的值的列索引，0开始
			 * 数组格式：[{code:"",name:"",className:""},....],code即value，name显示值，className：特殊样式渲染类，该属性需要参数isClass设置为true才有效
			 */
			formatByCallBackForNews:function(value,index,col,tableDom,arrData,isClass,isFromLocal,verifyStatus){
				//alertSwal.warningText("formatByCallBackForNews2222==="+verifyStatus);
				if(isFromLocal){
					tableDom.on("post-body.bs.table",function(dom){
						var row=$(tableDom.find("tbody").find("tr").eq(index));
						var cell=row.find("td").eq(col);
						if(zfesUtil.isStrNull(value)){
							$(cell).html("-");
						}else{
							$(cell).html(zfesUtil.formatRenderForNews(value,arrData,isClass,verifyStatus));
						}
					  });
				}else{
					var row1=$(tableDom.find("tbody").find("tr").eq(index));
					var cell1=row1.find("td").eq(col);
					if(zfesUtil.isStrNull(value)){
						$(cell1).html("-");
					}else{
						$(cell1).html(zfesUtil.formatRenderForNews(value,arrData,isClass,verifyStatus));
					}
				}
			},
			
			
			/**
			 * 函数描述：已知明确的数组，数组格式[{code:"",name:"",className:""},...],code:代表该属性返回值，name：代表该属性列所需要现实的值，className：表示样式渲染，使用此属性必须将isClass参数设置成true
			 * 参数：value：列表渲染值；arr：格式数据数组；isClass：表示是否对显示结果样式渲染
			 */
			formatRenderForNews:function(value,arr,isClass,status){
				var flag=false;
				for (var i = 0; i < arr.length; i++) {
					if (value == arr[i].code) {
						if(typeof(isClass)=="undefined"||isClass==null||isClass==""||isClass=="null"){
							if(arr[i].name=="确定培养计划"){
								return '<span >学校审核通过</span>';
							}else{
								//alertSwal.warningText("2222==="+arr[i].code);
								if("2"==arr[i].code || arr[i].code==2){//导师审核中
									return '<span class="label label-default">已提交</span>';
								}else if("3"==arr[i].code || arr[i].code==3 || "4"==arr[i].code || arr[i].code==4){//3-导师审核 4-秘书审核中
									//alertSwal.warningText("22sd22==="+status);
									if("2"==status || status==2 || "1"==status || status==1){
										return '<span class="label label-default">导师审核通过</span>';
									}else if("3"==status || status==3){
										return '<span class="label label-default">导师审核未通过</span>';
									}
								}else if("5"==arr[i].code || arr[i].code==5 || "6"==arr[i].code || arr[i].code==6){//5-秘书审核 6-管理员审核中
									if("2"==status || status==2 || "1"==status || status==1||"4"==status || status==4){
										return '<span class="label label-default">院系审核通过</span>';
									}else if("5"==status || status==5){
										return '<span class="label label-default">院系审核未通过</span>';
									}
								}else if("7"==arr[i].code || arr[i].code==7){//管理员审核
									if("2"==status || status==2 || "1"==status || status==1||"6"==status || status==6){
										return '<span class="label label-default">学校审核通过</span>';
									}else if("7"==status || status==7){
										return '<span class="label label-default">学校审核未通过</span>';
									}
								}else if("99"==arr[i].code || arr[i].code==99){//确定开题申请结果
									if("3"==status || status==3){
										return '<span class="label label-default">导师审核未通过</span>';
									}else if("4"==status || status==4){
										return '<span class="label label-default">院系审核通过</span>';
									}else if("5"==status || status==5){
										return '<span class="label label-default">院系审核未通过</span>';
									}else if("6"==status || status==6){
										return '<span class="label label-default">学校审核通过</span>';
									}else if("7"==status || status==7){
										return '<span class="label label-default">学校审核未通过</span>';
									}
								}
							}
						}else{
							if(arr[i].name=="确定培养计划"){
								return '<span >学校审核通过</span>';
							}else{
								//alertSwal.warningText("2222==="+arr[i].code);
								if("2"==arr[i].code || arr[i].code==2){//导师审核中
									return '<span class="label label-default">已提交</span>';
								}else if("3"==arr[i].code || arr[i].code==3 || "4"==arr[i].code || arr[i].code==4){//3-导师审核 4-秘书审核中
									if("2"==status || status==2){
										return '<span class="label label-default">导师审核通过</span>';
									}else if("3"==status || status==3){
										return '<span class="label label-default">导师审核未通过</span>';
									}
								}else if("5"==arr[i].code || arr[i].code==5 || "6"==arr[i].code || arr[i].code==6){//5-秘书审核 6-管理员审核中
									if("2"==status || status==2 || "1"==status || status==1||"4"==status || status==4){
										return '<span class="label label-default">院系审核通过</span>';
									}else if("5"==status || status==5){
										return '<span class="label label-default">院系审核未通过</span>';
									}
								}else if("7"==arr[i].code || arr[i].code==7){//管理员审核
									if("2"==status || status==2 || "1"==status || status==1||"6"==status || status==6){
										return '<span class="label label-default">学校审核通过</span>';
									}else if("7"==status || status==7){
										return '<span class="label label-default">学校审核未通过</span>';
									}
								}else if("99"==arr[i].code || arr[i].code==99){//确定开题申请结果
									if("3"==status || status==3){
										return '<span class="label label-default">导师审核未通过</span>';
									}else if("4"==status || status==4){
										return '<span class="label label-default">院系审核通过</span>';
									}else if("5"==status || status==5){
										return '<span class="label label-default">院系审核未通过</span>';
									}else if("6"==status || status==6){
										return '<span class="label label-default">学校审核通过</span>';
									}else if("7"==status || status==7){
										return '<span class="label label-default">学校审核未通过</span>';
									}
								}
							}
						}
						flag=true;
					}
				}
				if(!flag){
					return value;
				}
			},
			
			
			/*---------------------------------------修改开题状态和审核结果为开题状态----end-----------------------------------------*/
			
			
			
			
			
			
			
			/*----------时间格式转化--------------------------------------masheng---------------------------------*/
			isPass:function(value,row,index){
				if("1"==value || 1==value){
					return '<span class="label label-success ">通过</span>';
				}else if("0"==value){
					return '<span class="label label-danger">不通过</span>';
				}else{
					return '<span class="label label-danger">未录入</span>';
				}
			},
		
			formatDate:function(value){
				if(value&&value.length>=10){
					return value.substr(0,10);
				}
				if(value){
					var date = new Date(value);
					if(date){
						//alert("date "+date);
					}
					var month = date.getMonth() + 1;
					var day = date.getDate();
					//alert(date+" "+month+" "+ day);
					if(month<10){
						month = '0'+ month;
					}
					if(day<10){
						day = '0'+ day;
					}
					return date.getFullYear() + '-' + month + '-'+ day;
				}
				return '';
			},
			trueFlaseToStr:function(trueOrFalse){
				if((typeof(trueOrFalse)=="boolean"&&trueOrFalse==true)||trueOrFalse=="true"){
					return "1";
				}else if((typeof(trueOrFalse)=="boolean"&&trueOrFalse==false)||trueOrFalse=="false"){
					return "0";
				}
				return trueOrFalse;
			},
			
			  DateDiff:function(sDate1,  sDate2){    //sDate1和sDate2是2002-12-18格式  
			    var  aDate,  oDate1,  oDate2,  iDays ; 
			    aDate  =  sDate1.split("-")  
			    oDate1  =  new  Date(aDate[1]  +  '-'  +  aDate[2]  +  '-'  +  aDate[0])    //转换为12-18-2002格式  
			    aDate  =  sDate2.split("-")  
			    oDate2  =  new  Date(aDate[1]  +  '-'  +  aDate[2]  +  '-'  +  aDate[0])  
			    iDays  =  parseInt(Math.abs(oDate1  -  oDate2)  /  1000  /  60  /  60  /24)    //把相差的毫秒数转换为天数  
			    return  iDays  
			},
			setCookie:function setCookie(c_name,value,expiredays,path){
				path=(path==undefined|| path==null)?"/":path+"/"
				var exdate=new Date()
				exdate.setDate(exdate.getDate()+expiredays)
				document.cookie=c_name+ "=" +escape(value)+((expiredays==null) ? "" : ";expires="+exdate.toUTCString())+";path="+path
			},
			getCookie:function getCookie(name) { 
			    var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
			    if(arr=document.cookie.match(reg))
			        return unescape(arr[2]); 
			    else 
			        return null; 
			} ,
			
			//--------------------注意：此部分，曹仁道自写，正式使用需要询问----------------------------------------------
			/**
			 * 函数描述：已知明确的数组，数组格式[{code:"",name:"",className:""},...],code:代表该属性返回值，name：代表该属性列所需要现实的值，className：表示样式渲染，使用此属性必须将isClass参数设置成true
			 * 参数：value：列表渲染值；arr：格式数据数组；isClass：表示是否对显示结果样式渲染
			 */
			formatRender:function(value,arr,isClass){
				var flag=false;
				for (var i = 0; i < arr.length; i++) {
					if (value == arr[i].code) {
						if(typeof(isClass)=="undefined"||isClass==null||isClass==""||isClass=="null"){
							if(arr[i].name=="确定培养计划"){
								return '<span >审核结束</span>';
							}else{
								return '<span class="label label-default">'+arr[i].name+'</span>';
							}
						//	return '<span>'+arr[i].name+'</span>';
						//	return arr[i].name;
						}else{
							if(arr[i].name=="确定培养计划"){
								return '<span >审核结束</span>';
							}else{
								return '<span class="label '+arr[i].className+'">'+arr[i].name+'</span>';
							}
						//	return '<span>'+arr[i].name+'</span>';
							//return arr[i].name;
						}
						flag=true;
					}
				}
				if(!flag){
					return value;
				}
			},
			/**
			 * 函数描述：显示项为字典项时使用
			 * 参数：value：数据值；index：索引；tableDom：所渲染的表格dom对象；itemName:字典编号，col:所渲染的值的列索引，0开始
			 */
			formatDic:function(value,index,col,tableDom,itemName){
				var code="";
				var code1="";
				var code2="";
				if(itemName.indexOf(",")>0){
					var codes=itemName.split(",");
					code=codes[0];
					code1=codes[1];
				}else{
					code=itemName;
				}
				DicStore.getDicNoByUrl(code,function(dicData,isFromLocal){
					if(itemName=="SF"){
						for (var i = 0; i < dicData.length; i++) {
							if(dicData[i].code=="0"){
								dicData[i].className="label-danger";
							}else{
								dicData[i].className="label-success";
							}
						}
					}
					zfesUtil.formatByCallBack(value,index,col,tableDom,dicData,true,isFromLocal);
				},code1);
			},
			/**
			 * 函数描述：显示项为字典项时使用
			 * 参数：value：数据值；index：索引；tableDom：所渲染的表格dom对象；dtCode:维护项名称，col:所渲染的值的列索引，0开始
			 */
			formatMt:function(value,index,col,tableDom,dtCode){
				MtStore.getMtNoByUrl(dtCode,function(mtData,isFromLocal){
					zfesUtil.formatByCallBack(value,index,col,tableDom,mtData,true,isFromLocal);
				});
			},
			formatOrg:function(value,index,col,tableDom){
				OrgStore.getCulOrg(function(orgData,isFromLocal){
					zfesUtil.formatByCallBack(value,index,col,tableDom,orgData,true,isFromLocal);
				});
			},
			formatMj:function(value,index,col,tableDom){
				MjStore.getMjNoByUrl("",function(mjData,isFromLocal){
					zfesUtil.formatByCallBack(value,index,col,tableDom,mjData,true,isFromLocal);
				});
			},
			/**
			 * 函数描述：ajax异步请求回调时使用，适用于非字典，需要编号和显示结果不一样的渲染情况
			 * 参数：value:数据值；index：索引；tableDom：所渲染的表格dom对象；arrData：格式化数组数据，isClass：是否做样式渲染，指定不同值渲染格式，请在格式化数组中指定className属性,col:所渲染的值的列索引，0开始
			 * 数组格式：[{code:"",name:"",className:""},....],code即value，name显示值，className：特殊样式渲染类，该属性需要参数isClass设置为true才有效
			 */
			formatByCallBack:function(value,index,col,tableDom,arrData,isClass,isFromLocal){
				if(isFromLocal){
					tableDom.on("post-body.bs.table",function(dom){
						var row=$(tableDom.find("tbody").find("tr").eq(index));
						var cell=row.find("td").eq(col);
						if(zfesUtil.isStrNull(value)){
							$(cell).html("-");
						}else{
							$(cell).html(zfesUtil.formatRender(value,arrData,isClass));
						}
					  });
				}else{
					var row1=$(tableDom.find("tbody").find("tr").eq(index));
					var cell1=row1.find("td").eq(col);
					if(zfesUtil.isStrNull(value)){
						$(cell1).html("-");
					}else{
						$(cell1).html(zfesUtil.formatRender(value,arrData,isClass));
					}
				}
			},
			isNull:function(str){
				if (typeof (str) == "undefined" || str == null || str == "null" || str == "") {
					return true;
				} else {
					return false;
				}
			},
			clearForm:function(formEle){
				$(':input','#'+formEle)  
				 .not(':button, :submit, :reset')  
				 .val('')  
				 .removeAttr('checked')  
				 .removeAttr('selected');
			},
			bizConfigProcessGoBack:function(operaId,businessCode,fnBack){
				if(zfesUtil.isStrNull(operaId)){
					alertSwal.warningText("请选择一条数据");
					return;
				}
				if(zfesUtil.isStrNull(businessCode)){
					alertSwal.warningText("请指定需要操作的业务");
					return;
				}
				alertSwal.confirm("提示","您确定要撤销该审核吗？撤销后该业务的流程将会回退，但是不会影响已经走过的其他业务，请谨慎操作！",function(isConfirm){
				    if(isConfirm){
				    	var ajaxUrl=host_auth+"/bizConfig/bizConfigProcessLog/goBackProcess";
						zfesAjax.ajaxTodo(ajaxUrl, {operaId : operaId,businessCode : businessCode}, function(data) {
							alertSwal.successText(data.message);
							if(fnBack){
								fnBack();
							}
						});
				   }
				});
			}

};


/*  function getRootPath_web() {
//获取当前网址，如： http://localhost:8083/projectName/abc/meun.jsp
var curWwwPath = window.document.location.href;
	如： /projectName/abc/meun.jsp
var pathName = window.document.location.pathname;
var pos = curWwwPath.indexOf(pathName);
//获取主机地址，如： http://localhost:8083
var localhostPaht = curWwwPath.substring(0, pos);
//获取带"/"的项目名，如：/uimcardprj
var projectName = pathName.substring(0, pathName.substr(1).indexOf('/') + 1);
return (localhostPaht + projectName);
} */


