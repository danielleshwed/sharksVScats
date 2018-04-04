import React, { Component } from 'react';

import Toggle from 'material-ui/Toggle';
import Paper from 'material-ui/Paper';
import RefreshIndicator from 'material-ui/RefreshIndicator';

import { connect } from 'react-redux';
import { handleToggle } from './actions';

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
  container: {
    position: 'fixed',
    top: '50%',
    left: '50%'
  },
}

class SharkCatToggle extends Component {
  constructor(props) {
    super(props);

    this.showLoading = this.showLoading.bind(this);
  }

  /**
  Show loading state when api is fetching photo list
  **/
  showLoading() {
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

  render() {
    const { handleToggle, cat, shark } = this.props;

    return (
      <div style={style.buttonContainer}>
        {this.props.loading ? this.showLoading() : ''}
          <Paper style={style.paper} zDepth={4}>
            <Toggle
             name="shark"
             label="Sharks"
             onToggle={(e, toggled) => handleToggle(e, toggled, cat, shark)}
             defaultToggled={false}/>
             <Toggle
              name="cat"
              label="Cats"
              onToggle={(e, toggled) => handleToggle(e, toggled, cat, shark)}
              defaultToggled={false}/>
          </Paper>
      </div>
    );
  }
}

export function mapDispatchToProps(dispatch) {
  return {
    handleToggle: (e, toggled, cat, shark) => dispatch(handleToggle(e, toggled, cat, shark))
  }
}

function mapStateToProps(state) {
  return {
    loading: state.toggleReducer.loading,
    cat: state.toggleReducer.cat,
    shark: state.toggleReducer.shark,
    img: state.toggleReducer.img,
    imgPos: state.toggleReducer.imgPos,
    pictureList: state.toggleReducer.pictureList
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SharkCatToggle);
