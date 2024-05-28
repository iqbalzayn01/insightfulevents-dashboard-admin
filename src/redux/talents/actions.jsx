import { createAction } from '@reduxjs/toolkit';
import { getAllTalents } from '../../utils/fetch';

export const setTalents = createAction('talents/setTalents');
export const setOneTalent = createAction('talents/setOneUser');

export const fetchAllTalents = () => async (dispatch) => {
  try {
    const res = await getAllTalents();
    const dataTalents = res.data;
    dispatch(setTalents(dataTalents));
  } catch (error) {
    console.error('Get All Talents Error:', error);
  }
};
