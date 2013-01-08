function Thread(parent, id, top){
	this.id = "thread"+id;
	if (parent==null){parent=this; this.column=-1;}
	this.parent = parent;
	this.column = parent.column + 1;
	this.children = [];
	this.top = top;
}