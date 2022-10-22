import styled from 'styled-components';

const ContainerSort = styled.div`
  border: 1px solid white;
  border-radius: 8px;
  width: 10vw;
  padding: 30px;
  div:nth-child(1) {
    margin-bottom: 15px;
    label {
      display: flex;
      justify-content: space-between;
      margin-bottom: 5px;
      select {
      width: 60%
      }
    }
  }
  div:nth-child(2) {
    margin-bottom: 15px;
    display: flex;
    justify-content: space-around;
    label {
      width: 40%;
      margin-bottom: 5px;
    }
  }
  button {
    width: 100%;
    border-radius: 4px;
    background-color: green;
    color: black;
    &:hover {
      background-color: red;
      color: white;
    }
  }
`;

export default ContainerSort;
