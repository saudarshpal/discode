import {useRef, useCallback} from 'react'

function useThrottle(callback, delay) {
    const lastCall = useRef(0)

    return useCallback((...args)=> {
        const now = new Date().getTime()
        if(now - lastCall.current >= delay){
            lastCall.current = now
            callback(...args)       
        }
    }, [callback, delay])
}

export default useThrottle;