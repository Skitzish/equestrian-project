"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.breedConformationGenetics = breedConformationGenetics;
function breedConformationGenetics(sire, dam) {
    return {
        shoulderSlope: inheritMultiAllelicGene(sire.shoulderSlope, dam.shoulderSlope),
        shoulderAngle: inheritMultiAllelicGene(sire.shoulderAngle, dam.shoulderAngle),
        humerusLength: inheritMultiAllelicGene(sire.humerusLength, dam.humerusLength),
        femurLength: inheritSimpleGene(sire.femurLength, dam.femurLength),
        tibiaLength: inheritSimpleGene(sire.tibiaLength, dam.tibiaLength),
        witherHeight: inheritMultiAllelicGene(sire.witherHeight, dam.witherHeight),
        neckLength: inheritMultiAllelicGene(sire.neckLength, dam.neckLength),
        croupAngle: inheritMultiAllelicGene(sire.croupAngle, dam.croupAngle),
        pasternAngle: inheritMultiAllelicGene(sire.pasternAngle, dam.pasternAngle),
        chestWidth: inheritMultiAllelicGene(sire.chestWidth, dam.chestWidth)
    };
}
function inheritSimpleGene(sireGene, damGene) {
    const fromSire = randomAllele(sireGene);
    const fromDam = randomAllele(damGene);
    return [fromSire, fromDam];
}
function randomAllele(gene) {
    return Math.random() < 0.5 ? gene[0] : gene[1];
}
function inheritMultiAllelicGene(sireAlleles, damAlleles) {
    const halfFromSire = randomHalf(sireAlleles);
    const halfFromDam = randomHalf(damAlleles);
    return [...halfFromSire, ...halfFromDam];
}
function randomHalf(alleles) {
    const numToSelect = Math.floor(alleles.length / 2);
    const shuffled = [...alleles].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, numToSelect);
}
