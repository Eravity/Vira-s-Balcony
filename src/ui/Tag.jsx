import styled, { css } from "styled-components";

const Tag = styled.span`
  width: fit-content;
  text-transform: uppercase;
  font-size: 1.1rem;
  font-weight: 600;
  padding: 0.4rem 1.2rem;
  border-radius: 100px;

  ${(props) => {
    const color = `var(--color-${props.type}-700)`;
    const backgroundColor = `var(--color-${props.type}-100)`;
    return css`
      color: ${color};
      background-color: ${backgroundColor};
    `;
  }}
`;

export default Tag;
