import { HANDLE_CLICK } from './actions';

const initialState = {
  imgPos: 0,
  img: '',
  loading: false,
  pictureList: [],
  showPictures: false
};

/***
HANDLE CLICK: gets next image in our image array, works as a "circular array" for shark or cat, and gets
a random image when both shark and cat are toggled. Updates image url (img) and imgPos (array position)
REQUEST SUCCESS: When our fetch call to api is successful get props in our dashboard reducer as well 
**/
function dashboardReducer(state = initialState, action) {
  switch(action.type) {
    case HANDLE_CLICK:
      var pos;
      if (action.length > 10) {
        pos = Math.floor(Math.random() * action.length);
      } else if (action.name === "back") {
        pos = (action.pos - 1 + action.length ) % (action.length);
      } else {
        pos = action.pos % (action.length - 1);
        pos++;
      }
      return Object.assign({}, state, {
        img: action.list[pos],
        imgPos: pos,
      })
    case 'REQUEST_SUCCESS':
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

export default dashboardReducer;
