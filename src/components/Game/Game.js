import React, { Component } from 'react';
import Nav from '../Nav';
import ClickItem from '../ClickItem';
import Container from '../Container';
import Header from '../Header';
import Footer from '../Footer';
import pokemon from "../../pokemon.json";


class Game extends Component {
  

  state = {
      pokemon,//CHANGE
      score: 0, //this shows in UR-hand side of page in Nav
      topScore: 0
  };


//   componentDidMount(){
//       this.setState({pokemon:this.shuffleData(this.state.pokemon)}); //CHANGE
//   }
  handleCorrectGuess = newData => {
      const {topScore, score} = this.state;
      const newScore = score + 1;
      const newTopScore = Math.max(newScore, topScore); //keeping the best score in the Nav

      this.setState({//CHANGE
        pokemon: this.shuffleData(newData), //newData is the props that we're bringing in from arrow func
          score: newScore,
          topScore: newTopScore
      });
  };

  handleIncorrectGuess = otherData => {
      this.setState({
        pokemon: this.shuffleData(otherData), //CHANGE
          score: 0

      });
  };

//   resetGame = data => { //does not change
//       const resetData = data.map(item =>
//         ({...item, clicked:false}))
//         return this.shuffleData(resetData);
//   };

resetData = data => {
    const resetData = data.map(item => ({ ...item, clicked: false }));
    return this.shuffleData(resetData);
  };

//   shuffleData = data => {//does not change
//       let i = data.length - 1;
//       while (i>0){
//           const j = Math.floor(Math.random()*(i +1));
//           const temp = data[i];
//           data[i] = data[j];
//           data[j] = temp;
//       }
//       return data;
//   };

  shuffleData = data => {//does not change
      let i = data.length - 1;
      while (i>0){
          const j = Math.floor(Math.random()*(i +1));
          const temp = data[i];
          data[i] = data[j];
          data[j] = temp;
          i--;
      }
      return data;
  };

  handleItemClick = id => {
      let guessedCorrectly = false;
      const newData = this.state.pokemon.map(item =>
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

       {this.state.pokemon.map(monster => ( 
        <ClickItem 
        
            key={monster.id}
            id={monster.id}
            shake={!this.state.score && this.state.topScore}
            //shake is if score is zero
            handleClick={this.handleItemClick}
            image={monster.image}
       />
       
       ))}

    </Container>
    <Footer />
    </div>
    );};
}

export default Game;
