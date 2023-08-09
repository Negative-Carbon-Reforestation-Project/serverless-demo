import React from 'react';
import ReactDOM from 'react-dom';
import Index from './components/pages/Index';

/**
 * Stub to test manual Jest  config, still a Work In Progress
 */
it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Index />, div);
});