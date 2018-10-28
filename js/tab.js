;(function(){

  var Tab = function(){

  	this.tabList = document.getElementsByClassName("slider-wrap")[0];

  	this.sliderList = document.getElementsByClassName("slider-indicator")[0];

  	this.dotList = this.sliderList.getElementsByClassName("indicator-dot"),
  	_self = this;
  }

  Tab.prototype = {

  	init: function(){
  		this.bindEvent();
  	},

  	bindEvent: function(){
      addEvent(this.sliderList, 'mouseover', this.sliderClick)
  	},

  	sliderClick: function(e){

  		var e = e || window.event,
  		    tar = e.target || e.srcElement,
  		    sliChild = elemChildren(this),
  		    _index = Array.prototype.indexOf.call(sliChild, tar),
  		    dotLen = _self.dotList.length;
  		for(var i = 0; i < dotLen; i++){
  			_self.dotList[i].className = 'indicator-dot';
  		}
        _self.dotList[_index].className += ' cur';
        _self.tabList.style.backgroundImage = 'url(img/' + (_index + 1) + '.jpg)';

  	}
  }

  //实例化构造函数
  new Tab().init();
})();