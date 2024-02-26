import CreateGame from "../components/CreateGame";
import "../css/LandingPage.scss";

type LandingPageProps = {
  createGame: () => void;
};

const LandingPage: React.FC<LandingPageProps> = ({ createGame }) => {
  return (
    <div className="landing-page">
      <header className="header">
        <h1>Elemental Type Race: Ignite Your Typing Skills</h1>
      </header>

      <section className="features">
        <h2>Unleash the Power of Elements</h2>
        <p>
          Welcome to Elemental Type Race, the ultimate multiplayer typing game
          where elements rule, and speed is the key to mastery...
        </p>
      </section>

      <section className="multiplayer">
        <h3>Multiplayer Madness</h3>
        <p>
          Challenge friends or foes from around the globe in real-time typing
          races...
        </p>
      </section>

      <footer className="join">
        <h1>Join the Elemental Race</h1>
        <CreateGame createGame={createGame} />
      </footer>
    </div>
  );
};

export default LandingPage;
