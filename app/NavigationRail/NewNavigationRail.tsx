import "../app.css";
import SideBar from './Components/SideBar';
import NavButton, { type SubItem } from './Components/NavButton';
import { faChessBoard, faDiagramProject, faEnvelope, faHouse, faPerson } from '@fortawesome/free-solid-svg-icons';
import {useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router';

const NavigationRail = () => {
    const navigate = useNavigate();


    const [secondContent, setSecondContent] = useState<SubItem[] | null>(null); 

    function handleSecondContent(subItems: SubItem[]|null){
        setSecondContent(subItems);
    }

    function emptySecondContent(){
        handleSecondContent(null);
    }

    const secondDrawer = () => {
        if (!secondContent
        ) { return null } else {
            return (
                <>
                    {
                        secondContent.map(sub => {
                            return (<button className="sub-button" onClick={() => navigate(sub.link)}>
                                <FontAwesomeIcon icon={sub.icon} style={{fontSize:"20px"}}/>
                                <span>{sub.text}</span>
                            </button>
                            );
                        })
                    }
                </>
            );
        }
    }

    function handleSecondDrawer() {

    }

    const mainDrawer =
        <div>
            <NavButton text="Home" icon={faHouse} link="/" handleSecond = {handleSecondContent} />
            <NavButton text="Over mij" icon={faPerson} link="/aboutme" handleSecond = {handleSecondContent} />
            <NavButton text="Projecten" icon={faDiagramProject} link="/projects" handleSecond = {handleSecondContent}
                subItems = {[
                    {icon: faChessBoard, link:"/projects/nonogram", text:"Nonogram"}
                ]}
                    />
        </div>
        ;


    return (
        <div className = "MainRail"  >
            <SideBar mainDrawer={mainDrawer} secondDrawer={secondDrawer()} emptySecond = {emptySecondContent} />
        </div>
    );
}

export default NavigationRail;