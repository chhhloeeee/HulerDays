import Image from "next/image";
import styled from "styled-components";

interface GridProps {
  className: string;
}

const Grid = ({ className }: GridProps) => {
  return (
    <div className={className}>
      <div className="grid">
        <div className="card">
          <Image
            src="https://cdn.huler.io/v2/wp-content/uploads/2022/06/14085410/Lifestyle9.jpg"
            alt="calendar"
            width="271.11"
            height="271.11"
          />
          <div className="textWrapper">
            <h2>Request Leave &rarr;</h2>
          </div>
        </div>

        <div className="card">
          <Image
            src="https://cdn.huler.io/v2/wp-content/uploads/2022/06/14090345/Office12.jpg"
            alt="calendar"
            width="271.11"
            height="271.11"
          />
          <div className="textWrapper">
            <h2>Manage Requests &rarr;</h2>
          </div>
        </div>

        <div className="card">
          <Image
            src="https://cdn.huler.io/v2/wp-content/uploads/2022/06/14090344/Office11.jpg"
            alt="calendar"
            width="271.11"
            height="271.11"
          />
          <div className="textWrapper">
            <h2>Calendar View &rarr;</h2>
          </div>
        </div>

        <div className="card">
          <Image
            src="https://cdn.huler.io/v2/wp-content/uploads/2022/06/14090343/Office10.jpg"
            alt="calendar"
            width="271.11"
            height="271.11"
          />
          <div className="textWrapper">
            <h2>Policies &rarr;</h2>
          </div>
        </div>
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
    text-decoration: none;
    border-radius: 15px;
    transition: color 0.15s ease, border-color 0.15s ease;
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
  }

  .card:hover,
  .card:focus,
  .card:active {
    color: #fb6666;
    border-color: #292931;
    box-shadow: 0px 10px 40px #00000090;
    transform: translateY(-0.25em);
  }

  .textWrapper {
    position: absolute;
    top: 0;
  }

  @media (max-width: 600px) {
    .grid {
      width: 100%;
      flex-direction: column;
    }
  }
`;
export default StyledGrid;
