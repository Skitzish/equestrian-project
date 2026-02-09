import { useLocation } from "react-router-dom";
import { gameService } from "@/services/api";
import { useAuth } from "@/contexts/AuthContext";

export const useAdvanceDay = (onPageRefresh?: () => Promise<void>) => {
    const location = useLocation(); //not currently used, but may be useful for location-specific actions
    const { refreshUser } = useAuth();

    const advanceDay = async() => {
        if (!confirm('Advance to the next day?')) {
            return;
        }

        try {
            await gameService.advanceDay();
            await refreshUser();

            //Call page-specific refresh if provided.
            if(onPageRefresh){
                await onPageRefresh();
            }

            alert('Day advanced successfully!');
        }catch (error){
            console.error('Failed to advance day:', error);
            alert('Failed to advance day.');
        }
    }

    return advanceDay;
}