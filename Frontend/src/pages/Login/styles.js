import styled from 'styled-components';
import { shade } from 'polished';

export const ContainerLogin = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
  /* margin-top:100px; */
  border-radius: 10px;
  background-color: #ddd;
`;

export const ContentLogin = styled.div`
  margin-bottom: 170px;
    padding-top: 70px;
  
`;

export const FormLogin = styled.form`
  margin-top: 30px;




  input{
    flex: 1;
    height: 50px;
    padding: 0 25px;
    border: 0;
    border-radius: 5px;
    color: #008BD6;
    font-size: 16px;
    border: 2px solid ${props => props.hasError ? "#c53030" : "#fff"};
    border-right: 0;
    margin-left: 18px;

    &::placeholder {
      color: #008BD6;
      text-align: center;
    }
    
    input:hover{
    box-shadow: 0 0 0 0;
    border: 0 none;
    outline: 0;
}

  }

  button{
    margin-top: 30px;
    margin-left: 10px;
    width: 255px;
    height: 50px;
    background: #008BD6;
    border: 0;
    border-radius: 5px;
    color: #fff;
    font-weight: bold;
    transition: background-color 0.2s;
    font-size: 20px;

    &:hover{
      background: ${shade(0.2, '#008BD6')}
    }
  }
`;