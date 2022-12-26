import React from 'react';
import Modal from 'react-awesome-modal';
import Button from 'react-bootstrap/Button'

import './App.css';

class App extends React.Component{
  state = {
    sequence: [],
    frequence: -1,
    dos: 'dos',
    isRunning: false,
    msg: " ",
    uno: 'uno',
    isDone: false,
    freqB: -1
  }
  
  constructor(props) {
    super(props);
    this.inputElement = React.createRef();
    
  }

  componentDidMount(){
  }

  componentWillUnmount(){
    clearInterval(this.myFrequency)
  }

  switchInput = (inputName) => {
    const {isRunning } = this.state;
    // Get the next input field using it's name
    const afield = document.querySelector(`input[name=${inputName}`);

    (afield !== null && isRunning )? afield.focus() : console.log(`${inputName} not found`);

  }

  startCounter = () => {
    this.setState({isRunning: true});

    const afield = document.querySelector(`input[name=uno`);
    (afield !== null )? afield.focus() : console.log(`not found`);
  }

  stopCounters = () =>{
    this.setState({isRunning: false });
    clearInterval(this.myFrequency);
    clearInterval(this.freqB);
  }

  focuHandler = (e) => {
    const {isRunning} = this.state;
    // console.log("focus entered", e.target.name, 'isRunning: ', isRunning);
    const number = e.target.name;

    if (number === 'uno') {
      console.log('freqDOS a:: ', this.freqB);
      clearInterval(this.freqB);
      this.freqB = setInterval(() =>{this.switchInput('dos')}, 10000);
      console.log('freqDOS b:: ', this.freqB);
    } else {
      console.log('freqUNO a:: ', this.myFrequency);
      clearInterval(this.myFrequency);
      this.myFrequency = setInterval(() =>{this.switchInput('uno')}, 10000);
      console.log('freqUNO b:: ', this.myFrequency);
    }

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

          <input type='text' className="form-control fixBox" ref={this.inputElement} name="uno"
            onFocus={this.focuHandler}></input>

          <br></br>
          <input type='text' className="form-control fixBox" ref={this.inputElement} name="dos"
            onFocus={this.focuHandler}></input>

          <small className="text-muted form-text">After each number press enter</small>
        </div>
        <div className="main-wrp">
          <div className="msg">{ msg}</div>
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
          <Button className="btn-props" variant="outline-success" size="lg" onClick={this.stopCounters} disabled={!isRunning || isDone }>Stop</Button>
          <Button className="btn-props" variant="outline-success" size="lg" onClick={this.startCounter} disabled={isRunning}>Start</Button>
        </div>
      </div>
    );
  }
}

export default App;
