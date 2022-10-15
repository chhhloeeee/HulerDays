import Image from "next/image";

interface GridProps {
  className: string;
}

const Grid = ({ className }: GridProps) => {
  return (
    <div className={className}>
      <div>
        <div>
          <Image
            src="https://cdn.huler.io/v2/wp-content/uploads/2022/06/14085410/Lifestyle9.jpg"
            alt="calendar"
            width="271.11"
            height="271.11"
          />
          <div>
            <h2>Request Leave &rarr;</h2>
          </div>
        </div>

        <div>
          <Image
            src="https://cdn.huler.io/v2/wp-content/uploads/2022/06/14090345/Office12.jpg"
            alt="calendar"
            width="271.11"
            height="271.11"
          />
          <div>
            <h2>Manage Requests &rarr;</h2>
          </div>
        </div>

        <div>
          <Image
            src="https://cdn.huler.io/v2/wp-content/uploads/2022/06/14090344/Office11.jpg"
            alt="calendar"
            width="271.11"
            height="271.11"
          />
          <div>
            <h2>Calendar View &rarr;</h2>
          </div>
        </div>

        <div>
          <Image
            src="https://cdn.huler.io/v2/wp-content/uploads/2022/06/14090343/Office10.jpg"
            alt="calendar"
            width="271.11"
            height="271.11"
          />
          <div>
            <h2>Policies &rarr;</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export const Grid;
