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
  }}
  
`
export const Pesquisar = styled.input`
  font-size: 16px;
  width: 15%;
  margin-left: 1100px;
  margin-top: 5px;
  border-bottom: 1px solid #808080;
  padding: 6px 0 7px;
  border-top: 0;
  border-right: 0;
  border-left: 0;
  
`
