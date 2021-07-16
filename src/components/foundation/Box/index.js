import styled from 'styled-components';

const Box = styled.div`
  background: #171717;
  border-radius: 8px;

  padding: 16px;

  /* CSS Pré-Pronto */
  margin-bottom: 10px;
  .boxLink {
    font-size: 14px;
    color: #308BC5;
    text-decoration: none;
    font-weight: 800;
  }
  .title {
    font-size: 32px;
    font-weight: 400;
    margin-bottom: 20px;
    color: #FFFFFF;
  }
  .subTitle {
    font-size: 18px;
    font-weight: 400;
    margin-bottom: 20px;
    color: #FFFFFF;
  }
  .smallTitle {
    margin-bottom: 20px;
    font-size: 16px;
    font-weight: 700;
    color: #FFFFFF;
    margin-bottom: 20px;
  }
  hr {
    margin-top: 12px;
    margin-bottom: 8px;
    border-color: transparent;
    border-bottom-color: #FFFFFF;
  }
  input {
    width: 100%;
    background-color: #282828;
    color: #FFFFFF;
    border: 0;
    padding: 14px 16px;
    margin-bottom: 14px;
    border-radius: 10000px;
    ::placeholder {
      color: #787878;
      opacity: 1;
    }
  }
  button {
    border: 0;
    padding: 8px 12px;
    color: #FFFFFF;
    border-radius: 10000px;
    background-color: #308BC5;
  }
  ul{
    list-style-type: none;
  }
  .divScrap {
    width: 100%;
    background-color: #282828;
    text-align: center;
    display: flex;
    flex-direction: row;
    align-items: flex-center;
    align-content: left;
    border: 0;
    padding: 10px 10px;
    margin-bottom: 10px;
    border-radius: 10px;
    a{
      display: flex;
      flex-direction: initial;
      width: 25%;
      margin-right: 10px;
      img{
        border-radius: 10px;
      }
    }
    .scrapText{
      display: flex;
      align-items: flex-start;
      flex-direction: column;
      width: 100%;
      padding: 10px;
      background-color: #171717;
      border-radius: 10px;
      h3{
        margin-bottom: 20px;
        font-size: 16px;
        font-weight: 700;
        color: #FFFFFF;
        margin-bottom: 20px;
      }
      p {
        margin-bottom: 20px;
        font-size: 14px;
        font-weight: 400;
        color: #FFFFFF;
        margin-bottom: 20px;
      }
    }
  }
`; 

export default Box