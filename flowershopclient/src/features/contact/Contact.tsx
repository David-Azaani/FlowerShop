import { ButtonGroup, Typography, Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  CounterState,
  DECREASE_ME,
  INCREASE_ME,
  decrement,
  increment,
} from "./counterReducer";

export default function Contact() {
  const { data, fullName } = useSelector((state: CounterState) => state);
  const dispatch = useDispatch();

  return (
    <>
      <Typography variant="h3">{fullName}</Typography>
      <Typography variant="h5">{data}</Typography>
      <ButtonGroup>
        <Button
          onClick={() => dispatch({ type: INCREASE_ME })}
          variant="contained"
          color="error"
        >
          INCREASEMe!
        </Button>
        <Button
          onClick={() => dispatch({ type: DECREASE_ME })}
          variant="contained"
          color="info"
        >
          DECREASEMe!
        </Button>

        <Button
          onClick={() => dispatch(increment())}
          variant="contained"
          color="error"
        >
          INCREASEMe!
        </Button>
        <Button
          onClick={() => dispatch(decrement())}
          variant="contained"
          color="info"
        >
          DECREASEMe!
        </Button>
        <Button
          onClick={() => dispatch(decrement(900))}
          variant="contained"
          color="info"
        >
          Unknown!!!
        </Button>
      </ButtonGroup>
    </>
  );
}
