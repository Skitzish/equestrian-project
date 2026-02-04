// Extension gene - controls red vs black pigment
export type ExtensionAllele = 'E' | 'e';

// Agouti gene - controls distribution of black pigment
export type AgoutiAllele = 'A+' | 'A' | 'At' | 'a';

// Gray gene - progressive graying
export type GrayAllele = 'G' | 'g';

export interface VisualGenetics {
    extension: [ExtensionAllele, ExtensionAllele];
    agouti: [AgoutiAllele, AgoutiAllele];
    gray: [GrayAllele, GrayAllele];
}

// Base color determined by extension + agouti
export type BaseColor = 
    | 'chestnut'    //ee w/ any agouti
    | 'wild_bay'    //E_ w/ A+_ (any other agouti)
    | 'bay'         //E_ w/ A_ (any agouti except A+)
    | 'brown'       //E_ w/ At_ (only At or a)
    | 'black';      //E_ w/ aa

// Display color includes gray status
export type DisplayColor = BaseColor | `gray_${BaseColor}`;

export interface ColorResult {
    baseColor: BaseColor;
    displayColor: DisplayColor;
    isGraying: boolean;
    geneticCode: string;
}