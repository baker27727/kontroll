import styled from "styled-components";

const SquareSwitch = () => {
  return (
    <StyledWrapper>
      <label className="switch">
        <input type="checkbox" checked={true} />
      </label>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .switch {
 --false: #E81B1B;
 --true: #009068;
}

input[type=checkbox] {
 appearance: none;
 height: 2rem;
 width: 3.5rem;
 background-color: #fff;
 position: relative;
 border-radius: .2em;
 cursor: pointer;
}

input[type=checkbox]::before {
 content: '';
 display: block;
 height: 1.9em;
 width: 1.9em;
 transform: translate(-50%, -50%);
 position: absolute;
 top: 50%;
 left: calc(1.9em/2 + .3em);
 background-color: var(--false);
 border-radius: .2em;
 transition: .3s ease;
}

input[type=checkbox]:checked::before {
 background-color: var(--true);
 left: calc(100% - (1.9em/2 + .3em));
}
`;

export default SquareSwitch;
