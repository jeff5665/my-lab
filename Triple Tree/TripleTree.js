function Node(val,left,mid,right,parent,depth){
    this.val=val;
    this.leftChild=left||false;
    this.midChild=mid||false;
    this.rightChild=right||false;
    this.parent=parent||false;
    this.depth=depth||0;
}

Node.prototype={
  hasChild:function(){
      if(this.leftChild||this.midChild||this.rightChild){
          return true;
      }else{
          return false;
      }

  },
    checkNode:function(){
        if(this.parent.leftChild===this){
            return 'leftChild';
        }
        if(this.parent.rightChild===this){
            return 'rightChild';
        }
        if(this.parent.midChild===this){
            return 'midChild';
        }
    },
    remove:function(){
        if(this.parent!==false){
            if(this.parent.leftChild===this){
                console.log('remove:L');
                this.parent.leftChild=false;
                //delete this;
            }

            if(this.parent.midChild===this){
                console.log('remove:M');
                this.parent.midChild=false;
                //delete this;
            }

            if(this.parent.rightChild===this){
                console.log('remove:R');
                this.parent.rightChild=false;
                //delete this;
            }

        }
    }
};


function TripleTree(root){
    this.root=root||false;
    this.totalDepth=0;
}

TripleTree.prototype={
    insert:function(val){
        var _node;
        var _depth=0;
        if(this.root===false){
            this.root=new Node(val);
        }else{
            _node=this.root;
            while(_node!==false){
                _depth++;
                if(this.totalDepth<_depth){
                    this.totalDepth=_depth;
                }

                if(_node.val>val){ //左
                    if(_node.leftChild!==false){
                        _node=_node.leftChild;
                    }else{
                        _node.leftChild=new Node(val);
                        _node.leftChild.parent=_node;
                        _node=false;
                    }
                }

                if(_node.val===val){
                    if(_node.midChild!==false){
                        _node=_node.midChild;
                    }else{
                        _node.midChild=new Node(val);
                        _node.midChild.parent=_node;
                        _node=false;
                    }
                }

                if(_node.val<val){
                    if(_node.rightChild!==false){
                        _node=_node.rightChild;
                    }else{
                        _node.rightChild=new Node(val);
                        _node.rightChild.parent=_node;
                        _node=false;
                    }
                }


            }
        }
        return this;
    },
    find:function(val){
        var _node=this.root;
        if(_node===false){
            alert('亲，根节点呢...');
            return false;
        }
        while(_node!==false){
            if(_node.val>val){
                if(_node.leftChild!==false){
                    _node=_node.leftChild;
                }else{
                    _node=false;
                    return false;
                }
            }

            if(_node.val===val){
                if(_node.midChild!==false){
                    _node=_node.midChild
                }else{//找到要删除的元素了
                    return _node;
                }
            }
            if(_node.val<val){
                if(_node.rightChild!==false){
                    _node=_node.rightChild;
                }else{
                    _node=false;
                   return false;
                }
            }
        }
        return false;
    },

    ajust:function(delNode,ajustNode){
        var parentNode;
        //----------删除ajustNode父节点指向ajustNode的指针----------------
        if(ajustNode.parent.leftChild===ajustNode){
            ajustNode.parent.leftChild=false;
        }
        if(ajustNode.parent.rightChild===ajustNode){
            ajustNode.parent.rightChild=false;
        }
        if(ajustNode.parent.midChild===ajustNode){
            ajustNode.parent.midChild=false;
        }
        //------------------------------
        if(delNode.parent!==false){//删除的节点非root时
            parentNode=delNode.parent;




            //--------将parentNode指向要删除元素的指针改为指向ajustNode---------------------
            if(parentNode.leftChild===delNode){
                parentNode.leftChild=ajustNode;
                ajustNode.parent=parentNode;
            }
            if(parentNode.midChild===delNode){
                parentNode.midChild=ajustNode;
                ajustNode.parent=parentNode;
            }
            if(parentNode.rightChild===delNode){
                parentNode.rightChild=ajustNode;
                ajustNode.parent=parentNode;
            }
        }



        //----------把删除节点的左右子节点指向ajustNode-----------------
        if(delNode.leftChild!==false){
            ajustNode.leftChild=delNode.leftChild;
            ajustNode.leftChild.parent=ajustNode;
        }
        if(delNode.rightChild!==false){
            ajustNode.rightChild=delNode.rightChild;
            ajustNode.rightChild.parent=ajustNode;
        }



        if(delNode.parent===false){
            this.root=ajustNode;
            ajustNode.parent=false;
        }
    },


    deleteNodeByVal:function(val){
        var delNode=this.find(val);
        if(delNode===false){
            alert('亲，节点没找到');
            return this;
        }
        var ajustNode;
        if(delNode!==false){
            if(delNode.rightChild!==false){//右子树存在
                ajustNode=delNode.rightChild;
                var doit=true;
                while(doit!==false){//得到ajustNode
                    if(ajustNode.leftChild!==false){
                        ajustNode=ajustNode.leftChild;
                    }else{
                        if(ajustNode.midChild!==false){
                            ajustNode=ajustNode.midChild;
                        }else{
                            doit=false;
                        }
                    }
                }
                this.ajust(delNode,ajustNode);//调整节点
                delNode.remove();
            }else{//存在左子树
                if(delNode.leftChild!==false){//存在右子树
                    ajustNode=delNode.leftChild;
                    //ajustNode.parent.leftChild=false;
                    this.ajust(delNode,ajustNode);
                    delNode.remove();
                }else{//没有孩子节点
                    if(delNode.parent===false){
                        this.root=false;
                    }
                    delNode.remove();
                }
            }
        }else{
            alert('亲，没找到你要删的');
        }
    },
    quickInsert:function(arr){
        for(var i=0;i<arr.length;i++){
            this.insert(arr[i]);
        }
    },
    display:function(){
        var _self=this;
        var baseW=10;
        var baseH=20;
        var maxWidth=30*Math.pow(3,this.totalDepth);
        var maxHeight=100*this.totalDepth;
        var c=document.getElementById("canvas");
       // c.style.width=(maxWidth+50)+'px';
       // c.style.height=(maxHeight+50)+'px';
        var cxt=c.getContext("2d");
        cxt.clearRect(0,0,1000,600);
        cxt.strokeStyle = 'rgba(0,255,0,0.2)';
        cxt.fillStyle="#FF0000";
        this.root.x=maxWidth/2;
        this.root.y=20;

        var node=this.root;
       // drawNode(node);
        BreadthFirstSearch(node,0);
        function BreadthFirstSearch(node,depth){
            drawNode(node);
            if(node.hasChild()){
                depth++;
                if(node.leftChild!==false){
                    node.leftChild.x=node.x-baseW*(Math.pow(2,_self.totalDepth-depth)+1);
                    node.leftChild.y=node.y+baseH;
                    BreadthFirstSearch(node.leftChild,depth);
                }
                if(node.midChild!==false){
                    node.midChild.x=node.x;
                    node.midChild.y=node.y+baseH;
                    BreadthFirstSearch(node.midChild,depth);
                }
                if(node.rightChild!==false){
                    node.rightChild.x=node.x+baseW*(Math.pow(2,_self.totalDepth-depth)+1);
                    node.rightChild.y=node.y+baseH;
                    BreadthFirstSearch(node.rightChild,depth);
                }
            }
        }

        function drawNode(node){
            if(node.parent!=null){
                cxt.moveTo(node.x,node.y);
                cxt.lineTo(node.parent.x,node.parent.y);
                cxt.stroke();
                cxt.restore();
            }
            cxt.fillText(node.val,node.x,node.y);
        }
    }
};

var tree=new TripleTree();
//tree.insert.apply(null,[5,4,9,5,7,2,2]);
  tree.quickInsert([15,4,9,5,7,2,2,1,8,5,6,3,21,33,22,19,17,18,20]);
tree.display();

document.getElementById('delBtn').onclick=function(){
  var delNum=parseInt(document.getElementById('delTxt').value);
    tree.deleteNodeByVal(delNum);
    console.log(tree);
    tree.display();
};


