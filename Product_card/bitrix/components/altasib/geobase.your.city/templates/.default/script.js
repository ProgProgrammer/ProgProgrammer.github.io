if(typeof altasib_geobase=='undefined')var altasib_geobase={};

$(document).ready(function(){
	if(altasib_geobase.yc_init_vars())
		altasib_geobase.yc_load_html();
});

altasib_geobase.yc_init_handlers=function(){
	if(altasib_geobase.is_mobile){
		$(document).keydown(function(e){
			if(e.keyCode===27&&$('div#altasib_geobase_mb_window').is(':visible'))
				altasib_geobase.yc_close();
		});
		$('#altasib_geobase_mb_window_block a #altasib_geobase_mb_close_kr').click(function(event){
			event.preventDefault();altasib_geobase.yc_x_clc();
		});
		$('.altasib_geobase_yc_mb_btn#altasib_geobase_yc_none').click(function(event){
			event.preventDefault();altasib_geobase.yc_no_click();
		});
		$('.altasib_geobase_yc_mb_btn#altasib_geobase_yc_n').click(function(event){
			event.preventDefault();altasib_geobase.yc_no_click();
		});
	}else{
		$(document).keydown(function(e){
			if(e.keyCode===27&&$('div#altasib_geobase_window').is(':visible'))
				altasib_geobase.yc_close();
		});
		$('#altasib_geobase_window_block a #altasib_geobase_close_kr').click(function(event){
			event.preventDefault();altasib_geobase.yc_x_clc();
		});
		$('.altasib_geobase_yc_btn#altasib_geobase_yc_n').click(function(event){
			event.preventDefault();altasib_geobase.yc_no_click();
		});
		$('.altasib_geobase_yc_btn#altasib_geobase_yc_none').click(function(event){
			event.preventDefault();altasib_geobase.yc_no_click();
		});
	}
}

altasib_geobase.yc_init_vars=function(){
	if(altasib_geobase.autoload!='N')
		altasib_geobase.autoload='Y';
	altasib_geobase.no=false;
	return true;
}

altasib_geobase.yc_load_html=function(){
	if(altasib_geobase.is_mobile)
		var win=$('div#altasib_geobase_mb_window');
	else
		var win=$('div#altasib_geobase_window');

	if(win.length==0){
		var res=$.ajax({
			url:'/bitrix/tools/altasib.geobase/your_city.php',
			dataType:'html',
			data:{'SITE_ID':altasib_geobase.SITE_ID,
				'locate':'Y',
				'AUTOLOAD':altasib_geobase.autoload
			},
			type:'POST',
			success:function(data){
				$('body').append(data);
				altasib_geobase.yc_open();
				if(typeof altasib_geobase.parse_city!='undefined')
					altasib_geobase.parse_city();
				else
					altasib_geobase.yc_parse_city();
				if(typeof altasib_geobase.replace!='undefined')//script of module
					altasib_geobase.replace();

				altasib_geobase.yc_init_handlers();
			}
		});
	}else{
		altasib_geobase.yc_init_handlers();
		altasib_geobase.yc_open();
	}
}

altasib_geobase.yc_no_click=function(){
	if(!altasib_geobase.no){
		if(typeof altasib_geobase!='undefined'){
			var popup='altasib_geobase_popup';
			if(altasib_geobase.is_mobile)
				popup='altasib_geobase_mb_popup';

			if(typeof altasib_geobase.select_city!='undefined'&&document.getElementById(popup)!=null){
				if(typeof altasib_geobase.sc_open!='undefined'){
					var estat='no_click';
					altasib_geobase.yc_close(estat);
					altasib_geobase.sc_open();
				}
			}else
				altasib_geobase.yc_open_sc();
		}else
			altasib_geobase.yc_open_sc();
	}
	altasib_geobase.no=true;
}

altasib_geobase.yc_open_sc=function(){
	var rez=$.ajax({
		url:'/bitrix/tools/altasib.geobase/select_city.php',
		dataType:'html',
		data:{'SITE_ID':altasib_geobase.SITE_ID,
			'show_select':'Y',
			'AUTOLOAD':altasib_geobase.autoload
		},
		type:'POST',
		success:function(data){
			$('body').append(data);

			altasib_geobase.yc_close();
			if(typeof altasib_geobase.sc_open!='undefined')
				altasib_geobase.sc_open();

			if(typeof altasib_geobase.sc_init_handlers!='undefined')
				window.setTimeout('altasib_geobase.sc_init_handlers()',350);
		},
	});
}

