import { createReducer } from '@reduxjs/toolkit';
import { setTalents, setOneTalent } from './actions';

const initialState = {
  talents: [],
  talent: {},
};

const talentsReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setTalents, (state, action) => {
      state.talents = action.payload;
    })
    .addCase(setOneTalent, (state, action) => {
      state.talent = action.payload;
    });
});

export default talentsReducer;
