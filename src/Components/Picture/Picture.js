import React, { Component } from 'react';

import Paper from 'material-ui/Paper';

const style = {
  paper: {
    height: '100%',
    width: '50%',
    margin: 20,
    textAlign: 'center',
    margin: '0 auto',
  },
  img: {
    height: 'auto',
    width: '80%',
    padding: '50px',
  }
};

class Picture extends Component {
  constructor(props){
    super(props);

    this.state = {
      imgurl: ''
    }
  }

  componentWillReceiveProps(nextProps){
    this.setState({
      imgurl: nextProps.imgurl
    })
  }
  render() {
    if(this.state.imgurl !== undefined){
      return (
        <div >
        <Paper style={style.paper} zDepth={4}>
          <img style= {style.img} src={this.state.imgurl} />
        </Paper>
        </div>
      );
    } else{
      return (
        <div >
        <Paper zDepth={4}>
          <h1 style={{padding:'20px'}}>No Pictures to Show</h1>
        </Paper>
        </div>
      )
    }

  }
}

export default Picture;
