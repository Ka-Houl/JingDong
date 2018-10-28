var initPlaceholder = (function(){

	var content = document.getElementsByClassName("input-content")[0];

	content.onfocus = function(){
		if(this.value === '请输入关键字'){
	  	this.value = '';
	  	this.className += ' has-value' ;
		}
	}
	
	content.onblur = function(){
		if(this.value === ''){
	  	this.value = '请输入关键字';
	  	this.className = 'input-content' ;

		}
	}
})

