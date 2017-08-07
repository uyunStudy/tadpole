import React from 'react';
import ReactDOM from 'react-dom';
import {useStrict} from 'mobx';
import {message} from 'antd';

import { AppContainer } from 'react-hot-loader';
import App from './App.jsx';

window.log = console.log;

// 样式

useStrict(true);

// antd 全局设置
message.config({
    duration: 3
});

if ( process.env.NODE_ENV === 'development' ) {
  log("dev");
}

const render = (Component) => {
  ReactDOM.render(
    <AppContainer>
      {Component}
    </AppContainer>,
    document.getElementById("react")
  )
}

render(<App />);

// HMR
// https://segmentfault.com/a/1190000003872635
if (module.hot) {
  module.hot.accept('./App', () => {
    const NextApp = require('./App').default;
    render(<NextApp />)
  })
}