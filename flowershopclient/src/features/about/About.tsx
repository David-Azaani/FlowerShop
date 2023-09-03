import {
  Typography,
  Container,
  ButtonGroup,
  Button,
  CssBaseline,
} from "@mui/material";
import agent from "../../app/api/agent";

export default function About() {
  return (
    <Container>
      <Typography variant="h2" color="initial" sx={{ mb: 2 }}>
        Errors for testing purposes
      </Typography>

      <ButtonGroup fullWidth>
        <Button
          variant="contained"
          onClick={() => agent.TestErrors.get400Error()}
        >
          400 Erorr
        </Button>
        <Button
          variant="contained"
          onClick={() => agent.TestErrors.get401Error()}
        >
          401 Erorr
        </Button>
        <Button
          variant="contained"
          onClick={() => agent.TestErrors.get404Error()}
        >
          404 Erorr
        </Button>
        <Button
          variant="contained"
          onClick={() => agent.TestErrors.get500Error()}
        >
          500 Erorr
        </Button>
        <Button
          variant="contained"
          onClick={() => agent.TestErrors.getValidationError()}
        >
          Validation Erorr
        </Button>
      </ButtonGroup>
    </Container>
  );
}
