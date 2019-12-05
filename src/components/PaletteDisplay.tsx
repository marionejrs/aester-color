import React from 'react';
import { Palette, Swatch } from 'node-vibrant/lib/color';
import './PaletteDisplay.css';

export interface PaletteDisplayProps {
    palette : Palette
}

export interface PaletteElementProps {
    swatch : Swatch
}

const PaletteElement : React.FC<PaletteElementProps> = (props : PaletteElementProps) => {
    let rgb = props.swatch.getRgb();
    return (
        <div className='palette' style={{ backgroundColor : `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})` }}>

        </div>
    );
}

const PaletteDisplay : React.FC<PaletteDisplayProps> = (props : PaletteDisplayProps) => {
    let { palette } = props;
    return (
        palette !== null ?
        <div className='palette-container'>
            {palette.Vibrant && <PaletteElement swatch={palette.Vibrant}/>}
            {palette.Muted && <PaletteElement swatch={palette.Muted}/>}
            {palette.DarkVibrant && <PaletteElement swatch={palette.DarkVibrant}/>}
            {palette.DarkMuted && <PaletteElement swatch={palette.DarkMuted}/>}
            {palette.LightVibrant && <PaletteElement swatch={palette.LightVibrant}/>}
            {palette.LightMuted && <PaletteElement swatch={palette.LightMuted}/>}
        </div> : null
    );
};
export default PaletteDisplay;