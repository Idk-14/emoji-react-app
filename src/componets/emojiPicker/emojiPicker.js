import { forwardRef, useEffect, useRef, useState } from "react"
import {data as emojiList} from "./data";
import EmojiSearch from "./emojiSearch";
import EmojiButton from "./emojiButton";
import styles from "./emojiPicker.module.scss";

export function EmojiPIcker(props, ref){
    
        const [isOpen, setIsOpen] = useState(false);
        const [emojis, setEmojis] = useState([...emojiList]);

        const containerRef = useRef(null);

        useEffect(() => {
            window.addEventListener('click', (e) => {
                if(!containerRef.current.contains(e.target)){
                    setIsOpen(false);
                    setEmojis(emojiList);
                }
            });
        }, []);

        function handleClickOpen(){
            setIsOpen(!isOpen);
        }

        function handleSearch(e){
            const q = e.target.value.toLowerCase();

            if(!! q){
                const search = emojiList.filter(emoji => {
                    return emoji.name.toLowerCase().includes(q) || 
                    emoji.keywords.toLowerCase().includes(q)
                })

                setEmojis(search);
            }else{
                setEmojis(emojiList);
            }
        }

        // function EmojiPIckerContainer(){
        //     return(
        //         <div>
        //             <EmojiSearch onSearch={handleSearch} />
        //             <div>
        //                 {
        //                     emojis.map((emoji) => <div key={emoji.symbol}>{emoji.symbol}</div>)
        //                 }
        //             </div>
        //         </div>
        //     )
        // }

        function handleOnClickEmoji(emoji){
            const cursorPos = ref.current.selectionStart;
            const text = ref.current.value;
            const prev = text.slice(0, cursorPos);
            const next = text.slice(cursorPos);

            ref.current.value = prev + emoji.symbol + next;
            ref.current.selectionStart = cursorPos + emoji.symbol.length;
            ref.current.selectionEnd = cursorPos + emoji.symbol.length;
            ref.current.focus();
        }
    
        return(
        <div ref={containerRef} className={styles.inputContainer}>
            <button onClick={handleClickOpen}className={styles.emojiPickerButton}>🐶</button>

            {isOpen ? (        
            <div className={styles.emojiPickerContainer}>
                <EmojiSearch onSearch={handleSearch} />
                <div className={styles.emojiList}>          
                    {emojis.map((emoji) => (<EmojiButton key={emoji.symbol} emoji={emoji} onClick={handleOnClickEmoji}/>))}
                </div>
            </div>): ""}
        </div>
    )
}

export default forwardRef(EmojiPIcker);
    