import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/config/buttonPresets";


interface ButtonBarProps {
    buttons: Button[];
}

const ButtonBar: React.FC<ButtonBarProps> = ({ buttons }) => {
    return (
        <div className="buttonBar-container">
            {buttons.map((button, index) => {
                const className = button.variant === 'primary' ? 'btn-primary' : 'btn-secondary';
        
                // If it has a link, render as Link
                if (button.link) {
                return (
                    <Link key={index} to={button.link} className={className}>
                    {button.icon && <span className="mr-2">{button.icon}</span>}
                    {button.text}
                    </Link>
                );
                }

                return (
                <button key={index} onClick={button.onClick} className={className}>
                    {button.icon && <span className="mr-2">{button.icon}</span>}
                    {button.text}
                </button>
                );
            })}
        </div>
    );
};


export default ButtonBar;