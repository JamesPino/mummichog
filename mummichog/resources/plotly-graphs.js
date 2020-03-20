
//***** MZ scatter plot
function makeMZUserInputPlot(userInputData) {
  //Plotly.d3.csv("userInputData.csv", function(data){ processMZData(data) } );
  processMZData(userInputData)
};

function processMZData(allRows) {

  console.log(allRows);
  var xTrace1 = [], yTrace1 = []
  var xTrace2 = [], yTrace2 = []

  for (var i=0; i<allRows.length; i++) {
    row = allRows[i];
    if (row['p_value'] < 0.000100){
        xTrace1.push( row['mz'] );
        yTrace1.push( - Math.log10(row['p_value']) );
    }else{
        xTrace2.push( row['mz'] );
        yTrace2.push( - Math.log10(row['p_value']) );
    }
  }

  console.log( 'X tarce 1',xTrace1, 'Y trace 1', yTrace1);
  console.log( 'X tarce 2',xTrace2, 'Y trace 2', yTrace2);

  makeMZPlotly( xTrace1, yTrace1, xTrace2, yTrace2);
}

function makeMZPlotly( xTrace1, yTrace1, xTrace2, yTrace2){
  var plotDiv = document.getElementById("plot");
  var yLineValue = - Math.log10(0.000100)
  var trace1 = {
    mode: 'markers',
    x: xTrace1,
    y: yTrace1,
    name: 'Significant, p < 0.000100 - (' + xTrace1.length + ')',
    type: 'scatter'
  };

  var trace2 = {
    mode: 'markers',
    x: xTrace2,
    y: yTrace2,
    name: 'p >= 0.000100 - (' + xTrace2.length + ')',
    type: 'scatter'
  };

  var trace3 = {
    mode: 'lines',
    x: [0, 2000],
    y: [yLineValue, yLineValue],
    line: {
        dash: 'dot',
        width: 2,
        color: 'rgb(128,0,128)'
    },
    name: 'p'
  };

  var data = [trace1, trace2, trace3];

  var layout = {
      xaxis: {
         autorange: true,
         title: 'm/z'
      },
      yaxis: {
          autorange: true,
          title: '-log10 p-value'
      },
      title:'User Input - m/z'
    };


  Plotly.newPlot('mz_user_input', data, layout);
};


//*** Ret Time scatter plot
function makeRetTimeUserInputPlot(userInputData) {
  //Plotly.d3.csv("userInputData.csv", function(data){ processRetTimeData(data) } );
  processRetTimeData(userInputData)
};

function processRetTimeData(allRows) {

  console.log(allRows);
  var xTrace1 = [], yTrace1 = []
  var xTrace2 = [], yTrace2 = []

  for (var i=0; i<allRows.length; i++) {
    row = allRows[i];
    if (row['p_value'] < 0.000100){
        xTrace1.push( row['retention_time'] );
        yTrace1.push( - Math.log10(row['p_value']) );
    }else{
        xTrace2.push( row['retention_time'] );
        yTrace2.push( - Math.log10(row['p_value']) );
    }
  }

  console.log( 'X tarce 1',xTrace1, 'Y trace 1', yTrace1);
  console.log( 'X tarce 2',xTrace2, 'Y trace 2', yTrace2);

  makeRetTimePlotly( xTrace1, yTrace1, xTrace2, yTrace2);
}

function makeRetTimePlotly( xTrace1, yTrace1, xTrace2, yTrace2){
  var plotDiv = document.getElementById("plot");
  var yLineValue = - Math.log10(0.000100)
  var trace1 = {
    mode: 'markers',
    x: xTrace1,
    y: yTrace1,
    name: 'Significant, p < 0.000100 - (' + xTrace1.length + ')',
    type: 'scatter'
  };

  var trace2 = {
    mode: 'markers',
    x: xTrace2,
    y: yTrace2,
    name: 'p >= 0.000100 - (' + xTrace2.length + ')',
    type: 'scatter'
  };

  var trace3 = {
    mode: 'lines',
    x: [0, 600],
    y: [yLineValue, yLineValue],
    line: {
        dash: 'dot',
        width: 2,
        color: 'rgb(128,0,128)'
    },
    name: 'p'
  };

  var data = [trace1, trace2, trace3];

  var layout = {
      xaxis: {
         autorange: true,
         title: 'Retention time'
      },
      yaxis: {
          autorange: true,
          title: '-log10 p-value'
      },
      title:'User Input - Retention Time'
    };


  Plotly.newPlot('retention_time_input', data, layout);
};


/// ** Pathway bar plot

function makePathwayPlot() {
  Plotly.d3.csv("mcg_pathwayanalysis_myResult.csv", function(data){ processPathwayData(data) } );

};

function processPathwayData(allRows) {

  console.log(allRows);
  var xTrace1 = [], yTrace1 = [], xLineTrace = [];

  for (var i=0; i<allRows.length; i++) {
    row = allRows[i];
    if (row['p-value'] < 0.05){
        yTrace1.push( row['pathway'] );
        xTrace1.push( - Math.log10(row['p-value']) );
        xLineTrace.push (1.301)
    }
  }

  console.log( 'X tarce 1',xTrace1, 'Y trace 1', yTrace1);
  makePathwayPlotly( xTrace1, yTrace1, xLineTrace);
}

function makePathwayPlotly( xTrace1, yTrace1, xLineTrace){
  var plotDiv = document.getElementById("plot");
  var trace1 = {
    x: xTrace1,
    y: yTrace1,
    type: 'bar',
    orientation: 'h',
    marker: {
        color: 'rgba(50,171,96,0.6)'
    },
    transforms: [{
        type: 'sort',
        target: 'y',
        order: 'descending'
    }]
  };

  var trace2 = {
    x: xLineTrace,
    y: yTrace1,
    mode: 'lines',
    orientation: 'h',
    line: {
        dash: 'dot',
        width: 2,
        color: 'rgb(128,0,128)'
    }
  };

  var data = [trace1, trace2];

  var layout = {
      yaxis: {
         autorange: true,
         title: 'Pathways'
      },
      xaxis: {
          autorange: true,
          title: '-log10 p-value'
      },
      title:'Pathway Analysis',
      margin: {
        l: 320,
        r: 20,
        t: 100,
        b: 70
      },
      paper_bgcolor: 'rgb(248,248,255)',
      plot_bgcolor: 'rgb(248,248,255)',
      showlegend: false
    };


  Plotly.newPlot('tester8', data, layout);
};
