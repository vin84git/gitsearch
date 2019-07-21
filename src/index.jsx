import {hot} from 'react-hot-loader/root';
import React from 'react';
import {render} from 'react-dom';
import App from './App';

const HotApp = hot(App);

export const mount = async function () {
  render(
    <HotApp JSON={JSON}/>,
    document.getElementById('root') || document.createElement('div')
  );
};

mount();
