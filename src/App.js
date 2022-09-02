
import './App.css';
import React from 'react';
import { RiDoubleQuotesL, RiDoubleQuotesR, RiTwitterFill} from 'react-icons/ri'


const BACKCOLOR = ['#FF6633', '#FFB399', '#FF33FF', '#FFFF99', '#00B3E6', 
		  '#E6B333', '#3366E6', '#999966', '#99FF99', '#B34D4D',
		  '#80B300', '#809900', '#E6B3B3', '#6680B3', '#66991A', 
		  '#FF99E6', '#CCFF1A', '#FF1A66', '#E6331A', '#33FFCC',
		  '#66994D', '#B366CC', '#4D8000', '#B33300', '#CC80CC', 
		  '#66664D', '#991AFF', '#E666FF', '#4DB3FF', '#1AB399',
		  '#E666B3', '#33991A', '#CC9999', '#B3B31A', '#00E680', 
		  '#4D8066', '#809980', '#E6FF80', '#1AFF33', '#999933',
		  '#FF3380', '#CCCC00', '#66E64D', '#4D80CC', '#9900B3', 
		  '#E64D66', '#4DB380', '#FF4D4D', '#99E6E6', '#6666FF']

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      quotes: [],
      color: "run"
    }
    this.getQuotes = this.getQuotes.bind(this)
    this.changeBackground = this.changeBackground.bind(this)
  }

  
  async getQuotes() {
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': process.env.REACT_APP_WEATHER_API_KEY,
        'X-RapidAPI-Host': 'famous-quotes4.p.rapidapi.com'
      }
    };
    
    try {
      const response = await fetch('https://famous-quotes4.p.rapidapi.com/random?category=inspirational&count=1', options);
      const response_1 = await response.json();
      console.log(response_1);
      return this.setState({ quotes: response_1 });
    } catch (err) {
      return console.error(err);
    }
    }

    changeBackground() {
      setTimeout(() => {
      this.setState({
        color: BACKCOLOR[Math.floor(Math.random() * BACKCOLOR.length)]
      })   
    }, 500);
    }

    componentDidMount() {
      this.getQuotes();
      this.changeBackground();
    }
    

  render() {
    
    return (
  
    <div id="container" style={{backgroundColor: this.state.color}}>
    <div id="quote-box">
      
      {this.state.quotes.map((item) => (
        <div className="text-wrapper">
          <p id='text' style={{color: this.state.color}}><RiDoubleQuotesL /> {item.text} <RiDoubleQuotesR /></p>
          <p id='author' style={{color: this.state.color}}>- {item.author}</p>
          <a className="twitter-share-button" id="tweet-quote" style={{color: this.state.color}} title="Tweet this quote!" 
            href={"https://twitter.com/intent/tweet?hashtags=quotes&text='" + item.text + "' -" + item.author}  target="_blank" 
            rel="noreferrer"><RiTwitterFill /></a>
        </div>
      ))}
      <button id='new-quote' style={{backgroundColor: this.state.color}} onClick={() => {this.getQuotes(); this.changeBackground()}}>New quote</button>  
    </div>
    </div>
  );
}
}

export default App;
