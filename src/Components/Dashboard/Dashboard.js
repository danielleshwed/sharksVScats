import React, { Component } from 'react';

import RaisedButton from 'material-ui/RaisedButton';
import Picture from '../Picture/Picture';

import Toggle from 'material-ui/Toggle';
import Paper from 'material-ui/Paper';
import SharkCatToggle from '../SharkCatToggle/SharkCatToggle';

const style = {
  loading: {
    display: 'flex',
    textAlign: 'center',
    margin: '0 auto',
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
      pictureList: [],
      update: false
    }
    this.handleButtonClick = this.handleButtonClick.bind(this);
    this.getChildData = this.getChildData.bind(this);
  }

  componentDidMount(){
    document.body.style = 'background: #2196F3;'
  }

  getChildData(data) {
     this.setState({
       cat: data.cat,
       shark: data.shark,
       loading: data.loading,
       img: data.img,
       imgPos: data.imgPos,
       pictureList: data.pictureList,
       showPictures: data.showPictures,
       update: true
     });
   }

  /**
  If sharks/cats is true ie length of list is > 10, then grab a random image
  else if the back button was clicked, decrease imagePosition to get last image seen
  else the next button was clicked so get next image in our image array
  **/
  handleButtonClick(e, val){
    let pos;
    if(this.state.pictureList.length > 10){
      pos = Math.floor(Math.random()*this.state.pictureList.length);
    }
    else if(e == "back"){
      pos = (this.state.imgPos - 1 + this.state.pictureList.length ) % (this.state.pictureList.length);
    } else {
      pos = this.state.imgPos % (this.state.pictureList.length-1);
      pos++;
    }
    this.setState({
      imgPos: pos,
      img: this.state.pictureList[pos]
    });
  }

  render() {
    console.log(this.state)
    return (
      <div>
        {this.state.loading ? this.showLoading() : ''}
        <SharkCatToggle getChildData={this.getChildData} />
        { this.state.showPictures ?
            <div style={style.inline}>
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
              </div>
        : null }
      </div>
    );
  }
}

export default Dashboard;
