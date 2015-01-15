var Gun = Gun || require('gun/gun');

Gun.chain.map = function(cb){
	var gun = this;
	gun.shot.then(function(val){
		cb = cb || function(){};
		//console.log("map module is loading", val);
		Gun.obj.map(val, function(obj, soul){
			//console.log(obj, Gun.is.soul(obj));
			if(!Gun.is.soul(obj)){ return }
			gun.load(obj).get(function(obj){
				delete obj._;
				cb.call(this, obj, soul);
			});
		});
	});
	return gun;
}
