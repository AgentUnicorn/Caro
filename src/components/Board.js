import React, { Component } from 'react'
import Square from './Square'


let  startTime = 0;
let gameOver = false;
export default class Board extends Component {

    onSquareClicked=(i) => {
        if (startTime == 0) {
            startTime = Date.now();
        }

        console.log("the box number you click", i)
        //1.make one array and copy value from parents array
        let squareList = this.props.squares.slice();
        //2.change the value at copied array
        squareList[i]=this.props.nextPlayer?"O":"X"
        //3.insert that array into parents array
        this.props.setParentState({squares:squareList,nextPlayer:!this.props.nextPlayer,history:[...this.props.history,{squares:squareList,nextPlayer:!this.props.nextPlayer}]})

    }

    calculateWinner = () => {
        const lines = [
            [0,1,2],
            [3,4,5],
            [6,7,8],
            [0,3,6],
            [1,4,7],
            [2,5,8],
            [0,4,8],
            [2,4,6]
        ];
        for (let i = 0; i < lines.length; i++) {
            const [a,b,c] = lines[i]
            if (this.props.squares[a] && this.props.squares[a] == this.props.squares[b] && this.props.squares[a] == this.props.squares[c]) {
                return this.props.squares[a]; 
            }
        }
        return null 
    }

    render() {
        let status='';
        if (gameOver){
            status = `Game Over`
        } else {
            let winner = this.calculateWinner();
            if (winner) {
                let duration = Date.now() - startTime
                this.props.postData(duration);
                status = `Winner is ${winner}`
                gameOver = true;
            } else {
                status = this.props.nextPlayer? `next player is O`: `next player is X`
            }
        }
        

        return (
            <div>

                {/* <h1>{this.winner}</h1> */}
                <h2>{status}</h2>
                <div style={{display:"flex"}}>
                    <Square value={this.props.squares[0]} onClick={()=>this.onSquareClicked(0)}/>
                    <Square value={this.props.squares[1]} onClick={()=>this.onSquareClicked(1)}/>
                    <Square value={this.props.squares[2]} onClick={()=>this.onSquareClicked(2)}/>
                </div>
                <div style={{display:"flex"}}>
                    <Square value={this.props.squares[3]} onClick={()=>this.onSquareClicked(3)}/>
                    <Square value={this.props.squares[4]} onClick={()=>this.onSquareClicked(4)}/>
                    <Square value={this.props.squares[5]} onClick={()=>this.onSquareClicked(5)}/>
                </div>
                <div style={{display:"flex"}}>
                    <Square value={this.props.squares[6]} onClick={()=>this.onSquareClicked(6)}/>
                    <Square value={this.props.squares[7]} onClick={()=>this.onSquareClicked(7)}/>
                    <Square value={this.props.squares[8]} onClick={()=>this.onSquareClicked(8)}/>
                </div>
            </div>
        )
    }
}
