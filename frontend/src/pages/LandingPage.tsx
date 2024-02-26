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

      <CreateGame createGame={createGame} />

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
        <h3>Join the Elemental Adventure</h3>
        <p>
          Ready to type, race, and dominate? Sign up now and embark on your
          elemental typing journey...
        </p>
      </footer>
    </div>
  );
};

export default LandingPage;
