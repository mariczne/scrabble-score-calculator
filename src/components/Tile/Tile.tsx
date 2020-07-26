import styled from "styled-components";

const Tile = styled.div`
  display: inline-block;
  position: relative;
  height: 1.5rem;
  width: 1.5rem;
  padding: 1rem;
  margin: 0.125rem;
  border: 1px solid black;
  border-radius: 5%;
  background-color: antiquewhite;
  color: black;
  font-size: 2.6rem;
  font-family: "Nunito Sans", sans-serif;
  font-weight: 700;
  cursor: pointer;
  user-select: none;
  animation: fadeIn 0.3s;

  &:focus {
    outline: none;
    border: 2px solid blue;
  }

  &:hover {
    transform: scale(1.1);
  }

  @keyframes fadeIn {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
`;

export default Tile;
