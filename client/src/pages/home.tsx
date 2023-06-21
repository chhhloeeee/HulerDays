import Grid from '../components/grid';
import Footer from '../components/footer';
import ContentWrapper from 'src/components/ContentWrapper';
import styled from 'styled-components';
import Logo from 'src/components/Logo';
import Icon from 'src/components/icons';
import Button from 'src/components/Button';
import { APILoader } from 'src/components/table/ApiLoader';
import { useContext, useState } from 'react';
import { UserContext } from 'src/contexts/UserContext';
import ConfirmationDialog from 'src/components/ConfirmationDialog';
import { useRouter } from 'next/router';
import NoSSRWrapper from 'src/components/NoSSRWrapper';

interface HomeProps {
  className?: string;
}

const Home = ({ className }: HomeProps) => {
  const { userId, token } = useContext(UserContext);
  const [showDialog, setShowDialog] = useState(false);
  const router = useRouter();

  const Logout = (userId: number) => {
    var requestOptions = {
      method: 'GET',
      redirect: 'follow' as RequestRedirect,
      auth_token: token,
    };

    fetch('http://localhost:1234/logout?id=' + userId, requestOptions)
      .then((response) => {
        localStorage.removeItem('isManager');
        localStorage.removeItem('userId');
        localStorage.removeItem('holiday');
        localStorage.removeItem('token');
        router.push('/');
        response.text();
      })
      .then((result) => console.log(result))
      .catch((error) => console.log('error', error));
  };

  return (
    <div className={className}>
      <ContentWrapper>
        <div>
          <Logo />
          <Button className='logout' onClick={() => setShowDialog(true)}>
            <Icon name='logout' />
          </Button>
          <main>
            <h1>Welcome to HulerDays</h1>
            <div>
              <APILoader url={'http://localhost:1234/getUserById?id=' + userId} Component={countDown} />
              <p>Days Remaining</p>
            </div>
          </main>
        </div>
        <NoSSRWrapper>
          <Grid />
        </NoSSRWrapper>
        <Footer />
        {showDialog && (
          <ConfirmationDialog
            title='Confirm Action'
            message='Are you sure you want to deny this request?'
            confirm={() => Logout(Number(userId))}
            cancel={() => setShowDialog(false)}
          />
        )}
      </ContentWrapper>
    </div>
  );
};
function countDown({ data }) {
  const days = data.Data[0].holiday;
  return <h2>{days}</h2>;
}
const StyledHome = styled(Home)`
  .logout {
    position: absolute;
    right: 2rem;
    top: 2rem;
    background: transparent;
    cursor: pointer;
    svg {
      width: 30px;
      height: 30px;
      fill: #8e8e90;
    }
  }

  main {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    > div {
      font-size: 1.5rem;
      width: 200px;
      margin-bottom: 3rem;
      background: #fff;
      box-shadow:
    /* The top layer shadow */ 0 1px 1px rgba(0, 0, 0, 0.15), /* The second layer */ 0 10px 0 -5px #eee,
        /* The second layer shadow */ 0 10px 1px -4px rgba(0, 0, 0, 0.15), /* The third layer */ 0 20px 0 -10px #eee,
        /* The third layer shadow */ 0 20px 1px -9px rgba(0, 0, 0, 0.15);
      /* Padding for demo purposes */
      padding: 30px;
      h2 {
        text-align: center;
        font-size: larger;
      }
      p {
        text-align: center;
        margin: 1rem 2rem 1rem;
        color: black;
        font-weight: bold;
      }
    }
  }

  h1 {
    margin: 0;
    position: relative;
    top: 0;
    padding-bottom: 3rem;
    line-height: 1.15;
    font-size: 4rem;
    color: #fb6666;
    text-align: center;
  }
`;
export default StyledHome;