altasib_geobase.yc_yes_click=function(cityID,regionCode){
	var sendPars={'SITE_ID':altasib_geobase.SITE_ID,
		'set_loc':'Y',
		'city_id':cityID,
		'url':window.location.pathname,
		'reload':'NO'
	};
	if(typeof cityID=='undefined'||cityID==''){
		if(typeof altasib_geobase.auto_code=='undefined'){
			if((altasib_geobase.auto_code=altasib_geobase.yc_getCookie(altasib_geobase.COOKIE_PREFIX+'_ALTASIB_GEOBASE'))!==null){
				altasib_geobase.auto_code=decodeURIComponent(altasib_geobase.auto_code.replace(/\+/g,' '));
				altasib_geobase.auto_code=$.parseJSON(altasib_geobase.auto_code);
			}
		}
		if(typeof altasib_geobase.auto_code!='undefined'&&altasib_geobase.auto_code!=null){
			if(typeof altasib_geobase.auto_code['CITY_NAME']!='undefined'&&altasib_geobase.auto_code['CITY_NAME']!=null)
				sendPars['CITY_NAME']=altasib_geobase.auto_code['CITY_NAME'];
			if(typeof altasib_geobase.auto_code['COUNTRY_CODE']!='undefined'&&altasib_geobase.auto_code['COUNTRY_CODE']!=null)
				sendPars['COUNTRY_CODE']=altasib_geobase.auto_code['COUNTRY_CODE'];
		}

		if(typeof regionCode=='undefined'||regionCode=='null'){
			if(typeof altasib_geobase.auto_code!='undefined'&&altasib_geobase.auto_code!=null&&typeof altasib_geobase.auto_code['REGION_CODE']!='undefined')
				regionCode=altasib_geobase.auto_code['REGION_CODE'];
			else if(typeof altasib_geobase.region_code!='undefined')
				regionCode=altasib_geobase.region_code;
		}
		else
			sendPars['REGION_CODE']=altasib_geobase.auto_code['REGION_CODE'];

		sendPars['REGION_CODE']=regionCode;
	}

	if(typeof regionCode!='undefined'&&regionCode!='null'){
		sendPars['REGION_CODE']=regionCode;
	}

	var rs=$.ajax({
		url:'/bitrix/tools/altasib.geobase/your_city.php',
		dataType:'html',
		data:sendPars,
		type:'POST',
		success:function(data,textStatus){
			if(altasib_geobase.is_mobile)
				var clink=$('.altasib_geobase_mb_link span.altasib_geobase_mb_link_city')
			else
				var clink=$('.altasib_geobase_link span.altasib_geobase_link_city')
			if(clink.length>0){
				clink.html(altasib_geobase.short_name);
				clink.attr('title',altasib_geobase.full_name);
			}
			altasib_geobase.yc_close();
			if(typeof altasib_geobase.add_city!=='undefined')
				altasib_geobase.add_city(typeof sendPars['CITY_NAME']!='undefined'?sendPars['CITY_NAME']:altasib_geobase.short_name,sendPars['COUNTRY_CODE']);

			if(textStatus=='success'){
				var ncity=(typeof sendPars['CITY_NAME']!='undefined'?sendPars['CITY_NAME']:altasib_geobase.short_name);
				if(typeof cityID=='undefined'){
					if(typeof altasib_geobase.auto_code!='undefined')
						cityID=altasib_geobase.auto_code['CITY_ID'];
				}

				if(typeof BX!='undefined'){
					var arEventPars=[ncity,cityID,altasib_geobase.full_name,data];
					BX.onCustomEvent('onAfterSetCity',arEventPars);
				}

				if(data=='1'||data[data.length-1]=='1'||data[0]=='1'){
					if(data.length>1){//redirect
						var arDt=data.split(';');
						if(arDt&&!(arDt.propertyIsEnumerable('length'))&&typeof arDt==='object'&&typeof arDt.length==='number'){
							if(typeof arDt[2]!='undefined'&&arDt[2].length){
								$('body').append('<script>'+arDt[2].replace('\n','')+'</'+'script>');
							}
							if(typeof arDt[1]!='undefined'&&arDt[1].length){
								setTimeout(function(){
									if(arDt[1]=='#reload')location.reload();
									else document.location.href=arDt[1];
								},200);
							}
						}
					}
				}
			}

		},
		complete:function(data,textStatus){
			if(textStatus!='success'){
				var ncity=(typeof sendPars['CITY_NAME']!='undefined'?sendPars['CITY_NAME']:altasib_geobase.short_name);
				if(typeof cityID=='undefined'){
					if(typeof altasib_geobase.auto_code!='undefined')
						cityID=altasib_geobase.auto_code['CITY_ID'];
				}

				if(typeof BX!='undefined'){
					var arEventPars=[ncity,cityID,altasib_geobase.full_name,data.responseText];
					BX.onCustomEvent('onAfterSetCity',arEventPars);
				}
			}
		}
	});
}

