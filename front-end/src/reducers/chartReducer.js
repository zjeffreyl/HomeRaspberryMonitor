import {} from "../actions/types";

const initialState = {
  label: [],
  datasets: [],
  legend: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
  }
}

function createDataSets(mapObject) {
  var datasets = [];
  for (const id in mapObject) {
    datasets.push(mapObject[id]);
  }
  return datasets;
}
