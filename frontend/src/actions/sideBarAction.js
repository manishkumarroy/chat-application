export const sideBarChanger = (sideBarChangerDetails) => dispatch =>
    dispatch({
        payload: sideBarChangerDetails.value,
        type: sideBarChangerDetails.type

    })


