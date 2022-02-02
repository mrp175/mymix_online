import styled from "styled-components";

const borderWidth = 0.25;
const border = `${borderWidth}rem solid var(--light-main)`;

export const Wrapper = styled.div`
  width: ${(props) => props.theme.width}rem;
  background: white;
  height: 100vh;
  background: var(--dark-main);
  display: grid;
  grid-template-rows: auto 1fr;
  border-left: ${border};
  font-size: 1rem;
`;

export const Browser = styled.div``;

export const Title = styled.div`
  height: 2em;
  color: white;
  font-size: 1em;
  font-weight: 800;
  text-align: center;
  line-height: 2em;
  background: ${(props) => props.theme.background};
  position: relative;
`;

const buttonWidth = 1.2;

const ButtonWrapper = styled.button`
  background: none;
  border: none;
  padding: 0;
  font: inherit;
  cursor: pointer;
  outline: inherit;
  background: var(--dark-main-faded);
  height: ${buttonWidth}em;
  width: ${buttonWidth}em;
  border-radius: 50%;
  position: absolute;
  left: ${0.4 - borderWidth / 2}em;
  top: 0.4em;
  text-align: center;
  font-size: 1em;
  display: grid;
  grid-template-rows: 1fr 1fr;
  grid-template-columns: 1fr 1fr;
  grid-gap: 0.15rem;
  overflow: hidden;
  border: 0.05rem solid white;
  transform: rotate(${(props) => props.theme.rotation}deg);
`;

const Quarter = styled.div`
  background: white;
  width: 100%;
  height: 100%;
`;

export const Button = ({
  rotation,
  onClick,
}: {
  rotation: number;
  onClick: () => void;
}) => {
  return (
    <ButtonWrapper theme={{ rotation }} onClick={onClick}>
      <Quarter />
      <Quarter />
      <Quarter />
      <Quarter />
    </ButtonWrapper>
  );
};

const RotatedLetter = styled.div`
  transform: rotate(90deg);
  transform-origin: top left;
  width: 0px;
  margin-top: 3rem;
  margin-left: 0.8rem;
  height: 0;
  line-height: 0;
`;

export function text(open: boolean): JSX.Element {
  let text = <div>BROWSER</div>;
  if (!open) {
    text = <RotatedLetter>BROWSER</RotatedLetter>;
  }
  return text;
}
