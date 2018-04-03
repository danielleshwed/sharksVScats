import React, { Component } from 'react';

import RaisedButton from 'material-ui/RaisedButton';
import Picture from '../Picture/Picture';
import RefreshIndicator from 'material-ui/RefreshIndicator';

import Toggle from 'material-ui/Toggle';
import Paper from 'material-ui/Paper';

const style = {
  paper: {
    height: '100%',
    width: '50%',
    textAlign: 'center',
    margin: '0 auto',
    marginTop: '50px',
    padding: '20px'
  },
  loading: {
    display: 'flex',
    textAlign: 'center',
    margin: '0 auto',
  },
  buttonContainer: {
    textAlign: 'center'
  },
  inline: {
    display: 'flex',
    marginTop: '20px',
    textAlign: 'center'
  },
  nextButton: {
    textAlign: 'center',
    margin: 'auto',
    fontSize: '60px',
    color: 'white',
  },
  container: {
    position: 'fixed',
    top: '50%',
    left: '50%'
  },
}

class Dashboard extends Component {
  constructor(){
    super();

    /**
    cat and shark: true or false based on whether cat and shark are toggled on or off
    Loading: whether to display a loading icon or not
    img: the img url of the picture
    imgPos: corresponds to array index so user is able to click next or back button to display
    the last image seen.
    showPictures: whether to display pictures or not
    pictureList: current picture list of cats/sharks or both
    **/
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
    this.handleButtonClick = this.handleButtonClick.bind(this);
    this.handleToggle = this.handleToggle.bind(this);
  }

  componentDidMount(){
    document.body.style = 'background: #2196F3;'
  }

  /**
  Set this.state.cats or this.state.sharks equal to true or false based on toggle
  **/
  handleToggle(e, toggled){
    this.setState({
      [e.target.name]: toggled,
    }, () => {
      this.getPicture();
    });
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
          status="loading"
        />
      </div>
    )
  }

  /**
  If sharks/cats is true ie length of list is > 10, then grab a random image
  else if the back button was clicked, decrease imagePosition to get last image seen
  else the next button was clicked so get next image in our image array
  **/
  handleButtonClick(e, val){
    var pos;
    if(this.state.pictureList.length > 10){
      pos = Math.floor(Math.random()*this.state.pictureList.length);
    }
    else if(e == "back"){
      if(this.state.imgPos == 0){
        pos = 9;
      }
      else{
        pos = this.state.imgPos - 1;
      }
    }
    else{
      if(this.state.imgPos == 9){
        pos = 0;
      }
      else{
        pos = this.state.imgPos + 1;
      }
    }
    this.setState({
      imgPos: pos,
      img: this.state.pictureList[pos]
    });
  }

  /**
  Get pictureList from our endpoint and set result in our state
  Show loading state when api is fetching data
  **/
  getPicture(){
    var url = 'http://localhost:8080/' + "?shark=" + this.state.shark + "&cat=" + this.state.cat + "&imgPos=" + this.state.imgPos;
    fetch(url)
      .then(data => {
        this.setState({
          loading: true,
          showPictures: true,
        })
        return data.json();
      }).then(results => {
        this.setState({
          loading: false,
          pictureList: results.picture,
          img:  results.picture[0],
          imgPos: 0
        })
      })
  }

  render() {
    return (
      <div>
        {this.state.loading ? this.showLoading() : ''}
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
        { this.state.showPictures ?
        (<div style={style.inline}>
            <i
              className="material-icons"
              value="back"
              onClick={this.handleButtonClick.bind(this, "back")}
              style = {style.nextButton}
            >
              keyboard_arrow_left
            </i>
            <Picture imgurl={this.state.img} />
            <i
              className="material-icons"
              value="next"
              onClick = {this.handleButtonClick.bind(this, "next")}
              style = {style.nextButton}
            >
              keyboard_arrow_right
            </i>
          </div>) : null }


      </div>
    );
  }
}

export default Dashboard;
