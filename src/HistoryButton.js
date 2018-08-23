import React, {Component} from 'react'
import Caculator from './App.js'

function HistoryButton (props){
   return(
            <ol>
              {props.historyrecord.map((record,index)=>
              <li>
                <a key={`history${index}`}>{record}</a>
                <button onClick={props.ondeletefunc(index)}>delete</button>
              </li>)}
            </ol>

      )

}

export default HistoryButton;