altasib_geobase.yc_open=function(){
	if(typeof altasib_geobase.yc_not_open=='undefined'||altasib_geobase.yc_not_open==null)
		altasib_geobase.yc_not_open=false;

	if(typeof BX!='undefined'){
		var arEventPars=null;
		BX.onCustomEvent(altasib_geobase,'onBeforeYourCityOpen',arEventPars);
	}
	if(altasib_geobase.yc_not_open)
		return false;

	setTimeout(function(){
		if(altasib_geobase.is_mobile){
			$('div#altasib_geobase_mb_window').fadeIn().animate({top:'30%'},750);
			$('div#altasib_geobase_yc_mb_backg').show();
		}else{
			$('div#altasib_geobase_window').fadeIn().animate({top:'30%'},750);
			$('div#altasib_geobase_yc_backg').show();
		}
	},5000);
}

altasib_geobase.yc_x_clc=function(){
	altasib_geobase.yc_close();
	if(altasib_geobase.is_mobile)
		var btnOk=$('.altasib_geobase_yc_mb_btn :first').attr('onclick');
	else
		var btnOk=$('.altasib_geobase_yc_btn :first').attr('onclick');
	var num=altasib_geobase.strripos(btnOk,';return false;');
	if(num){
		var sYes=btnOk.substring(0,num);
		if(sYes.length>1)
			eval(sYes);
	}
}

altasib_geobase.yc_close=function(estatus){
	if(altasib_geobase.is_mobile){
		var win=$('div#altasib_geobase_mb_window');
		var bcg=$('div#altasib_geobase_yc_mb_backg');
	}else{
		var win=$('div#altasib_geobase_window');
		var bcg=$('div#altasib_geobase_yc_backg');
	}
	if(estatus!='no_click'){
		win.animate({top:'-50%'},750);
	}
	win.fadeOut('400');
	bcg.hide();
}

altasib_geobase.strripos=function(haystack,needle,offset){
	var i=haystack.toLowerCase().lastIndexOf(needle.toLowerCase(),offset);//returns -1
	return i>=0?i:false;
}

$(function(){
	$(document).click(function(e){
		var block=(altasib_geobase.is_mobile?'div#altasib_geobase_mb_window_block':'div#altasib_geobase_window_block');
		if($(block).is(':visible')){
			if($(e.target).closest(block).length)return;
			altasib_geobase.yc_close();
			e.stopPropagation();
		}
	});
});

altasib_geobase.yc_lang_set=function(){
	altasib_geobase.lang='en';
	if(typeof altasib_geobase.auto_code!=='undefined'&&altasib_geobase.auto_code!==null)
		if(typeof altasib_geobase.auto_code.COUNTRY_CODE!=='undefined'){
			if(altasib_geobase.auto_code.COUNTRY_CODE=='RU')
				altasib_geobase.lang='ru';
			altasib_geobase.COUNTRY_CODE=altasib_geobase.auto_code.COUNTRY_CODE;
		}

	if(typeof altasib_geobase.manual_code!=='undefined'&&altasib_geobase.manual_code!==null){
		if(typeof altasib_geobase.manual_code.COUNTRY_CODE!=='undefined'){
			if(altasib_geobase.manual_code.COUNTRY_CODE=='RU')
				altasib_geobase.lang='ru';
			altasib_geobase.COUNTRY_CODE=altasib_geobase.manual_code.COUNTRY_CODE;
		}
		if(typeof altasib_geobase.manual_code['REGION']!=='undefined'){
			if(typeof altasib_geobase.manual_code['REGION']['CODE']!=='undefined'){
				altasib_geobase.lang='ru';
				if(typeof altasib_geobase.COUNTRY_CODE=='undefined'||altasib_geobase.COUNTRY_CODE==null||altasib_geobase.COUNTRY_CODE=='')
					altasib_geobase.COUNTRY_CODE='RU';
			}
		}
	}
}

