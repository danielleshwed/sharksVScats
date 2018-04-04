export const HANDLE_TOGGLE = 'HANDLE_TOGGLE';
export const FETCH_PICTURES = 'FETCH_PICTURES';
export const REQUESTED_PICTURES = 'REQUESTED_PICTURES';
export const REQUEST_SUCCESS = "REQUEST_SUCCESS";

/***
When Shark or Cat or both is toggled, fetch picture list from API
***/
export function handleToggle(e, toggled, cat, shark) {
  return function (dispatch){
    return fetchPictures(e.target.name, toggled, cat, shark, dispatch)
  }
}

/***
Dispatch action to reducer to update state to toggle shark: true/false or cat: true/false
**/
export function toggleChange(e, toggled){
  return { type: HANDLE_TOGGLE, name: e, toggled: toggled }
}

/**
Dispatch action to reducer to trigger loading state
***/
export function requestPictures() {
  return { type: REQUESTED_PICTURES }
}

/**
Dispatch action to reducer once fetch is complete to update state with pictureList and img url
***/
export function requestPicturesSuccess(pictureList, img){
  return { type: REQUEST_SUCCESS, pictureList: pictureList, img: img }
}

/***
API call to custom end point to grab picture list based on whether shark/ cat or both is toggled
***/
export function fetchPictures(name, toggled, cat, shark, dispatch) {
  if(name === 'shark') {
    shark = toggled;
  } else {
    cat = toggled
  }
  const url = `http://localhost:8080/?shark=${shark}&cat=${cat}`;

  dispatch(toggleChange(name, toggled))
  dispatch(requestPictures())

  return fetch(url)
      .then(data => data.json())
      .then(results => {
        dispatch(requestPicturesSuccess(results.picture, results.picture[0]))
      })
      .catch(e => {
        return 'error'
      })
}
