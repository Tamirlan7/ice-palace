import React from 'react'
import c from './TextUnderline.module.scss'
import { CSSTransition } from 'react-transition-group'

interface ITextUnderlineProps extends React.PropsWithChildren {
    underlineColor: string
}

const TextUnderline: React.FC<ITextUnderlineProps> = ({ children, underlineColor }) => {
    const [isHover, setIsHover] = React.useState<boolean>(false);

    const underlineStyle: React.CSSProperties = {
        'backgroundColor': underlineColor
    }

    return (
        <div 
            className={c.wrapper} 
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
        >
            {children}
        
            <CSSTransition
                in={isHover}
                timeout={500}
                classNames={{
                    enterActive: c.enter,
                    enterDone: c['enter-done'],
                    exitActive: c.exit
                }}            
            >
                <div className={c.underline} style={underlineStyle} />
            </CSSTransition>
        </div>
    )
}


export default TextUnderline
