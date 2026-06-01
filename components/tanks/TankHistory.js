import { FlatList, View, Text, Pressable, Dimensions } from "react-native"
import PlantHistoryCard from "../plants/PlantHistoryCard"
import { styles, COLORS } from "../../styles/global"
import {LineChart} from "react-native-chart-kit";

const TankHistory = ({ logs, onClose }) => {
    return (
        <View style={{ maxHeight: 500 }}>
            <Text style={[styles.infoLabel, {fontWeight: 'bold'}]}>
                Water level past 7 days:
            </Text>
            <LineChart
                data={{
                datasets: [
                    {
                    data: [
                        Math.random() * 100,
                        Math.random() * 100,
                        Math.random() * 100,
                        Math.random() * 100,
                        Math.random() * 100,
                        Math.random() * 100,
                        Math.random() * 100
                    ]
                    },
                    {
                        data: [0],
                        withDots: false,
                    },
                    {
                        data: [100],
                        withDots: false,
                    },
                ]
                }}
                width={280}
                height={100}
                yAxisSuffix="%"
                yAxisInterval={1}
                chartConfig={{
                backgroundColor: COLORS.cardBackground,
                backgroundGradientFrom: COLORS.waterBlue,
                backgroundGradientTo: COLORS.black,
                decimalPlaces: 0,
                color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                style: {
                    borderRadius: 10
                },
                propsForDots: {
                    r: "4",
                    strokeWidth: "2",
                    stroke: COLORS.blue
                }
                }}
                bezier
                style={{
                marginVertical: 8,
                borderRadius: 16
                }}
            />
            <FlatList
                data={logs}
                renderItem={({ item }) => <PlantHistoryCard plantLog={item} />}
                keyExtractor={(_, index) => index.toString()}
                showsVerticalScrollIndicator={false}
            />
        </View>
    )
}

export default TankHistory