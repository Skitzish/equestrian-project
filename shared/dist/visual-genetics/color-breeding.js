"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.breedVisualGenetics = breedVisualGenetics;
//Breed two horses and generate the foal's genetics.
function breedVisualGenetics(sire, dam) {
    return {
        extension: inheritGene(sire.extension, dam.extension),
        agouti: inheritGene(sire.agouti, dam.agouti),
        gray: inheritGene(sire.gray, dam.gray)
    };
}
//Inherit one gene from each parent
function inheritGene(sireGene, damGene) {
    const fromSire = randomAllele(sireGene);
    const fromDam = randomAllele(damGene);
    return [fromSire, fromDam];
}
//Randomly select one allele from a pair
function randomAllele(gene) {
    return Math.random() < 0.5 ? gene[0] : gene[1];
}
