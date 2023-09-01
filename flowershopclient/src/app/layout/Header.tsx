import { AppBar, List, Switch, Toolbar, Typography } from "@mui/material";

const midLinks = [
  { title: "catalog", path: "/catalog" },
  { title: "about", path: "/about" },
  { title: "contact", path: "/contact" },
];
const rightLinks = [
  { title: "login", path: "/login" },
  { title: "register", path: "/register" },
];

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
        <List sx={{display:'flex'}}></List>
      </Toolbar>
    </AppBar>
  );
}
