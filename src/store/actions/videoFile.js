import * as actionTypes from './actionTypes';

export const addVideo = (video) => {
    return {
        type: actionTypes.ADD_VIDEO,
        video: video
    }
}
