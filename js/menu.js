var initMenu = (function(){
	var oMenu = document.getElementsByClassName('menu-wrap')[0],
	    oMenuItems = oMenu.getElementsByClassName('main-item'),
	    menuLen = oMenuItems.length,
	    oSub = document.getElementsByClassName('sub')[0],
	    oSubItems = oSub.getElementsByClassName('sub-item'),
	    subLen = oSubItems.length,
	    oMenuItem,
	    subItems,
	    isInSub = false,  //判断是否在子菜单中
	    isFirst = true,
	    mousePoses = [],
	    t = null;
	    // console.log(menuLen);
	    // console.log(oSub);
	    // console.log(subLen);
	
  addEvent(oMenu, 'mouseenter', function(){
    addEvent(document, 'mousemove', mouseMove);
	
  })


  addEvent(oMenu, 'mouseleave', menuItemMouseLeave)

	for(var i = 0; i < menuLen; i++){
		oMenuItem = oMenuItems[i];
		addEvent(oMenuItem, 'mouseenter', menuItemMouseEnter);
	}

	addEvent(oSub, 'mouseenter', function(){
		isInSub = true;
		// console.log(isInSub)

	})

	addEvent(oSub, 'mouseleave', function(){
		isInSub = false;
		// console.log(isInSub)
	})

	function menuItemMouseEnter(e){
    var e = e || window.event,
        tar = e.target || e.srcElement,
        thisIdx = Array.prototype.indexOf.call(oMenuItems, tar),
        posLen = mousePoses.length,
        curPos = mousePoses[posLen - 1] || {x:0 ,y: 0},  //|| {x:0 ,y: 0}用于防止后续程序出错
        lasPos = mousePoses[posLen - 2] || {x:0 ,y: 0};
    var toDelay = doTimeout(lasPos, curPos);
    // console.log(toDelay)
        // console.log(curPos, lasPos)
        // console.log(thisIdx);
    oSub.className = 'sub';

    if(t){
    	clearTimeout(t);
    }

    if(!isFirst){
	    if(toDelay){  //toDelay为true，轨迹预测进入子菜单，延迟执行addActive
		    t = setTimeout(function(){
		    	if(isInSub){
		    		return;  //若移入子菜单，则return，不让其他item类名变成active
		    	}
		    	addActive(thisIdx);
		    	t = null;
		    }, 900)   	
	    }else{
	    	addActive(thisIdx);
	    }    	
    }else{
    	addActive(thisIdx);
    	isFirst = false;
    }

    if(toDelay){  //toDelay为true，轨迹预测进入子菜单，延迟执行addActive
	    t = setTimeout(function(){
	    	if(isInSub){
	    		return;  //若移入子菜单，则return，不让其他item类名变成active
	    	}
	    	addActive(thisIdx);
	    	t = null;
	    }, 900)   	
    }else{
    	addActive(thisIdx);
    }

	}

	function addActive(index){
    removeAct();
    oSubItems[index].className += ' active';
	}

	function menuItemMouseLeave(){
      removeAct();
      oSub.className += ' hide';
      removeEvent(document, 'mousemove', mouseMove);

	}

	function removeAct(){
		for(var i = 0; i < menuLen; i++){
      subItem = oSubItems[i];
      subItem.className = 'sub-item';
    }
	}

	function mouseMove(e){
    var e = e || window.event,
        tar = e.target || e.srcElement;
    mousePoses.push({
    	x: pagePos(e).X,
    	y: pagePos(e).Y
    });

    if(mousePoses.length >= 3){
    	mousePoses.shift();   //数组长度多于3的时候，剪切第一个点，使其只有后两个点的坐标
    }

	}

	function doTimeout(lastPos, curPos){
    var TL = {
    	x: 530,
    	y: 100
    }

    var BL = {
    	x: 530,
    	y: 850
    }

    return pointInTriangle({
    	curPos: curPos,
    	lastPos: lastPos,
    	topLeft: TL,
    	bottomLeft: BL
    })
	}

})
