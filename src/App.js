import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import HistoryButton from './HistoryButton'


const DidOperation = {
'+' : (prevValue, nextvalue) => prevValue + nextvalue,
'-' : (prevValue, nextvalue) => prevValue - nextvalue,
'*' : (prevValue, nextvalue) => prevValue * nextvalue,
'/' : (prevValue, nextvalue) => prevValue / nextvalue,
'=' : (prevValue, nextvalue) => nextvalue
}
class Caculator extends Component {
constructor() {
  super();
  this.state = {
    displayValue: '0',
    waitingforOperand: false,
    operator:'',
    value: null,
    history:[],
  };
  this.inputdigit = this.inputdigit.bind(this);
}





inputdigit = (digit) => {
  const {displayValue, waitingforOperand} = this.state
  if (waitingforOperand){
    this.setState({
      displayValue: String(digit),
      waitingforOperand: false,
    })
  }else{
    this.setState({
      displayValue:(displayValue === '0')? String(digit):displayValue + digit
    });
  }
}
deleteItem = (historyIndex)=> {

  console.log(historyIndex)
  const {history} = this.state
  const newhistory = history.slice()
  newhistory.splice(historyIndex,1)
  this.setState({history: newhistory});
}
inputadot = (dot) => {
  const {displayValue, waitingforOperand} = this.state;
  if(waitingforOperand){
    this.setState({
      displayValue: '.',
      waitingforOperand: false,
    })
  }else{
    if (displayValue.indexOf('.') === -1){
      this.setState({
        displayValue: displayValue + '.',
      });
   }

  }
}


clearAll = () => {
  const {displayValue} = this.state;
  this.setState ({
    displayValue: '0',
  })
}

signtoggle = () => {
  const {displayValue} = this.state;
  const newValue = parseFloat(displayValue) * -1
  this.setState({
     displayValue: String(newValue)
   })
}

inputOprator = (operatorSign) =>{
let returnvalue =0


  const {operator, waitingforOperand,value,displayValue,history} = this.state;
  const inputValue = parseFloat(displayValue);
  if (value == null){
    this.setState({
      value: inputValue,
    })
  }else if(operator){
    const currentvalue = parseFloat(value)
    const historyoperator =null
    const newValue = DidOperation[operator](currentvalue,inputValue)
    let newhistory = history.slice();
    if (operator=='+'||operator == '-'|| operator == '*' || operator == '/'){
      newhistory.push(currentvalue+operator+inputValue+'='+newValue)
    }
    this.setState({
      value: newValue,
      displayValue: String(newValue),
      history:newhistory,
    })

  }
  this.setState ({
     operator: operatorSign,
     waitingforOperand: true,
   })
}

  render() {

    return (

       <div className = "caculatorPannel">
          <div className="displayplace">{this.state.displayValue}</div>
          <div className="displayplace">{this.state.history}</div>
          <button className="button" onClick = {() => this.inputdigit(0)}>0</button>
          <button className="button" onClick = {() => this.inputdigit(1)}>1</button>
          <button className="button" onClick = {() => this.inputdigit(2)}>2</button>
          <button className="button" onClick = {() => this.inputdigit(3)}>3</button>
          <button className="button" onClick = {() => this.inputdigit(4)}>4</button>
          <button className="button" onClick = {() => this.inputdigit(5)}>5</button>
          <button className="button" onClick = {() => this.inputdigit(6)}>6</button>
          <button className="button" onClick = {() => this.inputdigit(7)}>7</button>
          <button className="button" onClick = {() => this.inputdigit(8)}>8</button>
          <button className="button" onClick = {() => this.inputdigit(9)}>9</button>
          <button className="button" onClick = {() => this.inputadot()}>.</button>
          <button className="button" onClick = {() => this.signtoggle()}>+/-</button>

          <div className="operatorpannel">
          <button className="button" onClick = {() => this.clearAll()}>AC</button>
          <button className="button" onClick = {() => this.inputOprator('+')}>+</button>
          <button className="button" onClick = {() => this.inputOprator('-')}>-</button>
          <button className="button" onClick = {() => this.inputOprator('*')}>x</button>
          <button className="button" onClick = {() => this.inputOprator('/')}>/</button>
          <button className="button" onClick = {() => this.inputOprator('=')}>=</button>
          </div>
          <div className="historyButtonpannel">
          <HistoryButton historyrecord={this.state.history} ondeletefunc = {()=>this.deleteItem}/>
          </div>
       </div>

    );
  }
}

export default Caculator;
