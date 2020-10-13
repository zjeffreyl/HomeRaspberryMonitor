import { FETCH_DATA_FROM_START_END, SET_CHART_TO_DOWNLOAD, SET_CHART_TO_PING, SET_CHART_TO_UPLOAD } from "../actions/types";

const d = new Date()
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
    time: {
      timezoneOffset: n
    },
    series: []
  },
  ping: [],
  download: [],
  upload: [],
  displayType: "ping"
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_CHART_TO_PING:
      return {
        ...state,
        options: {
          title: {
            text: state.dataType
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
          time: {
            timezoneOffset: n
          },
          series: state.ping
        },
      }
    case SET_CHART_TO_DOWNLOAD:
      return {
        ...state,
        options: {
          title: {
            text: state.dataType
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
          time: {
            timezoneOffset: n
          },
          series: state.download
        },

      }
    case SET_CHART_TO_UPLOAD:
      return {
        ...state,
        options: {
          title: {
            text: state.dataType
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
          time: {
            timezoneOffset: n
          },
          series: state.upload
        },

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
