import React from "react";


interface IContainerProps extends React.PropsWithChildren {
    maxWidth?: number
}

const Container: React.FC<IContainerProps> = ({ children, maxWidth }) => {
    
    maxWidth = maxWidth ?? 1326;

    return (
        <div style={{
            'height': '100%',
            'maxWidth': maxWidth,
            'margin': '0 auto',
            'display': 'inherit'
        }}>
            {children}
        </div>
    )
}

export default Container;
