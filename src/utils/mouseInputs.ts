type HandleMouse = (
  e: MouseEvent,
  setMouse: React.Dispatch<React.SetStateAction<typeof defaultMouseState>>
) => void;

export const defaultMouseState = {
  isDown: false,
  y: {
    start: 0,
    end: 0,
    distanceTravelled: 0,
  },
  x: {
    start: 0,
    end: 0,
    distanceTravelled: 0,
  },
};

export const handleMouseDown: HandleMouse = function (e, setMouse) {
  setMouse((state) => {
    const newState = { ...state };
    newState.isDown = true;
    newState.x.start = e.clientX;
    newState.y.start = e.clientY;
    return newState;
  });
};

export const handleMouseMove: HandleMouse = function (e, setMouse) {
  setMouse((state) => {
    const newState = { ...state };
    newState.x.distanceTravelled = e.clientX - newState.x.start;
    newState.y.distanceTravelled = newState.y.start - e.clientY;
    return newState;
  });
};

export const handleMouseUp: HandleMouse = function (e, setMouse) {
  setMouse((state) => {
    const newState = { ...state };
    newState.x.end = e.clientX;
    newState.y.end = e.clientY;
    newState.isDown = false;
    return newState;
  });
};
