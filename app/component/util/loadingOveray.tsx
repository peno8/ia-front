import { fetchStatusStore } from "@/app/app.store";
import { Loader, LoadingOverlay } from "@mantine/core";



export default function LoadingOveray() {
    
    const isLoading = fetchStatusStore((state) => state.isLoading);

    return (
        isLoading ? <div className="absolute inset-0 overlay">
            <div className="absolute left-2/4 top-96">
                <Loader></Loader> 
            </div>
            
            
        </div> : null
    )
}
