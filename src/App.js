import React from 'react';
import Modal from 'react-awesome-modal';
import Button from 'react-bootstrap/Button'
import './App.css';

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
    frequence: -1,
    numbers: [],
    isRunning: false,
    msg: "  ",
    modalVisible: false,
    isDone: false,
  }
  
  constructor(props) {
    super(props);
    this.inputElement = React.createRef();
    this.handleKeyDown = this.handleKeyDown.bind(this)
    
  }

  componentDidMount(){
    let val = 0 
    let numbers = []
    while(val < 1000){
        val = fx.next().value
        numbers.push(val)
      }
    this.setState({sequence: numbers})
  }

  componentWillUnmount(){
    clearInterval(this.myFrequency)
    
  }

  updateInterval = () => {
    const {counter, frequence} = this.state
    console.log('ui', counter, frequence)
    let tempCounter = frequence >= counter && counter > 0
      ? counter -1 
      : frequence
    
    if(counter === 1 ){// due the interval running every second 
      this.setState({counter: tempCounter, msg: this.parseResults()})
    }else
      this.setState({counter: tempCounter, msg: ''})

  }

  startCounter = () =>{
    this.myFrequency = setInterval(this.updateInterval, 1000)
  }

  resumeCounter = () => {
    this.startCounter()
    this.setState({
      isRunning: !this.state.isRunning, 
      msg:  'timer resumed',
    })
  }

  stopCounter = () =>{
    clearInterval(this.myFrequency)
    this.setState({
      isRunning: !this.state.isRunning, 
      msg: 'timer halted',
    })
  }

  handleKeyDown ( e) {
    const {isRunning, numbers, sequence, frequence} = this.state
    const currentEntry = this.inputElement.current.value
    // console.log(frequence, currentEntry)
    if (e.key === "Enter") {
      if(!isRunning) {
        this.setState({
          isRunning: !isRunning, 
          frequence: parseInt(currentEntry, 10),
          counter: parseInt(currentEntry, 10),
        })
        this.startCounter()
      }else{
        
        if(currentEntry && Number.isInteger(parseInt(currentEntry))){
          // const val = numbers.includes(currentEntry) ? 1 + currentEntry : 1
          const obj = Object.assign([], numbers)
          obj[currentEntry] = currentEntry in numbers ? (1 + obj[currentEntry]) : 1
          
          this.setState({
            numbers: obj, 
            msg: sequence.includes(parseInt(currentEntry, 10)) ? 'FIB' : ''
          });
        }

      }

      this.inputElement.current.value = ''
    }
}

parseResults(){
  const array = Object.keys(this.state.numbers).sort((a,b) => {return this.state.numbers[b]-this.state.numbers[a]})

  return array.map(x => `${x}:${this.state.numbers[x]},`)
}
closeModal() {
  this.setState({
      modalVisible : false
  });
}

openModal = (  ) => {
  clearInterval(this.myFrequency)
  this.setState({modalVisible: true, isDone: true})
}

  render(){
    const {counter, frequence, isRunning, msg, modalVisible, isDone} = this.state
    return (
      <div className="App">
        <div className="circle">
          <div className="counter">{counter}</div>
        </div>
        <div className="form-group">
          <label className="form-label">{frequence  > 0 ? "Please enter the next number: " 
                  : "Please enter a number for your frequence:(in seconds)"}</label>
          <input type='text' className="form-control fixBox" ref={this.inputElement}
            disabled={frequence > 0 && !isRunning} 
            onKeyDown={this.handleKeyDown}></input>
          <small className="text-muted form-text">After each number press enter</small>
        </div>
        <div className="main-wrp">
          <div className="msg">{msg}</div>
          <br/>
        </div>
        <Modal visible={modalVisible} width="400" height="250" effect="fadeInUp" onClickAway={() => this.closeModal()}>
          <div className="modalClass">
            <div className="btn-close" onClick={() => this.closeModal()}>X</div>
            <br/><br/>
            <h1>Game Over</h1>
            <p>Thanks for playing</p>
          </div>
        </Modal>
        <div>
          <Button className="btn-props" variant="outline-success" size="lg" onClick={this.stopCounter} disabled={!isRunning || isDone }>Halt</Button>
          <Button className="btn-props" variant="outline-success" size="lg" onClick={this.resumeCounter} disabled={isRunning || isDone}>Resume</Button>
          <Button className="btn-props" variant="outline-success" size="lg" onClick={this.openModal} disabled={isDone}>Quit</Button>
        </div>
      </div>
    );
  }
}

export default App;
