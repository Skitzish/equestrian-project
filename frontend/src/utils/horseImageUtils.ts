import { BaseColor, Shade, Markings } from '@shared/types/visual-genetics.types';

//Listing all of the component layers for the final image
export interface HorseImageLayers {
    tail: string;
    tailMarkings?: string; //optional
    baseColor: string;
    bodyMarkings?: string; //optional
    hooves: string;
    eyes: string;
    mane: string;
    maneMarkings?: string; //optional 
}

export function getHorseImageLayers(
    baseColor: BaseColor,
    shade: Shade,
    markings: Markings
): HorseImageLayers {
    const colorString = `${baseColor}_${shade}`;

    const layers: HorseImageLayers = {
        tail: `/images/Tails/${colorString}.png`,
        baseColor: `/images/BaseColors/${colorString}.png`,
        hooves: `/images/Hooves/BlackHooves.png`,
        eyes: `/images/Eyes/BrownEye.png`,
        mane: `/images/Manes/${colorString}.png`
    }

    if (markings !== 'solid') {
        layers.tailMarkings = `/images/Tails/${markings}.png`;
        layers.bodyMarkings = `/images/Markings/${markings}.png`;
        layers.maneMarkings = `/images/Manes/${markings}.png`;
    }

    return layers;
}

export function getLayerOrder(): (keyof HorseImageLayers)[] {
    return [
        'tail',
        'tailMarkings',
        'baseColor',
        'bodyMarkings',
        'hooves',
        'eyes',
        'mane',
        'maneMarkings'
    ];
}