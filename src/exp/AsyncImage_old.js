import React, {Component} from 'react';

import img1 from "../../resources/images/img1.jpg";
import img2 from "../../resources/images/img2.jpg";

const AsyncImage = (props) => {

    const [loadedSrc, setLoadedSrc] = React.useState(null);

    React.useEffect(() => {
        setLoadedSrc(null);
        if (props.src) {
            const handleLoad = () => {
                setLoadedSrc(props.src);
            };
            const image = new Image();
            image.addEventListener('load', handleLoad);
            image.src = props.src;
            return () => {
                image.removeEventListener('load', handleLoad);
            };
        }

        cacheImages([img1, img2]);
    }, [props.src]);


    const cacheImages = async (srcArray) => {
        const promises = await srcArray.map((src) => {
            return new Promise(function (resolve, reject) {
                const img = new Image();
                img.src = src;
                img.onload = resolve();
                img.onerror = reject();
            });
        });

        await Promise.all(promises);
    }


    if (loadedSrc === props.src) {
        return (
            <img {...props} alt={""}/>
        );
    }
    return null;
};

export default AsyncImage;