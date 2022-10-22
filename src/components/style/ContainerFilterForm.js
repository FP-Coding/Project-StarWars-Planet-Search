import styled from 'styled-components';

const ContainerFilterForm = styled.div`
    border: 1px solid white;
    border-radius: 8px;
    padding: 30px;
    width: 10vw;
    display: flex;
    flex-direction: column;
    label:nth-child(1){
      display: flex;
      justify-content: space-between;
      margin-bottom: 5px;
      select {
        width: 60%;
      }
    }
    label:nth-child(2){
      display: flex;
      justify-content: space-between;
      margin-bottom: 5px;
      select {
        width: 60%;
      }
    }
    label:nth-child(3){
      display: flex;
      justify-content: space-between;
      margin-bottom: 5px;
      input {
        width: 56%;
      }
  }
  button {
    border-radius: 4px;
    background-color: green;
    color: black;
    &:hover {
      background-color: red;
      color: white;
    }
  }`;

export default ContainerFilterForm;
