import { FETCH_DATA_FROM_START_END, SET_CHART1_TO_PING, SET_CHART1_TO_DOWNLOAD, SET_CHART1_TO_UPLOAD, SET_CHART2_TO_PING, SET_CHART2_TO_DOWNLOAD, SET_CHART2_TO_UPLOAD, SET_CHART3_TO_PING, SET_CHART3_TO_DOWNLOAD, SET_CHART3_TO_UPLOAD } from "../actions/types";


const d = new Date();
const n = d.getTimezoneOffset();

const initialState = {
  chartTabsById: {
    1: {
      title: {
        text: ""
      },
      xAxis: {
        dateTimeLabelFormats: {
          hour: '%l %p',
        },
        type: 'datetime',
        labels: {
          overflow: 'justify'
        }
      },
      plotOptions: {
        series: {
          marker: {
            enabled: false
          }
        }
      },
      time: {
        timezoneOffset: n
      },
      series: []
    },
    2: {
      title: {
        text: ""
      },
      xAxis: {
        dateTimeLabelFormats: {
          hour: '%l %p',
        },
        type: 'datetime',
        labels: {
          overflow: 'justify'
        }
      },
      plotOptions: {
        series: {
          marker: {
            enabled: false
          }
        }
      },
      time: {
        timezoneOffset: n
      },
      series: []
    },
    3: {
      title: {
        text: ""
      },
      xAxis: {
        dateTimeLabelFormats: {
          hour: '%l %p',
        },
        type: 'datetime',
        labels: {
          overflow: 'justify'
        }
      },
      plotOptions: {
        series: {
          marker: {
            enabled: false
          }
        }
      },
      time: {
        timezoneOffset: n
      },
      series: []
    }
  },
  currentData: [],
  ping: [],
  download: [],
  upload: [],
  displayType: "ping"
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_CHART1_TO_PING:
      return {
        ...state,
        chartTabsById: {
          ...state.chartTabsById,
          1: {
            ...state.chartTabsById[1],
            title: {
              text: "Ping"
            },
            yAxis: {
              labels: {
                format: '{value} ms'
              },
            },
            series: action.payload
          }
        }
      };
    case SET_CHART1_TO_DOWNLOAD:
      return {
        ...state,
        chartTabsById: {
          ...state.chartTabsById,
          1: {
            ...state.chartTabsById[1],
            title: {
              text: "Download"
            },
            yAxis: {
              labels: {
                format: '{value} Mbps'
              },
            },
            series: action.payload
          }

        }

      }
    case SET_CHART1_TO_UPLOAD:
      return {
        ...state,
        chartTabsById: {
          ...state.chartTabsById,
          2: {
            ...state.chartTabsById[2],
            title: {
              text: "Upload"
            },
            yAxis: {
              labels: {
                format: '{value} Mbps'
              }
            },
            series: action.payload
          }
        }
      }
    case SET_CHART2_TO_PING:
      return {
        ...state,
        chartTabsById: {
          ...state.chartTabsById,
          2: {
            ...state.chartTabsById[2],
            title: {
              text: "Ping"
            },
            yAxis: {
              labels: {
                format: '{value} ms'
              },
            },
            series: action.payload
          }

        }
      };
    case SET_CHART2_TO_DOWNLOAD:
      return {
        ...state,
        chartTabsById: {
          ...state.chartTabsById,
          2: {
            ...state.chartTabsById[2],
            title: {
              text: "Download"
            },
            yAxis: {
              labels: {
                format: '{value} Mbps'
              },
            },
            series: action.payload
          }
        }

      }
    case SET_CHART2_TO_UPLOAD:
      return {
        ...state,
        chartTabsById: {
          ...state.chartTabsById,
          2: {
            ...state.chartTabsById[2],
            title: {
              text: "Upload"
            },
            yAxis: {
              labels: {
                format: '{value} Mbps'
              },
            },
            series: action.payload
          }
        }
      }
    case SET_CHART3_TO_PING:
      return {
        ...state,
        chartTabsById: {
          ...state.chartTabsById,
          3: {
            ...state.chartTabsById[3],
            title: {
              text: "Ping"
            },
            yAxis: {
              labels: {
                format: '{value} ms'
              },
            },
            series: action.payload
          }
        }
      };
    case SET_CHART3_TO_DOWNLOAD:
      return {
        ...state,
        chartTabsById: {
          ...state.chartTabsById,
          3: {
            ...state.chartTabsById[3],
            title: {
              text: "Download"
            },
            yAxis: {
              labels: {
                format: '{value} Mbps'
              },
            },
            series: action.payload
          }
        }
      }
    case SET_CHART3_TO_UPLOAD:
      return {
        ...state,
        chartTabsById: {
          ...state.chartTabsById,
          3: {
            ...state.chartTabsById[3],
            title: {
              text: "Download"
            },
            yAxis: {
              labels: {
                format: '{value} Mbps'
              },
            },
            series: action.payload
          }
        }
      }
    case FETCH_DATA_FROM_START_END:
      return {
        ...state,
        ping: action.payload[0],
        download: action.payload[1],
        upload: action.payload[2],
      };
    default:
      return state;
  }
}
