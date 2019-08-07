//Define action create that set your loading state.
export const fetchData = bool => {
  //return a action type and a loading state indicating it is getting data.
  return {
    type: GET_PEOPLE,
    payload: bool
  };
};

export const fetchDataFulfilled = data => {
  //Return a action type and a loading to false, and the data.
  return {
    type: GET_PEOPLE_FULFILLED,
    payload: data,
    loading: false
  };
};
