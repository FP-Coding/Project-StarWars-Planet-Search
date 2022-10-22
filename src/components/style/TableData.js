import styled from 'styled-components';

const TableData = styled.table`
  margin: auto;
  padding-top: 20px;
  padding-left: 40px;
  padding-right: 40px;
  max-width: 80vw;
  opacity: 0.8;
  thead {
    tr {
      th {
        border: 1px solid white;
        padding: 10px;
      }
    }
  }
  tbody {
    tr {
      line-height: 30px;
      text-align: center;
      overflow-x: auto;
    }
    tr:nth-child(odd) {
    background-color: green;
    }
    tr:nth-child(even) {
      background-color: #DCEBE6;
      color: #000;
    }
    tr:hover {
      background-color: #085F63;
      color: #fff;
    }
}`;

export default TableData;
