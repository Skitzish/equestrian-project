"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateRandomConformationGenetics = generateRandomConformationGenetics;
//Generate random genetics for a foundation horse.
function generateRandomConformationGenetics() {
    return {
        shoulderSlope: randomGenes(8, ['i', 'm', 'u']),
        shoulderAngle: randomGenes(8, ['c', 'm', 'o']),
        humerusLength: randomGenes(6, ['s', 'm', 'l']),
        femurLength: randomGenes(2, ['s', 'm', 'l']),
        tibiaLength: randomGenes(2, ['s', 'm', 'l']),
        witherHeight: randomGenes(4, ['l', 'm', 'h']),
        neckLength: randomGenes(4, ['s', 'm', 'l']),
        croupAngle: randomGenes(8, ['f', 'm', 's']),
        pasternAngle: randomGenes(8, ['i', 'm', 'u']),
        chestWidth: randomGenes(4, ['n', 'm', 'w'])
    };
}
//Choose alleles randomly given number needed and possible values.
function randomGenes(numGenes, alleles) {
    const result = [];
    for (let i = 0; i < numGenes; i++) {
        const randomIndex = Math.floor(Math.random() * alleles.length);
        result.push(alleles[randomIndex]);
    }
    return result;
}
