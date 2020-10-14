import { FETCH_DATA_FROM_START_END, SET_CHART_TO_DOWNLOAD, SET_CHART_TO_PING, SET_CHART_TO_UPLOAD } from "../actions/types";


const d = new Date();
const n = d.getTimezoneOffset();

const initialState = {
  options: {
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
      solidgauge: {
        dataLabels: {
          enabled: true
        },
        linecap: "round",
        stickyTracking: false,
        rounded: false
      }
    },
    time: {
      timezoneOffset: n
    },
    series: []
  },
  currentData: [],
  ping: [],
  download: [],
  upload: [],
  displayType: "ping"
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_CHART_TO_PING:
      console.log(state.ping);
      return {
        ...state,
        options: {
          ...state.options,
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
      };
    case SET_CHART_TO_DOWNLOAD:
      console.log(state.download);
      return {
        ...state,
        options: {
          ...state.options,
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
    case SET_CHART_TO_UPLOAD:
      console.log(state.upload);
      return {
        ...state,
        options: {
          ...state.options,
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
