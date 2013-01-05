function Thread(parent, id, height){
	this.id = id;
	if (parent==null){parent=this; this.column=-1;}
	this.parent = parent;
	this.column = parent.column + 1;
	this.children = [];
	this.height = height;
}