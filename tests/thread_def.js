function Thread(parent, id, top, parent_strand){
	this.id = "thread"+id;
	if (parent==null){parent=this; this.column=-1;}
	if (parent_strand == null){parent_strand = "thread" + id + "strand0";}
	this.parent_strand = parent_strand;
	this.parent = parent;
	this.column = parent.column + 1;
	this.children = [];
	this.top = top;
}

function Strand(thread, rank, top){
	this.rank = rank;
	this.thread = thread;
	this.top = top;
	this.id = thread.id + "strand" + rank;
	this.left = this.thread.column * 660;
}