import React from 'react';
import App from './App';
import { render, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter, MemoryRouter, Router } from 'react-router-dom';
import { createMemoryHistory } from 'history'; // this is a dependency of React Router

jest.mock('../apiCalls');
import { getFox } from '../apiCalls';

describe('App', () => {
  describe('Unit Tests', () => {
    it('Should render the heading', () => {
      const { getByRole } = render(<BrowserRouter><App /></BrowserRouter>);
      const heading = getByRole('heading', { name: 'Puppies or Sharks?'})
    
      expect(heading).toBeInTheDocument();
    });

    it('Should render a nav', () =>{
      const { getByRole } = render(<BrowserRouter><App /></BrowserRouter>);
      const navigation = getByRole('navigation');

      expect(navigation).toBeInTheDocument();
    
    });
    it('Should change the current location when a navlink is clicked', () => {
      const testHistoryObject = createMemoryHistory();
      const { getByRole } = render(<Router history={testHistoryObject}><App /></Router>);
      
      console.log(testHistoryObject);
      expect(testHistoryObject.location.pathname).toEqual('/');

      const puppiesLink = getByRole('link', {name: 'Puppies'});

      fireEvent.click(puppiesLink);

      expect(testHistoryObject.location.pathname).toEqual('/puppies');

    });
    
  });

  describe('Integration Tests', () => {
    it('Should render 9 puppies on click', () => {
      const { getByRole, getAllByRole } = render(<MemoryRouter><App /></MemoryRouter>);
      const puppiesLink = getByRole('link', { name: 'Puppies'});
      const welcomeMessage = getByRole('heading', {name: 'Welcome! Click on the links above to see a variety of creatures'});
      
      expect(welcomeMessage).toBeInTheDocument();

      fireEvent.click(puppiesLink);

      expect(welcomeMessage).not.toBeInTheDocument();

      const images = getAllByRole('img');

      expect(images).toHaveLength(9);
    
    });

    it('Should render 9 sharks on click', () => {
      console.log(window.location.pathname);
      const { getByRole, getAllByRole } = render(<MemoryRouter><App /></MemoryRouter>);
      const sharksLink = getByRole('link', { name: 'Sharks'});
      const welcomeMessage = getByRole('heading', {name: 'Welcome! Click on the links above to see a variety of creatures'});
      
      expect(welcomeMessage).toBeInTheDocument();

      fireEvent.click(sharksLink);

      expect(welcomeMessage).not.toBeInTheDocument();

      const images = getAllByRole('img');

      expect(images).toHaveLength(9);
    
    });

    it('should render a random fox to the page', async () => {
      getFox.mockResolvedValue({
        image: "https://randomfox.ca/images/109.jpg"
      });
      const { getByRole } = render(<MemoryRouter><App /></MemoryRouter>);

      const goatLink = getByRole('link', {name:'Goats'});

      fireEvent.click(goatLink);

      const foxImage = await waitFor( () => getByRole('img'));

      expect(foxImage).toBeInTheDocument();
    });
  
  });
});
