export const SET_SCHEDULE_HEIGHT = "SET_SCHEDULE_HEIGHT";

export function setScheduleHeight(height) {
  return {
    type: SET_SCHEDULE_HEIGHT,
    scheduleHeight: height
  }
}