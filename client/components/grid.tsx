import Image from "next/image";
import styled from "styled-components";

interface GridProps {
  className: string;
}

const Grid = ({ className }: GridProps) => {
  return (
    <div className={className}>
      <div className="grid">
        <a className="card" href="/request">
          <Image
            src="https://cdn.huler.io/v2/wp-content/uploads/2022/06/14085410/Lifestyle9.jpg"
            alt="calendar"
            width="271.11"
            height="271.11"
          />
          <div>
            <h2>Request Leave &rarr;</h2>
          </div>
        </a>

        <a className="card" href="/manage">
          <Image
            src="https://cdn.huler.io/v2/wp-content/uploads/2022/06/14090345/Office12.jpg"
            alt="calendar"
            width="271.11"
            height="271.11"
          />
          <div>
            <h2>Manage Requests &rarr;</h2>
          </div>
        </a>

        <a className="card" href="/calendar">
          <Image
            src="https://cdn.huler.io/v2/wp-content/uploads/2022/06/14090344/Office11.jpg"
            alt="calendar"
            width="271.11"
            height="271.11"
          />
          <div>
            <h2>Calendar View &rarr;</h2>
          </div>
        </a>

        <a className="card" href="/policies">
          <Image
            src="https://cdn.huler.io/v2/wp-content/uploads/2022/06/14090343/Office10.jpg"
            alt="calendar"
            width="271.11"
            height="271.11"
          />
          <div>
            <h2>Policies &rarr;</h2>
          </div>
        </a>
      </div>
    </div>
  );
};

const StyledGrid = styled(Grid)`
  .grid {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    width: 100%;
    gap: 40px;
    padding-top: 5px;
    padding-bottom: 4rem;
  }

  .card {
    text-align: left;
    position: relative;
    border-radius: 15px;
    width: 271.11px;
    height: 271.11px;
    box-shadow: 0px 10px 40px #00000040;
    color: #ffff;
    img {
      border-radius: 15px;
    }
    h2 {
      margin: 14rem 0 0 1rem;
      font-size: 1.5rem;
      color: black;
      font-weight: 400;
    }
    > div {
      position: absolute;
      top: 0;
    }
  }

  .card:hover,
  .card:focus,
  .card:active {
    box-shadow: 0px 10px 40px #00000090;
    transform: translateY(-0.25em);
  }

  @media (max-width: 600px) {
    .grid {
      width: 100%;
      flex-direction: column;
    }
  }
`;
export default StyledGrid;
