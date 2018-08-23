import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Caculator from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<Caculator />, document.getElementById('root'));
registerServiceWorker();
