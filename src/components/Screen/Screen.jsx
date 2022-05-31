import { Textfit } from "react-textfit";
import './Screen.scss';

export default function Screen( {value} ) {
  return (
    <Textfit className="screen" mode="single" max={70}>
        {value}
    </Textfit>
  )
}

