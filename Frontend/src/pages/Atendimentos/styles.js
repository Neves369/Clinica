import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.div`
  

  h1{
    margin-top:20px;
    text-align:center;
    color:#008BD6;
  }
  .ButInserir{
    text-align:center;
    Button{
      background-color:#008BD6;
      color:#fff;
      width: 200px;
      height: 50px;
      transition: background-color 0.2s;
    
    &:hover{
      background: ${shade(0.2, '#008BD6')}
    
    }
    .gambiarraDoCicero{
      width: 100%;
      height: 70vh; 
      background: red;
    }
  }}
  
`
export const Input = styled.div`
  input{
    font-size: 15px;
    width: 50%;
    margin-top: 5px;
    border-bottom: 1px solid #808080;
    padding: 10px;
    border-top: 0;
    border-right: 0;
    border-left: 0;
  }
  
`
