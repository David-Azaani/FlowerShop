import {
  Typography,
  Container,
  ButtonGroup,
  Button,
  Alert,
  AlertTitle,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import agent from "../../app/api/agent";
import { useState } from "react";

export default function About() {
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  function getValidationErrors() {
    agent.TestErrors.getValidationError()
      .then(() => console.log("should not see this"))
      .catch((error) => setValidationErrors(error));
  }
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

        <Button variant="contained" onClick={getValidationErrors}>
          {" "}
          {/* we dont need () because we dont need to pass any param or use catch or then */}
          Validation Erorr
        </Button>
        {/* <Button
          variant="contained"
          onClick={() =>
            agent.TestErrors.getValidationError().catch((error) =>
              console.log(error)
            )
          }
        >
          Validation Erorr
        </Button> */}
      </ButtonGroup>
      {validationErrors.length > 0 && ( //if before && was True then
        <Alert severity="error">
          <AlertTitle>Validation Errors</AlertTitle>
          <List>
            {validationErrors.map((error) => (
              <ListItem key={error}>
                <ListItemText>{error}</ListItemText>
              </ListItem>
            ))}
          </List>
        </Alert>
      )}
    </Container>
  );
}
