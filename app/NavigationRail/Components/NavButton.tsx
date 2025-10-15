import type { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import "app/app.css";
import { useNavigate } from 'react-router';

interface navButtonProps {
    icon: IconProp,
    link: string;
    text: string;
}

export type SubItem = {
    icon: IconProp
    link: string,
    text: string
}

const NavButton = ({ icon, link, text, subItems = null, handleSecond }: navButtonProps & {subItems?:SubItem[] | null, handleSecond: (subItems: SubItem[] | null) => void  }) => {
    const navigate = useNavigate();

    return (
        <button onMouseEnter = {()=>handleSecond(subItems)
        } onClick={() => navigate(link)} className="nav-button">
            <FontAwesomeIcon style={{
                fontSize: "20px",
            }} icon={icon} />
            <span>{text}</span>
        </button>
    );
}

export default NavButton;