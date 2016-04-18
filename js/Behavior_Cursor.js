//Crea el objeto comportamiento que hereda de sprite y le agrega algunas variables más

function Behavior_Cursor(game, posx, posy, key, frame,target,cursors){
    Behavior.call(this,game, posx, posy, key, frame,target);
    this.cursors=cursors;
    return this;
}
Behavior_Cursor.prototype= Object.create(Behavior.prototype);//Degfino que es sub clase de Sprite.
Behavior_Cursor.prototype.constructor=Behavior_Cursor;

Behavior_Cursor.prototype.update=function(){
    console.log('entro');
     this.body.velocity.x = 0;

    if (this.cursors.left.isDown)
    {
        //  Move to the left
        this.body.velocity.x = -150;

        this.animations.play('left');
    }
    else if (this.cursors.right.isDown)
    {
        //  Move to the right
        this.body.velocity.x = 150;

        this.animations.play('right');
    }
    else
    {
        //  Stand still
        this.animations.stop();

        this.frame = 4;
    }
    
    //  Allow the this to jump if they are touching the ground.
    if (this.cursors.up.isDown && this.body.touching.down)
    {
        this.body.velocity.y = -350;
    }
        
        
    }
;