import React, { Component } from 'react';
import './App.css';
import Board from './components/Board';
import FacebookLogin from 'react-facebook-login';

class App extends Component {
  constructor(props){
    super(props)
    this.state={
      squares:['','','','','','','','',''],
      nextPlayer:false, // false is X, true is O
      history: [],
      user:'',
      topRank:[]
    }
  }

  calculateWinner = (squares) => {
    this.setState(squares)
  }

  setParentState = (obj) => {
    this.setState(obj)
  }

  responseFacebook = (response) => {
    console.log(response);
    this.setState({user:response.name})
  }

  showPast = (item, idx)=> {
    this.setState({
      squares:item.squares, 
      nextPlayer:item.nextPlayer, 
      history:this.state.history.filter((e,i)=>i<=idx)
    })
  }

  postData = async (duration)=> {
    console.log("here")
    let data = new URLSearchParams();

    data.append("player", this.state.user);
    data.append("score", duration);

    const url = `https://ftw-highscores.herokuapp.com/tictactoe-dev`;

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: data.toString(),
      json: true
    });
    console.log("response", response)
    this.getData();
  }

  getData = async () =>{ 
    const url = `https://ftw-highscores.herokuapp.com/tictactoe-dev`;
    let data = await fetch(url);
    let result = await data.json();
    this.setState({topRank:data.items})
  }

  render(){
    if (!this.state.user){
      return(
        <FacebookLogin
          appId="1245020535681449"
          autoLoad={true}
          fields="name,email,picture"
          callback={this.responseFacebook}
        />
      )
    } 
    return (
      <div>
        <h1>User info: {this.state.user}</h1>
        <Board 
          // You can replace these props by ...this.state LOL 
          // squares={this.state.squares}
          // nextPlayer={this.state.nextPlayer} 
          {...this.state}
          setParentState={this.setParentState}
          postData={this.postData}
        />
        <ol>
          {
            this.state.topRank.map((item)=>{
              return (
                <li>
                  {item.player}:{item.score}
                </li>
              )
            })
          }
        </ol>
        <ul>
          {
            this.state.history.map((item, idx)=> {
              return(
                <li>
                  <button onClick={()=> this.showPast(item,idx)}>
                    go to move {idx+1}
                  </button>
                </li>
              )
            })
          }
        </ul>
      </div>
    );
  }
}

export default App;
