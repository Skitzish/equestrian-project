import {
    VisualGenetics,
    ExtensionAllele,
    AgoutiAllele,
    GrayAllele,
    BaseColor,
    DisplayColor,
    ColorResult
} from '../types/visual-genetics.types';

//Check if a gene pair contains a specific allele.
function hasAllele<T>(gene: [T, T], allele: T): boolean {
    return gene[0] === allele || gene[1] === allele;
}

//Determine if the horse can produce black pigment
function hasBlackPigment(extension: [ExtensionAllele, ExtensionAllele]): boolean {
    return hasAllele(extension, 'E');
}

//Determine agouti expression. Only matter if not red.
function getAgoutiExpression(agouti: [AgoutiAllele, AgoutiAllele]): 'wild_bay' | 'bay' | 'brown' | 'black' {
    if (hasAllele(agouti, 'A+')){
         return 'wild_bay';
    }else if(hasAllele(agouti, 'A')){
        return 'bay';
    }else if(hasAllele(agouti, 'At')){
        return 'brown';
    }else{
        return 'black';
    }
}

//Determine base color from extension and agouti.
export function calculateBaseColor(genetics: VisualGenetics): BaseColor {
    const hasBlack = hasBlackPigment(genetics.extension);

    if(!hasBlack){
        return 'chestnut';
    }else{
        return getAgoutiExpression(genetics.agouti);
    }
}

//Get display color
export function getDisplayColor(genetics: VisualGenetics): DisplayColor {
    const baseColor = calculateBaseColor(genetics);
    const graying = hasAllele(genetics.gray, 'G'); //returns true if the horse has a gray gene

    if (graying) { //Add gray prefix if horse has gray gene
        return `gray_${baseColor}` as DisplayColor;
    }else{
        return baseColor;
    }
}

//Format genes for display
export function formatGeneticCode(genetics: VisualGenetics): string{
    const ext = genetics.extension.join('');
    const ago = genetics.agouti.join('');
    const gry = genetics.gray.join('');

    return `${ext}/${ago}/${gry}`;
}

//Get all information
export function calculateColor(genetics: VisualGenetics): ColorResult {
    const baseColor = calculateBaseColor(genetics);
    const displayColor = getDisplayColor(genetics);
    const isGraying = hasAllele(genetics.gray, 'G');
    const geneticCode = formatGeneticCode(genetics);

    return {
        baseColor,
        shade: 'medium',
        displayColor,
        isGraying,
        markings: 'solid',
        geneticCode
    };
}

//Get human-readable color
export function getColorName(displayColor: DisplayColor): string {
    const colorNames: Record<DisplayColor, string> = {
        'chestnut': 'Chestnut',
        'wild_bay': 'Wild Bay',
        'bay': 'Bay',
        'brown': 'Brown',
        'black': 'Black',
        'gray_chestnut': 'Graying Chestnut',
        'gray_wild_bay': 'Graying Wild Bay',
        'gray_bay': 'Graying Bay',
        'gray_brown': 'Graying Brown',
        'gray_black': 'Graying Black'
    };

    return colorNames[displayColor] || displayColor;
}