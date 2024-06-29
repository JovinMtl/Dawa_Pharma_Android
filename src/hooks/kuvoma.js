
import { ref } from 'vue'

export function useKuvoma(prefix){
    const data = ref(null)

    const kuvomaImiti = async () => {
        const base = '//127.0.0.1:8002'

        try {
            const response = await fetch(`${base}/${prefix}`)
            
            if (response.ok){
                data.value = await response.json()
            }
        } catch (value){
            console.log("somehting may not be well because :", value)
        }
    }
    // kuvomaImiti()
    console.log("useKuvoma got: ", data.value)
    return [data, kuvomaImiti]
    
}