import React from "react";
import ICoin from '@/interfaces/Coin.interface';
import styles from './coin.module.scss';
import { useEffect, useState } from 'react';
import IChartData from '@/interfaces/IChartData';
// @ts-ignore
import CanvasJSReact from '@canvasjs/react-charts';
import { trpc } from '../../utils/trpc';
import Button from "../button/Button";

var CanvasJSChart = CanvasJSReact.CanvasJSChart;

function Graph({ coin }: { coin: ICoin }) {
    const [period, setPeriod] = useState('week');

    const coinGraph = trpc.getPriceGraph.useQuery({id: coin.id, period: period}); // isLoading, response, isSuccess

    const [dataPoints, setDataPoints] = useState<IChartData[]>([]);
    const [chartCV, setChartCV] = useState<any>();


    useEffect(() => {
        if (coinGraph.isSuccess) {
            if (chartCV)
                drawChart(chartCV);
        }
    }, [coinGraph.data])

    const drawChart = (chartCV: any) => {
        var chart = chartCV;
        let dataPointsTemp: IChartData[] = [];
        let coinGraphData = coinGraph.data?.data;
        for (var i = 0; i < coinGraphData.length; i++) {
            dataPointsTemp.push({
                x: new Date(coinGraphData[i].time),
                y: Number(coinGraphData[i].priceUsd) < 0.1
                    ? Number(parseFloat(Number(coinGraphData[i].priceUsd).toPrecision(3)))
                    : Number(Number(coinGraphData[i].priceUsd).toFixed(3))
            });
        }
        if (chart) {
            setDataPoints(dataPointsTemp);
            chart.render();
        }
    }

    return (

        <div className={styles.wrapper_right}>
            {
                !coinGraph.isLoading &&
                <>
                    <div className={styles.wrapper_buttons}>
                        <Button type="circle" size="large" isGrow={true} onClick={() => setPeriod('day')}>Day</Button>
                        <Button type="circle" size="large" isGrow={true} onClick={() => setPeriod('week')}>Week</Button>
                        <Button type="circle" size="large" isGrow={true} onClick={() => setPeriod('month')}>Month</Button>
                    </div>
                    <div data-testid='graph-price'>
                        <CanvasJSChart
                            options={{
                                theme: "light2",
                                title: {
                                    text: "Price " + coin.symbol + ' ('+period+ ')'
                                },
                                data: [{
                                    type: "line",
                                    toolTipContent: "{x}<hr/>Price: {y}$",
                                    // xValueFormatString: "DD MMM",
                                    // yValueFormatString: "$",
                                    dataPoints: dataPoints
                                }]
                            }}
                            onRef={(ref: any) => { setChartCV(ref); drawChart(ref) }}
                        />
                    </div>
                </>

            }
        </div>
    );
}

export default Graph;