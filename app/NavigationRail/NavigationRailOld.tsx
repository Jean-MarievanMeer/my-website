import React, { useEffect, useState } from 'react';
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
import { Link, useNavigate } from 'react-router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faPerson, faHome, faChessBoard } from '@fortawesome/free-solid-svg-icons';
import MenuButton from './Components/MenuButton';
import HomeIcon from '@mui/icons-material/Home';
import type { MenuButtonProps as MenuButtonProps } from "./Components/MenuButton"

export default function NavigationRail() {
  const transition = 500; //milliseconds

  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);
  const [projectsOpen, setProjectsOpen] = useState(false);
  const [secondDrawerContent, setSecondDrawerContent] = useState<any>(null);
  const [secondOpen, setSecondOpen] = useState(false);

  const navWidth = {
    open: 220,
    closed: 55,
  };

  function setSecondContent(props: MenuButtonProps[] | null) {
    if (props) {
      setSecondOpen(true);
      setSecondDrawerContent(
        <List>
          {props.map((prop) => {
            const button = <MenuButton icon={prop.icon} link={prop.link} />
            const text = <ListItemText primary={prop.text} />
            return <div id={prop.text}>{button}{text}</div>
          })}
        </List>
      );
    }
    else {
      setSecondOpen(false);
    }
  }
  

  const MainDrawer = () => {
    return (
      <>
        <Drawer
          variant="permanent"
          className="navigation-rail"
          sx={{
            '& .MuiDrawer-paper': {
              width: navWidth.closed,
              transition: 'width 0.45s',
              overflowX: 'hidden',
              borderRadius: 1,
            },
          }}
        >
          <List disablePadding={false}>

            <MenuButton icon={faHome} link="/" text="Home" setSecondContent={setSecondContent} />
            <MenuButton icon={faPerson} link="/aboutme" text="Over mij" setSecondContent={setSecondContent} />
            <MenuButton icon={faEnvelope} link="/projects" text="Projecten"
              subItems={[
                { icon: faChessBoard, link: "/projects/nonogram", text: "nonogram" }]
              } setSecondContent={setSecondContent} />
          </List>
        </Drawer>
      </>
    );
  }

  const SecondDrawer = () => {

    return (<Drawer open={true} onMouseLeave={() => setSecondOpen(false)} variant="persistent"
      sx=
      {
        {

          '& .MuiDrawer-paper': {
            width: secondOpen ? navWidth.open : 0,
            transition: `width 10000ms ease`,

            overflowX: 'hidden',
            borderRadius: 1,
            left: navWidth.closed,
            border: 0,
          },
        }
      }>

      {secondDrawerContent}

    </Drawer >);
  }

  return (
    <>
      <MainDrawer />
      <SecondDrawer />
    </>
  );




}

