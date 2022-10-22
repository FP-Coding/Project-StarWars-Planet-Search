import styled from 'styled-components';

const ContainerInputFilter = styled.div`
    text-align: center;
    padding: 15px;
    label {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 15px;
      input {
        width: 30vw;
        height: 3vh;
        border-radius: 4px;
        &:focus {
          outline: none;
          box-shadow: 0px 0px 3px 3px #76b7f8;
        }
      }
    }
`;

export default ContainerInputFilter;
