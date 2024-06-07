import { createAction } from '@reduxjs/toolkit';
import { getAllSchedules, createSchedules } from '../../utils/fetch';

export const setSchedules = createAction('schedules/setSchedules');
export const setOneSchedule = createAction('schedules/setOneSchedule');
export const createSchedule = createAction('schedules/createSchedule');
export const updateSchedule = createAction('schedules/updateSchedule');
export const removeSchedule = createAction('schedules/removeSchedule');

export const fetchAllSchedules = () => async (dispatch) => {
  try {
    const res = await getAllSchedules();
    const dataSchedules = res.data;
    dispatch(setSchedules(dataSchedules));
  } catch (error) {
    console.error('Get All Schedules Error:', error);
  }
};

export const fetchCreateSchedule = () => async (dispatch) => {
  try {
    const res = await createSchedules();
    const dataSchedules = res.data;
    console.log('TEST SCHEDULES', dataSchedules);
    dispatch(createSchedule(dataSchedules));
  } catch (error) {
    console.error('Create Schedules Error:', error);
  }
};
