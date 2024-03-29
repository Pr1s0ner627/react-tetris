import React, {useState} from "react";
import { checkCollison, createStage, nextStage } from "../gameHelpers";
//Custom Hooks
import { useInterval } from "../hooks/useInterval";
import { usePlayer} from "../hooks/usePlayer";
import { useStage } from "../hooks/useStage";
import { useGameStatus } from "../hooks/useGameStatus";
//Styled Components
import { StyledTetrisWrapper } from "../styles/StyledTetris";
import { StyledTetris } from "../styles/StyledTetris";
//components
import Stage from "./Stage";
import Display from "./Display";
import StartButton from "./StartButton";
import NextPiece from "./NextPiece";

const Tetris=()=>
{
    const [dropTime, setdropTime] = useState(null);
    const [gameOver, setgameOver] = useState(false);

    const [player, updatePlayerPos, resetPlayer, playerRotate] = usePlayer();
    const [stage, setStage, rowsCleared] = useStage(player, resetPlayer);
    const [score, setScore, rows, setRows, level, setLevel] = useGameStatus(rowsCleared);
    
    const movePlayer = dir => {
        if(!checkCollison(player, stage, {x:dir, y:0}))
        updatePlayerPos({x: dir, y:0});
    }
    const startGame = () => {
        setStage(createStage());
        setdropTime(1000/(level+1) + 200);
        resetPlayer();
        setgameOver(false);
        setScore(0);
        setRows(0);
        setLevel(0);
    }

    const keyUp = ({keyCode}) => {
        if(!gameOver)
        {
            if(keyCode === 40)
                setdropTime(1000/(level+1) + 200);
        }
    }

    const dropPlayer = () => { 
        drop();
        setdropTime(null);
    }
    const drop = () => { 
        //Increase level if 10 rows cleared
        if(rows > (level+1)*10)
        {
            setLevel(prev => prev+1);
            setdropTime(1000/(level+1) + 200);
        }

        if(!checkCollison(player, stage, {x:0, y:1}))
        {
            updatePlayerPos({x:0,y:1,collided: false})
        }
        
        else
        {
            if(player.pos.y<1)
            {
                console.log("Game Over !!!");
                setgameOver(true);
                setdropTime(null);
            }
            updatePlayerPos({x:0,y:0,collided: true})
        }
    }
    const move = ({ keyCode }) => {
         if (!gameOver) { 
            if (keyCode === 37) { movePlayer(-1); }
            else if (keyCode === 39) { movePlayer(1); }
            else if (keyCode === 40) { dropPlayer(); }
            else if (keyCode === 38) { playerRotate(stage, 1); } 
        } }
    
    useInterval(() => {
        drop();

    }, dropTime)

    return(
        <StyledTetrisWrapper role="button" tabIndex="0" onKeyDown={e => move(e)} onKeyUp={keyUp}>
            <StyledTetris>
            <Stage stage={stage}/>
            <aside>
                <NextPiece nextpiece={NextPiece} />
                {gameOver ?(
                    <Display gameOver={gameOver} text="Game Over" />
                    ):(
                    <div>
                    <Display text={`Score: ${score}`} />
                    <Display text={`Rows: ${rows}`} />
                    <Display text={`Level: ${level}`} />
                    </div>
                    )}
                
                <StartButton callback={startGame} />
            </aside>
            </StyledTetris>
        </StyledTetrisWrapper>
    );
};

export default Tetris;