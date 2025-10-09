import React, { useState } from 'react';
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Collapse,
  ListItemIcon,
  Icon,
} from '@mui/material';
import '../app.css';
import { Link } from 'react-router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function NavigationRail() {
  const [isOpen, setIsOpen] = useState(false);
  const [projectsOpen, setProjectsOpen] = useState(false);

  const navWidth = {
    open: 220,
    closed: 55,
  };

  return (
    <>
      <Drawer
        variant="permanent"
        onMouseLeave={() => setIsOpen(false)}
        onMouseEnter={() => setIsOpen(true)}
        className="navigation-rail"
        sx={{
          width: isOpen ? navWidth.open : navWidth.closed,
          '& .MuiDrawer-paper': {
            width: isOpen ? navWidth.open : navWidth.closed,
            transition: 'width 0.45s',
            overflowX: 'hidden',
            borderRadius: 1,
          },
        }}
      >
        <List>
          <ListItem disablePadding>
            <ListItemButton component={Link} to="/">
              <ListItemIcon
                sx={{
                  color: 'black',
                  flexDirection: 'column',
                  alignItems: 'center',
                  alignSelf: 'left',
                }}
              >
                <FontAwesomeIcon icon={solidIcons.faEnvelope} />

                <p style={{ fontSize: '10px' }}>Over mij</p>
              </ListItemIcon>
              <ListItemText
                primary={'About me'}
                sx={{
                  opacity: isOpen ? 1 : 0,
                  transition: 'opacity 0.5s ease',
                  overflow: 'hidden',
                  whiteSpace: 'nowrap',
                }}
              />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton onClick={() => setProjectsOpen(!projectsOpen)}>
              <ListItemText primary="My Projects" />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
    </>
  );

  function navButton() {
    return <></>;
  }
}


