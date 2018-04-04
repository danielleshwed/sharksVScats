import { HANDLE_TOGGLE, REQUESTED_PICTURES, REQUEST_SUCCESS } from './actions';

const initalState = {
  cat: false,
  shark: false,
  loading: false,
  img: '',
  pictureList: [],
  imgPos: 0,
  showPictures: false
};

/***
HANDLE_TOGGLE: on toggle of Sharks or Cats change sharks/cats to true/false
REQUESTED_PICTUERS: update state to show loading spinner
REQUEST_SUCCESS: update state to include picture list, imgurl, dismiss loading state 
***/
function toggleReducer(state = initalState, action) {
  switch(action.type) {
    case HANDLE_TOGGLE:
      return Object.assign({}, state, {
        [action.name]: action.toggled
      })
    case REQUESTED_PICTURES:
      return Object.assign({}, state, {
        loading: true
      })
    case REQUEST_SUCCESS:
      return Object.assign({}, state, {
        loading: false,
        img: action.img,
        pictureList: action.pictureList,
        imgPos: 0,
        showPictures: true
      })
    default:
      return state;
  }
}

export default toggleReducer;
