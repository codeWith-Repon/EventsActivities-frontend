import { useEffect, useState } from "react";


export function useDebounce<T>(value: T, delay: number = 500): T {
    const [debounceValue, setDebounceValue] = useState(value)

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebounceValue(value)
        }, delay)

        return () => {
            clearInterval(handler)
        }
    }, [value, delay])

    return debounceValue
}