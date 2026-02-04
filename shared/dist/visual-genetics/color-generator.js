"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateRandomVisualGenetics = generateRandomVisualGenetics;
//Generate random genetics for a foundation horse.
function generateRandomVisualGenetics() {
    return {
        extension: randomExtension(),
        agouti: randomAgouti(),
        gray: randomGray()
    };
}
function randomExtension() {
    const alleles = ['E', 'e'];
    return [randomFrom(alleles), randomFrom(alleles)];
}
function randomAgouti() {
    const alleles = ['A+', 'A', 'At', 'a'];
    return [randomFrom(alleles), randomFrom(alleles)];
}
function randomGray() {
    //Gray is less common, 80% chance of not gray.
    const allele1 = Math.random() < 0.8 ? 'g' : 'G';
    const allele2 = Math.random() < 0.8 ? 'g' : 'G';
    return [allele1, allele2];
}
function randomFrom(array) {
    return array[Math.floor(Math.random() * array.length)];
}
