import React, { Component } from 'react';
import Paper from 'material-ui/Paper';

const style = {
  paper: {
    height: '100%',
    width: '640px',
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

  render() {
      return (
        <div>
          <Paper style={style.paper} zDepth={4}>
            { this.props.imgurl
                ? <img style= {style.img} src={this.props.imgurl} alt=''/>
                : <h1 style={{padding: '20px'}}>No Pictures to Show</h1>
            }
          </Paper>
        </div>
    );
  }
}

export default Picture;
