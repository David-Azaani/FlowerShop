import {
  Typography,
  Container,
  ButtonGroup,
  Button,
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
          onClick={() =>
            agent.TestErrors.get400Error().catch((error) => console.log(error))
          }
        >
          400 Erorr
        </Button>
        <Button
          variant="contained"
          onClick={() =>
            agent.TestErrors.get401Error().catch((error) => console.log(error))
          }
        >
          401 Erorr
        </Button>
        <Button
          variant="contained"
          onClick={() =>
            agent.TestErrors.get404Error().catch((error) => console.log(error))
          }
        >
          404 Erorr
        </Button>
        <Button
          variant="contained"
          onClick={() =>
            agent.TestErrors.get500Error().catch((error) => console.log(error))
          }
        >
          500 Erorr
        </Button>
        <Button
          variant="contained"
          onClick={() =>
            agent.TestErrors.getValidationError().catch((error) =>
              console.log(error)
            )
          }
        >
          Validation Erorr
        </Button>
      </ButtonGroup>
    </Container>
  );
}
