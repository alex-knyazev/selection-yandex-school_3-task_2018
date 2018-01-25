import React from 'react'

import arrowRight from '../../../../assets/arrow.svg';
import arrowLeft from '../../../../assets/arrow2.svg';

export default (props) => {
  const {
    isShow,
    type,
    handleClick
  } = props;
  
  if(!isShow) {
    return null;
  }

  const typeToSettings = {
    'previous': {
      img: arrowLeft,
      alt: 'to previous day'
    },
    'next': {
      img: arrowRight,
      alt: 'to next dat'
    }
  };
  const settings = typeToSettings[type];

  return (
      <div className="navigationDateButton" onClick={handleClick}>
        <img alt={settings.alt} src={settings.img} />
      </div>
  )
}
