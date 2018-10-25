import React, { Component } from 'react';
import Nav from '../Nav';
import ClickItem from '../ClickItem';
import Container from '../Container';
import Footer from '../Footer';
import frenchies from "../../frenchies.json";


class Game extends Component {
  //es6 - new type of class
  //component from line 1

  state = {
      data,
      score: 0, //this shows in UR-hand side of page in Nav
      topScore: 0
  };


  componentDidMount(){
      this.setState({data:this.shuffleData(this.state.data)});
  }
  handleCorrectGuess = newData => {
      const {topScore, score} = this.state;
      const newScore = score + 1;
      const newTopScore = Math.max(newScore, topScore); //keeping the best score in the Nav

      this.setState({
          data: this.shuffleData(newData), //newData is the props that we're bringing in from arrow func
          score: newScore,
          topScore: newTopScore
      });
  };

  handleIncorrectGuess = otherData => {
      this.setState({
          data: this.shuffleData(otherData),
          score: 0

      });
  };

  resetGame = data => {
      const resetData = data.map(item =>
        ({...item, clicked:false}))
        return this.shuffleData(resetData);
  };

  shuffleData = data => {
      let i = data.length - 1;
      while (i>0){
          const j = Math.floor(Math.random()*(i +1));
          const temp = data[i];
          data[i] = data[j];
          data[j] = temp;
      }
      return data;
  };

  handleItemClick = id => {
      let guessedCorrectly = false;
      const newData = this.state.data.map(item =>
        {
            const newItem = {...item};
            if  (newItem.id === id){
                if (!newItem.clicked){
                    newItem.clicked = true;
                    guessedCorrectly = true;
                    //updating the state here once the user has clicked
                }

                
            }
            return newItem;

        });
        guessedCorrectly //this is the condition of the if statement, if true
            ? this.handleCorrectGuess(newData)
            //fancy if/else statement, ie if guessedCorrectly is true, then handleCorrectGuess data
            : this.handleIncorrectGuess(newData);
            //else is ":""
  };
  
  
  render() { //part of Component
    return (
      <div>
      <Nav score = {this.state.score} topScore = {this.state.topScore} />
    

      <Header />
      <Container>

       {this.state.frenchies.map(frenchie => ( 
        <ClickItem 
        
            key={frenchie.id}
            id={frenchie.id}
            shake={!this.state.score && this.state.topScore}
            //shake is if score is zero
            handleClick={this.handleItemClick}
            image={frenchie.image}
       />
       
       ))}

    </Container>
    <Footer />
    </div>
    );};
}

export default Game;
