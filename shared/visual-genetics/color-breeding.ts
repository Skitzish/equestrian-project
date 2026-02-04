import { VisualGenetics, ExtensionAllele, AgoutiAllele, GrayAllele } from "../types/visual-genetics.types";

//Breed two horses and generate the foal's genetics.
export function breedVisualGenetics(
    sire: VisualGenetics,
    dam: VisualGenetics
): VisualGenetics {
    return {
        extension: inheritGene(sire.extension, dam.extension) as [ExtensionAllele, ExtensionAllele],
        agouti: inheritGene(sire.agouti, dam.agouti) as [AgoutiAllele, AgoutiAllele],
        gray: inheritGene(sire.gray, dam.gray) as [GrayAllele, GrayAllele]
    };
}

//Inherit one gene from each parent
function inheritGene<T>(sireGene: [T, T], damGene: [T, T]): [T, T] {
    const fromSire = randomAllele(sireGene);
    const fromDam = randomAllele(damGene);
    return [fromSire, fromDam];
}

//Randomly select one allele from a pair
function randomAllele<T>(gene: [T, T]): T {
    return Math.random() < 0.5 ? gene[0] : gene[1];
}