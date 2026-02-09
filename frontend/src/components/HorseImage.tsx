import React, { useEffect, useRef, useState } from "react";
import { calculateColor } from "@shared/visual-genetics/color-calculator";
import type { VisualGenetics } from "@shared/types/visual-genetics.types";
import { getHorseImageLayers, getLayerOrder } from "@/utils/horseImageUtils";

interface HorseImageProps {
    visualGenetics: VisualGenetics;
    width?: number;
    height?: number;
    className?: string;
    alt?: string;
}

const HorseImage: React.FC<HorseImageProps> = ({
    visualGenetics,
    width = 400,
    height = 400,
    className = '',
    alt = 'Horse',
}) => {
    //Reference to the canvas DOM element
    const canvasRef = useRef<HTMLCanvasElement>(null);

    //Track loading state
    const [isLoading, setIsLoading] = useState(true);

    //Track errors
    const [error, setError] = useState<string | null>(null);

    //useEffect goes here
    useEffect(() => {
        //image loading and drawing goes here.

        //Get the canvas element
        const canvas = canvasRef.current;
        if (!canvas) return; //If there's no canvas, stop and exit

        //Get the 2D drawing context
        const ctx = canvas.getContext('2d');
        if(!ctx) {
            setError('Canvas not supported');
            return;
        }

        const colorResult = calculateColor(visualGenetics);

        const layers = getHorseImageLayers(
            colorResult.baseColor,
            colorResult.shade,
            colorResult.markings
        );

        // Logs for path checking.
        //console.log('Color Result:', colorResult);
        //console.log('All image layers:', layers);
        //console.log('Mane path specifically:', layers.mane);

        const layerOrder = getLayerOrder();

        //Create a promise for each image we need to load
        const imagePromises = layerOrder
            .filter(layerKey => layers[layerKey] !== undefined) // Skip optional layers
            .map((layerKey) => {
                return new Promise<{key: string; img: HTMLImageElement}>((resolve, reject) => {
                    const img = new Image();

                    img.onload = () => resolve({key: layerKey, img});
                    img.onerror = () => reject(new Error(`Failed to load ${layerKey}`));

                    img.src = layers[layerKey]!;
                });
            });

        Promise.all(imagePromises)
            .then((loadedImages) => {
                //All images loaded successfully!

                //Clear the canvas.
                ctx.clearRect(0,0,width,height);

                //Draw each image in order
                loadedImages.forEach(({img}) => {
                    ctx.drawImage(img,0,0,width,height);
                });

                //Upload state
                setIsLoading(false);
                setError(null);
        })
            .catch((err) => {
                //something went wrong
                console.error('Error loading horse images:', err);
                setError('Failed to load horse image');
                setIsLoading(false);
        });


    }, [visualGenetics, width, height]);

    //Return JSX goes here

    //Handle error state
    if (error){
        return(
            <div className={`flex items-center justify-center bg-gray-100 rounded-lg ${className}`}
            style={{ width, height }}>
                <div className="text-center p-4">
                    <p className="text-gray-600 text-sm">{error}</p>
                    <p className="text-gray-400 text-xs mt-2">Images files may be missing.</p>
                </div>
            </div>
        );
    }

    //Return canvas with optional loading overlay
    return (
        <div className={`relative ${className}`} style={{ width, height }}>
            <canvas
                ref={canvasRef}
                width={width}
                height={height}
                className={`rounded-lg ${isLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}
                aria-label={alt}
            />
            {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-100 rounded-lg">
                    <div className="text-gray-600">Loading...</div>
                </div>
            )}
        </div>
    )
}

export default HorseImage;