C = {

	ATTR: {
		RACE: null,
		CLASS_: null,
		HP: null,
	},

	COMPS: {
		
	},
	
	getBase: function(attr) {
		if (!this.ATTR[attr]) {
			return null;
		} else if (this.ATTR[attr].base) {
			return this.ATTR[attr].base;
		} else {
			return this.ATTR[attr];
		}
	},
	
	getTotal: function(attr) {
		// TODO: compute base + mods
	},
	
	setBase: function(attr, value) {
		if (!this.ATTR[attr]) {
			this.ATTR[attr] = { base: 0, mod: [] };
		}
		this.ATTR[attr].base = value;
	},
	
	addMod: function(src, attr, mod) {
		if (!this.ATTR[attr]) {
			this.ATTR[attr] = { value: 0, mod: [] };
		}
		this.ATTR[attr].mod.push({ src: src, mod: mod });
	},
	
	removeMod: function(src, attr) {
		if (!this.ATTR[attr]) {
			this.ATTR[attr] = { value: 0, mod: [] };
		}
		for (var i in this.ATTR[attr].mod) {
			if (this.ATTR[attr].mod[i].src === src) {
				delete this.ATTR[attr].mod[i];
				break;
			}
		}
	}
};
