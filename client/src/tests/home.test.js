import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Home } from '../components/Home'

it('renders correctly', () => {
  const {queryByTestId } = render(<Home/>)
  
})