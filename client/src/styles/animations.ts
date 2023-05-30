import { css } from 'styled-components';

const animations = css`
  @keyframes float {
    0% {
      transform: translatey(0px);
    }
    50% {
      transform: translatey(-22px);
    }
    100% {
      transform: translatey(0px);
    }
  }

  @keyframes float-2 {
    0% {
      transform: translatey(0px) rotate(-10deg);
    }
    50% {
      transform: translatey(-15px) rotate(-10deg);
    }
    100% {
      transform: translatey(0px) rotate(-10deg);
    }
  }

  @keyframes float-3 {
    0% {
      transform: translatey(0px) rotate(10deg);
    }
    50% {
      transform: translatey(-15px) rotate(10deg);
    }
    100% {
      transform: translatey(0px) rotate(10deg);
    }
  }

  @keyframes fadein {
    from {
      opacity: 0;
    }
    to {
      opacity: 0.5;
    }
  }

  @keyframes highlightNew {
    0% {
      opacity: 0;
      transform: scale(0.5);
    }
    50% {
      opacity: 1;
      transform: scale(1.1);
    }
    100% {
      opacity: 1;
      transform: scale(1);
    }
  }

  @keyframes highlightAfter {
    from {
      opacity: 0;
      transform: scale(0.5) translateY(-50%) translateX(-50%);
    }
    to {
      opacity: 1;
      transform: scale(1.08) translateY(-50%) translateX(-50%);
    }
  }

  @keyframes dummyLoadingAnimation {
    0% {
      transform: translateX(-100%);
    }
    100% {
      transform: translateX(100%);
    }
  }
`;

export default animations;
