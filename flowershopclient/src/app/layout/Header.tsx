import { AppBar, Switch, Toolbar, Typography } from "@mui/material";
interface Props {
  changeTheme: () => void;
  darkMode: boolean;
}
export default function Header({ darkMode, changeTheme }: Props) {
  return (
    <AppBar position="static" sx={{ mb: 4 }}>
      <Toolbar>
        <Typography variant="h6">FlowerShop</Typography>
        <Switch checked={darkMode} onChange={changeTheme} />
      </Toolbar>
    </AppBar>
  );
}
