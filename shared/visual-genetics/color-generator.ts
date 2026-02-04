import { VisualGenetics, ExtensionAllele, AgoutiAllele, GrayAllele } from "../types/visual-genetics.types";

//Generate random genetics for a foundation horse.
export function generateRandomVisualGenetics(): VisualGenetics {
    return {
        extension: randomExtension(),
        agouti: randomAgouti(),
        gray: randomGray()
    };
}

function randomExtension(): [ExtensionAllele, ExtensionAllele] {
    const alleles: ExtensionAllele[] = ['E', 'e'];
    return [randomFrom(alleles), randomFrom(alleles)];
}

function randomAgouti(): [AgoutiAllele, AgoutiAllele] {
    const alleles: AgoutiAllele[] = ['A+', 'A', 'At', 'a'];
    return [randomFrom(alleles), randomFrom(alleles)];
}

function randomGray(): [GrayAllele, GrayAllele] {
    //Gray is less common, 80% chance of not gray.
    const allele1 = Math.random() < 0.8 ? 'g' : 'G';
    const allele2 = Math.random() < 0.8 ? 'g' : 'G';
    return [allele1, allele2] as [GrayAllele, GrayAllele];
}

function randomFrom<T>(array: T[]): T {
    return array[Math.floor(Math.random() * array.length)];
}