altasib_geobase.yc_parse_city=function(){
	if(typeof altasib_geobase.manual_code=='undefined'||altasib_geobase.manual_code==null){
		if((altasib_geobase.manual_code=altasib_geobase.yc_getCookie(altasib_geobase.COOKIE_PREFIX+'_'+'ALTASIB_GEOBASE_CODE'))!==null){
			altasib_geobase.manual_code=decodeURIComponent(altasib_geobase.manual_code.replace(/\+/g,' '));
			altasib_geobase.manual_code=$.parseJSON(altasib_geobase.manual_code);
		}
	}
	if(typeof altasib_geobase.auto_code=='undefined'||altasib_geobase.auto_code==null){
		if((altasib_geobase.auto_code=altasib_geobase.yc_getCookie(altasib_geobase.COOKIE_PREFIX+'_'+'ALTASIB_GEOBASE'))!==null){
			altasib_geobase.auto_code=decodeURIComponent(altasib_geobase.auto_code.replace(/\+/g,' '));
			altasib_geobase.auto_code=$.parseJSON(altasib_geobase.auto_code);
		}
	}

	altasib_geobase.yc_lang_set();

	if(altasib_geobase.manual_code!==null){
		if(typeof altasib_geobase.manual_code['CITY']!=='undefined'){
			if(typeof altasib_geobase.manual_code['CITY']['NAME']!=='undefined'){
				altasib_geobase.city=altasib_geobase.manual_code['CITY']['NAME'];
				altasib_geobase.region=altasib_geobase.manual_code['REGION']['NAME']
					+' '+altasib_geobase.manual_code['REGION']['SOCR'];
			}
			else if(typeof altasib_geobase.manual_code['CITY_RU']!=='undefined'){
				if(altasib_geobase.lang=='ru'){
					altasib_geobase.country=altasib_geobase.manual_code['COUNTRY_RU'];
					altasib_geobase.city=altasib_geobase.manual_code['CITY_RU'];
				}else{
					altasib_geobase.country=altasib_geobase.manual_code['COUNTRY'];
					altasib_geobase.city=altasib_geobase.manual_code['CITY'];
				}
				altasib_geobase.region=altasib_geobase.manual_code['REGION'];

				if(typeof altasib_geobase.manual_code['POST']!=='undefined')
					altasib_geobase.post=altasib_geobase.manual_code['POST'];
			}
		}
		else if(typeof altasib_geobase.manual_code['CITY_NAME']!=='undefined'){
			altasib_geobase.city=altasib_geobase.manual_code['CITY_NAME'];
			altasib_geobase.region=altasib_geobase.manual_code['REGION_NAME'];
			if(typeof altasib_geobase.manual_code['COUNTRY_NAME']!=='undefined')
				altasib_geobase.country=altasib_geobase.manual_code['COUNTRY_NAME'];
			if(typeof altasib_geobase.manual_code['POSTINDEX']!=='undefined')
				altasib_geobase.post=altasib_geobase.manual_code['POSTINDEX'];
		}
	}else if(altasib_geobase.auto_code!==null){
		altasib_geobase.city=altasib_geobase.auto_code['CITY_NAME'];
		altasib_geobase.region=altasib_geobase.auto_code['REGION_NAME'];
		if(typeof altasib_geobase.auto_code['COUNTRY_NAME']!=='undefined')
			altasib_geobase.country=altasib_geobase.auto_code['COUNTRY_NAME'];
		if(typeof altasib_geobase.auto_code['POSTINDEX']!=='undefined')
			altasib_geobase.post=altasib_geobase.auto_code['POSTINDEX'];
	}
}

altasib_geobase.yc_getCookie=function(name){
	var nameEQ=name+'=';
	var ca=document.cookie.split(';');
	for(var i=0;i<ca.length;i++){
		var c=ca[i];
		while(c.charAt(0)==' ')c=c.substring(1,c.length);
		if(c.indexOf(nameEQ)==0)return c.substring(nameEQ.length,c.length);
	}
	return null;
}