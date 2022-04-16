import React, { useEffect, useState } from 'react';
import { ComposableMap, Geographies, Geography } from 'react-simple-maps';
import ReactTooltip from 'react-tooltip';
import { csv } from 'd3-fetch';
import { scaleLinear } from 'd3-scale';
import frequency from '../assets/freq.csv';

const INDIA_TOPO_JSON = require('../assets/india.topo.json');

const PROJECTION_CONFIG = {
    scale: 950,
    center: [82.9629, 22.5937] // always in [East Latitude, North Longitude]
};

const colorScale = scaleLinear()
    .domain([1, 300])
    .range(["#ffedea", "#ff5233"]);

const geographyStyle = {
    default: {
        outline: 'none'
    },
    hover: {
        fill: '#83decc',
        transition: 'all 250ms',
        outline: 'none'
    },
    pressed: {
        outline: 'none'
    }
};
const HeatMap = ()  => {
    const [tooltipContent, setTooltipContent] = useState('');
    const [data, setData] = useState([]);

    useEffect(() => {
        csv(frequency).then((dt) => {
            setData(dt);
        });
    }, []);


    const onMouseEnter = (geo) => {
        return () => {
            setTooltipContent(`${geo.properties.name}`);
        };
    };

    const onMouseLeave = () => {
        setTooltipContent('');
    };




    return (
        <div className="container">

            <ReactTooltip>{tooltipContent}</ReactTooltip>
            <ComposableMap
                projectionConfig={PROJECTION_CONFIG}
                projection="geoMercator"
                width={600}
                height={775}
                data-tip=""
            >
                <Geographies id="SVG" geography={INDIA_TOPO_JSON}>

                    {({ geographies }) =>
                        geographies.map(geo => {
                            const d = data.find((s) => s.id === geo.id);
                            return (
                                <Geography
                                    key={geo.rsmKey}
                                    geography={geo}
                                    fill={d ? colorScale(d['freq']) : '#847bdb'}
                                    style={geographyStyle}
                                    onMouseEnter={onMouseEnter(geo)}
                                    onMouseLeave={onMouseLeave}
                                />
                            );
                        })
                    }
                </Geographies>
            </ComposableMap>
        </div>
    );
}

export default HeatMap;
