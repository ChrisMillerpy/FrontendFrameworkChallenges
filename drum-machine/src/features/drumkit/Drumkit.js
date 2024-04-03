import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { changeAudioName } from './drumkitSlice';

const playAudio = async (key) => {
  document.querySelector(`audio#${key}`).play();
};

const Drumkit = () => {
  const drumkitArr = [
    {
      name: 'Heater 1',
      key: 'Q',
      audioSRC: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3'
    },
    {
      name: 'Heater 2',
      key: 'W',
      audioSRC: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3'
    },
    {
      name: 'Heater 3',
      key: 'E',
      audioSRC: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3'
    },
    {
      name: 'Heater 4',
      key: 'A',
      audioSRC: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3'
    },
    {
      name: 'Clap',
      key: 'S',
      audioSRC: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3'
    },
    {
      name: 'Open-HH',
      key: 'D',
      audioSRC: 'https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3'
    },
    {
      name: 'Kick-n\'-Hat',
      key: 'Z',
      audioSRC: 'https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3'
    },
    {
      name: 'Kick',
      key: 'X',
      audioSRC: 'https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3'
    },
    {
      name: 'Closed-HH',
      key: 'C',
      audioSRC: 'https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3'
    }
  ];
  
  const currentAudioName = useSelector((state) => state.drumkit.currentAudioName);
  const currentAudioKey = useSelector((state) => state.drumkit.currentAudioKey);
  const dispatch = useDispatch();

  if (currentAudioKey !== '') {
    playAudio(currentAudioKey);
  }

  document.addEventListener('keydown', (event) => {
    const key = event.key.toUpperCase();
    if ('QWEASDZXC'.includes(key)) {
      let name = '';
      drumkitArr.forEach((drumPad) => {
        if (drumPad.key === key) {
          name = drumPad.name;
        }
      });
      dispatch(changeAudioName({
        name: name,
        key: key,
      }))
    }
  });

  return (
    <div id='drum-machine' className='container-fluid'>
      <div className='row'>
        {drumkitArr.map((drumkitElement) => (
          <div key={drumkitElement.key} className='col-4 mb-1'>
            <button onClick={() => dispatch(changeAudioName({
                                     name: drumkitElement.name,
                                     key: drumkitElement.key,
                                    }))}
                    id={drumkitElement.key}
                    className='drum-pad w-100 h-100 btn btn-default btn-primary'>
              {drumkitElement.key}
              <audio onEnded={() => dispatch(changeAudioName({
                name: '',
                key: '',
              }))} src={drumkitElement.audioSRC} className='clip' id={drumkitElement.key}></audio>
            </button>
          </div>
        ))}
      </div>
      <div className='row'>
        <div className='col' id='display'>
          <p>{currentAudioName}</p>
        </div>
      </div>
    </div>
  );
};

export default Drumkit;