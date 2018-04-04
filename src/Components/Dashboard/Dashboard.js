import React, { Component } from 'react';

import Picture from '../Picture/Picture';
import SharkCatToggle from '../SharkCatToggle/SharkCatToggle';
import { connect } from 'react-redux';

import { handleClick } from './actions';

const style = {
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
}

class Dashboard extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    document.body.style = 'background: #2196F3;'
  }

  render() {
    const { pictureList, imgPos } = this.props;

    return (
      <div>
        <SharkCatToggle />
        { this.props.showPictures ?
            <div style={style.inline}>
                <i
                  className="material-icons"
                  value="back"
                  onClick={() => this.props.handleClick("back", this.props.pictureList, this.props.imgPos)}
                  style = {style.nextButton}
                >
                  keyboard_arrow_left
                </i>
                  <Picture imgurl={this.props.img} />
                <i
                  className="material-icons"
                  value="next"
                  onClick = {() => this.props.handleClick("next", this.props.pictureList, this.props.imgPos)}
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

export function mapDispatchToProps(dispatch) {
  return {
    handleClick: (e, list, pos) => dispatch(handleClick(e, list, pos))
  }
}

export function mapStateToProps(state) {
  return {
    loading: state.toggleReducer.loading,
    cat: state.toggleReducer.cat,
    shark: state.dashboardReducer.shark,
    img: state.dashboardReducer.img,
    imgPos: state.dashboardReducer.imgPos,
    pictureList: state.toggleReducer.pictureList,
    showPictures: state.toggleReducer.showPictures
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
