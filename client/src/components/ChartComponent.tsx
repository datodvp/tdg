import { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import useUserStore from '../store/useUserStore';

const ChartComponent = () => {
  const usersData = useUserStore((state) => state.users);
  const [chartData, setChartData] = useState({
    series: [1, 1, 1, 15],
    chartOptions: {
      labels: ['Apple', 'Mango', 'Orange', 'Watermelon'],
    },
  });

  const calculateCities = () => {
    // calculate unique cities from list
    const citiesList = usersData.map((user) => user.address.city);
    const uniqueCities: string[] = [];
    citiesList.forEach((city) => {
      if (!uniqueCities.includes(city)) {
        uniqueCities.push(city);
      }
    });

    let chartOptions = {
      labels: uniqueCities,
    };
    // calculate each city users number
    const uniqueCityUsersNumber = Array(uniqueCities.length).fill(0);

    citiesList.forEach((city, index) => {
      uniqueCities.forEach((uniqueCity, index2) => {
        if (uniqueCity === city) {
          uniqueCityUsersNumber[index2]++;
        }
      });
    });

    setChartData({
      series: uniqueCityUsersNumber,
      chartOptions,
    });
    console.log(uniqueCityUsersNumber);
  };

  useEffect(() => {
    calculateCities();

    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [usersData]);

  return (
    <div>
      <Chart
        options={chartData.chartOptions}
        series={chartData.series}
        type="pie"
        width="500"
      />
    </div>
  );
};

export default ChartComponent;
