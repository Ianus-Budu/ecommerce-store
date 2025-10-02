import { Billboard } from "@/types";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/billboards`;

const getBillboard = async (id?: string): Promise<Billboard | null> => {
    try {
        // Dacă nu avem ID, luăm primul billboard disponibil
        if (!id) {
            const res = await fetch(URL);
            const billboards = await res.json();
            return billboards[0] || null;
        }
        
        const res = await fetch(`${URL}/${id}`);
        if (!res.ok) {
            // Dacă nu găsim billboard-ul specific, luăm primul disponibil
            const fallbackRes = await fetch(URL);
            const billboards = await fallbackRes.json();
            return billboards[0] || null;
        }
        
        return res.json();
    } catch (error) {
        console.error('Error fetching billboard:', error);
        return null;
    }
};

export default getBillboard;