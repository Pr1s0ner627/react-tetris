export const STAGE_WIDTH = 12;
export const STAGE_HEIGHT = 20;

export const createStage = () =>
    Array.from(Array(STAGE_HEIGHT), ()=>
        new Array(STAGE_WIDTH).fill([0, 'clear'])
    )

    export const checkCollison=(player, stage, {x:moveX, y:moveY})=> {
        for(let y=0;y<player.tetromino.length;y+=1) {
            for(let x=0;x<player.tetromino[y].length;x+=1) {
                //if it's actual cell
                if(player.tetromino[y][x]!==0)
                {
                    if(//if move is in play height (y) should not go to bottom
                    !stage[y + player.pos.y + moveY] || 
                    //check if does not go out of width (x)
                    !stage[y + player.pos.y + moveY][x + player.pos.x + moveX] ||
                    //cell is not clear
                    stage[y + player.pos.y + moveY][x + player.pos.x + moveX][1]!=='clear')
                {
                    return true;
                }
            }   
        }   
    }
};    
