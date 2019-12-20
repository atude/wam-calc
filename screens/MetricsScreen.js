import React from 'react';
import { StyleSheet, View, ScrollView, } from 'react-native';
import { Text, Card, Title, Paragraph, Button } from 'react-native-paper';
import { LineChart, PieChart } from "react-native-chart-kit";

import Colors from '../constants/Colors.js';
import Layout from '../constants/Layout.js';

const chartConfig = {
  fillShadowGradientOpacity: 0.02,
  backgroundGradientFromOpacity: 0,
  backgroundGradientToOpacity: 0,
  color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`,
  strokeWidth: 2, 
};

const dummyCircle = [
  {
    name: "",
    i: 1,
    color: "#fff",
  },
];


export default class MetricsScreen extends React.Component {
  state = {
    data: null
  } 

  getPointColor = (data) => {
    if(data < 50) return Colors.fl;
    if(data < 65) return Colors.ps;
    if(data < 75) return Colors.cr;
    if(data < 85) return Colors.dn;
    return Colors.hd;
  }

  getMarkRank = (data) => {
    if(data < 50) return "FL";
    if(data < 65) return "PS";
    if(data < 75) return "CR";
    if(data < 85) return "DN";
    return "HD";
  }

  formatX = (label) => {
    let newLabel = "";
    //Get last 2 digits of year
    let year = label.split(" ")[0].substr(2);

    switch(label.substr(7)) {
      case "Term 1":
        newLabel = "T1"; break;
      case "Term 2":
        newLabel = "T2"; break;
      case "Term 3":
        newLabel = "T3"; break;
      case "Semester 1":
        newLabel = "S1"; break;
      case "Semester 2":
        newLabel = "S2"; break;
      case "Summer Term":
        newLabel = "SUM"; break;
    }

    return year + newLabel;
  } 

  render() {
    const getProps = this.props.data.screenProps;
    let { calcWam, terms } = getProps;
    let dataTerm = {
      labels: [],
      datasets: [{
        data: [],
        color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})` 
      }],
    };

    let dataCumulative = {
      labels: [],
      datasets: [{
        data: [],
        color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})` 
      }],
    };

    let dataMarks = [
      {
        name: "FL",
        i: 0,
        color: Colors.fl,
        legendFontColor: `rgba(134, 65, 244, 1)`,
      },
      {
        name: "PS",
        i: 0,
        color: Colors.ps,
        legendFontColor: `rgba(134, 65, 244, 1)`,
      },
      {
        name: "CR",
        i: 0,
        color: Colors.cr,
        legendFontColor: `rgba(134, 65, 244, 1)`,
      },
      {
        name: "DN",
        i: 0,
        color: Colors.dn,
        legendFontColor: `rgba(134, 65, 244, 1)`,
      },
      {
        name: "HD",
        i: 0,
        color: Colors.hd,
        legendFontColor: `rgba(134, 65, 244, 1)`,
      },
    ];

    let cumulativeTerms = {};

    //For terms
    Object.keys(terms).filter(key => key !== "CurrentTerm").map((key) => {      
      dataTerm.datasets[0].data.push(calcWam({key: terms[key]})[0]);

      cumulativeTerms[key] = terms[key];
      dataCumulative.datasets[0].data.push(calcWam(cumulativeTerms)[0]);

      dataTerm.labels.push(key);
      dataCumulative.labels.push(key);
    });    

    //For courses 
    Object.values(terms).map(termPeriod => {
      termPeriod.map(course => {
        course.marks.map(mark => {
          var ranking = dataMarks.find(x => x.name == this.getMarkRank(mark.mark));
          if (ranking) ranking.i++;
        });
      });
    });

    console.log(dataMarks);

    return (
      <ScrollView style={styles.container}>
        <Card style={styles.performanceCard}>
          <Card.Content>
            <Title>
              Overall Performance in Courses
            </Title>
            <Paragraph>
              A summary of your assessment marks across all your courses throughout your degree
            </Paragraph>
            <View style={styles.chartContainer}>
              <PieChart
                data={dataMarks}
                width={Layout.window.width - 80}
                height={230}
                chartConfig={chartConfig}
                accessor="i"
                backgroundColor="transparent"
                paddingLeft="15"
              />
              <PieChart
                style={{position: "absolute", marginTop: 55}}
                data={dummyCircle}
                width={Layout.window.width - 80}
                height={200}
                chartConfig={chartConfig}
                accessor="i"
                backgroundColor="transparent"
                paddingLeft="15"
                hasLegend={false}
              />
            </View>
          </Card.Content>
        </Card>

        <Card style={styles.performanceCard}>
          <Card.Content>
            <Title>
              Cumulative WAM Performance
            </Title>
            <Paragraph>
              Your cumulative WAM and its change throughout your degree, 
              not including your current term WAM
            </Paragraph>
            <View style={styles.chartContainer}>
              {dataCumulative?.datasets[0]?.data?.length > 1 ?
                <LineChart
                  data={dataCumulative}
                  width={Layout.window.width - 80}
                  height={230}
                  chartConfig={chartConfig}
                  formatXLabel={(label) => this.formatX(label)}
                  getDotColor={(point) => this.getPointColor(point)}
                  bezier
                />
                :
                <Button disabled>
                  Not enough data
                </Button>
              }
            </View>
          </Card.Content>
        </Card>
        
        <Card style={styles.performanceCard}>
          <Card.Content>
            <Title>
              Term WAM Performance
            </Title>
            <Paragraph>
              Your WAM for each term throughout your degree, not including your current term WAM
            </Paragraph>
            <View style={styles.chartContainer}>
              {dataTerm?.datasets[0]?.data?.length > 1 ?
                <LineChart
                  data={dataTerm}
                  width={Layout.window.width - 80}
                  height={230}
                  chartConfig={chartConfig}
                  formatXLabel={(label) => this.formatX(label)}
                  getDotColor={(point) => this.getPointColor(point)}
                  bezier
                />
                :
                <Button disabled>
                  Not enough data
                </Button>
              }
            </View>
          </Card.Content>
        </Card>
        <View style={styles.bottomFill}/>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    color: Colors.tintColor,
    width: "100%",
  },
  bottomFill: {
    paddingBottom: 50,
  },
  performanceCard: {
    flex: 1,
    margin: 10,
    padding: 5,
    elevation: 4,
    borderRadius: 30,
  },
  chartContainer: {
    flex: 1, 
    paddingTop: 40,
  }
});
