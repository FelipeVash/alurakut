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
  .photoBox {
    display: grid;
    grid-gap: 8px;
    grid-template-columns: 1fr 1fr 1fr; 
    max-height: fit-content;
    list-style: none;
    img{
      object-fit: cover;
      background-position: center center;
      width: 100%;
      height: 100%;
      position: relative;
    }
    li {
      img{
        max-width: 150px;
        border-radius: 15px;
        margin: 10px;
      }
    }
  }
  .photoBox li a {
    display: inline-block;
    height: 102px;
    position: relative;
    overflow: hidden;
    border-radius: 8px;
    span {
      color: #FFFFFF;
      background: #191919BF;
      font-size: 10px;
      position: absolute;
      left: 0;
      bottom: 10px;
      z-index: 2;
      padding: 0 4px;
      overflow: hidden;
      text-overflow: ellipsis;
      width: 100%;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
    }
    &:after {
      content: "";
      display: block;
      position: absolute;
      top: 0;
      right: 0;
      left: 0;
      bottom: 0;
      z-indeX: 1;
      background-image: linear-gradient(0deg,#00000073,transparent);
    }
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