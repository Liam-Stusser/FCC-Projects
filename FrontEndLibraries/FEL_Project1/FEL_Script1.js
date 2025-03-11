import { configureStore, createSlice } from "@reduxjs/toolkit";
import { Provider, connect } from "react-redux";
import React from "react";
import ReactDOM from "react-dom/client";
import "./FrontEndLibraries/FEL_Project1/FEL_styles1.css";
//Declare Quotes 25 in total
const quotesArray = [
    { quote: "May the Force be with you.", author: "Star Wars" },
    {quote: "I'm gonna make him an offer he can't refuse.",author: "The Godfather"},
    { quote: "You can't handle the truth!", author: "A Few Good Men" },
    { quote: "I'll be back.", author: "The Terminator" },
    { quote: "Here's looking at you, kid.", author: "Casablanca" },
    { quote: "Go ahead, make my day.", author: "Sudden Impact" },
    { quote: "Houston, we have a problem.", author: "Apollo 13" },
    { quote: "There's no place like home.", author: "The Wizard of Oz" },
    { quote: "Why so serious?", author: "The Dark Knight" },
    { quote: "I see dead people.", author: "The Sixth Sense" },
    { quote: "Hasta la vista, baby.", author: "Terminator 2: Judgment Day" },
    {quote: "They may take our lives, but they'll never take our freedom!",author: "Braveheart"},
    { quote: "You talking to me?", author: "Taxi Driver" },
    { quote: "I feel the need—the need for speed.", author: "Top Gun" },
    { quote: "Just keep swimming.", author: "Finding Nemo" },
    {quote: "Toto, I've a feeling we're not in Kansas anymore.",author: "The Wizard of Oz"},
    { quote: "To infinity and beyond!", author: "Toy Story" },
    {quote: "You shall not pass!",author: "The Lord of the Rings: The Fellowship of the Ring"},
    { quote: "It's alive! It's alive!", author: "Frankenstein" },
    {quote: "Keep your friends close, but your enemies closer.",author: "The Godfather Part II"},
    { quote: "I'm the king of the world!", author: "Titanic" },
    {quote: "Elementary, my dear Watson.",author: "The Adventures of Sherlock Holmes"},
    { quote: "That'll do, pig. That'll do.", author: "Babe" },
    {quote:"Life is like a box of chocolates. You never know what you're gonna get.", author: "Forrest Gump"},
    { quote: "This is Sparta!", author: "300" }
  ];
  
  //Initializes a random value for quotes on load
  let random = Math.floor(Math.random() * quotesArray.length);
  
  //Redux
  const NEW = "NEW";
  
  const addQuote = (quote) => {
    return {
      type: NEW,
      quote
    };
  };
  
  const initialState = {
    quote: quotesArray[random].quote,
    author: quotesArray[random].author
  };
  
  const quoteReducer = (state = initialState, action) => {
    switch (action.type) {
      case NEW:
        return {
          ...state,  
          quote: action.quote.quote,  
          author: action.quote.author, 
        };
      default:
        return state;
    }
  };
  
  const store = configureStore({ reducer: quoteReducer });
  
  //React
  class QuoteBox extends React.Component {
    constructor(props) {
      super(props);
      this.newQuote = this.newQuote.bind(this);
    }
    newQuote() {
      let random = Math.floor(Math.random() * 26);
      const newQuote = {
        quote: quotesArray[random].quote,
        author: quotesArray[random].author
      };
      this.props.submitNewQuote(newQuote);
    }
    render() {
      const { quote, author } = this.props.quotes;
      return (
        <div id="quote-box">
          <h2 id="text">"{quote}"</h2>
          <p id="author">-{author}</p>
          <button id="new-quote" onClick={this.newQuote}>
            New Quote
          </button>
          <a
            id="tweet-quote"
            href="https://twitter.com/intent/tweet"
            target="_blank"
          >
            <i className="fa-brands fa-twitter"></i>
          </a>
        </div>
      );
    }
  }
  
  //ReactRedux
  const mapStateToProps = (state) => {
    return { quotes: state };
  };
  
  const mapDispatchToProps = (dispatch) => {
    return {
      submitNewQuote: (newQuote) => {
        dispatch(addQuote(newQuote));
      }
    };
  };
  
  const ConnectedQuotes = connect(mapStateToProps, mapDispatchToProps)(QuoteBox);
  
  //React Final display
  class AppWrapper extends React.Component {
    render() {
      return (
        <Provider store={store}>
          <ConnectedQuotes />
        </Provider>
      );
    }
  }
  
  const root = ReactDOM.createRoot(document.getElementById("root"));
  root.render(<AppWrapper />);