import React from 'react';
import App from './App';
import { render, fireEvent } from '@testing-library/react-native';

it('Should create an item', () => {
    const { getByText , getByPlaceholderText} = render(<Login />);
  
    const loginInput =  getByPlaceholderText('Login');
    const addLoginButton = getByText('Login'); /* User should click button to Login */
    
    const passwordInput = getByText('Pasword'); 
    
    const createdUserLoginText = 'first user';
    const createdUserPasswordText = 'password';
  
    fireEvent.changeText(loginInput, createdUserLoginText);
    fireEvent.changeText(passwordInput, createdUserPasswordText);
    fireEvent.press(addLoginButton);

    const createdUserLogin = getByText(createdUserLoginText);
    const createdUserPassword = getByText(createdUserPasswordText);

    expect(createdUserLogin) = getByText(createdUserLoginText);
    expect(createdUserPassword) = getByText(createdUserPasswordText);

    expect(createdUser).not.toBeNull();
  })
