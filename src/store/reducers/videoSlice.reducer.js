import { SET_VIDEO_DURATION, SET_PLAY_LIST } from '../types/videoSlice.type';

const initState = {
  videoDuration: 0,
  playList: []
}
export default (state = initState, action) => {
switch(action.type) {
 case SET_VIDEO_DURATION :
  return {...state, videoDuration: action.payload.videoDuration}
 case SET_PLAY_LIST :
  return {...state, playList: action.payload.playList}
 default :
  return state
 }
}