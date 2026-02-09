import React from "react";
import Header from "@/components/Header";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useAdvanceDay } from "@/hooks/useAdvanceDay";
import { getMainNavigationButtons, getSecondaryNavButtons } from "@/config/buttonPresets";
import ButtonBar from "@/components/ButtonBar";

const TestPage: React.FC = () => {
    const buttons = [
        ...getSecondaryNavButtons,
        ...getMainNavigationButtons(useAdvanceDay())
        
    ]
    return(
        <div>
            <div><Header /></div>
            <main className="main-container">
                <ButtonBar buttons={buttons} />
                <div>Hello world!</div>
            </main>
        </div>
    );
}

export default TestPage;