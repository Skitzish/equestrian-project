export type ExtensionAllele = 'E' | 'e';
export type AgoutiAllele = 'A+' | 'A' | 'At' | 'a';
export type GrayAllele = 'G' | 'g';
export interface VisualGenetics {
    extension: [ExtensionAllele, ExtensionAllele];
    agouti: [AgoutiAllele, AgoutiAllele];
    gray: [GrayAllele, GrayAllele];
}
export type BaseColor = 'chestnut' | 'wild_bay' | 'bay' | 'brown' | 'black';
export type DisplayColor = BaseColor | `gray_${BaseColor}`;
export interface ColorResult {
    baseColor: BaseColor;
    displayColor: DisplayColor;
    isGraying: boolean;
    geneticCode: string;
}
