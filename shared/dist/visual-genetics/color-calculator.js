"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateBaseColor = calculateBaseColor;
exports.getDisplayColor = getDisplayColor;
exports.formatGeneticCode = formatGeneticCode;
exports.calculateColor = calculateColor;
exports.getColorName = getColorName;
//Check if a gene pair contains a specific allele.
function hasAllele(gene, allele) {
    return gene[0] === allele || gene[1] === allele;
}
//Determine if the horse can produce black pigment
function hasBlackPigment(extension) {
    return hasAllele(extension, 'E');
}
//Determine agouti expression. Only matter if not red.
function getAgoutiExpression(agouti) {
    if (hasAllele(agouti, 'A+')) {
        return 'wild_bay';
    }
    else if (hasAllele(agouti, 'A')) {
        return 'bay';
    }
    else if (hasAllele(agouti, 'At')) {
        return 'brown';
    }
    else {
        return 'black';
    }
}
//Determine base color from extension and agouti.
function calculateBaseColor(genetics) {
    const hasBlack = hasBlackPigment(genetics.extension);
    if (!hasBlack) {
        return 'chestnut';
    }
    else {
        return getAgoutiExpression(genetics.agouti);
    }
}
//Get display color
function getDisplayColor(genetics) {
    const baseColor = calculateBaseColor(genetics);
    const graying = hasAllele(genetics.gray, 'G'); //returns true if the horse has a gray gene
    if (graying) { //Add gray prefix if horse has gray gene
        return `gray_${baseColor}`;
    }
    else {
        return baseColor;
    }
}
//Format genes for display
function formatGeneticCode(genetics) {
    const ext = genetics.extension.join('');
    const ago = genetics.agouti.join('');
    const gry = genetics.gray.join('');
    return `${ext}/${ago}/${gry}`;
}
//Get all information
function calculateColor(genetics) {
    const baseColor = calculateBaseColor(genetics);
    const displayColor = getDisplayColor(genetics);
    const isGraying = hasAllele(genetics.gray, 'G');
    const geneticCode = formatGeneticCode(genetics);
    return {
        baseColor,
        displayColor,
        isGraying,
        geneticCode
    };
}
//Get human-readable color
function getColorName(displayColor) {
    const colorNames = {
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
