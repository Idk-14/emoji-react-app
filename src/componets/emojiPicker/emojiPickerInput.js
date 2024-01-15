import { useRef } from "react";
import EmojiPIcker from "./emojiPicker";

export default function EmojiPickerInput(){
    
    const ref = useRef(null);
    
    return(
        <div>
            <input ref={ref} />
            <EmojiPIcker ref={ref} />
        </div>
    );
}