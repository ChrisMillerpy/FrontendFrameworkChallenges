import logo from './logo.svg';
import './App.css';
import React from 'react';
import ReactDOM from 'react-dom/client';

const quotes = [
  {
    quote: 'You must be the change you wish to see in the world.',
    author: 'Mahatma Gandhi'
  },
  {
    quote: 'Spread love everywhere you go. Let no one ever come to you without leaving happier.',
    author: 'Mother Teresa'
  },
  {
    quote: 'The only thing we have to fear is fear itself.',
    author: 'Franklin D. Roosevelt'
  },
  {
    quote: 'Darkness cannot drive out darkness: only light can do that. Hate cannot drive out hate: only love can do that.',
    author: 'Martin Luther King Jr.'
  },
  {
    quote: 'Do one thing every day that scares you.',
    author: 'Eleanor Roosevelt'
  },
  {
    quote: 'Well done is better than well said.',
    author: 'Benjamin Franklin'
  },
  {
    quote: 'It is during out darkest moments that we must focus to see the light.',
    author: 'Aristotle'
  }
];

class QuoteMachine extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0,
      quote: quotes[0].quote,
      author: quotes[0].author
    }

    this.nextQuote = this.nextQuote.bind(this);
  }

  nextQuote() {
    const newIndex = (this.state.index + 1) % quotes.length;
    this.setState((state) => ({
      index: newIndex,
      quote: quotes[newIndex].quote,
      author: quotes[newIndex].author
    }));
  }

  render() {
    return (
      <main className='text-center m-auto' id='quote-machine'>
        <div id="quote-box" className='card'>
          <div className='card-header'>
            Quote Machine
          </div>
          <div className='card-body'>
            <blockquote className='blockquote'>
              <p id='text'>{this.state.quote}</p>
              <footer id='author' className='blockquote-footer'>{this.state.author}</footer>
            </blockquote>
            <a target='_blank' id='tweet-quote' href='https://twitter.com/intent/tweet' className='btn btn-secondary card-link'><i className='fa-brands fa-x-twitter'></i></a>
            <button id='new-quote' className='btn btn-secondary card-link' onClick={this.nextQuote}>Next Quote <i className='fa-solid fa-arrow-right'></i></button>
          </div>
        </div>
      </main>
    );
  }
}

export default QuoteMachine;
