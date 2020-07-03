import React from 'react';
import ReactDOM from 'react-dom';


// using portals to create a modal window
const Modal = props => {
  //createPortal function will take 2 arguments, 1st argument is take some block of jsx, something that we want to show on the screen
  return ReactDOM.createPortal (
    <div
    onClick={props.onDismiss}
    //   onClick={() => history.push ('/')}
      className="ui dimmer modals visible active"
    >
      <div
        onClick={e => e.stopPropagation ()}
        className="ui standard modal visible active"
      >
        <div className="header">{props.title}</div>
        <div className="content">
          {props.content}
        </div>
        <div className="actions">
          {props.actions}
        </div>
      </div>
    </div>,
    // 2nd argument is reference to the element that i want to render this portal into
    document.querySelector ('#modal')
  );
};

export default Modal;
