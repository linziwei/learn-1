function LoadingSample6(r,color,filterColor){
	var self = this;
	base(self,LSprite,[]);
	
	self.progress = 0;
	self.step = 0;

	self.holeR = r || 10;
	self.holeAmount = 5;
	self.holesx = 20;
	self.loadingBarWidth = self.holeR*2*self.holeAmount+self.holesx*(self.holeAmount-1);
	self.loadingBarHeight = self.holeR*2;
	
	self.progressColor = color || "#2187e7";
	self.filterColor = filterColor || "#00c6ff";
	
	self.backLayer = new LSprite();
	self.backLayer.graphics.drawRect(0,"",[0,0,LGlobal.width,LGlobal.height],true,"#161616");
	self.addChild(self.backLayer);
	
	self.holeLayer = new LSprite();
	self.holeLayer.x = (LGlobal.width - self.loadingBarWidth)*0.5;
	self.holeLayer.y = (LGlobal.height - self.loadingBarHeight)*0.5;
	self.addChild(self.holeLayer);
	
	self.progressLayer = new LSprite();
	self.progressLayer.x = (LGlobal.width - self.loadingBarWidth)*0.5;
	self.progressLayer.y = (LGlobal.height - self.loadingBarHeight)*0.5;
	self.addChild(self.progressLayer);
	
	self._addHole();
}
LoadingSample6.prototype._addHole = function(){
	var self = this;
	var amount=self.holeAmount,sx=self.holeR*2+self.holesx,r=self.holeR;
	
	for(var i=0; i<amount; i++){
		var holeObj = new LSprite();
		holeObj.x = i*sx;
		holeObj.graphics.drawArc(1,"#111",[0,0,r,0,2*Math.PI],true,"#000");
		holeObj.graphics.drawArc(1,"#333",[0,0,r,1.7*Math.PI,0.7*Math.PI],false);
		self.holeLayer.addChild(holeObj);
	}
};
LoadingSample6.prototype.setProgress = function(value){
	var self = this;
	
	var sx=self.holeR*2+self.holesx,r=self.holeR;
	self.progress = value/100;

	var tweenList = new Array();
	
	while(Math.floor(self.progress/0.2) > self.step){
		var cw = r*2;
		var ch = cw;
		
		var grd = LGlobal.canvas.createLinearGradient(0,-ch*2,0,ch);
		grd.addColorStop(0,"white");
		grd.addColorStop(1,self.progressColor);
	
		var po = new LSprite();
		po.x = self.step*sx;
		po.scaleX = 0;
		po.scaleY = 0;
		po.graphics.drawArc(0,"",[0,0,r,0,2*Math.PI],true,grd);
		self.progressLayer.addChild(po);

		tweenList.push(po);
		
		self.step ++;
	}

	var completeFunc = function(o){
		var circleObj = new LSprite();
		circleObj.alpha = 0.9;
		circleObj.x = o.x;
		circleObj.graphics.drawArc(1,self.filterColor,[0,0,r,0,2*Math.PI],false);
		self.progressLayer.addChild(circleObj);
		
		var shadow = new LDropShadowFilter(0,5,self.filterColor,10);
		circleObj.filters = [shadow];
		
		LTweenLite.to(circleObj,0.5,{
			scaleX: 1.7,
			scaleY: 1.7,
			alpha: 0,
			onComplete:function(s){
				s.parent.removeChild(s);
			}
		});
	};

	for(var i=0; i<tweenList.length; i++){
		var o = tweenList[i];
		LTweenLite.to(o,1,{
			scaleX: 1,
			scaleY: 1,
			onComplete:completeFunc
		});
	}
};