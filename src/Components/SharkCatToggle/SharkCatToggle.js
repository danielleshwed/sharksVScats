import React, { Component } from 'react';

import Dashboard from '../Dashboard/Dashboard';
import Toggle from 'material-ui/Toggle';
import Paper from 'material-ui/Paper';

import RefreshIndicator from 'material-ui/RefreshIndicator';

const style = {
  paper: {
    height: '100%',
    width: '50%',
    textAlign: 'center',
    margin: '0 auto',
    marginTop: '50px',
    padding: '20px'
  },
  buttonContainer: {
    textAlign: 'center'
  },
}

class SharkCatToggle extends Component {

  constructor(props){
    super(props);
    this.state = {
      cat: false,
      shark: false,
      loading: false,
      img: '',
      imgPos: 0,
      showPictures: false,
      pictureList: []
    }
    this.getPicture = this.getPicture.bind(this);
    this.handleToggle = this.handleToggle.bind(this);
  }

  /**
  Show loading state when api is fetching photo list
  **/
  showLoading(){
    return(
      <div style={style.container}>
        <RefreshIndicator
          size={40}
          left={10}
          top={0}
          status="loading" />
      </div>
    )
  }

  /**
  Set this.state.cats or this.state.sharks equal to true or false based on toggle
  **/
  handleToggle(e, toggled){
    this.setState({
      [e.target.name]: toggled,
      loading: true
    }, () => {
      this.getPicture();
    });
  }

  /**
  Get pictureList from our endpoint and set result in our state
  Show loading state when api is fetching data
  **/
  getPicture(){
    var url = `http://localhost:8080/?shark=${this.state.shark}&cat=${this.state.cat}&imgPos=${this.state.imgPos}`;
    fetch(url)
      .then(data => {
        this.setState({
          showPictures: true,
          loading: true
        })
        return data.json();
      }).then(results => {
        this.setState({
          loading: false,
          pictureList: results.picture,
          img:  results.picture[0],
          imgPos: 0
        }, () => {
          this.props.getChildData(this.state)
        });
      })
      .catch(e => {
        this.setState({
          loading: false
        });
      })
  }

  render() {
    return (
      <div style={style.buttonContainer}>
        <Paper style={style.paper} zDepth={4}>
          <Toggle
           name="shark"
           label="Sharks"
           onToggle={this.handleToggle}
           defaultToggled={false}/>
           <Toggle
            name="cat"
            label="Cats"
            onToggle={this.handleToggle}
            defaultToggled={false}/>
        </Paper>
      </div>
    );
  }
}

export default SharkCatToggle;
