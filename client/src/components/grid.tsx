import Image from "next/image";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import RequestForm from "./form/requestForm";
import { useState } from "react";
import Link from "next/link";

interface GridProps {
  className?: string;
}

const Grid = ({ className }: GridProps) => {
  const [isCreate, setIsCreate] = useState(false);

  const handleClose = () => {
    setIsCreate(false);
  };

  return (
    <div className={className}>
      <div className="grid">
        <motion.div className="card" onClick={() => setIsCreate(true)}>
          <Image
            src="https://cdn.huler.io/v2/wp-content/uploads/2022/06/14085410/Lifestyle9.jpg"
            alt="beach"
            width={271.11}
            height={271.11}
          />
          <div>
            <h2>Request Leave &rarr;</h2>
          </div>
        </motion.div>
        <AnimatePresence>
          {isCreate && <RequestForm close={handleClose} />}
        </AnimatePresence>

        <Link className="card" href="/manage">
          <Image
            src="https://cdn.huler.io/v2/wp-content/uploads/2022/06/14090345/Office12.jpg"
            alt="paperworkr"
            width={271.11}
            height={271.11}
          />
          <div>
            <h2>Manage Requests &rarr;</h2>
          </div>
        </Link>

        <Link className="card" href="/calendar">
          <Image
            src="https://cdn.huler.io/v2/wp-content/uploads/2022/06/14090344/Office11.jpg"
            alt="calendar"
            width={271.11}
            height={271.11}
          />
          <div>
            <h2>Calendar View &rarr;</h2>
          </div>
        </Link>

        <Link className="card" href="/policies">
          <Image
            src="https://cdn.huler.io/v2/wp-content/uploads/2022/06/14090343/Office10.jpg"
            alt="policies"
            width={271.11}
            height={271.11}
          />
          <div>
            <h2>Policies &rarr;</h2>
          </div>
        </Link>

        <Link className="card" href="/teamRequests">
          <Image
            src="https://cdn.huler.io/v2/wp-content/uploads/2022/06/14090341/Office9.jpg"
            alt="planner"
            width={271.11}
            height={271.11}
          />
          <div>
            <h2>Team Requests &rarr;</h2>
          </div>
        </Link>
      </div>
    </div>
  );
};

Grid.defaultProps = {
  className: "",
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
    cursor: pointer;

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
