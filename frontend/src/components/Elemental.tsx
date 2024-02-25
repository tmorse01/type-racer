import Air from "../assets/elementals/Air.webp";
import Earth from "../assets/elementals/Earth.webp";
import Fire from "../assets/elementals/Fire.webp";
import Water from "../assets/elementals/Water.webp";

import { Element } from "../../../shared/types/game-types";

export default function Elemental({ element }: { element: Element }) {
  if (element === "Fire")
    return <img className="player-avatar" alt="elemental avatar" src={Fire} />;
  else if (element === "Water")
    return <img className="player-avatar" alt="elemental avatar" src={Water} />;
  else if (element === "Earth")
    return <img className="player-avatar" alt="elemental avatar" src={Earth} />;
  else if (element === "Air")
    return <img className="player-avatar" alt="elemental avatar" src={Air} />;
  else return null;
}
