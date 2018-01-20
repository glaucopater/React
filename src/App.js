import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
 

export class Box extends React.Component {
    constructor(props) {
        super(props);  
         this.state = {
            values: this.getStorage(),
            value : ''
         }
         
  
        this.handleChange = this.handleChange.bind(this)         
        this.handleTextClick = this.handleTextClick.bind(this)   
        this.handleButtonClick = this.handleButtonClick.bind(this)    
        this.handleKeyPress = this.handleKeyPress.bind(this)    
    } 
    
    
     checkQueryString()
    {
        var queryString = this.getParameterByName("values");
        var currenValues = []
        if (queryString) {
            var tokens = queryString.split(",");

            for (var i = 0; i < tokens.length; i++) {
                currenValues.push(tokens[i]);
            }

        }
        return currenValues
    
    }
    
     sortValues(a, b) {
            return (b < a) ? 1 : -1;
        }
    
  getParameterByName(name, url) {
            if (!url) url = window.location.href;
            name = name.replace(/[[]]/g, "\\$&");
            var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
                results = regex.exec(url);
            if (!results) return null;
            if (!results[2]) return '';
            return decodeURIComponent(results[2].replace(/\+/g, " "));
        }
    
  getStorage() {
        var currenValues = this.checkQueryString()
       
        var storage = window.localStorage.getItem("react_sorrt");
            
            if (storage !== null && storage !== '') 
            { 
                var storedValues = storage.split(",")
                 for (var i = 0; i < storedValues.length; i++) {
                   currenValues.push(storedValues[i])
                } 
            } 
        return currenValues;
    }
    
    handleChange(event){ 
        if(event.target.value!=='')
       {
        this.setState({value: event.target.value})  
           
       }
        else
            this.setState({value: ''})  
      
         
    }
     
    
    handleTextClick(event) {  
        event.target.value='' 
     }   
   
    updateValue(event)
    {
       if(this.state.value!=='' )
       {
        var currentValues = this.state.values;  
        currentValues.push(this.state.value)
        currentValues.sort(this.sortValues)
        this.setState({values: currentValues})   
        window.localStorage.setItem("react_sorrt",this.state.values);
        event.preventDefault(this.state.values)
       }   
    }
    
    
    
    handleButtonClick(event) {  
        this.updateValue(event)
    }   
    
    handleKeyPress(event) {
        if (event.key === 'Enter') {
            this.updateValue(event)  
            event.preventDefault()
        }
         
    }
      
      
    render() {        
        return (  
            <div>
            <form>
                <label>Enter a new value:</label>
                <input className="input" type="text" onChange={this.handleChange} onClick={this.handleTextClick} onKeyPress={this.handleKeyPress} /> 
                <input type="button" value="Add" onClick={this.handleButtonClick} />
            </form>  
            <ul className="valueList">
                {this.state.values.map((val,index)=> {return <li key={index}>{val}</li>})} 
            </ul>
            </div>
        );
    } 
};
 


class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React Sorrt</h1>
        </header> 
        <Box/>
      </div>
    );
  }
}

export default App;
