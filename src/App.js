import React from 'react';
import './App.css';
import Button from './components/Button';
import Label from './components/Label'

const ENTER_KEY = 13;

function* fibonacci() {
  var previous_first = 0, previous_second = 1, next = 1
  
  while(true) {
      next = previous_first + previous_second
      previous_first = previous_second
      previous_second = next
      
      yield next
  }

}

const fx = fibonacci()

class App extends React.Component{
  state = {
    counter: 0,
    sequence: [],
    X: -1,
    inputs: {},
    isRunning: false,
    lastEntry: "",
    msg: ""
  }

  componentDidMount(){
    let val = 0 
    let numbers = []
    while(val < 1000){
        val = fx.next().value
        numbers.push(val)
    }

    this.setState({sequence: numbers})

    // this.myFrequency = this.startCounter()
    this.handleKeyDown = this.handleKeyDown.bind(this)
  }

  componentWillUnmount(){
    clearInterval(this.myFrequency)
  }

  startCounter = () =>{
    this.myFrequency = setInterval(this.updateInterval, 1000)
  }

  resumeCounter = () => {
    this.startCounter()
    this.setState({isRunning: !this.state.isRunning, msg:  'timer resumed'})
  }

  updateInterval = () => {
    let y = -1;
    const empty = ''
    let aux;
    if(this.state.counter === this.state.X){
      y = 0;
    }else{
      y = ++this.state.counter
    }

    if(this.state.sequence.includes(parseInt(this.state.lastEntry, 10))){
      this.setState({counter: y, msg: 'FIB', lastEntry: ''})
    }else{
      if(this.state.X == this.state.counter){
        aux = this.display(this.state.inputs)
        this.setState({counter: y, msg: aux})
      }else
        this.setState({counter: y, msg: empty})
    }

  }

  stopCounter = () =>{
    clearInterval(this.myFrequency)
    this.setState({isRunning: !this.state.isRunning, msg: 'timer halted'})
  }

  quitRunning = (  ) => {
    clearInterval(this.myFrequency)
    alert("Thanks for playing.")    
  }

  handleKeyDown ( e) {
    const {X, isRunning, inputs} = this.state
    if (Number.isInteger(parseInt(e.target.value))  && e.keyCode === ENTER_KEY) {
      if(!isRunning) {
        this.startCounter(parseInt(e.target.value, 10))
        this.setState({isRunning: !isRunning, 
            X: parseInt(e.target.value, 10)})
      }else{
        if(Number.isInteger(parseInt(e.target.value))){
          let obj = inputs
          obj[e.target.value] = e.target.value in obj ? (1+ obj[e.target.value]) : 1
          
          this.setState({inputs: obj, lastEntry: e.target.value});
        }
      }
      document.getElementById('theInput').value = ''
    }
}

display(val){
  const array = Object.keys(val).sort((a,b) => {return val[b]-val[a]})

  return array.map(x => `${x}:${val[x]},`)
}
        
  render(){
    const {counter, X, isRunning, msg} = this.state
    return (
      <div className="App">
        <header className="App-header">
          <div className="shade">
            <div className="counter">{counter}</div>
          <div className="main-wrp">
            <Label data={X} /><br></br>
          </div>
          <div className="main-wrp">
            <input type='text' id="theInput" style={{width: '265px'}} 
              disabled={X > 0 && !isRunning}
              onKeyDown={this.handleKeyDown}></input>
          </div>
          <div className="main-wrp">
            <div>&nbsp;{msg}&nbsp;</div>
          </div>
          <div className="button-wrp">
            <Button item={{name: 'halt'}} onClickHandlker={this.stopCounter} isEnable={isRunning}/>
            <Button item={{name: 'resume'}} onClickHandlker={this.resumeCounter} isEnable={!isRunning}/>
            <Button item={{name: 'quit'}} onClickHandlker={this.quitRunning} isEnable={true}/>
          </div>
          </div>
        </header>
      </div>
    );
  }
}

export default App;
