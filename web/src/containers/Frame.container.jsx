import React, {Component} from 'react';

import { withRouter } from 'react-router-dom';

class Frame extends Component {
  render() {
    return (
      <div>
        1
        {this.props.children}  
      </div>
    )
  }
}

export default withRouter(Frame);